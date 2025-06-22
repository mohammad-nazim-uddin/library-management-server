import { MongoClient, ServerApiVersion } from "mongodb";

// MONGO_DB
const uri = `mongodb+srv://<db_name>:<db_pass>@cluster0.b6ov8m0.mongodb.net/library-management-system?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});