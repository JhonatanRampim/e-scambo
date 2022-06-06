export interface IMovel {
    id: number,
    title: string,
    description:string,
    createdAt: string, 
    updatedAt: string,
    thumbnail: IThumbnail[]
}
export interface IThumbnail {
    id:number, 
    path:string
}
