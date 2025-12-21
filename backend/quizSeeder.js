const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const Theme = require("./src/models/theme");
const Quiz = require("./src/models/quiz");
const Question = require("./src/models/question");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

// --- DATA HELPERS ---
const q = (question, options, correctIdx) => ({
  q: question,
  o: options.map((text, i) => ({ text, isCorrect: i === correctIdx })),
});

// --- QUESTION BANK ---
const questionBank = {
  // --- EXISTING TOPICS ---
  HTML: {
    Beginner: [
      q("What does HTML stand for?", ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], 0),
      q("Which element is the largest heading?", ["<h6>", "<heading>", "<h1>", "<head>"], 2),
      q("Which element is used for a line break?", ["<lb>", "<br>", "<break>", "<newline>"], 1),
      q("What is the correct HTML for adding a background color?", ["<body bg=\"yellow\">", "<body style=\"background-color:yellow;\">", "<background>yellow</background>"], 1),
      q("Choose the correct HTML element to define emphasized text", ["<i>", "<italic>", "<em>", "<emp>"], 2),
      q("Which character is used to indicate an end tag?", ["*", "/", "<", "^"], 1),
      q("How can you open a link in a new tab/browser window?", ["<a href=\"url\" target=\"new\">", "<a href=\"url\" target=\"_blank\">", "<a href=\"url\" new>"], 1),
      q("Which of these elements are all <table> elements?", ["<table><tr><td>", "<table><head><tfoot>", "<thead><body><tr>", "<table><tr><tt>"], 0),
      q("Inline elements are normally displayed without starting a new line.", ["True", "False"], 0),
      q("How do you create a numbered list?", ["<ul>", "<ol>", "<dl>", "<list>"], 1),
    ],
    Intermediate: [
      q("Which HTML5 element defines navigation links?", ["<navigation>", "<nav>", "<links>", "<navigate>"], 1),
      q("In HTML5, which element is used to specify a footer for a document or section?", ["<bottom>", "<footer>", "<section>", "<end>"], 1),
      q("What is the correct HTML element for playing video files?", ["<movie>", "<media>", "<video>", "<film>"], 2),
      q("Which input type defines a slider control?", ["search", "controls", "slider", "range"], 3),
      q("Which HTML element is used to display a scalar measurement within a range?", ["<gauge>", "<measure>", "<meter>", "<range>"], 2),
      q("Which element is used to specify a header for a document or section?", ["<top>", "<header>", "<head>", "<hgroup>"], 1),
      q("What does the <canvas> element do?", ["Draws graphics", "Manipulates photos", "Displays database records", "Draggable items"], 0),
      q("Which attribute is used to specify that an input field must be filled out?", ["validate", "required", "placeholder", "mandatory"], 1),
      q("Which element defines a caption for a <figure> element?", ["<figcaption>", "<caption>", "<description>", "<summary>"], 0),
      q("What is the purpose of the <article> element?", ["To define a comment", "To define independent, self-contained content", "To define a container", "To define a footer"], 1),
    ],
    Advanced: [
      q("Which API is used to get the geographical position of a user?", ["Geolocation API", "Maps API", "Position API", "Location API"], 0),
      q("What is the purpose of the 'async' attribute in a script tag?", ["Execute script sequentially", "Execute script when page finishes parsing", "Execute script as soon as it is available", "Delay script execution"], 2),
      q("Which element is used to provide a public key for encryption?", ["<keygen>", "<key>", "<encrypt>", "<public>"], 0),
      q("What does the <details> element do?", ["Defines additional details that the user can view or hide", "Defines a list of details", "Defines a description list", "Defines a dialog box"], 0),
      q("Which attribute is used to specify the relationship between the current document and the linked document?", ["rel", "rev", "href", "src"], 0),
      q("What is the purpose of the <track> element?", ["Defines text tracks for media elements", "Tracks user activity", "Defines a playlist", "Tracks mouse movements"], 0),
      q("Which element is used to define a client-side image map?", ["<map>", "<area>", "<img>", "<plan>"], 0),
      q("What is the purpose of the 'defer' attribute in a script tag?", ["Execute script after the page has finished parsing", "Execute script immediately", "Execute script in parallel", "Execute script before HTML parsing"], 0),
      q("Which element is used to define a dialog box or window?", ["<window>", "<dialog>", "<popup>", "<modal>"], 1),
      q("What is the purpose of the <wbr> element?", ["Defines a word break opportunity", "Defines a line break", "Defines a paragraph break", "Defines a section break"], 0),
    ]
  },
  CSS: {
    Beginner: [
      q("What does CSS stand for?", ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets", "Creative Style Sheets"], 0),
      q("Which HTML attribute is used to define inline styles?", ["class", "style", "font", "styles"], 1),
      q("Which is the correct CSS syntax?", ["body {color: black;}", "{body;color:black;}", "body:color=black;", "{body:color=black;}"], 0),
      q("How do you insert a comment in a CSS file?", ["// this is a comment", "/* this is a comment */", "\" this is a comment", "// this is a comment //"], 1),
      q("Which property is used to change the background color?", ["color", "bgcolor", "background-color", "bg-color"], 2),
      q("How do you add a background color for all <h1> elements?", ["all.h1 {background-color:#FFFFFF;}", "h1.all {background-color:#FFFFFF;}", "h1 {background-color:#FFFFFF;}", "h1 {bg-color:#FFFFFF;}"], 2),
      q("Which property is used to change the text color of an element?", ["text-color", "fgcolor", "color", "font-color"], 2),
      q("Which CSS property controls the text size?", ["font-style", "text-size", "font-size", "text-style"], 2),
      q("How do you display hyperlinks without an underline?", ["a {text-decoration:none;}", "a {decoration:no-underline;}", "a {text-decoration:no-underline;}", "a {underline:none;}"], 0),
      q("How do you make each word in a text start with a capital letter?", ["text-transform:capitalize", "text-style:capitalize", "transform:capitalize", "font-transform:capitalize"], 0),
    ],
    Intermediate: [
      q("How do you select an element with id 'demo'?", ["#demo", ".demo", "demo", "*demo"], 0),
      q("How do you select elements with class name 'test'?", [".test", "#test", "test", "*test"], 0),
      q("How do you select all p elements inside a div element?", ["div p", "div.p", "div + p", "div > p"], 0),
      q("What is the default value of the position property?", ["relative", "fixed", "absolute", "static"], 3),
      q("Which property is used to control the space between the element border and the element content?", ["margin", "padding", "border", "spacing"], 1),
      q("Which property is used to control the space outside the border?", ["padding", "margin", "spacing", "border"], 1),
      q("How do you make a list that lists its items with squares?", ["list-type: square;", "list-style-type: square;", "list-style: square;", "list: square;"], 1),
      q("Which property is used to set the stack order of an element?", ["z-index", "stack-order", "position", "order"], 0),
      q("How do you select all elements?", ["all", "*", "body", "root"], 1),
      q("What is the correct CSS syntax for making all the <p> elements bold?", ["p {text-size:bold;}", "p {font-weight:bold;}", "<p style=\"font-size:bold;\">", "p {style:bold;}"], 1),
    ],
    Advanced: [
      q("What does the 'box-sizing: border-box' property do?", ["Includes padding and border in the element's total width and height", "Excludes padding and border from the element's total width and height", "Adds a border to the box", "Resizes the box"], 0),
      q("Which pseudo-class is used to define a special state of an element?", [":hover", "::before", "::after", ":first-line"], 0),
      q("What is the difference between 'display: none' and 'visibility: hidden'?", ["display: none removes the element from the layout, visibility: hidden hides it but keeps space", "display: none hides it but keeps space, visibility: hidden removes it", "No difference", "display: none is for block elements, visibility: hidden for inline"], 0),
      q("Which property is used to create a flex container?", ["display: flex", "display: block", "display: inline", "display: grid"], 0),
      q("In Flexbox, which property aligns items along the main axis?", ["justify-content", "align-items", "align-content", "flex-direction"], 0),
      q("In Flexbox, which property aligns items along the cross axis?", ["align-items", "justify-content", "align-content", "flex-direction"], 0),
      q("Which property is used to define the number of columns in a grid layout?", ["grid-template-columns", "grid-columns", "grid-template-rows", "grid-rows"], 0),
      q("What is the purpose of the '@media' rule?", ["To apply different styles for different media types/devices", "To include external CSS files", "To define animations", "To define fonts"], 0),
      q("Which property is used to create animations?", ["animation", "transition", "transform", "keyframes"], 0),
      q("What does the 'transform' property do?", ["Applies a 2D or 3D transformation to an element", "Changes the shape of an element", "Changes the color of an element", "Changes the position of an element"], 0),
    ]
  },
  JavaScript: {
    Beginner: [
      q("Inside which HTML element do we put the JavaScript?", ["<script>", "<js>", "<javascript>", "<scripting>"], 0),
      q("What is the correct JavaScript syntax to change the content of the HTML element below? <p id=\"demo\">This is a demonstration.</p>", ["document.getElementById(\"demo\").innerHTML = \"Hello World!\";", "document.getElement(\"p\").innerHTML = \"Hello World!\";", "#demo.innerHTML = \"Hello World!\";", "document.getElementById(\"demo\").innerHTML = \"Hello World!\";"], 0),
      q("Where is the correct place to insert a JavaScript?", ["Both the <head> section and the <body> section are correct", "The <head> section", "The <body> section", "The <footer> section"], 0),
      q("What is the correct syntax for referring to an external script called \"xxx.js\"?", ["<script src=\"xxx.js\">", "<script href=\"xxx.js\">", "<script name=\"xxx.js\">", "<script file=\"xxx.js\">"], 0),
      q("The external JavaScript file must contain the <script> tag.", ["False", "True"], 0),
      q("How do you write \"Hello World\" in an alert box?", ["alert(\"Hello World\");", "msg(\"Hello World\");", "msgBox(\"Hello World\");", "alertBox(\"Hello World\");"], 0),
      q("How do you create a function in JavaScript?", ["function myFunction()", "function:myFunction()", "function = myFunction()", "create myFunction()"], 0),
      q("How do you call a function named \"myFunction\"?", ["myFunction()", "call myFunction()", "call function myFunction()", "myFunction(call)"], 0),
      q("How to write an IF statement in JavaScript?", ["if (i == 5)", "if i = 5 then", "if i == 5 then", "if (i = 5)"], 0),
      q("How to write an IF statement for executing some code if \"i\" is NOT equal to 5?", ["if (i != 5)", "if (i <> 5)", "if i <> 5", "if i =! 5 then"], 0),
    ],
    Intermediate: [
      q("How can you add a comment in a JavaScript?", ["//This is a comment", "\"This is a comment", "<!--This is a comment-->", "#This is a comment"], 0),
      q("How to insert a comment that has more than one line?", ["/*This comment has more than one line*/", "//This comment has more than one line//", "<!--This comment has more than one line-->", "#This comment has more than one line#"], 0),
      q("What is the correct way to write a JavaScript array?", ["var colors = [\"red\", \"green\", \"blue\"]", "var colors = \"red\", \"green\", \"blue\"", "var colors = (1:\"red\", 2:\"green\", 3:\"blue\")", "var colors = 1 = (\"red\"), 2 = (\"green\"), 3 = (\"blue\")"], 0),
      q("How do you round the number 7.25, to the nearest integer?", ["Math.round(7.25)", "round(7.25)", "Math.rnd(7.25)", "rnd(7.25)"], 0),
      q("How do you find the number with the highest value of x and y?", ["Math.max(x, y)", "Math.ceil(x, y)", "ceil(x, y)", "top(x, y)"], 0),
      q("What is the correct JavaScript syntax for opening a new window called \"w2\" ?", ["window.open(\"http://www.w3schools.com\");", "w2 = window.open(\"http://www.w3schools.com\");", "w2 = window.new(\"http://www.w3schools.com\");", "window.new(\"http://www.w3schools.com\");"], 1),
      q("JavaScript is the same as Java.", ["False", "True"], 0),
      q("How can you detect the client\"s browser name?", ["navigator.appName", "browser.name", "client.navName", "window.browser"], 0),
      q("Which event occurs when the user clicks on an HTML element?", ["onclick", "onchange", "onmouseover", "onmouseclick"], 0),
      q("How do you declare a JavaScript variable?", ["var carName;", "variable carName;", "v carName;", "val carName;"], 0),
    ],
    Advanced: [
      q("What is a closure?", ["A function having access to the parent scope, even after the parent function has closed", "A function that is closed", "A variable that is closed", "A method to close a window"], 0),
      q("What is the output of console.log(typeof null)?", ["\"object\"", "\"null\"", "\"undefined\"", "\"number\""], 0),
      q("What is the difference between '==' and '==='?", ["'==' checks value, '===' checks value and type", "'==' checks value and type, '===' checks value", "No difference", "'==' is for strings, '===' is for numbers"], 0),
      q("What is the purpose of the 'this' keyword?", ["Refers to the object it belongs to", "Refers to the current function", "Refers to the global object", "Refers to the previous object"], 0),
      q("What is a promise?", ["An object representing the eventual completion or failure of an asynchronous operation", "A guarantee that code will run", "A function that runs immediately", "A variable that holds a future value"], 0),
      q("What is the purpose of 'async/await'?", ["To write asynchronous code in a synchronous manner", "To make code run faster", "To create threads", "To handle errors"], 0),
      q("What is the event loop?", ["A mechanism that handles asynchronous callbacks", "A loop that runs forever", "A loop that handles events", "A function that loops through events"], 0),
      q("What is hoisting?", ["Moving declarations to the top of the current scope", "Moving assignments to the top", "Moving functions to the bottom", "Moving variables to the bottom"], 0),
      q("What is the difference between 'let' and 'var'?", ["'let' is block scoped, 'var' is function scoped", "'let' is function scoped, 'var' is block scoped", "No difference", "'let' is constant, 'var' is variable"], 0),
      q("What is a callback function?", ["A function passed as an argument to another function", "A function that calls itself", "A function that is called back", "A function that returns another function"], 0),
    ]
  },
  React: {
    Beginner: [
      q("What is React?", ["A JavaScript library for building user interfaces", "A framework for building mobile apps", "A database", "A server-side language"], 0),
      q("Who developed React?", ["Facebook", "Google", "Microsoft", "Apple"], 0),
      q("What is JSX?", ["A syntax extension for JavaScript", "A new programming language", "A database query language", "A style sheet language"], 0),
      q("What is a component?", ["A reusable piece of UI", "A function", "A variable", "A class"], 0),
      q("How do you create a functional component?", ["function MyComponent() { return <div>Hello</div>; }", "class MyComponent extends React.Component { render() { return <div>Hello</div>; } }", "const MyComponent = () => { return <div>Hello</div>; }", "All of the above"], 3),
      q("What is a prop?", ["Data passed from parent to child component", "Internal state of a component", "A function", "A style"], 0),
      q("What is state?", ["Internal data of a component that can change", "Data passed from parent", "A static value", "A global variable"], 0),
      q("How do you handle events in React?", ["onClick={handleClick}", "onclick=\"handleClick()\"", "on-click={handleClick}", "click={handleClick}"], 0),
      q("What is the virtual DOM?", ["A lightweight copy of the real DOM", "The real DOM", "A database", "A browser"], 0),
      q("What is the purpose of render()?", ["To display the component on the screen", "To update the state", "To fetch data", "To handle events"], 0),
    ],
    Intermediate: [
      q("What is the useState hook?", ["A hook to add state to functional components", "A hook to handle side effects", "A hook to access context", "A hook to optimize performance"], 0),
      q("What is the useEffect hook?", ["A hook to perform side effects in functional components", "A hook to add state", "A hook to access context", "A hook to optimize performance"], 0),
      q("What is the useContext hook?", ["A hook to access the context API", "A hook to add state", "A hook to handle side effects", "A hook to optimize performance"], 0),
      q("What is the useRef hook?", ["A hook to access DOM elements or persist values", "A hook to add state", "A hook to handle side effects", "A hook to optimize performance"], 0),
      q("What is the useReducer hook?", ["A hook to manage complex state logic", "A hook to add state", "A hook to handle side effects", "A hook to optimize performance"], 0),
      q("What is the useMemo hook?", ["A hook to memoize expensive calculations", "A hook to add state", "A hook to handle side effects", "A hook to optimize performance"], 0),
      q("What is the useCallback hook?", ["A hook to memoize functions", "A hook to add state", "A hook to handle side effects", "A hook to optimize performance"], 0),
      q("What is prop drilling?", ["Passing props through multiple levels of components", "Passing props to a child", "Passing props to a parent", "Passing props to a sibling"], 0),
      q("What is the Context API?", ["A way to share data globally without prop drilling", "A way to manage state", "A way to handle events", "A way to fetch data"], 0),
      q("What are fragments?", ["A way to group multiple elements without adding extra nodes to the DOM", "A way to split code", "A way to handle errors", "A way to optimize performance"], 0),
    ],
    Advanced: [
      q("What is the React lifecycle?", ["The series of events that happen from a component's creation to its destruction", "The time a component is on screen", "The time it takes to render", "The time it takes to update"], 0),
      q("What are Higher-Order Components (HOC)?", ["Functions that take a component and return a new component", "Components that render other components", "Components that have high priority", "Components that are complex"], 0),
      q("What are Render Props?", ["A technique for sharing code between components using a prop whose value is a function", "Props that render components", "Props that are functions", "Props that are objects"], 0),
      q("What is React.memo?", ["A higher-order component for memoizing functional components", "A hook", "A function", "A class"], 0),
      q("What is React.lazy?", ["A function that lets you render a dynamic import as a regular component", "A function to delay rendering", "A function to optimize images", "A function to handle errors"], 0),
      q("What is Suspense?", ["A component that lets you wait for some code to load and declaratively specify a loading state", "A hook", "A function", "A class"], 0),
      q("What are Error Boundaries?", ["Components that catch JavaScript errors anywhere in their child component tree", "Functions that catch errors", "Hooks that catch errors", "Classes that catch errors"], 0),
      q("What is Portals?", ["A way to render children into a DOM node that exists outside the DOM hierarchy of the parent component", "A way to transport data", "A way to handle events", "A way to optimize performance"], 0),
      q("What is Reconciliation?", ["The process through which React updates the DOM", "The process of creating components", "The process of deleting components", "The process of fetching data"], 0),
      q("What is Fiber?", ["The new reconciliation engine in React 16", "A new component", "A new hook", "A new library"], 0),
    ]
  },
  "Node.js": {
    Beginner: [
      q("What is Node.js?", ["A JavaScript runtime built on Chrome's V8 JavaScript engine", "A framework", "A library", "A database"], 0),
      q("Is Node.js single-threaded?", ["Yes", "No", "Maybe", "Sometimes"], 0),
      q("What is npm?", ["Node Package Manager", "Node Project Manager", "Node Program Manager", "Node Process Manager"], 0),
      q("How do you install a package using npm?", ["npm install <package_name>", "npm get <package_name>", "npm add <package_name>", "npm create <package_name>"], 0),
      q("What is a module in Node.js?", ["A reusable block of code", "A function", "A variable", "A class"], 0),
      q("How do you export a module?", ["module.exports", "exports.module", "export default", "export"], 0),
      q("How do you import a module?", ["require()", "import()", "include()", "fetch()"], 0),
      q("What is the global object in Node.js?", ["global", "window", "document", "process"], 0),
      q("What is the process object?", ["Provides information about the current Node.js process", "Provides information about the global object", "Provides information about the file system", "Provides information about the network"], 0),
      q("What is the fs module?", ["File System module", "File Service module", "File Server module", "File Storage module"], 0),
    ],
    Intermediate: [
      q("What is the event loop?", ["A mechanism that handles asynchronous callbacks", "A loop that runs forever", "A loop that handles events", "A function that loops through events"], 0),
      q("What is a callback?", ["A function passed as an argument to another function", "A function that calls itself", "A function that is called back", "A function that returns another function"], 0),
      q("What is a promise?", ["An object representing the eventual completion or failure of an asynchronous operation", "A guarantee that code will run", "A function that runs immediately", "A variable that holds a future value"], 0),
      q("What is async/await?", ["Syntactic sugar for promises", "A new way to write synchronous code", "A way to create threads", "A way to handle errors"], 0),
      q("What is middleware?", ["Functions that have access to the request and response objects", "A database driver", "A frontend framework", "A testing tool"], 0),
      q("What is Express.js?", ["A web application framework for Node.js", "A database", "A library", "A language"], 0),
      q("What is REST?", ["Representational State Transfer", "Remote State Transfer", "Real State Transfer", "Random State Transfer"], 0),
      q("What is JSON?", ["JavaScript Object Notation", "JavaScript Object Network", "JavaScript Object Name", "JavaScript Object Number"], 0),
      q("What is a stream?", ["A sequence of data elements made available over time", "A river", "A file", "A database"], 0),
      q("What is a buffer?", ["A temporary memory storage", "A permanent memory storage", "A file", "A database"], 0),
    ],
    Advanced: [
      q("What is libuv?", ["A multi-platform support library with a focus on asynchronous I/O", "A library for UI", "A library for video", "A library for audio"], 0),
      q("How does Node.js handle concurrency?", ["Using the event loop and non-blocking I/O", "Using threads", "Using processes", "Using magic"], 0),
      q("What are worker threads?", ["Threads that execute JavaScript in parallel", "Processes", "Child processes", "Clusters"], 0),
      q("What is the difference between spawn and exec?", ["spawn returns a stream, exec returns a buffer", "spawn returns a buffer, exec returns a stream", "No difference", "spawn is faster"], 0),
      q("What is memory leak?", ["When memory is not released after use", "When memory is full", "When memory is empty", "When memory is corrupted"], 0),
      q("How to debug Node.js applications?", ["Using node --inspect", "Using console.log", "Using debugger", "All of the above"], 3),
      q("What is PM2?", ["A production process manager for Node.js", "A package manager", "A database", "A framework"], 0),
      q("What is N-API?", ["API for building native Addons", "API for network", "API for node", "API for npm"], 0),
      q("What is WASI?", ["WebAssembly System Interface", "Web Application System Interface", "Web API System Interface", "Web App System Interface"], 0),
      q("What is REPL?", ["Read Eval Print Loop", "Read Execute Print Loop", "Read Eval Process Loop", "Read Execute Process Loop"], 0),
    ]
  },
  SQL: {
    Beginner: [
      q("What does SQL stand for?", ["Structured Query Language", "Simple Query Language", "Standard Query Language", "System Query Language"], 0),
      q("Which statement is used to extract data from a database?", ["SELECT", "GET", "EXTRACT", "OPEN"], 0),
      q("Which statement is used to update data in a database?", ["UPDATE", "SAVE", "MODIFY", "CHANGE"], 0),
      q("Which statement is used to delete data from a database?", ["DELETE", "REMOVE", "COLLAPSE", "DROP"], 0),
      q("Which statement is used to insert new data in a database?", ["INSERT INTO", "ADD NEW", "INSERT NEW", "ADD RECORD"], 0),
      q("With SQL, how do you select a column named \"FirstName\" from a table named \"Persons\"?", ["SELECT FirstName FROM Persons", "EXTRACT FirstName FROM Persons", "SELECT Persons.FirstName", "GET FirstName FROM Persons"], 0),
      q("With SQL, how do you select all the columns from a table named \"Persons\"?", ["SELECT * FROM Persons", "SELECT [all] FROM Persons", "SELECT Persons", "SELECT *.Persons"], 0),
      q("With SQL, how do you select all the records from a table named \"Persons\" where the value of the column \"FirstName\" is \"Peter\"?", ["SELECT * FROM Persons WHERE FirstName='Peter'", "SELECT [all] FROM Persons WHERE FirstName LIKE 'Peter'", "SELECT * FROM Persons WHERE FirstName<>'Peter'", "SELECT * FROM Persons WHERE FirstName='Peter'"], 0),
      q("With SQL, how do you select all the records from a table named \"Persons\" where the value of the column \"FirstName\" starts with an \"a\"?", ["SELECT * FROM Persons WHERE FirstName LIKE 'a%'", "SELECT * FROM Persons WHERE FirstName='a'", "SELECT * FROM Persons WHERE FirstName LIKE '%a'", "SELECT * FROM Persons WHERE FirstName='%a%'"], 0),
      q("The OR operator displays a record if ANY conditions listed are true. The AND operator displays a record if ALL of the conditions listed are true", ["True", "False"], 0),
    ],
    Intermediate: [
      q("Which SQL statement is used to return only different values?", ["SELECT DISTINCT", "SELECT UNIQUE", "SELECT DIFFERENT", "SELECT ALL"], 0),
      q("Which SQL keyword is used to sort the result-set?", ["ORDER BY", "SORT BY", "SORT", "ORDER"], 0),
      q("With SQL, how can you return the number of records in the \"Persons\" table?", ["SELECT COUNT(*) FROM Persons", "SELECT COLUMNS(*) FROM Persons", "SELECT ROWS(*) FROM Persons", "SELECT COUNT FROM Persons"], 0),
      q("What is the most common type of join?", ["INNER JOIN", "INSIDE JOIN", "JOINED TABLE", "JOIN"], 0),
      q("Which operator is used to search for a specified pattern in a column?", ["LIKE", "FROM", "WHERE", "SEARCH"], 0),
      q("Which SQL statement is used to create a database table called \"Persons\"?", ["CREATE TABLE Persons", "CREATE DATABASE TABLE Persons", "CREATE DB Persons", "CREATE Persons"], 0),
      q("Which SQL statement is used to delete a table?", ["DROP TABLE", "DELETE TABLE", "REMOVE TABLE", "STOP TABLE"], 0),
      q("Which SQL statement is used to create a stored procedure?", ["CREATE PROCEDURE", "CREATE FUNCTION", "CREATE SCRIPT", "CREATE CODE"], 0),
      q("How can you change \"Hansen\" into \"Nilsen\" in the \"LastName\" column in the \"Persons\" table?", ["UPDATE Persons SET LastName='Nilsen' WHERE LastName='Hansen'", "UPDATE Persons SET LastName='Hansen' INTO LastName='Nilsen'", "MODIFY Persons SET LastName='Nilsen' WHERE LastName='Hansen'", "MODIFY Persons SET LastName='Hansen' INTO LastName='Nilsen'"], 0),
      q("How can you delete the records where the \"FirstName\" is \"Peter\" in the \"Persons\" Table?", ["DELETE FROM Persons WHERE FirstName = 'Peter'", "DELETE FirstName='Peter' FROM Persons", "DELETE ROW FirstName='Peter' FROM Persons", "DELETE Persons WHERE FirstName = 'Peter'"], 0),
    ],
    Advanced: [
      q("What is a transaction?", ["A sequence of operations performed as a single logical unit of work", "A payment", "A transfer of data", "A connection"], 0),
      q("What is ACID?", ["Atomicity, Consistency, Isolation, Durability", "Association, Class, Interface, Dependency", "Access, Control, Input, Data", "All, Clear, Insert, Delete"], 0),
      q("What is a trigger?", ["A stored procedure that automatically runs when an event occurs", "A button", "A switch", "A link"], 0),
      q("What is a cursor?", ["A database object used to retrieve data one row at a time", "A mouse pointer", "A marker", "A selector"], 0),
      q("What is the difference between UNION and UNION ALL?", ["UNION removes duplicates, UNION ALL includes duplicates", "UNION includes duplicates, UNION ALL removes duplicates", "No difference", "UNION is faster"], 0),
      q("What is a subquery?", ["A query nested inside another query", "A small query", "A secondary query", "A backup query"], 0),
      q("What is the difference between HAVING and WHERE?", ["WHERE filters rows before grouping, HAVING filters groups after grouping", "HAVING filters rows before grouping, WHERE filters groups after grouping", "No difference", "WHERE is faster"], 0),
      q("What is a stored procedure?", ["A prepared SQL code that you can save and reuse", "A function", "A script", "A macro"], 0),
      q("What is database replication?", ["Copying data from one database to another", "Deleting data", "Backing up data", "Restoring data"], 0),
      q("What is sharding?", ["Partitioning data across multiple servers", "Sharing data", "Sorting data", "Saving data"], 0),
    ]
  },
  Git: {
    Beginner: [
      q("What is Git?", ["A distributed version control system", "A centralized version control system", "A database", "A programming language"], 0),
      q("What is the command to initialize a new Git repository?", ["git init", "git start", "git new", "git create"], 0),
      q("What is the command to clone a repository?", ["git clone", "git copy", "git download", "git pull"], 0),
      q("What is the command to check the status of the repository?", ["git status", "git check", "git info", "git state"], 0),
      q("What is the command to add files to the staging area?", ["git add", "git stage", "git push", "git commit"], 0),
      q("What is the command to commit changes?", ["git commit", "git save", "git push", "git upload"], 0),
      q("What is the command to push changes to a remote repository?", ["git push", "git upload", "git send", "git sync"], 0),
      q("What is the command to pull changes from a remote repository?", ["git pull", "git download", "git fetch", "git sync"], 0),
      q("What is a branch?", ["A parallel version of a repository", "A tree", "A leaf", "A root"], 0),
      q("What is the command to create a new branch?", ["git branch <name>", "git new <name>", "git create <name>", "git checkout <name>"], 0),
    ],
    Intermediate: [
      q("What is the difference between git pull and git fetch?", ["git pull fetches and merges, git fetch only fetches", "git fetch fetches and merges, git pull only fetches", "No difference", "git pull is faster"], 0),
      q("What is a merge conflict?", ["When Git cannot automatically resolve differences in code", "When two branches have the same name", "When a file is deleted", "When a commit is lost"], 0),
      q("What is the command to discard changes in the working directory?", ["git checkout -- <file>", "git discard <file>", "git reset <file>", "git undo <file>"], 0),
      q("What is the command to unstage a file?", ["git reset HEAD <file>", "git unstage <file>", "git remove <file>", "git delete <file>"], 0),
      q("What is the command to view the commit history?", ["git log", "git history", "git show", "git list"], 0),
      q("What is .gitignore?", ["A file that specifies intentionally untracked files", "A file that ignores errors", "A file that ignores users", "A file that ignores commits"], 0),
      q("What is a remote?", ["A common repository on a server", "A remote control", "A distant computer", "A backup"], 0),
      q("What is the command to add a remote?", ["git remote add <name> <url>", "git add remote <name> <url>", "git remote <name> <url>", "git connect <name> <url>"], 0),
      q("What is HEAD?", ["A pointer to the current commit", "The first commit", "The last commit", "The main branch"], 0),
      q("What is a tag?", ["A reference to a specific point in Git history", "A label", "A sticker", "A note"], 0),
    ],
    Advanced: [
      q("What is git bisect?", ["Use binary search to find the commit that introduced a bug", "Divide the repository", "Cut a branch", "Merge two branches"], 0),
      q("What is git blame?", ["Show what revision and author last modified each line of a file", "Blame someone", "Find errors", "Check history"], 0),
      q("What is a submodule?", ["A repository inside another repository", "A small module", "A function", "A class"], 0),
      q("What is git reflog?", ["A log of all reference updates", "A log of errors", "A log of users", "A log of files"], 0),
      q("What is a hook?", ["Scripts that run automatically every time a particular event occurs in a Git repository", "A latch", "A connection", "A link"], 0),
      q("What is the difference between git reset --soft, --mixed, and --hard?", ["Soft keeps changes staged, mixed keeps changes unstaged, hard discards changes", "Soft discards changes, mixed keeps changes staged, hard keeps changes unstaged", "No difference", "Soft is slow, mixed is medium, hard is fast"], 0),
      q("What is a detached HEAD?", ["When HEAD points to a commit instead of a branch", "When the head is removed", "When the repository is broken", "When the network is down"], 0),
      q("How do you squash commits?", ["Using interactive rebase", "Using merge", "Using reset", "Using checkout"], 0),
      q("What is git flow?", ["A branching model for Git", "A command", "A tool", "A workflow"], 0),
      q("What is a pull request?", ["A method of submitting contributions to an open development project", "A request to pull data", "A request to merge", "A request to delete"], 0),
    ]
  },
  Docker: {
    Beginner: [
      q("What is Docker?", ["A platform for developing, shipping, and running applications in containers", "A virtual machine", "A database", "A programming language"], 0),
      q("What is a container?", ["A standard unit of software that packages up code and all its dependencies", "A box", "A server", "A file"], 0),
      q("What is an image?", ["A read-only template with instructions for creating a Docker container", "A picture", "A snapshot", "A backup"], 0),
      q("What is the Dockerfile?", ["A text document that contains all the commands to assemble an image", "A file with docker settings", "A log file", "A database file"], 0),
      q("What is Docker Hub?", ["A cloud-based registry service", "A local registry", "A network", "A server"], 0),
      q("What is the command to build an image?", ["docker build", "docker create", "docker make", "docker compile"], 0),
      q("What is the command to run a container?", ["docker run", "docker start", "docker execute", "docker launch"], 0),
      q("What is the command to list running containers?", ["docker ps", "docker list", "docker show", "docker status"], 0),
      q("What is the command to stop a container?", ["docker stop", "docker kill", "docker end", "docker halt"], 0),
      q("What is the command to remove a container?", ["docker rm", "docker delete", "docker remove", "docker erase"], 0),
    ],
    Intermediate: [
      q("What is a volume?", ["A mechanism for persisting data generated by and used by Docker containers", "A sound level", "A disk", "A folder"], 0),
      q("What is a network in Docker?", ["A communication channel between containers", "A social network", "A cable", "A router"], 0),
      q("What is the difference between COPY and ADD in Dockerfile?", ["ADD has some features like tar extraction and remote URL support, COPY just copies files", "COPY has some features like tar extraction and remote URL support, ADD just copies files", "No difference", "COPY is faster"], 0),
      q("What is the difference between CMD and ENTRYPOINT?", ["CMD sets default command and/or parameters, ENTRYPOINT configures a container that will run as an executable", "ENTRYPOINT sets default command and/or parameters, CMD configures a container that will run as an executable", "No difference", "CMD is faster"], 0),
      q("What is a multi-stage build?", ["A method to optimize Dockerfiles by keeping them easy to read and maintain", "Building multiple images", "Building multiple containers", "Building multiple apps"], 0),
      q("What is docker exec?", ["Run a command in a running container", "Execute a container", "Start a container", "Stop a container"], 0),
      q("What is docker logs?", ["Fetch the logs of a container", "Write logs", "Delete logs", "Analyze logs"], 0),
      q("What is docker inspect?", ["Return low-level information on Docker objects", "Inspect a container", "Check a container", "Verify a container"], 0),
      q("What is docker prune?", ["Remove unused data", "Cut a tree", "Clean a container", "Optimize an image"], 0),
      q("What is a registry?", ["A storage and distribution system for named Docker images", "A list of users", "A list of containers", "A list of commands"], 0),
    ],
    Advanced: [
      q("What is Docker Swarm?", ["A container orchestration tool", "A swarm of bees", "A cluster of servers", "A network of containers"], 0),
      q("What is Kubernetes?", ["An open-source system for automating deployment, scaling, and management of containerized applications", "A docker tool", "A google tool", "A microsoft tool"], 0),
      q("What is a namespace?", ["A technology for providing the isolation of the workspace", "A name", "A space", "A folder"], 0),
      q("What is cgroups?", ["Control groups, a Linux kernel feature that limits, accounts for, and isolates the resource usage", "Container groups", "Cluster groups", "Command groups"], 0),
      q("What is the difference between a VM and a Container?", ["Containers share the host OS kernel, VMs have their own OS", "VMs share the host OS kernel, Containers have their own OS", "No difference", "Containers are slower"], 0),
      q("What is an overlay network?", ["A network that creates a distributed network among multiple Docker daemon hosts", "A local network", "A private network", "A public network"], 0),
      q("What is a macvlan network?", ["Allows you to assign a MAC address to a container", "A network for macs", "A virtual lan", "A wireless network"], 0),
      q("What is Docker Content Trust?", ["Allows you to verify the integrity and the publisher of all the data received from a registry", "Trusting docker", "Trusting content", "Trusting users"], 0),
      q("What is a manifest?", ["A JSON file that describes an image", "A list of passengers", "A document", "A file"], 0),
      q("What is a layer?", ["An intermediate image", "A cake", "A level", "A step"], 0),
    ]
  },
  // --- NEW TOPICS ---
  Angular: {
    Beginner: [
      q("What is Angular?", ["A TypeScript-based open-source web application framework", "A database", "A server", "A library"], 0),
      q("What is a Component in Angular?", ["The basic building block of the UI", "A service", "A module", "A directive"], 0),
      q("What is a Template?", ["A view that defines the UI", "A controller", "A model", "A route"], 0),
      q("What is Data Binding?", ["Synchronization between model and view", "Connecting to database", "Linking files", "Merging code"], 0),
      q("What is a Directive?", ["A class that adds behavior to elements", "A component", "A service", "A pipe"], 0),
    ],
    Intermediate: [
      q("What is Dependency Injection?", ["A design pattern where dependencies are provided to a class", "Injecting code", "Injecting data", "Injecting styles"], 0),
      q("What is an Observable?", ["A stream of events or data", "A promise", "A callback", "A variable"], 0),
      q("What is a Pipe?", ["A way to transform data in templates", "A connection", "A tube", "A service"], 0),
      q("What is a Service?", ["A class with a specific purpose, often shared", "A component", "A module", "A directive"], 0),
      q("What is Routing?", ["Navigation between views", "Connecting cables", "Sending data", "Sorting lists"], 0),
    ],
    Advanced: [
      q("What is Change Detection?", ["The mechanism to synchronize the model with the view", "Detecting errors", "Detecting users", "Detecting files"], 0),
      q("What is AOT Compilation?", ["Ahead-of-Time compilation", "After-of-Time compilation", "All-of-Time compilation", "Any-of-Time compilation"], 0),
      q("What are NgModules?", ["Containers for a cohesive block of code", "Variables", "Functions", "Classes"], 0),
      q("What is RxJS?", ["A library for reactive programming using Observables", "A database", "A server", "A framework"], 0),
      q("What is a Guard?", ["A script to control access to routes", "A security guard", "A firewall", "A lock"], 0),
    ]
  },
  NestJS: {
    Beginner: [
      q("What is NestJS?", ["A framework for building efficient, scalable Node.js server-side applications", "A frontend framework", "A database", "A language"], 0),
      q("What language is NestJS built with?", ["TypeScript", "Java", "Python", "C#"], 0),
      q("What is a Controller?", ["Handles incoming requests and returns responses", "Controls the database", "Controls the server", "Controls the user"], 0),
      q("What is a Provider?", ["A fundamental concept for dependency injection", "A supplier", "A vendor", "A host"], 0),
      q("What is a Module?", ["A class annotated with @Module() to organize code", "A file", "A folder", "A library"], 0),
    ],
    Intermediate: [
      q("What is Middleware in NestJS?", ["A function called before the route handler", "A database", "A service", "A guard"], 0),
      q("What is an Exception Filter?", ["Handles exceptions thrown across the application", "Filters data", "Filters users", "Filters files"], 0),
      q("What is a Pipe in NestJS?", ["Transforms input data or validates it", "A connection", "A tube", "A service"], 0),
      q("What is a Guard?", ["Determines whether a request will be handled", "A security guard", "A firewall", "A lock"], 0),
      q("What is an Interceptor?", ["Intercepts the request/response flow", "A spy", "A monitor", "A logger"], 0),
    ],
    Advanced: [
      q("What is a Custom Decorator?", ["A way to create your own decorators", "A design pattern", "A style", "A theme"], 0),
      q("What is Microservices support in NestJS?", ["Native support for building microservices", "Small services", "Tiny apps", "Little databases"], 0),
      q("What is CQRS?", ["Command Query Responsibility Segregation", "Code Query Read Save", "Create Query Read Service", "Command Queue Read System"], 0),
      q("What is Dependency Injection scopes?", ["Singleton, Request, Transient", "Global, Local", "Public, Private", "Static, Dynamic"], 0),
      q("What is the NestJS CLI?", ["Command Line Interface for scaffolding and managing NestJS apps", "A tool", "A script", "A program"], 0),
    ]
  },
  NextJS: {
    Beginner: [
      q("What is Next.js?", ["A React framework for production", "A database", "A server", "A library"], 0),
      q("What is SSR?", ["Server-Side Rendering", "Static Site Rendering", "Server Site Rendering", "Simple Site Rendering"], 0),
      q("What is SSG?", ["Static Site Generation", "Server Site Generation", "Simple Site Generation", "Standard Site Generation"], 0),
      q("What is the 'pages' directory?", ["Where routes are defined based on file structure", "Where images are stored", "Where styles are stored", "Where components are stored"], 0),
      q("How do you create a new Next.js app?", ["npx create-next-app", "npm init next", "next new", "create next"], 0),
    ],
    Intermediate: [
      q("What is getStaticProps?", ["Fetches data at build time", "Fetches data at runtime", "Fetches data on client", "Fetches data on server"], 0),
      q("What is getServerSideProps?", ["Fetches data on each request", "Fetches data at build time", "Fetches data on client", "Fetches data on server"], 0),
      q("What is API Routes?", ["Allows you to build your API with Next.js", "External APIs", "Database routes", "Network routes"], 0),
      q("What is the Image component?", ["Optimizes images automatically", "Displays images", "Loads images", "Saves images"], 0),
      q("What is Fast Refresh?", ["Instant feedback on edits", "Reloading page", "Clearing cache", "Updating server"], 0),
    ],
    Advanced: [
      q("What is ISR?", ["Incremental Static Regeneration", "Instant Server Rendering", "Internal Static Routing", "Immediate Site Regeneration"], 0),
      q("What is Middleware in Next.js?", ["Code that runs before a request is completed", "A database", "A service", "A guard"], 0),
      q("What is Dynamic Import?", ["Importing modules on demand", "Importing all modules", "Importing styles", "Importing images"], 0),
      q("What is Automatic Static Optimization?", ["Next.js automatically determines if a page is static or dynamic", "Optimizing images", "Optimizing code", "Optimizing styles"], 0),
      q("What is the '_app.js' file?", ["Initializes pages", "Main entry point", "Global styles", "All of the above"], 3),
    ]
  },
  VueJS: {
    Beginner: [
      q("What is Vue.js?", ["A progressive JavaScript framework", "A database", "A server", "A library"], 0),
      q("What is a Vue Instance?", ["The root of a Vue application", "A component", "A directive", "A plugin"], 0),
      q("What is v-bind?", ["Directively used to bind attributes", "Bind data", "Bind events", "Bind styles"], 0),
      q("What is v-model?", ["Two-way data binding", "One-way data binding", "Event binding", "Style binding"], 0),
      q("What is v-if?", ["Conditional rendering", "Looping", "Binding", "Listening"], 0),
    ],
    Intermediate: [
      q("What is a Computed Property?", ["Cached based on dependencies", "A method", "A variable", "A constant"], 0),
      q("What is a Watcher?", ["Reacts to data changes", "A clock", "A timer", "A counter"], 0),
      q("What is a Component?", ["Reusable Vue instance", "A file", "A folder", "A library"], 0),
      q("What is Props?", ["Data passed to child components", "Internal state", "Global state", "Events"], 0),
      q("What is Vue CLI?", ["Standard tooling for Vue.js development", "A command", "A tool", "A script"], 0),
    ],
    Advanced: [
      q("What is Vuex?", ["State management pattern + library", "A router", "A server", "A database"], 0),
      q("What is Vue Router?", ["Official router for Vue.js", "A map", "A guide", "A path"], 0),
      q("What is the Virtual DOM?", ["Lightweight copy of the DOM", "Real DOM", "Shadow DOM", "Browser DOM"], 0),
      q("What are Mixins?", ["A flexible way to distribute reusable functionalities", "Variables", "Functions", "Classes"], 0),
      q("What is Server-Side Rendering (SSR) in Vue?", ["Rendering Vue apps on the server", "Rendering on client", "Rendering in browser", "Rendering in database"], 0),
    ]
  },
  SvelteJS: {
    Beginner: [
      q("What is Svelte?", ["A compiler that converts components into imperative code", "A framework", "A library", "A database"], 0),
      q("Does Svelte use a Virtual DOM?", ["No", "Yes", "Maybe", "Sometimes"], 0),
      q("How do you declare a reactive variable?", ["$: variable = ...", "var variable = ...", "let variable = ...", "const variable = ..."], 0),
      q("What is a .svelte file?", ["Contains HTML, CSS, and JS for a component", "A script", "A style", "A template"], 0),
      q("How do you handle events?", ["on:eventname", "onclick", "@event", "v-on:event"], 0),
    ],
    Intermediate: [
      q("What are Stores?", ["Svelte's state management solution", "Shops", "Databases", "Files"], 0),
      q("What is the 'await' block?", ["Handles asynchronous data in templates", "Waits for user", "Waits for server", "Waits for file"], 0),
      q("What is 'bind:value'?", ["Two-way binding", "One-way binding", "Event binding", "Style binding"], 0),
      q("What are Lifecycle functions?", ["onMount, onDestroy, etc.", "Start, Stop", "Init, Exit", "Create, Delete"], 0),
      q("What is SvelteKit?", ["The official application framework for Svelte", "A tool", "A library", "A plugin"], 0),
    ],
    Advanced: [
      q("What is the 'context' API in Svelte?", ["Mechanism to pass data to components without props", "Global state", "Local state", "Database"], 0),
      q("What are Slots?", ["Content projection", "Holes", "Spaces", "Variables"], 0),
      q("What is 'tick'?", ["Returns a promise that resolves after pending state changes", "A clock", "A timer", "A counter"], 0),
      q("What are Actions?", ["Element-level lifecycle functions", "Events", "Methods", "Functions"], 0),
      q("What is Server-Side Rendering (SSR) in Svelte?", ["Rendering on the server", "Rendering on client", "Rendering in browser", "Rendering in database"], 0),
    ]
  },
  Java: {
    Beginner: [
      q("What is Java?", ["A high-level, class-based, object-oriented programming language", "A coffee", "A script", "A database"], 0),
      q("What is the JVM?", ["Java Virtual Machine", "Java Visual Machine", "Java Variable Machine", "Java Version Machine"], 0),
      q("What is the main method?", ["public static void main(String[] args)", "void main()", "main()", "start()"], 0),
      q("What is a Class?", ["A blueprint for creating objects", "A function", "A variable", "A file"], 0),
      q("What is an Object?", ["An instance of a class", "A variable", "A function", "A file"], 0),
    ],
    Intermediate: [
      q("What is Inheritance?", ["Mechanism where one class acquires properties of another", "Copying code", "Sharing files", "Linking libraries"], 0),
      q("What is Polymorphism?", ["Ability of an object to take on many forms", "Changing shape", "Changing color", "Changing size"], 0),
      q("What is Encapsulation?", ["Wrapping code and data together into a single unit", "Hiding data", "Locking files", "Securing network"], 0),
      q("What is an Interface?", ["A reference type in Java, similar to a class, that can contain only constants and method signatures", "A screen", "A connection", "A link"], 0),
      q("What is an Exception?", ["An event that disrupts the normal flow of the program", "A mistake", "A bug", "A feature"], 0),
    ],
    Advanced: [
      q("What is the Stream API?", ["Used to process collections of objects", "Video streaming", "Audio streaming", "Data streaming"], 0),
      q("What is a Lambda Expression?", ["A short block of code which takes in parameters and returns a value", "A variable", "A function", "A class"], 0),
      q("What is Multithreading?", ["Concurrent execution of two or more parts of a program", "Running multiple programs", "Using multiple CPUs", "Using multiple screens"], 0),
      q("What is Garbage Collection?", ["Automatic memory management", "Cleaning files", "Deleting users", "Removing viruses"], 0),
      q("What is Reflection?", ["Ability of a process to examine, introspect, and modify its own structure and behavior", "Mirroring", "Copying", "Cloning"], 0),
    ]
  },
  SpringBoot: {
    Beginner: [
      q("What is Spring Boot?", ["An extension of the Spring framework to simplify development", "A shoe", "A jump", "A start"], 0),
      q("What is the @SpringBootApplication annotation?", ["Combines @Configuration, @EnableAutoConfiguration, and @ComponentScan", "Starts the app", "Configures the app", "Scans components"], 0),
      q("What is Dependency Injection?", ["Design pattern to implement IoC", "Injecting code", "Injecting data", "Injecting styles"], 0),
      q("What is the 'pom.xml' file?", ["Project Object Model for Maven", "Configuration file", "Settings file", "Data file"], 0),
      q("How do you run a Spring Boot app?", ["mvn spring-boot:run", "java run", "start app", "run spring"], 0),
    ],
    Intermediate: [
      q("What is Spring Data JPA?", ["Simplifies data access using JPA", "Database", "Server", "Client"], 0),
      q("What is the @RestController annotation?", ["Combines @Controller and @ResponseBody", "Resting controller", "Responding controller", "Requesting controller"], 0),
      q("What is application.properties?", ["Configuration file for Spring Boot", "Code file", "Data file", "Log file"], 0),
      q("What is Actuator?", ["Provides production-ready features like monitoring", "Actor", "Action", "Activity"], 0),
      q("What is Spring Security?", ["Framework for authentication and access control", "Security guard", "Firewall", "Lock"], 0),
    ],
    Advanced: [
      q("What is Auto-Configuration?", ["Automatically configures Spring application based on jar dependencies", "Magic", "AI", "Script"], 0),
      q("What is AOP?", ["Aspect-Oriented Programming", "All Object Programming", "Any Object Programming", "Application Object Programming"], 0),
      q("What is Spring Cloud?", ["Tools for building common patterns in distributed systems", "Cloud storage", "Cloud server", "Cloud database"], 0),
      q("What is Reactive Spring?", ["Non-blocking, asynchronous applications", "Fast Spring", "Slow Spring", "Active Spring"], 0),
      q("What is the Bean lifecycle?", ["Instantiation, Properties, Initialization, Destruction", "Start, Stop", "Create, Delete", "Open, Close"], 0),
    ]
  },
  Python: {
    Beginner: [
      q("What is Python?", ["A high-level, interpreted programming language", "A snake", "A database", "A server"], 0),
      q("How do you print in Python?", ["print()", "echo()", "console.log()", "write()"], 0),
      q("How do you create a variable?", ["x = 5", "var x = 5", "int x = 5", "let x = 5"], 0),
      q("What is a list?", ["Ordered, mutable collection", "Array", "Set", "Map"], 0),
      q("What is a dictionary?", ["Unordered, mutable collection of key-value pairs", "Book", "List", "Set"], 0),
    ],
    Intermediate: [
      q("What is a tuple?", ["Ordered, immutable collection", "List", "Set", "Map"], 0),
      q("What is a set?", ["Unordered, unindexed collection of unique elements", "List", "Tuple", "Map"], 0),
      q("What is a function?", ["Block of code which only runs when it is called", "Variable", "Class", "Module"], 0),
      q("What is a module?", ["A file containing Python definitions and statements", "Folder", "Library", "Package"], 0),
      q("What is PIP?", ["Package Installer for Python", "Pipe", "Pop", "Push"], 0),
    ],
    Advanced: [
      q("What is a decorator?", ["A design pattern that allows a user to add new functionality to an existing object without modifying its structure", "Decoration", "Style", "Theme"], 0),
      q("What is a generator?", ["A function that returns an iterator", "Engine", "Motor", "Creator"], 0),
      q("What is the Global Interpreter Lock (GIL)?", ["Mutex that protects access to Python objects", "Lock", "Key", "Security"], 0),
      q("What is list comprehension?", ["Concise way to create lists", "Understanding lists", "Reading lists", "Writing lists"], 0),
      q("What is pickling?", ["Process of converting a Python object hierarchy into a byte stream", "Cooking", "Preserving", "Saving"], 0),
    ]
  },
  Django: {
    Beginner: [
      q("What is Django?", ["A high-level Python web framework", "A movie", "A song", "A dance"], 0),
      q("What is MVT?", ["Model View Template", "Model View Controller", "Model View Presenter", "Model View Data"], 0),
      q("What is a Model?", ["Single, definitive source of information about your data", "View", "Template", "Controller"], 0),
      q("What is a View?", ["Python function that takes a web request and returns a web response", "Screen", "Page", "Window"], 0),
      q("What is a Template?", ["Text file defining the structure or layout of a file", "Code", "Data", "Log"], 0),
    ],
    Intermediate: [
      q("What is the Django Admin?", ["Automatic admin interface", "User interface", "Client interface", "Server interface"], 0),
      q("What is ORM?", ["Object-Relational Mapping", "Object Real Mapping", "Object Read Mapping", "Object Run Mapping"], 0),
      q("What is a Migration?", ["Way to propagate changes you make to your models into your database schema", "Moving data", "Copying data", "Deleting data"], 0),
      q("What is 'manage.py'?", ["Command-line utility for administrative tasks", "Manager", "Boss", "Leader"], 0),
      q("What is a URLconf?", ["Maps URLs to views", "Configuration", "Settings", "Data"], 0),
    ],
    Advanced: [
      q("What is Middleware in Django?", ["Framework of hooks into Django's request/response processing", "Database", "Server", "Client"], 0),
      q("What are Signals?", ["Allow certain senders to notify a set of receivers that some action has taken place", "Traffic lights", "Signs", "Messages"], 0),
      q("What is the Context Processor?", ["Takes a request object and returns a dictionary to be added to the context", "Processor", "CPU", "Memory"], 0),
      q("What is Class-Based Views?", ["Views implemented as Python classes", "Function views", "Simple views", "Complex views"], 0),
      q("What is Django Rest Framework?", ["Toolkit for building Web APIs", "Library", "Tool", "Plugin"], 0),
    ]
  },
  Flask: {
    Beginner: [
      q("What is Flask?", ["A micro web framework written in Python", "Bottle", "Cup", "Glass"], 0),
      q("What is a route?", ["Mapping between a URL and a function", "Road", "Path", "Way"], 0),
      q("How do you run a Flask app?", ["flask run", "python run", "start app", "run flask"], 0),
      q("What is Jinja2?", ["Templating engine for Python", "Ninja", "Samurai", "Warrior"], 0),
      q("What is Werkzeug?", ["WSGI web application library", "Tool", "Hammer", "Wrench"], 0),
    ],
    Intermediate: [
      q("What is a Blueprint?", ["Way to organize a group of related views and other code", "Plan", "Map", "Design"], 0),
      q("What is the 'request' object?", ["Contains all the data sent by the client", "Response", "Server", "Database"], 0),
      q("What is the 'g' object?", ["Global namespace for holding any data during a single request context", "Global", "General", "Good"], 0),
      q("What is 'session'?", ["Stores data across requests", "Meeting", "Class", "Time"], 0),
      q("What is Flask-SQLAlchemy?", ["Extension for SQLAlchemy support", "Database", "Server", "Client"], 0),
    ],
    Advanced: [
      q("What is the Application Context?", ["Keeps track of the application-level data", "Context", "Environment", "Setting"], 0),
      q("What is the Request Context?", ["Keeps track of the request-level data", "Context", "Environment", "Setting"], 0),
      q("What are Signals in Flask?", ["Notifies subscribers of events", "Lights", "Signs", "Messages"], 0),
      q("What is Flask-Migrate?", ["Extension for handling database migrations", "Moving", "Copying", "Deleting"], 0),
      q("What is WSGI?", ["Web Server Gateway Interface", "Web Standard Gateway Interface", "Web Simple Gateway Interface", "Web Secure Gateway Interface"], 0),
    ]
  },
  FastAPI: {
    Beginner: [
      q("What is FastAPI?", ["A modern, fast (high-performance), web framework for building APIs with Python", "SlowAPI", "OldAPI", "BadAPI"], 0),
      q("What is Pydantic?", ["Data validation and settings management using Python type annotations", "Pedantic", "Pythonic", "Pattern"], 0),
      q("What is Starlette?", ["Lightweight ASGI framework/toolkit", "Star", "Moon", "Sun"], 0),
      q("What is Uvicorn?", ["ASGI web server implementation", "Unicorn", "Horse", "Animal"], 0),
      q("How do you define a path parameter?", ["In the function arguments", "In the URL", "In the body", "In the header"], 0),
    ],
    Intermediate: [
      q("What is Dependency Injection in FastAPI?", ["System to declare dependencies for path operation functions", "Injecting code", "Injecting data", "Injecting styles"], 0),
      q("What is OAuth2?", ["Standard for access delegation", "Auth", "Login", "Security"], 0),
      q("What is Swagger UI?", ["Interactive API documentation", "UI", "Design", "Layout"], 0),
      q("What is Redoc?", ["Alternative API documentation", "Red", "Blue", "Green"], 0),
      q("What is a Body parameter?", ["Data sent in the request body", "Head", "Foot", "Hand"], 0),
    ],
    Advanced: [
      q("What is ASGI?", ["Asynchronous Server Gateway Interface", "Async Standard Gateway Interface", "Async Simple Gateway Interface", "Async Secure Gateway Interface"], 0),
      q("What is Background Tasks?", ["Functions to run after returning a response", "Foreground tasks", "Middle tasks", "Side tasks"], 0),
      q("What is Middleware in FastAPI?", ["Function that works with every request before it is processed", "Database", "Server", "Client"], 0),
      q("What is WebSockets?", ["Communication protocol providing full-duplex communication channels", "Sockets", "Plugs", "Wires"], 0),
      q("What is TestClient?", ["Tool for testing FastAPI applications", "Client", "User", "Tester"], 0),
    ]
  },
  MongoDB: {
    Beginner: [
      q("What is MongoDB?", ["A source-available cross-platform document-oriented database program", "SQL database", "Relational database", "Table database"], 0),
      q("What is a Document?", ["A record in a MongoDB collection", "File", "Paper", "Sheet"], 0),
      q("What is a Collection?", ["A grouping of MongoDB documents", "Table", "Row", "Column"], 0),
      q("What is BSON?", ["Binary JSON", "Best JSON", "Big JSON", "Bad JSON"], 0),
      q("What is _id?", ["Primary key for a document", "Name", "Value", "Type"], 0),
    ],
    Intermediate: [
      q("What is an Index?", ["Special data structure that stores a small portion of the collection's data set in an easy to traverse form", "List", "Table", "Book"], 0),
      q("What is Aggregation?", ["Process of data processing that returns computed results", "Sum", "Count", "Average"], 0),
      q("What is Replication?", ["Process of synchronizing data across multiple servers", "Copying", "Moving", "Deleting"], 0),
      q("What is Sharding?", ["Method for distributing data across multiple machines", "Sharing", "Splitting", "Cutting"], 0),
      q("What is Mongoose?", ["ODM library for MongoDB and Node.js", "Animal", "Bird", "Fish"], 0),
    ],
    Advanced: [
      q("What is the Aggregation Pipeline?", ["Framework for data aggregation modeled on the concept of data processing pipelines", "Pipe", "Tube", "Line"], 0),
      q("What is a Replica Set?", ["Group of mongod processes that maintain the same data set", "Set", "Group", "Team"], 0),
      q("What is a Sharded Cluster?", ["Collection of shards", "Cluster", "Group", "Team"], 0),
      q("What is GridFS?", ["Specification for storing and retrieving files that exceed the BSON-document size limit", "Grid", "File System", "Storage"], 0),
      q("What is Change Streams?", ["Access real-time data changes", "Streams", "Rivers", "Lakes"], 0),
    ]
  },
  PostgreSQL: {
    Beginner: [
      q("What is PostgreSQL?", ["A powerful, open source object-relational database system", "SQL", "NoSQL", "NewSQL"], 0),
      q("What is psql?", ["Terminal-based front-end to PostgreSQL", "SQL", "Tool", "Command"], 0),
      q("What is a Schema?", ["Namespace that contains named database objects", "Plan", "Map", "Design"], 0),
      q("What is a Table?", ["Collection of related data held in a structured format", "Chair", "Desk", "Room"], 0),
      q("What is a Row?", ["Single, implicitly structured data item in a table", "Column", "Cell", "Header"], 0),
    ],
    Intermediate: [
      q("What is JSONB?", ["Binary JSON format", "JSON", "BSON", "XML"], 0),
      q("What is a View?", ["Virtual table representing the result of a database query", "Picture", "Image", "Photo"], 0),
      q("What is an Index?", ["Enhances the speed of data retrieval", "List", "Table", "Book"], 0),
      q("What is a Trigger?", ["Function invoked automatically when an event occurs", "Button", "Switch", "Lever"], 0),
      q("What is a Stored Procedure?", ["Set of SQL statements with an assigned name", "Function", "Script", "Code"], 0),
    ],
    Advanced: [
      q("What is MVCC?", ["Multi-Version Concurrency Control", "Model View Controller Class", "Most Valuable Code Class", "Many View Control Class"], 0),
      q("What is WAL?", ["Write-Ahead Logging", "Walk", "Run", "Jump"], 0),
      q("What is Replication?", ["Copying data to another server", "Copying", "Moving", "Deleting"], 0),
      q("What is Partitioning?", ["Splitting a large table into smaller pieces", "Sharing", "Cutting", "Dividing"], 0),
      q("What is PostGIS?", ["Spatial database extender", "Map", "GPS", "Location"], 0),
    ]
  },
  Kubernetes: {
    Beginner: [
      q("What is Kubernetes?", ["Open-source system for automating deployment, scaling, and management of containerized applications", "Docker", "Container", "VM"], 0),
      q("What is a Pod?", ["Smallest deployable units of computing that you can create and manage in Kubernetes", "Container", "Node", "Cluster"], 0),
      q("What is a Node?", ["A worker machine in Kubernetes", "Pod", "Cluster", "Master"], 0),
      q("What is a Cluster?", ["Set of node machines for running containerized applications", "Group", "Team", "Set"], 0),
      q("What is kubectl?", ["Command line tool for controlling Kubernetes clusters", "Tool", "Command", "Script"], 0),
    ],
    Intermediate: [
      q("What is a Service?", ["Abstract way to expose an application running on a set of Pods", "Server", "Client", "App"], 0),
      q("What is a Deployment?", ["Provides declarative updates for Pods and ReplicaSets", "Deploy", "Install", "Run"], 0),
      q("What is a ReplicaSet?", ["Maintains a stable set of replica Pods running at any given time", "Copy", "Clone", "Duplicate"], 0),
      q("What is a Namespace?", ["Mechanism to isolate resources within a single cluster", "Name", "Space", "Room"], 0),
      q("What is a ConfigMap?", ["API object used to store non-confidential data in key-value pairs", "Config", "Map", "Data"], 0),
    ],
    Advanced: [
      q("What is Ingress?", ["API object that manages external access to the services in a cluster", "Entry", "Exit", "Door"], 0),
      q("What is a StatefulSet?", ["Manages the deployment and scaling of a set of Pods, and provides guarantees about the ordering and uniqueness of these Pods", "State", "Set", "Group"], 0),
      q("What is a DaemonSet?", ["Ensures that all (or some) Nodes run a copy of a Pod", "Daemon", "Process", "Service"], 0),
      q("What is a Job?", ["Creates one or more Pods and ensures that a specified number of them successfully terminate", "Work", "Task", "Process"], 0),
      q("What is Helm?", ["Package manager for Kubernetes", "Ship", "Boat", "Sea"], 0),
    ]
  },
  "CI/CD": {
    Beginner: [
      q("What is CI?", ["Continuous Integration", "Continuous Improvement", "Continuous Inspection", "Continuous Implementation"], 0),
      q("What is CD?", ["Continuous Delivery / Continuous Deployment", "Continuous Development", "Continuous Design", "Continuous Documentation"], 0),
      q("What is a Pipeline?", ["Set of automated processes", "Pipe", "Tube", "Line"], 0),
      q("What is a Build?", ["Process of converting source code into executable code", "Construction", "Creation", "Making"], 0),
      q("What is a Test?", ["Process of verifying that the code works as expected", "Exam", "Check", "Quiz"], 0),
    ],
    Intermediate: [
      q("What is GitHub Actions?", ["CI/CD platform that allows you to automate your build, test, and deployment pipeline", "Action", "Event", "Trigger"], 0),
      q("What is a Workflow?", ["Configurable automated process", "Work", "Flow", "Process"], 0),
      q("What is a Job?", ["Set of steps that execute on the same runner", "Task", "Work", "Process"], 0),
      q("What is a Step?", ["Individual task that can run commands or actions", "Walk", "Run", "Jump"], 0),
      q("What is a Runner?", ["Server that runs your workflows", "Person", "Machine", "Computer"], 0),
    ],
    Advanced: [
      q("What is a Secret?", ["Encrypted environment variable", "Hidden", "Private", "Confidential"], 0),
      q("What is an Artifact?", ["File or collection of files produced during a workflow run", "Item", "Object", "Thing"], 0),
      q("What is a Matrix Strategy?", ["Running jobs with different variations of variables", "Matrix", "Grid", "Table"], 0),
      q("What is a Self-hosted Runner?", ["Runner that you host and manage yourself", "Self", "Host", "Server"], 0),
      q("What is a Composite Action?", ["Action that combines multiple steps", "Compound", "Mix", "Blend"], 0),
    ]
  },
  ExpressJS: {
    Beginner: [
      q("What is Express.js?", ["Minimal and flexible Node.js web application framework", "Database", "Server", "Language"], 0),
      q("How do you create an Express app?", ["const app = express()", "new Express()", "createExpress()", "initExpress()"], 0),
      q("What is app.get()?", ["Handles GET requests", "Gets data", "Gets app", "Gets user"], 0),
      q("What is app.listen()?", ["Starts the server", "Listens to music", "Listens to user", "Listens to database"], 0),
      q("What is req?", ["Request object", "Requirement", "Request", "Require"], 0),
    ],
    Intermediate: [
      q("What is Middleware?", ["Functions that have access to the request object, the response object, and the next middleware function", "Middle", "Center", "Core"], 0),
      q("What is next()?", ["Passes control to the next middleware function", "Next page", "Next step", "Next user"], 0),
      q("What is app.use()?", ["Mounts the specified middleware function", "Uses app", "Uses data", "Uses user"], 0),
      q("What is Router?", ["Mini-application capable of performing middleware and routing functions", "Route", "Path", "Way"], 0),
      q("What is static files?", ["Files that clients download as they are", "Dynamic files", "Code files", "Data files"], 0),
    ],
    Advanced: [
      q("What is Error Handling Middleware?", ["Middleware defined with four arguments", "Error", "Mistake", "Bug"], 0),
      q("What is Template Engine?", ["Enables you to use static template files in your application", "Engine", "Motor", "Machine"], 0),
      q("What is Body Parser?", ["Middleware to parse incoming request bodies", "Parser", "Reader", "Writer"], 0),
      q("What is CORS?", ["Cross-Origin Resource Sharing", "Cross Origin Request Sharing", "Cross Origin Route Sharing", "Cross Origin Resource System"], 0),
      q("What is Helmet?", ["Middleware to help secure Express apps", "Hat", "Cap", "Protection"], 0),
    ]
  }
};

