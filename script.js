//Task 1 Symbol-Array 
const symbols = ['🌞', '🌞', '🌙', '🌙', '⭐', '⭐', '🌊', '🌊'];
let firstCard = null, secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

//Task 2
//Karten mischen mit sort() und Zufallswerten
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

//Spielfeld initialisieren
function setupGame() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    shuffle(symbols);
    
    symbols.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card', 'hidden');
        card.dataset.value = symbol;
        card.innerText = '?';
        card.addEventListener('click', () => revealCard(card));
        board.appendChild(card);
    });
    
    matchedPairs = 0;
    document.getElementById('message').innerText = '';
    document.body.style.backgroundColor = '#f8f9fa';
}

//Task 3 Flip Card
function revealCard(card) {
    if (!card.classList.contains('hidden') || lockBoard) return;

    card.innerText = card.dataset.value;
    card.classList.remove('hidden');

    if (!firstCard) {
        firstCard = card;
    } else if (!secondCard) {
        secondCard = card;
        lockBoard = true;

        if (firstCard.dataset.value === secondCard.dataset.value) {
            setTimeout(() => {
                firstCard.style.backgroundColor = 'green';
                secondCard.style.backgroundColor = 'green';
                matchedPairs++;
                resetSelection();
                checkWin();
            }, 300);
        } else {
            setTimeout(() => {
                firstCard.innerText = '?';
                secondCard.innerText = '?';
                firstCard.classList.add('hidden');
                secondCard.classList.add('hidden');
                resetSelection();
            }, 850);
        }
    }
}

//Task 4 Reset and Completion
function resetSelection() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function checkWin() {
    if (matchedPairs === symbols.length / 2) {
        document.getElementById('message').innerText = 'Du hast gewonnen!';
        document.body.style.backgroundColor = 'lightgreen';
    }
}

document.getElementById('reset-button').addEventListener('click', setupGame);

setupGame();
