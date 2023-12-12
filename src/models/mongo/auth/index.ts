import { MongoSingleton } from "../../../services/MongoSingleton"
import { DB, DBCollections } from "../../../types/enum"
import { Users } from "../types"
// import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
dotenv.config();

const db = MongoSingleton.getClient().db(DB.movie_api).collection(DBCollections.USERS)
// const roles = MongoSingleton.getClient().db(DB.movie_api).collection(DBCollections.ROLES)

export class AuthModel {
    
    static async signUp({userName, userEmail, userType, userPassword}:Users) {
        try {

            console.log('Sign')
            const newUser = {
                userName: userName,
                userEmail: userEmail,
                userPassword: userPassword,
                userType: userType ?? 'User'
            }

            // if(userType) {
            //     const foundRoles = await roles.find({roleType: {$in: userType}})
            // }

            const result = await db.insertOne(newUser)

            const token = jwt.sign({id: result.insertedId}, process.env.JWT || '', {
                expiresIn: 86400 //equivale a 24 hrs
            })

            return token

        } catch (error) {
            console.log(error)
            return null
        }
    }

}