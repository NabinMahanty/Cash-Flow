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

// ================== ADD EXPENSE ==================
addExpenseBtn.addEventListener("click", function () {
  const name = expenseNameInput.value.trim();
  const amount = Number(expenseAmountInput.value);

  if (name === "" || amount <= 0) {
    alert("Please enter valid expense details");
    return;
  }

  // Create list item
  const li = document.createElement("li");
  li.textContent = `${name} - ${amount}`;

  expenseList.appendChild(li);

  totalExpense += amount;
  totalExpenseDisplay.textContent = totalExpense;

  updateBalance();

  // Clear inputs
  expenseNameInput.value = "";
  expenseAmountInput.value = "";
});

// ================== UPDATE BALANCE ==================
function updateBalance() {
  const remaining = salary - totalExpense;
  remainingBalanceDisplay.textContent = remaining;
}
