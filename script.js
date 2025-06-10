function addMatrices() {
  performMatrixOperation("add");
}

function subtractMatrices() {
  performMatrixOperation("subtract");
}

function multiplyMatrices() {
  performMatrixOperation("multiply");
}

function clearMatrices() {
  document.getElementById("matrixA").value = "";
  document.getElementById("matrixB").value = "";
  document.getElementById("resultMatrix").value = "";
}

function performMatrixOperation(operation) {
  const matrixA = parseMatrix(document.getElementById("matrixA").value);
  const matrixB = parseMatrix(document.getElementById("matrixB").value);

  if (!matrixA || !matrixB) {
    alert("Please enter valid matrices in JSON format (e.g., [[1,2],[3,4]]).");
    return;
  }

  let resultMatrix;
  switch (operation) {
    case "add":
      resultMatrix = addMatrix(matrixA, matrixB);
      break;
    case "subtract":
      resultMatrix = subtractMatrix(matrixA, matrixB);
      break;
    case "multiply":
      resultMatrix = multiplyMatrix(matrixA, matrixB);
      break;
    default:
      alert("Invalid operation.");
      return;
  }

  if (resultMatrix) {
    document.getElementById("resultMatrix").value =
      matrixToString(resultMatrix);
  }
}

function parseMatrix(matrixString) {
  try {
    const parsed = JSON.parse(matrixString);
    if (
      !Array.isArray(parsed) ||
      !parsed.every(
        (row) =>
          Array.isArray(row) && row.every((val) => typeof val === "number"),
      )
    ) {
      return null;
    }
    return parsed;
  } catch (error) {
    return null;
  }
}

function matrixToString(matrix) {
  return matrix.map((row) => row.join(" ")).join("\n");
}

function addMatrix(matrixA, matrixB) {
  if (
    matrixA.length !== matrixB.length ||
    matrixA[0].length !== matrixB[0].length
  ) {
    alert("Matrices must have the same dimensions for addition.");
    return null;
  }

  const resultMatrix = [];
  for (let i = 0; i < matrixA.length; i++) {
    const row = [];
    for (let j = 0; j < matrixA[0].length; j++) {
      row.push(matrixA[i][j] + matrixB[i][j]);
    }
    resultMatrix.push(row);
  }
  return resultMatrix;
}

function subtractMatrix(matrixA, matrixB) {
  if (
    matrixA.length !== matrixB.length ||
    matrixA[0].length !== matrixB[0].length
  ) {
    alert("Matrices must have the same dimensions for subtraction.");
    return null;
  }

  const resultMatrix = [];
  for (let i = 0; i < matrixA.length; i++) {
    const row = [];
    for (let j = 0; j < matrixA[0].length; j++) {
      row.push(matrixA[i][j] - matrixB[i][j]);
    }
    resultMatrix.push(row);
  }
  return resultMatrix;
}

function multiplyMatrix(matrixA, matrixB) {
  if (matrixA[0].length !== matrixB.length) {
    alert(
      "Number of columns in Matrix A must equal the number of rows in Matrix B for multiplication.",
    );
    return null;
  }

  const resultMatrix = [];
  for (let i = 0; i < matrixA.length; i++) {
    const row = [];
    for (let j = 0; j < matrixB[0].length; j++) {
      let sum = 0;
      for (let k = 0; k < matrixA[0].length; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      row.push(sum);
    }
    resultMatrix.push(row);
  }
  return resultMatrix;
}
