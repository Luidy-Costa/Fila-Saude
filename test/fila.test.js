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
// Pense em: valores de fronteira, arredondamento, datas, combinações de regras e entradas inválidas.

// ===========================================================================
// 1. TESTE: calcularIdade (Foco: Valores de fronteira e cálculo com datas)
// ===========================================================================
test("calcularIdade: valida o valor de fronteira da véspera do aniversário", () => {
  // Cenário de Borda: A pessoa nasceu em 15/10/1990 e a data de referência é 14/10/2026 (1 dia antes do aniversário).
  // Regra: Não deve arredondar para cima. A idade deve ser estritamente 35 anos até que o dia do aniversário seja atingido.
  const dataNascimento = "1990-10-15";
  const dataReferencia = "2026-10-14";
  const idadeEsperada = 35;

  const resultado = calcularIdade(dataNascimento, dataReferencia);

  assert.equal(resultado, idadeEsperada);
});

// ===========================================================================
// 2. TESTE: classificarPrioridade (Foco: Combinação de regras e sobreposição)
// ===========================================================================
test("classificarPrioridade: valida prioridade crítica quando há combinação de regras (80+ com emergência)", () => {
  // Cenário de Combinação: O paciente possui mais de 80 anos (Lei 13.466/2017), porém também possui estado de emergência médica.
  // Regra: A regra de emergência médica (urgencia = true) possui precedência absoluta e deve sobrepor a prioridade por idade.
  const paciente = {
    nome: "Maria",
    dataNascimento: "1930-01-01", // 96 anos (Prioridade Especial)
    urgencia: true,              // Emergência médica
  };
  const dataReferencia = "2026-10-15";
  const prioridadeEsperada = "EMERGENCIA";

  const resultado = classificarPrioridade(paciente, dataReferencia);

  assert.equal(resultado, prioridadeEsperada);
});

// ===========================================================================
// 3. TESTE: ordenarFila (Foco: Critérios de desempate e precisão de horários ISO)
// ===========================================================================
test("ordenarFila: desempata pacientes da mesma faixa de prioridade pelo horário exato em milissegundos", () => {
  // Cenário de Arredondamento/Datas ISO: Dois pacientes de mesma prioridade (Geral) com chegada no mesmo minuto,
  // porém diferindo apenas por milissegundos na string ISO de data/horário.
  // Regra: O paciente que chegou 400ms antes (ID 2) deve ser posicionado à frente na fila.
  const pacientes = [
    { id: 1, dataNascimento: "2000-01-01", dataChegada: "2026-10-15T08:00:00.500Z" }, // Chegou depois (+500ms)
    { id: 2, dataNascimento: "2000-01-01", dataChegada: "2026-10-15T08:00:00.100Z" }, // Chegou primeiro (+100ms)
  ];
  const dataReferencia = "2026-10-15";

  const filaOrdenada = ordenarFila(pacientes, dataReferencia);
  const ordemIdsResultado = filaOrdenada.map((p) => p.id);

  assert.deepEqual(ordemIdsResultado, [2, 1]);
});

// ===========================================================================
// 4. TESTE: nomeParaPainel (Foco: Entradas inválidas e limpeza de caracteres)
// ===========================================================================
test("nomeParaPainel: trata entradas inválidas e nomes com múltiplos espaços/quebras de linha", () => {
  // Cenário de Entradas Inválidas e Formatação:
  // 1. Trata espaçamentos irregulares, tabulações (\t) e quebras de linha (\n) limpando e extraindo apenas o primeiro e último nome.
  // 2. Trata entradas não-string (como null, undefined ou números) retornando uma string vazia sem lançar exceções.
  const nomeComEspacosComplexos = "  Ana\t Maria \n Souza ";
  
  assert.equal(nomeParaPainel(nomeComEspacosComplexos), "Ana Souza");
  assert.equal(nomeParaPainel(null), "");
  assert.equal(nomeParaPainel(12345), "");
});
