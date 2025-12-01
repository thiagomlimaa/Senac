# ATIVIDADE 1


# num = int(input("Digite algum Númeor: "))

# if num > 0:
#     print("Esse número é positivo!")
# elif num < 0:
#     print("Esse número é negativo!")
# elif num == 0: 
#     print("Esse número é zero!")





# Atividade 2



# idade = int(input("Digite sua idade: "))

# if idade >= 0 and idade <= 12:
#     print("Você é criança")
# elif idade >= 13 and idade <= 17:
#     print("Você é Adolescente")
# elif idade >= 18 and idade <= 59:
#     print("Você é Adulto")
# elif idade >= 60:
#     print("Você é Idoso")






# atividade 3

# nota1 = 7
# nota2 = 5
# nota3 = 9

# if 0 <= nota1 <= 10 and 0 <= nota2 <= 10 and 0 <= nota3 <= 10:
#     media = (nota1 + nota2 + nota3) / 3
#     print(f"Sua média das 3 notas é {media}")

#     if media < 5:
#         print("Reprovado")
#     elif media < 7:
#         print("Recuperação")
#     else:
#         print("Aprovado")
# else:
#     print("Erro: as notas devem estar entre 0 e 10.")





# ATIVIDADE 4 

# 


# Sistema de Catálogo de Produtos - Back-End Simples

# Lista para armazenar os produtos
produtos = []

def cadastrar_produto():
    """Função para cadastrar um novo produto"""
    print("\nCADASTRAR NOVO PRODUTO")
    
    nome = input("Nome do produto: ")
    preco = float(input("Preço: R$ "))
    categoria = input("Categoria: ")
    codigo = input("Código: ")
    status = input("Status (ativo/inativo): ").lower()
    
    # Criar dicionário do produto
    produto = {
        "nome": nome,
        "preco": preco,
        "categoria": categoria,
        "codigo": codigo,
        "status": ("ativo", "inativo") if status == "ativo" else ("inativo", "ativo")
    }
    
    produtos.append(produto)
    print(f"\n✓ Produto '{nome}' cadastrado com sucesso!")

def buscar_por_categoria():
    """Função para buscar produtos por categoria"""
    print("\nBUSCAR PRODUTOS POR CATEGORIA")
    
    categoria_busca = input("Digite a categoria: ")
    encontrados = []
    
    for produto in produtos:
        if produto["categoria"].lower() == categoria_busca.lower():
            encontrados.append(produto)
    
    if encontrados:
        print(f"\n{len(encontrados)} produto(s) encontrado(s):")
        for p in encontrados:
            print(f"  - {p['nome']} | R$ {p['preco']:.2f} | Status: {p['status'][0]}")
    else:
        print("Nenhum produto encontrado nesta categoria.")

def atualizar_status():
    """Função para atualizar o status de um produto usando tupla"""
    print("\nATUALIZAR STATUS")
    
    codigo_busca = input("Digite o código do produto: ")
    
    for produto in produtos:
        if produto["codigo"] == codigo_busca:
            # A tupla tem (status_atual, status_alternativo)
            # Inverter a tupla para mudar o status
            produto["status"] = (produto["status"][1], produto["status"][0])
            print(f"\n✓ Status atualizado para: {produto['status'][0]}")
            return
    
    print("Produto não encontrado.")

def gerar_relatorio():
    """Função para gerar relatório com total e média de preços"""
    print("\n--- RELATÓRIO DE PRODUTOS ---")
    
    if not produtos:
        print("Nenhum produto cadastrado ainda.")
        return
    
    # Total de produtos
    total_produtos = len(produtos)
    print(f"\nTotal de produtos: {total_produtos}")
    
    # Média de preço por categoria
    print("\nMédia de preço por categoria:")
    categorias = {}
    
    for produto in produtos:
        cat = produto["categoria"]
        if cat not in categorias:
            categorias[cat] = []
        categorias[cat].append(produto["preco"])
    
    for categoria, precos in categorias.items():
        media = sum(precos) / len(precos)
        print(f"  {categoria}: R$ {media:.2f}")

