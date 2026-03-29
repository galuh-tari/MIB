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

// ===== AUTHENTICATION =====
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

// ===== MODAL IPFQR =====
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

// ===== FLIP CARD =====
window.toggleFlip = function(card) {
  const allCards = document.querySelectorAll('.flip-card');
  if (card.classList.contains('flipped')) {
    card.classList.remove('flipped');
  } else {
    allCards.forEach(c => c.classList.remove('flipped'));
    card.classList.add('flipped');
  }
};

// ===== DATA 57 CITY ASLI =====
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

// ===== DATA 95 FACILITY (LENGKAP DENGAN WEBSITE DAN GAMBAR) =====
const healthcareFacilities = [
  // ALBANY
  { name: "ALBANY MEDICAL CENTER HOSPITAL", city: "ALBANY", address: "ALBANY, NY", website: "https://www.albanymed.org/", image: "albany.jfif" },
  { name: "CAPITAL DISTRICT PSYCH CENTER", city: "ALBANY", address: "ALBANY, NY", website: "https://omh.ny.gov/omhweb/facilities/cdpc/", image: "albany2.jfif" },
  
  // AMITYVILLE
  { name: "BRUNSWICK HOSPITAL CENTER, INC.", city: "AMITYVILLE", address: "AMITYVILLE, NY", website: "https://www.brunswickhospitalcenter.org/", image: "brunswick.jfif" },
  { name: "SOUTH OAKS HOSP", city: "AMITYVILLE", address: "AMITYVILLE, NY", website: "https://southoaks.northwell.edu/", image: "south.jfif" },
  
  // AMSTERDAM
  { name: "ST MARY'S HEALTHCARE", city: "AMSTERDAM", address: "AMSTERDAM, NY", website: "https://www.smha.org/", image: "mary.jfif" },
  
  // AUBURN
  { name: "AUBURN COMMUNITY HOSPITAL", city: "AUBURN", address: "AUBURN, NY", website: "https://www.auburnhospital.org/", image: "auburn.jfif" },
  
  // BELLEROSE
  { name: "NEW YORK CITY CHILDRENS PSYCH CENTER", city: "BELLEROSE", address: "BELLEROSE, NY", website: "https://omh.ny.gov/omhweb/facilities/nyccc/", image: "nyc.jfif" },
  
  // BINGHAMTON
  { name: "UNITED HEALTH SERVICES HOSPITALS, INC", city: "BINGHAMTON", address: "BINGHAMTON, NY", website: "https://www.nyuhs.org/", image: "uhs.jfif" },
  { name: "GREATER BINGHAMTON HEALTH CENTER", city: "BINGHAMTON", address: "BINGHAMTON, NY", website: "https://omh.ny.gov/omhweb/facilities/bipc/", image: "greater.jfif" },
  
  // BRONX
  { name: "BRONXCARE HOSPITAL CENTER", city: "BRONX", address: "BRONX, NY", website: "https://www.bronxcare.org/", image: "bron.jfif" },
  { name: "MONTEFIORE MEDICAL CENTER", city: "BRONX", address: "BRONX, NY", website: "https://montefioreeinstein.org/", image: "montefiore.jfif" },
  { name: "LINCOLN MEDICAL & MENTAL HEALTH CENTER", city: "BRONX", address: "BRONX, NY", website: "https://www.nychealthandhospitals.org/lincoln/", image: "lincoln.jfif" },
  { name: "JACOBI MEDICAL CENTER", city: "BRONX", address: "BRONX, NY", website: "https://www.nychealthandhospitals.org/jacobi/", image: "jacobi.jfif" },
  { name: "ST BARNABAS HOSPITAL", city: "BRONX", address: "BRONX, NY", website: "https://www.sbhny.org/", image: "barnabas.jfif" },
  { name: "BRONX PSYCHIATRIC CENTER", city: "BRONX", address: "BRONX, NY", website: "https://omh.ny.gov/omhweb/facilities/brpc/", image: "mental.jfif" },
  
  // BROOKLYN
  { name: "MAIMONIDES MEDICAL CENTER", city: "BROOKLYN", address: "BROOKLYN, NY", website: "https://maimo.org/", image: "maimonides.jfif" },
  { name: "SOUTH BROOKLYN HEALTH", city: "BROOKLYN", address: "BROOKLYN, NY", website: "https://www.nychealthandhospitals.org/coney-island/", image: "sbh.jfif" },
  { name: "KINGS COUNTY HOSPITAL CENTER", city: "BROOKLYN", address: "BROOKLYN, NY", website: "https://www.nychealthandhospitals.org/kingscounty/", image: "king.jfif" },
  { name: "BROOKDALE HOSPITAL MEDICAL CENTER", city: "BROOKLYN", address: "BROOKLYN, NY", website: "https://onebrooklynhealth.org/", image: "dale.jfif" },
  { name: "WOODHULL MEDICAL & MENTAL HEALTH CENTER", city: "BROOKLYN", address: "BROOKLYN, NY", website: "https://www.nychealthandhospitals.org/woodhull/", image: "woodhull.jfif" },
  { name: "KINGSBORO PSYCHIATRIC HOSPITAL", city: "BROOKLYN", address: "BROOKLYN, NY", website: "https://omh.ny.gov/omhweb/facilities/kbpc/", image: "boro.jfif" },
  
  // BUFFALO
  { name: "ERIE COUNTY MEDICAL CENTER", city: "BUFFALO", address: "BUFFALO, NY", website: "https://www.ecmc.edu/", image: "ecmc.jfif" },
  { name: "BRYLIN HOSP", city: "BUFFALO", address: "BUFFALO, NY", website: "https://www.brylin.com/", image: "brylin.jfif" },
  { name: "BUFFALO PSYCHIATRIC CENTER", city: "BUFFALO", address: "BUFFALO, NY", website: "https://omh.ny.gov/omhweb/facilities/bupc/", image: "buffalo.jfif" },
  
  // CARMEL
  { name: "PUTNAM HOSPITAL CENTER", city: "CARMEL", address: "CARMEL, NY", website: "https://www.nuvancehealth.org/locations/putnam-hospital", image: "putnam.jfif" },
  
  // CLIFTON SPRINGS
  { name: "CLIFTON SPRINGS HOSPITAL AND CLINIC", city: "CLIFTON SPRINGS", address: "CLIFTON SPRINGS, NY", website: "https://www.rochesterregional.org/locations/hospitals/clifton", image: "clif.jfif" },
  
  // CORTLAND
  { name: "GUTHRIE CORTLAND REGIONAL MEDICAL CENTER", city: "CORTLAND", address: "CORTLAND, NY", website: "https://www.guthrie.org/locations/guthrie-cortland-medical-center", image: "guthrie.jfif" },
  
  // DIX HILLS
  { name: "SAGAMORE CHILDREN'S PSYCHIATRIC CENTER", city: "DIX HILLS", address: "DIX HILLS, NY", website: "https://omh.ny.gov/omhweb/facilities/scpc/", image: "saga.jfif" },
  
  // EAST MEADOW
  { name: "NASSAU UNIVERSITY MEDICAL CENTER", city: "EAST MEADOW", address: "EAST MEADOW, NY", website: "https://www.numc.edu/", image: "nassau.jfif" },
  
  // ELMHURST
  { name: "ELMHURST HOSPITAL CENTER", city: "ELMHURST", address: "ELMHURST, NY", website: "https://www.nychealthandhospitals.org/elmhurst/", image: "elm.jfif" },
  
  // ELMIRA
  { name: "ARNOT OGDEN MEDICAL CENTER", city: "ELMIRA", address: "ELMIRA, NY", website: "https://www.arnothealth.org/", image: "arnot.jfif" },
  { name: "ELMIRA PSYCH CENTER", city: "ELMIRA", address: "ELMIRA, NY", website: "https://omh.ny.gov/omhweb/facilities/elpc/", image: "elmira.jfif" },
  
  // FAR ROCKAWAY
  { name: "ST JOHN'S EPISCOPAL HOSPITAL AT SOUTH SHORE", city: "FAR ROCKAWAY", address: "FAR ROCKAWAY, NY", website: "https://www.sjehealthcare.org/", image: "john.jfif" },
  
  // HARRIS
  { name: "GARNET HEALTH MEDICAL CENTER CATSKILLS", city: "HARRIS", address: "HARRIS, NY", website: "https://www.garnethealth.org/", image: "garnet.jfif" },
  
  // HUNTINGTON
  { name: "NS/LIJ HS HUNTINGTON HOSPITAL", city: "HUNTINGTON", address: "HUNTINGTON, NY", website: "https://www.northwell.edu/find-care/locations/huntington-hospital", image: "huntington.jfif" },
  
  // JAMAICA
  { name: "JAMAICA HOSPITAL MEDICAL CENTER", city: "JAMAICA", address: "JAMAICA, NY", website: "https://www.jamaicahospital.org/", image: "jamaica.jfif" },
  { name: "QUEENS HOSPITAL CENTER", city: "JAMAICA", address: "JAMAICA, NY", website: "https://www.nychealthandhospitals.org/queens/", image: "queens.jfif" },
  
  // JAMESTOWN
  { name: "UPMC CHAUTAUQUA AT WCA", city: "JAMESTOWN", address: "JAMESTOWN, NY", website: "https://www.upmc.com/locations/hospitals/chautauqua", image: "upmc.jfif" },
  
  // KATONAH
  { name: "FOUR WINDS", city: "KATONAH", address: "KATONAH, NY", website: "https://www.fourwindshospital.com/", image: "four.jfif" },
  
  // KINGSTON
  { name: "HEALTHALLIANCE HOSPITAL MARYS AVENUE CAMPUS", city: "KINGSTON", address: "KINGSTON, NY", website: "https://www.wmchealth.org/locations/healthalliance-hospital-mary-s-avenue", image: "health.jfif" },
  
  // MANHASSET
  { name: "NORTH SHORE UNIVERSITY HOSPITAL", city: "MANHASSET", address: "MANHASSET, NY", website: "https://www.northwell.edu/find-care/locations/north-shore-university-hospital", image: "north.jfif" },
  
  // MIDDLETOWN
  { name: "GARNET HEALTH MEDICAL CENTER", city: "MIDDLETOWN", address: "MIDDLETOWN, NY", website: "https://www.garnethealth.org/", image: "garr.jfif" },
  
  // MOUNT KISCO
  { name: "NORTHERN WESTCHESTER HOSPITAL", city: "MOUNT KISCO", address: "MOUNT KISCO, NY", website: "https://www.northwell.edu/find-care/locations/northern-westchester-hospital", image: "west.jfif" },
  
  // MOUNT VERNON
  { name: "MONTEFIORE MOUNT VERNON HOSPITAL", city: "MOUNT VERNON", address: "MOUNT VERNON, NY", website: "https://www.montefiorehealthsystem.org/mount-vernon.html", image: "vernon.jfif" },
  
  // NEW HAMPTON
  { name: "MID HUDSON FORENSIC PSYCHIATRIC CTR", city: "NEW HAMPTON", address: "NEW HAMPTON, NY", website: "https://omh.ny.gov/omhweb/facilities/mhpc/", image: "forensic.jfif" },
  
  // NEW HYDE PARK
  { name: "LONG ISLAND JEWISH MEDICAL CENTER", city: "NEW HYDE PARK", address: "NEW HYDE PARK, NY", website: "https://www.northwell.edu/find-care/locations/long-island-jewish-medical-center", image: "long.jfif" },
  
  // NEW YORK
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
  
  // NYACK
  { name: "NYACK HOSPITAL", city: "NYACK", address: "NYACK, NY", website: "https://www.montefiorenyack.org/", image: "nyack.jfif" },
  
  // OCEANSIDE
  { name: "MOUNT SINAI SOUTH NASSAU", city: "OCEANSIDE", address: "OCEANSIDE, NY", website: "https://www.mountsinai.org/locations/south-nassau", image: "mssn.jfif" },
  
  // OGDENSBURG
  { name: "ST LAWRENCE PSYCHIATRIC CENTER", city: "OGDENSBURG", address: "OGDENSBURG, NY", website: "https://omh.ny.gov/omhweb/facilities/slpc/", image: "lawrence.jfif" },
  { name: "CLAXTON-HEPBURN MEDICAL CENTER", city: "OGDENSBURG", address: "OGDENSBURG, NY", website: "https://www.claxtonhepburn.org/", image: "claxton.jfif" },
  
  // OLEAN
  { name: "OLEAN GENERAL HOSPITAL", city: "OLEAN", address: "OLEAN, NY", website: "https://www.brmc-ogh.org/", image: "olean.jfif" },
  
  // ORANGEBURG
  { name: "ROCKLAND PSYCH CTR", city: "ORANGEBURG", address: "ORANGEBURG, NY", website: "https://omh.ny.gov/omhweb/facilities/ropc/", image: "rockland.jfif" },
  { name: "ROCKLAND CHILDREN'S PSYCHIATRIC CENTER", city: "ORANGEBURG", address: "ORANGEBURG, NY", website: "https://omh.ny.gov/omhweb/facilities/rcpc/", image: "children.jfif" },
  
  // OSWEGO
  { name: "OSWEGO HOSPITAL", city: "OSWEGO", address: "OSWEGO, NY", website: "https://www.oswegohealth.org/", image: "oswego.jfif" },
  
  // PATCHOGUE
  { name: "LONG ISLAND COMMUNITY HOSPITAL", city: "PATCHOGUE", address: "PATCHOGUE, NY", website: "https://nyulangone.org/locations/nyu-langone-hospital-suffolk", image: "island.jfif" },
  
  // PORT JEFFERSON
  { name: "JOHN T MATHER MEMORIAL HOSPITAL OF PORT JEFFERSON", city: "PORT JEFFERSON", address: "PORT JEFFERSON, NY", website: "https://www.matherhospital.org/", image: "mather.jfif" },
  
  // PORT JERVIS
  { name: "BON SECOURS COMMUNITY HOSPITAL", city: "PORT JERVIS", address: "PORT JERVIS, NY", website: "https://www.bonsecourscommunityhosp.org/", image: "bon.jfif" },
  
  // QUEENS VILLAGE
  { name: "CREEDMOOR PSYCHIATRIC CENTER", city: "QUEENS VILLAGE", address: "QUEENS VILLAGE, NY", website: "https://omh.ny.gov/omhweb/facilities/crpc/", image: "creedmoor.jfif" },
  
  // ROCHESTER
  { name: "ROCHESTER GENERAL HOSPITAL", city: "ROCHESTER", address: "ROCHESTER, NY", website: "https://www.rochesterregional.org/locations/rochester-general-hospital", image: "roche.jfif" },
  { name: "UNITY HOSPITAL", city: "ROCHESTER", address: "ROCHESTER, NY", website: "https://www.rochesterregional.org/locations/unity-hospital", image: "unity.jfif" },
  { name: "STRONG MEMORIAL HOSPITAL", city: "ROCHESTER", address: "ROCHESTER, NY", website: "https://www.urmc.rochester.edu/strong-memorial.aspx", image: "strong.jfif" },
  { name: "ROCHESTER PSYCHIATRIC CENTER", city: "ROCHESTER", address: "ROCHESTER, NY", website: "https://omh.ny.gov/omhweb/facilities/ropc/", image: "ester.jfif" },
  
  // ROCKVILLE CENTRE
  { name: "MERCY MEDICAL CENTER", city: "ROCKVILLE CENTRE", address: "ROCKVILLE CENTRE, NY", website: "https://www.catholichealthli.org/mercy-hospital", image: "mercy.jfif" },
  
  // ROME
  { name: "ROME MEMORIAL HOSPITAL, INC", city: "ROME", address: "ROME, NY", website: "https://www.romehealth.org/", image: "rome.jfif" },
  
  // SARANAC LAKE
  { name: "ADIRONDACK MEDICAL CENTER - SARANAC LAKE", city: "SARANAC LAKE", address: "SARANAC LAKE, NY", website: "https://www.adirondackhealth.org/", image: "adirondack.jfif" },
  
  // SARATOGA SPRINGS
  { name: "FOUR WINDS OF SARATOGA", city: "SARATOGA SPRINGS", address: "SARATOGA SPRINGS, NY", website: "https://www.fourwindshospital.com/about_four_winds/saratoga/index.html", image: "saratoga.jfif" },
  
  // SLEEPY HOLLOW
  { name: "PHELPS HOSPITAL", city: "SLEEPY HOLLOW", address: "SLEEPY HOLLOW, NY", website: "https://phelps.northwell.edu/", image: "phelps.jfif" },
  
  // SMITHTOWN
  { name: "ST CATHERINE OF SIENA HOSPITAL", city: "SMITHTOWN", address: "SMITHTOWN, NY", website: "https://www.catholichealthli.org/st-catherine-siena-hospital", image: "catherine.jfif" },
  
  // STATEN ISLAND
  { name: "RICHMOND UNIVERSITY MEDICAL CENTER", city: "STATEN ISLAND", address: "STATEN ISLAND, NY", website: "https://www.rumcsi.org/", image: "richmond.jfif" },
  { name: "STATEN ISLAND UNIVERSITY HOSPITAL", city: "STATEN ISLAND", address: "STATEN ISLAND, NY", website: "https://www.northwell.edu/find-care/locations/staten-island-university-hospital", image: "staten.jfif" },
  { name: "SOUTH BEACH PSYCHIATRIC CENTER", city: "STATEN ISLAND", address: "STATEN ISLAND, NY", website: "https://omh.ny.gov/omhweb/facilities/sbpc/", image: "sbpc.jfif" },
  
  // STONY BROOK
  { name: "SUNY/STONY BROOK UNIVERSITY HOSPITAL", city: "STONY BROOK", address: "STONY BROOK, NY", website: "https://www.stonybrookmedicine.edu/sbuh", image: "stony.jfif" },
  
  // SYRACUSE
  { name: "ST JOSEPH'S HOSPITAL HEALTH CENTER", city: "SYRACUSE", address: "SYRACUSE, NY", website: "https://www.sjhsyr.org/", image: "joseph.jfif" },
  { name: "UNIVERSITY HOSPITAL S U N Y HEALTH SCIENCE CENTER", city: "SYRACUSE", address: "SYRACUSE, NY", website: "https://www.upstate.edu/hospital/", image: "sunny.jfif" },
  { name: "HUTCHINGS PSYCHIATRIC CTR", city: "SYRACUSE", address: "SYRACUSE, NY", website: "https://omh.ny.gov/omhweb/facilities/hupc/", image: "hutchings.jfif" },
  
  // TROY
  { name: "SAMARITAN HOSPITAL OF TROY, NEW YORK", city: "TROY", address: "TROY, NY", website: "https://www.sphp.com/location/samaritan-hospital", image: "samaritan.jfif" },
  
  // UTICA
  { name: "MOHAWK VALLEY PSYCHIATRIC CENTER", city: "UTICA", address: "UTICA, NY", website: "https://omh.ny.gov/omhweb/facilities/mvpc/", image: "mohawk.jfif" },
  
  // VALHALLA
  { name: "WESTCHESTER MEDICAL CENTER", city: "VALHALLA", address: "VALHALLA, NY", website: "https://www.wmchealth.org/locations/westchester-medical-center", image: "westchester.jfif" },
  
  // WARSAW
  { name: "WYOMING COUNTY", city: "WARSAW", address: "WARSAW, NY", website: "https://www.wcchs.net/", image: "wyoming.jfif" },
  
  // WEST BRENTWOOD
  { name: "PILGRIM PSYCHIATRIC CENTER", city: "WEST BRENTWOOD", address: "WEST BRENTWOOD, NY", website: "https://omh.ny.gov/omhweb/facilities/pgpc/", image: "pilgrim.jfif" },
  
  // WEST SENECA
  { name: "WESTERN NY CHILDRENS PSYCHIATRIC CENTER", city: "WEST SENECA", address: "WEST SENECA, NY", website: "https://omh.ny.gov/omhweb/facilities/wcpc/", image: "western.jfif" },
  
  // YONKERS
  { name: "ST JOSEPH'S MEDICAL CENTER", city: "YONKERS", address: "YONKERS, NY", website: "https://www.saintjosephs.org/", image: "yonkers.jfif" }
];

