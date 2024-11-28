/**
 * simples ssimulador de um botao de panico
 * @author João Victor 
 */

const botao = document.getElementById('botao');
let som = new Audio("som/risadakiko.mp3");


function tocarSom() {
    som.play()
}

function pararsom() {
    som.pause()
}

botao.addEventListener('mousedown', (Event) => {
    Event.preventDefault()
  tocarSom()
})

botao.addEventListener('mouseup', (Event) => {
   Event.preventDefault();
  pararsom()
})

botao.addEventListener('touchstart', (Event) => {
    Event.preventDefault()
  tocarSom()
})

botao.addEventListener('touchend', (Event) => {
   Event.preventDefault();
  pararsom()
})


//Lanterna (torch)
async function inicializarLanterna() {
  try {
      // Solicita acesso à câmera traseira sem exibir o vídeo
      stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }
      })

      // Obtém o track do vídeo para controlar a lanterna
      track = stream.getVideoTracks()[0]

      // Verifica se o dispositivo suporta o uso da lanterna
      const capabilities = track.getCapabilities()
      if (!capabilities.torch) {
          console.log("Lanterna não suportada no dispositivo.")
          return
      }
  } catch (error) {
      console.error(`Erro ao inicializar a lanterna: ${error}`)
  }
}

// Função para ligar a lanterna (torch)
async function ligar() {
  if (track) {
      try {
          await track.applyConstraints({ advanced: [{ torch: true }] })
      } catch (error) {
          console.error(`Erro ao inicializar a lanterna: ${error}`)
      }
  }
}

// Função para desligar a lanterna sem parar o stream
async function desligar() {
  if (track) {
      try {
          await track.applyConstraints({ advanced: [{ torch: false }] })
      } catch (error) {
          console.error(`Erro ao inicializar a lanterna: ${error}`)
      }
  }
}