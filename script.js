// Data for predictions
const predictionsData = {
    karir: [
        "Lulus nanti jadi ani-ani!",
        "gk usah kerja cari sugar daddy aja.",
        "Saat di kantro kerjamu nanti kamu akan dipecat karna selingkuh dengan sekertaris/staff!",
        "Tetap konsisten, nanti direkrut jadi admin Judol."
    ],
    percintaan: [
        "Sebenarnya ada di Kelas C Suka sama kau!",
        "Perasaan tulus sebaiknya jangan dipenda,.",
        "Ada cinta di masa sekolahmun yang sampai detik ini masih menyimpan perasaannya sama kamu",
        "Sugar daddy segera datang 2 minggu lagi."
    ],
    keuangan: [
        "Tahun depan kamu akan naik haji jika kamu nabung 1 Juta 1 hari!",
        "1 ginjal 1 Miliar, so tunggu apalagi Investasikan Ginjalmu.",
        "jangan pernah bayar uang kas kelas, lumayan njir pembeli cendol!",
        "Hindari foya-foya maka ada rezeki yang menantimu, Tapi kalo gacoan gasskaan."
    ],
    kesehatan: [
        "tips bila naik asam lambung: Minum Kopi sesaat setelah bangun tidur!",
        "Pola hidup sehat akan membuatmu lebih energik dan bahagia, apalagi kalo sama dia",
        "Apresiasi diri sendiri sebelum tidur baik untuk kesehatan mental.",
        "Olahraga rutin akan mengubah mood dan fisikmu drastis."
    ],
    pendidikan: [
        "Prestasi akademikmu akan menonjol, menonjol ke bawah!",
        "Ada peluang beasiswa atau pengalaman belajar ke luar negeri(Zimbabwe).",
        "jangan ragu bertanya ke dosen tapi kalo lu banyak tanya jadi ngeselin ajg.",
        "belajarlah dari, hari ini ya hari ini besok kita lihat nanti."
    ],
    "tebak-nama-jodoh": [
        "Riski", "Fiqi", "Fadli", "Nadya", "Baco", "Bela", "Rafi", "Salsa", "Arief", "Lukman"
    ],
    "kata-kata-hari-ini": [
       "Terserah Tuhan Mau Kasih jodoh orang mana asal jangan orang israel paham?!",
        "Bilang sama si pukimak itu kalau tidak tau soal diriku jangan lebar kali moncongnya, paham?.",
        "Kupikir manis mu itu pelengkap ternyata hanya perangkap.",
        "Semua masalah pasti berlalu,, berlalulalang!",
        "Penyesalan memang datangnya di akhir, kalau di awal namanya pendaftaran."
        
    ]
};

// Elements
const formSection = document.getElementById('form-section');
const loadingSection = document.getElementById('loading-section');
const resultSection = document.getElementById('result-section');
const predictionForm = document.getElementById('prediction-form');
const predictionOutput = document.getElementById('prediction-output');
const userNameSpan = document.getElementById('user-name');
const shareBtn = document.getElementById('share-btn');
const retryBtn = document.getElementById('retry-btn');
const progressFill = document.querySelector('.progress-fill');

let typingTimeout;

// Utility: sleep for ms milliseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Typing effect function
async function typeText(element, text) {
    element.textContent = '';
    for (let i = 0; i < text.length; i++) {
        element.textContent += text.charAt(i);
        await sleep(40);
    }
}

// Generate random integer between min and max inclusive
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate prediction text based on categories
function generatePredictions(categories) {
    let results = [];
    categories.forEach(cat => {
        if (cat === 'tebak-nama-jodoh') {
            const names = predictionsData[cat];
            const randomName = names[randomInt(0, names.length - 1)];
            results.push(`Tebakan nama jodohmu adalah: ${randomName}`);
        } else if (cat === 'kata-kata-hari-ini') {
            const kataKata = predictionsData[cat];
            const randomKata = kataKata[randomInt(0, kataKata.length - 1)];
            results.push(`Kata-Kata Hari Ini: ${randomKata}`);
        } else if (cat === 'prediksi-kekayaan') {
            const percent = randomInt(10, 100);
            results.push(`Tingkat kekayaanmu tahun ini diprediksi mencapai ${percent}%! 🎉`);
        } else {
            // General categories
            const preds = predictionsData[cat];
            if (preds && preds.length > 0) {
                const randomPred = preds[randomInt(0, preds.length - 1)];
                results.push(randomPred);
            }
        }
    });
    return results.join('\n\n');
}

