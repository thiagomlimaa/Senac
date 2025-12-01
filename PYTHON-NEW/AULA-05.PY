# usuario = {}
# usuario = dict()
# usuario = {
#     "nome": "Ana",
#     "idade": 25,
#     "email": "ana@example.com"
# }

# print(usuario["email"])
# usuario["cidade"] = "São Paulo"
# usuario["idade"] = 26
# del usuario["nome"]

# print(usuario)
# for chave, valor in usuario.items():
#     print(chave, valor)

# for valor in usuario.values():
#     print(valor)

# for chave in usuario:
#     print(chave)


    #Tuplas
# cores = tuple("azul", "verde", "branco")
# cores = ("azul", "verde", "branco")

pedido = {
    "cliente": "João",
    "itens": ["mouse", "teclado", "monitor"],
    "status": ("pendente", "pago", "enviado", "entregue")
}

print(type(pedido["cliente"]))
for item in pedido["itens"]:
    print("Item:", type(pedido["itens"]))

print("Status possível:", type(pedido["status"]))
print(type(pedido))