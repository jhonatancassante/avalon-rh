export interface UpdateUser {
    isComplete?: boolean;
    profile?: {
        cpf: string;
        completeName: string;
        socialName: string;
        nickname: string;
        contactEmail: string;
        phone: string;
        birthdate: Date;
    };
    photo?: {
        asset_id?: string;
        display_name?: string;
        height?: number;
        public_id?: string;
        url?: string;
        width?: number;
    };
}
