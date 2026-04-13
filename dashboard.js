import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";

// FIREBASE CONFIG
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

// API BASE URL
const API_BASE_URL = "https://newyork-ipfqr-apf4dxd6h6f2hnac.southeastasia-01.azurewebsites.net";
const API_KEY = "PASSWORDAPI";

// AUTHENTICATION
onAuthStateChanged(auth, (user) => {
  if (user) {
    const name = user.email.split('@')[0];
    document.getElementById('user-name').textContent = name + '!';
    document.getElementById('dropdown-email').textContent = user.email;
  } else {
    window.location.href = 'index.html';
  }
});

window.handleLogout = async function() {
  await signOut(auth);
  window.location.href = 'index.html';
};

window.toggleDropdown = function() {
  document.getElementById('dropdown-menu').classList.toggle('open');
};

document.addEventListener('click', (e) => {
  const wrap = document.getElementById('avatar-wrap');
  if (wrap && !wrap.contains(e.target)) {
    document.getElementById('dropdown-menu').classList.remove('open');
  }
  const selectContainer = document.getElementById('citySelect');
  if (selectContainer && !selectContainer.contains(e.target)) {
    document.getElementById('selectItems').classList.remove('show');
    document.querySelector('.select-selected')?.classList.remove('active');
  }
});

// MODAL IPFQR
window.closeModal = function() {
  document.getElementById('modalOverlay').classList.remove('active');
};

window.openIPFQR = function() {
  const fullText = `
    <p>The Inpatient Psychiatric Facility Quality Reporting (IPFQR) Program is a pivotal pay-for-reporting initiative established to enhance transparency regarding healthcare quality and empower stakeholders to make informed decisions in psychiatric care. Under this regulatory framework, Inpatient Psychiatric Facilities (IPFs) are mandated to report standardized quality measures to the Centers for Medicare & Medicaid Services (CMS). These metrics facilitate the comparative evaluation of care quality across inpatient settings, while non-compliance with reporting protocols may result in adjustments to Medicare reimbursement.</p><br>
    <p>This dashboard leverages IPFQR data to support the evaluation of clinical outcomes, which serve as the primary Key Performance Indicators (KPIs). Accordingly, the platform prioritizes outcome-oriented metrics, specifically: Screening for Metabolic Disorders (SMD), Follow-Up After Psychiatric Hospitalization (FAPH) at 7 and 30-day intervals, Medication Continuation (MedCont), and Readmission Rates (READM). These indicators were selected for their critical role in assessing treatment efficacy, continuity of care, and patient recovery outcomes, with a specific focus on identifying longitudinal trends and performance shifts over time.</p><br>
    <p>The data scope encompasses healthcare facilities across New York State, representing 95 facilities distributed across 57 municipalities. This enables both macro-level and regional-level analysis of psychiatric care performance, supporting data-driven decision-making in clinical quality improvement.</p>
  `;
  document.getElementById('modalTitle').innerText = 'About IPFQR Program';
  document.getElementById('modalBody').innerHTML = fullText;
  document.getElementById('modalOverlay').classList.add('active');
};

// FLIP CARD
window.toggleFlip = function(card) {
  const allCards = document.querySelectorAll('.flip-card');
  if (card.classList.contains('flipped')) {
    card.classList.remove('flipped');
  } else {
    allCards.forEach(c => c.classList.remove('flipped'));
    card.classList.add('flipped');
  }
};

// DATA 57 CITY
const allCityNames = [
  "ALBANY", "AMITYVILLE", "AMSTERDAM", "AUBURN", "BELLEROSE", "BINGHAMTON", "BRONX", "BROOKLYN",
  "BUFFALO", "CARMEL", "CLIFTON SPRINGS", "CORTLAND", "DIX HILLS", "EAST MEADOW", "ELMHURST",
  "ELMIRA", "FAR ROCKAWAY", "HARRIS", "HUNTINGTON", "JAMAICA", "JAMESTOWN", "KATONAH", "KINGSTON",
  "MANHASSET", "MIDDLETOWN", "MOUNT KISCO", "MOUNT VERNON", "NEW HAMPTON", "NEW HYDE PARK", "NEW YORK",
  "NYACK", "OCEANSIDE", "OGDENSBURG", "OLEAN", "ORANGEBURG", "OSWEGO", "PATCHOGUE", "PORT JEFFERSON",
  "PORT JERVIS", "QUEENS VILLAGE", "ROCHESTER", "ROCKVILLE CENTRE", "ROME", "SARANAC LAKE", "SARATOGA SPRINGS",
  "SLEEPY HOLLOW", "SMITHTOWN", "STATEN ISLAND", "STONY BROOK", "SYRACUSE", "TROY", "UTICA", "VALHALLA",
  "WARSAW", "WEST BRENTWOOD", "WEST SENECA", "YONKERS"
];

