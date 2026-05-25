// ============================================================
// SHRIPUR KINDERGARTEN SCHOOL — Result Portal JS
// Jagat Infrastructure & Algorithm
// ============================================================

// ⚠️ Deploy করার পরে এখানে আপনার Deployment ID বসান
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbyOnxQqelRC93Xmx61AHsmX3XsB6u3qKK_LtY0miKigHQGwH2fz75Ho1hxy8YoYYsYWQQ/exec';
  'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';

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
    name: 'Math',
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
// LOAD DATA  —  try/catch দিয়ে error handle করা হয়েছে
// ============================================================

window.onload = async () => {

  const loaderWrap  = document.getElementById('loaderWrap');
  const errorBox    = document.getElementById('errorBox');
  const classSelect = document.getElementById('classSelect');
  const stuSelect   = document.getElementById('studentSelect');
  const viewBtn     = document.getElementById('viewResultBtn');

  try {

    const response = await fetch(WEB_APP_URL);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    allStudents = await response.json();

    // Loader লুকানো
    loaderWrap.classList.add('hidden');

    // Dropdown ও Button চালু করা
    classSelect.disabled = false;
    stuSelect.disabled   = false;
    viewBtn.disabled     = false;

    loadClassDropdown();

  } catch (err) {

    // Loader লুকানো, Error দেখানো
    loaderWrap.classList.add('hidden');
    errorBox.classList.remove('hidden');

    console.error('API Error:', err);

  }

};

// ============================================================
// CLASS DROPDOWN
// ============================================================

function loadClassDropdown() {

  const classSelect = document.getElementById('classSelect');

  const classes = [...new Set(allStudents.map(s => s.CLASS))];

  classes.sort();

  classes.forEach(cls => {

    const option = document.createElement('option');

    option.value = cls;

    option.textContent = cls;

    classSelect.appendChild(option);

  });

}

// ============================================================
// STUDENT DROPDOWN — class পরিবর্তনে student list update
// ============================================================

document
  .getElementById('classSelect')
  .addEventListener('change', function () {

    const cls = this.value;

    const studentSelect = document.getElementById('studentSelect');

    studentSelect.innerHTML = '<option value="">STUDENTS_NAME</option>';

    if (!cls) return;

    const students = allStudents.filter(s => s.CLASS == cls);

    students.forEach(student => {

      const option = document.createElement('option');

      option.value = student.I_D;

      option.textContent = student.STUDENTS_NAME;

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

  const id = document.getElementById('studentSelect').value;

  if (!id) {
    alert('অনুগ্রহ করে একজন Student বেছে নিন।');
    return;
  }

  const student = allStudents.find(s => s.I_D == id);

  if (!student) {
    alert('কোনো Result পাওয়া যায়নি।');
    return;
  }

  renderResult(student);

  // Result card-এ smooth scroll
  document
    .getElementById('resultWrapper')
    .scrollIntoView({ behavior: 'smooth' });

}

// ============================================================
// RENDER RESULT
// ============================================================

function renderResult(student) {

  document
    .getElementById('resultWrapper')
    .classList.remove('hidden');

  document.getElementById('studentName').innerText =
    student.STUDENTS_NAME || '';

  document.getElementById('fatherName').innerText =
    student.FATHERS_NAME || '';

  document.getElementById('studentClass').innerText =
    student.CLASS || '';

  document.getElementById('rollNumber').innerText =
    student.ROLL || '';

  const tbody = document.getElementById('subjectTableBody');

  tbody.innerHTML = '';

  subjects.forEach(sub => {

    const fm = Number(student[sub.fm] || 0);

    if (fm > 0) {

      const obtainedWritten = Number(student[sub.written] || 0);

      const obtainedOral = Number(student[sub.oral] || 0);

      const total = Number(student[sub.total] || 0);

      const percentage = Number(student[sub.percentage] || 0);

      const grade = student[sub.grade] || '-';

      let fullWritten = 0;
      let fullOral    = 0;

      // =========================
      // FM LOGIC
      // =========================

      if (fm === 100) {

        fullWritten = 90;
        fullOral    = 10;

      } else if (fm === 25) {

        fullWritten = 0;
        fullOral    = 25;

      } else if (fm === 50) {

        if (obtainedWritten <= 0) {

          fullWritten = 0;
          fullOral    = 50;

        } else {

          fullWritten = 45;
          fullOral    = 5;

        }

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

    }

  });

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
// ORDINAL FORMAT  —  Bug সম্পূর্ণ ঠিক করা হয়েছে
// পুরানো: value.replace() — "22" → "2<sup>nd</sup>2"  ❌
// নতুন:   শেষ দুই সংখ্যা দিয়ে সঠিক suffix বের করা    ✅
// 11th, 12th, 13th special case handle করা হয়েছে        ✅
// ============================================================

function formatOrdinal(value) {

  const n = parseInt(value, 10);

  // যদি number না হয় (blank বা '-') তাহলে সরাসরি return
  if (isNaN(n) || value === '' || value === '-') {
    return value;
  }

  const lastTwo = n % 100;   // 11–13 special case এর জন্য
  const lastOne = n % 10;    // 1, 2, 3 suffix এর জন্য

  // 11th, 12th, 13th — সবসময় "th" হবে
  if (lastTwo >= 11 && lastTwo <= 13) {
    return n + '<sup>th</sup>';
  }

  if (lastOne === 1) return n + '<sup>st</sup>';
  if (lastOne === 2) return n + '<sup>nd</sup>';
  if (lastOne === 3) return n + '<sup>rd</sup>';

  return n + '<sup>th</sup>';

}

// ============================================================
// PDF DOWNLOAD
// ============================================================

function downloadPDF() {

  const element = document.getElementById('marksheet');

  const opt = {

    margin: 0,

    filename: 'Result_' + (document.getElementById('studentName').innerText || 'Student') + '.pdf',

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
