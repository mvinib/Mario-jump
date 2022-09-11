const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const clouds = document.querySelector('.clouds')
const gameOverElement = document.querySelector('.game-over')
const gameBoardElement = document.querySelector('.game-board')

const score = document.querySelector('.score')
const jumpSound = new Audio('./audio/smb_jump-small.wav')
const gameOverSound = new Audio('./audio/smb_mariodie.wav')

let gameOver = false
let scoreCount = 0
let dificult = 2 
let incremented = true
let checkpoint = 0
let keep = 30
let cloudsPosition
let pipePosition
let marioPosition


pipe.style.animation = `pipe-animation ${dificult}s infinite linear`

function checkDevice() { 
  if( navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
  ){
    return true
  }
  else {
    return false
  }
}

if (checkDevice()) {
  gameBoardElement.style.borderBottom = 'none'
  gameBoardElement.style.borderLeft = '15px solid rgb(35, 160, 35)'

  pipe.style.transform = 'rotate(90deg)'
  pipe.style.left = '0px'
  pipe.style.width = '50px'
  pipe.style.bottom = 'none'

  mario.style.transform = 'rotate(90deg)'
  mario.style.left = '0px'
  mario.style.top = '0px'
  mario.style.width = '100px'
  mario.style.bottom = 'none'

  clouds.style.transform = 'rotate(90deg)'
  clouds.style.right = '1vw'
  clouds.style.width = '200px'
  clouds.style.animation = 'clouds-animation-cellphone 20s infinite linear'

  gameOverElement.style.transform = 'rotate(90deg)'
  gameOverElement.style.width = '200px'

  score.style.transform = 'rotate(90deg)'
  score.style.top = '10vh'
  score.style.right = '0px'
  score.style.fontSize = '15px'

  pipe.style.animation = 'pipe-animation-cellphone 2s infinite linear'

} else {
  clouds.style.top = '15vh'
  clouds.style.width = '550px'
  clouds.style.animation = 'clouds-animation 20s infinite linear'
  score.style.fontSize = '40px'
  score.style.top = '70px'
  score.style.left = '50px'
}

const jump = () => {
  checkDevice() ? mario.classList.add('jump-cellphone') : mario.classList.add('jump')
  jumpSound.play()

  setTimeout(() => {
    checkDevice() ? mario.classList.remove('jump-cellphone') : mario.classList.remove('jump')
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

  pipePosition = checkDevice() ? pipe.offsetTop : pipe.offsetLeft
  cloudsPosition = checkDevice() ? clouds.offsetTop :clouds.offsetLeft
  marioPosition = checkDevice() ? +window.getComputedStyle(mario).left.replace('px', '') : +window.getComputedStyle(mario).bottom.replace('px', '')

  if (pipePosition <= (checkDevice() ? 75 : 120) && pipePosition > 0 && marioPosition < (checkDevice() ? 50 :100)) {
    gameOverSound.play()
    pipe.style.animation = 'none'
    checkDevice() ? pipe.style.top = `${pipePosition}px` : pipe.style.left = `${pipePosition}px`

    mario.style.animation = 'none'
    checkDevice() ? mario.style.left = `${marioPosition}px` : mario.style.bottom = `${marioPosition}px`

    mario.src = './images/game-over.png'
    checkDevice() ? mario.style.width = '50px' : mario.style.width = '75px'
    checkDevice() ? mario.style.marginTop = '20px' : mario.style.marginLeft = '50px'

    clouds.style.animation = 'none'
    checkDevice() ? clouds.style.top = `${cloudsPosition}px` :  clouds.style.left = `${cloudsPosition}px`

    gameOverElement.style.display = 'block'

    setTimeout(() => {
      mario.style.animation = checkDevice() ? 'game-over-mario-cellphone 2s ease-in-out' :'game-over-mario 2s ease-in-out'
    }, 500)

    gameOver = true

    clearInterval(loop)
    clearInterval(addsScore)
    
  }
  score.textContent = `score:${float2int(scoreCount)}`

  if (!incremented && pipePosition < -40 && dificult > 0.7) {
    dificult = dificult - 0.1
    pipe.style.animation = 'none'
    checkDevice() ? pipe.style.bottom = '-80px' :  pipe.style.right = '-80px'
    incremented = !incremented

    setTimeout(() => {
      checkDevice() ? pipe.style.animation = `pipe-animation-cellphone ${dificult}s infinite linear` : pipe.style.animation = `pipe-animation ${dificult}s infinite linear`
    },10)
    
  }
}, 10)

checkDevice() ? gameBoardElement.addEventListener('touchstart', () => {
  if (!gameOver) { 
    jump()
  } else if (gameOver) {
    document.location.reload(true) 
  }
}) : document.addEventListener('keydown', (event) => {
  if (event.key === " " && !gameOver) { 
    jump()
  } else if (event.key === " " && gameOver) {
    document.location.reload(true) 
  }
})