// DATA 95 FACILITY
const healthcareFacilities = [
  { name: "ALBANY MEDICAL CENTER HOSPITAL", city: "ALBANY", address: "ALBANY, NY", website: "https://www.albanymed.org/", image: "albany.jfif" },
  { name: "CAPITAL DISTRICT PSYCH CENTER", city: "ALBANY", address: "ALBANY, NY", website: "https://omh.ny.gov/omhweb/facilities/cdpc/", image: "albany2.jfif" },
  { name: "BRUNSWICK HOSPITAL CENTER, INC.", city: "AMITYVILLE", address: "AMITYVILLE, NY", website: "https://www.brunswickhospitalcenter.org/", image: "brunswick.jfif" },
  { name: "SOUTH OAKS HOSP", city: "AMITYVILLE", address: "AMITYVILLE, NY", website: "https://southoaks.northwell.edu/", image: "south.jfif" },
  { name: "ST MARY'S HEALTHCARE", city: "AMSTERDAM", address: "AMSTERDAM, NY", website: "https://www.smha.org/", image: "mary.jfif" },
  { name: "AUBURN COMMUNITY HOSPITAL", city: "AUBURN", address: "AUBURN, NY", website: "https://www.auburnhospital.org/", image: "auburn.jfif" },
  { name: "NEW YORK CITY CHILDRENS PSYCH CENTER", city: "BELLEROSE", address: "BELLEROSE, NY", website: "https://omh.ny.gov/omhweb/facilities/nyccc/", image: "nyc.jfif" },
  { name: "UNITED HEALTH SERVICES HOSPITALS, INC", city: "BINGHAMTON", address: "BINGHAMTON, NY", website: "https://www.nyuhs.org/", image: "uhs.jfif" },
  { name: "GREATER BINGHAMTON HEALTH CENTER", city: "BINGHAMTON", address: "BINGHAMTON, NY", website: "https://omh.ny.gov/omhweb/facilities/bipc/", image: "greater.jfif" },
  { name: "BRONXCARE HOSPITAL CENTER", city: "BRONX", address: "BRONX, NY", website: "https://www.bronxcare.org/", image: "bron.jfif" },
  { name: "MONTEFIORE MEDICAL CENTER", city: "BRONX", address: "BRONX, NY", website: "https://montefioreeinstein.org/", image: "montefiore.jfif" },
  { name: "LINCOLN MEDICAL & MENTAL HEALTH CENTER", city: "BRONX", address: "BRONX, NY", website: "https://www.nychealthandhospitals.org/lincoln/", image: "lincoln.jfif" },
  { name: "JACOBI MEDICAL CENTER", city: "BRONX", address: "BRONX, NY", website: "https://www.nychealthandhospitals.org/jacobi/", image: "jacobi.jfif" },
  { name: "ST BARNABAS HOSPITAL", city: "BRONX", address: "BRONX, NY", website: "https://www.sbhny.org/", image: "barnabas.jfif" },
  { name: "BRONX PSYCHIATRIC CENTER", city: "BRONX", address: "BRONX, NY", website: "https://omh.ny.gov/omhweb/facilities/brpc/", image: "mental.jfif" },
  { name: "MAIMONIDES MEDICAL CENTER", city: "BROOKLYN", address: "BROOKLYN, NY", website: "https://maimo.org/", image: "maimonides.jfif" },
  { name: "SOUTH BROOKLYN HEALTH", city: "BROOKLYN", address: "BROOKLYN, NY", website: "https://www.nychealthandhospitals.org/coney-island/", image: "sbh.jfif" },
  { name: "KINGS COUNTY HOSPITAL CENTER", city: "BROOKLYN", address: "BROOKLYN, NY", website: "https://www.nychealthandhospitals.org/kingscounty/", image: "king.jfif" },
  { name: "BROOKDALE HOSPITAL MEDICAL CENTER", city: "BROOKLYN", address: "BROOKLYN, NY", website: "https://onebrooklynhealth.org/", image: "dale.jfif" },
  { name: "WOODHULL MEDICAL & MENTAL HEALTH CENTER", city: "BROOKLYN", address: "BROOKLYN, NY", website: "https://www.nychealthandhospitals.org/woodhull/", image: "woodhull.jfif" },
  { name: "KINGSBORO PSYCHIATRIC HOSPITAL", city: "BROOKLYN", address: "BROOKLYN, NY", website: "https://omh.ny.gov/omhweb/facilities/kbpc/", image: "boro.jfif" },
  { name: "ERIE COUNTY MEDICAL CENTER", city: "BUFFALO", address: "BUFFALO, NY", website: "https://www.ecmc.edu/", image: "ecmc.jfif" },
  { name: "BRYLIN HOSP", city: "BUFFALO", address: "BUFFALO, NY", website: "https://www.brylin.com/", image: "brylin.jfif" },
  { name: "BUFFALO PSYCHIATRIC CENTER", city: "BUFFALO", address: "BUFFALO, NY", website: "https://omh.ny.gov/omhweb/facilities/bupc/", image: "buffalo.jfif" },
  { name: "PUTNAM HOSPITAL CENTER", city: "CARMEL", address: "CARMEL, NY", website: "https://www.nuvancehealth.org/locations/putnam-hospital", image: "putnam.jfif" },
  { name: "CLIFTON SPRINGS HOSPITAL AND CLINIC", city: "CLIFTON SPRINGS", address: "CLIFTON SPRINGS, NY", website: "https://www.rochesterregional.org/locations/hospitals/clifton", image: "clif.jfif" },
  { name: "GUTHRIE CORTLAND REGIONAL MEDICAL CENTER", city: "CORTLAND", address: "CORTLAND, NY", website: "https://www.guthrie.org/locations/guthrie-cortland-medical-center", image: "guthrie.jfif" },
  { name: "SAGAMORE CHILDREN'S PSYCHIATRIC CENTER", city: "DIX HILLS", address: "DIX HILLS, NY", website: "https://omh.ny.gov/omhweb/facilities/scpc/", image: "saga.jfif" },
  { name: "NASSAU UNIVERSITY MEDICAL CENTER", city: "EAST MEADOW", address: "EAST MEADOW, NY", website: "https://www.numc.edu/", image: "nassau.jfif" },
  { name: "ELMHURST HOSPITAL CENTER", city: "ELMHURST", address: "ELMHURST, NY", website: "https://www.nychealthandhospitals.org/elmhurst/", image: "elm.jfif" },
  { name: "ARNOT OGDEN MEDICAL CENTER", city: "ELMIRA", address: "ELMIRA, NY", website: "https://www.arnothealth.org/", image: "arnot.jfif" },
  { name: "ELMIRA PSYCH CENTER", city: "ELMIRA", address: "ELMIRA, NY", website: "https://omh.ny.gov/omhweb/facilities/elpc/", image: "elmira.jfif" },
  { name: "ST JOHN'S EPISCOPAL HOSPITAL AT SOUTH SHORE", city: "FAR ROCKAWAY", address: "FAR ROCKAWAY, NY", website: "https://www.sjehealthcare.org/", image: "john.jfif" },
  { name: "GARNET HEALTH MEDICAL CENTER CATSKILLS", city: "HARRIS", address: "HARRIS, NY", website: "https://www.garnethealth.org/", image: "garnet.jfif" },
  { name: "NS/LIJ HS HUNTINGTON HOSPITAL", city: "HUNTINGTON", address: "HUNTINGTON, NY", website: "https://www.northwell.edu/find-care/locations/huntington-hospital", image: "huntington.jfif" },
  { name: "JAMAICA HOSPITAL MEDICAL CENTER", city: "JAMAICA", address: "JAMAICA, NY", website: "https://www.jamaicahospital.org/", image: "jamaica.jfif" },
  { name: "QUEENS HOSPITAL CENTER", city: "JAMAICA", address: "JAMAICA, NY", website: "https://www.nychealthandhospitals.org/queens/", image: "queens.jfif" },
  { name: "UPMC CHAUTAUQUA AT WCA", city: "JAMESTOWN", address: "JAMESTOWN, NY", website: "https://www.upmc.com/locations/hospitals/chautauqua", image: "upmc.jfif" },
  { name: "FOUR WINDS", city: "KATONAH", address: "KATONAH, NY", website: "https://www.fourwindshospital.com/", image: "four.jfif" },
  { name: "HEALTHALLIANCE HOSPITAL MARYS AVENUE CAMPUS", city: "KINGSTON", address: "KINGSTON, NY", website: "https://www.wmchealth.org/locations/healthalliance-hospital-mary-s-avenue", image: "health.jfif" },
  { name: "NORTH SHORE UNIVERSITY HOSPITAL", city: "MANHASSET", address: "MANHASSET, NY", website: "https://www.northwell.edu/find-care/locations/north-shore-university-hospital", image: "north.jfif" },
  { name: "GARNET HEALTH MEDICAL CENTER", city: "MIDDLETOWN", address: "MIDDLETOWN, NY", website: "https://www.garnethealth.org/", image: "garr.jfif" },
  { name: "NORTHERN WESTCHESTER HOSPITAL", city: "MOUNT KISCO", address: "MOUNT KISCO, NY", website: "https://www.northwell.edu/find-care/locations/northern-westchester-hospital", image: "west.jfif" },
  { name: "MONTEFIORE MOUNT VERNON HOSPITAL", city: "MOUNT VERNON", address: "MOUNT VERNON, NY", website: "https://www.montefiorехealthsystem.org/mount-vernon.html", image: "vernon.jfif" },
  { name: "MID HUDSON FORENSIC PSYCHIATRIC CTR", city: "NEW HAMPTON", address: "NEW HAMPTON, NY", website: "https://omh.ny.gov/omhweb/facilities/mhpc/", image: "forensic.jfif" },
  { name: "LONG ISLAND JEWISH MEDICAL CENTER", city: "NEW HYDE PARK", address: "NEW HYDE PARK, NY", website: "https://www.northwell.edu/find-care/locations/long-island-jewish-medical-center", image: "long.jfif" },
  { name: "MOUNT SINAI HOSPITAL", city: "NEW YORK", address: "NEW YORK, NY", website: "https://www.mountsinai.org/", image: "mount.jfif" },
  { name: "MOUNT SINAI WEST", city: "NEW YORK", address: "NEW YORK, NY", website: "https://www.mountsinai.org/locations/west", image: "sinai.jfif" },
  { name: "NEW YORK-PRESBYTERIAN HOSPITAL", city: "NEW YORK", address: "NEW YORK, NY", website: "https://www.nyp.org/", image: "new.jfif" },
  { name: "LENOX HILL HOSPITAL", city: "NEW YORK", address: "NEW YORK, NY", website: "https://www.northwell.edu/find-care/locations/lenox-hill-hospital", image: "lenox.jfif" },
  { name: "MOUNT SINAI BETH ISRAEL", city: "NEW YORK", address: "NEW YORK, NY", website: "https://www.mountsinai.org/locations/msbi", image: "beth.jfif" },
  { name: "METROPOLITAN HOSPITAL CENTER", city: "NEW YORK", address: "NEW YORK, NY", website: "https://www.nychealthandhospitals.org/metropolitan/", image: "metro.jfif" },
  { name: "BELLEVUE HOSPITAL CENTER", city: "NEW YORK", address: "NEW YORK, NY", website: "https://www.nychealthandhospitals.org/bellevue/", image: "belle.jfif" },
  { name: "NYU LANGONE HOSPITALS", city: "NEW YORK", address: "NEW YORK, NY", website: "https://nyulangone.org/", image: "nyu.jfif" },
  { name: "HARLEM HOSPITAL CENTER", city: "NEW YORK", address: "NEW YORK, NY", website: "https://www.nychealthandhospitals.org/harlem/", image: "center.jfif" },
  { name: "NEW YORK STATE PSYCHIATRIC INSTITUTE", city: "NEW YORK", address: "NEW YORK, NY", website: "https://nyspi.org/", image: "state.jfif" },
  { name: "GRACIE SQUARE HOSP", city: "NEW YORK", address: "NEW YORK, NY", website: "https://www.nygsh.org/", image: "gracie.jfif" },
  { name: "MANHATTAN PSYCHIATRIC CENTER", city: "NEW YORK", address: "NEW YORK, NY", website: "https://omh.ny.gov/omhweb/facilities/mapc/", image: "manhattan.jfif" },
  { name: "KIRBY FORENSIC PSYCHIATRIC CENTER", city: "NEW YORK", address: "NEW YORK, NY", website: "https://omh.ny.gov/omhweb/facilities/krpc/", image: "kirby.jfif" },
  { name: "NYACK HOSPITAL", city: "NYACK", address: "NYACK, NY", website: "https://www.montefiorenyack.org/", image: "nyack.jfif" },
  { name: "MOUNT SINAI SOUTH NASSAU", city: "OCEANSIDE", address: "OCEANSIDE, NY", website: "https://www.mountsinai.org/locations/south-nassau", image: "mssn.jfif" },
  { name: "ST LAWRENCE PSYCHIATRIC CENTER", city: "OGDENSBURG", address: "OGDENSBURG, NY", website: "https://omh.ny.gov/omhweb/facilities/slpc/", image: "lawrence.jfif" },
  { name: "CLAXTON-HEPBURN MEDICAL CENTER", city: "OGDENSBURG", address: "OGDENSBURG, NY", website: "https://www.claxtonhepburn.org/", image: "claxton.jfif" },
  { name: "OLEAN GENERAL HOSPITAL", city: "OLEAN", address: "OLEAN, NY", website: "https://www.brmc-ogh.org/", image: "olean.jfif" },
  { name: "ROCKLAND PSYCH CTR", city: "ORANGEBURG", address: "ORANGEBURG, NY", website: "https://omh.ny.gov/omhweb/facilities/ropc/", image: "rockland.jfif" },
  { name: "ROCKLAND CHILDREN'S PSYCHIATRIC CENTER", city: "ORANGEBURG", address: "ORANGEBURG, NY", website: "https://omh.ny.gov/omhweb/facilities/rcpc/", image: "children.jfif" },
  { name: "OSWEGO HOSPITAL", city: "OSWEGO", address: "OSWEGO, NY", website: "https://www.oswegohealth.org/", image: "oswego.jfif" },
  { name: "LONG ISLAND COMMUNITY HOSPITAL", city: "PATCHOGUE", address: "PATCHOGUE, NY", website: "https://nyulangone.org/locations/nyu-langone-hospital-suffolk", image: "island.jfif" },
  { name: "JOHN T MATHER MEMORIAL HOSPITAL OF PORT JEFFERSON", city: "PORT JEFFERSON", address: "PORT JEFFERSON, NY", website: "https://www.matherhospital.org/", image: "mather.jfif" },
  { name: "BON SECOURS COMMUNITY HOSPITAL", city: "PORT JERVIS", address: "PORT JERVIS, NY", website: "https://www.bonsecourscommunityhosp.org/", image: "bon.jfif" },
  { name: "CREEDMOOR PSYCHIATRIC CENTER", city: "QUEENS VILLAGE", address: "QUEENS VILLAGE, NY", website: "https://omh.ny.gov/omhweb/facilities/crpc/", image: "creedmoor.jfif" },
  { name: "ROCHESTER GENERAL HOSPITAL", city: "ROCHESTER", address: "ROCHESTER, NY", website: "https://www.rochesterregional.org/locations/rochester-general-hospital", image: "roche.jfif" },
  { name: "UNITY HOSPITAL", city: "ROCHESTER", address: "ROCHESTER, NY", website: "https://www.rochesterregional.org/locations/unity-hospital", image: "unity.jfif" },
  { name: "STRONG MEMORIAL HOSPITAL", city: "ROCHESTER", address: "ROCHESTER, NY", website: "https://www.urmc.rochester.edu/strong-memorial.aspx", image: "strong.jfif" },
  { name: "ROCHESTER PSYCHIATRIC CENTER", city: "ROCHESTER", address: "ROCHESTER, NY", website: "https://omh.ny.gov/omhweb/facilities/ropc/", image: "ester.jfif" },
  { name: "MERCY MEDICAL CENTER", city: "ROCKVILLE CENTRE", address: "ROCKVILLE CENTRE, NY", website: "https://www.catholichealthli.org/mercy-hospital", image: "mercy.jfif" },
  { name: "ROME MEMORIAL HOSPITAL, INC", city: "ROME", address: "ROME, NY", website: "https://www.romehealth.org/", image: "rome.jfif" },
  { name: "ADIRONDACK MEDICAL CENTER - SARANAC LAKE", city: "SARANAC LAKE", address: "SARANAC LAKE, NY", website: "https://www.adirondackhealth.org/", image: "adirondack.jfif" },
  { name: "FOUR WINDS OF SARATOGA", city: "SARATOGA SPRINGS", address: "SARATOGA SPRINGS, NY", website: "https://www.fourwindshospital.com/about_four_winds/saratoga/index.html", image: "saratoga.jfif" },
  { name: "PHELPS HOSPITAL", city: "SLEEPY HOLLOW", address: "SLEEPY HOLLOW, NY", website: "https://phelps.northwell.edu/", image: "phelps.jfif" },
  { name: "ST CATHERINE OF SIENA HOSPITAL", city: "SMITHTOWN", address: "SMITHTOWN, NY", website: "https://www.catholichealthli.org/st-catherine-siena-hospital", image: "catherine.jfif" },
  { name: "RICHMOND UNIVERSITY MEDICAL CENTER", city: "STATEN ISLAND", address: "STATEN ISLAND, NY", website: "https://www.rumcsi.org/", image: "richmond.jfif" },
  { name: "STATEN ISLAND UNIVERSITY HOSPITAL", city: "STATEN ISLAND", address: "STATEN ISLAND, NY", website: "https://www.northwell.edu/find-care/locations/staten-island-university-hospital", image: "staten.jfif" },
  { name: "SOUTH BEACH PSYCHIATRIC CENTER", city: "STATEN ISLAND", address: "STATEN ISLAND, NY", website: "https://omh.ny.gov/omhweb/facilities/sbpc/", image: "sbpc.jfif" },
  { name: "SUNY/STONY BROOK UNIVERSITY HOSPITAL", city: "STONY BROOK", address: "STONY BROOK, NY", website: "https://www.stonybrookmedicine.edu/sbuh", image: "stony.jfif" },
  { name: "ST JOSEPH'S HOSPITAL HEALTH CENTER", city: "SYRACUSE", address: "SYRACUSE, NY", website: "https://www.sjhsyr.org/", image: "joseph.jfif" },
  { name: "UNIVERSITY HOSPITAL S U N Y HEALTH SCIENCE CENTER", city: "SYRACUSE", address: "SYRACUSE, NY", website: "https://www.upstate.edu/hospital/", image: "sunny.jfif" },
  { name: "HUTCHINGS PSYCHIATRIC CTR", city: "SYRACUSE", address: "SYRACUSE, NY", website: "https://omh.ny.gov/omhweb/facilities/hupc/", image: "hutchings.jfif" },
  { name: "SAMARITAN HOSPITAL OF TROY, NEW YORK", city: "TROY", address: "TROY, NY", website: "https://www.sphp.com/location/samaritan-hospital", image: "samaritan.jfif" },
  { name: "MOHAWK VALLEY PSYCHIATRIC CENTER", city: "UTICA", address: "UTICA, NY", website: "https://omh.ny.gov/omhweb/facilities/mvpc/", image: "mohawk.jfif" },
  { name: "WESTCHESTER MEDICAL CENTER", city: "VALHALLA", address: "VALHALLA, NY", website: "https://www.wmchealth.org/locations/westchester-medical-center", image: "westchester.jfif" },
  { name: "WYOMING COUNTY", city: "WARSAW", address: "WARSAW, NY", website: "https://www.wcchs.net/", image: "wyoming.jfif" },
  { name: "PILGRIM PSYCHIATRIC CENTER", city: "WEST BRENTWOOD", address: "WEST BRENTWOOD, NY", website: "https://omh.ny.gov/omhweb/facilities/pgpc/", image: "pilgrim.jfif" },
  { name: "WESTERN NY CHILDRENS PSYCHIATRIC CENTER", city: "WEST SENECA", address: "WEST SENECA, NY", website: "https://omh.ny.gov/omhweb/facilities/wcpc/", image: "wnyc.jfif" },
  { name: "ST JOSEPH'S MEDICAL CENTER", city: "YONKERS", address: "YONKERS, NY", website: "https://www.saintjosephs.org/", image: "yonkers.jfif" }
];

