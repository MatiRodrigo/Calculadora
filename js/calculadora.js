// 1. Seleccionamos las dos pantallas
const pantallaAuxiliar = document.getElementById("auxiliar"); // Arriba
const pantallaPrincipal = document.getElementById("principal"); // Abajo

// 2. Variables para guardar los valores internos
let numeroAnterior = "";
let operacionActual = null;

// Inicializamos las pantallas
pantallaPrincipal.value = "0";
pantallaAuxiliar.value = "";

// 3. Escuchamos todos los clics de la calculadora
const calculadora = document.querySelector(".calculadora");

calculadora.addEventListener("click", (evento) => {
  const elemento = evento.target;

  // Solo actuamos si el clic fue dentro de un botón
  if (elemento.tagName !== "BUTTON") return;

  const textoBoton = elemento.innerText;

  // --- BOTÓN CLEAR (C) ---
  if (elemento.id === "clear") {
    limpiarTodo();
    return;
  }

  // --- BOTÓN BORRAR (←) ---
  if (elemento.id === "borrar") {
    borrarUnCaracter();
    return;
  }

  // --- BOTONES DE OPERACIÓN (+, -, *, /) ---
  if (elemento.classList.contains("operacion")) {
    seleccionarOperacion(textoBoton);
    return;
  }

  // --- BOTÓN IGUAL (=) ---
  if (elemento.id === "igual") {
    calcular();
    return;
  }

  // --- BOTONES NUMÉRICOS Y COMA ---
  agregarNumero(textoBoton);
});

// --- FUNCIONES AUXILIARES ---

// Agrega números o coma a la pantalla principal
function agregarNumero(numero) {
  // Evitamos poner más de una coma
  if (numero === "," && pantallaPrincipal.value.includes(",")) return;

  if (pantallaPrincipal.value === "0" && numero !== ",") {
    pantallaPrincipal.value = numero;
  } else {
    pantallaPrincipal.value += numero;
  }
}

// Al presionar un operador (+, -, *, /)
function seleccionarOperacion(operador) {
  if (pantallaPrincipal.value === "") return;

  // Si ya había una operación pendiente, calculamos primero
  if (numeroAnterior !== "") {
    calcular();
  }

  operacionActual = operador;
  numeroAnterior = pantallaPrincipal.value;

  // Movemos el número y el operador a la pantalla de arriba
  pantallaAuxiliar.value = `${numeroAnterior} ${operacionActual}`;

  // Dejamos la pantalla principal lista para el siguiente número
  pantallaPrincipal.value = "";
}

// Realiza el cálculo matemático al presionar '='
function calcular() {
  if (operacionActual === null || pantallaPrincipal.value === "") return;

  const num1 = parseFloat(numeroAnterior.replace(",", "."));
  const num2 = parseFloat(pantallaPrincipal.value.replace(",", "."));
  let resultado = 0;

  switch (operacionActual) {
    case "+":
      resultado = num1 + num2;
      break;
    case "-":
      resultado = num1 - num2;
      break;
    case "*":
      resultado = num1 * num2;
      break;
    case "/":
      resultado = num2 !== 0 ? num1 / num2 : "Error";
      break;
  }

  // Mostramos la operación completa arriba y el resultado abajo
  pantallaAuxiliar.value = `${numeroAnterior} ${operacionActual} ${pantallaPrincipal.value} =`;
  pantallaPrincipal.value = resultado.toString().replace(".", ",");

  // Reiniciamos las variables de control
  operacionActual = null;
  numeroAnterior = "";
}

// Limpia las dos pantallas
function limpiarTodo() {
  pantallaPrincipal.value = "0";
  pantallaAuxiliar.value = "";
  numeroAnterior = "";
  operacionActual = null;
}

// Borra el último dígito ingresado en la pantalla de abajo
function borrarUnCaracter() {
  if (pantallaPrincipal.value.length === 1) {
    pantallaPrincipal.value = "0";
  } else {
    pantallaPrincipal.value = pantallaPrincipal.value.slice(0, -1);
  }
}
