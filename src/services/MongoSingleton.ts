import { MongoClient, ServerApiVersion} from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const uri: string = process.env.CONNECTION_STRING || "";

export class MongoSingleton {
   private static mongoClient: MongoClient;

   //Si a un no se ha conectado a mongo, se conecta, sino devuelve mongoClient que ya esta conectado
   static isInitialized(): boolean {
      return this.mongoClient !== undefined;
   }

   static getClient(): MongoClient {
      if (this.isInitialized()) return this.mongoClient;


      console.log('initiliaze')
      // Initialize the connection.
      this.mongoClient = new MongoClient(uri, {
         serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
         },
      });
      return this.mongoClient;
   }
}
