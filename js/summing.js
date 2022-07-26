import {leftAmount } from './script.js';
import {incomeSumDOM } from './income.js';
import {expenseSumDOM } from './expenses.js';

const currencyMessage = " złotych";
const youCanSpentMessage = "Możesz jeszcze wydać ";
const okBilansMessage = "Bilans wynosi zero!";
const badBilansMessage = "Bilans jest ujemny. Jesteś na minusie ";
const emptyTextMessage = "";

export function sum(arr, sumDOM) {
	sumDOM.innerHTML = arr.reduce((acc, { amount }) => acc + amount, 0);
	leftAmount.innerText = emptyTextMessage;
	let BudgetAmmount = incomeSumDOM.textContent - expenseSumDOM.textContent;

	if (BudgetAmmount > 0) {
		leftAmount.innerText = youCanSpentMessage + BudgetAmmount + currencyMessage;
	} else if (BudgetAmmount === 0) {
		leftAmount.innerText = okBilansMessage;
	} else if (BudgetAmmount < 0) {
		leftAmount.innerText = badBilansMessage + BudgetAmmount + currencyMessage;
	}
    return arr;
}
