# Cash-Flow Dashboard

> **Salary & Expense Tracker**  
> _A functional web application for managing personal finances with real-time updates and data persistence_

## 📋 Project Overview

**Theme:** JavaScript Logic, DOM Manipulation, and Data Persistence

**Goal:** Build a functional dashboard where users can input their salary, add expenses, and see the remaining balance update in real-time.

### Why This Project?

Every major application (banking, e-commerce, dashboards) relies on taking user input, performing calculations, and updating the screen without reloading. This project demonstrates the foundation of modern web development principles used in frameworks like React.

---

## 🎯 Features Implemented

### ✅ Level 1 (Beginner Requirements)

- **Input Fields:**
  - Total Salary (Number)
  - Expense Name (Text)
  - Expense Amount (Number)

- **Core Logic:**
  - Display salary on screen when entered
  - Add expenses to a list below the form
  - Automatic calculation: `Total Salary - Total Expenses = Remaining Balance`

- **Validation:**
  - Prevents adding expenses with empty or negative values
  - Prevents adding expenses when salary is 0

### ✅ Level 2 (Intermediate Requirements)

- **Data Persistence (LocalStorage):**
  - Salary and expense list saved to browser's localStorage
  - Data persists after page refresh
  - Automatic data loading on page load

- **Delete Functionality:**
  - "Remove" button next to each expense
  - Clicking removes the item and updates the balance immediately

- **Visualization:**
  - Pie chart displaying "Remaining Balance vs. Total Expenses" using Chart.js

### ✅ Level 3 (Advanced Requirements)

- **PDF Export:**
  - "Download Report" button generates a PDF file
  - Contains expense list and final balance using jsPDF library

- **Budget Alert:**
  - Remaining balance turns RED when below 10% of salary
  - Warning alert notification appears

---

## 🛠️ Technologies Used

- **HTML5** - Structure and markup
- **CSS3** - Styling and responsive design
- **JavaScript (ES6+)** - Logic and DOM manipulation
- **Chart.js** - Data visualization
- **jsPDF** - PDF generation
- **SweetAlert** - Enhanced alert notifications
- **LocalStorage API** - Data persistence

---

## 🚀 How to Use

1. **Set Your Salary:**
   - Enter your total salary in the input field
   - Click "Set Salary" to save

2. **Add Expenses:**
   - Enter the expense name and amount
   - Click "Add Expense" to add to the list
   - Note: You must set a salary before adding expenses

3. **View Summary:**
   - Total expenses and remaining balance update automatically
   - Visual chart shows your budget breakdown

4. **Manage Expenses:**
   - Click "Remove" button to delete an expense
   - Balance updates in real-time

5. **Download Report:**
   - Click "Download Report" to generate a PDF
   - PDF includes all expenses and balance summary

---

## 📁 Project Structure

```
Week_2/
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── script.js           # JavaScript logic and functionality
├── README.md           # Project documentation
└── Prompt.md           # AI helped
```

---

## 🎨 Key Features

### Real-Time Updates

All calculations and UI updates happen instantly without page reloads.

### Data Persistence

Your data is automatically saved and restored even after closing the browser.

### Responsive Design

Works seamlessly on desktop, tablet, and mobile devices.

### Budget Alerts

Smart notifications when your balance drops below safe levels.

### Visual Analytics

Interactive pie chart for better financial insights.

---

## 🧪 Validation Rules

- Salary must be a positive number
- Expense name cannot be empty
- Expense amount must be greater than 0
- Cannot add expenses without setting a salary first

---

## 💡 Learning Outcomes

This project demonstrates:

- DOM manipulation and event handling
- Form validation and user input processing
- LocalStorage for data persistence
- Third-party library integration (Chart.js, jsPDF, SweetAlert)
- Real-time calculation and UI updates
- Responsive web design principles
- State management in vanilla JavaScript

---

## 📝 License

This project is part of the ProDesk IT training program - Week 2.

---

## 👤 Author

Created as part of the Week 2 JavaScript training module.
