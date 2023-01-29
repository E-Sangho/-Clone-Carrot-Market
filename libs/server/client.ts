import { PrismaClient } from "@prisma/client";
/* eslint no-var: off */
declare global {
	var client: PrismaClient | undefined;
}

const client = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = client;

export default client;
