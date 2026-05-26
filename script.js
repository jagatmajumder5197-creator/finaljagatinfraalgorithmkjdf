// ============================================================
// SHRIPUR KINDERGARTEN SCHOOL — Result Portal JS
// Jagat Infrastructure & Algorithm
// ============================================================

// ✅ GAS WEB APP URL
const WEB_APP_URL =
  'https://script.google.com/macros/s/AKfycbyOnxQqelRC93Xmx61AHsmX3XsB6u3qKK_LtY0miKigHQGwH2fz75Ho1hxy8YoYYsYWQQ/exec';

let allStudents = [];

// ============================================================
// SUBJECT CONFIG
// ============================================================

const subjects = [

  {
    name: 'Bengali',
    fm: 'FMB',
    written: 'WTB',
    oral: 'OLB',
    total: 'TTB',
    percentage: 'PCB',
    grade: 'GDB'
  },

  {
    name: 'English',
    fm: 'FME',
    written: 'WTE',
    oral: 'OLE',
    total: 'TTE',
    percentage: 'PCE',
    grade: 'GDE'
  },

   {
    name: 'Beng Rhym',
    fm: 'FMRYMB',
    written: 'WTRYMB',
    oral: 'OLRYMB',
    total: 'TTRYMB',
    percentage: 'PCRYMB',
    grade: 'GDRYMBB'
  },

  {
    name: 'Eng Rhym',
    fm: 'FMRYME',
    written: 'WTRYME',
    oral: 'OLRYME',
    total: 'TTRYME',
    percentage: 'PCRYME',
    grade: 'GDRYME'
  },
   
  {
    name: 'Maths',
    fm: 'FMM',
    written: 'WTM',
    oral: 'OLM',
    total: 'TTM',
    percentage: 'PCM',
    grade: 'GDM'
  },

  {
    name: 'Hindi',
    fm: 'FMHN',
    written: 'WTHN',
    oral: 'OLHN',
    total: 'TTHN',
    percentage: 'PCHN',
    grade: 'GDHN'
  },

  {
    name: 'Computer',
    fm: 'FMCM',
    written: 'WTCM',
    oral: 'OLCM',
    total: 'TTCM',
    percentage: 'PCCM',
    grade: 'GDCM'
  },

  {
    name: 'GK',
    fm: 'FMGK',
    written: 'WTGK',
    oral: 'OLGK',
    total: 'TTGK',
    percentage: 'PCGK',
    grade: 'GDGK'
  },

  {
    name: 'EVS',
    fm: 'FMEV',
    written: 'WTEV',
    oral: 'OLEV',
    total: 'TTEV',
    percentage: 'PCEV',
    grade: 'GDEV'
  },

{
    name: 'LSc',
    fm: 'FMLSC',
    written: 'WTLSC',
    oral: 'OLLSC',
    total: 'TTLSC',
    percentage: 'PCLSC',
    grade: 'GDLSC'
  },

  {
    name: 'PSc',
    fm: 'FMPSC',
    written: 'WTPSC',
    oral: 'OLPSC',
    total: 'TTPSC',
    percentage: 'PCPSC',
    grade: 'GDPSC'
  },

   
  {
    name: 'History',
    fm: 'FMHS',
    written: 'WTHS',
    oral: 'OLHS',
    total: 'TTHS',
    percentage: 'PCHS',
    grade: 'GDHS'
  },

  {
    name: 'Geography',
    fm: 'FMG',
    written: 'WTG',
    oral: 'OLG',
    total: 'TTG',
    percentage: 'PCG',
    grade: 'GDG'
  }

];

// ============================================================
// LOAD DATA
// ============================================================

