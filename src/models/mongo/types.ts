export interface Users {
    _id: string;
    userName: string;
    userEmail: string;
    userPassword: string | number;
    userAccesToken: string;
    userRole: string;
    isValid: boolean
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

