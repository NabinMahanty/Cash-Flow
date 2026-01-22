// ================== SELECT ELEMENTS ==================
const salaryInput = document.getElementById("salaryInput");
const setSalaryBtn = document.getElementById("setSalaryBtn");
const salaryDisplay = document.getElementById("salaryDisplay");

const expenseNameInput = document.getElementById("expenseNameInput");
const expenseAmountInput = document.getElementById("expenseAmountInput");
const addExpenseBtn = document.getElementById("addExpenseBtn");

const expenseList = document.getElementById("expenseList");
const totalExpenseDisplay = document.getElementById("totalExpense");
const remainingBalanceDisplay = document.getElementById("remainingBalance");

// ================== DATA ==================
let salary = 0;
let totalExpense = 0;

// ================== SET SALARY ==================
setSalaryBtn.addEventListener("click", function () {
  const value = Number(salaryInput.value);

  if (value <= 0) {
    alert("Please enter a valid salary");
    return;
  }
  salary = value;
  salaryDisplay.textContent = salary;
  localStorage.setItem("salary", salary);
  updateBalance();
});
// ================== LOAD SAVED SALARY==================

window.addEventListener("load", function () {
  const savedSalary = this.localStorage.getItem("salary");
  if (savedSalary !== null) {
    salary = Number(savedSalary);
    salaryDisplay.textContent = salary;
    updateBalance();
  }
});
// ================== LOAD SAVED Expenses ==================
window.addEventListener("load", function () {
  const savedExpense = this.localStorage.getItem("expenses");
  if (savedExpense !== null) {
    const expenses = JSON.parse(savedExpense);

    totalExpense = 0;
    expenses.forEach((expense, index) => {
      const li = this.document.createElement("li");
      li.innerHTML = `${expense.name} - ${expense.amount} <button class="delete-btn" data-index="${index}">Remove</button>`;
      expenseList.appendChild(li);
      totalExpense += expense.amount;
    });
    totalExpenseDisplay.textContent = totalExpense;
    updateBalance();
    updateChart();
  }
});
// ================== ADD EXPENSE ==================
addExpenseBtn.addEventListener("click", function () {
  const name = expenseNameInput.value.trim();
  const amount = Number(expenseAmountInput.value);

  if (salary === 0) {
    swal({
      title: "No Salary Set!",
      text: "Please set your salary before adding expenses.",
      icon: "warning",
      button: "OK",
    });
    return;
  }

  if (name === "" || amount <= 0) {
    swal({
      title: "Please enter valid expense details!",
      text: "Enter Valid Data",
      icon: "warning",
      button: "OK",
    });
    return;
  }

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push({ name, amount });
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // Create list item with delete button
  const li = document.createElement("li");
  li.innerHTML = `${name} - ${amount} <button class="delete-btn" data-index="${expenses.length - 1}">Remove</button>`;
  expenseList.appendChild(li);

  totalExpense += amount;
  totalExpenseDisplay.textContent = totalExpense;

  updateBalance();
  updateChart();

  // Clear inputs
  expenseNameInput.value = "";
  expenseAmountInput.value = "";
});

// ================== DELETE EXPENSE ==================
expenseList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const index = Number(e.target.getAttribute("data-index"));

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    // Subtract the deleted expense amount from total
    totalExpense -= expenses[index].amount;

    // Remove expense from array
    expenses.splice(index, 1);

    // Update localStorage
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Remove the list item from DOM
    e.target.parentElement.remove();

    // Update displays
    totalExpenseDisplay.textContent = totalExpense;
    updateBalance();

    // Reload the list to update indices
    reloadExpenses();
  }
});