window.onload = async () => {

  const loaderWrap  = document.getElementById('loaderWrap');
  const errorBox    = document.getElementById('errorBox');
  const classSelect = document.getElementById('classSelect');
  const stuSelect   = document.getElementById('studentSelect');
  const viewBtn     = document.getElementById('viewResultBtn');

  try {

    // ✅ Cache bypass
    const response = await fetch(
      WEB_APP_URL + '?t=' + Date.now(),
      {
        method: 'GET',
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    allStudents = await response.json();

    // ✅ Array check
    if (!Array.isArray(allStudents)) {
      throw new Error('Invalid JSON Data');
    }

    // ✅ Loader hide
    loaderWrap.classList.add('hidden');

    // ✅ Enable controls
    classSelect.disabled = false;
    stuSelect.disabled   = false;
    viewBtn.disabled     = false;

    // ✅ Load class dropdown
    loadClassDropdown();

  } catch (err) {

    console.error('API Error:', err);

    loaderWrap.classList.add('hidden');

    errorBox.classList.remove('hidden');

    errorBox.innerHTML = `
      <div style="padding:15px;">
        Failed to Load Result Data.<br>
        Please Try Again Later.
      </div>
    `;

  }

};

// ============================================================
// CLASS DROPDOWN
// ============================================================

function loadClassDropdown() {

  const classSelect = document.getElementById('classSelect');

  // reset
  classSelect.innerHTML =
    '<option value="">SELECT CLASS</option>';

  // unique class list
  const classes = [

    ...new Set(

      allStudents
        .map(s => s.CLASS)
        .filter(Boolean)

    )

  ];

  // sort
  classes.sort((a, b) =>
    String(a).localeCompare(String(b))
  );

  classes.forEach(cls => {

    const option = document.createElement('option');

    option.value = cls;

    option.textContent = cls;

    classSelect.appendChild(option);

  });

}

// ============================================================
// CLASS CHANGE → LOAD STUDENTS
// ============================================================

document
  .getElementById('classSelect')
  .addEventListener('change', function () {

    const cls = this.value;

    const studentSelect =
      document.getElementById('studentSelect');

    studentSelect.innerHTML =
      '<option value="">STUDENTS NAME</option>';

    if (!cls) return;

    // filter students
    const students = allStudents.filter(
      s => s.CLASS == cls
    );

    // sort by name
    students.sort((a, b) =>
      String(a.STUDENTS_NAME || '')
        .localeCompare(String(b.STUDENTS_NAME || ''))
    );

    students.forEach(student => {

      const option = document.createElement('option');

      option.value = student.I_D;

      option.textContent =
        student.STUDENTS_NAME || 'Unknown';

      studentSelect.appendChild(option);

    });

  });

// ============================================================
// VIEW RESULT BUTTON
// ============================================================

document
  .getElementById('viewResultBtn')
  .addEventListener('click', showResult);

function showResult() {

  const id =
    document.getElementById('studentSelect').value;

  if (!id) {

    alert('অনুগ্রহ করে একজন Student বেছে নিন।');

    return;

  }

  const student = allStudents.find(
    s => String(s.I_D) === String(id)
  );

  if (!student) {

    alert('কোনো Result পাওয়া যায়নি।');

    return;

  }

  renderResult(student);

  // smooth scroll
  document
    .getElementById('resultWrapper')
    .scrollIntoView({
      behavior: 'smooth'
    });

}

// ============================================================
// RENDER RESULT
// ============================================================

function renderResult(student) {

  document
    .getElementById('resultWrapper')
    .classList.remove('hidden');

  // ==========================================================
  // BASIC INFO
  // ==========================================================

  document.getElementById('studentName').innerText =
    student.STUDENTS_NAME || '';

  document.getElementById('fatherName').innerText =
    student.FATHERS_NAME || '';

  document.getElementById('studentClass').innerText =
    student.CLASS || '';

  document.getElementById('rollNumber').innerText =
    student.ROLL || '';

  // ==========================================================
  // SUBJECT TABLE
  // ==========================================================

  const tbody =
    document.getElementById('subjectTableBody');

  tbody.innerHTML = '';

  subjects.forEach(sub => {

    const fm = Number(student[sub.fm] || 0);

    // skip if subject not exists
    if (fm <= 0) return;

    const obtainedWritten =
      Number(student[sub.written] || 0);

    const obtainedOral =
      Number(student[sub.oral] || 0);

    const total =
      Number(student[sub.total] || 0);

    const percentage =
      Number(student[sub.percentage] || 0);

    const grade =
      student[sub.grade] || '-';

    let fullWritten = 0;
    let fullOral    = 0;

    // ========================================================
     // FM LOGIC
      // =========================

      if(fm == 100){
        // FM = 100 → Written: 90, Oral: 10
        fullWritten = 90;
        fullOral = 10;
      }
      else if(fm == 25){
        // FM = 25 → Written: hidden (0), Oral: 25
        fullWritten = 0;
        fullOral = 25;
      }
      else if(fm == 50){
        // FM = 50 → Check if WT = "N"
        // IF WT = "N" → Written: hidden, Oral: 50
        // ELSE → Written: 45, Oral: 5

        if(student[sub.written] === 'N' || student[sub.written] === 'n' || student[sub.written] === '' || student[sub.written] === null){
          // No written exam
          fullWritten = 0;  // Hide written
          fullOral = 50;
        }
        else{
          // Has written exam
          fullWritten = 45;
          fullOral = 5;
        }

    }

    else if (fm === 25) {

      fullWritten = 0;
      fullOral    = 25;

    }

    else {

      // fallback
      fullWritten = fm;
      fullOral    = 0;

    }

    const row = `
      <tr>
        <td>${sub.name}</td>
        <td>${fullWritten}</td>
        <td>${fullOral}</td>
        <td>${fm}</td>
        <td>${obtainedWritten}</td>
        <td>${obtainedOral}</td>
        <td>${total}</td>
        <td>${percentage.toFixed(2)}%</td>
        <td>${grade}</td>
      </tr>
    `;

    tbody.innerHTML += row;

  });

  // ==========================================================
  // GRAND TOTAL
  // ==========================================================

  document.getElementById('grandFullMarks').innerText =
    student.FM || '';

  document.getElementById('grandTotal').innerText =
    student.GTT || '';

  document.getElementById('grandPercentage').innerText =
    Number(student.PCGTT || 0).toFixed(2) + '%';

  document.getElementById('grandGrade').innerText =
    student.GDGTT || '';

  document.getElementById('grandRank').innerHTML =
    formatOrdinal(student.ORD || '');

}

// ============================================================
// ORDINAL FORMAT
// ============================================================

function formatOrdinal(value) {

  const n = parseInt(value, 10);

  if (
    isNaN(n) ||
    value === '' ||
    value === '-'
  ) {
    return value;
  }

  const lastTwo = n % 100;
  const lastOne = n % 10;

  // 11th 12th 13th
  if (lastTwo >= 11 && lastTwo <= 13) {
    return n + '<sup>th</sup>';
  }

  if (lastOne === 1) {
    return n + '<sup>st</sup>';
  }

  if (lastOne === 2) {
    return n + '<sup>nd</sup>';
  }

  if (lastOne === 3) {
    return n + '<sup>rd</sup>';
  }

  return n + '<sup>th</sup>';

}

// ============================================================
// PDF DOWNLOAD
// ============================================================

function downloadPDF() {

  const element =
    document.getElementById('marksheet');

  const studentName =
    document.getElementById('studentName')
      .innerText || 'Student';

  const opt = {

    margin: 0,

    filename:
      'Result_' + studentName + '.pdf',

    image: {
      type: 'jpeg',
      quality: 1
    },

    html2canvas: {
      scale: 2,
      useCORS: true
    },

    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    }

  };

  html2pdf()
    .set(opt)
    .from(element)
    .save();

}
