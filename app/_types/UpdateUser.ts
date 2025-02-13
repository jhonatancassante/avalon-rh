export default interface UpdateUser {
    cpf: string;
    completeName: string;
    secondaryEmail: string;
    birthdate: Date;
    role?: string;
    photoUrl: string;
    isComplete: boolean;
    isDeleted?: boolean;
}
