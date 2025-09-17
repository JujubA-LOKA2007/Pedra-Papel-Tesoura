document.addEventListener('DOMContentLoaded', () => {
    // Game elements
    const playerChoices = document.querySelectorAll('.player-choice');
    const computerChoiceEl = document.getElementById('computer-choice');
    const resultEl = document.getElementById('result');
    const playerScoreEl = document.getElementById('player-score');
    const computerScoreEl = document.getElementById('computer-score');
    const playAgainBtn = document.getElementById('play-again');
    
    // Game state
    let playerScore = 0;
    let computerScore = 0;
    let gameActive = true;
    
    // Computer choices with emojis
    const choices = ['✊', '✋', '✌️'];
    const choiceNames = {
        '✊': 'Rock',
        '✋': 'Paper',
        '✌️': 'Scissors'
    };
    
    // Add event listeners to player choices
    playerChoices.forEach(choice => {
        choice.addEventListener('click', () => {
            if (!gameActive) return;
            
            // Remove selected class from all choices
            playerChoices.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked choice
            choice.classList.add('selected');
            
            // Get player choice
            const playerChoice = choice.dataset.choice;
            
            // Generate computer choice
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            
            // Display computer choice
            computerChoiceEl.textContent = computerChoice;
            
            // Determine winner
            const result = getResult(playerChoice, computerChoice);
            
            // Update scores and display result
            if (result === 'win') {
                playerScore++;
                resultEl.textContent = `You win! ${choiceNames[playerChoice]} beats ${choiceNames[computerChoice]}`;
                resultEl.className = 'result win';
            } else if (result === 'lose') {
                computerScore++;
                resultEl.textContent = `You lose! ${choiceNames[computerChoice]} beats ${choiceNames[playerChoice]}`;
                resultEl.className = 'result lose';
            } else {
                resultEl.textContent = `It's a draw! Both chose ${choiceNames[playerChoice]}`;
                resultEl.className = 'result draw';
            }
            
            // Update score display
            playerScoreEl.textContent = playerScore;
            computerScoreEl.textContent = computerScore;
            
            gameActive = false;
        });
    });
    
    // Play again button
    playAgainBtn.addEventListener('click', () => {
        // Reset game state
        gameActive = true;
        
        // Clear selections
        playerChoices.forEach(choice => choice.classList.remove('selected'));
        computerChoiceEl.textContent = '❔';
        resultEl.textContent = 'Choose your weapon!';
        resultEl.className = 'result';
    });
    
    // Determine game result
    function getResult(player, computer) {
        if (player === computer) return 'draw';
        
        if (
            (player === '✊' && computer === '✌️') ||
            (player === '✋' && computer === '✊') ||
            (player === '✌️' && computer === '✋')
        ) {
            return 'win';
        }
        
        return 'lose';
    }
});
