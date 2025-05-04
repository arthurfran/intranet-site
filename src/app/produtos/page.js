import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function EstoquePage() {
  const itens = await prisma.item.findMany();

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ marginBottom: "1rem" }}>Estoque de Itens</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Nome
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>UF</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Local
            </th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
              Quantidade
            </th>
          </tr>
        </thead>
        <tbody>
          {itens.map((item) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {item.id}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {item.nome}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {item.uf}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {item.local}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                {item.quantidade}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
