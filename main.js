import { getSolution } from "./modules/words.js";

window.addEventListener('DOMContentLoaded', () => {


    /* RENDER GAME FIELD */
    let solution = getSolution();
    // let solution = 'WATER';
    console.log('Solution: ' + solution);

    renderGameContainer(solution.length);

    function renderGameContainer(columns) {
        const container = document.createElement('section');
        container.setAttribute('id', 'gameContainer');
        
        for (let i = 0; i < 6; i++) {
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

        let winMessage = document.getElementById('winMessage');
        let loseMessage = document.getElementById('loseMessage');
        let showSolution = document.getElementsByClassName('solution');
        for (let i = 0; i < showSolution.length; i++) {
            showSolution[i].innerHTML = solution;
        }

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
            }
        });

        enter.addEventListener('click', checkGuess);
        
        function checkGuess() {
            if (c === solution.length) {
                let gameContainer = document.getElementById('gameContainer');
                guess = guess.join('');
                compare(guess, solution);
                if (guess === solution) {
                    setTimeout(() => {
                        winMessage.style.display = 'block';
                        gameContainer.style.visibility = 'hidden';
                    }, 500);
                    enter.removeEventListener('click', checkGuess);
                }
                else if (r === 5 && c === solution.length && guess !== solution) {
                    loseMessage.style.display = 'block';
                    gameContainer.style.visibility = 'hidden';
                }
                targetCell = document.getElementsByClassName('row')[r += 1].children[c = 0];
                guess = [];
            } else if (c !== solution.length) {
                alert('Het ingevoerde woord is te kort.')
            }
        }

        function compare(guess, solution) {
            let misplaced = [];
            let solutionTemp = solution.split("");
            
            for (let i = 0; i < solution.length; i++) {
                let guessLetter = guess.charAt(i);
                let solutionLetter = solution.charAt(i);
                let guessKey = document.getElementById(guessLetter);
                targetCell = document.getElementsByClassName('row')[r].children[i];
                
                function alterSolutionTemp() {
                    delete solutionTemp[solution.indexOf(guessLetter)];
                }

                if (guessLetter === solutionLetter) {
                    alterSolutionTemp();
                    console.log(solutionTemp);
                    
                    targetCell.style.backgroundColor = 'green';
                    targetCell.style.border = '2px solid green';
                    targetCell.style.color = 'white';
                    guessKey.style.backgroundColor = 'green';
                }
                else if (solution.indexOf(guessLetter) != -1) {
                    if (solutionTemp.includes(guessLetter)) {
                        misplaced.push(guessLetter);
                    }
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
            // for (let i = 0; i < misplaced.length; i++) {
            //     console.log(misplaced[i]);
            // }
            console.log('Misplaced: ' + misplaced);

        }
    }

    playGame();

});