// DATA DARI BACKEND
let kpiData = {
  SMD: [],
  FAPH30: [],
  FAPH7: [],
  MedCont: []
};

let nyAverages = { SMD: 0, FAPH30: 0, FAPH7: 0, MedCont: 0 };
let measurementPeriods = {};
let readmDistributionData = null;
let readmPieChart = null;

// ERROR HELPER
function showDataError(msg) {
  const grid = document.getElementById('mpCardsGrid');
  if (grid) grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:24px;color:#e53e3e;font-weight:600;">${msg}</div>`;
}

// RENDER MEASUREMENT PERIOD CARDS
function renderMpCards(averages, periods, source) {
  const grid = document.getElementById('mpCardsGrid');
  if (!grid) return;

  const kpiConfigs = [
    { avgKey: 'SMD',     periodKey: 'smd',     label: 'SMD',     color: '#6C27D9' },
    { avgKey: 'FAPH 30', periodKey: 'faph',    label: 'FAPH 30', color: '#8B3EE6' },
    { avgKey: 'FAPH 7',  periodKey: 'faph',    label: 'FAPH 7',  color: '#A855F7' },
    { avgKey: 'MedCont', periodKey: 'medcont', label: 'MedCont', color: '#7C3AED' },
    { avgKey: 'READM',   periodKey: 'readm',   label: 'READM',   color: '#5B21B6' }
  ];

  function fmtRange(range) {
    if (!range) return '--';
    const parts = range.split(' to ');
    if (parts.length !== 2) return range;
    function fmtDate(d) {
      const dt = new Date(d);
      if (isNaN(dt)) return d;
      return dt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
    return `${fmtDate(parts[0])} – ${fmtDate(parts[1])}`;
  }

  function lastRecorded(range) {
    if (!range) return '--';
    const parts = range.split(' to ');
    const d = new Date(parts[parts.length - 1]);
    if (isNaN(d)) return '--';
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  grid.innerHTML = kpiConfigs.map(cfg => {
    const avgVal = averages[cfg.avgKey] !== undefined ? averages[cfg.avgKey] : '--';
    const period  = periods[cfg.periodKey] || null;

    return `
      <div class="mp-card" style="border-top-color: ${cfg.color};">
        <div class="mp-card-inner">
          <div class="mp-card-kpi" style="color:${cfg.color};">${cfg.label}</div>
          <div class="mp-card-value">${avgVal}<span> %</span></div>
          <div class="mp-card-divider"></div>
          <div>
            <div class="mp-card-label">Measurement Period</div>
            <div class="mp-card-period">${period ? fmtRange(period.range) : '--'}</div>
            ${period ? `<span class="mp-card-note">${period.note}</span>` : ''}
          </div>
          <div>
            <div class="mp-card-label">Last Recorded</div>
            <div class="mp-card-period">${period ? lastRecorded(period.range) : '--'}</div>
          </div>
          <div class="mp-card-source">${source || 'CMS.gov'}</div>
        </div>
      </div>
    `;
  }).join('');
}

// FETCH READM DISTRIBUTION
async function fetchReadmDistribution() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ny-readm-analysis`, {
      headers: { 'X-API-KEY': API_KEY }
    });
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.pie_chart_data) {
        readmDistributionData = data;
        createReadmPieChart(data.pie_chart_data);
        return;
      }
    }
    console.warn("Could not fetch READM distribution data.");
  } catch (error) {
    console.error("Error fetching READM distribution:", error);
  }
}

function createReadmPieChart(data) {
  const ctx = document.getElementById('readmPieChart');
  if (!ctx) return;

  const filteredData = data.filter(item => item.percentage > 0);
  const labels = filteredData.map(item => item.name);
  const percentages = filteredData.map(item => item.percentage);
  const colors = filteredData.map(item => item.color);
  const counts = filteredData.map(item => item.y);

  if (readmPieChart) readmPieChart.destroy();

  readmPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: percentages,
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: '#fff',
        hoverOffset: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw || 0;
              const index = context.dataIndex;
              const count = counts[index] || 0;
              return `${label}: ${value}% (${count} facilities)`;
            }
          }
        }
      }
    }
  });

  createCustomLegend(filteredData);
}

function createCustomLegend(data) {
  const legendContainer = document.getElementById('readmLengend');
  if (!legendContainer) return;

  legendContainer.innerHTML = data.map(item => `
    <div class="legend-item">
      <div class="legend-color" style="background-color: ${item.color}"></div>
      <span class="legend-text">${item.name}</span>
      <span class="legend-percent">(${item.percentage}%)</span>
    </div>
  `).join('');
}

// FETCH ALL DATA FROM BACKEND
async function fetchAllData() {
  try {
    // 1. Fetch NY Averages dari /api/ny-averages
    const averagesResponse = await fetch(`${API_BASE_URL}/api/ny-averages`, {
      headers: { 'X-API-KEY': API_KEY }
    });

    if (averagesResponse.ok) {
      const averagesData = await averagesResponse.json();
      if (averagesData.success && averagesData.data) {
        measurementPeriods = averagesData.data.metadata?.measurement_periods || {};

        const avg = averagesData.data.averages;
        nyAverages.SMD    = avg['SMD']    || 0;
        nyAverages.FAPH30 = avg['FAPH 30'] || 0;
        nyAverages.FAPH7  = avg['FAPH 7']  || 0;
        nyAverages.MedCont = avg['MedCont'] || 0;

        renderMpCards(
          averagesData.data.averages,
          averagesData.data.metadata?.measurement_periods || {},
          averagesData.data.metadata?.source || 'CMS.gov'
        );
      }
    } else {
      console.warn("Could not fetch /api/ny-averages");
      showDataError("Gagal memuat data rata-rata. Silakan refresh halaman.");
    }

    // 2. Fetch KPI per city dari /api/kpi/all
    const kpiAllResponse = await fetch(`${API_BASE_URL}/api/kpi/all`, {
      headers: { 'X-API-KEY': API_KEY }
    });

    if (kpiAllResponse.ok) {
      const kpiAllData = await kpiAllResponse.json();
      if (kpiAllData.success && kpiAllData.data) {
        for (let i = 0; i < 57; i++) {
          kpiData.SMD[i]    = 0;
          kpiData.FAPH30[i] = 0;
          kpiData.FAPH7[i]  = 0;
          kpiData.MedCont[i] = 0;
        }

        for (const [city, facilities] of Object.entries(kpiAllData.data)) {
          const cityIndex = allCityNames.findIndex(c => c === city);
          if (cityIndex !== -1 && facilities.length > 0) {
            let sumSMD = 0, sumFAPH30 = 0, sumFAPH7 = 0, sumMedCont = 0;
            const count = facilities.length;

            facilities.forEach(facility => {
              sumSMD    += facility.SMD      || 0;
              sumFAPH30 += facility['FAPH 30'] || 0;
              sumFAPH7  += facility['FAPH 7']  || 0;
              sumMedCont += facility.MedCont  || 0;
            });

            kpiData.SMD[cityIndex]    = parseFloat((sumSMD    / count).toFixed(1));
            kpiData.FAPH30[cityIndex] = parseFloat((sumFAPH30 / count).toFixed(1));
            kpiData.FAPH7[cityIndex]  = parseFloat((sumFAPH7  / count).toFixed(1));
            kpiData.MedCont[cityIndex] = parseFloat((sumMedCont / count).toFixed(1));
          }
        }
      }
    } else {
      console.warn("Could not fetch /api/kpi/all");
    }

    // 3. Render semua chart utama
    refreshAllCharts();

    // 4. Fetch READM distribution terpisah
    await fetchReadmDistribution();

  } catch (error) {
    console.error("Error fetching data:", error);
    showDataError("Gagal memuat data. Silakan refresh halaman.");
  }
}

function refreshAllCharts() {
  if (typeof updateChart1 === 'function') updateChart1();
  if (typeof updateHighestChart === 'function') updateHighestChart();
  if (typeof updateLowestChart === 'function') updateLowestChart();
}

function getDataForKPI(kpi) {
  if (kpi === 'ALL') {
    return allCityNames.map((_, idx) => {
      const sum = parseFloat(kpiData.SMD[idx])    + parseFloat(kpiData.FAPH30[idx]) +
                  parseFloat(kpiData.FAPH7[idx])  + parseFloat(kpiData.MedCont[idx]);
      return parseFloat((sum / 4).toFixed(1));
    });
  }
  return kpiData[kpi];
}

function getNYAvgValue(kpi) {
  if (kpi === 'ALL') {
    const sum = parseFloat(nyAverages.SMD)    + parseFloat(nyAverages.FAPH30) +
                parseFloat(nyAverages.FAPH7)  + parseFloat(nyAverages.MedCont);
    return parseFloat((sum / 4).toFixed(1));
  }
  return nyAverages[kpi];
}

function getTop10(kpi) {
  const data = getDataForKPI(kpi).map((v, i) => ({ name: allCityNames[i], value: parseFloat(v) }));
  return data.sort((a, b) => b.value - a.value).slice(0, 10);
}

function getBottom10(kpi) {
  const data = getDataForKPI(kpi).map((v, i) => ({ name: allCityNames[i], value: parseFloat(v) }));
  return data.filter(d => d.value > 0).sort((a, b) => a.value - b.value).slice(0, 10);
}

// MEASUREMENT PERIOD DISPLAY
let currentDisplayedKpi = 'ALL';

function updateMeasurementPeriodDisplay(kpiKey, containerId = 'cityChart') {
  let periodContainer = document.getElementById(`measurement-period-${containerId}`);

  if (!periodContainer) {
    const canvas = document.getElementById(containerId);
    if (canvas && canvas.parentNode) {
      const newDiv = document.createElement('div');
      newDiv.id = `measurement-period-${containerId}`;
      newDiv.className = 'measurement-period';
      canvas.parentNode.parentNode.insertBefore(newDiv, canvas.parentNode.nextSibling);
      periodContainer = newDiv;
    }
  }

  if (!periodContainer) return;

  const kpiToMetadataKey = {
    'ALL':    null,
    'SMD':    'smd',
    'FAPH30': 'faph',
    'FAPH7':  'faph',
    'MedCont':'medcont'
  };

  const metaKey = kpiToMetadataKey[kpiKey];
  if (metaKey && measurementPeriods[metaKey]) {
    const period = measurementPeriods[metaKey];
    periodContainer.innerHTML = `<strong>Measurement Period:</strong> ${period.range} <span style="font-size: 10px;">(${period.note})</span>`;
  } else if (kpiKey === 'ALL') {
    periodContainer.innerHTML = `<strong>Note:</strong> Measurement periods vary by KPI. Select a specific KPI for details.`;
  } else {
    periodContainer.innerHTML = '';
  }
}

// CHART City Level KPIs + Benchmark
let currentPage = 1, citiesPerPage = 10, totalPages = Math.ceil(57 / citiesPerPage), chart1, currentKPI = 'ALL';

function updateChart1() {
  const start  = (currentPage - 1) * citiesPerPage;
  const end    = start + citiesPerPage;
  const labels = allCityNames.slice(start, end);
  const data   = getDataForKPI(currentKPI).slice(start, end);
  const nyAvg  = getNYAvgValue(currentKPI);

  document.getElementById('nyAvgDisplay').innerHTML    = `NY State Avg: ${nyAvg}`;
  document.getElementById('pageIndicator').innerHTML   = `Page ${currentPage} / ${totalPages}`;
  document.getElementById('prevBtn').disabled          = currentPage === 1;
  document.getElementById('nextBtn').disabled          = currentPage === totalPages;

  if (chart1) chart1.destroy();

  const ctx = document.getElementById('cityChart').getContext('2d');

  const canvas = document.getElementById('cityChart');
  const container = canvas.parentElement;
  const containerWidth = container.clientWidth;
  canvas.style.width = `${containerWidth}px`;
  canvas.style.height = '400px';
  canvas.width = containerWidth;
  canvas.height = 400;

  chart1 = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: currentKPI === 'ALL' ? 'Average of All KPIs' : currentKPI,
          data: data.map(v => parseFloat(v)),
          backgroundColor: 'rgba(108,39,217,0.7)',
          borderColor: '#6C27D9',
          borderWidth: 2,
          borderRadius: 6
        },
        {
          label: 'NY State Benchmark',
          data: Array(labels.length).fill(parseFloat(nyAvg)),
          type: 'line',
          borderColor: '#FF6B6B',
          borderWidth: 3,
          borderDash: [8, 6],
          fill: false,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 100,
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 15, padding: 15 } },
        tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}%` } }
      },
      scales: {
        y: { title: { display: true, text: 'Percentage (%)', font: { size: 12 } }, min: 0, max: 100, ticks: { stepSize: 10, callback: (v) => v + '%', font: { size: 11 } } },
        x: { ticks: { maxRotation: 0, minRotation: 0, font: { size: 11 } } }
      }
    }
  });

  updateMeasurementPeriodDisplay(currentKPI, 'cityChart');
  setTimeout(() => lucide.createIcons(), 100);
}

