/*
TAREA:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/

document.querySelector("#agregar-input").onclick = function (event) {
  event.preventDefault();

  crearIntegrante();
  mostrarBotonCalculo();
};

function crearIntegrante() {
  const $div = document.createElement("div");
  $div.className = "integrante";

  const $label = document.createElement("label");
  $label.textContent = "Salario Anual del Integrante ";
  $label.className = "form-label";
  const $input = document.createElement("input");
  $input.type = "number";
  $input.placeholder = "Salario Anual";
  $input.className = "form-control";

  $div.appendChild($label);
  $div.appendChild($input);

  const $integrantes = document.querySelector("#integrantes");
  $integrantes.appendChild($div);
}

document.querySelector("#eliminar-input").onclick = function (event) {
  const $integrantes = document.querySelectorAll(".integrante");
  for (let i = $integrantes.length - 1; i < $integrantes.length; i++) {
    $integrantes[i].remove();
    if (i === 0) {
      ocultarBotonCalculo();
      ocultarCalculos();
    }
  }

  event.preventDefault();
};

function obtenerSalariosAnualesIntegrantes() {
  const $integrantes = document.querySelectorAll(".integrante input");
  const salariosAnuales = [];

  for (let i = 0; i < $integrantes.length; i++) {
    if (Number($integrantes[i].value) > 0) {
      salariosAnuales.push(Number($integrantes[i].value));
    }
  }
  return salariosAnuales;
}

document.querySelector("#calcular").onclick = function (event) {
  const salariosAnuales = obtenerSalariosAnualesIntegrantes();
  const mayorSalarioAnual = calcularMayorSalarioAnual(salariosAnuales);
  const menorSalarioAnual = calcularMenorSalarioAnual(salariosAnuales);
  const promedioSalariosAnuales = calculaPromedioSalariosAnuales(salariosAnuales);
  const promedioSalariosMensuales = calculaPromedioSalariosAnuales(salariosAnuales) / 12;

  mostrarCalculos();

  document.querySelector("#mayor-salario-anual").value = `${mayorSalarioAnual}`;
  document.querySelector("#menor-salario-anual").value = `${menorSalarioAnual}`;
  document.querySelector("#promedio-salarios-anuales").value = `${promedioSalariosAnuales}`;
  document.querySelector("#promedio-salarios-mensuales").value = `${promedioSalariosMensuales}`;

  event.preventDefault();
};

function calcularMayorSalarioAnual(salariosAnuales) {
  let mayorSalarioAnual = salariosAnuales[0];
  for (let i = 0; i < salariosAnuales.length; i++) {
    if (salariosAnuales[i] > mayorSalarioAnual) {
      mayorSalarioAnual = salariosAnuales[i];
    }
  }

  return mayorSalarioAnual;
}

function calcularMenorSalarioAnual(salariosAnuales) {
  let menorSalarioAnual = salariosAnuales[0];
  for (let i = 0; i < salariosAnuales.length; i++) {
    if (salariosAnuales[i] < menorSalarioAnual) {
      menorSalarioAnual = salariosAnuales[i];
    }
  }

  return menorSalarioAnual;
}

function calculaPromedioSalariosAnuales(salariosAnuales) {
  let promedioSalariosAnuales = 0;
  for (let i = 0; i < salariosAnuales.length; i++) {
    promedioSalariosAnuales += salariosAnuales[i];
  }
  promedioSalariosAnuales = promedioSalariosAnuales / salariosAnuales.length;

  return promedioSalariosAnuales;
}

function mostrarBotonCalculo() {
  document.querySelector("#calcular").className = "";
}

function ocultarBotonCalculo() {
  document.querySelector("#calcular").className = "oculto";
}

function mostrarCalculos() {
  document.querySelector("#calculo").className = "";
}

function ocultarCalculos() {
  document.querySelector("#calculo").className = "oculto";
}
