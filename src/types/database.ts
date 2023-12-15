import { Collection } from "mongodb";

export interface Database {
    userModel: any;
    movieModel: any;
    authModel: any;
    userCollection: Collection<Document>;
    movieCollection: Collection<Document>;
}