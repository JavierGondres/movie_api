import express, { json } from "express";                                                                                                                              

export const createApp = () => {
    const app = express();
    app.use(json());
    app.disable("x-powered-by")

    const PORT = process.env.PORT ?? 1234

    app.listen(PORT, () => {
        console.log(`Server is listening on port http://localhost:${PORT}`)
    })
}

createApp()