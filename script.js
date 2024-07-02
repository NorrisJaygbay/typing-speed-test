// variable to store all the paragraphs 
const paragraphs = [
    // 1
    "Typing is an essential skill in the modern world, where digital communication is ubiquitous. From sending emails to writing reports, the ability to type efficiently and accurately is crucial. Mastering typing skills can significantly enhance productivity, enabling individuals to complete tasks more quickly and with fewer errors. As technology continues to advance, the demand for proficient typists remains high, making it a valuable skill in both personal and professional contexts.",
    // 2
    "Learning to type efficiently involves understanding proper finger placement and hand positioning. Touch typing, where typists use all ten fingers without looking at the keyboard, is considered the most effective method. This technique relies on muscle memory to find keys quickly and accurately, reducing the need to glance at the keyboard. Practicing touch typing regularly can lead to significant improvements in speed and accuracy, making it a valuable skill for anyone who frequently uses a computer.",
    // 3
    "Mastering typing skills can significantly enhance productivity, enabling individuals to complete tasks more quickly and with fewer errors. As technology continues to advance, the demand for proficient typists remains high, making it a valuable skill in both personal and professional contexts. However, traditional typing skills remain relevant, as they provide a foundation for effective digital communication.",
    // 4
    "Additionally, many standardized tests and assignments are now administered digitally, making typing skills essential for academic success. Educators recognize the importance of teaching typing skills early, with many schools incorporating typing lessons into their curricula to ensure students are prepared for the demands of the digital age.",
    // 5
    "Employers often seek candidates with strong typing skills, as they can enhance productivity and efficiency. Investing in typing training can therefore be a strategic career move for individuals looking to improve their job prospects. However, traditional typing skills remain relevant, as they provide a foundation for effective digital communication.",
    // 6
    "Typing skills can also benefit personal productivity and communication. From writing personal emails and social media posts to managing household budgets and schedules, typing is a versatile skill that can simplify many everyday tasks. Fast and accurate typing allows individuals to communicate more effectively and manage their time better. As digital communication continues to dominate, the ability to type proficiently becomes increasingly important in maintaining connections and staying organized.",
    // 7
    "Touch typing, where typists use all ten fingers without looking at the keyboard, is considered the most effective method. This technique relies on muscle memory to find keys quickly and accurately, reducing the need to glance at the keyboard. Practicing touch typing regularly can lead to significant improvements in speed and accuracy, making it a valuable skill for anyone who frequently uses a computer.",
    // 8
    "However, traditional typing skills remain relevant, as they provide a foundation for effective digital communication. By mastering typing, individuals can take full advantage of technological advancements while maintaining the ability to produce clear and accurate written content. However, traditional typing skills remain relevant, as they provide a foundation for effective digital communication.",
    // 9
    "Mastering typing skills can significantly enhance productivity, enabling individuals to complete tasks more quickly and with fewer errors. As technology continues to advance, the demand for proficient typists remains high, making it a valuable skill in both personal and professional contexts. However, traditional typing skills remain relevant, as they provide a foundation for effective digital communication.",
    // 10
    "Over time, typewriters evolved into electric and electronic versions, eventually leading to the development of computer keyboards. Today, typing is an integral part of daily life, with most people using keyboards on computers, tablets, and smartphones. However, traditional typing skills remain relevant, as they provide a foundation for effective digital communication."
];

// Selecting necessary DOM elements
const typingText = document.querySelector('.typing-text p');
const textArea = document.querySelector('.textarea');
const welcomePage = document.querySelector('.welcome');
const timeOver = document.querySelector('.timeOver');
const typeAgain = document.querySelector('.typeAgain');
const startTyping = document.querySelector('.startTyping');
const timeDisplay = document.querySelector('.time span b');
const mistakeDisplay = document.querySelector('.mistake span');
const wpmDisplay = document.querySelector('.wpm span');
const cpmDisplay = document.querySelector('.cpm span');
const accuracyDisplay = document.querySelector('.accuracy span');

let timer;
let maxTime = 60; // Set maximum time for the typing test
let timeLeft = maxTime;
let letterIndex = 0;
let mistakes = 0;
let isTyping = false;

startTyping.addEventListener('click', ()=> { 
    welcomePage.classList.toggle('welcomedisplay');
    setTimeout(()=>{
        nextText();
    }, 150);
})

typeAgain.addEventListener('click', ()=> {
    timeOver.classList.toggle('timeOverdisplay');
    setTimeout(()=>{
        nextText();
    }, 150);
})

// Function to select a random paragraph and display it
function randomParagraph() {
    let randIndex = Math.floor(Math.random() * paragraphs.length); // Generate a random paragraph index
    typingText.innerHTML = '';

    // Create a span for each character in the selected paragraph
    paragraphs[randIndex].split("").forEach(char => {
        let spanTag = `<span>${char}</span>`;
        typingText.innerHTML += spanTag;
    });
    // Focus the input field when typing or clicking on the typing area
    document.addEventListener('keydown', () => textArea.focus());
    typingText.addEventListener('click', () => textArea.focus());
}

// Function to initialize typing process
function initTyping() {
    const letters = typingText.querySelectorAll('span');
    let typedChar = textArea.value.split("")[letterIndex];

    // Start the timer if typing just started
    if (!isTyping) {
        timer = setInterval(startTimer, 1000);
        isTyping = true;
    }

    if (typedChar == null) {
        letterIndex--;
        if (letters[letterIndex]) {
            letters[letterIndex].classList.remove("correct", "incorrect", "active");
        }
    } else {
        // Mark character as correct or incorrect
        if (letters[letterIndex].innerText === typedChar) {
            letters[letterIndex].classList.add('correct');
        } else {
            mistakes++;
            letters[letterIndex].classList.add('incorrect');
        }
        letterIndex++;
    }

    // Update active character
    letters.forEach(span => span.classList.remove('active'));
    if (letters[letterIndex]) {
        letters[letterIndex].classList.add('active');
    }

    // Calculate and display accuracy
    let correctLetter = letterIndex - mistakes;
    let accuracy = Math.round((correctLetter / letterIndex) * 100);

    mistakeDisplay.innerText = mistakes;
    cpmDisplay.innerText = correctLetter;
    wpmDisplay.innerText = Math.round((correctLetter / 5) / ((maxTime - timeLeft) / 60));
    accuracyDisplay.innerText = letterIndex > 0 ? `${accuracy}%` : `0%`;
}

// Function to start the countdown timer
function startTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeDisplay.innerText = timeLeft;
    } else {
        clearInterval(timer);
        timeOver.classList.toggle('timeOverdisplay');
        textArea.disabled = true;
    }
}

// Function to reset and start a new typing test
function nextText() {
    clearInterval(timer);
    timeLeft = maxTime;
    letterIndex = 0;
    mistakes = 0;
    isTyping = false;
    textArea.disabled = false;
    textArea.value = '';
    textArea.focus();
    timeDisplay.innerText = timeLeft;
    mistakeDisplay.innerText = mistakes;
    wpmDisplay.innerText = 0;
    cpmDisplay.innerText = 0;
    accuracyDisplay.innerText = `0%`;
    randomParagraph();
  
}

// Initial setup
randomParagraph();
textArea.addEventListener('input', initTyping);
window.addEventListener('load', () => {
    textArea.value = '';
    textArea.focus();
    nextText();
});
