function calculate(expr) {
    let arrExpr = expr.split(' ');

    let getOperation = (symb, iter) => {
       if(symb === '+') {
        arrExpr[iter] = Number(arrExpr[iter - 1]) + Number(arrExpr[iter + 1]);
       }else if(symb === '-') {
        arrExpr[iter] = Number(arrExpr[iter - 1]) - Number(arrExpr[iter + 1]);
       }else if(symb === '*') {
        arrExpr[iter] = Number(arrExpr[iter - 1]) * Number(arrExpr[iter + 1]);
       }else if((symb === '/')) {
        arrExpr[iter] = Number(arrExpr[iter - 1]) / Number(arrExpr[iter + 1]);
       }
        arrExpr.splice(iter - 1, 1);
        arrExpr.splice(iter, 1);
    }

    for (let i = 0; i < arrExpr.length; i++) {
        if (arrExpr[i] === "*") {
            getOperation('*', i)
            i -= 1;
        }
        if (arrExpr[i] === "/") {
            if (arrExpr[i + 1] === '0') throw new TypeError('TypeError: Division by zero.');
            getOperation('/', i)
            i -= 1;
        }
    }
    for (let i = 0; i < arrExpr.length; i++) {
        if (arrExpr[i] === "+") {
            getOperation('+', i);
            i -= 1;
        }
        if (arrExpr[i] === "-") {
            getOperation('-', i);
            i -= 1;
        }
    }
    return Number(arrExpr[0]);
}

function expressionCalculator(expr) {
    expr = expr.replace(/\s/g, '').replace(/(\*|\/|\+|\-)/g, ' $& ');
    let openBrackets = 0, closeBrackets = 0;

    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '(') {
            openBrackets += 1;
        }
        if (expr[i] == ')') {
            closeBrackets += 1;
        }
    }
    if (openBrackets !== closeBrackets) {
        throw new Error("ExpressionError: Brackets must be paired.");
    }

    let bracketsExpression;

    while (openBrackets > 0) {
        if ((bracketsExpression = expr.match(/(\([0-9\+\/\*\-. ]+\))/g)) !== null) {
            for (let i = 0; i < bracketsExpression.length; i++) {
                let str = bracketsExpression[i].replace('(', '').replace(')', '');
                expr = expr.replace(bracketsExpression[i], calculate(str));
            }
        }
        openBrackets -= 1;
    }
    return calculate(expr);
}

module.exports = {
    expressionCalculator
}