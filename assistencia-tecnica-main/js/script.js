
//Colocar underline no link que for selecionado
let links = document.querySelectorAll("ul li a");

    links.forEach(function(link) {
      link.addEventListener("click", function() {
        // tira o sublinhado de todos
        links.forEach(function(l) {
          l.style.textDecoration = "none";
        });

        // coloca só no clicado
        this.style.textDecoration = "underline";
      });
    });