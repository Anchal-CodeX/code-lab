const rock = document.querySelector(".rock");
const paper = document.querySelector(".paper");
const scissors = document.querySelector(".scissors");
const result = document.querySelector(".result");
const your = document.querySelector(".show");
const computerDisplay = document.querySelector(".random");
const player = document.querySelector('.player')
const nob = document.querySelector('.nob');
const reset = document.querySelector('.reset');
const hand = document.querySelector('.hand');

let you ;
 
let computer;
let score = 0;
let losses = 0;

 async function aa(){
    await setTimeout(() => {
player.textContent = `Player: ${score}`;
nob.textContent = `Computer: ${losses}`;
     },1500)
    }
aa();
function playGame(){

let random = Math.floor(Math.random()*3);
if(random==0)
    computer = 1;
else if(random==1)
    computer = 2;
else
    computer = 3;

// Highlight the block randomly selected by the computer.
const choices = [rock, paper, scissors];
choices.forEach(choice => {
    choice.style.transition = "transform 0.2s ease";
    choice.style.transform = "";
});
choices[computer - 1].style.transform = "scale(1.25) rotate(5deg)";


//apply condition for the game
let res ;
if(you==computer){
    res="draw";
}
else if(you==1 && computer==2)
    res="you lose";
else if(you==1 && computer==3)
    res="you win";
else if(you==2 && computer==1)
    res="you win";
else if(you==2 && computer ==3)
    res = "you lose"
else if(you ==3 && computer ==1)
    res = "you lose";
else if(you ==3 && computer ==2)
    res = "you win";

//give value 
if(you==1)
    your.textContent = `YOU: ROCK`;
else if(you==2)
    your.textContent = `YOU: PAPER`;
else if(you==3)
    your.textContent = `YOU: SCISSORS`;
if(computer==1)
    computerDisplay.textContent = `COMPUTER: ROCK`;
else if(computer==2)
    computerDisplay.textContent = `COMPUTER: PAPER`;
else if(computer==3)
    computerDisplay.textContent = `COMPUTER: SCISSORS`;


//result
async function wait(){
 await new Promise(resolve =>
     setTimeout(resolve, 1500));
     result.textContent = `RESULT: ${res}`;
    
     await new Promise(resolve =>
    setTimeout(resolve, 1500));
        result.textContent="RESULT";
        your.textContent="YOU :";
        computerDisplay.textContent="COMPUTER :";

        const choices = [rock, paper, scissors];
choices.forEach(choice => {
    choice.style.transition = "transform 0.2s ease";
    choice.style.transform = "";
});
choices[computer - 1].style.transform = "scale(1) rotate(0deg)";

        
    }

wait();

// Update the score after every round.
if (res === "you win") {
    score++;
    async function aa(){
    await setTimeout(() => {
player.textContent = `Player: ${score}`;
     },1500)
    }
aa();
} else if (res === "you lose") {
    losses++;
    async function aa(){
    await setTimeout(() => {
nob.textContent = `Computer ${losses}`;
     },1500)
    }
aa();
}

//reset button
reset.addEventListener('click', () => {

    player.textContent = `Player: 0`;
nob.textContent = `Computer: 0`;

const choices = [rock, paper, scissors];
choices.forEach(choice => {
    choice.style.transition = "transform 0.2s ease";
    choice.style.transform = "";
});
choices[computer - 1].style.transform = "scale(1) rotate(0deg)";

 
})

}

async function ssss() {
    
await setTimeout(() => {
rock.addEventListener("click", () => {
    you=1;
    playGame();
});
},1500)
}
ssss()

async function hhhh() {
    
await setTimeout(() => {
paper.addEventListener("click", () => {
  you = 2;
  playGame();
});
},1500)
}
hhhh();


async function done() {
    
await setTimeout(() => {
scissors.addEventListener("click", () => {
    you = 3;
    playGame();
});
},1500)
}
done()
