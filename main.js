

/* 
   0. AUTO PLAY AFTER LOGIN
*/

const audio = new Audio('song.mp3');
let isPlaying = false;

// login page signal
if (localStorage.getItem("playMusic") === "yes") {
    setTimeout(() => {
        audio.play().then(() => {
            isPlaying = true;
            const musicBtn = document.getElementById('musicBtn');
            if(musicBtn){
                musicBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
            }
        }).catch(()=>{});
    }, 800);

    localStorage.removeItem("playMusic");
}


/* 
   1. Typing Animation Logic
*/
const textElement = document.querySelector('.typing-text');

if(textElement){
    const textPhrases = [
        "I made this page just for you... 💫", 
        "Wishing you a day filled with love...", 
        "May your dreams come true! 🎂"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        const currentPhrase = textPhrases[phraseIndex];

        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } 
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % textPhrases.length;
            typeSpeed = 500;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    setTimeout(typeEffect, 1000);
}


/* 
   2. Scroll Reveal Animation
*/
const hiddenElements = document.querySelectorAll('.hidden');

if(hiddenElements.length){
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    hiddenElements.forEach((el) => observer.observe(el));
}


/* 
   3. Music Button Toggle
*/
const musicBtn = document.getElementById('musicBtn');

if(musicBtn){
    musicBtn.addEventListener('click', () => {

        if (!isPlaying) {
            audio.play().then(() => {
                musicBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Music';
                musicBtn.style.background = "rgba(255,255,255,0.8)";
                musicBtn.style.color = "#333";
                isPlaying = true;
            }).catch(()=>{});
        } 
        else {
            audio.pause();
            musicBtn.innerHTML = '<i class="fas fa-music"></i> Play Music';
            musicBtn.style.background = "rgba(0,0,0,0.3)";
            musicBtn.style.color = "#fff";
            isPlaying = false;
        }
    });
}


/* 
   4. Surprise + Confetti
*/
const surpriseBtn = document.getElementById('surpriseBtn');
const finalMessage = document.getElementById('finalMessage');
const confettiContainer = document.getElementById('confetti-container');

if(surpriseBtn){
    surpriseBtn.addEventListener('click', () => {

        finalMessage.style.display = 'block';
        surpriseBtn.style.display = 'none';
        createConfetti();
    });
}

function createConfetti() {

    if(!confettiContainer) return;

    const colors = ['#ff6b6b','#feca57','#48dbfb','#ff9ff3','#54a0ff','#ff9f43'];

    for (let i = 0; i < 100; i++) {

        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-100px';
        confetti.style.opacity = Math.random();

        const size = Math.random() * 10 + 5 + 'px';
        confetti.style.width = size;
        confetti.style.height = size;

        const animDuration = Math.random() * 4 + 4;
        confetti.style.animation = `fall ${animDuration}s linear forwards`;

        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 9000);
}

// Funny moving button
const runBtn=document.getElementById("runBtn");

if(runBtn){
    runBtn.addEventListener("mouseover",()=>{

        const maxX = window.innerWidth - runBtn.offsetWidth - 40;
        const maxY = window.innerHeight - runBtn.offsetHeight - 40;

        const x = Math.random()*maxX;
        const y = Math.random()*maxY;

        runBtn.style.position="fixed";
        runBtn.style.left=x+"px";
        runBtn.style.top=y+"px";
    });
}
const goodBtn = document.getElementById("goodBtn");
const endingMessage = document.getElementById("endingMessage");

if(goodBtn){
    goodBtn.addEventListener("click", ()=>{
        endingMessage.classList.add("show");
    });
}