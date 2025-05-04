import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const data = await request.formData();
  const itemId = parseInt(data.get("itemId"));
  const quantidade = parseInt(data.get("quantidade"));

  if (!itemId || !quantidade || quantidade <= 0) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  const item = await prisma.item.findUnique({ where: { id: itemId } });
  if (!item) {
    return NextResponse.json({ error: "Item não encontrado" }, { status: 404 });
  }

  if (item.quantidade < quantidade) {
    return NextResponse.json(
      { error: "Quantidade insuficiente em estoque" },
      { status: 400 }
    );
  }
  await prisma.item.update({
    where: { id: itemId },
    data: { quantidade: item.quantidade - quantidade },
  });

  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    "localhost:3000";
  const url = new URL(`http://${host}/`);
  return NextResponse.redirect(url, 303);
}
