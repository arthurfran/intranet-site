import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const { itemId, quantidade } = await request.json();

  if (!itemId || !quantidade || quantidade <= 0) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const item = await prisma.item.findUnique({
    where: { id: parseInt(itemId) },
  });
  if (!item) {
    return NextResponse.json({ error: "Item não encontrado" }, { status: 404 });
  }

  await prisma.item.update({
    where: { id: item.id },
    data: {
      quantidade: {
        increment: parseInt(quantidade),
      },
    },
  });

  return NextResponse.json({ message: "Entrada registrada com sucesso!" });
}
