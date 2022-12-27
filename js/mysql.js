var request = window.indexedDB.open("preguntasDB", 1) 
var db;

request.onsuccess = function(event) {
    db = event.target.result
    loadQuestion(db)
}
request.onupgradeneeded = function(event){
    db = event.target.result;
    db.createObjectStore("preguntas", { keyPath : "id" });    
}

var questionText = document.getElementById("¿En qué año se formó el grupo?")
var opt1 = document.getElementById('2015')
var opt2 = document.getElementById('2018')
var opt3 = document.getElementById('2019')
var answer = document.getElementById('2016')

var questionText1 = document.getElementById("¿Cuántas miembros tiene el grupo?")
var opt1 = document.getElementById('10')
var opt2 = document.getElementById('11')
var opt3 = document.getElementById('12')
var answer = document.getElementById('13')

var questionText2 = document.getElementById("¿En qué año tuvieron su first win?")
var opt1 = document.getElementById('2019')
var opt2 = document.getElementById('2020')
var opt3 = document.getElementById('2017')
var answer = document.getElementById('2018')

var questionText3 = document.getElementById("¿Cuántas subunidades tiene el grupo?")
var opt1 = document.getElementById('3')
var opt2 = document.getElementById('1')
var opt3 = document.getElementById('Ninguna')
var answer = document.getElementById('2')

var questionText4 = document.getElementById("¿Quién es la líder del grupo?")
var opt1 = document.getElementById('Seola')
var opt2 = document.getElementById('Bona')
var opt3 = document.getElementById('Xuan Yi')
var answer = document.getElementById('Exy')

var ListaPreguntas

function addQuestionHandler(){
    vQuestion = {
        id:(questionText.value).replace(/\s/g,''),
        q:questionText.value,
        options: [opt1.value, opt2.value, opt3.value, opt4.value],
        answer:answer.value
    }
    addQuestion(vQuestion)
    location.reload()
}