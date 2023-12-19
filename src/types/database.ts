import { Collection } from "mongodb";

export interface Database {
   userModel: any;
   movieModel: any;
   authModel: any;
   rentalModel: any;
   purchaseModel: any;
   userCollection: Collection<Document>;
   userSessionCollection: Collection<Document>;
   purchasesCollection: Collection<Document>;
   movieCollection: Collection<Document>;
}
