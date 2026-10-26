# 🎉 Interactive Birthday Greeting & Celebration Web App
> **Modern, Lightweight, & Engaging Digital Celebration Journey**

Aplikasi web kartu ucapan ulang tahun interaktif yang dirancang dengan estetika visual modern, animasi dinamis, serta alur pengalaman bertahap (*step-by-step journey*) untuk merayakan momen spesial sahabat maupun orang tersayang.

---

## ✨ Fitur Utama (*Key Features*)

1. **🎨 Estetika Visual Modern & Responsif:**
   - Palet warna lembut dan harmonis (*Pastel Sky Blue*, *Warm Cream*, *Soft Yellow*, *Gentle Pink*, dan *Deep Midnight Navy*).
   - Karakter maskot tematik bernuansa santun dan hangat dengan balon serta ornamen melayang halus.
   - Responsif dan optimal diakses melalui layar smartphone, tablet, maupun desktop.

2. **🎁 Alur Interaktif Bertahap (*5-Step Celebration Flow*):**
   - **Screen 1 (Welcome & Anticipation):** Halaman pembuka yang ramah dengan tombol eksplorasi kejutan.
   - **Screen 2 (Interactive Birthday Cake & Candles):** Kue ulang tahun interaktif dengan lilin menyala. Pengunjung dapat mematikan lilin satu per satu atau sekaligus (*Tiup Lilin*) yang memicu ledakan konfeti selebrasi.
   - **Screen 3 (Digital Keepsake Card):** Kartu ucapan bergaya surat pos autentik dengan stempel pos, pesan persahabatan, dan harapan hangat.
   - **Screen 4 (Interactive Prayer & Wish Envelopes):** Tiga amplop tematik (*Masa Depan*, *Kebahagiaan*, dan *Perjalanan*) yang dapat diklik untuk membuka doa dan pesan penyemangat.
   - **Screen 5 (Celebration Finale):** Interaksi akhir dengan fitur lempar pelukan/tos virtual, pemicu konfeti tanpa batas, pesan motivasi acak, dan opsi putar ulang.

3. **🌓 Dukungan Tema Ganda (Light ☀️ / Dark Mode 🌙):**
   - Pilihan mode terang bernuansa pastel cerah dan mode malam bernuansa tenang (*midnight sky*).
   - Dilengkapi persistensi status tema menggunakan `localStorage` browser.

4. **⚡ Performa Tinggi & Bebas Dependensi:**
   - Dibangun menggunakan **Vanilla HTML5, Modern CSS3, dan Vanilla JavaScript (ES6+)**.
   - Ringan, cepat dimuat, tanpa memerlukan proses *build* atau instalasi dependensi tambahan.

---

## 📁 Struktur Berkas (*Project Structure*)

```text
├── index.html       # Struktur antarmuka dan konten kartu ucapan
├── style.css        # Desain visual, sistem tema, tipografi, dan animasi CSS
├── script.js        # Logika interaktivitas, kontrol animasi lilin, audio, dan konfeti
├── favicon.svg      # Ikon web kustom SVG
└── README.md        # Dokumentasi proyek
```

---

## 💻 Cara Menjalankan Secara Lokal (*Local Development*)

Proyek ini tidak memerlukan instalasi Node.js atau server khusus:

1. Unduh (*clone* / *download*) repositori ini.
2. Buka berkas `index.html` menggunakan peramban web modern favorit Anda (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
3. Halaman web siap dinikmati!

---

## 🌐 Panduan Deployment ke GitHub Pages

Untuk mempublikasikan website ini secara daring dan gratis melalui GitHub Pages:

### Langkah 1: Buat Repositori di GitHub
1. Masuk ke akun [GitHub](https://github.com/).
2. Buat repositori baru dengan menekan tombol **New** (beri nama misalnya: `kartu-ucapan-ulang-tahun` atau `birthday-celebration`).
3. Pilih visibilitas **Public** (agar GitHub Pages dapat diakses secara gratis).
4. Jangan centang "Add a README file" (karena berkas README sudah tersedia di lokal).

### Langkah 2: Push Kode dari Komputer ke GitHub
Jalankan perintah berikut di terminal / command prompt pada folder proyek:

```bash
# Inisialisasi git (jika belum)
git init

# Tambahkan semua berkas ke staging area
git add .

# Buat commit perdana
git commit -m "feat: initial commit interactive birthday web app"

# Ubah branch utama menjadi main
git branch -M main

# Hubungkan repositori lokal dengan remote GitHub
git remote add origin https://github.com/<USERNAME-ANDA>/<NAMA-REPOSITORI>.git

# Unggah berkas ke GitHub
git push -u origin main
```

### Langkah 3: Aktifkan GitHub Pages
1. Buka halaman repositori Anda di GitHub.
2. Buka menu **Settings** > **Pages** (pada bilah navigasi samping kiri).
3. Pada bagian **Build and deployment** > **Source**, pilih **Deploy from a branch**.
4. Pada dropdown branch, pilih `main` dan folder `/(root)`.
5. Klik **Save**.
6. Dalam 1-2 menit, GitHub Pages akan menyediakan tautan publik aktif dengan format:
   `https://<username>.github.io/<nama-repositori>/`

---

## ⚙️ Kustomisasi Konten (*Customization*)

- **Pesan & Teks Kartu:** Sunting teks pada berkas `index.html` di dalam elemen `<article class="birthday-card-paper">`.
- **Daftar Doa & Amplop:** Sunting data array `wishesData` pada berkas `script.js`.
- **Warna & Palet Tema:** Sesuaikan variabel CSS pada bagian `:root` di berkas `style.css`.

---

## 📄 Lisensi

Proyek ini bersifat open-source dan bebas digunakan maupun dikembangkan untuk keperluan personal dan edukasi.
