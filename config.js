// =====================================================================
// KONFIGURASI WEBSITE KARTU MAAF & GALERI FOTO
// Kamu bisa mengubah nama, tulisan, dan foto-foto di bawah ini dengan mudah!
// =====================================================================

const CONFIG = {
    // Nama panggilan pacar kamu
    partnerName: "Sayangku",
    
    // Nama kamu
    senderName: "Dari yang selalu sayang kamu",

    // Judul di amplop
    envelopeTitle: "Ada Surat Spesial Untukmu 💌",
    envelopeSubtitle: "Sentuh / Klik amplop untuk membuka...",

    // Isi Surat Permintaan Maaf
    letter: {
        greeting: "Hai Sayang,",
        paragraphs: [
            "Sebelumnya, aku mau minta maaf yang setulus-tulusnya dari lubuk hatiku yang terdalam. Aku tahu sikap atau kata-kataku hari ini mungkin udah bikin kamu kecewa, sedih, atau merasa nggak dihargai.",
            "Nggak pernah ada sedikitpun niat di hatiku buat menyakiti perasaan kamu. Kadang aku ceroboh, egois, dan kurang peka sama perasaanmu. Tapi yang harus kamu tahu, kamu adalah orang yang paling berharga dalam hidupku.",
            "Aku sadar aku masih punya banyak kekurangan, tapi aku bener-bener mau belajar jadi pasangan yang lebih baik lagi buat kamu. Terima kasih udah selalu sabar menghadapi aku selama ini."
        ],
        promisesTitle: "Janji Kecilku Untukmu ✨",
        promises: [
            "Lebih banyak mendengarkan daripada membantah",
            "Nggak akan mengulang kesalahan yang sama lagi",
            "Selalu berusaha mengerti perasaan dan suasana hatimu",
            "Makin sayang dan perhatian setiap harinya"
        ],
        closing: "Dengan segenap cintaku,",
        question: "Kamu mau maafin aku kan? 🥺"
    },

    // Respon saat dimaafkan
    acceptedMessage: {
        title: "Yeay! Makasih Banyak Sayang! 🥰❤️",
        text: "Janji aku bakal jaga kepercayaan kamu dan bikin kamu tersenyum terus! Sekarang, yuk kita lihat kenangan-kenangan manis kita berdua...",
        buttonText: "Buka Galeri Kenangan Kita 📸"
    },

    // Kata-kata lucu saat tombol 'Nggak' dihindari / diklik
    rejectedQuotes: [
        "Eits, gak bisa diklik 😜",
        "Jangan marah lagi dong sayang 🥺",
        "Maafin yaa plisss? 🙏❤️",
        "Tombol ini lagi mogok kerja 😝",
        "Aku nggak bakal nyerah minta maaf! 🥺",
        "Sayangku yang paling cantik/ganteng, dimaafin ya? ✨",
        "Yaudah coba klik lagi kalau bisa 😝",
        "Kalo kamu klik 'Iya', aku traktir makanan kesukaanmu! 🍕🧋"
    ],

    // Daftar foto di Galeri
    photos: [
        {
            id: 1,
            title: "Awal Cerita Kita",
            caption: "Hari pertama kita jalan bareng. Senyummu hari itu sampai sekarang masih jadi pemandangan favoritku.",
            date: "First Date",
            category: "sweet",
            // Ganti URL ini dengan path fotomu, misalnya: "images/foto1.jpg"
            image: "./firstdate.jpg",
            likes: 1000
        },
        {
            id: 2,
            title: "aku suka foto kamu yang ini",
            caption: "pas kamu ngirim foto ini ke akuu akuu gak bisa berkata-kata sayang,kamu terlalu cantik.",
            date: "kamu cantik banget",
            category: "funny",
            image: "./lucuu.jpg",
            likes: 2400
        },
        {
            id: 3,
            title: "gemes",
            caption: "Matahari terbenam memang indah, tapi bagiku pemandangan paling memesona tetap ada di matamu.",
            date: "Jalan Sore",
            category: "dates",
            image: "./gemew.jpg",
            likes: 3000
        },
        {
            id: 4,
            title: "Momen Manis Tak Terlupakan",
            caption: "Setiap langkah bersamamu rasanya selalu penuh warna dan kehangatan. Jangan biarkan ego merusaknya yaa.",
            date: "Trip Bersama",
            category: "sweet",
            image: "./manis.jpg",
            likes: 1800
        },
        {
            id: 5,
            title: "Konyol Tapi Gemes",
            caption: "Wajah cemberut kamu aja lucu banget, apalagi kalau lagi senyum bahagia. Senyum lagi dong sayang...",
            date: "Foto Candid",
            category: "funny",
            image: "./funny.jpg",
            likes: 10000
        },
        {
            id: 6,
            title: "wleee",
            caption: "barang kali kamu kangen sama aku.",
            date: "aku",
            category: "dates",
            image: "./wlee.jpg",
            likes: 990
        }
    ]
};
