const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");


start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); 
}


exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
}


continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz"); 
    showQuetions(0); 
    queCounter(1); 
    startTimer(15); 
    startTimerLine(0); 
}

let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");


restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); 
    result_box.classList.remove("activeResult"); 
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); 
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue); 
    startTimerLine(widthValue); 
    timeText.textContent = "Tiempo Restante"; 
    next_btn.classList.remove("show"); 
}


quit_quiz.onclick = ()=>{
    window.location.reload(); 
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");


next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++; 
        que_numb++; 
        showQuetions(que_count);
        queCounter(que_numb); 
        clearInterval(counter); 
        clearInterval(counterLine); 
        startTimer(timeValue); 
        startTimerLine(widthValue); 
        timeText.textContent = "Tiempo"; 
        next_btn.classList.remove("show"); 
    }else{
        clearInterval(counter); 
        clearInterval(counterLine); 
        showResult(); 
    }
}


//Trae las preguntas y las opciones de la variable.
function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    //Crea un nuevo span y un div para pregunta y opción y pasa el valor usando la variable index.
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //Añade un nuevo span dentro de que_tag.
    option_list.innerHTML = option_tag; //Añade un nuevo div dentro de option_tag.
    
    const option = option_list.querySelectorAll(".option");

    //Se le agrega el atributo onclick a todas las opciones disponibles.
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
//crea el nuevo tag de div para icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//si el usuario clickea en opción
function optionSelected(answer){
    clearInterval(counter); //limpia el contador
    clearInterval(counterLine); //limpia el counterLine
    let userAns = answer.textContent; //obtiene la opción seleccionada por el usuario
    let correcAns = questions[que_count].answer; //obtioene la respuesta correcta de la variable
    const allOptions = option_list.children.length; //obtiene todas las opciones
    
    if(userAns == correcAns){ //si la respuesta seleccionada del usuario es igual a la respuesta correcta de la variable
        userScore += 1; //se suma 1 al valor del puntaje
        answer.classList.add("correct"); //agrega color verde a la respuesta correcta seleccionada
        answer.insertAdjacentHTML("beforeend", tickIconTag); //agrega el icon de tick a la respuesta correcta seleccionada
        console.log("Respuesta Correcta");
        console.log("Tus Respuestas Correctas = " + userScore);
    }else{
        answer.classList.add("incorrect"); //agrega color rojo a la respuesta correcta seleccionada
        answer.insertAdjacentHTML("beforeend", crossIconTag); //agrega el icon de cruz a la respuesta correcta seleccionada
        console.log("Respuesta Equivocada");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){  //si hay una opcion que coincide con la respuesta de la variable
                option_list.children[i].setAttribute("class", "option correct"); //agrega color verde a la respuesta que coincide
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //agrega el icon de ick a la respuesta que coincide
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //una vez que el usuario selecciona una opción entonces se deshabilitan todas las opciones
    }
    next_btn.classList.add("show"); //muestra el botón de siguiente pregunta si el usuario seleccionó alguna opción
}

function showResult(){
    info_box.classList.remove("activeInfo"); //esconde el info box
    quiz_box.classList.remove("activeQuiz"); //esconde el quiz box
    result_box.classList.add("activeResult"); //muestra el box de resultado
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3){ //si el usuario hizo más de 3 puntos
        //crea un nuevo tag de span y pasa número del puntaje del usuario y el número total de pregunta
        let scoreTag = '<span>¡Felicitaciones!, has obtenido <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;//añade un nuevo tag de span dentro de socre_text
    }
    else if(userScore > 1){ //si el usuario hizo más de 1 punto
        let scoreTag = '<span>¡Muy bien!, has obtenido <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ //si el usuario hizo menos de 1 punto
        let scoreTag = '<span>¡Uh! ¡Qué mal!, solo obtuviste <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //cambia el valor del timeCount con el valor del tiempo
        time--; //decrece el valor del tiempo
        if(time < 9){ //si el tiempo es menos de 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //añade un 0 antes del valor de tiempo
        }
        if(time < 0){ //si el tiempo es menos de 0
            clearInterval(counter); //limpia el contador
            timeText.textContent = "Tiempo Terminado"; //cambia el texto de tiempo a tiempo terminado
            const allOptions = option_list.children.length; //obtiene todas las opciones
            let correcAns = questions[que_count].answer; //obtiene todas las respuestas correctas de la variable
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //si hay una opcion que coincide con la respuesta de la variable
                    option_list.children[i].setAttribute("class", "option correct"); //añade el color verde a la opción que coincide
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //añade el icon de tick a la opción que coincide
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); // una vez el usuario selecciona una opción se deshabilitan todas las opciones
            }
            next_btn.classList.add("show"); //muestra el botón de siguiente pregunta si el usuario seleccionó alguna opción
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //suma 1 al valor del tiempo
        time_line.style.width = time + "px"; //incrementa el width de time_line con px por el valor del tiempo
        if(time > 549){ //si el valor del tiempo es mayor que 549
            clearInterval(counterLine); //limpia el counterLine
        }
    }
}

function queCounter(index){
    //crea un nuevo tag de span y pasa el número de la pregunta y el total de pregunta
    let totalQueCounTag = '<span><p>'+ index +'</p> de <p>'+ questions.length +'</p> Preguntas</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //añade un nuevo tag de span dentro de bottom_ques_counter
}