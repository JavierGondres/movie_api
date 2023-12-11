import { MongoClient } from "mongodb";
 
// Replace the following with your Atlas connection string                                                                                                                                   
const url = "mongodb+srv://testUser:testUser22@cluster0.7uxpn75.mongodb.net/?retryWrites=true&w=majority";
console.log('hola')
// Connect to your Atlas cluster
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Successfully connected to Atlas");

    } catch (err: any) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);