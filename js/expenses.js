import { sum } from './summing.js';

const expensesDOM = document.querySelector("#expenses-ul");
const expenseName = document.querySelector("#expense-name");
const expenseAmount = document.querySelector("#expense-amount");
const expenseSumDOM = document.querySelector("#expense-sum");
let expenses = [];

const editMessage = "Edytuj";
const deleteMessage = "Usuń";
const SaveMessage = "Zapisz";
const buttonsActiveBackgroundColor = "#F5F5F5";
const emptyStringMessage = "";

export function expensesButton(element) {
    
	element.preventDefault();
	if (expenseName.value !== "" && expenseAmount.value > 0) {
		const newExpense = createExpenseElement(expenseName, expenseAmount);

		expenses.push(newExpense);
		sum(expenses, expenseSumDOM);

		expensesDOM.innerHTML = emptyStringMessage;
		expenses.forEach(({ id, name, amount }) => {

			const li = createList(expensesDOM, id, name, amount);
			const span = createSpan(li);
			const editBtn = createEditButton(span);
			const deleteBtn = createDeleteButton(span);



			deleteBtn.addEventListener("click", () => {
				removeExpense(id, li, expensesDOM);
			});

			editBtn.addEventListener("click", () => {

				let editName = createSpanandAddToDoc(id, name, "data-name=");
				let editAmount = createSpanandAddToDoc(id, amount, "data-amount=");

                editExpenseButtonsSettings(span, editName, editAmount, deleteBtn,editBtn)
				let confirmEditBtn = createConfirmButton();

				confirmEditBtn.addEventListener("click", () => {
                    eventToEditButton(confirmEditBtn, editName, editAmount, span, editBtn, deleteBtn, id, expenses)
				});
				span.appendChild(confirmEditBtn);
			});
		});
	} else {
        return;
	}
}

function eventToEditButton(confirmEditBtn, editName, editAmount, span, editBtn, deleteBtn, id, expenses) {

    editName.contentEditable = false;
    editAmount.contentEditable = false;
    editName.style.backgroundColor = "transparent";
    editAmount.style.backgroundColor = "transparent";
    span.removeChild(confirmEditBtn);
    span.appendChild(editBtn);
    span.appendChild(deleteBtn);

    const newName = editName.textContent;
    const newAmount = Number(editAmount.textContent);

    expenses = expenses.map((expense) =>
        expense.id === id
            ? { ...expense, name: newName, amount: newAmount }
            : expense
    );
    sum(expenses, expenseSumDOM);
}

function createConfirmButton() {
    let confirmEditBtn = document.createElement("button");
    confirmEditBtn.innerText = SaveMessage;
    confirmEditBtn.classList.add("edit");
    return confirmEditBtn
}


function editExpenseButtonsSettings(span, editName, editAmount, deleteBtn,editBtn) {
    editName.contentEditable = true;
    editAmount.contentEditable = true;
    editName.style.backgroundColor = buttonsActiveBackgroundColor;
    editAmount.style.backgroundColor = buttonsActiveBackgroundColor;
    span.removeChild(deleteBtn);
    span.removeChild(editBtn);
}

function createSpanandAddToDoc(id, data, stringSetting ) {
   return document.querySelector(`span[data-id="${id}"] span[${stringSetting}"${data}"]`);
}

function removeExpense(id, li, expensesDOM){
    expensesDOM.removeChild(li);
    expenses = expenses.filter((expense) => expense.id !== id);
    sum(expenses, expenseSumDOM);
}

function createSpan(li) {
    const span = document.createElement("span");
    li.appendChild(span);
    return span;
}

function createList(expensesDOM, id, name, amount){
    const list = document.createElement("li");
    list.classList.add("list");
    expensesDOM.appendChild(list);
    list.innerHTML = createSpanStrting(id, name, amount);
    expenseName.value = emptyStringMessage;
    expenseAmount.value = emptyStringMessage;
    return list;
}

function createSpanStrting(id, name, amount) {
    return `<span data-id="${id}"><span data-name="${name}">${name}</span> - <span data-amount="${amount}">${amount}</span> zł</span>`;
}

function createExpenseElement(expenseName, expenseAmount) {
    const newExpense = {
        id: uuid.v4(),
        name: expenseName.value,
        amount: Number(expenseAmount.value),
    };
    return newExpense;
}

function createEditButton(span){
    const editBtn = document.createElement("button");
    editBtn.innerText = editMessage;
    editBtn.classList.add("edit");
    span.appendChild(editBtn);
    return editBtn;
}
function createDeleteButton(span){
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = deleteMessage;
    deleteBtn.classList.add("delete");
    span.appendChild(deleteBtn);
    return deleteBtn;
}

export { expenseSumDOM };