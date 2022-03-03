import "reflect-metadata";
import { UserResolver } from "./resolvers/user";
import { PostResolver } from "./resolvers/post";
import { MikroORM } from "@mikro-orm/core";
import { COOKIE_NAME, __prod__ } from "./constants";
import microConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import cors from "cors";
import Redis from "ioredis";

import session from "express-session";
import connectRedis from "connect-redis";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  const app = express();

  // ioredis
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

  // set up cookie
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
        disableTTL: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: "lax", // Cross-site request forgery (CSRF), also known as one-click attack or session riding and abbreviated as CSRF or XSRF
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: "eqwasdasfwereqwqw",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
