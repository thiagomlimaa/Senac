import json
import os

caminho_BD = os.path.join("dados", "usuarios.json")

def ler_arquivo():
    try:
        with open(caminho_BD, "r", encoding="utf-8") as f:
            return json.load(f)

    except FileNotFoundError:
        with open(caminho_BD, "w", encoding="utf-8") as f:
            json.dump([], f, indent=4)
            return []

def escrever_arquivo(dados):
    try:
        with open(caminho_BD, "w", encoding="utf-8") as f:
            json.dump(dados, f, indent=4)
    except Exception as e:
        print(f"Erro ao escrever o arquivo {e}")