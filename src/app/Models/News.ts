export interface News{
    id: string;
    createdAt: Date;
    content: Content[];
}

export interface Content{
        id: string;
        newsId: string;
        title: string;
        description: string;
        imageURL: string;
        type: string;
        createdAt:string;
        text:string[]
}