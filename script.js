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
      li.innerHTML = `${expense.name} - ${expense.amount} <button class="delete-btn" data-index="${index}">❌</button>`;
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

  if (name === "" || amount <= 0) {
    alert("Please enter valid expense details");
    return;
  }

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push({ name, amount });
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // Create list item with delete button
  const li = document.createElement("li");
  li.innerHTML = `${name} - ${amount} <button class="delete-btn" data-index="${expenses.length - 1}">❌</button>`;
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
    li.innerHTML = `${expense.name} - ${expense.amount} <button class="delete-btn" data-index="${index}">❌</button>`;
    expenseList.appendChild(li);
    totalExpense += expense.amount;
  });

  totalExpenseDisplay.textContent = totalExpense;
  updateBalance();
  updateChart();
}

// ================== UPDATE BALANCE ==================
function updateBalance() {
  const remaining = salary - totalExpense;
  remainingBalanceDisplay.textContent = remaining;
}
// ================== ADD Visualization for Expenses ==================
let expenseChart = null;
function updateChart() {
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
  });
}
