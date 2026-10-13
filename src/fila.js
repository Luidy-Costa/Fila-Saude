// Parte 1: cole aqui, SEM ALTERAÇÕES, o código gerado pela IA a partir de requisitos.md.
// Faça um commit com a mensagem "Código original gerado pela IA" antes de mexer em qualquer coisa.
// As correções da Parte 2 devem ir em commits separados.

function calcularIdade(dataNascimento, dataReferencia) {
  const [anoNasc, mesNasc, diaNasc] = dataNascimento.split('-').map(Number);
  const [anoRef, mesRef, diaRef] = dataReferencia.split('-').map(Number);

  let idade = anoRef - anoNasc;

  if (mesRef < mesNasc || (mesRef === mesNasc && diaRef < diaNasc)) {
    idade--;
  }

  return idade;
}

function classificarPrioridade(paciente, dataReferencia) {
  throw new Error("Ainda não implementado: cole aqui o código gerado pela IA.");
}

function ordenarFila(pacientes, dataReferencia) {
  throw new Error("Ainda não implementado: cole aqui o código gerado pela IA.");
}

function nomeParaPainel(nomeCompleto) {
  throw new Error("Ainda não implementado: cole aqui o código gerado pela IA.");
}

module.exports = { calcularIdade, classificarPrioridade, ordenarFila, nomeParaPainel };
