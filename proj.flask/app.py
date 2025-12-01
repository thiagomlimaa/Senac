from flask import Flask, request, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return "<h1>Olá, Full Stack Developer!</h1>"

@app.route("/sobre")
def sobre():
    return "Esta é a página SOBRE"

@app.route("/contato")
def contato():
    return "Página de contato"


@app.route("/soma", methods=["GET", "POST"])

def soma():
    if request.method == "POST":
        n1 = int(request.form["n1"])
        n2 = int(request.form["n2"])
        return f"A soma é {n1 + n2}"

    return """
        <form method='POST'>
            Número 1: <input name='n1'><br>
            Número 2: <input name='n2'><br>
            <button type='submit'>Somar</button>
        </form>
    """

@app.route("/api/usuario")
def usuario():
    return {
        "nome": "Ana",
        "idade": 23,
        "cargo": "Estudante de Full Stack"
    }



from flask import render_template

@app.route("/inicio")
def inicio():
    return render_template("inicio.html", nome="Aluno Full Stack")


if __name__ == "__main__":
    app.run(debug=True)