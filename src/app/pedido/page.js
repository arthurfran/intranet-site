"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PedidoPage() {
  const [itens, setItens] = useState([]);
  const [localSelecionado, setLocalSelecionado] = useState("");
  const [itemId, setItemId] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [carrinho, setCarrinho] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/itens")
      .then((res) => res.json())
      .then((data) => setItens(data));
  }, []);

  const locais = [...new Set(itens.map((item) => item.local))];
  const itensFiltrados = itens.filter(
    (item) => item.local === localSelecionado
  );

  const adicionarAoCarrinho = () => {
    const itemSelecionado = itens.find((item) => item.id === parseInt(itemId));
    if (!itemSelecionado || quantidade <= 0) return;

    setCarrinho([
      ...carrinho,
      {
        id: itemSelecionado.id,
        nome: itemSelecionado.nome,
        local: itemSelecionado.local,
        uf: itemSelecionado.uf,
        quantidade: parseInt(quantidade),
      },
    ]);

    setItemId("");
    setQuantidade(1);
  };

  const finalizarPedido = async () => {
    const response = await fetch("/api/pedido-multi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itens: carrinho }),
    });

    if (response.ok) {
      alert("Pedido realizado com sucesso!");
      setCarrinho([]);
      router.push("/");
    } else {
      alert("Erro ao realizar o pedido.");
    }
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Realizar Pedido</h1>

      <div style={{ marginBottom: "1.5rem" }}>
        <label htmlFor="local">Local:</label>
        <select
          id="local"
          value={localSelecionado}
          onChange={(e) => {
            setLocalSelecionado(e.target.value);
            setItemId("");
          }}
          required
          style={{ display: "block", margin: "0.5rem 0 1rem 0" }}
        >
          <option value="">-- Escolha o local --</option>
          {locais.map((local, idx) => (
            <option key={idx} value={local}>
              {local}
            </option>
          ))}
        </select>

        {localSelecionado && (
          <>
            <label htmlFor="item">Item:</label>
            <select
              id="item"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              style={{ display: "block", margin: "0.5rem 0 1rem 0" }}
            >
              <option value="">-- Escolha um item --</option>
              {itensFiltrados.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nome} - {item.quantidade} {item.uf} disponíveis
                </option>
              ))}
            </select>

            <label htmlFor="quantidade">Quantidade:</label>
            <input
              type="number"
              id="quantidade"
              value={quantidade}
              min={1}
              onChange={(e) => setQuantidade(e.target.value)}
              style={{ display: "block", marginBottom: "1rem" }}
            />

            <button type="button" onClick={adicionarAoCarrinho}>
              Adicionar ao Pedido
            </button>
          </>
        )}
      </div>

      {carrinho.length > 0 && (
        <div>
          <h2>Itens no Pedido:</h2>
          <ul>
            {carrinho.map((item, index) => (
              <li key={index}>
                {item.nome} ({item.local}) - {item.quantidade} {item.uf}
              </li>
            ))}
          </ul>
          <button style={{ marginTop: "1rem" }} onClick={finalizarPedido}>
            Finalizar Pedido
          </button>
        </div>
      )}
    </main>
  );
}
