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
let animals = [
  "dog",
  "cat",
  "zebra",
  "bird",
  "fish",
  "turtle",
  "lion",
  "tiger",
  "snake",
  "penguin",
  "pig",
  "frog",
  "elephant",
  "eagle",
  "lizard",
  "tuna",
  "goat",
  "shrimp",
  "dolphin",
  "shark",
  "sheep",
  "wolf",
  "fox",
  "bear",
  "snail",
  "salmon",
  "chicken",
  "camel",
  "whale",
  "owl",
  "canary",
  "duck",
  "octopus",
  "mouse",
  "horse",
  "deer",
  "crab",
  "cow",
  "monkey",
  "gorilla",
  "flamingo",
  "giraffe",
  "hamster",
  "squid",
  "jellyfish",
  "rabbit",
  "jaguar",
  "kangaroo",
  "koala",
  "lobster",
  "panda",
]

const start = () => {
  submitButton.value = "Reset"
  submitButton.style.display = "flex"

  container.style.display = "flex"
  hintButton.style.display = "flex"
  hintButton.disabled = false

  input.style.display = "block"
  input.focus()
  playerStatus.innerText = "Guess a Letter"
}
const reset = () => {
  document.querySelector("img").setAttribute("src", `photos/0.jpg`)
  playerStatus.innerText = "Guess a Letter"
  submitButton.style.display = "flex"
  hintButton.style.display = "flex"
  hintButton.disabled = false

  container.style.display = "flex"
  input.style.display = "block"
  input.focus()
  submitButton.value = "Reset"
}
const generateWord = () => {
  //this code from stackOverflow
  let random = Math.floor(Math.random() * animals.length)
  randomAnimal = animals[random]
  //////////////////////////////
  guessedContainer.innerHTML = ""
  container.innerHTML = ""
  wordA = []
  guessedA = []
  guessedCount = 0
  for (let i = 0; i < randomAnimal.length; i++) {
    let div = document.createElement("div")
    div.innerText = "_"
    div.classList.add("letter")
    container.appendChild(div)
    wordA.push(div)
  }
  console.log(randomAnimal)
}
const findLetter = (e) => {
  found = false
  let col = ""
  let divG = document.createElement("div")
  guessedContainer.style.display = "flex"

  for (let i = 0; i < randomAnimal.length; i++) {
    if (
      input.value.toLowerCase() === randomAnimal.charAt(i) &&
      wordA[i].innerText === "_"
    ) {
      console.log(i)
      wordA[i].innerText = input.value.toLowerCase()
      found = true
      guessedCount++
      // col = guessedLetters("green")
      // console.log(col)
      if (!guessedA.includes(input.value)) {
        divG.innerText = input.value
        divG.classList.add("guess")
        guessedContainer.appendChild(divG)
        guessedA.push(input.value)
        divG.style.backgroundColor = "green"
        // input.value = ""
      }
    }
  }
  if (!found) {
    if (!guessedA.includes(input.value)) {
      document
        .querySelector("img")
        .setAttribute("src", `photos/${wrongCount + 1}.jpg`)
      wrongCount++
      // guessedLetters("red")
      if (!guessedA.includes(input.value)) {
        divG.innerText = input.value
        divG.classList.add("guess")
        guessedContainer.appendChild(divG)
        guessedA.push(input.value)
        divG.style.backgroundColor = "red"
        // input.value = ""
      }
    } else {
      e.target.value = ""
      input.value = ""
    }
  }
  input.value = ""
  winLoss()
}

const winLoss = () => {
  if (
    wrongCount >= 6 ||
    document.querySelector("#timer").innerText === "EXPIRED"
  ) {
    input.style.display = "none"
    hintButton.style.display = "none"
    playerStatus.innerText = "You lost! the word was " + randomAnimal
    document.querySelector("#timer").style.opacity = 0
    submitButton.value = "Play again"
    clearInterval(timerInterval)
  } else if (guessedCount == randomAnimal.length) {
    clearInterval(timerInterval)
    document.querySelector("#timer").style.opacity = 0
    playerStatus.innerText = "You win"
    input.style.display = "none"
    hintButton.style.display = "none"
    submitButton.value = "Play again"
  }
}
const guessedLetters = (color) => {
  guessedContainer.style.display = "flex"
  if (!guessedA.includes(input.value)) {
    let divG = document.createElement("div")
    divG.innerText = input.value
    divG.classList.add("guess")

    guessedContainer.appendChild(divG)
    guessedA.push(input.value)
    divG.style.backgroundColor = color
    console.log(divG)
  }
  input.value = ""
  return color
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
    randomHint = Math.floor(Math.random() * randomAnimal.length)
    randomLetter = randomAnimal[randomHint]
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
input.addEventListener("input", (e) => {
  if (input.value !== "") {
    console.log(e.target)
    findLetter(e)
  } else {
    console.log(input.value)
    e.target.value = ""
    input.value = ""
    console.log(e)
  }
})
