const API_URL = '/api';

async function fetchQuestions() {
    const response = await fetch(`${API_URL}/questions`);
    return response.json();
}

async function checkAnswer(id, answer) {
    const response = await fetch(`${API_URL}/check`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, answer }),
    });
    return response.json();
}

function createQuizHTML(questions) {
    return questions.map(q => `
        <div class="question" id="question-${q.id}">
            <h3>${q.question}</h3>
            <input type="number" id="answer-${q.id}">
            <button onclick="submitAnswer(${q.id})">Submit</button>
            <p class="feedback" id="feedback-${q.id}"></p>
        </div>
    `).join('');
}

async function loadQuiz() {
    const questions = await fetchQuestions();
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = createQuizHTML(questions);
}

async function submitAnswer(id) {
    const answerInput = document.getElementById(`answer-${id}`);
    const answer = parseInt(answerInput.value);
    const result = await checkAnswer(id, answer);
    
    const feedbackElement = document.getElementById(`feedback-${id}`);
    feedbackElement.textContent = result.message;
    
    if (result.correct) {
        feedbackElement.style.color = 'green';
        document.getElementById(`question-${id}`).style.display = 'none';
        showNextQuestion(id);
    } else {
        feedbackElement.style.color = 'red';
        answerInput.value = '';  // Clear the input for another try
    }
}

function showNextQuestion(currentId) {
    const nextQuestion = document.querySelector(`.question:not([style*="display: none"])`);
    if (nextQuestion) {
        nextQuestion.scrollIntoView({ behavior: 'smooth' });
    } else {
        // All questions answered correctly
        const quizContainer = document.getElementById('quiz-container');
        quizContainer.innerHTML = '<h2>Congratulations! You\'ve completed the quiz!</h2>';
    }
}

loadQuiz();