// ===== MOCK DATA KPI (Sementara) =====
const kpiData = {
  SMD: Array.from({length: 57}, () => (Math.random() * 20 + 5).toFixed(1)),
  FAPH: Array.from({length: 57}, () => (Math.random() * 25 + 10).toFixed(1)),
  MedCont: Array.from({length: 57}, () => (Math.random() * 30 + 15).toFixed(1)),
  READM: Array.from({length: 57}, () => (Math.random() * 15 + 8).toFixed(1))
};

const nyAverages = { SMD: 12.8, FAPH: 18.5, MedCont: 24.2, READM: 13.5 };

function getDataForKPI(kpi) {
  if (kpi === 'ALL') return allCityNames.map((_, idx) => ((parseFloat(kpiData.SMD[idx]) + parseFloat(kpiData.FAPH[idx]) + parseFloat(kpiData.MedCont[idx]) + parseFloat(kpiData.READM[idx])) / 4).toFixed(1));
  return kpiData[kpi];
}

function getNYAvgValue(kpi) {
  if (kpi === 'ALL') return ((nyAverages.SMD + nyAverages.FAPH + nyAverages.MedCont + nyAverages.READM) / 4).toFixed(1);
  return nyAverages[kpi];
}

function getTop10(kpi) { 
  const data = getDataForKPI(kpi).map((v,i)=> ({name:allCityNames[i], value:parseFloat(v)})); 
  return data.sort((a,b)=>b.value-a.value).slice(0,10); 
}

