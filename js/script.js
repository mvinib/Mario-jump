const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const clouds = document.querySelector('.clouds')
const gameOverElement = document.querySelector('.game-over')
const score = document.querySelector('.score')
const jumpSound = new Audio('./audio/smb_jump-small.wav')
const gameOverSound = new Audio('./audio/smb_mariodie.wav')

let gameOver = false
let scoreCount = 0
let dificult = 2 
let incremented = true
let checkpoint = 0
let keep = 30

pipe.style.animation = `pipe-animation ${dificult}s infinite linear`

const jump = () => {
  mario.classList.add('jump')
  jumpSound.play()

  setTimeout(() => {
    mario.classList.remove('jump')
  }, 500)
}

function float2int (value) {
  return value | 0
}

const addsScore = setInterval(() => {
  scoreCount = scoreCount + 0.1
  if (float2int(scoreCount - checkpoint) === keep) {
    checkpoint = checkpoint + keep
    incremented = !incremented
  }

}, 10)

const loop = setInterval(() => {

  const pipePosition = pipe.offsetLeft
  const cloudsPosition = clouds.offsetLeft
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '')

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 100) {
    gameOverSound.play()
    pipe.style.animation = 'none'
    pipe.style.left = `${pipePosition}px`

    mario.style.animation = 'none'
    mario.style.bottom = `${marioPosition}px`

    mario.src = './images/game-over.png'
    mario.style.width = '75px'
    mario.style.marginLeft = '50px'

    clouds.style.animation = 'none'
    clouds.style.left = `${cloudsPosition}px`

    gameOverElement.style.display = 'block'

    setTimeout(() => {
      mario.style.animation = 'game-over-mario 2s ease-in-out'
    }, 500)

    gameOver = true

    clearInterval(loop)
    clearInterval(addsScore)
    
  }
  score.textContent = `score:${float2int(scoreCount)}`

  if (!incremented && pipePosition < -40 && dificult > 0.7) {
    dificult = dificult - 0.1
    pipe.style.animation = 'none'
    pipe.style.right = '-80px'
    incremented = !incremented

    setTimeout(() => {
      pipe.style.animation = `pipe-animation ${dificult}s infinite linear`
    },10)
    
  }
}, 10)

document.addEventListener('keydown', (event) => {
  if (event.key === " " && !gameOver) { 
    jump()
  } else if (event.key === " " && gameOver) {
    document.location.reload(true) 
    
  }
})