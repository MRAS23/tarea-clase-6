/*
TAREA: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/

document.querySelector("#agrega-inputs").onclick = function (event) {
  const $cantidadIntegrantes = document.querySelector("#cantidad-integrantes");
  const cantidadIntegrantes = Number($cantidadIntegrantes.value);

  mostrarElemento("borrar-todo");
  borrarIntegrantes();
  crearVariosIntegrantes(cantidadIntegrantes);

  event.preventDefault();
};

function borrarIntegrantes() {
  const $integrantes = document.querySelectorAll(".integrante");
  for (let i = 0; i < $integrantes.length; i++) {
    $integrantes[i].remove();
  }
}

function crearVariosIntegrantes(cantidadIntegrantes) {
  if (cantidadIntegrantes > 0) {
    mostrarElemento("calcular");
  } else {
    resetear();
  }

  for (let i = 0; i < cantidadIntegrantes; i++) {
    crearIntegrante(i);
  }
}

function crearIntegrante(indice) {
  const $div = document.createElement("div");
  $div.className = "integrante";

  const $label = document.createElement("label");
  $label.textContent = "Edad del integrante número " + (indice + 1) + " ";
  $label.className = "form-label";
  const $input = document.createElement("input");
  $input.type = "number";
  $input.className = "form-control";

  $div.appendChild($label);
  $div.appendChild($input);

  const $integrantes = document.querySelector("#integrantes");
  $integrantes.appendChild($div);
}

function obtenerEdadesIntegrantes() {
  const $integrantes = document.querySelectorAll(".integrante input");
  const edades = [];
  for (let i = 0; i < $integrantes.length; i++) {
    edades.push(Number($integrantes[i].value));
  }
  return edades;
}

document.querySelector("#calcular").onclick = function (event) {
  const edades = obtenerEdadesIntegrantes();
  const mayorEdad = calcularMayorNumero(edades);
  const menorEdad = calcularMenorNumero(edades);
  const promedioEdades = calculaPromedio(edades);

  document.querySelector("#mayor-edad").value = `${mayorEdad}`;
  document.querySelector("#menor-edad").value = `${menorEdad}`;
  document.querySelector("#promedio-edad").value = `${promedioEdades}`;

  mostrarElemento("calculo");

  event.preventDefault();
};

function calcularMayorNumero(numeros) {
  let mayorNumero = numeros[0];
  for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] > mayorNumero) {
      mayorNumero = numeros[i];
    }
  }

  return mayorNumero;
}

function calcularMenorNumero(numeros) {
  let menorNumero = numeros[0];
  for (let i = 0; i < numeros.length; i++) {
    if (numeros[i] < menorNumero) {
      menorNumero = numeros[i];
    }
  }

  return menorNumero;
}

function calculaPromedio(numeros) {
  let promedio = 0;
  for (let i = 0; i < numeros.length; i++) {
    promedio += numeros[i];
  }
  promedio = promedio / numeros.length;

  return promedio;
}

document.querySelector("#borrar-todo").onclick = function (event) {
  ocultarElemento("borrar-todo");
  resetear();

  event.preventDefault();
};

function resetear() {
  borrarIntegrantesAnteriores();
  ocultarElemento("#calcular");
  ocultarElemento("#calculo");
  document.querySelector("#cantidad-integrantes").value = "";
}

function borrarIntegrantesAnteriores(cantidadIntegrantes) {
  const $integrantes = document.querySelectorAll(".integrante");
  for (let i = 0; i < $integrantes.length; i++) {
    $integrantes[i].remove();
  }
}

function ocultarElemento(id) {
  document.querySelector("#" + id).className = "oculto";
}

function mostrarElemento(id) {
  document.querySelector("#" + id).className = "";
}
