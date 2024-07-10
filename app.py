from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os
import random

app = Flask(__name__, static_folder='static')
CORS(app)

questions = [
    {"id": 1, "question": "What is 2 + 2?", "answer": 4},
    {"id": 2, "question": "What is 5 * 3?", "answer": 15},
    {"id": 3, "question": "What is 10 / 2?", "answer": 5},
]

funny_remarks = [
    "Oops! Math is hard, but so is life. Try again!",
    "Close, but no cigar. Maybe try using your fingers?",
    "That's innovative, but not quite right. Give it another shot!",
    "Are you sure you're not a poet? Because that answer was pure fiction!",
    "If at first you don't succeed, try, try again. And maybe use a calculator.",
]

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/questions', methods=['GET'])
def get_questions():
    return jsonify(questions)

@app.route('/api/check', methods=['POST'])
def check_answer():
    data = request.json
    question_id = data.get('id')
    user_answer = data.get('answer')
    
    for question in questions:
        if question['id'] == question_id:
            is_correct = question['answer'] == user_answer
            if is_correct:
                return jsonify({'correct': True, 'message': 'Correct!'})
            else:
                return jsonify({'correct': False, 'message': random.choice(funny_remarks)})
    
    return jsonify({'error': 'Question not found'}), 404

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
