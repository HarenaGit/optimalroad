import {AlgoType} from '../utilities/algoType'
import {Algorithm} from '../utilities/algorithm'

export function createDemouchronArray(rows, cols, algotype){
    var arr = [];
    for(var i = 0; i<rows; i++){
        arr.push([]);
        arr[i].push(new Array(cols));
        for(var j=0;j<cols;j++){
           if(algotype == AlgoType.min)  arr[i][j] = Infinity;
           else  arr[i][j] = 0;
        }
    }

    return arr;
}

export async function Demouchron(sortOfAlgo , matrice, initialMatrice, algorithm, action = (value = null)=>{}, getResult = (value = null) => {}){

   if(algorithm == Algorithm.demouchronWarshallFloyd) return  await demouchronWFAlgo(matrice, initialMatrice, sortOfAlgo, action, getResult);
   if(algorithm == Algorithm.demouchron)  return  await demouchronAlgo(matrice, sortOfAlgo, action);
}

function createIndiceTable(table){
    var arr = [];
    for(var i = 0; i<table.length; i++){
        arr.push([]);
        arr[i].push(new Array(table[i].length));
        for(var j=0;j<table[i].length;j++){
            if(table[i][j] != Infinity) arr[i][j] = i
            else arr[i][j] = Infinity;
        }
     }

    return arr;
}

async function demouchronWFAlgo(demouchronArray, initialMatrice, sortOfAlgo, action, getResult){
  let d = demouchronArray.slice(0)
  var sommet = d.length;
  var indiceTable = createIndiceTable(initialMatrice)
  let initial =  d.map(object => ([...object]));
  let initialIndice = indiceTable.map(object => ([...object]))
  await action(initial)
  await getResult(initialIndice)
  for(var k = 1; k<sommet -1; k++){
    
    var i = [];
    var j = [];
    for(var compt = 0; compt<sommet; compt++){
        if(sortOfAlgo == AlgoType.min){
            if(d[compt][k] != Infinity) i.push(compt);
            if(d[k][compt] != Infinity) j.push(compt);
        }
        else{
            if(d[compt][k] != 0) i.push(compt);
            if(d[k][compt] != 0) j.push(compt);
        }
        
    } 
  
    for(var current_i = 0; current_i<i.length; current_i++){
        for(var current_j=0; current_j<j.length; current_j++){
            var current_w;
           var current_value;
           if(sortOfAlgo == AlgoType.min){
            current_w =  d[i[current_i]][k] + d[k][j[current_j]]; 
            current_value = min(current_w, d[i[current_i]][j[current_j]]);
            if(d[i[current_i]][j[current_j]] > current_w){
                indiceTable[i[current_i]][j[current_j]] = indiceTable[k][j[current_j]]
            }
           } 
           else{
            current_w =  d[i[current_i]][k] + d[k][j[current_j]];
            current_value = max(current_w, d[i[current_i]][j[current_j]]);
            if(d[i[current_i]][j[current_j]] < current_w){
                indiceTable[i[current_i]][j[current_j]] = indiceTable[k][j[current_j]]
            }
           }
           d[i[current_i]][j[current_j]] = current_value;
           
        }

    }
    let modifiedValue = d.map(object => ([...object]));
    let modifiedIndice = indiceTable.map(object => ([...object]))
   await action(modifiedValue)
   await getResult(modifiedIndice)
  }

  let idx = []
  await getCheminByFloydWarshall(indiceTable, idx, sommet-1);
  return idx;
}
function getCheminByFloydWarshall(indiceTable, idx, indice){
    if(indice + 1 == 1){
        idx.push(indice+1);
        return;
    }
    idx.push(indice+1);
    getCheminByFloydWarshall(indiceTable, idx, indiceTable[0][indice]);
}


async function demouchronAlgo(d, sortOfAlgo, action){
    var sommet = d.length;
    let initial =  d.map(object => ([...object]));
    await action(initial)
    
    for(var k = 1; k<sommet -1; k++){
      var i = [];
      var j = [];
      for(var compt = 0; compt<sommet; compt++){
          if(sortOfAlgo == AlgoType.min){
              if(d[compt][k] != Infinity) i.push(compt);
              if(d[k][compt] != Infinity) j.push(compt);
          }
          else{
              if(d[compt][k] != 0) i.push(compt);
              if(d[k][compt] != 0) j.push(compt);
          }
          
      } 
    
      for(var current_i = 0; current_i<i.length; current_i++){
          for(var current_j=0; current_j<j.length; current_j++){
              var current_w;
             var current_value;
             if(sortOfAlgo == AlgoType.min){
              current_w =  d[i[current_i]][k] + d[k][j[current_j]]; 
              current_value = min(current_w, d[i[current_i]][j[current_j]]);
             
             } 
             else{
              current_w =  d[i[current_i]][k] + d[k][j[current_j]];
              current_value = max(current_w, d[i[current_i]][j[current_j]]);
             
             }
             d[i[current_i]][j[current_j]] = current_value;
             
          }
      }
      let modifiedValue = d.map(object => ([...object]));
      await action(modifiedValue)
    }
  
    let idx = []
    await getChemin(d, sommet-1, idx, sortOfAlgo);
    return idx;
  }

function getChemin(table, indice, idx, sortOfAlgo){
   if(indice == 0){
    idx.push(indice+1)
    return;
   }
   idx.push(indice+1)
   var current_table = arrayColumn(table, indice)
   var result = current_table[0];
   for(var i = 1; i<current_table.length; i++){
    
    if(sortOfAlgo == AlgoType.min) {if(result > current_table[i]) result = current_table[i];}
    else {if(result < current_table[i]) result = current_table[i];}     
   }
   getChemin(table, current_table.indexOf(result), idx, sortOfAlgo)
}


function arrayColumn(arr, n)
{
    return arr.map(x => x[n]);
}

function min(val1,val2){
    if(val1 < val2)return val1;
    else return val2;
}

function max(val1, val2){
    if(val1 > val2) return val1;
    else return val2; 
}
