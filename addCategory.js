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
    let div = document.createElement("div")
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
  console.log("winLoss")
  if (
    wrongCount >= 6 ||
    document.querySelector("#timer").innerText === "EXPIRED"
  ) {
    input.style.display = "none"
    hintButton.style.display = "none"
    playerStatus.innerText = "You lost! the word was " + randomWord
    document.querySelector("#timer").style.opacity = 0
    submitButton.value = "Play again"
    clearInterval(timerInterval)
  } else if (guessedCount == randomWord.length) {
    clearInterval(timerInterval)
    document.querySelector("#timer").style.opacity = 0
    playerStatus.innerText = "You win"
    input.style.display = "none"
    hintButton.style.display = "none"
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
const reset = () => {
  console.log("reset")
  wrongCount = 0
  document.querySelector("img").setAttribute("src", `photos/0.jpg`)
  playerStatus.innerText = "Guess a Letter"
  submitButton.style.display = "flex"
  hintButton.style.display = "flex"
  hintButton.disabled = false

  container.style.display = "flex"
  input.style.display = "block"
  input.focus()
  submitButton.value = "Reset"
  generateWord()
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
  let randomHint
  let randomLetter
  do {
    randomHint = Math.floor(Math.random() * randomWord.length)
    randomLetter = randomWord[randomHint]
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
  console.log("submit")
  document.querySelector("img").setAttribute("src", `photos/0.jpg`)

  input.focus()
  wrongCount = 0
  timer()
  reset()
  generateWord()
})
let rButton = document.querySelector(".resetGameButton")
rButton.addEventListener("click", () => {
  reset()
})
input.addEventListener("input", () => {
  findLetter()
})
document.querySelector(".nextButton").addEventListener("click", () => {
  if (categoryName.value !== "") {
    console.log(categoryName.value)
    fieldset.disabled = false
    fieldset.style.background = "white"

    document.querySelector(".newWord").focus()
  }
})
let allWords
const addRemove = () => {
  let inputWord
  let allWords
  document
    .querySelector(".submitCategoryButton")
    .addEventListener("click", () => {
      document.querySelector(".newWord").focus()

      inputWord = document.querySelector(".newWord")
      let word = document.createElement("option")
      let displayWord = document.createElement("h4")
      word.value = inputWord.value
      document.querySelector("datalist").appendChild(word)
      fieldset.appendChild(displayWord)
      displayWord.innerText = inputWord.value
      myList.push(inputWord.value)
      inputWord.value = ""
      console.log(myList)
      displayWord.addEventListener("dblclick", () => {
        fieldset.removeChild(displayWord)
        myList = myList.filter((w) => w !== displayWord.innerText)
        console.log("this is my list " + myList)
      })
    })
}
document.querySelector(".resetCategory").addEventListener("click", () => {
  categoryName.value = ""
  categoryName.focus()
  fieldset.disabled = true
  allWords = document.querySelectorAll("h4")
  fieldset.style.backgroundColor = "#c3c3c3ff"

  allWords.forEach((word2) => {
    fieldset.removeChild(word2)
  })
})
document.querySelector(".playButton").addEventListener("click", () => {
  document.querySelector("img").setAttribute("src", `photos/0.jpg`)

  if (categoryName.value !== "" && myList.length >= 2) {
    timer()
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
document.querySelector(".formBackButton").addEventListener("click", () => {
  document.querySelector(".addCategory").style.display = "flex"
  document.querySelector(".yourCategory").style.display = "none"
})
addRemove()
