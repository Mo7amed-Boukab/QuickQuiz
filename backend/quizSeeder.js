const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Theme = require("./src/models/theme");
const Quiz = require("./src/models/quiz");
const Question = require("./src/models/question");

// Load env vars
dotenv.config();

// Connect to DB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

const importQuizData = async () => {
    try {
        // Check if data already exists
        const existingThemes = await Theme.countDocuments();
        if (existingThemes > 0) {
            console.log("⚠ Quiz data already exists. Use -d flag to delete first.");
            process.exit();
        }

        // Create Themes
        const webDevTheme = await Theme.create({
            name: "Web Development",
        });

        const programmingTheme = await Theme.create({
            name: "Programming",
        });

        const databaseTheme = await Theme.create({
            name: "Databases",
        });

        console.log("✓ Themes created");

        // Create Quizzes
        const htmlQuiz = await Quiz.create({
            title: "HTML Fundamentals",
            description: "Master the building blocks of the web with HTML basics",
            difficulty: "Beginner",
            timeLimit: 10,
            theme: webDevTheme._id,
        });

        const cssQuiz = await Quiz.create({
            title: "CSS Styling",
            description: "Learn to design beautiful and responsive layouts",
            difficulty: "Intermediate",
            timeLimit: 15,
            theme: webDevTheme._id,
        });

        const jsQuiz = await Quiz.create({
            title: "JavaScript Essentials",
            description: "Build interactive web applications with JavaScript",
            difficulty: "Advanced",
            timeLimit: 20,
            theme: programmingTheme._id,
        });

        const reactQuiz = await Quiz.create({
            title: "React Basics",
            description: "Introduction to React library and component-based architecture",
            difficulty: "Intermediate",
            timeLimit: 15,
            theme: programmingTheme._id,
        });

        const sqlQuiz = await Quiz.create({
            title: "SQL Fundamentals",
            description: "Learn database querying with SQL",
            difficulty: "Beginner",
            timeLimit: 12,
            theme: databaseTheme._id,
        });

        console.log("✓ Quizzes created");

        // Create Questions for HTML Quiz
        await Question.create([
            {
                quiz: htmlQuiz._id,
                question: "What does HTML stand for?",
                options: [
                    { text: "Hyper Text Markup Language", isCorrect: true },
                    { text: "High Tech Modern Language", isCorrect: false },
                    { text: "Home Tool Markup Language", isCorrect: false },
                    { text: "Hyperlinks and Text Markup Language", isCorrect: false },
                ],
            },
            {
                quiz: htmlQuiz._id,
                question: "Which HTML element is used for the largest heading?",
                options: [
                    { text: "<h6>", isCorrect: false },
                    { text: "<h1>", isCorrect: true },
                    { text: "<heading>", isCorrect: false },
                    { text: "<header>", isCorrect: false },
                ],
            },
            {
                quiz: htmlQuiz._id,
                question: "What is the correct HTML element for inserting a line break?",
                options: [
                    { text: "<break>", isCorrect: false },
                    { text: "<br>", isCorrect: true },
                    { text: "<lb>", isCorrect: false },
                    { text: "<newline>", isCorrect: false },
                ],
            },
            {
                quiz: htmlQuiz._id,
                question: "Which attribute is used to provide alternative text for an image?",
                options: [
                    { text: "title", isCorrect: false },
                    { text: "alt", isCorrect: true },
                    { text: "src", isCorrect: false },
                    { text: "longdesc", isCorrect: false },
                ],
            },
            {
                quiz: htmlQuiz._id,
                question: "What is the correct HTML for creating a hyperlink?",
                options: [
                    { text: '<a url="http://example.com">Example</a>', isCorrect: false },
                    { text: '<a href="http://example.com">Example</a>', isCorrect: true },
                    { text: '<a>http://example.com</a>', isCorrect: false },
                    { text: '<link>http://example.com</link>', isCorrect: false },
                ],
            },
        ]);

        // Create Questions for CSS Quiz
        await Question.create([
            {
                quiz: cssQuiz._id,
                question: "What does CSS stand for?",
                options: [
                    { text: "Creative Style Sheets", isCorrect: false },
                    { text: "Cascading Style Sheets", isCorrect: true },
                    { text: "Computer Style Sheets", isCorrect: false },
                    { text: "Colorful Style Sheets", isCorrect: false },
                ],
            },
            {
                quiz: cssQuiz._id,
                question: "Which property is used to change the background color?",
                options: [
                    { text: "color", isCorrect: false },
                    { text: "bgcolor", isCorrect: false },
                    { text: "background-color", isCorrect: true },
                    { text: "background", isCorrect: false },
                ],
            },
            {
                quiz: cssQuiz._id,
                question: 'How do you select an element with id "demo"?',
                options: [
                    { text: ".demo", isCorrect: false },
                    { text: "#demo", isCorrect: true },
                    { text: "demo", isCorrect: false },
                    { text: "*demo", isCorrect: false },
                ],
            },
            {
                quiz: cssQuiz._id,
                question: "Which CSS property controls the text size?",
                options: [
                    { text: "text-size", isCorrect: false },
                    { text: "font-size", isCorrect: true },
                    { text: "text-style", isCorrect: false },
                    { text: "font-style", isCorrect: false },
                ],
            },
            {
                quiz: cssQuiz._id,
                question: "How do you make text bold in CSS?",
                options: [
                    { text: "font-weight: bold;", isCorrect: true },
                    { text: "text-decoration: bold;", isCorrect: false },
                    { text: "font-style: bold;", isCorrect: false },
                    { text: "text-weight: bold;", isCorrect: false },
                ],
            },
        ]);

        // Create Questions for JavaScript Quiz
        await Question.create([
            {
                quiz: jsQuiz._id,
                question: "Which company developed JavaScript?",
                options: [
                    { text: "Microsoft", isCorrect: false },
                    { text: "Netscape", isCorrect: true },
                    { text: "Google", isCorrect: false },
                    { text: "Apple", isCorrect: false },
                ],
            },
            {
                quiz: jsQuiz._id,
                question: "What is the correct way to write a JavaScript array?",
                options: [
                    { text: 'var colors = "red", "green", "blue"', isCorrect: false },
                    { text: 'var colors = (1:"red", 2:"green", 3:"blue")', isCorrect: false },
                    { text: 'var colors = ["red", "green", "blue"]', isCorrect: true },
                    { text: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")', isCorrect: false },
                ],
            },
            {
                quiz: jsQuiz._id,
                question: 'How do you write "Hello World" in an alert box?',
                options: [
                    { text: 'alertBox("Hello World");', isCorrect: false },
                    { text: 'msg("Hello World");', isCorrect: false },
                    { text: 'alert("Hello World");', isCorrect: true },
                    { text: 'msgBox("Hello World");', isCorrect: false },
                ],
            },
            {
                quiz: jsQuiz._id,
                question: "How do you declare a JavaScript variable?",
                options: [
                    { text: "variable carName;", isCorrect: false },
                    { text: "var carName;", isCorrect: true },
                    { text: "v carName;", isCorrect: false },
                    { text: "declare carName;", isCorrect: false },
                ],
            },
            {
                quiz: jsQuiz._id,
                question: "Which operator is used to assign a value to a variable?",
                options: [
                    { text: "*", isCorrect: false },
                    { text: "-", isCorrect: false },
                    { text: "=", isCorrect: true },
                    { text: "x", isCorrect: false },
                ],
            },
        ]);

        // Create Questions for React Quiz
        await Question.create([
            {
                quiz: reactQuiz._id,
                question: "What is React?",
                options: [
                    { text: "A JavaScript library for building user interfaces", isCorrect: true },
                    { text: "A database management system", isCorrect: false },
                    { text: "A CSS framework", isCorrect: false },
                    { text: "A server-side language", isCorrect: false },
                ],
            },
            {
                quiz: reactQuiz._id,
                question: "What is JSX?",
                options: [
                    { text: "A JavaScript extension that allows writing HTML in React", isCorrect: true },
                    { text: "A CSS preprocessor", isCorrect: false },
                    { text: "A database query language", isCorrect: false },
                    { text: "A testing framework", isCorrect: false },
                ],
            },
            {
                quiz: reactQuiz._id,
                question: "What is a React component?",
                options: [
                    { text: "A reusable piece of UI", isCorrect: true },
                    { text: "A database table", isCorrect: false },
                    { text: "A CSS class", isCorrect: false },
                    { text: "A server endpoint", isCorrect: false },
                ],
            },
            {
                quiz: reactQuiz._id,
                question: "Which hook is used to manage state in functional components?",
                options: [
                    { text: "useEffect", isCorrect: false },
                    { text: "useState", isCorrect: true },
                    { text: "useContext", isCorrect: false },
                    { text: "useReducer", isCorrect: false },
                ],
            },
        ]);

        // Create Questions for SQL Quiz
        await Question.create([
            {
                quiz: sqlQuiz._id,
                question: "What does SQL stand for?",
                options: [
                    { text: "Structured Query Language", isCorrect: true },
                    { text: "Simple Question Language", isCorrect: false },
                    { text: "Structured Question Language", isCorrect: false },
                    { text: "Simple Query Language", isCorrect: false },
                ],
            },
            {
                quiz: sqlQuiz._id,
                question: "Which SQL statement is used to extract data from a database?",
                options: [
                    { text: "GET", isCorrect: false },
                    { text: "EXTRACT", isCorrect: false },
                    { text: "SELECT", isCorrect: true },
                    { text: "OPEN", isCorrect: false },
                ],
            },
            {
                quiz: sqlQuiz._id,
                question: "Which SQL statement is used to update data in a database?",
                options: [
                    { text: "MODIFY", isCorrect: false },
                    { text: "UPDATE", isCorrect: true },
                    { text: "SAVE", isCorrect: false },
                    { text: "CHANGE", isCorrect: false },
                ],
            },
            {
                quiz: sqlQuiz._id,
                question: "Which SQL keyword is used to sort the result-set?",
                options: [
                    { text: "SORT", isCorrect: false },
                    { text: "ORDER BY", isCorrect: true },
                    { text: "SORT BY", isCorrect: false },
                    { text: "ARRANGE", isCorrect: false },
                ],
            },
        ]);

        console.log("✓ Questions created");

        console.log("\n=================================");
        console.log("✓ Quiz data imported successfully!");
        console.log("=================================");
        console.log(`Themes: 3`);
        console.log(`Quizzes: 5`);
        console.log(`Questions: 23`);
        console.log("=================================\n");

        process.exit();
    } catch (err) {
        console.error("Error importing quiz data:", err);
        process.exit(1);
    }
};

const deleteQuizData = async () => {
    try {
        await Theme.deleteMany();
        await Quiz.deleteMany();
        await Question.deleteMany();
        console.log("✓ All quiz data deleted");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    deleteQuizData();
} else {
    importQuizData();
}
