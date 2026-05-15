const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateUI() {
  expenseList.innerHTML = "";

  let total = 0;

  expenses.forEach((expense, index) => {
    total += expense.amount;

    const li = document.createElement("li");

    li.innerHTML = `
      ${expense.title} - ₹${expense.amount}
      <button class="delete-btn" onclick="deleteExpense(${index})">
        X
      </button>
    `;

    expenseList.appendChild(li);
  });

  totalDisplay.textContent = `₹${total}`;

  localStorage.setItem("expenses", JSON.stringify(expenses));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value;
  const amount = Number(amountInput.value);

  expenses.push({ title, amount });

  titleInput.value = "";
  amountInput.value = "";

  updateUI();
});

function deleteExpense(index) {
  expenses.splice(index, 1);
  updateUI();
}

updateUI();