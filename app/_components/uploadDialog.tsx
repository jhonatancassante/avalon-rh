"use client";

import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { UpdatePhoto } from "../_types/updatePhoto";

interface UploadDialogProps {
    onUploadSuccess: (data: UpdatePhoto) => void;
}

const UploadDialog = ({ onUploadSuccess }: UploadDialogProps) => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!["image/jpeg", "image/jpg"].includes(file.type)) {
                setError("O arquivo deve ser do tipo JPG ou JPEG.");
                return;
            }
            if (file.size > 1024 * 1024) {
                setError("O arquivo deve ter no máximo 1MB.");
                return;
            }

            setError(null);
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError("Nenhum arquivo selecionado.");
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const result = await response.json();

            onUploadSuccess({
                asset_id: result.asset_id,
                display_name: result.display_name,
                height: result.height,
                public_id: result.public_id,
                url: result.url,
                width: result.width,
            });
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Upload da Imagem</DialogTitle>
                <DialogDescription>
                    Faça o upload da imagem. O arquivo deve ter no máximo 1MB e
                    as dimensões devem ser entre 500x500 e 3036x3036.
                </DialogDescription>
            </DialogHeader>
            <div>
                <Input
                    type="file"
                    accept="image/jpeg, image/jpg"
                    onChange={handleFileChange}
                    disabled={loading}
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div className="flex w-full justify-center">
                    <Button
                        onClick={handleUpload}
                        disabled={loading || !selectedFile}
                        className="mt-4"
                    >
                        {loading ? "Enviando..." : "Upload"}
                    </Button>
                </div>
            </div>
        </DialogContent>
    );
};

export default UploadDialog;
