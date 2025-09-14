// home
// let category = document.querySelector(".category")
// let arabic = document.querySelector("#ar")
// let english = document.querySelector("#eng")
// arabic.addEventListener("click", () => {
//   category.textContent = "حيوانات"
// })
// english.addEventListener("click", () => {
//   category.textContent = "Animals"
// })

let container = document.querySelector(".word")
let input = document.querySelector(".char")
let submitButton = document.querySelector(".submitButton")
let hintButton = document.querySelector(".hintButton")

let playerStatus = document.querySelector("h2")
let wrong = document.querySelector(".wrongContainer")
let letters = document.querySelectorAll(".letter")
let wrongA = document.querySelectorAll(".wrong")
let guessedContainer = document.querySelector(".guessedLetters")
let wordA = []
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
let Countries = [
  "afghanistan",
  "albania",
  "algeria",
  "argentina",
  "armenia",
  "australia",
  "azerbaijan",
  "bahrain",
  "bangladesh",
  "belgium",
  "portugal",
  "brazil",
  "bulgaria",
  "cambodia",
  "cameroon",
  "canada",
  "china",
  "colombia",
  "croatia",
  "denmark",
  "egypt",
  "ethiopia",
  "finland",
  "france",
  "germany",
  "ghana",
  "greece",
  "iceland",
  "india",
  "indonesia",
  "iran",
  "iraq",
  "italy",
  "jamaica",
  "japan",
  "jordan",
  "kazakhstan",
  "kenya",
  "pakistan",
  "kuwait",
  "lebanon",
  "libya",
  "madagascar",
  "malaysia",
  "poland",
  "mexico",
  "morocco",
  "netherlands",
  "nigeria",
  "norway",
  "oman",
]
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
let timerInterval
let seconds
let hinted = false
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
  random = Math.floor(Math.random() * animals.length)
  randomAnimal = animals[random]
  //////////////////////////////
  guessedContainer.innerHTML = ""
  container.innerHTML = ""
  wordA = []
  guessedA = []
  guessedCount = 0
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
    console.log("hELLO")

    if (
      input.value.toLowerCase() === randomAnimal.charAt(i) &&
      !guessedA.includes(input.value)
    ) {
      console.log("lowered")
      wordA[i].innerText = input.value.toLowerCase()
      found = true
      guessedCount++
    }
  }
  if (!found) {
    for (let i = 0; i < wrongA.length; i++) {
      if (
        wrongA[i].style.backgroundColor !== "red" &&
        !guessedA.includes(input.value)
      ) {
        wrongA[i].style.backgroundColor = "red"
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
    wrongCount >= 3 ||
    document.querySelector("#txt").innerText === "EXPIRED"
  ) {
    input.style.opacity = 0
    playerStatus.innerText = "You loss the word is " + randomAnimal
    document.querySelector("#txt").style.opacity = 0
    // input.setAttribute("readOnly", true)
    submitButton.value = "Play again"
    clearInterval(timerInterval)
  } else if (guessedCount == randomAnimal.length) {
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
  do {
    randomHint = Math.floor(Math.random() * randomAnimal.length)
    randomLetter = randomAnimal[randomHint]
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
