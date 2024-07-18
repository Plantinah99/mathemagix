document.addEventListener('DOMContentLoaded', () => {
    const startQuizBtn = document.getElementById('startQuiz');
    const mainContent = document.getElementById('mainContent');
    const quizPage = document.getElementById('quizPage');
    const leaderboardPage = document.getElementById('leaderboardPage');
    const leaderboardList = document.getElementById('leaderboardList');

    startQuizBtn.addEventListener('click', () => {
        mainContent.style.display = 'none';
        quizPage.style.display = 'block';
        loadQuiz();
    });

    function loadQuiz() {
        fetch('/questions')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch quiz questions');
                }
                return response.json();
            })
            .then(questions => {
                let currentQuestion = 0;
                let score = 0;

                function displayQuestion() {
                    const question = questions[currentQuestion];
                    quizPage.innerHTML = `
                        <h2>Question ${currentQuestion + 1}</h2>
                        <p>${question.question}</p>
                        <ul>
                            ${question.options.map(option => `
                                <li><button onclick="checkAnswer('${option}')">${option}</button></li>
                            `).join('')}
                        </ul>
                    `;
                }

                function checkAnswer(answer) {
                    const question = questions[currentQuestion];
                    const selectedButton = event.target;

                    if (answer === question.correctAnswer) {
                        selectedButton.style.backgroundColor = 'green';
                        score++;
                    } else {
                        selectedButton.style.backgroundColor = 'red';
                        alert("Oops! That's not correct. Try again!");
                    }

                    currentQuestion++;
                    if (currentQuestion < questions.length) {
                        setTimeout(displayQuestion, 1000); // Delay to show correct/wrong color
                    } else {
                        setTimeout(showScore, 1000);
                    }
                }

                function showScore() {
                    quizPage.innerHTML = `<h2>Quiz Complete</h2><p>Your score: ${score} out of ${questions.length}</p>`;
                    saveScore(score);
                }

                displayQuestion();
            })
            .catch(error => {
                console.error('Error loading quiz questions:', error);
                alert('Failed to load quiz questions. Please try again later.');
            });
    }

    function saveScore(score) {
        const username = prompt("Enter your username to save your score:");

        if (username) {
            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to save score');
                }
                return response.json();
            })
            .then(data => {
                console.log('Score saved successfully:', data.message);
                loadLeaderboard();
            })
            .catch(error => {
                console.error('Error saving score:', error.message);
                alert('Failed to save score. Please try again later.');
            });
        } else {
            loadLeaderboard();
        }
    }

    function loadLeaderboard() {
        fetch('/leaderboard')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load leaderboard');
                }
                return response.json();
            })
            .then(scores => {
                leaderboardList.innerHTML = scores.map((score, index) => `
                    <li>${index + 1}. ${score.username} - ${score.score}</li>
                `).join('');
                mainContent.style.display = 'none';
                leaderboardPage.style.display = 'block';
            })
            .catch(error => {
                console.error('Error loading leaderboard:', error.message);
                alert('Failed to load leaderboard. Please try again later.');
            });
    }
});

