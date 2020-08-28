let col = 100;
let fil = 100;

let mat = [];
for(let x = 0; x < col; x++) {
     mat[x] = [];
     for(let y = 0; y < fil; y++){
           mat[x][y] = Math.random() * 100;
     }
}
console.table(mat);

//Inciso A
getValorMaximo(mat);

function getValorMaximo() {
      let max = -1;
      for(let x = 0; x < col; x++) {
            for(let y = 0; y < fil; y++) {
                  if(mat[x][y] > max){
                        max = mat[x][y];
                  }
            }
      }
      console.log("El valor maximo de la matriz es: " + max);
}
//Inciso B
getMaxMin(mat)

function getMaxMin(){

      for(let x = 0; x < fil; x++) {
            if(x%2 == 0){      
                  var max = -1;
                  for(let y = 0; y < col; y++) {
                        if(mat[x][y] > max){
                              max = mat[x][y];
                        }
                  }
                  console.log("El valor maximo de la fila par " + x + " es: " + max);
            }
            else{
                  var min = 1000;
                  for(let y = 0; y < col; y++) {
                        if(mat[x][y] < min){
                              min = mat[x][y];
                        }
                  }
                  console.log("El valor minimo de la fila impar " + x + " es: " + min);
            }
      }
}
//Inciso C
getPromedioFila(mat);

function getPromedioFila(){
      let prom = [fil];
      let valoresPromedio = [];
      for(let x = 0; x < col; x++) {
            let sum = 0;
            for(let y = 0; y < fil; y++) {
                  sum += mat[x][y];
            }
            let promedio = sum % fil;
            valoresPromedio[x] = promedio;
      }
      valoresPromedio.forEach(element => console.log("el valor promedio de la fila es: "+ element));
}