function getBottom10(kpi) { 
  const data = getDataForKPI(kpi).map((v,i)=> ({name:allCityNames[i], value:parseFloat(v)})); 
  return data.sort((a,b)=>a.value-b.value).slice(0,10); 
}

// ===== CHART 1 =====
let currentPage = 1, citiesPerPage = 10, totalPages = Math.ceil(57/citiesPerPage), chart1, currentKPI = 'ALL';

function updateChart1() {
  const start = (currentPage-1)*citiesPerPage, end = start+citiesPerPage;
  const labels = allCityNames.slice(start,end), data = getDataForKPI(currentKPI).slice(start,end), nyAvg = getNYAvgValue(currentKPI);
  
  document.getElementById('nyAvgDisplay').innerHTML = `NY State Avg: ${nyAvg}`;
  document.getElementById('pageIndicator').innerHTML = `Page ${currentPage} / ${totalPages}`;
  document.getElementById('prevBtn').disabled = currentPage===1; 
  document.getElementById('nextBtn').disabled = currentPage===totalPages;
  
  if(chart1) chart1.destroy();
  
  const ctx = document.getElementById('cityChart').getContext('2d');
  chart1 = new Chart(ctx, { 
    type:'bar', 
    data:{ 
      labels, 
      datasets:[
        { label: currentKPI==='ALL'?'Average of All KPIs':currentKPI, data:data.map(v=>parseFloat(v)), backgroundColor:'rgba(108,39,217,0.7)', borderColor:'#6C27D9', borderWidth:2, borderRadius:6 },
        { label:'NY State Benchmark', data:Array(labels.length).fill(parseFloat(nyAvg)), type:'line', borderColor:'#FF6B6B', borderWidth:3, borderDash:[8,6], fill:false, pointRadius:0 }
      ] 
    }, 
    options:{ 
      responsive:true, 
      maintainAspectRatio:true, 
      plugins:{ 
        legend:{ position:'top', labels:{ boxWidth:15, padding:15 } }, 
        tooltip:{ callbacks:{ label:(ctx)=>`${ctx.dataset.label}: ${ctx.raw}%` } } 
      }, 
      scales:{ 
        y:{ title:{ display:true, text:'Percentage (%)', font:{size:12} }, min:0, max:50, ticks:{ stepSize:5, callback:(v)=>v+'%', font:{size:11} } }, 
        x:{ ticks:{ maxRotation:0, minRotation:0, font:{size:11} } } 
      } 
    } 
  });
  
  setTimeout(() => lucide.createIcons(), 100);
}

