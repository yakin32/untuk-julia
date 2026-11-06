// ==========================================================================
// PHOTO GALLERY INTERACTIVE JAVASCRIPT
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    initGallery();
    initFilters();
    initLightbox();
    initLocalUpload();
    initGalleryHearts();
});

let currentPhotos = [];

function initGallery() {
    const grid = document.getElementById("polaroidGrid");
    if (!grid) return;

    // Load from CONFIG, plus any saved photos in localStorage
    currentPhotos = (typeof CONFIG !== "undefined" && CONFIG.photos) ? [...CONFIG.photos] : [];
    
    const savedCustomPhotos = localStorage.getItem("custom_apology_photos");
    if (savedCustomPhotos) {
        try {
            const parsed = JSON.parse(savedCustomPhotos);
            currentPhotos = [...currentPhotos, ...parsed];
        } catch (e) {
            console.error("Failed to parse saved photos", e);
        }
    }

    renderPhotos(currentPhotos);
}

function renderPhotos(photoList) {
    const grid = document.getElementById("polaroidGrid");
    if (!grid) return;

    grid.innerHTML = "";

    if (photoList.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
            Belum ada foto dalam kategori ini 🥺
        </div>`;
        return;
    }

    photoList.forEach(photo => {
        const card = document.createElement("div");
        card.className = "polaroid-card";
        card.setAttribute("data-category", photo.category || "sweet");

        card.innerHTML = `
            <div class="polaroid-img-wrapper" onclick="openLightbox(${photo.id})">
                <img src="${photo.image}" alt="${photo.title}" class="polaroid-img" loading="lazy">
                <span class="polaroid-date-badge">${photo.date || 'Kenangan Indah'}</span>
            </div>
            <div class="polaroid-content">
                <h3 class="polaroid-title" onclick="openLightbox(${photo.id})">${photo.title}</h3>
                <p class="polaroid-caption">${photo.caption}</p>
                <div class="polaroid-footer">
                    <span style="color: #999;">Tap foto untuk zoom</span>
                    <button class="like-btn" onclick="toggleLike(event, this, ${photo.id})">
                        <span>❤️</span> <span class="like-count">${photo.likes || 1}</span>
                    </button>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

// Filter Tabs
function initFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");
            if (filterValue === "all") {
                renderPhotos(currentPhotos);
            } else {
                const filtered = currentPhotos.filter(p => p.category === filterValue);
                renderPhotos(filtered);
            }
        });
    });
}

// Lightbox Modal
let activePhoto = null;

function initLightbox() {
    const lightbox = document.getElementById("lightboxModal");
    const closeBtn = document.getElementById("lightboxClose");

    if (closeBtn && lightbox) {
        closeBtn.addEventListener("click", () => {
            lightbox.classList.remove("active");
        });

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove("active");
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && lightbox.classList.contains("active")) {
                lightbox.classList.remove("active");
            }
        });
    }
}

window.openLightbox = function(id) {
    const photo = currentPhotos.find(p => p.id === id);
    if (!photo) return;

    activePhoto = photo;
    const lightbox = document.getElementById("lightboxModal");
    const img = document.getElementById("lightboxImg");
    const title = document.getElementById("lightboxTitle");
    const caption = document.getElementById("lightboxCaption");

    if (lightbox && img && title && caption) {
        img.src = photo.image;
        title.textContent = photo.title;
        caption.textContent = photo.caption;
        lightbox.classList.add("active");
    }
};

// Like button with burst animation
window.toggleLike = function(event, btn, id) {
    event.stopPropagation();
    const countSpan = btn.querySelector(".like-count");
    let currentLikes = parseInt(countSpan.textContent, 10);

    if (!btn.classList.contains("liked")) {
        btn.classList.add("liked");
        countSpan.textContent = currentLikes + 1;
        createHeartBurst(event.clientX, event.clientY);
    } else {
        btn.classList.remove("liked");
        countSpan.textContent = Math.max(0, currentLikes - 1);
    }
};

function createHeartBurst(x, y) {
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement("div");
        heart.textContent = "💖";
        heart.style.position = "fixed";
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        heart.style.fontSize = `${Math.random() * 14 + 14}px`;
        heart.style.pointerEvents = "none";
        heart.style.zIndex = "9999";
        heart.style.transition = "transform 0.8s ease-out, opacity 0.8s ease-out";
        document.body.appendChild(heart);

        const destX = (Math.random() - 0.5) * 80;
        const destY = -Math.random() * 80 - 20;

        setTimeout(() => {
            heart.style.transform = `translate(${destX}px, ${destY}px) scale(1.3)`;
            heart.style.opacity = "0";
        }, 20);

        setTimeout(() => {
            heart.remove();
        }, 850);
    }
}

// Local File Upload: Add new custom photo directly in browser
function initLocalUpload() {
    const fileInput = document.getElementById("fileInput");
    if (!fileInput) return;

    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(event) {
            const newPhoto = {
                id: Date.now(),
                title: "Momen Spesial Kita",
                caption: "Foto kenangan baru yang kamu tambahkan. Setiap momen bersamamu selalu istimewa.",
                date: "Baru Saja",
                category: "sweet",
                image: event.target.result,
                likes: 1
            };

            currentPhotos.unshift(newPhoto);

            // Persist custom uploaded photos to localStorage
            const saved = localStorage.getItem("custom_apology_photos");
            let list = saved ? JSON.parse(saved) : [];
            list.unshift(newPhoto);
            localStorage.setItem("custom_apology_photos", JSON.stringify(list));

            renderPhotos(currentPhotos);
            createHeartBurst(window.innerWidth / 2, window.innerHeight / 2);
            alert("Foto kenangan berhasil ditambahkan ke galeri! ✨📸");
        };

        reader.readAsDataURL(file);
    });
}

// Floating hearts on gallery page too
function initGalleryHearts() {
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
    const colors = ["#ff4b72", "#ff758f", "#ff8fa3", "#ffccd5"];

    for (let i = 0; i < 20; i++) {
        hearts.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 12 + 8,
            speedY: Math.random() * 0.7 + 0.3,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.35 + 0.1,
            angle: Math.random() * Math.PI * 2
        });
    }

    function draw(x, y, size, color, alpha) {
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

    function loop() {
        ctx.clearRect(0, 0, width, height);
        hearts.forEach(h => {
            h.y -= h.speedY;
            h.angle += 0.02;
            h.x += Math.sin(h.angle) * 0.5;

            if (h.y < -30) {
                h.y = height + 30;
                h.x = Math.random() * width;
            }

            draw(h.x, h.y, h.size, h.color, h.opacity);
        });
        requestAnimationFrame(loop);
    }
    loop();
}
