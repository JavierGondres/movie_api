import { ObjectId } from "mongodb";

export interface Users {
   _id: ObjectId;
   userName: string;
   userEmail: string;
   userPassword: string | number;
   userAccesToken: string;
   userRole: string;
   isValid: boolean;
}

export type Logs = {
   title?: string;
   rentalPrice?: number;
   salePrice?: number;
   modifiedDate?: Date;
};

export interface Movies {
   _id: ObjectId;
   title: string;
   description: string;
   imageURL: string;
   stock: number;
   rentalPrice: number;
   salePrice: number;
   availability: boolean;
   lastModifiedDate: Date;
   penalty: number;
   likes: number;
   updatesLog: Array<Logs>;
}


export interface Purchases {
   quantity: number;
   purchasedDate: Date;
   salePrice: number;
}

export interface RentalPurchaseDetails
   extends Partial<Users & Purchases & Movies> {
   movieId: ObjectId;
   penalty: number;
}