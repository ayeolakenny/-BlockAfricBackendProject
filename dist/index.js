"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const path_1 = __importDefault(require("path"));
const type_graphql_1 = require("type-graphql");
const object_id_scalar_1 = require("./object-id.scalar");
const typegoose_middleware_1 = require("./typegoose-middleware");
const todo_1 = require("./resolvers/todo");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const MONGO_DB_URL = process.env.MONGO_DB_URL;
const PORT = process.env.PORT || 4000;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const app = express_1.default();
        const mongoose = yield mongoose_1.connect(MONGO_DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });
        mongoose.connection.on("open", () => console.log("DB CONNECTED"));
        const apolloServer = new apollo_server_express_1.ApolloServer({
            schema: yield type_graphql_1.buildSchema({
                resolvers: [todo_1.TodoResolver],
                emitSchemaFile: path_1.default.resolve(__dirname, "schema.gql"),
                globalMiddlewares: [typegoose_middleware_1.TypegooseMiddleware],
                scalarsMap: [{ type: mongodb_1.ObjectId, scalar: object_id_scalar_1.ObjectIdScalar }],
                validate: false,
            }),
        });
        apolloServer.applyMiddleware({ app });
        app.listen(PORT, () => console.log("Server is now running"));
    }
    catch (err) {
        console.error(err);
    }
});
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map