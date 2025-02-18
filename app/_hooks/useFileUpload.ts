import { useState } from "react";
import { toast } from "sonner";
import UpdatePhoto from "../_types/updatePhoto";
import { useLoading } from "../_contexts/LoadingContext";

export const useFileUpload = () => {
    const [photoData, setPhotoData] = useState<UpdatePhoto | null>(null);
    const { setIsLoading } = useLoading();

    const handleFileUpload = async (file: File) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const { result } = await response.json();

            const photoInfos: UpdatePhoto = {
                asset_id: result.asset_id,
                display_name: result.display_name,
                height: result.height,
                public_id: result.public_id,
                url: result.url,
                width: result.width,
            };

            setPhotoData(photoInfos);

            toast.success("Sucesso!", {
                description: "Upload de foto feito com sucesso!",
            });
        } catch (error) {
            console.error(error);
            toast.error("Erro!", {
                description: `Erro ao tentar fazer upload da imagem. ${error}`,
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return { photoData, handleFileUpload };
};
