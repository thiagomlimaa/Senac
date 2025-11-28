from flask import Flask, request

app = Flask(__name__)

@app.route('/form', methods=["GET", "POST"])
def form():
     

    




























if __name__ == "__main__":
    app.run(debug=True)
