"use client";

import { useEffect, useState } from "react";

export default function EntradasPage() {
  const [itens, setItens] = useState([]);
  const [itemId, setItemId] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    fetch("/api/itens")
      .then((res) => res.json())
      .then((data) => setItens(data));
  }, []);

  const enviarEntrada = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/entradas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, quantidade }),
    });

    if (response.ok) {
      setMensagem("Entrada registrada com sucesso!");
      setItemId("");
      setQuantidade(1);
    } else {
      const res = await response.json();
      setMensagem(`Erro: ${res.error}`);
    }
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Registrar Entrada de Item</h1>
      <form onSubmit={enviarEntrada} style={{ maxWidth: "400px" }}>
        <label htmlFor="item">Item:</label>
        <select
          id="item"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          required
          style={{ display: "block", margin: "0.5rem 0 1rem 0" }}
        >
          <option value="">-- Selecione um item --</option>
          {itens.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nome} ({item.local}) - {item.quantidade} {item.uf}
            </option>
          ))}
        </select>

        <label htmlFor="quantidade">Quantidade a adicionar:</label>
        <input
          type="number"
          id="quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(parseInt(e.target.value))}
          min={1}
          required
          style={{ display: "block", marginBottom: "1rem" }}
        />

        <button type="submit">Confirmar Entrada</button>
      </form>
      {mensagem && <p style={{ marginTop: "1rem" }}>{mensagem}</p>}
    </main>
  );
}
