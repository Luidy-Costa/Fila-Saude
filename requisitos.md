# Especificação de requisitos: fila de atendimento com prioridades

**Sistema:** Recepção Digital da Unidade Básica de Saúde Vila Nova (fictícia)
**Módulo:** classificação de prioridade, ordenação da fila e exibição no painel de chamada
**Versão:** 1.0

## Contexto

A recepção registra os pacientes que chegam para atendimento. O sistema ordena a fila respeitando as prioridades previstas em lei (de forma simplificada) e mostra os nomes no painel da sala de espera.

## Interface

Implementar em JavaScript puro (Node.js), no arquivo `src/fila.js`, exportando as quatro funções no formato CommonJS:

```js
module.exports = { calcularIdade, classificarPrioridade, ordenarFila, nomeParaPainel };
```

Um **paciente** é um objeto:

```js
{
  nome: "Maria das Dores Silva",
  dataNascimento: "1958-04-12",   // "AAAA-MM-DD"
  chegada: "7:45",                // horário de chegada, horas e minutos (ex.: "7:45", "13:10")
  gestante: false,
  lactante: false,
  pcd: false,                     // pessoa com deficiência
  criancaDeColo: false
}
```

Os campos `gestante`, `lactante`, `pcd` e `criancaDeColo` podem estar ausentes; nesse caso, valem `false`.

## Requisitos funcionais

### Função 1: `calcularIdade(dataNascimento, dataReferencia)`

**RF01.** Retorna a idade em anos completos na data de referência. Datas no formato `"AAAA-MM-DD"`.

**RF02.** A pessoa completa um ano a mais no dia do aniversário.

### Função 2: `classificarPrioridade(paciente, dataReferencia)`

**RF03.** Retorna `"ESPECIAL"` para pacientes com 80 anos ou mais.

**RF04.** Retorna `"PRIORITARIO"` para pacientes com 60 anos ou mais (e menos de 80), gestantes, lactantes, pessoas com deficiência e pessoas com criança de colo.

**RF05.** Retorna `"NORMAL"` nos demais casos.

### Função 3: `ordenarFila(pacientes, dataReferencia)`

**RF06.** Retorna uma **nova** lista com os pacientes na ordem de atendimento: primeiro os `"ESPECIAL"`, depois os `"PRIORITARIO"`, depois os `"NORMAL"`.

**RF07.** Dentro do mesmo grupo, a ordem é a de chegada: quem chegou primeiro é atendido primeiro.

**RF08.** A lista original recebida como parâmetro não pode ser alterada.

### Função 4: `nomeParaPainel(nomeCompleto)`

**RF09.** Para proteger a privacidade, o painel mostra apenas o primeiro nome e a inicial do último sobrenome, seguida de ponto. Exemplo: `"MARIA DAS DORES SILVA"` resulta em `"Maria S."`.

**RF10.** O primeiro nome é exibido com a primeira letra maiúscula e as demais minúsculas. A inicial é maiúscula.

**RF11.** Espaços extras no início, no fim ou entre as palavras são ignorados.

**RF12.** Se o nome tiver uma única palavra, retorna apenas essa palavra, formatada conforme o RF10.

## Exemplo

```js
classificarPrioridade({ nome: "João", dataNascimento: "1944-05-10", chegada: "8:00" }, "2026-10-15")
// "ESPECIAL"
```
