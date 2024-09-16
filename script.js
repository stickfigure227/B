const inputDivs = ['Hx', 'Ex', 'Ix', 'Dx', 'Tx'];
const txCCArray = ['txCCC/up', 'txCCS&P', 'txCCCAP', 'txCCXLA', 'txCCRPD', 'txCCC&B', 'txCCMOS', 'txCCSmile', 'txCCOrtho', 'txCCOther'];
const txCCArrayStatus = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const dropDownButtArray = [0, 0];

const sbp = document.getElementById('sbp');
const dbp = document.getElementById('dbp');
const ppBPAlert = document.getElementById('ppBPAlert');
const bpSummary = document.getElementById('bpSummary');
const bpAlertSummary = document.getElementById('bpAlertSummary');

const HbA1c = document.getElementById('HbA1c');
const ppHbA1cAlert = document.getElementById('ppHbA1cAlert');
const HbA1cSummary = document.getElementById('HbA1cSummary');
const HbA1cAlertSummary = document.getElementById('HbA1cAlertSummary');

const ptSHxArray = ['ptSHx0', 'ptSHx1', 'ptSHx2', 'ptSHx3', 'ptSHx4'];
const ptSHxArrayStatus = [0, 0, 0, 0, 0];
const ptDeHxArray = ['ptDeHx0', 'ptDeHx1', 'ptDeHx2', 'ptDeHx3', 'ptDeHx4', 'ptDeHx5'];
const ptDeHxArrayStatus = [0, 0, 0, 0, 0, 0];

function openNav(input) {
  const b = document.getElementById(`${inputDivs[0]}`);
  const c = document.getElementById(`${inputDivs[1]}`);
  const d = document.getElementById(`${inputDivs[2]}`);
  const e = document.getElementById(`${inputDivs[3]}`);
  const f = document.getElementById(`${inputDivs[4]}`);
  b.style.display = 'none';
  c.style.display = 'none';
  d.style.display = 'none';
  e.style.display = 'none';
  f.style.display = 'none';

  const a = document.getElementById(`${inputDivs[input]}`);
  a.style.display = 'flex';
}

function txCC(input) {
  const a = document.getElementById(`${txCCArray[input]}`);
  const b = txCCArrayStatus[input];

  if (b === 0) {
    a.style.backgroundColor = 'rgb(156, 195, 156)';
    txCCArrayStatus[input] = 1;
  } else {
    a.style.backgroundColor = '#F0F0F0';
    txCCArrayStatus[input] = 0;
  }
}

function closeDiv(input) {
  if (input === 'ptBP') {
    const dropDownButtptBP = document.getElementById('dropDownButtptBP');
    const vitalSign = document.getElementById('vitalSign');
    const summaryVitalSign = document.getElementById('summaryVitalSign');
    if (dropDownButtArray[0] === 0) {
      dropDownButtptBP.style.transform = 'rotate(180deg)';
      dropDownButtArray[0] = 1;
      vitalSign.style.display = 'none';
      summaryVitalSign.style.display = 'flex';
    } else {
      dropDownButtptBP.style.transform = 'rotate(90deg)';
      dropDownButtArray[0] = 0;
      vitalSign.style.display = 'flex';
      summaryVitalSign.style.display = 'none';
    } 
  }

  if (input === 'ptHxInput') {
    updateHxSummaryContents();
    const dropDownButtptHxInput = document.getElementById('dropDownButtptHxInput');
    const ptMHx = document.getElementById('ptMHx');
    const ptSHx = document.getElementById('ptSHx');
    const ptDeHx = document.getElementById('ptDeHx');
    const summaryHx = document.getElementById('summaryHx');
    if (dropDownButtArray[1] === 0) {
      dropDownButtptHxInput.style.transform = 'rotate(180deg)';
      dropDownButtArray[1] = 1;
      ptMHx.style.display = 'none';
      ptSHx.style.display = 'none';
      ptDeHx.style.display = 'none';
      summaryHx.style.display = 'flex';
    } else {
      dropDownButtptHxInput.style.transform = 'rotate(90deg)';
      dropDownButtArray[1] = 0;
      ptMHx.style.display = 'flex';
      ptSHx.style.display = 'flex';
      ptDeHx.style.display = 'flex';
      summaryHx.style.display = 'none';
    }
  }
}

