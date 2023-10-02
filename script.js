const paragraphs = [
  "For example, if I decided to write a short eBook called 10 Weight Loss Tips that Are Proven to Work, I would lock the download and ask my visitor to sign up to a dieting newsletter so they could download the eBook.",
  "I would then be paid anywhere between $1 – $20 + (on average) per download.This is obviously dependent on the offers available on the network at the time.",
  "Now that you know what's content locking, As you can see, those websites look like real online generators that will generate for you in -game resources (such as money, experience, skins etc..).",
  "After you select the parameters and enter your username, a fake console appears and makes you believe it's cracking the resources for you, but almost at the end",
  "You get asked to complete an offer to show you're not a robot (what they usually call Human Verification).Obviously it's not a a real human verification but a CPA offer (content locking)!",
]
const pg = document.getElementById('pg');
const userInput = document.querySelector(".textinput");
const resetBtn = document.querySelector(".containerin button");

const totalTime = document.querySelector(".time .txt2");
const totalWpm = document.querySelector(".wpm .txt2");
const totalCpm = document.querySelector(".cpm .txt2");
const totalMistake = document.querySelector(".mistake .txt2");

let timer;
let maxTime = 120;
let timeRemaining = maxTime;

let charIndex = 0;
let mistakes = 0;
let isTyping = 0;

const setParagraph = () =>
{
  const randIndex = Math.floor(Math.random() * paragraphs.length);
  pg.innerText = "";
  paragraphs[randIndex].split("").forEach(char =>
  {
    pg.innerHTML += `<span>${char}</span>`;
  });

  pg.querySelectorAll("span")[0].classList.add('active');
  document.addEventListener("keydown", () => userInput.focus());
  pg.addEventListener("click", () => userInput.focus());

  totalTime.innerText = timeRemaining;
  totalWpm.innerText = 0;
  totalMistake.innerText = 0;
  totalCpm.innerText = 0;
};

const startTyping = () =>
{
  let characters = pg.querySelectorAll('span');

  let typedChar = userInput.value.split("")[charIndex];
  if (charIndex < characters.length - 1 && timeRemaining > 0)
  {
    if (!isTyping)
    {
      timer = setInterval(startTimer, 1000);
      isTyping = 1;
    }

    if (typedChar === null)
    {
      if (charIndex > 0)
      {
        charIndex--;
        if (characters[charIndex].contains("incorrect"))
        {
          mistakes--;
        }
        characters[charIndex].classList.remove("incorrect", "correct");
      }
    } else
    {
      if (characters[charIndex].innerText == typedChar)
      {
        characters[charIndex].classList.add("correct");
      } else
      {
        characters[charIndex].classList.add("incorrect");
        mistakes++;
      }
      charIndex++;
    }
    characters.forEach(char => char.classList.remove('active'));
    characters[charIndex].classList.add("active");

    // WPM = (charIndex - mistakes / 5) / (maxTime - timeRemaining)

    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeRemaining) * 60);
    wpm = wpm < 0 || !wpm || wpm == Infinity ? 0 : wpm;
    totalWpm.innerText = wpm;
    totalMistake.innerText = mistakes;
    totalCpm.innerText = charIndex - mistakes;
  }

  else
  {
    clearInterval(timer);
    isTyping = false;
  }
};

const startTimer = () =>
{
  if (timeRemaining > 0)
  {
    timeRemaining--;
    totalTime.innerHTML = timeRemaining;
    let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeRemaining) * 60);
    totalWpm.innerHTML = wpm;
  } else
  {
    clearInterval(timer);
    isTyping = false;
  }
};

const resetGame = () =>
{
  setParagraph();
  // clearInterval(timer);
  timeRemaining = maxTime;
  charIndex = 0;
  mistakes = 0;
  isTyping = 0;
  userInput.value = "";
  totalTime.innerText = timeRemaining;
  totalWpm.innerText = 0;
  totalMistake.innerText = 0;
  totalCpm.innerText = 0;
};

setParagraph();
resetBtn.addEventListener('click', resetGame);
userInput.addEventListener('input', startTyping);