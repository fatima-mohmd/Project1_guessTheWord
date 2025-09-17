let container = document.querySelector(".word")
let input = document.querySelector(".char")
let submitButton = document.querySelector(".submitButton")
let hintButton = document.querySelector(".hintButton")

let playerStatus = document.querySelector("h2")
let guessedContainer = document.querySelector(".guessedLetters")
let guessedCount = 0
let wrongCount = 0
let found = false
let timerInterval
let wordA = []
let guessedA = []
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

const start = () => {
  submitButton.value = "Reset"
  container.style.display = "flex"
  hintButton.style.display = "block"
  hintButton.disabled = false

  input.style.display = "block"
  input.focus()
  playerStatus.innerText = "Guess a Letter"
}
const reset = () => {
  document.querySelector("img").setAttribute("src", `photos/0.jpg`)
  playerStatus.innerText = "Guess a Letter"
  hintButton.style.display = "block"
  hintButton.disabled = false

  container.style.display = "flex"
  input.style.display = "block"
  input.focus()
  submitButton.value = "Reset"
}
const generateWord = () => {
  //this code from stackOverflow
  let random = Math.floor(Math.random() * fruits.length)
  randomFruit = fruits[random]
  //////////////////////////////
  guessedContainer.innerHTML = ""
  container.innerHTML = ""
  wordA = []
  guessedA = []
  guessedCount = 0
  for (let i = 0; i < randomFruit.length; i++) {
    let div = document.createElement("div")
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
    if (
      input.value.toLowerCase() === randomFruit.charAt(i) &&
      wordA[i].innerText === "_"
    ) {
      wordA[i].innerText = input.value.toLowerCase()
      found = true
      guessedCount++
    }
  }
  if (!found) {
    if (!guessedA.includes(input.value)) {
      document
        .querySelector("img")
        .setAttribute("src", `photos/${wrongCount + 1}.jpg`)
      wrongCount++
    }
  }
  guessedLetters()
  winLoss()
}
const winLoss = () => {
  if (
    wrongCount >= 6 ||
    document.querySelector("#timer").innerText === "EXPIRED"
  ) {
    input.style.display = "none"
    hintButton.style.display = "none"
    playerStatus.innerText = "You loss the word is " + randomFruit
    document.querySelector("#timer").style.opacity = 0
    submitButton.value = "Play again"
    clearInterval(timerInterval)
  } else if (guessedCount == randomFruit.length) {
    clearInterval(timerInterval)
    document.querySelector("#timer").style.opacity = 0
    playerStatus.innerText = "You win"
    input.style.display = "none"
    submitButton.value = "Play again"
  }
}
const guessedLetters = () => {
  guessedContainer.style.display = "flex"
  if (!guessedA.includes(input.value)) {
    let divG = document.createElement("div")
    divG.innerText = input.value
    divG.classList.add("guess")
    guessedContainer.appendChild(divG)
    guessedA.push(input.value)
  }
  input.value = ""
}

const timer = () => {
  clearInterval(timerInterval)
  document.querySelector("#timer").style.opacity = 1
  let seconds
  let timerOptions = document.querySelectorAll("option")
  timerOptions.forEach((option) => {
    if (option.selected) {
      seconds = option.value
    }
  })
  timerInterval = setInterval(() => {
    document.querySelector("#timer").innerText = seconds + "s "
    seconds--
    if (seconds < 0) {
      clearInterval(timer)
      document.querySelector("#timer").innerText = "EXPIRED"
      winLoss()
    }
  }, 1000)
}

const hint = () => {
  let randomLetter
  let randomHint
  do {
    randomHint = Math.floor(Math.random() * randomFruit.length)
    randomLetter = randomFruit[randomHint]
  } while (guessedA.includes(randomLetter))
  guessedCount++
  console.log(`random index is ${randomHint} and the letter is ${randomLetter}`)
  wordA[randomHint].innerText = randomLetter
  hintButton.style.display = "none"

  winLoss()
  input.focus()
}
hintButton.addEventListener("click", hint)
submitButton.addEventListener("click", () => {
  document.querySelector("img").setAttribute("src", `photos/0.jpg`)
  document.querySelector(".categoryName").style.display = "none"

  input.focus()
  wrongCount = 0
  timer()
  if (submitButton.value === "start") {
    start()
  } else {
    reset()
  }
  generateWord()
})
input.addEventListener("input", () => {
  findLetter()
})
