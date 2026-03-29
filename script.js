// ===== FIREBASE IMPORTS =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

// ===== FIREBASE CONFIG =====
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

// ===== API CONFIG =====
// Pakai URL yang sama dengan temanmu — CORS-nya sudah OK
const API_BASE_URL = "https://newyorkipfqr-b7c9gyf9dhakhxcf.indonesiacentral-01.azurewebsites.net";
const API_KEY = "PASSWORDAPI";

// ===== AUTHENTICATION =====
onAuthStateChanged(auth, (user) => {
    if (user) {
        const dropdownEmail = document.getElementById('dropdown-email');
        if (dropdownEmail) dropdownEmail.textContent = user.email;
    } else {
        window.location.href = 'index.html';
    }
});

window.handleLogout = async function () {
    await signOut(auth);
    window.location.href = 'index.html';
};

// ===== DROPDOWN AVATAR =====
window.toggleDropdown = function () {
    const dropdown = document.getElementById('dropdown-menu');
    if (dropdown) dropdown.classList.toggle('open');
};

document.addEventListener('click', function (e) {
    const avatarWrap = document.getElementById('avatar-wrap');
    const dropdown = document.getElementById('dropdown-menu');
    if (avatarWrap && dropdown && !avatarWrap.contains(e.target)) {
        dropdown.classList.remove('open');
    }
});

// ===== MODAL =====
window.closeModal = function () {
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) modalOverlay.classList.remove('active');
};

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

// ===== LUCIDE ICONS =====
function initLucideIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        setTimeout(initLucideIcons, 100);
    }
}

// ===== LOAD CHART =====
async function loadChart() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/kpi/all`, {
            method: 'GET',
            headers: {
                'X-API-KEY': API_KEY,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const result = await response.json();
        const groupedData = result.data;
        // groupedData = { "ALBANY": [{facility, SMD, "FAPH 30", "FAPH 7", MedCont, READM}], ... }

        // Konversi grouped object → flat array
        const rawDataArray = [];
        Object.keys(groupedData).forEach(cityKey => {
            groupedData[cityKey].forEach(facility => {
                rawDataArray.push({
                    city:    facility.facility,
                    cityKey: cityKey,
                    SMD:     facility.SMD        || 0,
                    FAPH30:  facility['FAPH 30'] || 0,
                    FAPH7:   facility['FAPH 7']  || 0,
                    MedCont: facility.MedCont    || 0,
                    READM:   facility.READM      || 0
                });
            });
        });

        console.log('Contoh data:', rawDataArray[0]);

        // Baca kata kunci dari <body data-facilities="AUBURN">
        const facilityNames = document.body.dataset.facilities
            ? document.body.dataset.facilities.split('|')
            : [];

        const filteredData = rawDataArray.filter(item =>
            facilityNames.some(name =>
                item.city.toUpperCase().includes(name.toUpperCase()) ||
                item.cityKey.toUpperCase().includes(name.toUpperCase())
            )
        );

        const baseData = filteredData.length > 0 ? filteredData : rawDataArray;
        console.log('Data kota ini:', baseData);

        // Helper: buat 1 bar chart
        function buatChart(canvasId, data, kpiKey, label) {
            const canvas = document.getElementById(canvasId);
            if (!canvas) return;

            new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: data.map(i => i.city),
                    datasets: [{
                        label,
                        data: data.map(i => i[kpiKey] === 0 ? null : i[kpiKey]),
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
                                label: (ctx) => ctx.raw == null
                                    ? `${label}: N/A`
                                    : `${label}: ${ctx.raw}%`
                            }
                        }
                    },
                    scales: {
                        x: { grid: { display: false } },
                        y: { ticks: { callback: v => v + '%' } }
                    }
                },
                plugins: [{
                    id: 'naLabel',
                    afterDatasetsDraw(chart) {
                        const { ctx } = chart;
                        chart.data.datasets.forEach((dataset, datasetIndex) => {
                            const meta = chart.getDatasetMeta(datasetIndex);
                            meta.data.forEach((bar, index) => {
                                if (dataset.data[index] === null) {
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

        // Khusus FAPH: grouped bar (FAPH-30 + FAPH-7)
        function renderFAPHChart(data) {
            const canvas = document.getElementById('faph-chart');
            if (!canvas) return;

            const faphData = data.filter(i => i.FAPH30 > 0 || i.FAPH7 > 0);

            new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: faphData.map(i => i.city),
                    datasets: [
                        {
                            label: 'FAPH-30',
                            data: faphData.map(i => i.FAPH30 === 0 ? null : i.FAPH30),
                            backgroundColor: 'rgba(108, 39, 217, 0.85)',
                            borderRadius: 4,
                        },
                        {
                            label: 'FAPH-7',
                            data: faphData.map(i => i.FAPH7 === 0 ? null : i.FAPH7),
                            backgroundColor: 'rgba(168, 99, 255, 0.6)',
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
                                label: (ctx) => ctx.raw == null
                                    ? `${ctx.dataset.label}: N/A`
                                    : `${ctx.dataset.label}: ${ctx.raw}%`
                            }
                        }
                    },
                    scales: {
                        x: { grid: { display: false } },
                        y: { ticks: { callback: v => v + '%' } }
                    }
                }
            });
        }

        // Render semua chart
        buatChart('smd-chart',     baseData.filter(i => i.SMD > 0),     'SMD',     'SMD Rate');
        buatChart('medcont-chart', baseData.filter(i => i.MedCont > 0), 'MedCont', 'MedCont Rate');
        buatChart('readm-chart',   baseData.filter(i => i.READM > 0),   'READM',   'Readmission Rate');
        renderFAPHChart(baseData);

    } catch (error) {
        console.error('Error loadChart:', error);
        document.querySelectorAll('.chart-wrapper').forEach(el => {
            el.innerHTML = `<p style="color:red;text-align:center;padding:2rem">Gagal memuat data: ${error.message}</p>`;
        });
    }
}

// ===== JALANKAN SAAT HALAMAN SIAP =====
document.addEventListener('DOMContentLoaded', function () {
    initLucideIcons();
    loadChart();
});