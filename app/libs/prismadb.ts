import { PrismaClient } from "@prisma/client";
// import { withOptimize } from "@prisma/extension-optimize";


declare global {
    var prisma: PrismaClient | undefined;
}

const client = new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