window.changeKPI = function() { 
  currentKPI = document.getElementById('kpiSelect').value; 
  currentPage=1; 
  updateChart1(); 
};

window.previousPage = function() { 
  if(currentPage>1){ 
    currentPage--; 
    updateChart1(); 
  } 
};

window.nextPage = function() { 
  if(currentPage<totalPages){ 
    currentPage++; 
    updateChart1(); 
  } 
};

// ===== CHART HIGHEST =====
let chartHighest, currentKPIHighest = 'ALL';

window.updateHighestChart = function() {
  currentKPIHighest = document.getElementById('kpiSelectHighest').value;
  const top10 = getTop10(currentKPIHighest), nyAvg = getNYAvgValue(currentKPIHighest);
  document.getElementById('nyAvgHighestDisplay').innerHTML = `NY State Avg: ${nyAvg}`;
  if(chartHighest) chartHighest.destroy();
  const ctx = document.getElementById('highestChart').getContext('2d');
  chartHighest = new Chart(ctx, { 
    type:'bar', 
    data:{ 
      labels:top10.map(c=>c.name), 
      datasets:[
        { label: currentKPIHighest==='ALL'?'Average of All KPIs':currentKPIHighest, data:top10.map(c=>c.value), backgroundColor:'rgba(108,39,217,0.7)', borderColor:'#6C27D9', borderWidth:2, borderRadius:6 },
        { label:'NY State Benchmark', data:Array(top10.length).fill(parseFloat(nyAvg)), type:'line', borderColor:'#FF6B6B', borderWidth:3, borderDash:[8,6], fill:false, pointRadius:0 }
      ] 
    }, 
    options:{ 
      responsive:true, 
      maintainAspectRatio:true, 
      plugins:{ 
        legend:{ position:'top', labels:{ boxWidth:15, padding:15 } }, 
        tooltip:{ callbacks:{ label:(ctx)=>`${ctx.dataset.label}: ${ctx.raw}%` } } 
      }, 
      scales:{ 
        y:{ title:{ display:true, text:'Percentage (%)', font:{size:12} }, min:0, max:50, ticks:{ stepSize:5, callback:(v)=>v+'%', font:{size:11} } }, 
        x:{ ticks:{ maxRotation:0, minRotation:0, font:{size:11} } } 
      } 
    } 
  });
  setTimeout(() => lucide.createIcons(), 100);
};

