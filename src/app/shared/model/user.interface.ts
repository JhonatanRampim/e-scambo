export interface IUser {
    id?: number;
    nome?: string;
    email?: string;
    phone?: string;
    createdAt?: string;
    updatedAt?: string;
}
export interface IUserMessage extends IUser {
    message?:string;
}
