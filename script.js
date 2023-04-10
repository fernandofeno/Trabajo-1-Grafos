
//funcion para saber si la coordenada está dentro del circulo
function dentroCirculo(posX, posY, radio) {
  distancia = Math.sqrt(Math.pow(posX - radio, 2) + Math.pow(posY - radio, 2));
  if (distancia <= radio)
    return true;
  else
    return false;
}

//necesitamos una función para obtener un gráfico NTiros VS PiObtenido
function crearGrafica() {

  var canvas = document.createElement('canvas');

  canvas.id = 'miCanvas';

  var contenedor = document.querySelector('#contenedorGrafico');

  var miCanvas = canvas.getContext('2d');

  var chart = new Chart(miCanvas, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Aproximación de pi obtenida',
        data: [],
        pointRadius: 5
      }]
    },
    options: {
      scales: {
        xAxes: [{
        }],
        yAxes: [{
          type: 'linear',
          ticks: {
            min: 0,
            max: 4
          }
        }]
      }
    }
  });

  contenedor.appendChild(canvas);
}

function agregarPunto(idGrafica, niter, pi) {
  canvas = document.getElementById(idGrafica);
  chart = Chart.getChart(canvas);
  chart.data.datasets[0].data.push({x: niter, y: pi});
  chart.update();
}

function CrearCircunferencia(contexto, x, y, radio) {
  contexto.beginPath();
  contexto.arc(x, y, radio, 0, 2 * Math.PI);
  contexto.stroke();
}
function CrearCuadradoVacio(contexto, a) {
  // Establecer el ancho de línea del borde del cuadrado
  contexto.lineWidth = 2;
  // Establecer el color de la línea del borde del cuadrado
  contexto.strokeStyle = 'black';
  // Dibujar un cuadrado vacío
  contexto.strokeRect(0, 0, a, a);
}

function CrearPuntosAleatorios(area, cantidad) {
  var puntos = [];

  for (var i = 0; i < cantidad; i++) {
    // Calcular la posición aleatoria del punto
    var x = Math.random() * area.width + area.x;
    var y = Math.random() * area.height + area.y;

    // Agregar el punto al array de puntos
    puntos.push({ x: x, y: y });
  }

  return puntos;
}

function ImprimirPuntosEnCanvas(canvas, puntos) {
  var color = 'black';
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
  for (var i = 0; i < puntos.length; i++) {
    var punto = puntos[i];
    ctx.beginPath();
    ctx.arc(punto.x, punto.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function agregarDatosTabla(nSim, tirosCuadrado, tirosCirculo, aproxPi) {
  document.getElementById("tabla-pi").innerHTML += "<tr><td>" + nSim + "</td>" + "<td>" + tirosCuadrado + "</td>" + "</tr>";
}

function ingresarRadio() {
  radio = document.createElement("h1");
  radio.id = "radio";
  document.getElementById("textoRadio").appendChild(radio);
  radio.textContent = document.getElementById("textoRadio").value;

  document.getElementById("textoRadio").value = "";


  document.getElementById("textoRadio").style.display = "none";
  document.getElementById("botonRadio").style.display = "none";
}

function ingresarN() {
  n = document.createElement("h1");
  n.id = "n";
  document.getElementById("textoN").appendChild(n);
  n.textContent = document.getElementById("textoN").value;

  document.getElementById("textoN").value = "";

  document.getElementById("textoN").style.display = "none";
  document.getElementById("botonN").style.display = "none";
}

function ingresarM() {
  m = document.createElement("h1");
  m.id = "m";
  document.getElementById("textoM").appendChild(m);
  m.textContent = document.getElementById("textoM").value;

  document.getElementById("textoM").value = "";

  return parseInt(document.getElementById("m").textContent);
}

function simular() {

  const radio = parseInt(document.getElementById("radio").textContent);

  var n = parseInt(document.getElementById("n").textContent);

  if(document.getElementById("dibujo")){
    document.getElementById("dibujo").remove();
  }

  document.getElementById("n").textContent = n - 1;

  var m = document.getElementById("textoM").value;
  document.getElementById("textoM").value = "";

  var canvas = document.createElement('canvas');

  canvas.id = 'dibujo';
  canvas.width = radio * 2;
  canvas.height = radio * 2;

  document.getElementById('canvas').appendChild(canvas);

  var contexto = canvas.getContext('2d');
  var centroX = radio;
  var centroY = radio;

  CrearCircunferencia(contexto, centroX, centroY, radio);
  CrearCuadradoVacio(contexto, radio * 2);

  var area = { x: 0, y: 0, width: canvas.width, height: canvas.height };
  var puntos = CrearPuntosAleatorios(area, m);
  ImprimirPuntosEnCanvas(canvas, puntos);

  var contarPuntosDentro = 0;

  for(var i = 0; i<puntos.length; i++){
    if(dentroCirculo(puntos[i]['x'],puntos[i]['y'],radio)){
      contarPuntosDentro++;
    }
  }

  aproxPi = Number((4 * contarPuntosDentro) / m).toFixed(15)

  document.getElementById("tabla-pi").innerHTML += "<tr>" + "<td>" + n + "</td>" + "<td>" + m + "</td>" + "<td>" + contarPuntosDentro + "</td>" + "<td>" + aproxPi + "</td>" + "</tr>";

  agregarPunto("miCanvas", m, aproxPi);

  if (n <= 1) {
    document.getElementById("textoM").style.display = "none";
    document.getElementById("botonM").style.display = "none";
  }
  
}
