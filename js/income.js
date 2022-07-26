import { sum } from './summing.js';

const incomesDOM   = document.querySelector("#incomes-ul");
const incomeName   = document.querySelector("#income-name");
const incomeAmount = document.querySelector("#income-amount");
const incomeSumDOM = document.querySelector("#income-sum");
let incomes = [];

const editMessage = "Edytuj";
const deleteMessage = "Usuń";
const SaveMessage = "Zapisz";
const buttonsActiveBackgroundColor = "#F5F5F5";
const emptyStringMessage = "";

export function incomeButton(element){
	element.preventDefault();
	if (incomeName.value !== "" && incomeAmount.value > 0) {

		const newincome = createIncomeElement(incomeName, incomeAmount);
		incomes.push(newincome);
		sum(incomes, incomeSumDOM);

		incomesDOM.innerHTML = emptyStringMessage;
		incomes.forEach(({ id, name, amount }) => {

			const li = createList(incomesDOM, id, name, amount);
			const span = createSpan(li);
			const editBtn = createEditButton(span);
			const deleteBtn = createDeleteButton(span);

			deleteBtn.addEventListener("click", () => {
                removeIncom(id, li, incomesDOM);
			});

			editBtn.addEventListener("click", () => {

				let editName = createSpanandAddToDoc(id, name, "data-name=");
				let editAmount = createSpanandAddToDoc(id, amount, "data-amount");

                editIncomeButtonsSettings(editName, editAmount) 
				const confirmEditBtn = createConfirmButton();

				confirmEditBtn.addEventListener("click", () => {
                    eventToEditButton(confirmEditBtn, editName, editAmount, span, editBtn, deleteBtn, id, incomes)
				});
				span.appendChild(confirmEditBtn);
			});
		});
	} else {
		return;
	}

};

function createSpanandAddToDoc(id, data, stringSetting ) {
    document.querySelector(`span[data-id="${id}"] span[${stringSetting}"${data}"]`);
}


function editIncomeButtonsSettings(editName, editAmount) {
    editName.contentEditable = true;
    editAmount.contentEditable = true;
    editName.style.backgroundColor =buttonsActiveBackgroundColor;
    editAmount.style.backgroundColor = buttonsActiveBackgroundColor;
    span.removeChild(deleteBtn);
    span.removeChild(editBtn);
}

function eventToEditButton(confirmEditBtn, editName, editAmount, span, editBtn, deleteBtn, id, incomes) {

    editName.contentEditable = false;
    editAmount.contentEditable = false;
    editName.style.backgroundColor = "transparent";
    editAmount.style.backgroundColor = "transparent";
    span.removeChild(confirmEditBtn);
    span.appendChild(editBtn);
    span.appendChild(deleteBtn);

    const newIncomeName = editName.textContent;
    const newIncomAmount = Number(editAmount.textContent);

    incomes = incomes.map((income) =>
        income.id === id
            ? { ...income, name: newIncomeName, amount: newIncomAmount }
            : income
    );
    sum(incomes, incomeSumDOM);
}

function createConfirmButton() {
    const confirmEditBtn = document.createElement("button");
    confirmEditBtn.innerText = SaveMessage;
    confirmEditBtn.classList.add("edit");
    return confirmEditBtn
}

function removeIncom(id, li, incomesDOM){
    incomesDOM.removeChild(li);
    incomes = incomes.filter((income) => income.id !== id);
    sum(incomes, incomeSumDOM);
}

function createSpan(li) {
    const span = document.createElement("span");
    li.appendChild(span);
    return span;
}

function createList(incomesDOM, id, name, amount){
    const list = document.createElement("li");
    list.classList.add("list");
    incomesDOM.appendChild(list);
    list.innerHTML = createSpanStrting(id, name, amount);
    incomeName.value = emptyStringMessage;
    incomeAmount.value = emptyStringMessage;
    return list;
}

function createSpanStrting(id, name, amount) {
    return `<span data-id="${id}"><span data-name="${name}">${name}</span> - <span data-amount="${amount}">${amount}</span> zł</span>`;
}


function createIncomeElement(incomeName, incomeAmount) {
    const newincome = {
        id: uuid.v4(),
        name: incomeName.value,
        amount: Number(incomeAmount.value),
    };
    return newincome;
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

export { incomeSumDOM };