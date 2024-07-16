import { global } from './vars.js';

export function toggleClass(event) {
  console.log(event);

  //event.target -> האלמנט שהפעיל את האירוע
  let element = event.target;

  /* option 1 -> check if contains */
  // if (element.classList.contains('btn') == false)
  //   element.classList.add('btn');
  // else
  //   element.classList.remove('btn');

  /* option 2 -> using toggle */
  element.classList.toggle('btn');
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function resetGame() {
  global.board = new Array();
}

export function createBoard() {
  resetGame();

  let count = 0;

  //לולאה שיוצרת מערך עם מספרים ייחודיים בגודל 49
  while (count != 49) {
    //הגרלת מספר חדש באמצעות הפונקציה
    let n = getRandomNumber(1, 100);

    //אם לא קיים, לשמור ולהעלות את המונה ב-1
    if (checkIfNumExists(n, global.board) == false) {
      global.board.push(n);
      count++;
    }
  }

  printBoard();
}

function printBoard() {

  let tableHTML = '<table>';
  let count = 0;
  //TODO: loop
  for (let row = 0; row < 7; row++) {
    //create row  
    tableHTML += '<tr>';
    for (let col = 0; col < 7; col++) {
      //create col
      tableHTML += `<td data-row="${row}" data-col="${col}">${global.board[count++]}</td>`;
    }
    //close row tag
    tableHTML += '</tr>';
  }

  //לסגור את הטבלה
  tableHTML += '</table>';

  //DOM להוסיף ל
  document.querySelector('#board').innerHTML = tableHTML;

  //שיוך אירוע לחיצה על כל תא
  document.querySelectorAll('#board table td').forEach((td) => {
    td.addEventListener('click', checkForHit);
  });

}

function checkIfNumExists(num, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == num)
      return true;
  }

  return false;
}

function checkForHit(event) {
  let element = event.target;
  console.log(element)
  let number = Number(element.innerHTML);
  
  if (checkIfNumExists(number, global.numbers) == true) {
    element.classList.add('hit');
    checkWin(element);
  }
  else{
    global.miss++;
    if(global.miss == 3){
      alert("YOU DISQUALIFIED!!!")
    }
  }
}

export function drawNumber() {
  let n;
  do {
    n = getRandomNumber(1, 100);
  } while (checkIfNumExists(n, global.numbers) == true);

  global.numbers.push(n);

  document.querySelector('#numbers').innerHTML = `<p>${global.numbers.join(', ')}</p>`;
}

function checkWin(element){
  let count = 1;

  document.querySelectorAll(`td[data-row="${element.dataset.row}"]`).forEach((item) => {if(item.classList.contains('hit')) count++})
  
  if(count == 7){
    alert("YOU WIN!!!!")
    return;
  }
  count = 1;
  document.querySelectorAll(`td[data-col="${element.dataset.col}"]`).forEach((item) => {if(item.classList.contains('hit')) count++})
  if(count == 7){
    alert("YOU WIN!!!!")
    return;
  }

}


