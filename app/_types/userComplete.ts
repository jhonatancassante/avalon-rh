export interface UserComplete {
    user: {
        id: string;
        name?: string | null;
        email?: string | null;
        role: string;
        image?: string | null;
        emailVerified?: Date | null;
        isComplete: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        profile?: {
            id: string;
            cpf: string;
            completeName: string;
            socialName: string;
            nickname: string;
            contactEmail: string;
            phone: string;
            birthdate: Date;
        } | null;
        photo?: {
            id: string;
            asset_id: string;
            display_name: string;
            height: number;
            public_id: string;
            url: string;
            width: number;
        } | null;
    };
}
