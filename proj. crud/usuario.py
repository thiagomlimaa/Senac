from arquivo import ler_arquivo, escrever_arquivo

def adicionar_usuario(nome, email):
    usuarios = ler_arquivo()

    for usuario in usuarios:
        if usuario["email"] == email:
            print("Erro: usuario ja cadastrado")
            return
    
    usuarios.append({"nome": nome, "email": email})
    escrever_arquivo(usuarios)
    print("Usuario adicionado com sucesso!")

def listar_usuarios():
    usuarios = ler_arquivo()

    if not usuarios:
        print("Nenhum usuario cadastrado")
        return

    for usuario in usuarios:
        print(f'Nome: {usuario["nome"]} - Email: {usuario["email"]}')

def buscar_usuario(email):
    usuarios = ler_arquivo()

    for usuario in usuarios:
        if usuario["email"] == email:
            print(f'Usuario envontrado: Nome: {usuario["nome"]} - Email: {usuario["email"]}')
            return usuario

    print("Usuário não encontrado")
    return None

def remover_usuario(email):
    usuarios = ler_arquivo()

    novo_bd = []

    for usuario in usuarios:
        if usuario["email"] != email:
            novo_bd.append(usuario)

    if len(novo_bd) == len(usuarios):
        print("Usuario não encontrado")
        return

    escrever_arquivo(novo_bd)
    print("Usuário removido com sucesso!")