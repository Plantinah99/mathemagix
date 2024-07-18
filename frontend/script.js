const API_URL = 'http://localhost:3000/api';
let currentQuestion;

async function fetchQuestion() {
    const response = await fetch(`${API_URL}/question`);
    currentQuestion = await response.json();
    displayQuestion(currentQuestion);
}

function displayQuestion(question) {
    document.getElementById('question').textContent = question.question;
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
}

async function checkAnswer(answer) {
    const response = await fetch(`${API_URL}/check`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: currentQuestion.id, answer }),
    });
    const result = await response.json();
    
    if (result.correct) {
        document.getElementById('feedback').textContent = 'Correct! Moving to the next question...';
        setTimeout(fetchQuestion, 1500);
    } else {
        document.getElementById('feedback').textContent = result.message;
    }
}

fetchQuestion();
