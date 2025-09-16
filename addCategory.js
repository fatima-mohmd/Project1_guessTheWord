let fieldset = document.querySelector("fieldset")
let categoryName = document.querySelector(".name")
let container = document.querySelector(".word")
let input = document.querySelector(".char")
let submitButton = document.querySelector(".submitButton")
let hintButton = document.querySelector(".hintButton")
let playerStatus = document.querySelector("h2")
let guessedContainer = document.querySelector(".guessedLetters")
let myList = []
let wordA = []
let guessedA = []
let guessedCount = 0
let wrongCount = 0
let found = false
let timerInterval
let randomWord

const generateWord = () => {
  let div
  //this code from stackOverflow
  let random = Math.floor(Math.random() * myList.length)
  randomWord = myList[random]
  //////////////////////////////
  guessedContainer.innerHTML = ""
  container.innerHTML = ""
  wordA = []
  guessedA = []
  guessedCount = 0
  for (let i = 0; i < randomWord.length; i++) {
    div = document.createElement("div")
    div.innerText = "_"
    div.classList.add("letter")
    container.appendChild(div)
    wordA.push(div)
  }
  console.log(randomWord)
}
const findLetter = () => {
  found = false
  for (let i = 0; i < randomWord.length; i++) {
    if (
      input.value.toLowerCase() === randomWord[i] &&
      wordA[i].innerText === "_"
    ) {
      console.log("lowered")
      wordA[i].innerText = input.value.toLowerCase()
      found = true
      guessedCount++
    }
  }
  if (!found) {
    for (let i = 0; i < 3; i++) {
      if (!guessedA.includes(input.value)) {
        document
          .querySelector("img")
          .setAttribute("src", `photos/${wrongCount + 1}.jpg`)
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
    input.disabled = true
    playerStatus.innerText = "You loss the word is " + randomWord
    document.querySelector("#txt").style.opacity = 0
    submitButton.value = "Play again"
    clearInterval(timerInterval)
  } else if (guessedCount == randomWord.length) {
    clearInterval(timerInterval)
    document.querySelector("#txt").style.opacity = 0
    playerStatus.innerText = "You win"
    input.disabled = true
    hintButton.disabled = true
  }
}
const guessedLetters = () => {
  let divG
  if (!guessedA.includes(input.value)) {
    divG = document.createElement("div")
    divG.innerText = input.value
    divG.classList.add("guess")
    guessedContainer.appendChild(divG)
    guessedA.push(input.value)
  }
}
const reset = () => {
  document.querySelector("img").setAttribute("src", `photos/0.jpg`)
  playerStatus.innerText = "Guess a Letter"
  submitButton.value = "Reset"
  input.disabled = false
  input.focus()
  generateWord()
}

const timer = () => {
  let seconds
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
  let randomHint
  let randomLetter
  do {
    randomHint = Math.floor(Math.random() * randomWord.length)
    randomLetter = randomWord[randomHint]
    guessedCount++
    winLoss()
  } while (guessedA.includes(randomLetter))
  console.log(`random index is ${randomHint} and the letter is ${randomLetter}`)
  wordA[randomHint].innerText = randomLetter
  input.focus()
}
hintButton.addEventListener("click", hint)
submitButton.addEventListener("click", () => {
  input.focus()
  hintButton.disabled = false
  wrongCount = 0
  timer()
  reset()
})
input.addEventListener("input", () => {
  findLetter()
})

document
  .querySelector(".submitCategoryButton")
  .addEventListener("click", () => {
    document.querySelector(".newWord").focus()

    let inputWord = document.querySelector(".newWord")
    let word = document.createElement("option")
    let displayWord = document.createElement("h4")
    word.value = inputWord.value
    document.querySelector("datalist").appendChild(word)
    fieldset.appendChild(displayWord)
    displayWord.innerText = inputWord.value
    myList.push(inputWord.value)
    inputWord.value = ""
    console.log(myList)
  })
document.querySelector(".nextButton").addEventListener("click", () => {
  if (categoryName.value !== "") {
    console.log(categoryName.value)
    fieldset.disabled = false
    document.querySelector(".newWord").focus()
  }
})
let allWords
document.querySelector(".resetCategory").addEventListener("click", () => {
  categoryName.value = ""
  categoryName.focus()
  categoryName.setAttribute("autofocus", "true")
  fieldset.disabled = true
  allWords = document.querySelectorAll("h4")
  allWords.forEach((word2) => {
    fieldset.removeChild(word2)
  })
})
document.querySelector(".playButton").addEventListener("click", () => {
  if (categoryName.value !== "" && myList.length >= 2) {
    console.log("Play")
    generateWord()
    hintButton.style.display = "block"
    input.style.display = "block"
    container.style.display = "flex"
    guessedContainer.style.display = "flex"
    document.querySelector(".yourCategory").style.display = "flex"
    document.querySelector(".addCategory").style.display = "none"
    document.querySelector(".category").innerText = categoryName.value
    input.focus()
  }
})
