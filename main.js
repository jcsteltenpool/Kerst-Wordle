import { getSolution } from "./modules/words.js";

/* RENDER GAME FIELD */
let solution = getSolution();
console.log('Solution: ' + solution);

renderGameField(6, solution.length);

function renderGameField(rows, columns) {
    const container = document.createElement('section');
    container.setAttribute('class', 'gameContainer');
    
    for (let i = 0; i < rows; i++) {
        let row = document.createElement('div');
        row.setAttribute('class', 'row');
        container.appendChild(row);
        for (let i = 0; i < columns; i++) {
                    let rowCell = document.createElement('div');
                    rowCell.setAttribute('class', 'rowCell');
                    row.appendChild(rowCell);
            }
    }
    document.querySelector('main').prepend(container);
};

/* KEYBOARD */

const keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
const backspace = document.getElementById('backspace');
const enter = document.getElementById('enter');

const inputs_array = [];
keys.forEach((key) => {
    inputs_array.push(document.getElementById(key));
})

/* PLAY GAME */

function playGame() {
    let r = 0;
    let c = 0;
    let targetCell = document.getElementsByClassName('row')[r].children[c];
    let guess = [];
    
    for(let i = 0; i < inputs_array.length; i++) {
        let inputLetter = inputs_array[i].innerHTML;
        inputs_array[i].addEventListener('click', function() {
            targetCell.innerHTML = inputLetter;
            if (c <= solution.length) {
                targetCell = document.getElementsByClassName('row')[r].children[c += 1];
            }
            guess.push(inputLetter);
        });
    }

    backspace.addEventListener('click', function() {
        if (c > 0) {
            targetCell = document.getElementsByClassName('row')[r].children[c -= 1];
            targetCell.innerHTML = '';
            guess.pop();
            // console.log(guess);     
        }
    });

    enter.addEventListener('click', function() {
        if (r < 6 && c === solution.length) {
            guess = guess.join('');
            // console.log(guess);
            let result = compare(guess, solution);
            if (guess === solution) {
                setTimeout(() => {
                    alert('Win!')
                }, 500);;
            }
            console.log('Result: ' + result);
            targetCell = document.getElementsByClassName('row')[r += 1].children[c = 0];
            guess = [];
        } else if (r != solution.length) {
            alert('Het ingevoerde woord is te kort.')
        }
    })

    function compare(guess, solution) {
        for (let i = 0; i < solution.length; i++) {
          let guessLetter = guess.charAt(i);
          console.log(guessLetter);
          let solutionLetter = solution.charAt(i);
          targetCell = document.getElementsByClassName('row')[r].children[i];
          let guessKey = document.getElementById(guessLetter);

          if (guessLetter === solutionLetter) {
            targetCell.style.backgroundColor = 'green';
            targetCell.style.border = '2px solid green';
            targetCell.style.color = 'white';
            guessKey.style.backgroundColor = 'green';
          }
          else if (solution.indexOf(guessLetter) != -1) {
            targetCell.style.backgroundColor = '#ffdd00';
            targetCell.style.border = '2px solid #ffdd00';
            if (guessKey.style.backgroundColor != 'green') {
                guessKey.style.backgroundColor = '#ffdd00';
            }
          }
          else {
            targetCell.style.backgroundColor = 'darkgray';
            targetCell.style.border = '2px solid darkgray';
            guessKey.style.backgroundColor = 'darkgray';
          }
        }
      }
}

playGame();

// console.log(inputs_array);
// inputs_array[1].style.backgroundColor = 'green';
