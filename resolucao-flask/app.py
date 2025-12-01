from flask import Flask, request, render_template

app = Flask(__name__)

@app.route("/form", methods=["GET", "POST"])
def form():
    if request.method == "POST":
        nome = (request.form["nome"])
        idade = int(request.form["idade"])
        return f"Olá,{nome}! Você tem {idade} anos."
    

    return render_template("form.html")


if __name__ == "__main__":
    app.run(debug=True)




















@app.route("/formulario")
def formulario():
    return render_template("formulario.html")
    
@app.route("/salvar", methods=["GET", "POST"])
def salvar():
    return render_template("cadastro.html", nome=request.form["nome"], idade=request.form["idade"] )

if __name__ == "__main__":
    app.run(debug=True)