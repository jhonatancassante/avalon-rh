export interface UpdateUser {
    isComplete?: boolean;
    profile?: {
        cpf: string;
        completeName: string;
        socialName: string;
        nickname: string;
        pronoun: string;
        pixKey: string;
        contactEmail: string;
        phone: string;
        birthdate: Date;
        isPcd: boolean;
        deficiency?: string;
        extraSupport?: string;
        city: string;
        state: string;
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
