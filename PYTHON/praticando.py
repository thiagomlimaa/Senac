# ATIVIDADE 1
# def boas_vindas():
#     print("Bem-vindo(a) ao sistema de cadastro de clientes! ")

# boas_vindas()




# ATIVIDADE 2
# def dobro(num):
#     print(f"o dobro de {num} é {num * 2}")

# num = float(input("Digite um número: "))

# dobro(num)



# ATIVIDADE 3
# def calcular_frete(valor_compra, distancia_km):
#     if valor_compra < 100:
#         frete = distancia_km * 1.5
#     else:
#         frete = 0

#     valor_final = valor_compra + frete
#     return valor_final

# valor_compra = float(input("Qual o valor da compra? "))
# distancia_km = float(input("Qual é a distância? "))
        

# calcular_frete(valor_compra, distancia_km)

# print(f"Valor final da compra com o frete fica R${calcular_frete(valor_compra, distancia_km):.2f}")






# ATIVIDADE 4
# Crie um programa completo chamado “Gestor de Produtos” usando funções. Requisitos: 
 
#  Uma função menu() que mostre as opções:
#    . Cadastrar produto
#    . Listar produtos
#    . Calcular valor total em estoque
#    . Sair 
 
#  Uma função cadastrar_produto(nome, preco, quantidade) que adicione um produto a uma lista. 
 
#  Uma função listar_produtos() que mostre todos os produtos. 
 
#  Uma função calcular_total() que retorne o valor total (preço × quantidade). 
 
#  Use laços e estruturas condicionais para controlar o fluxo.



def menu():
    print("Gestor de Produtos")
    print("1. Cadastrar produto")
    print("2. Listar produtos")
    print("3. Calcular valor total em estoque")
    print("4. Sair")
    return input("Escolha uma opção: ")

def cadastrar_produto(produtos):
    nome = input("Nome do produto: ")
    preco = float(input("Preço do produto: "))
    quantidade = int(input("Quantidades do produto: "))
    produtos.append({"nome": nome, "preco": preco, "quantidade": quantidade})

def listar_produtos(produtos):
    if not produtos:
        print("Não a produtos cadastrado")
    else:
        print(f"Produto '{nome}' cadastrado com sucesso!")
        for p in produtos:
            print(f"{p['nome']} - R${p['preco']:.2f} - {p['quantidade']} unidades")

def listar_produtos(produtos):
    if not produtos:
        print("Nenhum produto cadastrado.")
    else:
        print("\n--- Lista de Produtos ---")
        for p in produtos:
            print(f"{p['nome']} - R${p['preco']:.2f} - {p['quantidade']} unidades")

def calcular_total(produtos):
    total = sum(p['preco'] * p['quantidade'] for p in produtos)
    print(f"\nValor total em estoque: R${total:.2f}")

produtos = []

while True:
    opcao = menu()
    if opcao == '1':
        cadastrar_produto(produtos)
    elif opcao == '2':
        listar_produtos(produtos)
    elif opcao == '3':
        calcular_total(produtos)
    elif opcao == '4':
        print("Saindo do programa")
        break
    else:
        print("Tente novamente.")
        

