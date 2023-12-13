import { createApp } from "../..";
import { AuthModel } from "../../models/mongo/auth";
import { UserModel } from "../../models/mongo/users";
import { MongoSingleton } from "../../services/MongoSingleton";
import { DB, DBCollections } from "../../types/enum";


const db = MongoSingleton.getClient()
   .db(DB.movie_api)
   .collection(DBCollections.USERS);


createApp({ userModel: new UserModel(db), authModel: new AuthModel(db), db:db});
