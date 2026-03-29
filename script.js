// Firebase Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyB4aNTSgU5wLoarKUGduLnpbwS9gI13PU4",
    authDomain: "manajemen-informasi-biomedis.firebaseapp.com",
    projectId: "manajemen-informasi-biomedis",
    storageBucket: "manajemen-informasi-biomedis.firebasestorage.app",
    messagingSenderId: "80926759256",
    appId: "1:80926759256:web:123e1e293638aa4e892d2d",
    measurementId: "G-LGT7PZFWMH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Auth State - Menampilkan email di dropdown
onAuthStateChanged(auth, (user) => {
    if (user) {
        const dropdownEmail = document.getElementById('dropdown-email');
        if (dropdownEmail) dropdownEmail.textContent = user.email;
    } else {
        // Jika tidak login dan bukan di halaman index atau dashboard, redirect
        const path = window.location.pathname;
        if (!path.includes('index.html') && !path.includes('dashboard.html')) {
            window.location.href = 'index.html';
        }
    }
});

// Fungsi Logout
window.handleLogout = async function() {
    await signOut(auth);
    window.location.href = 'index.html';
};

// Fungsi Toggle Dropdown
window.toggleDropdown = function() {
    const dropdown = document.getElementById('dropdown-menu');
    if (dropdown) {
        dropdown.classList.toggle('open');
    }
};

// Fungsi Modal IPFQR
window.openIPFQR = function() {
    const fullText = `
        <p>The Inpatient Psychiatric Facility Quality Reporting (IPFQR) Program is a pivotal pay-for-reporting initiative established to enhance transparency regarding healthcare quality and empower stakeholders to make informed decisions in psychiatric care.</p>
        <p>This dashboard leverages IPFQR data to support the evaluation of clinical outcomes, which serve as the primary Key Performance Indicators (KPIs).</p>
    `;
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalOverlay = document.getElementById('modalOverlay');
    
    if (modalTitle) modalTitle.innerText = 'About IPFQR Program';
    if (modalBody) modalBody.innerHTML = fullText;
    if (modalOverlay) modalOverlay.classList.add('active');
};

// Fungsi Close Modal
window.closeModal = function() {
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) modalOverlay.classList.remove('active');
};

// Inisialisasi Lucide Icons
function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        setTimeout(initLucideIcons, 100);
    }
}

// Close dropdown ketika klik di luar
document.addEventListener('click', function(e) {
    const avatarWrap = document.getElementById('avatar-wrap');
    const dropdown = document.getElementById('dropdown-menu');
    if (avatarWrap && dropdown && !avatarWrap.contains(e.target)) {
        dropdown.classList.remove('open');
    }
});

// Jalankan saat DOM siap
document.addEventListener('DOMContentLoaded', function() {
    initLucideIcons();
});

// ========== KODE ASLI DI BAWAH INI JANGAN DIUBAH ==========

let currentPage = 1, citiesPerPage = 10, totalPages = Math.ceil(57 / citiesPerPage), chart1, currentKPI = 'ALL';

document.addEventListener('click', (e) => {

    const wrap = document.getElementById('avatar-wrap');

    if (wrap && !wrap.contains(e.target)) document.getElementById('dropdown-menu').classList.remove('open');

    const selectContainer = document.getElementById('citySelect');

    if (selectContainer && !selectContainer.contains(e.target)) {

      document.getElementById('selectItems').classList.remove('show');

      document.querySelector('.select-selected').classList.remove('active');

    }

  });

function updateChart1() {

    const start = (currentPage - 1) * citiesPerPage, end = start + citiesPerPage;

    const labels = allCityNames.slice(start, end), data = getDataForKPI(currentKPI).slice(start, end), nyAvg = getNYAvgValue(currentKPI);

    document.getElementById('nyAvgDisplay').innerHTML = `NY State Avg: ${nyAvg}`;

    document.getElementById('pageIndicator').innerHTML = `Page ${currentPage} / ${totalPages}`;

    document.getElementById('prevBtn').disabled = currentPage === 1; document.getElementById('nextBtn').disabled = currentPage === totalPages;

    if (chart1) chart1.destroy();

    const ctx = document.getElementById('cityChart').getContext('2d');

    chart1 = new Chart(ctx, {
        type: 'bar', data: {
            labels, datasets: [

                { label: currentKPI === 'ALL' ? 'Average of All KPIs' : currentKPI, data: data.map(v => parseFloat(v)), backgroundColor: 'rgba(108,39,217,0.7)', borderColor: '#6C27D9', borderWidth: 2, borderRadius: 6 },

                { label: 'NY State Benchmark', data: Array(labels.length).fill(parseFloat(nyAvg)), type: 'line', borderColor: '#FF6B6B', borderWidth: 3, borderDash: [8, 6], fill: false, pointRadius: 0 }

            ]
        }, options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'top', labels: { boxWidth: 15, padding: 15 } }, tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}%` } } }, scales: { y: { title: { display: true, text: 'Percentage (%)', font: { size: 12 } }, min: 0, max: 50, ticks: { stepSize: 5, callback: (v) => v + '%', font: { size: 11 } } }, x: { ticks: { maxRotation: 0, minRotation: 0, font: { size: 11 } } } } }
    });

    setTimeout(() => {
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }, 100);

}

window.changeKPI = function () { currentKPI = document.getElementById('kpiSelect').value; currentPage = 1; updateChart1(); };

window.previousPage = function () { if (currentPage > 1) { currentPage--; updateChart1(); } };

window.nextPage = function () { if (currentPage < totalPages) { currentPage++; updateChart1(); } };


async function loadChart() {
    try {
        const response = await fetch('API_URL_KAMU');
        const result = await response.json();

        const labels = result.map(item => item.month);
        const data = result.map(item => item.value);

        const ctx = document.getElementById('smdChart');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'SMD Score',
                    data: data,
                }]
            },
            options: {
                responsive: true
            }
        });

    } catch (error) {
        console.error('Error ambil data:', error);
    }
}

// jalankan
loadChart();