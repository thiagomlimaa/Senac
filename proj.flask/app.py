from flask import Flask

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

if __name__ == "__main__":
    app.run(debug=True)