window.changeKPI = function() {
  currentKPI = document.getElementById('kpiSelect').value;
  currentDisplayedKpi = currentKPI;
  currentPage = 1;
  updateChart1();
};

window.previousPage = function() {
  if (currentPage > 1) { currentPage--; updateChart1(); }
};

window.nextPage = function() {
  if (currentPage < totalPages) { currentPage++; updateChart1(); }
};

// CHART Rankings 10 Highest
let chartHighest, currentKPIHighest = 'ALL';

function updateHighestChart() {
  currentKPIHighest = document.getElementById('kpiSelectHighest').value;
  const top10  = getTop10(currentKPIHighest);
  const nyAvg  = getNYAvgValue(currentKPIHighest);

  document.getElementById('nyAvgHighestDisplay').innerHTML = `NY State Avg: ${nyAvg}`;

  if (chartHighest) chartHighest.destroy();

  const ctx = document.getElementById('highestChart').getContext('2d');

  const canvas = document.getElementById('highestChart');
  const container = canvas.parentElement;
  const containerWidth = container.clientWidth;
  canvas.style.width = `${containerWidth}px`;
  canvas.style.height = '400px';
  canvas.width = containerWidth;
  canvas.height = 400;

  chartHighest = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: top10.map(c => c.name),
      datasets: [
        {
          label: currentKPIHighest === 'ALL' ? 'Average of All KPIs' : currentKPIHighest,
          data: top10.map(c => c.value),
          backgroundColor: 'rgba(108,39,217,0.7)',
          borderColor: '#6C27D9',
          borderWidth: 2,
          borderRadius: 6
        },
        {
          label: 'NY State Benchmark',
          data: Array(top10.length).fill(parseFloat(nyAvg)),
          type: 'line',
          borderColor: '#FF6B6B',
          borderWidth: 3,
          borderDash: [8, 6],
          fill: false,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 100,
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 15, padding: 15 } },
        tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}%` } }
      },
      scales: {
        y: { title: { display: true, text: 'Percentage (%)', font: { size: 12 } }, min: 0, max: 100, ticks: { stepSize: 10, callback: (v) => v + '%', font: { size: 11 } } },
        x: { ticks: { maxRotation: 0, minRotation: 0, font: { size: 11 } } }
      }
    }
  });

  updateMeasurementPeriodDisplay(currentKPIHighest, 'highestChart');
  setTimeout(() => lucide.createIcons(), 100);
}

window.updateHighestChart = updateHighestChart;

// CHART Rankings 10 Lowest
let chartLowest, currentKPILowest = 'ALL';

function updateLowestChart() {
  currentKPILowest = document.getElementById('kpiSelectLowest').value;
  const bottom10 = getBottom10(currentKPILowest);
  const nyAvg    = getNYAvgValue(currentKPILowest);

  document.getElementById('nyAvgLowestDisplay').innerHTML = `NY State Avg: ${nyAvg}`;

  if (chartLowest) chartLowest.destroy();

  const ctx = document.getElementById('lowestChart').getContext('2d');

  const canvas = document.getElementById('lowestChart');
  const container = canvas.parentElement;
  const containerWidth = container.clientWidth;
  canvas.style.width = `${containerWidth}px`;
  canvas.style.height = '400px';
  canvas.width = containerWidth;
  canvas.height = 400;

  chartLowest = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: bottom10.map(c => c.name),
      datasets: [
        {
          label: currentKPILowest === 'ALL' ? 'Average of All KPIs' : currentKPILowest,
          data: bottom10.map(c => c.value),
          backgroundColor: 'rgba(108,39,217,0.7)',
          borderColor: '#6C27D9',
          borderWidth: 2,
          borderRadius: 6
        },
        {
          label: 'NY State Benchmark',
          data: Array(bottom10.length).fill(parseFloat(nyAvg)),
          type: 'line',
          borderColor: '#FF6B6B',
          borderWidth: 3,
          borderDash: [8, 6],
          fill: false,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 100,
      plugins: {
        legend: { position: 'top', labels: { boxWidth: 15, padding: 15 } },
        tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.raw}%` } }
      },
      scales: {
        y: { title: { display: true, text: 'Percentage (%)', font: { size: 12 } }, min: 0, max: 100, ticks: { stepSize: 10, callback: (v) => v + '%', font: { size: 11 } } },
        x: { ticks: { maxRotation: 0, minRotation: 0, font: { size: 11 } } }
      }
    }
  });

  updateMeasurementPeriodDisplay(currentKPILowest, 'lowestChart');
  setTimeout(() => lucide.createIcons(), 100);
}

