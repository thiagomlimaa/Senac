from usuarios import adicionar_usuario, listar_usuarios, buscar_usuario, remover_usuario

def exibir_menu():
    print("\n------ MENU CRUD ---------")
    print("1 - Adicionar usuário")
    print("2 - Listar usuários")
    print("3 - Buscar usuário")
    print("4 - Remover usuário")
    print("0 - Sair")

def executar_menu():
    while True:
        exibir_menu()

        opcao = input("Escolha uma opção: ")