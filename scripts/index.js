import { toggleClass, createBoard, drawNumber } from './functions.js';
/*
פונקציית חץ
(כאן יהיו הפרמטרים שהפונקציה מקבלת) => {גוף הפונקציה}
*/
// document.querySelector('#btn1').addEventListener('click', () => {
//   alert(`הכל טוב???`);
// });

// document.querySelector('#btn2').addEventListener('click', toggleClass);

document.querySelector('#start').addEventListener('click', createBoard);

document.querySelector('#draw').addEventListener('click', drawNumber);