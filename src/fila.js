// Parte 1: cole aqui, SEM ALTERAÇÕES, o código gerado pela IA a partir de requisitos.md.
// Faça um commit com a mensagem "Código original gerado pela IA" antes de mexer em qualquer coisa.
// As correções da Parte 2 devem ir em commits separados.

function calcularIdade(dataNascimento, dataReferencia) {
  throw new Error("Ainda não implementado: cole aqui o código gerado pela IA.");
}

function classificarPrioridade(paciente, dataReferencia) {
 const refDate = new Date(dataReferencia);
  const nasc = new Date(paciente.dataNascimento);

  // Cálculo da idade exata em anos
  let idade = refDate.getFullYear() - nasc.getFullYear();
  const m = refDate.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && refDate.getDate() < nasc.getDate())) {
    idade--;
  }

  // 1. Emergência / Urgência médica crítica
  if (paciente.urgencia || paciente.gravidade === "EMERGENCIA") {
    return "EMERGENCIA";
  }

  // 2. Prioridade Especial (Lei 13.466/2017 - Octogenários)
  if (idade >= 80) {
    return "PRIORIDADE_80_MAIS";
  }

  // 3. Demais prioridades legais (Gestantes, PWD, Idosos 60+, Lactantes, etc.)
  if (
    idade >= 60 ||
    paciente.gestante ||
    paciente.pne ||
    paciente.deficiente ||
    paciente.lactante ||
    paciente.comMorbidade ||
    paciente.prioritario
  ) {
    return "PRIORIDADE_LEGAL";
  }

  // 4. Atendimento Geral / Convencional
  return "GERAL";
}

function ordenarFila(pacientes, dataReferencia) {
  const refDate = new Date(dataReferencia);

  function calcularIdade(dataNascimento) {
    const nasc = new Date(dataNascimento);
    let idade = refDate.getFullYear() - nasc.getFullYear();
    const m = refDate.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && refDate.getDate() < nasc.getDate())) {
      idade--;
    }
    return idade;
  }

  function obterNivelPrioridade(p) {
    const idade = calcularIdade(p.dataNascimento);

    if (p.urgencia || p.gravidade === "EMERGENCIA") return 1;
    if (idade >= 80) return 2;
    if (
      idade >= 60 ||
      p.gestante ||
      p.pne ||
      p.deficiente ||
      p.lactante ||
      p.comMorbidade ||
      p.prioritario
    ) {
      return 3;
    }
    return 4;
  }

  return [...pacientes].sort((a, b) => {
    const nivelA = obterNivelPrioridade(a);
    const nivelB = obterNivelPrioridade(b);

    if (nivelA !== nivelB) {
      return nivelA - nivelB;
    }

    const idadeA = calcularIdade(a.dataNascimento);
    const idadeB = calcularIdade(b.dataNascimento);

    if (idadeA >= 80 && idadeB >= 80 && idadeA !== idadeB) {
      return idadeB - idadeA;
    }

    const chegadaA = new Date(a.dataChegada || a.criadoEm || 0).getTime();
    const chegadaB = new Date(b.dataChegada || b.criadoEm || 0).getTime();

    return chegadaA - chegadaB;
  });
}

function nomeParaPainel(nomeCompleto) {
  throw new Error("Ainda não implementado: cole aqui o código gerado pela IA.");
}

module.exports = { calcularIdade, classificarPrioridade, ordenarFila, nomeParaPainel };
