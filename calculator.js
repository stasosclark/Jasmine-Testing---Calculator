window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  document.getElementById("loan-amount").value = 250000;
  document.getElementById("loan-years").value = 30;
  document.getElementById("loan-rate").value = 5;
  let values = {
    amount : document.getElementById("loan-amount").value,
    years : document.getElementById("loan-years").value,
    rate : document.getElementById("loan-rate").value,
  }
  calculateMonthlyPayment(values)
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  calculateMonthlyPayment(getCurrentUIValues());
}

function intRate(percent) {
  if (percent <= 0 || percent > 100) {
    alert("Please enter a percentage greater than 0 and less than 100")
    document.getElementById("loan-rate").value = 5;
    return (5 / 100) / 12;
  } else {
    rate = (percent / 100) / 12;
    return rate;
  }
}

function totalPmts(years) {
  if (years <= 0 || years > 100) {
    alert("Please enter a number greater than 0 and less than 100")
    document.getElementById("loan-years").value = 30;
    return 30 * 12;
  } else {
    totalYears = years * 12;
    return totalYears;
  }
}

function payment(amount, years, rate) {
  if (amount < 0 || amount > 250000000) {
    alert("Please enter an amount between $0 and $250,000,000")
    document.getElementById("loan-amount").value = 250000
    return (250000 * rate)/(1-(Math.pow(1+rate,-years)));
  } else {
    pmt = (amount * rate)/(1-(Math.pow(1+rate,-years)));
    return pmt;
  }
}

function getRoundedStr(unroundedPmt) {
  let roundedPmt = unroundedPmt.toFixed(2);
  return roundedPmt;
}

function calculateMonthlyPayment(values) {
  let rate = intRate(values.rate);
  let years = totalPmts(values.years);
  let pmt = payment(values.amount, years, rate);
  let monthlyPmt = getRoundedStr(pmt);
  updateMonthly(monthlyPmt);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.getElementById("monthly-payment").innerText = `$${monthly}`;
}