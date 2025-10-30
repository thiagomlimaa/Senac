# TABUADA

# def tabuada(numero):
#     print(f"--- Tabuada do {numero} ---")
#     for i in range(1, 11):
#         print(f"{numero} x {i} = {numero * i}")

# tabuada(7)


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