"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
// import config from "./config";
let server;
const PORT = 5000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // console.log(config);
            // await client.connect();
            // await mongoose.connect(config.database_url!);
            yield mongoose_1.default.connect(`mongodb+srv://${config_1.default.database_name}:${config_1.default.database_pass}@cluster0.drbdyi3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
            console.log("Connected to MongoDB Using Mongoose!!");
            server = app_1.default.listen(config_1.default.port, () => {
                // server = app.listen(PORT, () => {
                // console.log(`App is listening on port ${PORT}`);
                console.log(`App is listening on port ${config_1.default.port}`);
            });
        }
        catch (error) {
            console.log(error);
            console.log(config_1.default.database_name);
        }
    });
}
main();
