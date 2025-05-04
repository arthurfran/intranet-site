import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.item.createMany({
    data: [
      {
        nome: "Parafuso 3mm",
        uf: "cx",
        local: "Almoxarifado A",
        quantidade: 120,
      },
      { nome: "Tinta branca", uf: "lt", local: "Depósito", quantidade: 15 },
      {
        nome: "Luvas de proteção",
        uf: "par",
        local: "Almoxarifado B",
        quantidade: 40,
      },
      { nome: "Chave inglesa", uf: "un", local: "Oficina", quantidade: 10 },
      {
        nome: "Fita isolante",
        uf: "rolo",
        local: "Estoque Técnico",
        quantidade: 75,
      },
    ],
  });

  console.log("✅ Itens adicionados com sucesso!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
