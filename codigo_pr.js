
function inicializarEditor() {
  var matrixEditor = document.getElementById('matrixEditor');
  var fil = document.getElementById('fila').value;
  var col = document.getElementById('columna').value;
  var dimension = 3; // Cambia esto según la dimensión de tu matriz

  for (var i = 0; i < fil; i++) {
    for (var j = 0; j < col; j++) {
      var cell = document.createElement('div');
      cell.className = 'editable-cell_1';
      var input = document.createElement('input');
      input.className='cell';
      input.type = 'text';
      cell.appendChild(input);
      matrixEditor.appendChild(cell);
    }
    matrixEditor.appendChild(document.createElement('br'));
  }
  var matrixEditor = document.getElementById('matrixB');
  for (var i = 0; i != 1; i++) {
    for (var j = 0; j < fil; j++) {
      var cell = document.createElement('div');
      cell.className = 'editable-cell_2';
      var input = document.createElement('input');
      input.className='cell';
      input.type = 'text';
      cell.appendChild(input);
      matrixEditor.appendChild(cell);
      matrixEditor.appendChild(document.createElement('br'));
    }

  }

}
function obtenerMatriz_a() {
  var matrix = [];
  var inputs = document.getElementById('matrixEditor').getElementsByTagName('input');

  for (var i = 0; i < inputs.length; i++) {
    matrix.push(parseFloat(inputs[i].value));
  }
  return matrix;
}
function obtenerMatriz_b() {
  var matrix = [];
  var inputs = document.getElementById('matrixB').getElementsByTagName('input');

  for (var i = 0; i < inputs.length; i++) {
    matrix.push(parseFloat(inputs[i].value));
  }
  alert(matrix);
  return matrix;
}

function esMatrizSimetrica(matrix, dimension) {
  // Lógica para verificar si la matriz es simétrica
  for (var i = 0; i < dimension; i++) {
    for (var j = 0; j < i; j++) {
      if (matrix[i * dimension + j] !== matrix[j * dimension + i]) {
        return false;
      }
    }
  }
  return true;
}
function d_p_positivo(matriz) {
  var dim = Math.sqrt(matriz.length);
  for (var i = 0; i < dim; i++) {
    if (matriz[dim * i] < 0) { return false; }
  }
  return true;
}
function permutal(matriz, fil1, fil2) {
  var dim = Math.sqrt(matriz.length);
  for (var x = 0; x < dim; x++) {
    var aux = matriz[fil1 * dim + x];
    matriz[fil1 * dim + x] = matriz[fil2 * dim + x];
    matriz[fil2 * dim + x] = aux;
  }
}
function matriz_cero(dim) {
  var matriz = [];
  for (var i = 0; i < dim * dim; i++) {
    matriz.push(0);
  }
}
function choleskyDecomposition(matrix, dimension) {
  var L = new Array(matrix.length).fill(0);

  for (var i = 0; i < dimension; i++) {
    for (var j = 0; j <= i; j++) {
      var sum = 0;
      for (var k = 0; k < j; k++) {
        sum += L[i * dimension + k] * L[j * dimension + k];
      }
      if (i == j) {
        L[i * dimension + j] = Math.sqrt(matrix[i * dimension + i] - sum);
      } else {
        L[i * dimension + j] = (1 / L[j * dimension + j]) * (matrix[i * dimension + j] - sum);
      }
    }
  }

  return L;
}
function resolverSistemaDeEcuaciones(cholesky, dimension) {
  // Aquí puedes resolver el sistema de ecuaciones usando la descomposición de Cholesky

  var B = obtenerMatriz_b();
  var y = [];
  var x = [];

  // Sustitución hacia adelante
  for (var i = 0; i < dimension; i++) {
    var sum = 0;
    for (var j = 0; j < i; j++) {
      sum += cholesky[i * dimension + j] * y[j];
    }
    y[i] = (B[i] - sum) / cholesky[i * dimension + i];
  }

  // Sustitución hacia atrás
  for (var i = dimension - 1; i >= 0; i--) {
    var sum = 0;
    for (var j = i + 1; j < dimension; j++) {
      sum += cholesky[j * dimension + i] * x[j];
    }
    x[i] = (y[i] - sum) / cholesky[i * dimension + i];
  }

  return x;
}

// var cell = document.createElement('div');
//       cell.className = 'editable-cell_1';
//       var input = document.createElement('input');
//       input.type = 'text';
//       cell.appendChild(input);
//       matrixEditor.appendChild(cell);

function mostrarResultado(resultado) {
  var val = '';
  var num;
  var mos = document.getElementById('resultados');
  for(var i = 0; i < resultado.length; i++){
    var res = document.createElement('input');
    res.className='cell';
    res.type = 'Text';
    num = resultado[i];
    num = num.toFixed(4);
    val += 'X'+ (i+1) + '= '+num;
    res.value=val;
    mos.appendChild(res);
    mos.appendChild(document.createElement('br'));
    val ='';
  }
}
function choleskyDecomposition(matrix, dimension) {
  var L = new Array(matrix.length).fill(0);

  for (var i = 0; i < dimension; i++) {
    for (var j = 0; j <= i; j++) {
      var sum = 0;
      for (var k = 0; k < j; k++) {
        sum += L[i * dimension + k] * L[j * dimension + k];
      }
      if (i == j) {
        L[i * dimension + j] = Math.sqrt(matrix[i * dimension + i] - sum);
      } else {
        L[i * dimension + j] = (1 / L[j * dimension + j]) * (matrix[i * dimension + j] - sum);
      }
    }
  }

  return L;
}
function alcularCholeskyc() {
  var matrix = obtenerMatriz_a();
  var dimension = Math.sqrt(matrix.length);

  // Verificar si la matriz es cuadrada
  if (Number.isInteger(dimension)) {
    // Verificar si la matriz es simétrica
    if (esMatrizSimetrica(matrix, dimension)) {
      // Calcular la descomposición de Cholesky
      var cholesky = choleskyDecomposition(matrix, dimension);

      // Resolver el sistema de ecuaciones usando la descomposición de Cholesky
      var resultados = resolverSistemaDeEcuaciones(cholesky, dimension);

      // Mostrar el resultado
      mostrarResultado(resultados);
    } else {
      alert('La matriz ingresada no es simétrica.');
    }
  } else {
    alert('La matriz ingresada no es cuadrada.');
  }
}