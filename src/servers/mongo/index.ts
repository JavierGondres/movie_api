import { Collection } from "mongodb";
import { createApp } from "../..";
import { AuthModel } from "../../models/mongo/auth";
import { MovieModel } from "../../models/mongo/movies";
import { UserModel } from "../../models/mongo/users";
import { MongoSingleton } from "../../services/MongoSingleton";
import { DB, DBCollections } from "../../types/enum";
import { RentalModel } from "../../models/mongo/rentals";
import { PurchaseModel } from "../../models/mongo/purchases";

const userCollection = MongoSingleton.getClient()
   .db(DB.movie_api)
   .collection(DBCollections.USERS);
const movieCollection = MongoSingleton.getClient()
   .db(DB.movie_api)
   .collection(DBCollections.MOVIES);
const userSessionCollection = MongoSingleton.getClient()
   .db(DB.movie_api)
   .collection(DBCollections.USER_SESSIONS);
const moviesLogsCollection = MongoSingleton.getClient()
   .db(DB.movie_api)
   .collection(DBCollections.MOVIE_LOGS);
const purchasesCollection = MongoSingleton.getClient()
   .db(DB.movie_api)
   .collection(DBCollections.PURCHASES);
const rentalsCollection = MongoSingleton.getClient()
   .db(DB.movie_api)
   .collection(DBCollections.RENTALS);

createApp({
   userModel: new UserModel(userCollection, new MovieModel(movieCollection, moviesLogsCollection)),
   authModel: new AuthModel(userCollection, userSessionCollection),
   movieModel: new MovieModel(movieCollection, moviesLogsCollection),
   rentalModel: new RentalModel(
      rentalsCollection,
      new MovieModel(movieCollection, moviesLogsCollection)
   ),
   purchaseModel: new PurchaseModel(
      purchasesCollection,
      new MovieModel(movieCollection, moviesLogsCollection)
   ),
   userCollection: userCollection as unknown as Collection<Document>,
   movieCollection: movieCollection as unknown as Collection<Document>,
   userSessionCollection:
      userSessionCollection as unknown as Collection<Document>,
   purchasesCollection: purchasesCollection as unknown as Collection<Document>,
});
