// ===== FIREBASE IMPORTS =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";



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

const API_BASE_URL = "https://newyork-ipfqr-apf4dxd6h6f2hnac.southeastasia-01.azurewebsites.net";

const API_KEY = "PASSWORDAPI";

// ===== AUTH =====
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

window.closeModal = function () {
    const el = document.getElementById('modalOverlay');
    if (el) el.classList.remove('active');
};

window.openIPFQR = function () {
    const fullText = `<p>The Inpatient Psychiatric Facility Quality Reporting (IPFQR) Program is a pivotal pay-for-reporting initiative established to enhance transparency regarding healthcare quality and empower stakeholders to make informed decisions in psychiatric care.</p><p>This dashboard leverages IPFQR data to support the evaluation of clinical outcomes, which serve as the primary Key Performance Indicators (KPIs).</p>`;
    const t = document.getElementById('modalTitle');
    const b = document.getElementById('modalBody');
    const o = document.getElementById('modalOverlay');
    if (t) t.innerText = 'About IPFQR Program';
    if (b) b.innerHTML = fullText;
    if (o) o.classList.add('active');
};

function initLucideIcons() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
    else setTimeout(initLucideIcons, 100);
}

// ===== RENDER CHARTS =====
function renderCharts(data) {
    function buatChart(canvasId, chartData, kpiKey, label) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: chartData.map(i => i.city),
                datasets: [{
                    label,
                    data: chartData.map(i => i[kpiKey] === 0 ? null : i[kpiKey]),
                    backgroundColor: 'rgba(108, 39, 217, 0.85)',
                    borderRadius: 4,
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' },
                    tooltip: { callbacks: { label: (ctx) => ctx.raw == null ? `${label}: N/A` : `${label}: ${ctx.raw}%` } }
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
                    chart.data.datasets.forEach((dataset, di) => {
                        chart.getDatasetMeta(di).data.forEach((bar, idx) => {
                            if (dataset.data[idx] === null) {
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

    function renderFAPHChart(chartData) {
        const canvas = document.getElementById('faph-chart');
        if (!canvas) return;
        const faphData = chartData;
        new Chart(canvas, {
            type: 'bar',
            data: {
                labels: faphData.map(i => i.city),
                datasets: [
                    { label: 'FAPH-30', data: faphData.map(i => i.FAPH30 || null), backgroundColor: 'rgba(108,39,217,0.85)', borderRadius: 4 },
                    { label: 'FAPH-7',  data: faphData.map(i => i.FAPH7  || null), backgroundColor: 'rgba(168,99,255,0.6)',  borderRadius: 4 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'top', labels: { boxWidth: 15, padding: 15 } } },
                scales: { x: { grid: { display: false } }, y: { ticks: { callback: v => v + '%' } } }
            }
        });
    }

    buatChart('smd-chart',     data,     'SMD',     'SMD Rate');
    buatChart('medcont-chart', data, 'MedCont', 'MedCont Rate');
    buatChart('readm-chart',   data,   'READM',   'Readmission Rate');
    renderFAPHChart(data);
}

// ===== LOAD CHART =====
async function loadChart() {
    const facilityNames = document.body.dataset.facilities
        ? document.body.dataset.facilities.split('|')
        : [];

    function filterData(rawArray) {
        const filtered = rawArray.filter(item =>
            facilityNames.some(name =>
                item.city.toUpperCase().includes(name.toUpperCase()) ||
                item.cityKey.toUpperCase().includes(name.toUpperCase())
            )
        );
        return filtered.length > 0 ? filtered : rawArray;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/kpi/all`, {
            method: 'GET',
            headers: { 'X-API-KEY': API_KEY, 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const result = await response.json();
        const groupedData = result.data;

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

        const baseData = filterData(rawDataArray);
        // console.log('Data dari API:', baseData);
        renderCharts(baseData);

    } catch (error) {
        renderCharts(baseData);
    }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function () {
    initLucideIcons();
    loadChart();
});