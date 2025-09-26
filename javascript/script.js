ATIVIDADE 1

// let livro = {
//   titulo: "Abra Cadabra",
//   autor: "Lero Lero",
//   ano: "2000"
// }

// console.log(livro)



ATIVIDADE 2


// Crie um objeto chamado carro com as propriedades: marca, modelo, ano.

// Depois, adicione a propriedade cor.

// Por fim, mostre no console uma frase assim: "Meu carro é um Ford Ka de 2018 na cor vermelha"


// let carro = {
//   marca: "Ford", 
//   modelo: 'Ka',
//   ano: '2018'
// }

// carro.cor = ('Vermelho');
// console.log(`Meu carro é um ${carro.marca} ${carro.modelo} de ${carro.ano} na cor ${carro.cor}`);







ATIVIDADE 3
// Crie um array chamado produtos que contenha 3 objetos, cada um representando um produto com as propriedades:
// nome, preco e estoque.

// Depois percorra o array e exiba no console todos os nomes e preços dos produtos.

// let produtos = [
//   {
//     nome: "Celular",
//     preco: "2000",
//     estoque: "50"
//   }
// ];

// console.log(` O produto é o ${produtos.nome}, o preço é ${produtos.preco} e tem ${estoque} unidades no estoque`)

ATIVIDADE 4
// Desafio em Grupo - [5xp]:

// Criar um sistema de cadastro de usuários no console:

// O programa deve começar com um array vazio usuarios = [].

// Cada usuário deve ser um objeto com: nome, idade e email.

// O grupo deve criar funções para:
// Adicionar novo usuário.

// Listar todos os usuários cadastrados.
// Atualizar o e-mail de um usuário específico.

// let usuarios = [
//   { nome: "Lucas", idade: "20", email: "lucas@gmail.com" }
// ];

// while (true) {
//   let resposta = prompt("Deseja adicionar um novo usuário? (sim/não): ").toLowerCase();

//   if (resposta === "sim") {
//     usuarios.push({
//       nome: prompt("Digite o nome do usuário: "),
//       idade: prompt("Digite a idade do usuário: "),
//       email: prompt("Digite o e-mail do usuário: ")
//     });

//     console.log("Usuário adicionado com sucesso!");
//     console.log(usuarios);

//   } else if (resposta === "não" || resposta === "nao") {
//     console.log("Encerrando o sistema...");
//     break;

//   } else {
//     console.log("Resposta inválida! Digite 'sim' ou 'não'.");
//   }
// }

// usuarios[0].email ='lcsouza@gmail.com';
// usuarios[2].email = 'lucas@gmail.com';

// console.log(usuarios);




ATIVIDADE PRA CASA

// Deve ter um array biblioteca com objetos representando livros.

// Cada livro deve ter: titulo, autor, ano, emprestado (true/false).


// O sistema deve permitir:

// Cadastrar um novo livro.
// Listar todos os livros.
// Marcar um livro como emprestado.
// Mostrar apenas os livros disponíveis.
