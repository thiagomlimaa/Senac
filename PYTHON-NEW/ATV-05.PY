# Exercício 01 - 2xp:

# Crie uma lista com cinco nomes de tecnologias usadas no desenvolvimento web (por exemplo: HTML, CSS, etc). Depois:
# Adicione mais uma tecnologia
# Remova outra
# Exiba a lista final

# tec = ["HTML", "CSS", "JS" "REACT.JS", "ANGULAR"]
# tec.append("JQuery")
# tec.remove("ANGULAR")
# print(tec)


# Exercício 02 - 2xp:

# Crie uma tupla com os quatro níveis de permissão de um sistema: ("guest", "user", "moderator", "admin") Em seguida:
# Exiba o primeiro e o último nível
# Explique com um comentário no código por que uma tupla é ideal nesse caso

# permissao = ("guest", "user", "moderador", "admin")
# print(permissao[0])
# print(permissao[-1])

# Tuplas não podem ser auteradas após ser criadar, sendo mais segura pra porteger dados sensíveis, assim os níveis de permissões não mudam. 



# Crie um dicionário chamado produto contendo:
# nome
# preço
# quantidade
# tags (lista de palavras-chave)
# Depois:

# Adicione uma nova tag
# Atualize o preço
# Exiba todas as chaves e valores formatados assim:

# ​nome: Monitor
# ​preço: 899.90​quantidade: 5​
# tags: ['eletronico', 'video']

produtos = {
    "nome": "Monitor",
    "preco": 89.90,
    "quantidade": 5,
    "tag": ['eletronico', 'videoo']
}

produtos["nome"] =  "Monitor"
produtos["preco"] = 1200.00
produtos["quantidade"] = 5
produtos["tag"] = "244Hz", "curvado"


print(produtos)
for chave, valor in produtos.items():
     print(chave, valor)

# print(produtos)

