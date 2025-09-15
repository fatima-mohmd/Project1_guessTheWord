let container = document.querySelector(".word")
let input = document.querySelector(".char")
let submitButton = document.querySelector(".submitButton")
let hintButton = document.querySelector(".hintButton")

let playerStatus = document.querySelector("h2")
let wrong = document.querySelector(".wrongContainer")
let wrongA = document.querySelectorAll(".wrong")
let guessedContainer = document.querySelector(".guessedLetters")
let wordA = []
let fruits = [
  "apple",
  "strawberry",
  "mango",
  "orange",
  "melon",
  "apricot",
  "pears",
  "avocado",
  "cherry",
  "blackberry",
  "raspberry",
  "lime",
  "banana",
  "watermelon",
  "guava",
  "pear",
  "coconut",
  "date",
  "fig",
  "grape",
  "kiwi",
  "bean",
  "cucumber",
  "eggplant",
  "potato",
  "pepper",
  "basil",
  "pumpkin",
  "tomato",
  "corn",
  "blueberry",
  "brocoli",
  "lettuce",
  "cacao",
  "carrot",
  "onion",
  "garlic",
  "ginger",
  "rosemary",
  "Jackfruit",
  "Kale",
  "mushroom",
  "pineapple",
  "rice",
  "spinach",
  "lavender",
  "taro",
]

let guessedCount = 0
let found = false
let wrongCount
let div
let divG
let random
let randomCountry
let guessedA = []
let timerInterval
let seconds
let randomLetter
let randomHint

const checkCategory = () => {}
checkCategory()
const start = () => {
  submitButton.value = "Reset"
  container.style.opacity = 1
  input.style.opacity = 1
  wrong.style.opacity = 1
  playerStatus.innerText = "Guess a Letter"
}
const reset = () => {
  playerStatus.innerText = "Guess a Letter"

  playerStatus.style.opacity = 1
  container.style.opacity = 1
  input.style.opacity = 1
  submitButton.value = "Reset"
  wrongA.forEach((wrongy) => {
    wrongy.style.backgroundColor = "rgb(203, 203, 203)"
  })
}
const generateWord = () => {
  //this code from stackOverflow
  random = Math.floor(Math.random() * fruits.length)
  randomFruit = fruits[random]
  //////////////////////////////
  guessedContainer.innerHTML = ""
  container.innerHTML = ""
  wordA = []
  guessedA = []
  guessedCount = 0
  for (let i = 0; i < randomFruit.length; i++) {
    div = document.createElement("div")
    div.innerText = "_"
    div.classList.add("letter")
    container.appendChild(div)
    wordA.push(div)
  }
  console.log(randomFruit)
}
const findLetter = () => {
  found = false
  for (let i = 0; i < randomFruit.length; i++) {
    console.log("hELLO")

    if (
      input.value.toLowerCase() === randomFruit.charAt(i) &&
      !guessedA.includes(input.value)
    ) {
      console.log("lowered")
      wordA[i].innerText = input.value.toLowerCase()
      found = true
      guessedCount++
    }
  }
  if (!found) {
    for (let i = 0; i < 3; i++) {
      if (
        // wrongA[i].style.backgroundColor !== "red" &&
        !guessedA.includes(input.value)
      ) {
        // c += 1
        // document.querySelector("img").getAttribute("src")
        document
          .querySelector("img")
          .setAttribute("src", `photos/${wrongCount + 1}.jpg`)

        // wrongA[i].style.backgroundColor = "red"
        wrongCount++
        break
      }
    }
  }
  guessedLetters()
  winLoss()

  input.value = ""
}
const winLoss = () => {
  if (
    wrongCount >= 6 ||
    document.querySelector("#txt").innerText === "EXPIRED"
  ) {
    input.style.opacity = 0
    playerStatus.innerText = "You loss the word is " + randomFruit
    document.querySelector("#txt").style.opacity = 0
    // input.setAttribute("readOnly", true)
    submitButton.value = "Play again"
    clearInterval(timerInterval)
  } else if (guessedCount == randomFruit.length) {
    clearInterval(timerInterval)
    document.querySelector("#txt").style.opacity = 0
    playerStatus.innerText = "You win"
    input.style.opacity = 0
    guessedCount = 0
    hintButton.style.opacity = 0
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
}

const timer = () => {
  clearInterval(timerInterval)
  document.querySelector("#txt").style.opacity = 1

  seconds = 60
  timerInterval = setInterval(() => {
    document.querySelector("#txt").innerText = seconds + "s "
    seconds--
    if (seconds < 0) {
      clearInterval(timer)
      document.querySelector("#txt").innerText = "EXPIRED"
      winLoss()
    }
  }, 1000)
}

const hint = () => {
  input.focus()

  do {
    randomHint = Math.floor(Math.random() * randomFruit.length)
    randomLetter = randomFruit[randomHint]
    guessedCount++
    winLoss()
  } while (guessedA.includes(randomLetter))
  console.log(`random index is ${randomHint} and the letter is ${randomLetter}`)
  wordA[randomHint].innerText = randomLetter
  hintButton.style.opacity = 0
}
//done//////////////////////////////////////////////////////////
hintButton.addEventListener("click", hint)
submitButton.addEventListener("click", () => {
  input.focus()

  hintButton.style.opacity = 1
  wrongCount = 0
  timer()
  if (submitButton.value === "start") {
    start()
  } else {
    // input.setAttribute("readOnly", false)

    reset()
  }
  // input.setAttribute("readOnly", false)

  generateWord()
})
input.addEventListener("input", () => {
  findLetter()
})