window.updateLowestChart = updateLowestChart;

// SPECIFIC CITY FUNCTIONS
let selectedCity = null;
let cityOptions = [...allCityNames];

function renderCityOptions(filter = '') {
  const filtered = cityOptions.filter(city => city.toLowerCase().includes(filter.toLowerCase()));
  const container = document.getElementById('cityOptionsList');
  container.innerHTML = filtered.map(city => `<div class="select-option" onclick="selectCityOption('${city}')">${city}</div>`).join('');
  if (filtered.length === 0) {
    container.innerHTML = '<div class="select-option" style="color: #888;">No cities found</div>';
  }
}

window.toggleSelect = function() {
  const items    = document.getElementById('selectItems');
  const selected = document.querySelector('.select-selected');
  items.classList.toggle('show');
  selected.classList.toggle('active');
  if (items.classList.contains('show')) {
    document.getElementById('citySearchInput').value = '';
    renderCityOptions();
    document.getElementById('citySearchInput').focus();
  }
};

window.filterCities = function() {
  const searchTerm = document.getElementById('citySearchInput').value;
  renderCityOptions(searchTerm);
};

window.selectCityOption = function(cityName) {
  selectedCity = cityName;
  document.getElementById('selectedCityText').innerText = cityName;
  document.getElementById('selectItems').classList.remove('show');
  document.querySelector('.select-selected').classList.remove('active');
  document.getElementById('goToCityBtn').style.display = 'inline-block';
  setTimeout(() => lucide.createIcons(), 100);
};

