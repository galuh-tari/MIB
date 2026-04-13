// ===== FIREBASE IMPORTS =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

const FALLBACK_DATA = [
  { city: "ADIRONDACK MEDICAL CENTER - SARANAC LAKE", cityKey: "SARANAC LAKE", SMD: 95.0, FAPH30: 84.8, FAPH7: 65.2, MedCont: 89.9, READM: 17.0 },
  { city: "ALBANY MEDICAL CENTER HOSPITAL", cityKey: "ALBANY", SMD: 79.0, FAPH30: 61.6, FAPH7: 43.8, MedCont: 71.6, READM: 17.2 },
  { city: "ARNOT OGDEN MEDICAL CENTER", cityKey: "ELMIRA", SMD: 71.0, FAPH30: 76.0, FAPH7: 50.0, MedCont: 80.8, READM: 17.9 },
  { city: "AUBURN  COMMUNITY  HOSPITAL", cityKey: "AUBURN", SMD: 91.0, FAPH30: 0, FAPH7: 0, MedCont: 79.7, READM: 20.3 },
  { city: "BELLEVUE HOSPITAL CENTER", cityKey: "NEW YORK", SMD: 87.0, FAPH30: 43.9, FAPH7: 25.2, MedCont: 63.2, READM: 18.6 },
  { city: "BON SECOURS COMMUNITY HOSPITAL", cityKey: "PORT JERVIS", SMD: 87.0, FAPH30: 60.4, FAPH7: 31.3, MedCont: 81.8, READM: 16.6 },
  { city: "BRONX PSYCHIATRIC CENTER", cityKey: "BRONX", SMD: 97.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "BRONXCARE HOSPITAL CENTER", cityKey: "BRONX", SMD: 79.0, FAPH30: 37.0, FAPH7: 24.1, MedCont: 82.3, READM: 19.2 },
  { city: "BROOKDALE HOSPITAL MEDICAL CENTER", cityKey: "BROOKLYN", SMD: 87.0, FAPH30: 37.4, FAPH7: 27.3, MedCont: 78.8, READM: 18.8 },
  { city: "BRUNSWICK HOSPITAL CENTER, INC.", cityKey: "AMITYVILLE", SMD: 100.0, FAPH30: 60.4, FAPH7: 40.4, MedCont: 77.7, READM: 19.8 },
  { city: "BRYLIN HOSP", cityKey: "BUFFALO", SMD: 94.0, FAPH30: 75.0, FAPH7: 50.0, MedCont: 0, READM: 17.3 },
  { city: "BUFFALO PSYCHIATRIC CENTER", cityKey: "BUFFALO", SMD: 94.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "CAPITAL DISTRICT PSYCH CENTER", cityKey: "ALBANY", SMD: 80.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "CLAXTON-HEPBURN MEDICAL CENTER", cityKey: "OGDENSBURG", SMD: 0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "CLIFTON SPRINGS HOSPITAL AND CLINIC", cityKey: "CLIFTON SPRINGS", SMD: 75.0, FAPH30: 75.5, FAPH7: 40.8, MedCont: 81.8, READM: 17.9 },
  { city: "CREEDMOOR PSYCHIATRIC CENTER", cityKey: "QUEENS VILLAGE", SMD: 100.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "ELMHURST HOSPITAL CENTER", cityKey: "ELMHURST", SMD: 100.0, FAPH30: 55.8, FAPH7: 38.5, MedCont: 83.5, READM: 20.9 },
  { city: "ELMIRA PSYCH CENTER", cityKey: "ELMIRA", SMD: 89.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "ERIE COUNTY MEDICAL CENTER", cityKey: "BUFFALO", SMD: 50.0, FAPH30: 63.0, FAPH7: 37.0, MedCont: 90.6, READM: 13.8 },
  { city: "FOUR WINDS", cityKey: "KATONAH", SMD: 100.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 17.6 },
  { city: "FOUR WINDS OF SARATOGA", cityKey: "SARATOGA SPRINGS", SMD: 96.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 16.5 },
  { city: "GARNET HEALTH  MEDICAL CENTER CATSKILLS", cityKey: "HARRIS", SMD: 42.0, FAPH30: 68.9, FAPH7: 48.9, MedCont: 0, READM: 15.5 },
  { city: "GARNET HEALTH MEDICAL CENTER", cityKey: "MIDDLETOWN", SMD: 34.0, FAPH30: 60.8, FAPH7: 44.3, MedCont: 84.1, READM: 16.8 },
  { city: "GRACIE SQUARE HOSP", cityKey: "NEW YORK", SMD: 95.0, FAPH30: 53.4, FAPH7: 38.3, MedCont: 87.2, READM: 17.1 },
  { city: "GREATER BINGHAMTON HEALTH CENTER", cityKey: "BINGHAMTON", SMD: 100.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "GUTHRIE CORTLAND REGIONAL MEDICAL CENTER", cityKey: "CORTLAND", SMD: 20.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 21.0 },
  { city: "HARLEM HOSPITAL CENTER", cityKey: "NEW YORK", SMD: 82.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 18.2 },
  { city: "HEALTHALLIANCE HOSPITAL MARYS AVENUE CAMPUS", cityKey: "KINGSTON", SMD: 0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "HUTCHINGS PSYCHIATRIC CTR", cityKey: "SYRACUSE", SMD: 97.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "JACOBI MEDICAL CENTER", cityKey: "BRONX", SMD: 97.0, FAPH30: 42.9, FAPH7: 28.6, MedCont: 77.0, READM: 16.2 },
  { city: "JAMAICA HOSPITAL MEDICAL CENTER", cityKey: "JAMAICA", SMD: 100.0, FAPH30: 60.0, FAPH7: 45.0, MedCont: 84.6, READM: 21.5 },
  { city: "JOHN T MATHER MEMORIAL HOSPITAL  OF PORT JEFFERSON", cityKey: "PORT JEFFERSON", SMD: 100.0, FAPH30: 76.1, FAPH7: 56.7, MedCont: 89.6, READM: 16.7 },
  { city: "KINGS COUNTY HOSPITAL CENTER", cityKey: "BROOKLYN", SMD: 86.0, FAPH30: 50.6, FAPH7: 32.6, MedCont: 78.5, READM: 15.0 },
  { city: "KINGSBORO PSYCHIATRIC HOSPITAL", cityKey: "BROOKLYN", SMD: 89.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "KIRBY FORENSIC PSYCHIATRIC CENTER", cityKey: "NEW YORK", SMD: 99.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "LENOX HILL HOSPITAL", cityKey: "NEW YORK", SMD: 86.0, FAPH30: 69.0, FAPH7: 52.4, MedCont: 0, READM: 20.4 },
  { city: "LINCOLN MEDICAL & MENTAL HEALTH CENTER", cityKey: "BRONX", SMD: 86.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 19.7 },
  { city: "LONG ISLAND COMMUNITY HOSPITAL", cityKey: "PATCHOGUE", SMD: 94.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "LONG ISLAND JEWISH MEDICAL CENTER", cityKey: "NEW HYDE PARK", SMD: 70.0, FAPH30: 83.0, FAPH7: 69.6, MedCont: 91.8, READM: 17.4 },
  { city: "MAIMONIDES MEDICAL CENTER", cityKey: "BROOKLYN", SMD: 85.0, FAPH30: 71.2, FAPH7: 51.9, MedCont: 89.8, READM: 20.6 },
  { city: "MANHATTAN PSYCHIATRIC CENTER", cityKey: "NEW YORK", SMD: 100.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "MERCY MEDICAL CENTER", cityKey: "ROCKVILLE CENTRE", SMD: 99.0, FAPH30: 88.2, FAPH7: 70.6, MedCont: 86.7, READM: 18.3 },
  { city: "METROPOLITAN HOSPITAL CENTER", cityKey: "NEW YORK", SMD: 82.0, FAPH30: 31.5, FAPH7: 20.4, MedCont: 78.3, READM: 16.9 },
  { city: "MID HUDSON FORENSIC PSYCHIATRIC CTR", cityKey: "NEW HAMPTON", SMD: 100.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "MOHAWK VALLEY PSYCHIATRIC CENTER", cityKey: "UTICA", SMD: 99.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "MONTEFIORE MEDICAL CENTER", cityKey: "BRONX", SMD: 86.0, FAPH30: 40.9, FAPH7: 27.3, MedCont: 80.3, READM: 19.2 },
  { city: "MONTEFIORE MOUNT VERNON HOSPITAL", cityKey: "MOUNT VERNON", SMD: 70.0, FAPH30: 0, FAPH7: 0, MedCont: 74.7, READM: 19.9 },
  { city: "MOUNT SINAI BETH ISRAEL", cityKey: "NEW YORK", SMD: 90.0, FAPH30: 62.0, FAPH7: 38.0, MedCont: 71.6, READM: 15.1 },
  { city: "MOUNT SINAI HOSPITAL", cityKey: "NEW YORK", SMD: 91.0, FAPH30: 67.2, FAPH7: 53.1, MedCont: 87.2, READM: 16.0 },
  { city: "MOUNT SINAI SOUTH NASSAU", cityKey: "OCEANSIDE", SMD: 85.0, FAPH30: 73.5, FAPH7: 51.0, MedCont: 80.7, READM: 20.7 },
  { city: "MOUNT SINAI WEST", cityKey: "NEW YORK", SMD: 82.0, FAPH30: 36.6, FAPH7: 24.4, MedCont: 73.5, READM: 16.8 },
  { city: "NASSAU UNIVERSITY MEDICAL CENTER", cityKey: "EAST MEADOW", SMD: 79.0, FAPH30: 59.0, FAPH7: 42.0, MedCont: 86.8, READM: 21.1 },
  { city: "NEW YORK CITY CHILDRENS PSYCH CENTER", cityKey: "BELLEROSE", SMD: 100.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "NEW YORK STATE PSYCHIATRIC INSTITUTE", cityKey: "NEW YORK", SMD: 99.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "NEW YORK-PRESBYTERIAN HOSPITAL", cityKey: "NEW YORK", SMD: 79.0, FAPH30: 68.8, FAPH7: 55.6, MedCont: 83.5, READM: 15.4 },
  { city: "NORTH SHORE UNIVERSITY HOSPITAL", cityKey: "MANHASSET", SMD: 0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "NORTHERN WESTCHESTER HOSPITAL", cityKey: "MOUNT KISCO", SMD: 98.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 19.3 },
  { city: "NS/LIJ HS HUNTINGTON HOSPITAL", cityKey: "HUNTINGTON", SMD: 89.0, FAPH30: 71.9, FAPH7: 43.8, MedCont: 81.9, READM: 18.9 },
  { city: "NYACK HOSPITAL", cityKey: "NYACK", SMD: 91.0, FAPH30: 69.8, FAPH7: 55.8, MedCont: 87.6, READM: 19.5 },
  { city: "NYU LANGONE HOSPITALS", cityKey: "NEW YORK", SMD: 76.0, FAPH30: 76.7, FAPH7: 61.6, MedCont: 87.6, READM: 16.3 },
  { city: "OLEAN GENERAL HOSPITAL", cityKey: "OLEAN", SMD: 65.0, FAPH30: 59.1, FAPH7: 29.5, MedCont: 72.0, READM: 20.7 },
  { city: "OSWEGO HOSPITAL", cityKey: "OSWEGO", SMD: 94.0, FAPH30: 51.1, FAPH7: 26.7, MedCont: 81.9, READM: 23.3 },
  { city: "PHELPS HOSPITAL", cityKey: "SLEEPY HOLLOW", SMD: 98.0, FAPH30: 78.4, FAPH7: 58.8, MedCont: 83.0, READM: 19.6 },
  { city: "PILGRIM PSYCHIATRIC CENTER", cityKey: "WEST BRENTWOOD", SMD: 99.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "PUTNAM HOSPITAL CENTER", cityKey: "CARMEL", SMD: 80.0, FAPH30: 65.5, FAPH7: 50.9, MedCont: 76.1, READM: 19.5 },
  { city: "QUEENS HOSPITAL CENTER", cityKey: "JAMAICA", SMD: 86.0, FAPH30: 54.1, FAPH7: 41.0, MedCont: 80.6, READM: 19.5 },
  { city: "RICHMOND UNIVERSITY MEDICAL CENTER", cityKey: "STATEN ISLAND", SMD: 95.0, FAPH30: 72.1, FAPH7: 58.1, MedCont: 83.2, READM: 20.4 },
  { city: "ROCHESTER GENERAL HOSPITAL", cityKey: "ROCHESTER", SMD: 79.0, FAPH30: 72.3, FAPH7: 50.8, MedCont: 90.8, READM: 17.2 },
  { city: "ROCHESTER PSYCHIATRIC CENTER", cityKey: "ROCHESTER", SMD: 98.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "ROCKLAND CHILDREN'S PSYCHIATRIC CENTER", cityKey: "ORANGEBURG", SMD: 100.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "ROCKLAND PSYCH CTR", cityKey: "ORANGEBURG", SMD: 99.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "ROME MEMORIAL HOSPITAL, INC", cityKey: "ROME", SMD: 96.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 17.6 },
  { city: "SAGAMORE CHILDREN'S PSYCHIATRIC CENTER", cityKey: "DIX HILLS", SMD: 100.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "SAMARITAN HOSPITAL OF TROY, NEW YORK", cityKey: "TROY", SMD: 54.0, FAPH30: 73.4, FAPH7: 54.7, MedCont: 80.0, READM: 20.2 },
  { city: "SOUTH BEACH PSYCHIATRIC CENTER", cityKey: "STATEN ISLAND", SMD: 99.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "SOUTH BROOKLYN HEALTH", cityKey: "BROOKLYN", SMD: 100.0, FAPH30: 64.0, FAPH7: 42.0, MedCont: 77.2, READM: 18.3 },
  { city: "SOUTH OAKS HOSP", cityKey: "AMITYVILLE", SMD: 91.0, FAPH30: 76.1, FAPH7: 54.7, MedCont: 88.8, READM: 15.2 },
  { city: "ST BARNABAS HOSPITAL", cityKey: "BRONX", SMD: 54.0, FAPH30: 34.0, FAPH7: 24.0, MedCont: 82.7, READM: 18.0 },
  { city: "ST CATHERINE OF SIENA HOSPITAL", cityKey: "SMITHTOWN", SMD: 96.0, FAPH30: 75.2, FAPH7: 55.6, MedCont: 92.9, READM: 17.9 },
  { city: "ST JOHN'S EPISCOPAL HOSPITAL AT SOUTH SHORE", cityKey: "FAR ROCKAWAY", SMD: 94.0, FAPH30: 0, FAPH7: 0, MedCont: 84.4, READM: 21.8 },
  { city: "ST JOSEPH'S HOSPITAL HEALTH CENTER", cityKey: "SYRACUSE", SMD: 11.0, FAPH30: 68.3, FAPH7: 53.7, MedCont: 0, READM: 21.6 },
  { city: "ST JOSEPH'S MEDICAL CENTER", cityKey: "YONKERS", SMD: 100.0, FAPH30: 66.5, FAPH7: 50.5, MedCont: 83.8, READM: 19.8 },
  { city: "ST LAWRENCE PSYCHIATRIC CENTER", cityKey: "OGDENSBURG", SMD: 93.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "ST MARY'S HEALTHCARE", cityKey: "AMSTERDAM", SMD: 61.0, FAPH30: 63.3, FAPH7: 32.7, MedCont: 91.8, READM: 15.9 },
  { city: "STATEN ISLAND UNIVERSITY HOSPITAL", cityKey: "STATEN ISLAND", SMD: 81.0, FAPH30: 85.4, FAPH7: 68.8, MedCont: 78.8, READM: 23.1 },
  { city: "STRONG MEMORIAL HOSPITAL", cityKey: "ROCHESTER", SMD: 96.0, FAPH30: 70.9, FAPH7: 55.6, MedCont: 84.2, READM: 18.7 },
  { city: "SUNY/STONY BROOK UNIVERSITY HOSPITAL", cityKey: "STONY BROOK", SMD: 83.0, FAPH30: 81.3, FAPH7: 58.3, MedCont: 88.8, READM: 21.4 },
  { city: "UNITED HEALTH SERVICES HOSPITALS, INC", cityKey: "BINGHAMTON", SMD: 98.0, FAPH30: 70.8, FAPH7: 52.6, MedCont: 90.3, READM: 15.5 },
  { city: "UNITY HOSPITAL", cityKey: "ROCHESTER", SMD: 0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "UNIVERSITY HOSPITAL S U N Y HEALTH SCIENCE CENTER", cityKey: "SYRACUSE", SMD: 68.0, FAPH30: 80.6, FAPH7: 55.9, MedCont: 87.9, READM: 20.3 },
  { city: "UPMC CHAUTAUQUA AT WCA", cityKey: "JAMESTOWN", SMD: 29.0, FAPH30: 64.6, FAPH7: 50.0, MedCont: 84.9, READM: 19.6 },
  { city: "WESTCHESTER MEDICAL CENTER", cityKey: "VALHALLA", SMD: 85.0, FAPH30: 69.3, FAPH7: 51.1, MedCont: 83.9, READM: 19.1 },
  { city: "WESTERN NY CHILDRENS PSYCHIATRIC CENTER", cityKey: "WEST SENECA", SMD: 100.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
  { city: "WOODHULL MEDICAL & MENTAL HEALTH CENTER", cityKey: "BROOKLYN", SMD: 76.0, FAPH30: 41.9, FAPH7: 30.2, MedCont: 84.8, READM: 16.6 },
  { city: "WYOMING COUNTY", cityKey: "WARSAW", SMD: 95.0, FAPH30: 0, FAPH7: 0, MedCont: 0, READM: 0 },
];

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

// const API_BASE_URL = "https://newyorkipfqr-b7c9gyf9dhakhxcf.indonesiacentral-01.azurewebsites.net";
// const API_BASE_URL = "https://newyork-ipfqr-apf4dxd6h6f2hnac.southeastasia-01.azurewebsites.net";
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
        const faphData = chartData.filter(i => i.FAPH30 > 0 || i.FAPH7 > 0);
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

    buatChart('smd-chart',     data.filter(i => i.SMD > 0),     'SMD',     'SMD Rate');
    buatChart('medcont-chart', data.filter(i => i.MedCont > 0), 'MedCont', 'MedCont Rate');
    buatChart('readm-chart',   data.filter(i => i.READM > 0),   'READM',   'Readmission Rate');
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
        // API gagal → pakai data asli dari SQLite (hardcoded di FALLBACK_DATA)
        console.warn('API tidak tersedia, pakai fallback data:', error.message);
        const baseData = filterData(FALLBACK_DATA);
        // console.log('Data fallback:', baseData);
        renderCharts(baseData);
    }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function () {
    initLucideIcons();
    loadChart();
});