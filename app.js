//#region CLASS
// Clase base para la pregunta, pide una pregunta, 4 respuestas y seleccionar cual es la correcta
class Question
{
    constructor(questText, answers, correctAnswer)
    {
        this.questText = questText;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    isCorrectAnswer(index)
    {
        return index === this.correctAnswer;
    }
}

//#endregion

//#region CONST

// Screens
const mainScreen = document.getElementById("mainScreen");
const welcomeScreen = document.getElementById("welcomeScreen");
const triviaScreen = document.getElementById("triviaScreen");

// Array para las preguntas del trivial
const quests = [
    new Question("¿Qué Pokémon es tipo fuego?", ["Bulbasaur", "Squirtle", "Charmander", "Pikachu"], 2),
    new Question("¿Qué Pokémon pertenece a la región de Sinnoh?", ["Zubat", "Poliwag", "Piplup", "Charmander"], 2),
    new Question("¿Qué Pokémon se puede tomar la forma de otros?", ["Mewtwo", "Snivy", "Eevee", "Ditto"], 3)
];

// Este es el container base donde acoplare todas las preguntas
const quizContainer = document.getElementById("quizContainer");

//#endregion

//#region LET
let answersCorrect = 0;
let answersIncorrect = 0;
let unanswered = 0;
//#endregion

// Esta funcion me permite mantener la linea de ejecucion clara y limpia
function InitialCall()
{
    //#region INPUTS
    const txtPlayerName = document.getElementById("txtPlayerName");
    const btnSetPlayerName = document.getElementById("btnSetPlayerName");
    
    const welcomeMessage = document.getElementById("welcomeMessage");

    const btnCheckAnswers = document.getElementById("btnCheckAnswers");
    const rbtnAnswerList = document.querySelectorAll(".rbtnAnswer");
    const btnReplay = document.getElementById("btnReplay");
    
    //#endregion

    // Aqui vinculo los inputs con sus funciones
    document.addEventListener("DOMContentLoaded", () =>
    {
        btnSetPlayerName.addEventListener("click", startWelcome)

        btnCheckAnswers.addEventListener("click", checkAnswers);
        rbtnAnswerList.forEach(button => {
            button.addEventListener("click", displayAlert);
        });

        btnReplay.addEventListener("click", replayGame);
    });

    //#region EXECUTION LINE

    //mainScreen.style.display = "flex";
    //mainScreen.classList.add("fade-in");

    generateQuestionnaire();

    //#endregion

}

//#region FUNCTIONS
let startWelcome = () =>
{
    console.log(txtPlayerName.value);

    if (txtPlayerName.value) {
        // Oculto la pantalla principal
        mainScreen.classList.add("fade-out");

        // Este time out es para controlar el fade-out de la pantalla principal
        setTimeout(() => {
            mainScreen.style.display = "none";

            welcomeScreen.style.display = "flex";

            // Este time out es para controlar la entrada de la pantalla de bienvenida
            setTimeout(() => {
                welcomeScreen.classList.add("fade-in");
                welcomeMessage.textContent += " "+(txtPlayerName.value).toUpperCase();

                // Este time out es para controlar el incio de la animacion de fade-out de la pantalla de bienvenida
                setTimeout(() => {
                    welcomeScreen.classList.add("fade-out");

                    setTimeout(() => {
                        welcomeScreen.style.display = "none";

                        triviaScreen.style.display = "flex";
                    }, 500);
                }, 3000)

            }, 500)
        }, 500);

        // Muestro la pantalla de bienvenida
        

    } else {
        alert("Necesitas un nombre de usuario.")
    }


}

// Esta funcion me permite generar las preguntas segun la cantidad de preguntas tenga en el array
let generateQuestionnaire = () =>
{
    quests.forEach((quest, index) => {
        // Creo el contenedor
        const questionContainer = document.createElement("div");
        questionContainer.classList.add("question-container");

        // Creo el texto de la pregunta
        const questionText = document.createElement("p");
        questionText.textContent = quest.questText;
        questionContainer.appendChild(questionText);

        // Creo el contenedor para las respuestas
        const answerContainer = document.createElement("div");
        answerContainer.classList.add("answers-container");
        questionContainer.appendChild(answerContainer);

        // Por cada respuesta del array de respuestas dentro de cada objeto creo los siguientes componentes
        quest.answers.forEach((answer, i) => {
            // Creo la laber contenedora de la respuesta
            const answerLabel = document.createElement("label");
            answerContainer.appendChild(answerLabel);

            // Creo el radio button de la respuesta
            const answerRBtn = document.createElement("input");
            answerRBtn.type = "radio";
            answerRBtn.name = `question_${index}`;
            answerRBtn.value = i;
            answerRBtn.class = "rbtnAnswer";
            answerLabel.appendChild(answerRBtn);

            // Creo el texto de la pregunta
            answerLabel.append(`${answer}`);
        });
        
        quizContainer.appendChild(questionContainer);
    });
}

let checkAnswers = () =>
{
    quests.forEach((quest, index) => {
        const answers = document.querySelectorAll(`input[name=question_${index}]`);
        const selectedAnswer = Array.from(answers).find(answer => answer.checked);

        if (selectedAnswer) 
        {
            selectedAnswer.style.accentColor = quest.isCorrectAnswer(Number(selectedAnswer?.value)) ? "green" : "red";
            if (quest.isCorrectAnswer(Number(selectedAnswer?.value))) 
                { 
                    answersCorrect++; 
                } else { 
                    answersIncorrect++; 
                }

        } else {
            unanswered++;
        }
    });

    displayResult();
}

let displayAlert = (event) =>
{
    alert(event.target.name + " -- " + event.target.value);
}

let displayResult = () => 
{
    console.log("Correct answers", answersCorrect, "| Incorrect answers", answersIncorrect, "| Unanswered", unanswered);

    answersCorrect = 0;
    answersIncorrect = 0;
    unanswered = 0;
}

let replayGame = () => 
{
    quests.forEach((quest, index) => {
        const answers = document.querySelectorAll(`input[name=question_${index}]`);
        const selectedAnswer = Array.from(answers).find(answer => answer.checked);

        if (selectedAnswer)
        {
            selectedAnswer.checked = false;
            selectedAnswer.style.accentColor = "";
        }

        triviaScreen.style.display = "none";

        mainScreen.style.display = "flex";
        mainScreen.classList.add("fade-in");

    });
}

//#endregion

InitialCall();

