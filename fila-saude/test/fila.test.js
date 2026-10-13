// Parte 2: casos de teste escritos pela DUPLA, a partir de requisitos.md.
// Para rodar: npm test   (Node.js 18 ou superior; nenhuma biblioteca externa)

// Fixa o fuso horário de Fortaleza, para que os testes deem o mesmo resultado em qualquer computador.
process.env.TZ = "America/Fortaleza";

const test = require("node:test");
const assert = require("node:assert/strict");
const { calcularIdade, classificarPrioridade, ordenarFila, nomeParaPainel } = require("../src/fila.js");

// Exemplos (podem ser mantidos e contam no total):

test("EX01: idade simples", () => {
  assert.equal(calcularIdade("1990-03-01", "2026-10-15"), 36);
});

test("EX02: exemplo da especificação", () => {
  assert.equal(
    classificarPrioridade({ nome: "João", dataNascimento: "1944-05-10", chegada: "8:00" }, "2026-10-15"),
    "ESPECIAL"
  );
});

// ===== Testes de calcularIdade (mínimo de 5) =====

// ===== Testes de classificarPrioridade (mínimo de 5) =====

// ===== Testes de ordenarFila (mínimo de 5) =====

// ===== Testes de nomeParaPainel (mínimo de 5) =====

// Pense em: valores de fronteira, arredondamento, datas, combinações de regras e entradas inválidas.
