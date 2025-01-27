import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const plays = require('./plays.json');
const invoices = require('./invoices.json');

function usd(aNumber) {
  return new Intl.NumberFormat("en-US",
    {
      style: "currency", currency: "USD",
      minimumFractionDigits: 2
    }).format(aNumber / 100);
}

function totalVolumeCredits(data) {
  return data.performances.reduce((total, performance) => total + performance.volumeCredits, 0)
}

function totalAmount(data) {
  return data.performances.reduce((total, performance) => total + performance.amount, 0)
}

/**
 * Separa-se funções para renderizar dados de N formas.
 * Cada método tem a responsabilidade apenas de renderizar os dados
 */
function renderPlainText(data) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

function renderHtml(data) {
  let result = '<h1>Statement for ${data.customer}</h1>\n';
  result += "<table>\n";
  result += "<tr><th>play</th><th>seats</th><th>cost</th>/tr>";
  for (let perf of data.performances) {
    result += `<tr><td>${perf.play.name}</td><td>${perf.audience}</td>'`
    result += `<td>${usd(perf.amount)} </td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>You earned <em>${data.totalVolumeCredits}</ems credits</p>\n`;
  return result;
}

function playFor(aPerformance) {
  return plays[aPerformance.playID];
}

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    throw new Error('Message: amount method need be implemented by subclass');
  }

  get volumeCredits() {
    throw new Error('Message: volumeCredits method need be implemented by subclass');
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;

    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }

    return result;
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0)
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 3000;

    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }

    result += 300 * this.performance.audience;

    return result;
  }

  get volumeCredits() {
    let result = 0;
    result += Math.max(this.performance.audience - 30, 0);
    result += Math.floor(this.performance.audience / 5);

    return result;
  }
}

/**
 * Cria-se sub classes para lidar com o calculo de cada tipo de
 * performance
 */
function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case "tragedy": return new TragedyCalculator(aPerformance, aPlay);
    case "comedy": return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`unknown type: ${aPlay.type}`);
  }
}

function enrichPerformance(aPerformance) {
  const result = Object.assign({}, aPerformance);

  const calculator = createPerformanceCalculator(aPerformance, playFor(result))

  result.play = calculator.play;
  result.amount = calculator.amount;
  result.volumeCredits = calculator.volumeCredits;

  return result;
}

/**
 * Prepara-se todos os dados no inicio. Evita-se fazer isso dentro de loops
 */
function createStatementData(invoice) {
  const statementData = {}
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  return statementData;
}

function statement(invoice) {
  return renderPlainText(createStatementData(invoice));
}

function htmlStatement(invoice) {
  return renderHtml(createStatementData(invoice));
}

console.log(statement(invoices[0]))
console.log(htmlStatement(invoices[0]))

