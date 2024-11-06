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
// Array para las preguntas del trivial
const quests = [
    new Question("¿Qué Pokémon es tipo fuego?", ["Bulbasaur", "Squirtle", "Charmander", "Pikachu"], 2),
    new Question("¿Qué Pokémon pertenece a la región de Sinnoh?", ["Zubat", "Poliwag", "Piplup", "Charmander"], 2)
];

// Este es el container base donde acoplare todas las preguntas
const quizContainer = document.getElementById("quiz-container");

//#endregion

// Esta funcion me permite mantener la linea de ejecucion clara y limpia
function InitialCall()
{
    //#region INPUTS

    const btnCheckAnswers = document.getElementById("btnCheckAnswers");
    const rbtnAnswerList = document.querySelectorAll(".rbtnAnswer");
    
    //#endregion

    // Aqui vinculo los inputs con sus funciones
    document.addEventListener("DOMContentLoaded", () =>
    {
        btnCheckAnswers.addEventListener("click", checkAnswers);
        rbtnAnswerList.forEach(button => {
            button.addEventListener("click", displayAlert);
        });
    });

    //#region EXECUTION LINE

    generateQuestionnaire();

    //#endregion

}

//#region FUNCTIONS
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
        const selectedAnswer = Array.from(answers).find(answer => answer.checked)?.value;

        console.log(quest.isCorrectAnswer(Number(selectedAnswer)));
        
    });
}

let displayAlert = (event) =>
{
    alert(event.target.name + " -- " + event.target.value);
}

//#endregion

InitialCall();

