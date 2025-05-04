import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const { itens } = await request.json();

  if (!Array.isArray(itens) || itens.length === 0) {
    return NextResponse.json(
      { error: "Lista de itens inválida" },
      { status: 400 }
    );
  }

  for (const pedido of itens) {
    const item = await prisma.item.findUnique({ where: { id: pedido.id } });

    if (!item) {
      return NextResponse.json(
        { error: `Item com ID ${pedido.id} não encontrado` },
        { status: 404 }
      );
    }

    if (item.quantidade < pedido.quantidade) {
      return NextResponse.json(
        { error: `Estoque insuficiente para ${item.nome}` },
        { status: 400 }
      );
    }
  }

  for (const pedido of itens) {
    await prisma.item.update({
      where: { id: pedido.id },
      data: {
        quantidade: {
          decrement: pedido.quantidade,
        },
      },
    });
  }

  return NextResponse.json({ message: "Pedido finalizado com sucesso!" });
}
