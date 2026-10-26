/* ==========================================================================
   YAHYA'S BIRTHDAY ADVENTURE - JAVASCRIPT
   Interaktivitas, Animasi Confetti, Synthesizer Musik, dan Kotak Doa
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- STATE PETUALANGAN ---
  let currentStep = 1;
  const totalSteps = 5;
  let candlesBlown = { candle1: false, candle2: false, candle3: false };
  let isAudioPlaying = false;
  let audioContext = null;
  let melodyInterval = null;

  // --- ELEMEN DOM UTAMA ---
  const scenes = {
    1: document.getElementById('sectionWelcome'),
    2: document.getElementById('sectionCelebration'),
    3: document.getElementById('sectionCard'),
    4: document.getElementById('sectionWishes'),
    5: document.getElementById('sectionFinale')
  };

  const progressSteps = document.querySelectorAll('.progress-step');

  // Tombol Navigasi
  const btnOpenSurprise = document.getElementById('btnOpenSurprise');
  const btnGoToCard = document.getElementById('btnGoToCard');
  const btnBlowCandles = document.getElementById('btnBlowCandles');
  const btnBackToCelebration = document.getElementById('btnBackToCelebration');
  const btnGoToWishes = document.getElementById('btnGoToWishes');
  const btnBackToCard = document.getElementById('btnBackToCard');
  const btnGoToEnd = document.getElementById('btnGoToEnd');
  const btnRestartJourney = document.getElementById('btnRestartJourney');

  // Theme Toggle (Mode Terang & Gelap)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');

  // Kue & Lilin
  const candleElements = {
    candle1: document.getElementById('candle1'),
    candle2: document.getElementById('candle2'),
    candle3: document.getElementById('candle3')
  };
  const candleWishStatus = document.getElementById('candleWishStatus');

  // Modal Kotak Doa
  const wishModal = document.getElementById('wishModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalAamiinBtn = document.getElementById('modalAamiinBtn');
  const modalWishIcon = document.getElementById('modalWishIcon');
  const modalWishTitle = document.getElementById('modalWishTitle');
  const modalWishContent = document.getElementById('modalWishContent');
  const envelopeItems = document.querySelectorAll('.envelope-item');

  // Goodies Penutup
  const btnConfettiBoom = document.getElementById('btnConfettiBoom');
  const btnVirtualHug = document.getElementById('btnVirtualHug');
  const btnRandomCompliment = document.getElementById('btnRandomCompliment');
  const complimentDisplay = document.getElementById('complimentDisplay');
  const toastNotification = document.getElementById('toastNotification');

  // ==========================================================================
  // DATA DOA UNTUK KOTAK HARAPAN (BAGIAN D)
  // ==========================================================================
  const wishesData = {
    future: {
      icon: '🚀',
      title: 'Doa untuk Masa Depan Yahya',
      html: `
        <p><strong>Bismillah, untuk setiap langkah masa depanmu:</strong></p>
        <p>Semoga Allah lapangkan jalanmu dalam mengejar cita-cita dan impian besarmu. Apapun bidang yang sedang dan akan kamu tekuni, semoga kamu menjadi orang yang ahli, bermanfaat, dan penuh keberkahan.</p>
        <p>Semoga rezeki yang halal, luas, dan barakah selalu mengalir untukmu serta keluargamu, dan setiap pintu peluang baik terbuka lebar untukmu. Aamiin!</p>
      `
    },
    happiness: {
      icon: '☀️',
      title: 'Doa untuk Kebahagiaan Yahya',
      html: `
        <p><strong>Untuk kedamaian hati dan senyumanmu:</strong></p>
        <p>Semoga hatimu senantiasa dipenuhi ketenangan, rasa syukur yang mendalam, dan kebahagiaan yang tulus dari hal-hal sederhana.</p>
        <p>Semoga kamu selalu dikelilingi orang-orang baik yang menyayangimu dengan tulus, serta dijauhkan dari rasa cemas dan kesedihan yang berlarut-larut. Tetaplah tersenyum ceria, Yahya!</p>
      `
    },
    journey: {
      icon: '🌱',
      title: 'Doa untuk Perjalanan Yahya',
      html: `
        <p><strong>Untuk setiap proses dan perjuanganmu:</strong></p>
        <p>Hidup adalah perjalanan yang panjang. Semoga dalam setiap fase proses bertumbuh ini, kamu diberikan pundak yang kuat, kesabaran yang lapang, dan kebijaksanaan dalam setiap pilihan.</p>
        <p>Ingat, kamu tidak berjalan sendirian. Sebagai sahabat, aku selalu ikut bangga melihat usahamu. Teruslah melangkah dengan penuh keyakinan!</p>
      `
    }
  };

  // Kumpulan Kata Semangat Acak
  const complimentsList = [
    "“Yahya adalah tipe sahabat yang kehadirannya selalu membawa energi positif!” ⭐",
    "“Terima kasih sudah selalu jadi teman yang setia kawan dan bisa diandalkan!” 🤝",
    "“Dunia butuh lebih banyak orang hebat dan tulus seperti kamu, Yahya!” 🌍✨",
    "“Langkah kecil yang konsisten akan membawamu ke puncak impian besarmu!” 🏔️",
    "“Apapun yang sedang kamu perjuangkan hari ini, semoga berbuah manis!” 🍯🎈",
    "“Jangan lupa istirahat yang cukup ya, kamu berharga banget!” 🛋️🍵"
  ];

  // ==========================================================================
  // FUNGSI NAVIGASI HALAMAN (SCENE TRANSITION)
  // ==========================================================================
  function goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > totalSteps) return;

    // Sembunyikan scene aktif sebelumnya
    if (scenes[currentStep]) {
      scenes[currentStep].classList.remove('active');
    }

    currentStep = stepNumber;

    // Tampilkan scene baru
    if (scenes[currentStep]) {
      scenes[currentStep].classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update indikator progress bar
    progressSteps.forEach((stepEl, idx) => {
      const stepIdx = idx + 1;
      stepEl.classList.remove('active', 'completed');
      if (stepIdx === currentStep) {
        stepEl.classList.add('active');
      } else if (stepIdx < currentStep) {
        stepEl.classList.add('completed');
      }
    });

    playChimeSound(520 + stepNumber * 60, 0.15);
  }

  // Klik langsung nomor langkah pada progress bar
  progressSteps.forEach(stepEl => {
    stepEl.addEventListener('click', () => {
      const targetStep = parseInt(stepEl.getAttribute('data-step'), 10);
      goToStep(targetStep);
    });
  });

  // ==========================================================================
  // EFEK CONFETTI & PERAYAAN
  // ==========================================================================
  function launchConfetti(type = 'default') {
    if (typeof confetti !== 'function') return;

    if (type === 'cannon') {
      // Ledakan ganda dari kiri & kanan layar
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { x: 0.1, y: 0.6 },
        colors: ['#A8D8F0', '#FFE69A', '#FFD6E0', '#DCD6FF']
      });
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { x: 0.9, y: 0.6 },
        colors: ['#A8D8F0', '#FFE69A', '#FFD6E0', '#DCD6FF']
      });
    } else if (type === 'shower') {
      // Hujan warna-warni ceria
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.4 },
        colors: ['#FFB4C4', '#FFE69A', '#A8D8F0', '#DCD6FF', '#FF6B8B']
      });
    } else {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FFD6E0', '#FFE69A', '#A8D8F0']
      });
    }
  }

  // ==========================================================================
  // TOAST NOTIFIKASI
  // ==========================================================================
  let toastTimer = null;
  function showToast(message) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3200);
  }

  // ==========================================================================
  // AUDIO SYNTHESIZER: MELODI "MABRUK ALFA MABRUK" (KHAS SANTRI PONDOK)
  // ==========================================================================
  function getAudioContext() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioContext = new AudioCtx();
      }
    }
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
    return audioContext;
  }

  // Denting instrumen gambus & chime halus
  function playChimeSound(freq = 523.25, duration = 0.3) {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      // Nada Utama
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle'; // Suara lebih hangat seperti petikan gambus/oud lembut
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.14, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      // Overtone Harmonis Lembut (Chime Glockenspiel)
      const oscHarmonic = ctx.createOscillator();
      const gainHarmonic = ctx.createGain();
      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(freq * 2, ctx.currentTime);

      gainHarmonic.gain.setValueAtTime(0.04, ctx.currentTime);
      gainHarmonic.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + duration * 0.7);

      oscHarmonic.connect(gainHarmonic);
      gainHarmonic.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
      oscHarmonic.start();
      oscHarmonic.stop(ctx.currentTime + duration * 0.7);
    } catch (e) {
      // Pencegahan error policy audio
    }
  }

  // Partitur Melodi "Mabruk Alfa Mabruk" (Selamat Ulang Tahun Khas Anak Pondok)
  // Mab-ruk al-fa mab-ruk... 'A-lai-ka mab-ruk...
  // Yaum mi-la-dik mab-ruk... Mab-ruk al-fa mab-ruk...
  // Se-la-mat ha-ri mi-lad... Se-mo-ga da-pat rah-mat...
  const mabrukNotes = [
    // --- Bagian 1: "Mab-ruk al-fa mab-ruk..." ---
    { freq: 392.00, dur: 0.28 }, // G4 (Mab-)
    { freq: 392.00, dur: 0.28 }, // G4 (-ruk)
    { freq: 523.25, dur: 0.35 }, // C5 (al-)
    { freq: 493.88, dur: 0.25 }, // B4 (-fa)
    { freq: 523.25, dur: 0.65 }, // C5 (mab-ruk)

    // --- Bagian 2: "'A-lai-ka mab-ruk..." ---
    { freq: 587.33, dur: 0.35 }, // D5 ('A-)
    { freq: 523.25, dur: 0.28 }, // C5 (-lai-)
    { freq: 493.88, dur: 0.28 }, // B4 (-ka)
    { freq: 440.00, dur: 0.35 }, // A4 (mab-)
    { freq: 392.00, dur: 0.70 }, // G4 (-ruk)

    // --- Bagian 3: "Yaum mi-la-dik mab-ruk..." ---
    { freq: 349.23, dur: 0.30 }, // F4 (Yaum)
    { freq: 440.00, dur: 0.30 }, // A4 (mi-)
    { freq: 523.25, dur: 0.35 }, // C5 (-la-)
    { freq: 493.88, dur: 0.28 }, // B4 (-dik)
    { freq: 440.00, dur: 0.32 }, // A4 (mab-)
    { freq: 392.00, dur: 0.65 }, // G4 (-ruk)

    // --- Bagian 4: "Mab-ruk al-fa mab-ruk..." ---
    { freq: 349.23, dur: 0.30 }, // F4 (Mab-)
    { freq: 329.63, dur: 0.30 }, // E4 (-ruk)
    { freq: 293.66, dur: 0.32 }, // D4 (al-)
    { freq: 329.63, dur: 0.32 }, // E4 (-fa)
    { freq: 261.63, dur: 0.85 }, // C4 (mab-ruk)

    // --- Bagian 5: "Se-la-mat ha-ri mi-lad..." ---
    { freq: 392.00, dur: 0.30 }, // G4 (Se-)
    { freq: 523.25, dur: 0.32 }, // C5 (-la-)
    { freq: 523.25, dur: 0.32 }, // C5 (-mat)
    { freq: 493.88, dur: 0.28 }, // B4 (ha-)
    { freq: 523.25, dur: 0.32 }, // C5 (-ri)
    { freq: 587.33, dur: 0.70 }, // D5 (mi-lad)

    // --- Bagian 6: "Se-mo-ga da-pat rah-mat..." ---
    { freq: 659.25, dur: 0.35 }, // E5 (Se-)
    { freq: 587.33, dur: 0.32 }, // D5 (-mo-)
    { freq: 523.25, dur: 0.32 }, // C5 (-ga)
    { freq: 493.88, dur: 0.28 }, // B4 (da-)
    { freq: 440.00, dur: 0.32 }, // A4 (-pat)
    { freq: 392.00, dur: 0.70 }, // G4 (rah-mat)

    // --- Bagian 7: "Da-ri Al-lah yang A-had..." ---
    { freq: 349.23, dur: 0.30 }, // F4 (Da-)
    { freq: 440.00, dur: 0.30 }, // A4 (-ri)
    { freq: 523.25, dur: 0.35 }, // C5 (Al-)
    { freq: 493.88, dur: 0.28 }, // B4 (-lah)
    { freq: 440.00, dur: 0.32 }, // A4 (yang)
    { freq: 392.00, dur: 0.65 }, // G4 (A-had)

    // --- Bagian 8: "Hing-ga hi-dup se-la-mat..." ---
    { freq: 349.23, dur: 0.30 }, // F4 (Hing-)
    { freq: 329.63, dur: 0.30 }, // E4 (-ga)
    { freq: 293.66, dur: 0.32 }, // D4 (hi-)
    { freq: 329.63, dur: 0.32 }, // E4 (-dup)
    { freq: 349.23, dur: 0.32 }, // F4 (se-)
    { freq: 329.63, dur: 0.32 }, // E4 (-la-)
    { freq: 261.63, dur: 1.10 }  // C4 (-mat)
  ];

  let currentNoteIdx = 0;

  function playNextMelodyNote() {
    if (!isAudioPlaying) return;
    const note = mabrukNotes[currentNoteIdx];
    playChimeSound(note.freq, note.dur);

    const delay = note.dur * 1000 + 100;
    currentNoteIdx = (currentNoteIdx + 1) % mabrukNotes.length;
    melodyInterval = setTimeout(playNextMelodyNote, delay);
  }

  // ==========================================================================
  // THEME TOGGLE: MODE TERANG & MODE GELAP (MALAM PESANTREN)
  // ==========================================================================
  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add('dark-mode');
      if (themeIcon) themeIcon.textContent = '☀️';
      if (themeText) themeText.textContent = 'Mode: Terang';
    } else {
      document.body.classList.remove('dark-mode');
      if (themeIcon) themeIcon.textContent = '🌙';
      if (themeText) themeText.textContent = 'Mode: Gelap';
    }
  }

  // Muat preferensi tema dari localStorage
  const savedTheme = localStorage.getItem('yahya_theme');
  if (savedTheme === 'dark') {
    applyTheme(true);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isCurrentlyDark = document.body.classList.contains('dark-mode');
      const nextIsDark = !isCurrentlyDark;
      applyTheme(nextIsDark);
      localStorage.setItem('yahya_theme', nextIsDark ? 'dark' : 'light');
      playChimeSound(nextIsDark ? 440 : 660, 0.2);

      if (nextIsDark) {
        showToast('🌙 Mode Malam Syahdu diaktifkan!');
      } else {
        showToast('☀️ Mode Terang Ceria diaktifkan!');
      }
    });
  }

  // ==========================================================================
  // EVENT LISTENER: BAGIAN A (WELCOME)
  // ==========================================================================
  btnOpenSurprise.addEventListener('click', () => {
    launchConfetti('default');
    playChimeSound(587, 0.25);
    setTimeout(() => {
      goToStep(2);
      launchConfetti('cannon');
    }, 350);
  });

  // ==========================================================================
  // EVENT LISTENER: BAGIAN B (CELEBRATION & KUE)
  // ==========================================================================
  function blowCandle(candleKey) {
    if (candlesBlown[candleKey]) return;
    candlesBlown[candleKey] = true;
    candleElements[candleKey].classList.add('blown-out');
    playChimeSound(700, 0.2);

    // Cek apakah semua lilin sudah padam
    const allBlown = Object.values(candlesBlown).every(v => v === true);
    if (allBlown) {
      candleWishStatus.innerHTML = '🎉 <strong>Semua lilin telah padam!</strong> Semoga doamu terkabul, Yahya! ✨';
      candleWishStatus.classList.add('wish-granted');
      launchConfetti('cannon');
      showToast('🎂 Lilin berhasil ditiup! Make a wish! 🌟');
    } else {
      candleWishStatus.textContent = 'Wah, satu lilin padam! Lanjut tiup sisanya! 💨';
    }
  }

  // Klik lilin secara individual
  Object.keys(candleElements).forEach(key => {
    candleElements[key].addEventListener('click', () => blowCandle(key));
  });

  // Tombol tiup semua lilin sekaligus
  btnBlowCandles.addEventListener('click', () => {
    Object.keys(candleElements).forEach(key => blowCandle(key));
  });

  btnGoToCard.addEventListener('click', () => {
    goToStep(3);
  });

  // ==========================================================================
  // EVENT LISTENER: BAGIAN C (KARTU UCAPAN)
  // ==========================================================================
  btnBackToCelebration.addEventListener('click', () => goToStep(2));
  btnGoToWishes.addEventListener('click', () => {
    goToStep(4);
    launchConfetti('default');
  });

  // ==========================================================================
  // EVENT LISTENER: BAGIAN D (KOTAK DOA & HARAPAN)
  // ==========================================================================
  btnBackToCard.addEventListener('click', () => goToStep(3));
  btnGoToEnd.addEventListener('click', () => {
    goToStep(5);
    launchConfetti('cannon');
  });

  function openWishModal(wishKey) {
    const data = wishesData[wishKey];
    if (!data) return;

    modalWishIcon.textContent = data.icon;
    modalWishTitle.textContent = data.title;
    modalWishContent.innerHTML = data.html;

    wishModal.classList.add('open');
    wishModal.setAttribute('aria-hidden', 'false');
    playChimeSound(659, 0.3);
    launchConfetti('default');
  }

  function closeWishModal() {
    wishModal.classList.remove('open');
    wishModal.setAttribute('aria-hidden', 'true');
  }

  envelopeItems.forEach(item => {
    const wishKey = item.getAttribute('data-wish');
    item.addEventListener('click', () => openWishModal(wishKey));
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openWishModal(wishKey);
      }
    });
  });

  modalCloseBtn.addEventListener('click', closeWishModal);
  modalAamiinBtn.addEventListener('click', () => {
    closeWishModal();
    launchConfetti('shower');
    showToast('🤲 Aamiin! Doa terbaik selalu menyertaimu, Yahya.');
  });

  // Tutup modal jika klik di luar box
  wishModal.addEventListener('click', (e) => {
    if (e.target === wishModal) closeWishModal();
  });

  // Tutup dengan tombol Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && wishModal.classList.contains('open')) {
      closeWishModal();
    }
  });

  // ==========================================================================
  // EVENT LISTENER: BAGIAN E (PENUTUP & INTERAKSI EKSTRA)
  // ==========================================================================
  btnConfettiBoom.addEventListener('click', () => {
    launchConfetti('shower');
    playChimeSound(880, 0.3);
    showToast('🎊 Huurraayyy! Selamat ulang tahun Yahya!');
  });

  btnVirtualHug.addEventListener('click', () => {
    showToast('🤗 Tos sahabat & pelukan hangat terkirim untukmu, Yahya! 💙');
    launchConfetti('default');
    playChimeSound(698, 0.25);
  });

  btnRandomCompliment.addEventListener('click', () => {
    const randomIdx = Math.floor(Math.random() * complimentsList.length);
    complimentDisplay.textContent = complimentsList[randomIdx];
    complimentDisplay.classList.remove('hidden');
    playChimeSound(587, 0.2);
  });

  function restartJourney() {
    // Reset status lilin
    candlesBlown = { candle1: false, candle2: false, candle3: false };
    Object.values(candleElements).forEach(el => el.classList.remove('blown-out'));
    candleWishStatus.classList.remove('wish-granted');
    candleWishStatus.innerHTML = 'Lilin menyala hangat. Tiup lilinnya yuk! ✨';
    complimentDisplay.classList.add('hidden');

    goToStep(1);
    showToast('🔄 Petualangan dimulai kembali dari awal!');
  }

  if (btnRestartJourney) {
    btnRestartJourney.addEventListener('click', restartJourney);
  }

  const btnBackToStartFromCard = document.getElementById('btnBackToStartFromCard');
  if (btnBackToStartFromCard) {
    btnBackToStartFromCard.addEventListener('click', restartJourney);
  }
});
