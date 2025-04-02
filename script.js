const questions = [
    {
        question: "Which planet is known as the 'Red Planet'?",
        options: ["Venus", "Earth", "Mars", "Jupiter"],
        answer: "Mars",
        hint: "It's named after the Roman god of war."
    },
    {
        question: "What is the capital city of Japan?",
        options: ["Seoul", "Tokyo", "Beijing", "Bangkok"],
        answer: "Tokyo",
        hint: "It's also known for its cherry blossoms."
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Diamond", "Platinum", "Iron"],
        answer: "Diamond",
        hint: "It's often used in jewelry and cutting tools."
    },
    {
        question: "Which famous artist painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        answer: "Leonardo da Vinci",
        hint: "He was also an inventor and scientist."
    },
    {
        question: "What is the largest continent on Earth?",
        options: ["Africa", "Asia", "North America", "Antarctica"],
        answer: "Asia",
        hint: "It is home to the most populous country."
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "Thailand", "South Korea"],
        answer: "Japan",
        hint: "It has a famous city called Kyoto."
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
        answer: "Blue Whale",
        hint: "It can weigh as much as 30 elephants!"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options");
const scoreText = document.getElementById("score-text");
const hintButton = document.getElementById("hint-button");
const hintText = document.getElementById("hint-text");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    // Show the hint button and text for each question
    hintButton.style.display = "inline-block";
    hintText.style.display = "none"; // Hide the hint text at the beginning

    // Slide out the current question and options before changing content
    questionText.style.animation = "slideOut 0.5s ease-in-out forwards";
    document.querySelectorAll(".option").forEach((btn) => {
        btn.style.animation = "sweepOut 0.5s ease-in-out forwards";
    });

    setTimeout(() => {
        // Change question after animation completes
        questionText.textContent = currentQuestion.question;
        questionText.style.animation = "slideIn 0.5s ease-in-out forwards";

        // Clear previous options
        optionsContainer.innerHTML = "";

        // Clear previous hints
        hintText.textContent = "";

        // Generate new option buttons dynamically
        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("option");

            // Trigger sweep-in animation
            button.style.animation = `sweepIn 0.5s ease-in-out forwards`;
            button.style.animationDelay = `${0.2 * index}s`;

            button.addEventListener("click", () => checkAnswer(button, currentQuestion.answer));
            optionsContainer.appendChild(button);
        });
    }, 500); // Matches slideOut duration
}

function checkAnswer(selectedButton, correctAnswer) {
    const allOptions = document.querySelectorAll(".option");

    allOptions.forEach(button => button.disabled = true);

    if (selectedButton.textContent === correctAnswer) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    scoreText.textContent = `Your Score : ${score} / ${questions.length}`;

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            // Quiz completed, hide hint button and text
            hintButton.style.display = "none";
            hintText.style.display = "none";

            questionText.textContent = `Quiz Completed! 🎉`;
            optionsContainer.innerHTML = "";
            scoreText.textContent = `Your Score : ${score} / ${questions.length}`;
            let message;
            if (score === questions.length) {
                message = "Excellent job! 🌟 You're a quiz master!";
                triggerConfetti();  // Start confetti effect here
            } else if (score >= questions.length / 2) {
                message = "Good effort! 👍 Keep it up!";
            } else {
                message = "Better luck next time! 😊 Don't give up!";
            }
            const messageElement = document.createElement("div");
            messageElement.textContent = message;
            optionsContainer.appendChild(messageElement);

            showRestartButton();
        }
    }, 2000);
}

function showRestartButton() {
    const restartButton = document.createElement("button");
    restartButton.textContent = "Restart Quiz";
    restartButton.classList.add("restart-button");
    restartButton.addEventListener("click", restartQuiz);
    optionsContainer.appendChild(restartButton);
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreText.textContent = `Your Score: ${score} / ${questions.length}`;
    loadQuestion();
}

hintButton.addEventListener("click", () => {
    const currentQuestion = questions[currentQuestionIndex];
    hintText.textContent = currentQuestion.hint;
    hintText.style.display = "block";  // Show the hint text when the button is clicked
});

loadQuestion(); // Initialize the first question

// Function to trigger a more intense confetti effect three times
function triggerConfetti() {
    let confettiCount = 0;

    const interval = setInterval(() => {
        confetti({
            particleCount: 300,  // Increase the number of confetti particles
            angle: 90,           // Confetti burst direction (horizontal)
            spread: 90,          // Make the confetti spread wide
            origin: { x: 0.5, y: 0.5 },  // Start from the center of the screen
            shapes: ['circle', 'square'],
            colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],  // Multi-color confetti
            scalar: 1.2          // Increase the size of the particles
        });

        confettiCount++;

        // Stop after 3 bursts
        if (confettiCount >= 3) {
            clearInterval(interval);
        }
    }, 1000);  // Trigger confetti every 1 second
}

