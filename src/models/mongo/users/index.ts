import { MongoSingleton } from "../../../services/MongoSingleton"
import { DB, DBCollections } from "../../../types/enum"

const db = MongoSingleton.getClient().db(DB.movie_api).collection(DBCollections.USERS)

export class UserModel {
    
    static async getAll() {
        try {
            const users = await db.find({}).toArray()
            console.log(users)
            return(users)
        } catch (error) {
            return null
        }
    }

}