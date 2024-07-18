const questions = [
  {
    id: 1,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4"
  },
  {
    id: 2,
    question: "What is 7 x 8?",
    options: ["54", "56", "58", "62"],
    correctAnswer: "56"
  },
  {
    id: 3,
    question: "What is 15 - 9?",
    options: ["4", "5", "6", "7"],
    correctAnswer: "6"
  },
  {
    id: 4,
    question: "What is 24 ÷ 3?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "8"
  },
  {
    id: 5,
    question: "What is 3 x 4 + 2?",
    options: ["11", "12", "14", "15"],
    correctAnswer: "14"
  }
];

function getRandomQuestion(id = null) {
  if (id) {
    return questions.find(q => q.id === id);
  }
  return questions[Math.floor(Math.random() * questions.length)];
}

module.exports = { getRandomQuestion };
