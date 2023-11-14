import {resolvers} from "./resolvers";
import express from 'express';
import {I18nService} from "./core/services/i18.service";
import {ApolloServer} from "@apollo/server";
import {gql} from "apollo-server-express";
import * as http from "http";
import cors from 'cors';
import {expressMiddleware} from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';


const port = 3000;

const typeDefs = gql`
    ${require('fs').readFileSync(require.resolve('./schema.graphql'), 'utf8')}
`;
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({resolvers, typeDefs,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })], allowBatchedHttpRequests: true});

async function startServer() {
    await server.start();
    app.use(
        '/newapp/checkin',
        cors<cors.CorsRequest>(),
        express.json(),
        (req, res, next) => {
            const context = req;
            expressMiddleware(server, {
                context: async () => context,
            })(req, res, next);
        }
    );
    await new Promise<void>((resolve) => httpServer.listen({ port: port }, resolve));
    console.log(`🚀 Server ready at http://localhost:${port}/`);

}

startServer();

I18nService.initLocals(app);