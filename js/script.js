import { incomeButton } from './income.js';
import { expensesButton } from './expenses.js';

const leftAmount = document.querySelector("#amount-to-spend");
const incomeBtn = document.querySelector("#income-btn");
const expenseBtn = document.querySelector("#expense-btn");

incomeBtn.addEventListener("click", (e) => {incomeButton(e)});
expenseBtn.addEventListener("click", (e) => {expensesButton(e)});

export {leftAmount };