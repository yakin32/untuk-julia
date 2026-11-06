// ==========================================================================
// APOLOGY CARD INTERACTIVE JAVASCRIPT
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    initContentFromConfig();
    initEnvelope();
    initInteractiveButtons();
    initFloatingHearts();
    initAudioPlayer();
});

// 1. Populate text and promises from config.js
function initContentFromConfig() {
    if (typeof CONFIG === "undefined") return;

    // Brand and envelope
    const brandElement = document.getElementById("brandName");
    if (brandElement) brandElement.textContent = `Untuk ${CONFIG.partnerName} ❤️`;

    const envTitle = document.getElementById("envelopeTitle");
    if (envTitle) envTitle.textContent = CONFIG.envelopeTitle;

    const envSubtitle = document.getElementById("envelopeSubtitle");
    if (envSubtitle) envSubtitle.textContent = CONFIG.envelopeSubtitle;

    // Apology letter
    const letterGreeting = document.getElementById("letterGreeting");
    if (letterGreeting) letterGreeting.textContent = `${CONFIG.letter.greeting} ${CONFIG.partnerName},`;

    const paragraphsContainer = document.getElementById("letterParagraphs");
    if (paragraphsContainer && CONFIG.letter.paragraphs) {
        paragraphsContainer.innerHTML = CONFIG.letter.paragraphs
            .map(p => `<p>${p}</p>`)
            .join("");
    }

    // Promises
    const promisesTitle = document.getElementById("promisesTitle");
    if (promisesTitle) promisesTitle.innerHTML = `<span>✨</span> ${CONFIG.letter.promisesTitle}`;

    const promisesList = document.getElementById("promisesList");
    if (promisesList && CONFIG.letter.promises) {
        promisesList.innerHTML = CONFIG.letter.promises
            .map(item => `<li>${item}</li>`)
            .join("");
    }

    const letterSignature = document.getElementById("letterSignature");
    if (letterSignature) {
        letterSignature.innerHTML = `${CONFIG.letter.closing}<br><span style="font-size: 1.3rem; color: var(--text-dark);">${CONFIG.senderName}</span>`;
    }

    const decisionQuestion = document.getElementById("decisionQuestion");
    if (decisionQuestion) decisionQuestion.textContent = CONFIG.letter.question;

    // Modal success
    const modalTitle = document.getElementById("modalTitle");
    if (modalTitle) modalTitle.textContent = CONFIG.acceptedMessage.title;

    const modalText = document.getElementById("modalText");
    if (modalText) modalText.textContent = CONFIG.acceptedMessage.text;

    const modalBtn = document.getElementById("modalGalleryBtn");
    if (modalBtn) modalBtn.textContent = CONFIG.acceptedMessage.buttonText;
}

// 2. Envelope Opening Transition
function initEnvelope() {
    const envelopeWrapper = document.getElementById("envelopeWrapper");
    const letterWrapper = document.getElementById("letterWrapper");

    if (!envelopeWrapper || !letterWrapper) return;

    envelopeWrapper.addEventListener("click", () => {
        // Start romantic ambient audio on first interaction
        startAudioPlayback();

        // Animate envelope fade out
        envelopeWrapper.style.transform = "scale(0.8) translateY(-20px)";
        envelopeWrapper.style.opacity = "0";

        setTimeout(() => {
            envelopeWrapper.classList.add("hidden");
            letterWrapper.style.display = "block";

            // Trigger reflow & fade in
            setTimeout(() => {
                letterWrapper.classList.add("visible");
                triggerConfetti(50);
            }, 50);
        }, 300);
    });
}

// 3. Dodging 'Nggak Mau' button and 'Iya' button
function initInteractiveButtons() {
    const btnYes = document.getElementById("btnYes");
    const btnNo = document.getElementById("btnNo");
    const modal = document.getElementById("successModal");
    const toast = document.getElementById("toastQuote");

    if (!btnYes || !btnNo) return;

    let quoteIndex = 0;
    const quotes = CONFIG.rejectedQuotes || [
        "Eits gak bisa diklik 😜",
        "Jangan marah lagi dong 🥺",
        "Maafin yaa plisss? 🙏❤️"
    ];

    function showToast(text) {
        if (!toast) return;
        toast.textContent = text;
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
    }

    // Dodging function for "Nggak" button
    function dodgeButton() {
        const maxX = window.innerWidth - btnNo.offsetWidth - 30;
        const maxY = window.innerHeight - btnNo.offsetHeight - 30;

        const randomX = Math.max(20, Math.floor(Math.random() * maxX));
        const randomY = Math.max(60, Math.floor(Math.random() * maxY));

        btnNo.style.position = "fixed";
        btnNo.style.left = `${randomX}px`;
        btnNo.style.top = `${randomY}px`;
        btnNo.style.zIndex = "999";

        // Show playful quote
        const currentQuote = quotes[quoteIndex % quotes.length];
        showToast(currentQuote);
        quoteIndex++;

        // Grow 'Yes' button slightly to encourage acceptance!
        const currentScale = parseFloat(btnYes.getAttribute("data-scale") || "1");
        const newScale = Math.min(currentScale + 0.08, 1.45);
        btnYes.setAttribute("data-scale", newScale);
        btnYes.style.transform = `scale(${newScale})`;
    }

    // Dodge on mouse hover / mobile touch
    btnNo.addEventListener("mouseenter", dodgeButton);
    btnNo.addEventListener("touchstart", (e) => {
        e.preventDefault();
        dodgeButton();
    });

    btnNo.addEventListener("click", (e) => {
        e.preventDefault();
        dodgeButton();
    });

    // "Iya" clicked -> Confetti explosion and Modal
    btnYes.addEventListener("click", () => {
        triggerConfetti(150);
        if (modal) {
            modal.classList.add("active");
        }
    });
}