// ===== CHART LOWEST =====
let chartLowest, currentKPILowest = 'ALL';

window.updateLowestChart = function() {
  currentKPILowest = document.getElementById('kpiSelectLowest').value;
  const bottom10 = getBottom10(currentKPILowest), nyAvg = getNYAvgValue(currentKPILowest);
  document.getElementById('nyAvgLowestDisplay').innerHTML = `NY State Avg: ${nyAvg}`;
  if(chartLowest) chartLowest.destroy();
  const ctx = document.getElementById('lowestChart').getContext('2d');
  chartLowest = new Chart(ctx, { 
    type:'bar', 
    data:{ 
      labels:bottom10.map(c=>c.name), 
      datasets:[
        { label: currentKPILowest==='ALL'?'Average of All KPIs':currentKPILowest, data:bottom10.map(c=>c.value), backgroundColor:'rgba(108,39,217,0.7)', borderColor:'#6C27D9', borderWidth:2, borderRadius:6 },
        { label:'NY State Benchmark', data:Array(bottom10.length).fill(parseFloat(nyAvg)), type:'line', borderColor:'#FF6B6B', borderWidth:3, borderDash:[8,6], fill:false, pointRadius:0 }
      ] 
    }, 
    options:{ 
      responsive:true, 
      maintainAspectRatio:true, 
      plugins:{ 
        legend:{ position:'top', labels:{ boxWidth:15, padding:15 } }, 
        tooltip:{ callbacks:{ label:(ctx)=>`${ctx.dataset.label}: ${ctx.raw}%` } } 
      }, 
      scales:{ 
        y:{ title:{ display:true, text:'Percentage (%)', font:{size:12} }, min:0, max:50, ticks:{ stepSize:5, callback:(v)=>v+'%', font:{size:11} } }, 
        x:{ ticks:{ maxRotation:0, minRotation:0, font:{size:11} } } 
      } 
    } 
  });
  setTimeout(() => lucide.createIcons(), 100);
};

