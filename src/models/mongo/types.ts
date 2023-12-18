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
   _id: string;
   title: string;
   description: string;
   imageURL: string;
   stock: number;
   rentalPrice: number;
   salePrice: number;
   availability: boolean;
   lastModifiedDate: Date;
   likes: number;
   updatesLog: Array<Logs>;
}
