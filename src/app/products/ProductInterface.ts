export interface ProductInterface {
    id?:number;
    category?: string;
    image_url: string;
    price: number;
    total_price: number;
    title: string;
    stock?: number;
} 