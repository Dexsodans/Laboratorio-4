const inputLimite = document.getElementById("limite");
const botonGenerar = document.getElementById("generar");
const salida = document.getElementById("salida");
const inputParrafo = document.getElementById("parrafo");
const inputPalabra = document.getElementById("palabra");

function crearWorker(fn) {
  const blob = new Blob(["onmessage = " + fn.toString()], { type: "application/javascript" });
  const url = URL.createObjectURL(blob);
  return new Worker(url);
}


function workerPrimos(e){
  const limite = e.data;
  let resultado = Array(limite + 1).fill(true);
  resultado[0] = resultado[1] = false;
  for(let i = 2; i * i <= limite; i++){
    if(resultado[i]){
      for(let j = i * i; j <= limite; j += i){
        resultado[j] = false;
      }
    }
  }
  let primos = [];
  for (let i = 2; i <= limite; i++) {
    if (resultado[i]){
      primos.push(i);
    }
  }


  //posible solucion a que no carga, es ponerle columnas
  let filas = [];
  for (let i = 0; i < primos.length; i += 100) {
    filas.push(primos.slice(i, i + 100).join(", "));
  }
  postMessage(filas.join("\n"));
}

function workerBinaria(e){

  const { parrafo, palabra } = e.data;

  let palabrita = parrafo.split(/\s+/).map(p => p.trim()).filter(p => p.length > 0);
  palabrita.sort();

  let primero = 0, ultimo = palabrita.length - 1, encontrado = false;
  while(primero <= ultimo && !encontrado){
    let mitad = Math.floor((primero + ultimo)/2);
    if(palabrita[mitad] == palabra){
      encontrado = true;
      break;
    }else if (palabrita[mitad] < palabra){
      primero = mitad + 1;
    }else {
      ultimo = mitad - 1;
    }
  }

  if(encontrado){
    postMessage(`Se encontro la palabra: "${palabra}"`);
  }else{
    postMessage(`No se encontro ninguna palabra similar`);
  }
}

botonGenerar.addEventListener("click", () => {
  salida.textContent = "Calculando...\n";

  const limite = parseInt(inputLimite.value);
  const parrafo = inputParrafo.value;
  const palabra = inputPalabra.value;

  const wPrimos = crearWorker(workerPrimos);
  const wBusqueda = crearWorker(workerBinaria);

  wPrimos.onmessage = (e) => salida.textContent += `primos: ${e.data}\n`;
  wBusqueda.onmessage = (e) => salida.textContent += `${e.data}\n`;
  wPrimos.postMessage(limite); 
  wBusqueda.postMessage({parrafo, palabra}); 

});