const seedData = async () => {
  if (process.argv[2] === "-d") {
    await deleteData();
    process.exit();
  }

  try {
    const count = await Theme.countDocuments();
    if (count > 0) {
      console.log("Data already exists. Use -d to delete.".yellow);
      process.exit();
    }

    console.log("Starting Seeding...".magenta);

    // 1. Create Themes
    const themesData = ["Frontend Development", "Backend Development", "Database & Cloud", "DevOps & Security", "Mobile & Frameworks"];
    const createdThemes = {};
    const topicThemeMap = {
      HTML: "Frontend Development", CSS: "Frontend Development", JavaScript: "Frontend Development", React: "Frontend Development",
      Angular: "Frontend Development", VueJS: "Frontend Development", SvelteJS: "Frontend Development", NextJS: "Frontend Development",
      "Node.js": "Backend Development", ExpressJS: "Backend Development", NestJS: "Backend Development", Java: "Backend Development",
      SpringBoot: "Backend Development", Python: "Backend Development", Django: "Backend Development", Flask: "Backend Development",
      FastAPI: "Backend Development", SQL: "Database & Cloud", MongoDB: "Database & Cloud", PostgreSQL: "Database & Cloud",
      Git: "DevOps & Security", Docker: "DevOps & Security", Kubernetes: "DevOps & Security", "CI/CD": "DevOps & Security"
    };

    for (const themeName of themesData) {
      const theme = await Theme.create({ name: themeName });
      createdThemes[themeName] = theme._id;
      console.log(`Theme created: ${themeName}`.green);
    }

    // 2. Create Quizzes & Questions
    for (const [topic, levels] of Object.entries(questionBank)) {
      const themeName = topicThemeMap[topic] || "Mobile & Frameworks";
      const themeId = createdThemes[themeName];

      for (const [level, questions] of Object.entries(levels)) {
        // Time Limit Logic
        let minSeconds, maxSeconds;
        if (level === "Beginner") {
          minSeconds = 10; maxSeconds = 20;
        } else {
          minSeconds = 5; maxSeconds = 15;
        }
        
        // Calculate average seconds per question for the quiz
        const avgSeconds = Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds;
        const timeLimit = Math.ceil((questions.length * avgSeconds) / 60);

        const quiz = await Quiz.create({
          title: `${topic} ${level}`,
          description: `Test your knowledge of ${topic} at the ${level} level.`,
          difficulty: level,
          timeLimit: Math.max(1, timeLimit), // Ensure at least 1 min
          theme: themeId,
        });

        console.log(`Quiz created: ${quiz.title} (${questions.length} Qs, ${timeLimit} mins)`.blue);

        const questionDocs = questions.map((q) => ({
          quiz: quiz._id,
          question: q.q,
          options: q.o,
        }));

        await Question.insertMany(questionDocs);
      }
    }

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Question.deleteMany();
    await Quiz.deleteMany();
    await Theme.deleteMany();
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

connectDB().then(seedData);
