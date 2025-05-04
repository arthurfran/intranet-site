import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "2rem",
      }}
    >
      <h1 style={{ marginBottom: "1.5rem" }}>Controle de Estoque</h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link href="/pedido">
          <button style={{ padding: "0.75rem 1.5rem" }}>PIM</button>
        </Link>
        <Link href="/produtos">
          <button style={{ padding: "0.75rem 1.5rem" }}>Estoque</button>
        </Link>
      </div>
    </main>
  );
}
