import { createApp } from "../..";
import { AuthModel } from "../../models/mongo/auth";
import { MovieModel } from "../../models/mongo/movies";
import { UserModel } from "../../models/mongo/users";
import { MongoSingleton } from "../../services/MongoSingleton";
import { DB, DBCollections } from "../../types/enum";

const userCollection = MongoSingleton.getClient()
   .db(DB.movie_api)
   .collection(DBCollections.USERS);
const movieCollection = MongoSingleton.getClient()
   .db(DB.movie_api)
   .collection(DBCollections.MOVIES);

createApp({
   userModel: new UserModel(userCollection),
   authModel: new AuthModel(userCollection),
   movieModel: new MovieModel(movieCollection),
   userCollection: userCollection,
   movieCollection: movieCollection,
});
