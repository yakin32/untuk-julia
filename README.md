# 💌 Website Kartu Ucapan Permintaan Maaf & Galeri Kenangan Pasangan

Website romantis dan interaktif khusus untuk menyampaikan permintaan maaf yang tulus kepada pasangan tercinta, lengkap dengan amplop interaktif, surat penuh ketulusan, tombol interaktif lucu, efek musik latar romantis, dan galeri foto bergaya polaroid.

---

## 🌟 Fitur Utama Website

1. **Amplop Surat Interaktif (`index.html`)**:
   - Amplop dengan segel hati yang bisa diklik untuk membuka surat.
   - Efek transisi halus dan hujan konfeti saat amplop terbuka.

2. **Surat Permintaan Maaf Penuh Ketulusan**:
   - Kalimat permintaan maaf yang menyentuh hati dan tulus.
   - Bagian **"Janji Kecilku Untukmu"** untuk menunjukkan komitmen dan keseriusanmu.

3. **Tombol Keputusan Interaktif & Lucu**:
   - Tombol **"Iya, aku maafin ❤️"**: Memunculkan ledakan konfeti, pesan terima kasih yang manis, dan ajakan untuk melihat galeri foto bersama.
   - Tombol **"Nggak mau 😜"**: Tombol ini akan **otomatis kabur/menghindar** saat kursor atau jari mendekat, disertai kutipan-kutipan rayuan lucu seperti:
     - *"Eits, gak bisa diklik 😜"*
     - *"Jangan marah lagi dong sayang 🥺"*
     - *"Kalo kamu klik 'Iya', aku traktir makanan kesukaanmu! 🍕🧋"*

4. **Galeri Kenangan Manis Bergaya Polaroid (`gallery.html`)**:
   - Tampilan foto bergaya scrapbook/polaroid dengan isolasi washi tape dan sudut miring yang estetik.
   - Filter kategori: *Semua Foto*, *Momen Manis*, *Kencan & Jalan*, *Konyol & Lucu*.
   - Fitur **Like ❤️** interaktif dengan animasi hati bertaburan.
   - Fitur **Lightbox Zoom**: Klik foto untuk melihat versi resolusi penuh beserta cerita di balik foto tersebut.
   - **Upload Foto Langsung**: Pasangan atau kamu bisa langsung klik tombol *"Unggah Foto Kamu"* untuk menambahkan foto dari HP/laptop tanpa perlu edit coding!

5. **Audio & Animasi Latar Romantis**:
   - Partikel hati melayang (*floating hearts*) di latar belakang.
   - Suara instrumen piano/lullaby lembut otomatis menggunakan Web Audio API (tidak butuh file MP3 eksternal dan bisa berputar langsung di browser manapun tanpa error).
   - Tombol on/off musik yang bisa dinyalakan atau dimatikan kapan saja.

---

## 🚀 Cara Menjalankan Website

1. Buka folder:
   ```
   C:\Users\infin\.gemini\antigravity\scratch\apology-card-website\
   ```
2. Klik dua kali (**Double-click**) file **`index.html`** untuk membuka kartu ucapan di browser (Google Chrome, Edge, Safari, dll.).
3. Klik tombol **"Galeri Foto Kita 📸"** untuk berpindah ke halaman kumpulan foto.

---

## ✏️ Cara Mengubah Nama, Teks Surat, & Foto

Kamu hanya perlu membuka dan mengedit file **`config.js`** menggunakan Notepad atau teks editor favoritmu:

1. **Ubah Nama Pacar & Nama Kamu**:
   ```javascript
   partnerName: "Nama Panggilan Pacarmu",
   senderName: "Nama Kamu",
   ```

2. **Ubah Isi Surat**:
   Buka bagian `paragraphs` di `config.js` dan sesuaikan dengan isi hatimu sendiri.

3. **Ganti Foto Galeri**:
   - Kamu bisa menaruh foto-foto kenanganmu di dalam folder `images/` (contoh: `images/foto1.jpg`, `images/foto2.jpg`).
   - Lalu pada file `config.js`, ubah bagian `image`:
     ```javascript
     {
         id: 1,
         title: "Foto Pertama Kita",
         caption: "Waktu kita jalan pertama kali di mall...",
         date: "14 Februari 2024",
         category: "sweet",
         image: "images/foto1.jpg",
         likes: 10
     }
     ```
   - Atau kamu juga bisa langsung upload foto saat website sedang dibuka di browser melalui tombol **"Unggah Foto Kamu"** di halaman galeri!

---

*Dibuat khusus dengan cinta agar si dia cepat luluh dan tersenyum kembali! 🥰❤️*
