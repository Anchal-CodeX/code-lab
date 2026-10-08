const board = document.querySelector('.board');
const startButton = document.querySelector('.btn-start')
const modal = document.querySelector(".modal")
const startGame = document.querySelector(".start-game")
const gameOver = document.querySelector(".game-over")
const restartButton = document.querySelector(".btn-restart")

const ScoreElement = document.querySelector(".score")
const HighScoreElement = document.querySelector(".highScore")
const TimeElement = document.querySelector(".time")

let Score = 0;
let HighScore = localStorage.getItem("HighScore") || 0;
let Time = 0
let timeIntervalId = null;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, "0")
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0")
    return `${minutes}:${remainingSeconds}`
}

HighScoreElement.innerText = HighScore
TimeElement.innerText = formatTime(Time)

const blockHeight = 50;
const blockWidth = 50;



const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let intervalId = null;
let food = { x:Math.floor(Math.random() * rows), y:Math.floor(Math.random() *cols)}

const blocks = [];
let snake = [ {
    x: 1, y: 3
 }
 ]



for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {

        const block = document.createElement('div');

        block.classList.add('block');
        board.appendChild(block);
      // block.innerText = `${row}-${col}`
      blocks[ `${row}-${col}` ] = block
    }
}

function render() {

    blocks[ `${food.x}-${food.y}`].classList.add("food")


    

    snake.forEach(segment => {
        console.log(segment)
        blocks[ `${segment.x}-${segment.y}` ].classList.add("fill")
         

    })
}

gameOver.style.display = "none";
restartButton.style.display = "none";

function startTimer() {
    clearInterval(timeIntervalId)
    Time = 0
    TimeElement.innerText = formatTime(Time)
    timeIntervalId = setInterval(() => {
        Time++
        TimeElement.innerText = formatTime(Time)
    }, 1000)
}

function stopTimer() {
    clearInterval(timeIntervalId)
    timeIntervalId = null
}


intervalId = setInterval(() => {

   let head = null

     if(direction === "left"){
        head = { x:snake[ 0 ].x, y: snake[ 0 ].y - 1 }

      }else if(direction === "right"){
          head = { x:snake[ 0 ].x, y: snake[ 0 ].y + 1 }
      }else if(direction === "down"){
          head = { x:snake[ 0 ].x + 1, y: snake[ 0 ].y }
      }else if( direction === "up"){
          head = { x:snake[ 0 ].x - 1, y: snake[ 0 ].y }
      }

      if(head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols){
            clearInterval(intervalId)
            stopTimer()

            modal.style.display = "flex"
           startGame.style.display = 'none'
            gameOver.style.display = "flex"
            restartButton.style.display = "flex"

            return;
      }
       


          
       if(head.x==food.x && head.y==food.y){
        blocks[ `${food.x}-${food.y}`].classList.remove("food")
         food = { x:Math.floor(Math.random() * rows), y:Math.floor(Math.random() *cols)}
         blocks[ `${food.x}-${food.y}`].classList.add("food")
       
         snake.unshift(head)

         Score = Score + 10
         ScoreElement.innerText = Score

         if(Score >  HighScore){
            HighScore = Score
            localStorage.setItem("HighScore", HighScore.toString())
                HighScoreElement.innerText = HighScore
         }

       }
      snake.forEach(segment => {
          blocks[ `${segment.x}-${segment.y}`].classList.remove("fill")
      })

      snake.unshift(head)
       snake.pop()

      render()

  }, 200);

  startButton.addEventListener("click",()=> {
    direction = "right"
    modal.style.display = "none"
        startTimer()
    intervalId = setInterval(() => {render()}, 300)
  })


restartButton.addEventListener("click", restartGame)
  function restartGame(){
Score = 0;
ScoreElement.innerText = Score;
startTimer()

    blocks[ `${food.x}-${food.y}` ].classList.remove("food")
 snake.forEach(segment => {
          blocks[ `${segment.x}-${segment.y}`].classList.remove("fill")
      })
      

    modal.style.display = "none"
    direction = "right"
    snake = [ { x: 1, y: 3 } ]
     food = { x:Math.floor(Math.random() * rows), y:Math.floor(Math.random() *cols)}
  intervalId = setInterval(() => {render() }, 300)


 
  }

 document.addEventListener("keydown", (event) => {
    if(event.key == "ArrowUp"){
        direction = 'up'
    }else if(event.key == "ArrowRight"){
        direction = "right"
    }else if(event.key == "ArrowDown"){
        direction = "down"
    }else if(event.key === "ArrowLeft"){
        direction = "left"
    }
 })

