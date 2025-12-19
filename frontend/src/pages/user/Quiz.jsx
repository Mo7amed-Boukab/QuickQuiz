import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Star } from 'lucide-react';

const quizData = {
    html: {
        title: 'HTML Fundamentals',
        questions: [
            {
                question: 'What does HTML stand for?',
                options: [
                    'Hyper Text Markup Language',
                    'High Tech Modern Language',
                    'Home Tool Markup Language',
                    'Hyperlink and Text Markup Language'
                ],
                correct: 0
            },
            {
                question: 'Which HTML element is used for the largest heading?',
                options: ['<h6>', '<h1>', '<heading>', '<header>'],
                correct: 1
            },
            {
                question: 'What is the correct HTML element for inserting a line break?',
                options: ['<break>', '<br>', '<lb>', '<newline>'],
                correct: 1
            }
        ]
    },
    css: {
        title: 'CSS Styling',
        questions: [
            {
                question: 'What does CSS stand for?',
                options: [
                    'Creative Style Sheets',
                    'Cascading Style Sheets',
                    'Computer Style Sheets',
                    'Colorful Style Sheets'
                ],
                correct: 1
            },
            {
                question: 'Which property is used to change the background color?',
                options: ['color', 'bgcolor', 'background-color', 'background'],
                correct: 2
            },
            {
                question: 'How do you select an element with id "demo"?',
                options: ['.demo', '#demo', 'demo', '*demo'],
                correct: 1
            }
        ]
    },
    javascript: {
        title: 'JavaScript Logic',
        questions: [
            {
                question: 'Which company developed JavaScript?',
                options: ['Microsoft', 'Netscape', 'Google', 'Apple'],
                correct: 1
            },
            {
                question: 'What is the correct way to write a JavaScript array?',
                options: [
                    'var colors = "red", "green", "blue"',
                    'var colors = (1:"red", 2:"green", 3:"blue")',
                    'var colors = ["red", "green", "blue"]',
                    'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")'
                ],
                correct: 2
            },
            {
                question: 'How do you write "Hello World" in an alert box?',
                options: [
                    'alertBox("Hello World");',
                    'msg("Hello World");',
                    'alert("Hello World");',
                    'msgBox("Hello World");'
                ],
                correct: 2
            }
        ]
    }
};

export default function Quiz() {
    const navigate = useNavigate();
    const [quizTheme, setQuizTheme] = useState('html');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [globalTimeElapsed, setGlobalTimeElapsed] = useState(0);
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        const theme = localStorage.getItem('selectedTheme') || 'html';
        setQuizTheme(theme);
        setQuiz(quizData[theme]);

        const timer = setInterval(() => {
            setGlobalTimeElapsed((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!quiz) return null;

    const question = quiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleNext = () => {
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestion] = selectedAnswer ?? -1;
        setUserAnswers(newAnswers);

        if (selectedAnswer === question.correct) {
            setScore(score + 1);
        }

        if (currentQuestion + 1 < quiz.questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = () => {
        const result = {
            userName: JSON.parse(localStorage.getItem('currentUser') || '{}').fullName || 'Anonymous',
            theme: quizTheme,
            score: selectedAnswer === question.correct ? score + 1 : score,
            totalQuestions: quiz.questions.length,
            timeElapsed: globalTimeElapsed,
            answers: [...userAnswers, selectedAnswer ?? -1],
            date: new Date().toISOString()
        };

        const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
        history.push(result);
        localStorage.setItem('quizHistory', JSON.stringify(history));

        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-gray-900" />
                            <span className="font-mono font-semibold">{formatTime(globalTimeElapsed)}</span>
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-gray-600">
                                Question {currentQuestion + 1} of {quiz.questions.length}
                            </div>
                            <div className="font-semibold">{quiz.title}</div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Star className="w-5 h-5 text-gray-900" />
                            <span className="font-semibold">{score} points</span>
                        </div>
                    </div>
                    <div className="h-1 bg-gray-200">
                        <div
                            className="h-full bg-black transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="py-12">
                <div className="max-w-5xl mx-auto px-6">
                    {/* Question Card */}
                    <div className="bg-white border border-gray-200 rounded p-8 mb-8">
                        <span className="inline-block px-3 py-1 bg-gray-100 text-sm font-medium rounded-full mb-4">
                            Question {currentQuestion + 1}
                        </span>
                        <h2 className="text-2xl font-semibold">{question.question}</h2>
                    </div>

                    {/* Answer Options */}
                    <div className="grid grid-cols-1 gap-4 mb-8">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedAnswer(index)}
                                className={`p-4 border-1 rounded text-left transition-all ${selectedAnswer === index
                                        ? 'border-black bg-gray-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${selectedAnswer === index
                                                ? 'bg-gray-200 text-black'
                                                : 'bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                    <span>{option}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Next Button */}
                    <div className="flex justify-start">
                        <button
                            onClick={handleNext}
                            disabled={selectedAnswer === null}
                            className="px-8 py-2 bg-black text-white rounded font-small hover:bg-gray-900 transition-colors disabled:opacity-90 disabled:cursor-not-allowed"
                        >
                            {currentQuestion + 1 === quiz.questions.length ? 'Finish Quiz' : 'Next Question'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
