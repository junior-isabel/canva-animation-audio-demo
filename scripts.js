const audioContext = new AudioContext()
const canvas = document.querySelector('#canvas')
const audio = document.querySelector('#audio')
const source = audioContext.createMediaElementSource(audio)
const select = document.querySelector('#select')
const analyser = audioContext.createAnalyser()
analyser.fftSize = 1024

canvas.addEventListener('load', () => {
  audioContext.resume()
})


source
.connect(analyser)
.connect(audioContext.destination)

createVirtualization(analyser, select)

audio.addEventListener('play', e => {
  if(audioContext.state === 'suspended') {
    audioContext.resume()
  }
})