sbp.addEventListener('input', function() {
  const sbpValue = this.value;
  const dbpValue = dbp.value;
  if (dbpValue === "") {
    bpSummary.textContent = `${sbpValue} / - mmHg`;
    ppBPAlert.textContent = "";
    bpAlertSummary.textContent = "";
  }
  if (sbpValue === "") {
    bpSummary.textContent = ` - / ${dbpValue} mmHg`;
    ppBPAlert.textContent = "";
    bpAlertSummary.textContent = "";
  } 
  if (dbpValue === "" && sbpValue === "") {
    bpSummary.textContent = "No Input";
    ppBPAlert.textContent = "";
    bpAlertSummary.textContent = "";
  }
  if (dbpValue != "" && sbpValue != "") {
    bpSummary.textContent = `${sbpValue} / ${dbpValue} mmHg`;
    calculateBP(sbpValue, dbpValue, ppBPAlert, bpAlertSummary);
  }
});

dbp.addEventListener('input', function() {
  const sbpValue = sbp.value;
  const dbpValue = this.value;
  if (dbpValue === "") {
    bpSummary.textContent = `${sbpValue} / - mmHg`;
    ppBPAlert.textContent = "";
  }
  if (sbpValue === "") {
    bpSummary.textContent = ` - / ${dbpValue} mmHg`;
    ppBPAlert.textContent = "";
  } 
  if (dbpValue === "" && sbpValue === "") {
    bpSummary.textContent = "No Input";
    ppBPAlert.textContent = "";
  }
  if (dbpValue != "" && sbpValue != "") {
    bpSummary.textContent = `${sbpValue} / ${dbpValue} mmHg`;
    calculateBP(sbpValue, dbpValue, ppBPAlert, bpAlertSummary);
  }
});

function calculateBP(sbp, dbp, output, output2) {
  if (sbp >= 180 || dbp >= 120) {
    output.textContent = "*HYPERTENSIVE CRISIS (PLEASE SEEK A MEDICAL DOCTOR)";
    output.style.color = "rgb(153, 7, 17)";
    output2.textContent = "*HYPERTENSIVE CRISIS (NO TX)";
    output2.style.color = "rgb(153, 7, 17)";
  } else if (sbp >= 160 || dbp >= 100) {
    output.textContent = "*Stage 2 Hypertension (ONLY EMERGENCY DENTAL TREATMENT)";
    output.style.color = "rgb(186, 58, 2)";
    output2.textContent = "*Stage 2 Hypertension (ONLY ED)";
    output2.style.color = "rgb(186, 58, 2)";
  } else if (sbp >= 140 || dbp >= 90) {
    output.textContent = "*Stage 2 Hypertension";
    output.style.color = "rgb(186, 58, 2)";
    output2.textContent = "*Stage 2 Hypertension";
    output2.style.color = "rgb(186, 58, 2)";
  } else if (sbp >= 130 || dbp >= 80) {
    output.textContent = "*Stage 1 Hypertension";
    output.style.color = "rgb(255, 182, 0)";
    output2.textContent = "*Stage 1 Hypertension";
    output2.style.color = "rgb(255, 182, 0)";
  } else if (sbp >= 120 || dbp >= 80) {
    output.textContent = "*BP elevated";
    output.style.color = "#A09F28";
    output2.textContent = "*BP elevated";
    output2.style.color = "#A09F28";
  } else if (sbp >= 90 && dbp >= 60) {
    output.textContent = "*BP normal";
    output.style.color = "rgb(126, 160, 37)";
    output2.textContent = "*BP normal";
    output2.style.color = "rgb(126, 160, 37)";
  } else if (sbp < 90 || dbp < 60) {
    output.textContent = "*BP too low";
    output.style.color = "rgb(180, 180, 180)";
    output2.textContent = "*BP too low";
    output2.style.color = "rgb(180, 180, 180)";
  }
}

HbA1c.addEventListener('input', function() {
  const HbA1cValue = this.value;
  if (HbA1cValue === "") {
    HbA1cSummary.textContent = "No Input";
    ppHbA1cAlert.textContent = "";
    HbA1cAlertSummary.textContent = "";
  } else {
    HbA1cSummary.textContent = `${HbA1cValue} %`;
    calculateHbA1c(HbA1cValue, ppHbA1cAlert, HbA1cAlertSummary);
  }
})

