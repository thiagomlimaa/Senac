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

valorCompra = float(input("Digite o valor da sua compra: "))
tipoCliente = input("Qual é seu tipo de cliente: ")

vip = valorCompra * 0.10
func = valorCompra * 0.20

if tipoCliente == "comum":
    print(valorCompra)
elif tipoCliente == "vip":
    print(vip)
elif tipoCliente == "funcionário":
    print(func)





nota1 = 7
nota2 = 5
nota3 = 9

if 0 <= nota1 <= 10 and 0 <= nota2 <= 10 and 0 <= nota3 <= 10:
    media = (nota1 + nota2 + nota3) / 3
    print(f"Sua média das 3 notas é {media}")

    if media < 5:
        print("Reprovado")
    elif media < 7:
        print("Recuperação")
    else:
        print("Aprovado")
else:
    print("Erro: as notas devem estar entre 0 e 10.")




    import random

numero_secreto = random.randint(1, 100)
palpite = 0

print("🎲 Adivinhe o número entre 1 e 100!")

while palpite != numero_secreto:
    palpite = int(input("Seu palpite: "))
    if palpite < numero_secreto:
        print("📈 Muito baixo!")
    elif palpite > numero_secreto:
        print("📉 Muito alto!")
    else:
        print("🎉 Parabéns! Você acertou!")