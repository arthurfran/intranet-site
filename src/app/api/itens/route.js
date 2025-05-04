import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const itens = await prisma.item.findMany();
  return NextResponse.json(itens);
}