function calculateHbA1c(HbA1c, output, output2) {
  if (HbA1c > 8) {
    output.textContent = "*UNCONTROLLED DIABETES";
    output.style.color = "rgb(153, 7, 17)";
    output2.textContent = "*UNCONTROLLED DIABETES";
    output2.style.color = "rgb(153, 7, 17)";
  } else if (HbA1c >= 7) {
    output.textContent = "*Controlled Diabetes";
    output.style.color = "rgb(186, 58, 2)";
    output2.textContent = "*Controlled Diabetes";
    output2.style.color = "rgb(186, 58, 2)";
  } else if (HbA1c >= 6.5) {
    output.textContent = "*Healthy Diabetes";
    output.style.color = "rgb(255, 182, 0)";
    output2.textContent = "*Healthy Diabetes";
    output2.style.color = "rgb(255, 182, 0)";
  } else if (HbA1c >= 5.7) {
    output.textContent = "*Prediabetes";
    output.style.color = "#A09F28";
    output2.textContent = "*Prediabetes";
    output2.style.color = "#A09F28";
  } else if (HbA1c < 5.7) {
    output.textContent = "*HbA1c is normal";
    output.style.color = "rgb(126, 160, 37)";
    output2.textContent = "*HbA1c is normal";
    output2.style.color = "rgb(126, 160, 37)";
  }
}

function updateButton(array, input) {
  if (array === "ptSHx") {
    const a = document.getElementById(`${ptSHxArray[input]}`);
    if (ptSHxArrayStatus[input] === 0) {
      a.style.backgroundColor = '#9CC39C';
      ptSHxArrayStatus[input] = 1;
    } else {
      a.style.backgroundColor = '#FFFFFF';
      ptSHxArrayStatus[input] = 0;
    }
  }

  if (array === 'ptDeHx') {
    const a = document.getElementById(`${ptDeHxArray[input]}`);
    if (ptDeHxArrayStatus[input] === 0) {
      a.style.backgroundColor = '#9CC39C';
      ptDeHxArrayStatus[input] = 1;
    } else {
      a.style.backgroundColor = '#FFFFFF';
      ptDeHxArrayStatus[input] = 0;
    }
  }
}

function openDeHxTextArea(array, input) {
  const a = document.getElementById('DeHxTextArea');

  if (array === 'ptDeHx') {
    if (ptDeHxArrayStatus[input] === 0) {
      a.style.display = 'none';
    } else {
      a.style.display = 'block';
    }
  }
}

function updateHxSummaryContents() {
  // Social History, any additional social history item should update here!!
  const SHxScore = document.getElementById('SHxScore');
  SHxScore.innerHTML = whatToSHxAdvice();
  function whatToSHxAdvice() {
    let a = "";
    let b = "";
    let c = "";
    let d = "";
    let e = "";
    let special = "";

    a = ptSHxArrayStatus[0] === 1 ? "smoking," : "";
    b = ptSHxArrayStatus[1] === 1 ? "alcohol," : "";
    c = ptSHxArrayStatus[2] === 1 ? "drug abuse," : "";
    d = ptSHxArrayStatus[3] === 1 ? "betel quid," : "";
    e = ptSHxArrayStatus[4] === 1 ? "areca nut," : "";

    if (ptSHxArrayStatus.slice(0, 5).reduce((accumulator, currentValue) => accumulator + currentValue, 0) === 0) {
      special = "none, keep it up";
    } else {
      special = "";
    }

    return `<strong>Cessation for: </strong> ${a} ${b} ${c} ${d} ${e} ${special}`
  }

  // Dental History, any additional dental history item should update here!!
  const DeHxScore = document.getElementById('DeHxScore');
  const OHScore = ptDeHxArrayStatus.slice(0, 5).reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const OHadvice = whatToAdvice();

  function whatToAdvice() {
    let a = "";
    let b = "";
    let c = "";
    let d = "";
    let e = "";
    let special = "";

    if (ptDeHxArrayStatus.slice(0, 5).reduce((accumulator, currentValue) => accumulator + currentValue, 0) === 5) {
      special = "none, keep it up";
    } else {
      special = "";
    }

    a = ptDeHxArrayStatus[0] === 0 ? "brushing," : "";
    b = ptDeHxArrayStatus[1] === 0 ? "fluoride," : "";
    c = ptDeHxArrayStatus[2] === 0 ? "soft brush," : "";
    d = ptDeHxArrayStatus[3] === 0 ? "interdental," : "";
    e = ptDeHxArrayStatus[4] === 0 ? "rinsing," : "";

    return `Teach about: ${a} ${b} ${c} ${d} ${e} ${special}`;
  }

  DeHxScore.innerHTML = `<strong>OH Practice Score : </strong>${OHScore} / 5. ${OHadvice}`;

  const DeTraumaHx = document.getElementById('DeTraumaHx');
  const DeTraumaHxText = document.getElementById('DeHxTextArea').value;

  if (ptDeHxArrayStatus[5] === 0) {
    DeTraumaHx.style.display = 'none';
  } else {
    DeTraumaHx.style.display = 'block';
    DeTraumaHx.innerHTML = `<strong>Had previous dental complication due to: </strong>${DeTraumaHxText}`;
  }
  
}

window.onload = function() {
  openNav(0);
}