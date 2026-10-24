const form = document.getElementById("expense-form");
const transactionsList = document.getElementById("transactions");
const balanceDisplay = document.getElementById("balance");
const incomeDisplay = document.getElementById("income");
const expenseDisplay = document.getElementById("expenses");

let transactions = JSON.parse(
  localStorage.getItem("paisapilot-transactions") || "[]"
);

function renderTransactions() {
  transactionsList.innerHTML = "";

  let income = 0;
  let expenses = 0;

  transactions.forEach((transaction, index) => {
    if (transaction.type === "income") {
      income += transaction.amount;
    } else {
      expenses += transaction.amount;
    }

    const item = document.createElement("li");
    item.textContent =
      `${transaction.name} — ₹${transaction.amount.toFixed(2)} `;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Delete";
    removeButton.onclick = () => {
      transactions.splice(index, 1);
      saveTransactions();
    };

    item.appendChild(removeButton);
    transactionsList.appendChild(item);
  });

  incomeDisplay.textContent = `₹${income.toFixed(2)}`;
  expenseDisplay.textContent = `₹${expenses.toFixed(2)}`;
  balanceDisplay.textContent = `₹${(income - expenses).toFixed(2)}`;
}

function saveTransactions() {
  localStorage.setItem(
    "paisapilot-transactions",
    JSON.stringify(transactions)
  );
  renderTransactions();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!name || !Number.isFinite(amount) || amount <= 0) {
    alert("Enter a valid name and amount.");
    return;
  }

  transactions.push({ name, amount, type });
  saveTransactions();
  form.reset();
});

renderTransactions();