// ===== SPECIFIC CITY FUNCTIONS =====
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
  const items = document.getElementById('selectItems');
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
    window.location.href = `${selectedCity.toLowerCase()}.html`;
  }
};

// ===== HEALTHCARE FACILITIES PAGINATION =====
let healthcareCurrentPage = 1;
const healthcarePerPage = 8;
const healthcareTotalPages = Math.ceil(healthcareFacilities.length / healthcarePerPage);

function renderHealthcareGrid() {
  const start = (healthcareCurrentPage - 1) * healthcarePerPage;
  const end = start + healthcarePerPage;
  const pageFacilities = healthcareFacilities.slice(start, end);
  
  const container = document.getElementById('healthcareGrid');
  container.innerHTML = pageFacilities.map(facility => {
    // Cek apakah ada gambar
    const hasImage = facility.image && facility.image !== '' && facility.image !== '.jfif';
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
  if (healthcareCurrentPage > 1) {
    healthcareCurrentPage--;
    renderHealthcareGrid();
  }
};

window.nextHealthcarePage = function() {
  if (healthcareCurrentPage < healthcareTotalPages) {
    healthcareCurrentPage++;
    renderHealthcareGrid();
  }
};

// ===== INITIAL RENDER =====
setTimeout(() => {
  lucide.createIcons();
  updateChart1();
  window.updateHighestChart();
  window.updateLowestChart();
  renderCityOptions();
  renderHealthcareGrid();
}, 500);