// 4. Custom Confetti Generator (Canvas)
function triggerConfetti(particleCount = 100) {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#ff4b72", "#ff758f", "#ffb703", "#70d6ff", "#ffd166", "#c9184a", "#fff"];
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 18,
            vy: (Math.random() - 0.7) * 20,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 12,
            opacity: 1
        });
    }

    let frame = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.35; // gravity
            p.vx *= 0.98; // drag
            p.rotation += p.rotationSpeed;
            p.opacity -= 0.008;

            if (p.opacity > 0) {
                alive = true;
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.globalAlpha = Math.max(0, p.opacity);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
                ctx.restore();
            }
        });

        frame++;
        if (alive && frame < 200) {
            requestAnimationFrame(animate);
        } else {
            canvas.remove();
        }
    }
    animate();
}

// 5. Floating Hearts Background Animation
function initFloatingHearts() {
    const canvas = document.getElementById("heartsCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const hearts = [];
    const heartColors = ["#ff4b72", "#ff758f", "#ff8fa3", "#ffccd5"];

    for (let i = 0; i < 28; i++) {
        hearts.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 14 + 10,
            speedY: Math.random() * 0.8 + 0.4,
            speedX: Math.sin(Math.random() * Math.PI) * 0.5,
            color: heartColors[Math.floor(Math.random() * heartColors.length)],
            opacity: Math.random() * 0.4 + 0.15,
            angle: Math.random() * Math.PI * 2
        });
    }

    function drawHeart(x, y, size, color, alpha) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(size / 30, size / 30);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-15, -15, -25, 5, 0, 25);
        ctx.bezierCurveTo(25, 5, 15, -15, 0, 0);
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.restore();
    }

    function animateHearts() {
        ctx.clearRect(0, 0, width, height);

        hearts.forEach(h => {
            h.y -= h.speedY;
            h.angle += 0.02;
            h.x += Math.sin(h.angle) * 0.6;

            if (h.y < -30) {
                h.y = height + 30;
                h.x = Math.random() * width;
            }

            drawHeart(h.x, h.y, h.size, h.color, h.opacity);
        });

        requestAnimationFrame(animateHearts);
    }
    animateHearts();
}

// 6. Ambient Romantic Audio Engine (Procedural Piano / Lullaby using Web Audio API)
let audioCtx = null;
let isAudioPlaying = false;
let audioInterval = null;

function initAudioPlayer() {
    const toggleBtn = document.getElementById("musicToggle");
    if (!toggleBtn) return;

    toggleBtn.addEventListener("click", () => {
        if (isAudioPlaying) {
            pauseAudioPlayback();
        } else {
            startAudioPlayback();
        }
    });
}

function startAudioPlayback() {
    const toggleBtn = document.getElementById("musicToggle");
    if (isAudioPlaying) return;

    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtx) {
            audioCtx = new AudioContext();
        }
        if (audioCtx.state === "suspended") {
            audioCtx.resume();
        }

        isAudioPlaying = true;
        if (toggleBtn) {
            toggleBtn.classList.remove("paused");
            toggleBtn.querySelector(".music-text").textContent = "Musik: Aktif 🎵";
        }

        // Romantic soothing piano chord progression (Cmaj7 - Am7 - Fmaj7 - G7)
        const notes = [
            // Cmaj7
            [261.63, 329.63, 392.00, 493.88],
            // Am7
            [220.00, 261.63, 329.63, 392.00],
            // Fmaj7
            [174.61, 220.00, 261.63, 329.63],
            // G (sus / add9)
            [196.00, 246.94, 293.66, 392.00]
        ];

        let chordStep = 0;
        function playChord() {
            if (!isAudioPlaying || !audioCtx) return;
            const currentChord = notes[chordStep % notes.length];
            chordStep++;

            currentChord.forEach((freq, idx) => {
                setTimeout(() => {
                    if (!isAudioPlaying || !audioCtx) return;
                    playTone(freq, 2.8);
                }, idx * 160);
            });
        }

        playChord();
        audioInterval = setInterval(playChord, 3200);
    } catch (e) {
        console.log("Audio autoplay prevented or unsupported:", e);
    }
}

function playTone(frequency, duration) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);

    // Soft attack and decay for a soothing piano/bell feel
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function pauseAudioPlayback() {
    isAudioPlaying = false;
    if (audioInterval) clearInterval(audioInterval);
    if (audioCtx && audioCtx.state === "running") {
        audioCtx.suspend();
    }
    const toggleBtn = document.getElementById("musicToggle");
    if (toggleBtn) {
        toggleBtn.classList.add("paused");
        toggleBtn.querySelector(".music-text").textContent = "Musik: Hening 🔇";
    }
}
