function addMatrices() {
    performMatrixOperation('add');
}

function subtractMatrices() {
    performMatrixOperation('subtract');
}

function multiplyMatrices() {
    performMatrixOperation('multiply');
}

function performMatrixOperation(operation) {
    // Get matrices input values
    var matrixA = parseMatrix(document.getElementById('matrixA').value);
    var matrixB = parseMatrix(document.getElementById('matrixB').value);

    // Check if matrices are valid
    if (!matrixA || !matrixB) {
        alert('Please enter valid matrices.');
        return;
    }

    // Perform the matrix operation
    var resultMatrix;
    switch (operation) {
        case 'add':
            resultMatrix = addMatrix(matrixA, matrixB);
            break;
        case 'subtract':
            resultMatrix = subtractMatrix(matrixA, matrixB);
            break;
        case 'multiply':
            resultMatrix = multiplyMatrix(matrixA, matrixB);
            break;
        default:
            alert('Invalid operation.');
            return;
    }

    // Display the result
    document.getElementById('result').value = matrixToString(resultMatrix);
}

function parseMatrix(matrixString) {
    try {
        return JSON.parse(matrixString.replace(/\n/g, ' ').replace(/\s+/g, ' '));
    } catch (error) {
        return null;
    }
}

function matrixToString(matrix) {
    return JSON.stringify(matrix).replace(/\],\[/g, ']\n[').replace(/\],/g, ']\n').replace(/\[/g, '').replace(/\]/g, '');
}

function addMatrix(matrixA, matrixB) {
    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        alert('Matrices must have the same dimensions for addition.');
        return null;
    }

    var resultMatrix = [];
    for (var i = 0; i < matrixA.length; i++) {
        var row = [];
        for (var j = 0; j < matrixA[0].length; j++) {
            row.push(matrixA[i][j] + matrixB[i][j]);
        }
        resultMatrix.push(row);
    }

    return resultMatrix;
}

function subtractMatrix(matrixA, matrixB) {
    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        alert('Matrices must have the same dimensions for subtraction.');
        return null;
    }

    var resultMatrix = [];
    for (var i = 0; i < matrixA.length; i++) {
        var row = [];
        for (var j = 0; j < matrixA[0].length; j++) {
            row.push(matrixA[i][j] - matrixB[i][j]);
        }
        resultMatrix.push(row);
    }

    return resultMatrix;
}

function multiplyMatrix(matrixA, matrixB) {
    if (matrixA[0].length !== matrixB.length) {
        alert('Number of columns in Matrix A must be equal to the number of rows in Matrix B for multiplication.');
        return null;
    }

    var resultMatrix = [];
    for (var i = 0; i < matrixA.length; i++) {
        var row = [];
        for (var j = 0; j < matrixB[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < matrixA[0].length; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }
            row.push(sum);
        }
        resultMatrix.push(row);
    }

    return resultMatrix;
}