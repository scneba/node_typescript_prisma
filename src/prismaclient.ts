//for jest testing https://www.prisma.io/docs/guides/testing/unit-testing

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;
