//Initializing constants and variables
const budgetAmountInput = document.querySelector(".budget-amount");
const budgetAmountBtn = document.querySelector(".budget-amount-btn");
const expenseType = document.querySelector(".expense-type");
const expenseAmountInput = document.querySelector(".expense-amount");
const expenseBtn = document.querySelector(".expense-amount-btn");

const expenseDetails = []; // Array to store expense Details
const expenseAmounts = []; // Array to store expense amounts

// Event listener for setting the budget
budgetAmountBtn.addEventListener('click', () => {
    if (budgetAmountInput.value) {
        if (!isNaN(budgetAmountInput.value)) {
            if (budgetAmountInput.value > 0) {
                document.querySelector(".user-enter-budget").innerHTML = budgetAmountInput.value;
            } else {
                budgetAmountInput.value = "Value should be positive";
            }
        } else {
            budgetAmountInput.value = "Plz Enter a Number";
        }
    } else {
        budgetAmountInput.value = "Plz fill it first";
    }
    updateBalance(); // Update remaining budget
});

// Event listener for adding expenses
expenseBtn.addEventListener('click', () => {
    let isMatch = false; // Flag for valid expense entry

    // Validate expense type
    if (expenseType.value) {
        if (isNaN(expenseType.value)) {
            isMatch = true;
        } else {
            expenseType.value = "Plz Enter non-numeric value";
            isMatch = false;
        }
    } else {
        expenseType.value = "Plz Fill it first";
        isMatch = false;
    }

    // Validate expense amount
    if (expenseAmountInput.value) {
        if (!isNaN(expenseAmountInput.value)) {
            if (expenseAmountInput.value > 0) {
                
            } else {
                expenseAmountInput.value = "Value should be positive";
                isMatch = false;
            }
        } else {
            expenseAmountInput.value = "Plz Enter a Number";
            isMatch = false;
        }
    } else {
        expenseAmountInput.value = "Plz fill it first";
        isMatch = false;
    }

    if (isMatch) {
        const totalExpense = document.querySelector(".user-enter-expense");
        totalExpense.innerHTML = Number(totalExpense.innerHTML) + Number(expenseAmountInput.value);


        updateBalance(); // Update remaining budget
        // Store valid expense details
        expenseDetails.push(expenseType.value);
        expenseAmounts.push(expenseAmountInput.value);
        updateExpenseDetails(); // Refresh expense display
    }
});

// Function to update remaining budget
function updateBalance() {
    const budgetAmount = document.querySelector(".user-enter-budget");
    const expenseAmount = document.querySelector(".user-enter-expense");

    if ((Number(budgetAmount.innerHTML) >= 0) && (Number(expenseAmount.innerHTML) >= 0)) {
        document.querySelector(".user-remaining-budget").innerHTML = Number(budgetAmount.innerHTML) - Number(expenseAmount.innerHTML);
    }
}

// Function to display expense details
function updateExpenseDetails() {
    let htmlCode = '';

    for (let i = 0; i < expenseDetails.length; i++) {
        htmlCode += `
            <div class="each-expense-details">
                <div class="exp-det-part-1">
                    <span>${i + 1}. </span>
                    <span class="expense-name">${expenseDetails[i]}</span>
                </div>
                <p class="expense-amount">
                    ${expenseAmounts[i]}<span>$</span>  
                </p>
                <div class="ex-det-btns">
                    <button class="edit" data-index="${i}">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </button>
                    <button class="del" data-index="${i}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }

    document.querySelector(".all-expense-details").innerHTML = htmlCode; // Update expense list

    attachDeleteEventListeners(); // Attach delete button events
    attachEventToEditBtns(); // Attach edit button events
}

// Function to attach delete event listeners
function attachDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll(".del");

    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            deleteExpense(index); // Delete the selected expense
        });
    });
}

// Function to delete an expense
function deleteExpense(index) {
    const totalExp = document.querySelector(".user-enter-expense");
    totalExp.innerHTML = Number(totalExp.innerHTML) - expenseAmounts[index]; // Update total expense
    updateBalance(); // Refresh remaining budget

    // Remove from arrays
    expenseDetails.splice(index, 1);
    expenseAmounts.splice(index, 1);

    updateExpenseDetails(); // Refresh expense display
}

// Function to attach edit button events
function attachEventToEditBtns() {
    document.querySelectorAll(".edit").forEach(btn => {
        btn.addEventListener('click', function () {
            const index = this.getAttribute("data-index");
            editSelectedExp(index); // Edit the selected expense
        });
    });
}

// Function to edit an expense
function editSelectedExp(index) {
    expenseType.value = expenseDetails[index]; // Set values for editing
    expenseAmountInput.value = expenseAmounts[index];
    deleteExpense(index); // Delete original expense entry
}
