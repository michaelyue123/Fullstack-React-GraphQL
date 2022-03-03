import { EntityManager } from "@mikro-orm/postgresql";
import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { Redis } from "ioredis";

export type MyContext = {
  em: EntityManager;
  req: Request & {
    session: Session & Partial<SessionData> & { userId: number };
  };
  redis: Redis;
  res: Response;
};
