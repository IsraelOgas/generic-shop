export interface IUser {
    _id: string;
    name: string;
    email: string;
    required: string;
    password?: string;
    role: string;

    createdAt?: string;
    updatedAt?: string;
}