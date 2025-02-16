import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import cloudinary from "@/app/_lib/cloudinary";

interface CloudinaryUploadResult {
    width: number;
    height: number;
    public_id: string;
}

export async function POST(request: Request) {
    // Verificar se o usuário está autenticado
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json(
            { message: "Usuário não autenticado." },
            { status: 401 },
        );
    }

    const fileName = `${session.user.name?.split(" ")[0]} - ${session.user.id}`;

    // Ler o arquivo enviado no corpo da requisição
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
        return NextResponse.json(
            { message: "Nenhum arquivo enviado." },
            { status: 400 },
        );
    }

    // Validar o tipo de arquivo
    if (!["image/jpeg", "image/jpg"].includes(file.type)) {
        return NextResponse.json(
            { message: "O arquivo deve ser do tipo JPG ou JPEG." },
            { status: 400 },
        );
    }

    // Validar o tamanho do arquivo (máximo 1MB)
    if (file.size > 1024 * 1024) {
        return NextResponse.json(
            { message: "O arquivo deve ter no máximo 1MB." },
            { status: 400 },
        );
    }

    // Converter o arquivo para Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Fazer upload para o Cloudinary
    try {
        const result: CloudinaryUploadResult = await new Promise(
            (resolve, reject) => {
                cloudinary.uploader
                    .upload_stream(
                        {
                            resource_type: "image",
                            overwrite: true,
                            public_id: fileName,
                            folder: "profile_photos",
                        },
                        (error, result) => {
                            if (error) {
                                reject(new Error(error.message));
                            } else if (result) {
                                resolve(result as CloudinaryUploadResult);
                            } else {
                                reject(new Error("Upload result is undefined"));
                            }
                        },
                    )
                    .end(buffer);
            },
        );

        if (
            result.width < 500 ||
            result.height < 500 ||
            result.width > 3036 ||
            result.height > 3036
        ) {
            await cloudinary.uploader.destroy(result.public_id);
            return NextResponse.json(
                {
                    message:
                        "A imagem deve ter dimensões entre 500x500 e 3036x3036.",
                },
                { status: 400 },
            );
        }

        return NextResponse.json(
            { message: "Upload realizado com sucesso!", result },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Erro ao fazer upload da imagem." },
            { status: 500 },
        );
    }
}
