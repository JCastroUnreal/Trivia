InitialCall();

function InitialCall()
{
    //#region INPUTS

    const btnCheckAnswers = document.getElementById("btnCheckAnswers");
    const rbtnAnswerList = document.querySelectorAll(".rbtnAnswer");
    
    //#endregion


    document.addEventListener("DOMContentLoaded", () =>
    {
        btnCheckAnswers.addEventListener("click", checkAnswers);
        rbtnAnswerList.forEach(button => {
            button.addEventListener("click", displayAlert);
        });
    });
}

//#region CONST


//#endregion

//#region FUNCTIONS

let checkAnswers = () =>
{
    console.log("REVISANDO");
}

let displayAlert = (event) =>
{
    alert(event.target.name + " -- " + event.target.value);
}

//#endregion


