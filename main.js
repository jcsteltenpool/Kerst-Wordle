import { getSolution } from "./modules/words.js";

window.addEventListener('DOMContentLoaded', () => {
    
    /* RENDER GAME FIELD */
    let solution = getSolution();
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
        const merryXmas = new Audio('merrychristmas.mp3');

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
                        merryXmas.play();
                        winMessage.style.display = 'block';
                        gameContainer.style.visibility = 'hidden';
                    }, 750);
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
            let solutionTemp = solution.split("");
             
            let results = [];
            
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
                    results.push({value: guessLetter, color: 'green'});
                } else {
                    targetCell.style.backgroundColor = '#717171';
                    targetCell.style.border = '2px solid #717171';
                    results.push({value: guessLetter, color: '#717171'});
                }
            };

            for (let i = 0; i < solution.length; i++) {
                let guessLetter = guess.charAt(i);
                let guessKey = document.getElementById(guessLetter);
                let n = 0;
                targetCell = document.getElementsByClassName('row')[r].children[i];
                
                function countLetters(guess, solution) {
                    let nGuess = 0;
                    let nSol = 0;

                    guess = guess.split("");
                  
                    guess.forEach((element) => {
                      if (element === guessLetter) {
                        nGuess ++;
                      };
                    });
                    solution.forEach((element) => { 
                      if (element === guessLetter) {
                        nSol ++;
                      };
                    })
                    console.log('nguess ' + nGuess);
                    console.log('nsol ' + nSol)
                    n = nGuess - nSol;
                    console.log('n '+ n);
                }

                function alterSolutionTemp() {
                    delete solutionTemp[solution.indexOf(guessLetter)];
                }

                if (solutionTemp.indexOf(guessLetter) != -1) {
                    countLetters(guess, solutionTemp);
                    if (n <= 1) {
                        alterSolutionTemp();
                        console.log(solutionTemp);
                        if (targetCell.style.backgroundColor != 'green') {
                            targetCell.style.backgroundColor = '#ffdd00';
                            targetCell.style.border = '2px solid #ffdd00';
                            results.push({value: guessLetter, color: '#ffdd00'});
                        }
                    } 
                } 
            };
            
            for (let result in results) {
                const value = results[result].value;
                const color = results[result].color; 
                let guessKey = document.getElementById(value);
                if (guessKey.style.backgroundColor != 'green') {
                    guessKey.style.backgroundColor = color;                   
                } else {
                    guessKey.style.backgroundColor = 'green';
                }                  
            }
        }
    }

    playGame();

});