// Reset form and UI to initial state
function resetUI() {
    predictionForm.reset();
    predictionOutput.textContent = '';
    userNameSpan.textContent = '';
    formSection.classList.remove('hidden');
    loadingSection.classList.add('hidden');
    resultSection.classList.add('hidden');
}

// Handle form submission
predictionForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fullname = predictionForm.fullname.value.trim();
    const selectedCategories = Array.from(predictionForm.category)
        .filter(chk => chk.checked)
        .map(chk => chk.value);

    if (!fullname) {
        Swal.fire('Oops!', 'Mohon isi nama lengkapmu.', 'warning');
        return;
    }
    if (selectedCategories.length === 0) {
        Swal.fire('Oops!', 'Mohon pilih minimal satu kategori prediksi.', 'warning');
        return;
    }

    // Show loading
    formSection.classList.add('hidden');
    resultSection.classList.add('hidden');
    loadingSection.classList.remove('hidden');

    // Animate progress bar
    progressFill.style.width = '0%';
    progressFill.style.animation = 'none';
    // Trigger reflow to restart animation
    void progressFill.offsetWidth;
    progressFill.style.animation = 'progress-fill 4s linear forwards';

    // Wait for loading duration (4s)
    await sleep(4000);

    // Hide loading, show result
    loadingSection.classList.add('hidden');
    resultSection.classList.remove('hidden');

    userNameSpan.textContent = fullname;

    // Generate prediction text
    const predictionText = generatePredictions(selectedCategories);

    // Animate typing effect
    await typeText(predictionOutput, predictionText);

    // Add fade-in and zoom-in animation
    predictionOutput.classList.add('fade-in', 'zoom-in');
    setTimeout(() => {
        predictionOutput.classList.remove('fade-in', 'zoom-in');
    }, 1000);
});

// Share button click handler
shareBtn.addEventListener('click', () => {
    const shareText = `Cek prediksi masa depanku! Siapa tahu kita jodoh?! 😜✨\n\n${predictionOutput.textContent}`;
    Swal.fire({
        title: 'Bagikan Hasil Prediksi',
        icon: 'info',
        html:
            `<p>Pilih platform untuk membagikan hasil prediksi:</p>
            <div class="swal-share-buttons" style="display:flex; justify-content:center; gap:15px; margin-top:15px;">
                <button id="share-whatsapp" class="swal2-confirm swal2-styled" style="background:#25D366;">WhatsApp</button>
                <button id="share-facebook" class="swal2-confirm swal2-styled" style="background:#3b5998;">Facebook</button>
                <button id="share-twitter" class="swal2-confirm swal2-styled" style="background:#1DA1F2;">Twitter</button>
            </div>`,
        showConfirmButton: false,
        showCloseButton: true,
        didOpen: () => {
            const whatsappBtn = document.getElementById('share-whatsapp');
            const facebookBtn = document.getElementById('share-facebook');
            const twitterBtn = document.getElementById('share-twitter');

            whatsappBtn.addEventListener('click', () => {
                const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
                window.open(url, '_blank');
            });
            facebookBtn.addEventListener('click', () => {
                const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
                window.open(url, '_blank');
            });
            twitterBtn.addEventListener('click', () => {
                const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
                window.open(url, '_blank');
            });
        }
    });
});

// Retry button click handler
retryBtn.addEventListener('click', () => {
    resetUI();
});

// Initialize UI on page load
resetUI();
