export interface IMovel {
    id: number;
    name: string;
    color?: string;
    width?: string;
    height?: string;
    length?: string;
    description?: string;
    created_at: string;
    created_by: string;
    foto: IThumbnail[];
    estado?: string[];
    address?: IAddress;
}
export interface IThumbnail {
    id: number;
    path: string;
}
export interface IAddress {
    latitude?: string;
    longitude?: string;
    city: string;
    state: string;
}
