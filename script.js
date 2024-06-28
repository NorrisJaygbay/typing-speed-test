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

const typingText = document.querySelector('.typing-text p');
const inpField = document.querySelector('.input-field');
const timeDisplay = document.querySelector('.time span b');
const mistakeDisplay = document.querySelector('.mistake span');
const wpmDisplay = document.querySelector('.wpm span');
const cpmDisplay = document.querySelector('.cpm span');
const accuracyDisplay = document.querySelector('.accuracy span');

let timer;
let maxTime = 90;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;

function randomParagraph() {
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = '';
    paragraphs[randIndex].split("").forEach(char => {
        let spanTag = `<span>${char}</span>`;
        typingText.innerHTML += spanTag;
    });
    document.addEventListener('keydown', () => inpField.focus());
    typingText.addEventListener('click', () => inpField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll('span');
    let typedChar = inpField.value.split("")[charIndex];

    if (!isTyping) {
        timer = setInterval(startTimer, 1000);
        isTyping = true;
    }

    if (typedChar == null) {
        charIndex--;
        if (characters[charIndex]) {
            characters[charIndex].classList.remove("correct", "incorrect", "active");
        }
    } else {
        if (characters[charIndex].innerText === typedChar) {
            characters[charIndex].classList.add('correct');
        } else {
            mistakes++;
            characters[charIndex].classList.add('incorrect');
        }
        charIndex++;
    }

    characters.forEach(span => span.classList.remove('active'));
    if (characters[charIndex]) {
        characters[charIndex].classList.add('active');
    }

    let correctChars = charIndex - mistakes;
    let accuracy = Math.round((correctChars / charIndex) * 100);

    mistakeDisplay.innerText = mistakes;
    cpmDisplay.innerText = correctChars;
    wpmDisplay.innerText = Math.round((correctChars / 5) / ((maxTime - timeLeft) / 60));
    accuracyDisplay.innerText = charIndex > 0 ? `${accuracy}%` : `0%`;
}

function startTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeDisplay.innerText = timeLeft;
    } else {
        clearInterval(timer);
        inpField.disabled = true;
    }
}

function nextText() {
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = 0;
    mistakes = 0;
    isTyping = false;
    inpField.disabled = false;
    inpField.value = '';
    inpField.focus();
    timeDisplay.innerText = timeLeft;
    mistakeDisplay.innerText = mistakes;
    wpmDisplay.innerText = 0;
    cpmDisplay.innerText = 0;
    accuracyDisplay.innerText = `0%`;
    randomParagraph();
}

randomParagraph();
inpField.addEventListener('input', initTyping);
window.addEventListener('load', ()=>{
    inpField.value = '';
    inpField.focus();
    nextText();
})







// const paragraphs = [
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores soluta placeat accusantium sit accusamus.",
//     "Ipsum dolor sit amet consectetur adipisicing elit. Odit maiores soluta placeat accusantium sit accusamus.",
//     "Aorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores soluta placeat accusantium sit accusamus.",
//     "Borem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores soluta placeat accusantium sit accusamus.",
//     "Corem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores soluta placeat accusantium sit accusamus.",
//     "Dorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores soluta placeat accusantium sit accusamus."
// ];

// const typingText = document.querySelector('.typing-text p');
// const inpField = document.querySelector('.input-field');
// const timeDisplay = document.querySelector('.time span b');
// const mistakeDisplay = document.querySelector('.mistake span');
// const wpmDisplay = document.querySelector('.wpm span');
// const cpmDisplay = document.querySelector('.cpm span');

// let timer;
// let maxTime = 60;
// let timeLeft = maxTime;
// let charIndex = 0;
// let mistakes = 0;
// let isTyping = false;

// function randomParagraph() {
//     let randIndex = Math.floor(Math.random() * paragraphs.length);
//     typingText.innerHTML = '';
//     paragraphs[randIndex].split("").forEach(char => {
//         let spanTag = `<span>${char}</span>`;
//         typingText.innerHTML += spanTag;
//     });
//     document.addEventListener('keydown', () => inpField.focus());
//     typingText.addEventListener('click', () => inpField.focus());
// }

// function initTyping() {
//     const characters = typingText.querySelectorAll('span');
//     let typedChar = inpField.value.split("")[charIndex];

//     if (!isTyping) {
//         timer = setInterval(startTimer, 1000);
//         isTyping = true;
//     }

//     if (typedChar == null) {
//         charIndex--;
//         if (characters[charIndex]) {
//             characters[charIndex].classList.remove("correct", "incorrect", "active");
//         }
//     } else {
//         if (characters[charIndex].innerText === typedChar) {
//             characters[charIndex].classList.add('correct');
//         } else {
//             mistakes++;
//             characters[charIndex].classList.add('incorrect');
//         }
//         charIndex++;
//     }

//     characters.forEach(span => span.classList.remove('active'));
//     if (characters[charIndex]) {
//         characters[charIndex].classList.add('active');
//     }