window.goToCityPage = function() {
  if (selectedCity) {
    window.location.href = `${selectedCity.toLowerCase().replace(/ /g, '')}.html`;
  }
};

// HEALTHCARE FACILITIES
let healthcareCurrentPage = 1;
const healthcarePerPage = 8;
const healthcareTotalPages = Math.ceil(healthcareFacilities.length / healthcarePerPage);

function renderHealthcareGrid() {
  const start = (healthcareCurrentPage - 1) * healthcarePerPage;
  const end   = start + healthcarePerPage;
  const pageFacilities = healthcareFacilities.slice(start, end);

  const container = document.getElementById('healthcareGrid');
  container.innerHTML = pageFacilities.map(facility => {
    const hasImage  = facility.image && facility.image !== '' && facility.image !== '.jfif';
    const imagePath = `asset/${facility.image}`;

    return `
      <a href="${facility.website}" target="_blank" class="healthcare-card">
        <div class="healthcare-image">
          ${hasImage ?
            `<img src="${imagePath}" style="width: 100%; height: 100%; object-fit: contain; padding: 12px;" onerror="this.onerror=null; this.parentElement.innerHTML='<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'48\' height=\'48\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'1.5\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><path d=\'M22 12h-4l-3 9-4-18-3 9H2\'/></svg>'">` :
            `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9-4-18-3 9H2"/></svg>`
          }
        </div>
        <div class="healthcare-info">
          <div class="healthcare-name">${facility.name.substring(0, 35)}${facility.name.length > 35 ? '...' : ''}</div>
          <div class="healthcare-address">${facility.address}</div>
        </div>
      </a>
    `;
  }).join('');

  document.getElementById('healthcarePageIndicator').innerHTML = `Page ${healthcareCurrentPage} / ${healthcareTotalPages}`;
  document.getElementById('healthcarePrevBtn').disabled = healthcareCurrentPage === 1;
  document.getElementById('healthcareNextBtn').disabled = healthcareCurrentPage === healthcareTotalPages;
  setTimeout(() => lucide.createIcons(), 100);
}

window.prevHealthcarePage = function() {
  if (healthcareCurrentPage > 1) { healthcareCurrentPage--; renderHealthcareGrid(); }
};

window.nextHealthcarePage = function() {
  if (healthcareCurrentPage < healthcareTotalPages) { healthcareCurrentPage++; renderHealthcareGrid(); }
};

// INITIAL RENDER
setTimeout(() => {
  lucide.createIcons();
  fetchAllData();
  renderCityOptions();
  renderHealthcareGrid();
}, 500);

// Add window resize handler to ensure charts maintain aspect ratio
window.addEventListener('resize', function() {
  setTimeout(() => {
    if (chart1) chart1.resize();
    if (chartHighest) chartHighest.resize();
    if (chartLowest) chartLowest.resize();
    if (readmPieChart) readmPieChart.resize();
  }, 100);
});