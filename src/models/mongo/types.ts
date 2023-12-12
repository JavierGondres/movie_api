export interface Users {
    _id: string;
    userName: string;
    userEmail: string;
    userType: string;
}

export interface Movies {
    _id: string;
    title: string;
    description: string;
    imageURL: string;
    stock: number; 
    rentalPrice: number;
    salePrice: number;
    availability: boolean;
    lastModifiedDate: Date;
}

