function barVirtualization (x, m, w, ctx) {
  ctx.fillRect(x, ctx.canvas.height - m, w, m)
}
function circleVirtualization (x, m, w, ctx) {
  ctx.save()
  ctx.beginPath()
  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)
  ctx.arc(0, 0, m * 0.5, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.restore()
}
function circleBarVirtualization (x, m, w, ctx) {
  const angle = 2 * Math.PI * (x/36)
  ctx.save()
  ctx.beginPath()
  ctx.translate(ctx.canvas.width / 2 , ctx.canvas.height / 2)
  ctx.rotate(angle)
  ctx.fillRect(0, 0, w, m * 0.65)
  ctx.beginPath()
  ctx.fillStyle ="#fff"
  ctx.arc(0,0, 80, 0, 2 * Math.PI)
  ctx.fill()
  ctx.restore()
}
function bubbleVirtualization (x, m, w, ctx) {
  const angle = 2 * Math.PI * (x/36)
  let _x = Math.random() * ctx.canvas.width
  let _y = Math.random() * ctx.canvas.height
  ctx.save()
  ctx.translate(_x , m)
  ctx.beginPath()
  ctx.fillStyle = `rgba(0, 0, 0, ${1 - m / ctx.canvas.width})`
  ctx.arc(0,0, m * 0.009, 0, 2 * Math.PI)
  ctx.fill()
  ctx.restore()
}
function createVirtualization (analyser, selectVirtualization) {
  const canvas = document.querySelector('#canvas')
  const ctx = canvas.getContext('2d')
  const array = new Uint8Array(analyser.frequencyBinCount)
  let select = 'bar'
  selectVirtualization.addEventListener('change', (e) => {
    console.log(e)
    select = e.target.value
  })
  const cb = {
    bar: barVirtualization,
    circle: circleVirtualization,
    circleBar: circleBarVirtualization,
    bubble: bubbleVirtualization
  }
  
  let timeStar = Date.now()
  function draw () {
    requestAnimationFrame(draw)
    let current = Date.now()
    if (current - timeStar > 60) {
      analyser.getByteTimeDomainData(array)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for(let i = 0, x = 0,len = analyser.frequencyBinCount, w = canvas.width / (analyser.frequencyBinCount); i < len; i++, x += w) {
        const m = array[i] / 128.0 * (canvas.height / 2)
        cb[select](x, m, w, ctx)
      }

      timeStar = Date.now()

    }
  }
  
  console.log(array)
  console.log(analyser)
  draw()
}

