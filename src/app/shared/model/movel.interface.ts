export interface IMovel {
    id: number;
    title: string;
    description: string;
    createdAt: string;
    createdBy: string;
    thumbnail: IThumbnail[];
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