def listar_produtos():
    """Função auxiliar para listar todos os produtos"""
    print("\n LISTA DE PRODUTOS")
    
    if not produtos:
        print("Nenhum produto cadastrado.")
        return
    
    for i, p in enumerate(produtos, 1):
        print(f"{i}. {p['nome']} | R$ {p['preco']:.2f} | {p['categoria']} | Código: {p['codigo']} | Status: {p['status'][0]}")

# Menu principal
def menu():
    """Menu principal do sistema"""
    while True:
        print("\nSISTEMA DE CATALOGO DE PRODUTOS")
        print("1. Cadastrar novo produto")
        print("2. Buscar produtos por categoria")
        print("3. Atualizar status (ativo/inativo)")
        print("4. Gerar relatorio")
        print("5. Listar todos os produtos")
        print("0. Sair")
        
        opcao = input("\nEscolha uma opção: ")
        
        if opcao == "1":
            cadastrar_produto()
        elif opcao == "2":
            buscar_por_categoria()
        elif opcao == "3":
            atualizar_status()
        elif opcao == "4":
            gerar_relatorio()
        elif opcao == "5":
            listar_produtos()
        elif opcao == "0":
            print("\nEncerrando o sistema. Até logo!")
            break
        else:
            print("\n❌ Opção inválida! Tente novamente.")

# Executar o programa
if __name__ == "__main__":
    menu()





















    # Sistema de Catalogo de Produtos

produtos = []

def cadastrar_produto():
    print("\nCADASTRAR NOVO PRODUTO")
    nome = input("Nome do produto: ")
    preco = float(input("Preco: R$ "))
    categoria = input("Categoria: ")
    codigo = input("Codigo: ")
    status = input("Status (ativo/inativo): ")
    
    produto = {
        "nome": nome,
        "preco": preco,
        "categoria": categoria,
        "codigo": codigo,
        "status": (status, "ativo" if status == "inativo" else "inativo")
    }
    
    produtos.append(produto)
    print(f"Produto '{nome}' cadastrado!")

def buscar_por_categoria():
    print("\nBUSCAR PRODUTOS POR CATEGORIA")
    categoria_busca = input("Digite a categoria: ")
    
    for produto in produtos:
        if produto["categoria"] == categoria_busca:
            print(f"{produto['nome']} - R$ {produto['preco']:.2f} - {produto['status'][0]}")

def atualizar_status():
    print("\nATUALIZAR STATUS")
    codigo_busca = input("Digite o codigo do produto: ")
    
    for produto in produtos:
        if produto["codigo"] == codigo_busca:
            produto["status"] = (produto["status"][1], produto["status"][0])
            print(f"Status atualizado para: {produto['status'][0]}")
            return
    
    print("Produto nao encontrado.")

def gerar_relatorio():
    print("\nRELATORIO DE PRODUTOS")
    
    total_produtos = len(produtos)
    print(f"Total de produtos: {total_produtos}")
    
    print("\nMedia de preco por categoria:")
    categorias = {}
    
    for produto in produtos:
        cat = produto["categoria"]
        if cat not in categorias:
            categorias[cat] = []
        categorias[cat].append(produto["preco"])
    
    for categoria, precos in categorias.items():
        media = sum(precos) / len(precos)
        print(f"{categoria}: R$ {media:.2f}")

def listar_produtos():
    print("\nLISTA DE PRODUTOS")
    for p in produtos:
        print(f"{p['nome']} - R$ {p['preco']:.2f} - {p['categoria']} - Codigo: {p['codigo']} - {p['status'][0]}")

while True:
    print("\nSISTEMA DE CATALOGO DE PRODUTOS")
    print("1. Cadastrar novo produto")
    print("2. Buscar produtos por categoria")
    print("3. Atualizar status (ativo/inativo)")
    print("4. Gerar relatorio")
    print("5. Listar todos os produtos")
    print("0. Sair")
    
    opcao = input("\nEscolha uma opcao: ")
    
    if opcao == "1":
        cadastrar_produto()
    elif opcao == "2":
        buscar_por_categoria()
    elif opcao == "3":
        atualizar_status()
    elif opcao == "4":
        gerar_relatorio()
    elif opcao == "5":
        listar_produtos()
    elif opcao == "0":
        print("Encerrando o sistema.")
        break
    else:
        print("Opcao invalida!")