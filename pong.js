//Especificações da bolinha
let xBola = 300;
let yBola = 200;
let diametro = 15;
let raio = 7.4;

//Placar Jogo
let pontosPlayer1 = 0;
let pontosPlayer2 = 0;

//Sons do jogo
let somRaquete;
let pontos;
let trilha;

//função que carrega o som da partida
function preload() {
  pontos = loadSound("ponto.mp3")
  somRaquete = loadSound("raquetada.mp3")
  trilha = loadSound("trilha.mp3")
}

//variáveis do centro
let xCentro = 300;
let yCentro = 0;
let meioComprimento = 3;
let meioAltura = 400;

//Especificações Raquete
let xRaquete = 10;
let yRaquete = 150;
let comprimentoRaquete = 10;
let raqueteAltura = 90;

//Raquete Player2
let xRaqueteP2 = 585;
let yRaqueteP2 = 150;
let velocidadeYP2;
//chanceDeErrar = 0;

// velocidade da bolinha
let velocidadeXBola = 3;
let velocidadeYBola = 3;

//Cenário
function setup() {
  createCanvas(600, 400);
  trilha.loop()

}
function draw() {
  background(0);
  mostraBolinha();
  mostraPlacar();
  velocidadeBolinha();
  controleColisaoBorda();
  raquete(xRaquete, yRaquete);
  raquete(xRaqueteP2, yRaqueteP2)
  movimentaRaquetePlayer();
  movimentaRaquetePlayer2();
  //movimentaRaqueteComputador();
  limitesRaquete();
  colisaoRaquete();
  colisaoRaquete2();
  marcaPontoPlayers();
  aumentaNivel();
  mostraCentro(xCentro, yCentro);

}

function mostraBolinha() {
  circle(xBola, yBola, diametro);
}

function mostraPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 0, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(pontosPlayer1, 170, 26);
  fill(color(255, 0, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosPlayer2, 470, 26);
}

function velocidadeBolinha() {
  xBola += velocidadeXBola;
  yBola += velocidadeYBola;
}

function controleColisaoBorda() {
  if (xBola > width - raio || xBola < 0 + raio) {
    velocidadeXBola *= -1;
  }
  if (yBola > height - raio || yBola < 0 + raio) {
    velocidadeYBola *= -1
  }
}

function raquete(x, y) {
  rect(x, y, comprimentoRaquete, raqueteAltura)
}

function movimentaRaquetePlayer() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10
  }
}

function movimentaRaquetePlayer2() {
  if (keyIsDown(87)) {
    yRaqueteP2 -= 10
  }
  if (keyIsDown(83)) {
    yRaqueteP2 += 10
  }
}

// function movimentaRaqueteComputador() {
//   yRaqueteP2 = yBola - comprimentoRaquete - 50
//   yRaqueteP2 += chanceDeErrar;
//   calculaChanceDeErrar()
// }

//impede que a raquete ultrapasse os limites do campo
function limitesRaquete() {
  if (yRaquete > height - 90) {
    yRaquete = height - 90
  }
  if (yRaqueteP2 > height - 90) {
    yRaqueteP2 = height - 90

  }
  if (yRaquete < 2) {
    yRaquete = 2

  }
  if (yRaqueteP2 < 2) {
    yRaqueteP2 = 2
  }
}

//verifica colisões da raquete com a bolinha
function colisaoRaquete() {
  if (xBola - raio < xRaquete + comprimentoRaquete && yBola - raio < yRaquete + raqueteAltura && yBola + raio > yRaquete) {
    velocidadeXBola *= -1
    somRaquete.play(); // Executa o som da colisão da bolinha com a raquete
  }
}

function colisaoRaquete2() {
  if (xBola + raio > xRaqueteP2 + comprimentoRaquete && yBola - raio < yRaqueteP2 + raqueteAltura && yBola - raio > yRaqueteP2) {
    velocidadeXBola *= -1
    somRaquete.play(); // Executa o som da colisão da bolinha com a raquete
  }
}
//marca os pontos dos jogadores
function marcaPontoPlayers() {
  if (xBola > xRaqueteP2 + 8) {
    pontosPlayer1 += 1
    pontos.play()  // Executa o som de quando faz ponto
  }
  if (xBola < xRaquete - 2) {
    pontosPlayer2 += 1
    pontos.play() // Executa o som de quando faz ponto
  }
}
//Deixa a bolinha mais rapida
function aumentaNivel() {
  if (xBola == 300) {
    velocidadeXBola *= 1.10;
    velocidadeYBola *= 1.10;
  }
}
//linha que divide o campo
function mostraCentro(x, y) {
  fill(211, 211, 211);
  rect(x, y, meioComprimento, meioAltura);
}

function calculaChanceDeErrar() {
  if (pontosPlayer2 >= pontosPlayer1) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 44) {
      chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35) {
      chanceDeErrar = 35
    }
  }
}



