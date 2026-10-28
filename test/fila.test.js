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
test("calcularIdade: 01 - idade simples (já fez aniversário no ano)", () => {
  assert.equal(calcularIdade("1990-03-01", "2026-10-15"), 36);
});

test("calcularIdade: 02 - ainda não fez aniversário no ano", () => {
  assert.equal(calcularIdade("1990-12-25", "2026-10-15"), 35);
});

test("calcularIdade: 03 - dia exato do aniversário", () => {
  assert.equal(calcularIdade("1990-10-15", "2026-10-15"), 36);
});

test("calcularIdade: 04 - nascido em ano bissexto (29 de fevereiro)", () => {
  assert.equal(calcularIdade("2000-02-29", "2026-02-28"), 25);
});

test("calcularIdade: 05 - bebê com menos de 1 ano de idade", () => {
  assert.equal(calcularIdade("2026-01-10", "2026-10-15"), 0);
});
// ===== Testes de classificarPrioridade (mínimo de 5) =====
test("classificarPrioridade: 01 - urgência/emergência médica", () => {
  const paciente = { dataNascimento: "1990-01-01", urgencia: true };
  assert.equal(classificarPrioridade(paciente, "2026-10-15"), "EMERGENCIA");
});

test("classificarPrioridade: 02 - octogenário (80+ anos)", () => {
  const paciente = { nome: "João", dataNascimento: "1944-05-10" };
  assert.equal(classificarPrioridade(paciente, "2026-10-15"), "PRIORIDADE_80_MAIS");
});

test("classificarPrioridade: 03 - prioridade legal por idade (60 a 79 anos)", () => {
  const paciente = { dataNascimento: "1960-05-10" };
  assert.equal(classificarPrioridade(paciente, "2026-10-15"), "PRIORIDADE_LEGAL");
});

test("classificarPrioridade: 04 - prioridade legal por condição especial (gestante)", () => {
  const paciente = { dataNascimento: "2000-01-01", gestante: true };
  assert.equal(classificarPrioridade(paciente, "2026-10-15"), "PRIORIDADE_LEGAL");
});

test("classificarPrioridade: 05 - atendimento geral (sem prioridades)", () => {
  const paciente = { dataNascimento: "2000-01-01" };
  assert.equal(classificarPrioridade(paciente, "2026-10-15"), "GERAL");
});
// ===== Testes de ordenarFila (mínimo de 5) =====
test("ordenarFila: 01 - ordenação por categorias de prioridade diferentes", () => {
  const pacientes = [
    { id: 1, dataNascimento: "2000-01-01", dataChegada: "2026-10-15T08:00:00Z" }, // Geral
    { id: 2, dataNascimento: "1940-01-01", dataChegada: "2026-10-15T09:00:00Z" }, // 80+
    { id: 3, dataNascimento: "2000-01-01", urgencia: true, dataChegada: "2026-10-15T10:00:00Z" }, // Emergência
    { id: 4, dataNascimento: "1960-01-01", dataChegada: "2026-10-15T08:30:00Z" }, // Prioridade Legal
  ];

  const resultado = ordenarFila(pacientes, "2026-10-15");
  assert.deepEqual(resultado.map((p) => p.id), [3, 2, 4, 1]);
});

test("ordenarFila: 02 - desempate na categoria 80+ pelo paciente mais velho", () => {
  const pacientes = [
    { id: 1, dataNascimento: "1945-01-01", dataChegada: "2026-10-15T08:00:00Z" }, // 81 anos
    { id: 2, dataNascimento: "1935-01-01", dataChegada: "2026-10-15T09:00:00Z" }, // 91 anos
  ];

  const resultado = ordenarFila(pacientes, "2026-10-15");
  assert.deepEqual(resultado.map((p) => p.id), [2, 1]);
});

test("ordenarFila: 03 - desempate no atendimento geral por ordem de chegada", () => {
  const pacientes = [
    { id: 1, dataNascimento: "2000-01-01", dataChegada: "2026-10-15T10:00:00Z" }, // Chegou depois
    { id: 2, dataNascimento: "1995-01-01", dataChegada: "2026-10-15T08:00:00Z" }, // Chegou antes
  ];

  const resultado = ordenarFila(pacientes, "2026-10-15");
  assert.deepEqual(resultado.map((p) => p.id), [2, 1]);
});

test("ordenarFila: 04 - suporte ao campo alternativo criadoEm para horário de chegada", () => {
  const pacientes = [
    { id: 1, dataNascimento: "2000-01-01", criadoEm: "2026-10-15T10:00:00Z" },
    { id: 2, dataNascimento: "2000-01-01", criadoEm: "2026-10-15T07:30:00Z" },
  ];

  const resultado = ordenarFila(pacientes, "2026-10-15");
  assert.deepEqual(resultado.map((p) => p.id), [2, 1]);
});

test("ordenarFila: 05 - imutabilidade do array original de entrada", () => {
  const pacientes = [
    { id: 1, dataNascimento: "2000-01-01" },
    { id: 2, dataNascimento: "1940-01-01" },
  ];
  const copiaOriginal = [...pacientes];

  ordenarFila(pacientes, "2026-10-15");

  assert.deepEqual(pacientes, copiaOriginal);
});
// ===== Testes de nomeParaPainel (mínimo de 5) =====

// Pense em: valores de fronteira, arredondamento, datas, combinações de regras e entradas inválidas.
