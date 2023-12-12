import express, { json } from "express";                                                                                                                              
import { MongoSingleton } from "./services/MongoSingleton";
export const createApp = async () => {
    const app = express();
    app.use(json());
    app.disable("x-powered-by")

    const PORT = process.env.PORT ?? 1234

    app.get('/', (_req, res) => {
        res.send('Hola')
    })

    const db = MongoSingleton.getClient().db("movie_api")
    console.log(await db.collection("Users").find({}).toArray())
    
    app.listen(PORT, () => {
        console.log(`Server is listening on port http://localhost:${PORT}`)
    })
}

createApp()