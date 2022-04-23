const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operator')
const cancel = document.querySelector('.cancel')
const equality = document.querySelector('.equality')
const previousResult = document.querySelector('.previous_action')
const recentResult = document.querySelector('.recent_action')

let recentAction = ''
let previousAction = ''
let operation = undefined

const calculate = () => {
    let action

    if (!previousAction || !recentAction) {
        return
    }

    const previous = parseFloat(previousAction)
    const recent = parseFloat(recentAction)

    if (isNaN(previous) || isNaN(recent)) {
        return
    }

    switch (operation) {
        case '+':
            action = previous + recent
            break;
        case '-':
            action = previous - recent
            break;
        case 'x':
            action = previous * recent
            break;
        case '÷':
            if (recent === 0) {
                cleanResult()
                return
            }
            action = previous / recent
            break;
        case '%':
            action = previous / 100 * recent
            break;
        case '+/-':
            action = previous * -recent
            break;
        default:
            return
    }
    recentAction = action
    operation = undefined
    previousAction = ''
}

const selectOperation = (operators) => {
    if (recentAction === '') {
        return
    }
    if (previousAction !== '') {
        calculate()
    }
    operation = operators
    previousAction = recentAction
    recentAction = ''
}

const updateResult = () => {
    recentResult.innerText = recentAction
    if (operation != null) {
        previousResult.innerText = previousAction + operation
    } else {
        previousResult.innerText = ''
    }
}

const addNumber = (number) => {
    if (number === '∙') {
        if (recentAction.includes(',')) {
            return
        }
        number = ','
    }
    recentAction = recentAction.toString() + number.toString()
}

const deleteNumber = () => {
    recentAction = recentAction.toString().slice(0, 0)
}

numbers.forEach((number) => {
    number.addEventListener('click', () => {
        addNumber(number.innerText)
        updateResult()
    })
})

cancel.addEventListener('click', () => {
    deleteNumber()
    updateResult()
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        selectOperation(operator.innerText)
        updateResult()
    })
})

const cleanResult = () => {
    recentAction = ''
    operation = undefined
    previousAction = ''
    alert("nie mnóż przez zero cholero")
}

equality.addEventListener('click', () => {
    calculate()
    updateResult()
})