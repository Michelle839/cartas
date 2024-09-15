document.addEventListener("DOMContentLoaded", function () {
  var loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var username = document.getElementById("username").value;
      var password = document.getElementById("password").value;
      if (username === "admin" && password === "1234") {
        window.location.href = "html/cartas.html";
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    });
  }
});

/*JS DE DARLE CLICK A LAS CARTAS */
document.querySelector("#guardar").addEventListener("click", function () {
  guardarCarta();
  cargarTabla();
});
$(".cards img").click(function () {
  /* cuando se da click en una carta */ var datos =
    localStorage.getItem("datos");
  datos =
    JSON.parse(
      datos
    ); /* convierte cadena de texto JSON en un array de objetos*/
  for (let item of datos) {
    if (item.numero == this.dataset.carta) {
      /*compara si el numero es igual al data-carta en el html */
      /*dataset.carta accede al valor del atributo data-carta. */
      item.cantidad++;
    }
  }

  localStorage.setItem(
    "datos",
    JSON.stringify(datos)
  ); /*guarda en arry datos en el localStore */
  cargarTabla(); /** actualiza la tabla en la pag */
});

/*JS DE GUARDAR LAS CARTAS */
function guardarCarta() {
  var numero = document.querySelector("#numero").value;
  var descripcionCarta = document.querySelector("#descripcionCarta").value;
  var datos = localStorage.getItem("datos");
  datos = JSON.parse(datos);
  var dato = {
    numero: numero,
    descripcionCarta: descripcionCarta,
    cantidad: "0",
  };
  datos.push(dato);
  localStorage.setItem("datos", JSON.stringify(datos));
}
function cargarJSON() {
  var miObjeto = [
    { numero: "1", descripcionCarta: "As de Diamantes", cantidad: "2" },
    { numero: "2", descripcionCarta: "Dos de Diamantes", cantidad: "3" },
  ];
  localStorage.setItem("datos", JSON.stringify(miObjeto));
}

function cargarTabla() {
  var datos = localStorage.getItem("datos");

  let res = document.querySelector("#listado");
  res.innerHTML =
    ""; /**Vacía el contenido actual de la tabla para evitar duplicados. */

  console.log("objetoObtenido: ", JSON.parse(datos));
  datos = JSON.parse(datos);
  datos.sort((a, b) => b.cantidad - a.cantidad);

  for (let item of datos) {
    res.innerHTML += `<tr>
  				<td>${item.numero}</td>
  				<td>${item.descripcionCarta}</td>
  				<td>${item.cantidad}</td>
			</tr>`;
  }
}

function leerJSON() {
  $.getJSON("../data.json", function (datos) {
    console.log(datos);
  });
}
leerJSON();
cargarJSON();
cargarTabla();
