let container = document.querySelector(".word")
let input = document.querySelector(".char")
let button = document.querySelector(".submit")
let playerStatus = document.querySelector("h2")
let wrong = document.querySelector(".wrongContainer")
let letters = document.querySelectorAll(".letter")
let wrongA = document.querySelectorAll(".wrong")
let guessedContainer = document.querySelector(".guessedLetters")
let wordA = []
let animals = ["dog", "cat", "zebra", "bird", "fish", "turtle", "lion", "tiger"]
let guess
let guessedCount = 0
let found = false
let wrongCount
let div
let divG
let random
let randomAnimal
let guessedLettersContainer = document.querySelectorAll(".guessedLetters")
let guessedA = []
const start = () => {
  button.value = "Reset"
  container.style.opacity = 1
  input.style.opacity = 1
  wrong.style.opacity = 1
}
const reset = () => {
  playerStatus.style.opacity = 0
  container.style.opacity = 1
  input.style.opacity = 1
  button.value = "Reset"
  wrongA.forEach((wrongy) => {
    wrongy.style.backgroundColor = "rgb(203, 203, 203)"
  })
}
const generateWord = () => {
  //this code from stackOverflow
  random = Math.floor(Math.random() * animals.length)
  randomAnimal = animals[random]
  //////////////////////////////

  container.innerHTML = ""
  wordA = []
  for (let i = 0; i < randomAnimal.length; i++) {
    div = document.createElement("div")
    div.innerText = "_"
    div.classList.add("letter")
    container.appendChild(div)
    wordA.push(div)
  }
  console.log(randomAnimal)
}
const findLetter = () => {
  found = false

  for (let i = 0; i < randomAnimal.length; i++) {
    if (input.value === randomAnimal.charAt(i)) {
      wordA[i].innerText = input.value
      found = true
      if (!guessedA.includes(input.value)) {
        guessedCount++
      }

      console.log(guessedCount)
    }
  }
  // guessedA.push(input.value)
  if (!found) {
    for (let i = 0; i < wrongA.length; i++) {
      if (wrongA[i].style.backgroundColor !== "red") {
        wrongA[i].style.backgroundColor = "red"
        found = false
        wrongCount++
        break
      }
    }
  }
  console.log(wrongCount)
  guessedLetters()
  winLoss()
  input.value = ""
}
const winLoss = () => {
  if (wrongCount >= 3) {
    playerStatus.innerText = "You loss"
    input.style.opacity = 0
    button.value = "Play again"
  } else if (guessedCount >= randomAnimal.length) {
    playerStatus.innerText = "You win"
    input.style.opacity = 0
  }
}
const guessedLetters = () => {
  guessedContainer.style.opacity = 1
  if (!guessedA.includes(input.value)) {
    divG = document.createElement("div")
    divG.innerText = input.value
    divG.classList.add("guess")
    guessedContainer.appendChild(divG)
    guessedA.push(input.value)
  }

  console.log("this is the divG.innerText " + divG.innerText)
}
//done//////////////////////////////////////////////////////////
button.addEventListener("click", () => {
  wrongCount = 0
  if (button.value === "start") {
    start()
  } else {
    reset()
  }
  generateWord()
})
input.addEventListener("input", () => {
  findLetter()
})
