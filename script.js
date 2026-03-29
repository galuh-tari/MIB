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
window.handleLogout = async function () {
    await signOut(auth);
    window.location.href = 'index.html';
};

// Fungsi Toggle Dropdown
window.toggleDropdown = function () {
    const dropdown = document.getElementById('dropdown-menu');
    if (dropdown) {
        dropdown.classList.toggle('open');
    }
};

// Fungsi Modal IPFQR
window.openIPFQR = function () {
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
window.closeModal = function () {
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
document.addEventListener('click', function (e) {
    const avatarWrap = document.getElementById('avatar-wrap');
    const dropdown = document.getElementById('dropdown-menu');
    if (avatarWrap && dropdown && !avatarWrap.contains(e.target)) {
        dropdown.classList.remove('open');
    }
});

// Jalankan saat DOM siap
document.addEventListener('DOMContentLoaded', function () {
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
        const response = await fetch('https://newyorkipfqr-b7c9gyf9dhakhxcf.indonesiacentral-01.azurewebsites.net/api/kpi/all');
        const result = await response.json();
        const rawData = result.data;

        const facilityNames = document.body.dataset.facilities.split('|');

        const cityData = rawData.filter(item =>
            facilityNames.some(name => item.city.includes(name))
        );

        console.log('City data:', cityData);

        const baseData = cityData.length > 0 ? cityData : rawData;
        const cleanedData = baseData.map(i => ({
            city: i.city,
            FAPH30: i["FAPH 30"],
            FAPH7: i["FAPH 7"]
        }));

        function buatChart(canvasId, data, kpiKey, label) {
            const canvas = document.getElementById(canvasId);
            if (!canvas) return;

            const labels = data.map(item => item.city);
            const values = data.map(item => item[kpiKey] === 0 ? null : item[kpiKey]);

            new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: label,
                        data: values,
                        backgroundColor: 'rgba(108, 39, 217, 0.85)',
                        borderRadius: 4,
                    }]
                },

                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top' },
                        tooltip: {
                            callbacks: {
                                label: (ctx) =>
                                    ctx.raw == null
                                        ? `${label}: N/A`
                                        : `${label}: ${ctx.raw}%`
                            }
                        }
                    },
                    scales: {
                        x: { grid: { display: false } },
                        y: {
                            ticks: { callback: v => v + '%' }
                        }
                    }
                },

                plugins: [{
                    id: 'naLabel',
                    afterDatasetsDraw(chart) {
                        const { ctx } = chart;

                        chart.data.datasets.forEach((dataset, datasetIndex) => {
                            const meta = chart.getDatasetMeta(datasetIndex);

                            meta.data.forEach((bar, index) => {
                                const value = dataset.data[index];

                                if (value === null) {
                                    ctx.save();
                                    ctx.fillStyle = 'gray';
                                    ctx.font = '10px sans-serif';
                                    ctx.textAlign = 'center';
                                    ctx.fillText('N/A', bar.x, chart.scales.y.getPixelForValue(2));
                                    ctx.restore();
                                }
                            });
                        });
                    }
                }]
            });

        }

        buatChart('smd-chart', baseData, 'SMD', 'SMD Rate');
        const faphData = cleanedData;
        const faphCanvas = document.getElementById('faph-chart');
        if (faphCanvas) {
            new Chart(faphCanvas, {
                type: 'bar',
                data: {
                    labels: faphData.map(i => i.city),
                    datasets: [
                        {
                            label: 'FAPH30',
                            data: faphData.map(i => i.FAPH30),
                            backgroundColor: 'rgba(108, 39, 217, 0.85)',  // ungu solid
                            borderRadius: 4,
                        },
                        {
                            label: 'FAPH7',
                            data: faphData.map(i => i.FAPH7),
                            backgroundColor: 'rgba(168, 99, 255, 0.6)',   // ungu muda
                            borderRadius: 4,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top', labels: { boxWidth: 15, padding: 15 } },
                        tooltip: {
                            callbacks: {
                                label: (ctx) =>
                                    ctx.raw == null
                                        ? `${label}: N/A`
                                        : `${label}: ${ctx.raw}%`
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: { maxRotation: 20, minRotation: 0, font: { size: 11 } },
                            grid: { display: false }
                        },
                        y: {
                            title: { display: true, text: 'Percentage (%)', font: { size: 12 } },
                            ticks: { callback: v => v + '%', font: { size: 11 } },
                            grid: { color: 'rgba(0,0,0,0.05)' }
                        }
                    }
                },

                plugins: [
                    {
                        id: 'naLabel',
                        afterDatasetsDraw(chart) {
                            const { ctx } = chart;

                            chart.data.datasets.forEach((dataset, datasetIndex) => {
                                const meta = chart.getDatasetMeta(datasetIndex);

                                meta.data.forEach((bar, index) => {
                                    const value = dataset.data[index];

                                    if (value === null) {
                                        ctx.save();
                                        ctx.fillStyle = 'gray';
                                        ctx.font = '10px sans-serif';
                                        ctx.textAlign = 'center';
                                        ctx.fillText('N/A', bar.x, chart.scales.y.getPixelForValue(2));
                                        ctx.restore();
                                    }
                                });
                            });
                        }
                    }]
            });
        }
        buatChart('medcont-chart', baseData, 'MedCont', 'MedCont Rate');
        buatChart('readm-chart', baseData, 'READM', 'Readmission Rate');

    } catch (error) {
        console.error('Error:', error);
        document.querySelectorAll('.chart-wrapper').forEach(el => {
            el.innerHTML = '<p style="color:red;text-align:center;padding:2rem">Gagal memuat data.</p>';
        });
    }
}

loadChart();