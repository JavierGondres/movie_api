import express, { json } from "express";                                                                                                                              
import '.'
export const createApp = async() => {
    const app = express();
    app.use(json());
    app.disable("x-powered-by")

    const PORT = process.env.PORT ?? 1234

    console.log('holaaa')
    app.get('/', (_req, res) => {
        res.send('Hola')
    })

    app.listen(PORT, () => {
        console.log(`Server is listening on port http://localhost:${PORT}`)
    })
}

createApp()