//     mistakeDisplay.innerText = mistakes;
//     cpmDisplay.innerText = charIndex - mistakes;
//     wpmDisplay.innerText = Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 60));
// }

// function startTimer() {
//     if (timeLeft > 0) {
//         timeLeft--;
//         timeDisplay.innerText = timeLeft;
//     } else {
//         clearInterval(timer);
//         inpField.disabled = true;
//     }
// }

// function nextText() {
//     clearInterval(timer);
//     timeLeft = maxTime;
//     charIndex = 0;
//     mistakes = 0;
//     isTyping = false;
//     inpField.disabled = false;
//     inpField.value = '';
//     timeDisplay.innerText = timeLeft;
//     mistakeDisplay.innerText = mistakes;
//     wpmDisplay.innerText = 0;
//     cpmDisplay.innerText = 0;
//     randomParagraph();
// }

// randomParagraph();
// inpField.addEventListener('input', initTyping);







// const paragraphs = [
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores soluta placeat accusantium sit accusamus.",
//     "Ipsum dolor sit amet consectetur adipisicing elit. Odit maiores soluta placeat accusantium sit accusamus.",
//     "Aorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores soluta placeat accusantium sit accusamus.",
//     "Borem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores soluta placeat accusantium sit accusamus.",
//     "Corem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores soluta placeat accusantium sit accusamus.",
//     "Dorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores soluta placeat accusantium sit accusamus."
// ];

// const typingText = document.querySelector('.typing-text');
// const inpField = document.querySelector('.input-field');
// let charIndex = 0;

// function randomParagraph() {
//     let randIndex = Math.floor(Math.random() * paragraphs.length);
//     typingText.innerHTML = '';
//     paragraphs[randIndex].split("").forEach(char => {
//         let spanTag = `<span>${char}</span>`;
//         typingText.innerHTML += spanTag;
//     });
//     document.addEventListener('keydown', () => inpField.focus());
//     typingText.addEventListener('click', () => inpField.focus());
// }

// function initTyping() {
//     const characters = typingText.querySelectorAll('span');
//     let typedChar = inpField.value.split("")[charIndex];

//     if (typedChar == null) {
//         charIndex--;
//         characters[charIndex]?.classList.remove("correct", "incorrect", "active");
//     } else {
//         if (characters[charIndex].innerText === typedChar) {
//             characters[charIndex].classList.add('correct');
//         } else {
//             characters[charIndex].classList.add('incorrect');
//         }
//         charIndex++;
//     }

//     characters.forEach(span => span.classList.remove('active'));
//     if (characters[charIndex]) {
//         characters[charIndex].classList.add('active');
//     }
// }

// randomParagraph();
// inpField.addEventListener('input', initTyping);




// const paragraphs = [
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores soluta placeat accusantium sit accusamus.",
//     "Ipsum dolor sit amet consectetur adipisicing elit. Odit maiores soluta placeat accusantium sit accusamus.",
//     "Aorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores soluta placeat accusantium sit accusamus.",
//     "Borem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores soluta placeat accusantium sit accusamus.",
//     "Corem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores soluta placeat accusantium sit accusamus.",
//     "Dorem ipsum dolor sit amet consectetur adipisicing elit. Odit maiores soluta placeat accusantium sit accusamus."
// ];

// const typingText = document.querySelector('.typing-text');
// let inpField = document.querySelector('.input-field');
// let charIndex = 0;

// function randomParagraph() {
//     let randIndex = Math.floor(Math.random() * paragraphs.length);
//     // console.log(paragraphs[randIndex].split(""));
//     paragraphs[randIndex].split("").forEach(span => {
//         let spanTag = `<span>${span}</span>`;
//         typingText.innerHTML += spanTag;
//     })
//     document.addEventListener('keydown', ()=> inpField.focus());
//     typingText.addEventListener('click', ()=> inpField.focus());
// }

// function initTyping(){
//     const characters = typingText.querySelectorAll('span');
//     let typedChar = inpField.value.split("")[charIndex];
//     // console.log(characters[0]);
//     // console.log(typedChar);

//     if(typedChar == null){
//         charIndex--;
//         characters[charIndex].classList.remove("correct", "incorret");
//         // characters[charIndex].classList.remove('incorrect');
//     }else{
//         if(characters[charIndex].innerText === typedChar){
//             // console.log('correct');
//             characters[charIndex].classList.add('correct');
//         }else{
//             // console.log('incorrect');
//             characters[charIndex].classList.add('incorrect');
//         }
//         // charIndex++;
//     }


//     if(characters[charIndex].innerText === typedChar){
//         // console.log('correct');
//         characters[charIndex].classList.add('correct');
//     }else{
//         // console.log('incorrect');
//         characters[charIndex].classList.add('incorrect');
//     }
//     charIndex++;
//     characters.forEach(span => span.classList.remove('active'));
//     characters[charIndex].classList.add('active');
// }
// // initTyping();
// randomParagraph();
// inpField.addEventListener('input', initTyping);

// // function nextText() {
// //     randomParagraph();
// // }