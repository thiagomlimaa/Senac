// Solicita o nome do usuário
let nome = prompt("Digite seu nome:");

// Solicita a idade do usuário
let idadeString = prompt("Digite sua idade:");

// Converte a idade para número
let idade = Number(idadeString);

// Soma 10 à idade
let idadeFutura = idade + 10;

// Exibe o resultado no console
console.log(`Olá, ${nome}! Sua idade daqui a 10 anos será: ${idadeFutura}`);
