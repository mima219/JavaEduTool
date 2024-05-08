/*
    author: Michaela Jalakšová
    date: May 2024
    description: question for the Common vulnerabilities test
*/

let commonData = [
    {
        number: 1,
        question: "What is one of the most common vulnerabilities in Java applications?",
        answer: "Cross-site scripting (XSS)",
        options: [
            "Buffer overflow",
            "Cross-site scripting (XSS)",
            "Integer overflow",
            "I don't wish to answer"
        ],
        why: "Cross-site scripting (XSS) is a prevalent vulnerability in Java applications, allowing attackers to inject malicious scripts into web pages viewed by other users.",
    },
    {
        number: 2,
        question: "What type of attack is SQL injection?",
        answer: "Injection attack",
        options: [
            "Denial-of-service attack",
            "Authentication bypass",
            "Injection attack",
            "I don't wish to answer"
        ],
        why: "SQL injection involves exploiting vulnerabilities in software by injecting malicious SQL queries into input fields, which can manipulate the database.",
    },
    {
        number: 3,
        question: "What is a primary method to prevent SQL injection?",
        answer: "Parameterized queries and prepared statements",
        options: [
            "Using dynamic SQL queries",
            "Parameterized queries and prepared statements",
            "Implementing client-side validation only",
            "I don't wish to answer"
        ],
        why: "Parameterized queries and prepared statements help prevent SQL injection by separating SQL logic from user input, making it harder for attackers to inject malicious code.",
    },
    {
        number: 4,
        question: "What are the primary types of cross-site scripting (XSS)?",
        answer: "Reflected, stored, and DOM-based",
        options: [
            "Reflected, stored, and DOM-based",
            "Buffer overflow and integer overflow",
            "Persistent and non-persistent",
            "I don't wish to answer"
        ],
        why: "The primary types of XSS include reflected, stored, and DOM-based, each with its own method of attack.",
    },
    {
        number: 5,
        question: "How can XSS attacks be mitigated?",
        answer: " Filtering input and escaping dynamic content",
        options: [
            "By allowing all HTML tags in user input",
            " Using strict input validation only",
            " Filtering input and escaping dynamic content",
            "I don't wish to answer"
        ],
        why: "Mitigating XSS attacks involves filtering user input and escaping dynamic content to prevent malicious scripts from executing in web applications.",
    },
    {
        number: 6,
        question: "What is a characteristic of DOM-based XSS attacks?",
        answer: "They occur on the client-side and involve modifying the DOM",
        options: [
            "They involve injecting malicious scripts into server-side code",
            "They occur when an attacker observes their success based on the app’s response",
            "They occur on the client-side and involve modifying the DOM",
            "I don't wish to answer"
        ],
        why: "DOM-based XSS attacks manipulate the Document Object Model (DOM) on the client-side without involving server-side code execution.",
    },
    {
        number: 7,
        question: "Type of SQL injection attack that occurs when an attacker observes the success of their attack based on the app’s response?",
        answer: "Blind SQL injection",
        options: [
            "Union-based injection",
            "Error-based injection",
            "Blind SQL injection",
            "I don't wish to answer"
        ],
        why: "Blind SQL injection attacks work by guessing success based on application responses, making them stealthier than other types of attacks.",
    },
    {
        number: 8,
        question: "What distinguishes stored XSS attacks from other types of XSS attacks?",
        answer: "Malicious scripts are injected into the application and stored on the server",
        options: [
            "They occur solely on the client-side",
            "Malicious scripts are injected into the application and stored on the server",
            "They exploit vulnerabilities in web server configurations",
            "I don't wish to answer"
        ],
        why: "Stored XSS attacks involve injecting malicious scripts into the application, which are then stored on the server and executed whenever accessed by users.",
    },
    {
        number: 9,
        question: "What is the primary risk associated with insecure deserialization in Java applications?",
        answer: "Remote code execution",
        options: [
            "Remote code execution",
            "Cross-site scripting (XSS)",
            "Denial of Service (DoS) attacks",
            "I don't wish to answer"
        ],
        why: "Insecure deserialization can lead to remote code execution, allowing attackers to execute arbitrary code on the server.",
    },
    {
        number: 10,
        question: "How can we mitigate the risk of insecure deserialization in Java?",
        answer: "Whitelisting allowed classes for deserialization",
        options: [
            "Implementing server-side validation only",
            "Using dynamic instantiation for deserialization",
            "Whitelisting allowed classes for deserialization",
            "I don't wish to answer"
        ],
        why: "Whitelisting allowed classes for deserialization helps prevent unauthorized classes from being deserialized, reducing the risk of exploitation.",
    },
    {
        number: 11,
        question: "What is the primary risk associated with unsafe use of reflection in Java?",
        answer: "Unauthorized access to sensitive code",
        options: [
            "Buffer overflow",
            "Unauthorized access to sensitive code",
            "Data leakage",
            "I don't wish to answer"
        ],
        why: "Unsafe use of reflection can allow attackers to gain unauthorized access to sensitive code, potentially compromising the security of the application.",
    },
    {
        number: 12,
        question: "What is Cross-Site Request Forgery (CSRF)?",
        answer: "A vulnerability that tricks users into executing unwanted actions",
        options: [
            "A type of XSS attack",
            "A technique used to steal cookies",
            "A vulnerability that tricks users into executing unwanted actions",
            "I don't wish to answer"
        ],
        why: "CSRF involves tricking authenticated users into unknowingly performing actions they did not intend, often by exploiting the trust between a user and a website.",
    },
    {
        number: 13,
        question: "How can developers prevent CSRF attacks when designing web applications?",
        answer: "By implementing CSRF token-based mitigation techniques",
        options: [
            "By relying solely on HTTPS for secure communication",
            "By validating the Referrer Header in incoming requests",
            "By implementing CSRF token-based mitigation techniques",
            "I don't wish to answer"
        ],
        why: "CSRF token-based mitigation techniques, such as synchronizer tokens or Double-Submit Cookies, are effective measures for preventing CSRF attacks in web applications.",
    },
    {
        number: 14,
        question: "What is the main advantage of using token-based CSRF mitigation techniques?",
        answer: "They prevent attackers from forging legitimate requests by requiring unique tokens",
        options: [
            "They allow developers to avoid implementing input validation",
            "They eliminate the need for HTTPS encryption",
            "They prevent attackers from forging legitimate requests by requiring unique tokens",
            "I don't wish to answer"
        ],
        why: "Token-based mitigation techniques require attackers to possess valid tokens to execute forged requests, effectively preventing CSRF attacks.",
    },
    {
        number: 15,
        question: "Which HTTP methods are typically exploited in CSRF attacks?",
        answer: "POST, PUT, DELETE",
        options: [
            "GET, HEAD, OPTIONS",
            "TRACE, CONNECT, PATCH",
            "POST, PUT, DELETE",
            "I don't wish to answer"
        ],
        why: "CSRF attacks typically exploit HTTP methods that alter server state, such as POST, PUT, and DELETE, allowing attackers to execute unauthorized actions on behalf of authenticated users.",
    },
];