// ================== RELOAD EXPENSES ==================
function reloadExpenses() {
  expenseList.innerHTML = "";
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  totalExpense = 0;
  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${expense.name} - ${expense.amount} <button class="delete-btn" data-index="${index}">Remove</button>`;
    expenseList.appendChild(li);
    totalExpense += expense.amount;
  });

  totalExpenseDisplay.textContent = totalExpense;
  updateBalance();
  updateChart();
}

// ================== UPDATE BALANCE ==================
let lowBalanceWarningShown = false;

function updateBalance() {
  const remaining = salary - totalExpense;
  remainingBalanceDisplay.textContent = remaining;

  // Budget Alert: Check if remaining balance is below 10% of salary
  const threshold = salary * 0.1;

  if (remaining < threshold && remaining >= 0 && salary > 0) {
    // Turn balance text RED
    remainingBalanceDisplay.style.color = "red";
    remainingBalanceDisplay.style.fontWeight = "bold";

    // Show warning alert (only once until balance recovers)
    if (!lowBalanceWarningShown) {
      swal({
        title: "Budget Alert!",
        text: `Your remaining balance is below 10% of your salary! Only ${remaining} left.`,
        icon: "warning",
        button: "OK",
      });
      lowBalanceWarningShown = true;
    }
  } else {
    // Reset color to normal
    remainingBalanceDisplay.style.color = "";
    remainingBalanceDisplay.style.fontWeight = "";
    lowBalanceWarningShown = false;
  }
}
// ================== ADD Visualization for Expenses ==================
let expenseChart = null;
function updateExpenseChart() {
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const ctx = document.getElementById("expenseChart").getContext("2d");

  if (expenseChart) {
    expenseChart.destroy();
  }
  expenseChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: expenses.map((e) => e.name),
      datasets: [
        {
          label: "Expenses",
          data: expenses.map((e) => e.amount),
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          text: "Expense Breakdown",
        },
      },
    },
  });
}

// ================== ADD Visualization for Remaining Balance VS Total Expenses ==================
let remainChart = null;
function updateBudgetChart() {
  const remaining = salary - totalExpense;

  const ctx = document.getElementById("remainChart").getContext("2d");

  if (remainChart) {
    remainChart.destroy();
  }
  remainChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Remaining Balance", "Total Expenses"],
      datasets: [
        {
          label: "Budget Overview",
          data: [remaining > 0 ? remaining : 0, totalExpense],
          backgroundColor: ["#4CAF50", "#FF6384"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
          text: "Remaining Balance vs Total Expenses",
        },
      },
    },
  });
}

// ================== UPDATE ALL CHARTS ==================
function updateChart() {
  updateExpenseChart();
  updateBudgetChart();
}

// ================== PDF EXPORT ==================
const downloadReportBtn = document.getElementById("downloadReportBtn");

downloadReportBtn.addEventListener("click", function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Title
  doc.setFontSize(20);
  doc.text("Cash-Flow Report", 105, 20, { align: "center" });

  // Date
  doc.setFontSize(10);
  const currentDate = new Date().toLocaleDateString();
  doc.text(`Generated on: ${currentDate}`, 105, 30, { align: "center" });

  // Salary Information
  doc.setFontSize(14);
  doc.text("Salary Information", 20, 45);
  doc.setFontSize(12);
  doc.text(`Total Salary: ${salary}`, 20, 55);

  // Expense List
  doc.setFontSize(14);
  doc.text("Expense List", 20, 70);
  doc.setFontSize(12);

  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  if (expenses.length === 0) {
    doc.text("No expenses recorded.", 20, 80);
  } else {
    let yPosition = 80;
    expenses.forEach((expense, index) => {
      doc.text(
        `${index + 1}. ${expense.name}: ${expense.amount}`,
        20,
        yPosition,
      );
      yPosition += 10;

      // Add new page if needed
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    });
  }

  // Summary Section
  const summaryY = expenses.length === 0 ? 95 : 80 + expenses.length * 10 + 15;
  doc.setFontSize(14);
  doc.text("Summary", 20, summaryY);
  doc.setFontSize(12);
  doc.text(`Total Expenses: ${totalExpense}`, 20, summaryY + 10);
  doc.text(`Remaining Balance: ${salary - totalExpense}`, 20, summaryY + 20);

  // Save PDF
  doc.save("cash-flow-report.pdf");

  // Show success message
  swal({
    title: "Success!",
    text: "Your report has been downloaded successfully.",
    icon: "success",
    button: "OK",
  });
});
