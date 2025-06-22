import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config";
// import config from "./config";


let server: Server;

const PORT = 5000;

async function main() {
  try {
    // console.log(config);
    // await client.connect();
    // await mongoose.connect(config.database_url!);
    await mongoose.connect(
        `mongodb+srv://${config.database_name}:${config.database_pass}@cluster0.drbdyi3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
      
      
    );
    console.log("Connected to MongoDB Using Mongoose!!");
    server = app.listen(config.port, () => {
      // server = app.listen(PORT, () => {
      // console.log(`App is listening on port ${PORT}`);
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
    console.log(config.database_name)
  }
}

main();