"use strict";
const url = "./quizz.json"

const allemagne = document.querySelector('#al')
const italie = document.querySelector('#it')
const france = document.querySelector('#fr')
const espagne = document.querySelector('#es')
const paysBas = document.querySelector('#pb')
const royUni = document.querySelector('#gb')

allemagne.addEventListener('click', ()=>
{
    // fetch(url).then(all)
  
})
fetch(url).then(handleFetch)

function handleFetch(responseText) 
{
    console.log(responseText);    
    if(responseText.ok)
    {
        responseText.json()
            .then(quizz)
            .catch(error=>console.log(error))
    }
    else{
        console.log(responseText.statusText);
    }
}
let quizzID;
let bonneReponse = 0
let mauvaiseReponse = 0
let nbReponse = 0
let idPrecQuest=[];
const question = document.querySelector('.question')
const propal = document.querySelector('.propositions')
function quizz(data)
{
    quizzID = Math.floor(Math.random() * 10)
    idPrecQuest.push(quizzID);
    createQ(data)
}
function createQ(data){
    const rep = data.quizz.fr.débutant[quizzID].réponse
    const quest = document.createElement('p')
    quest.textContent = data.quizz.fr.débutant[quizzID].question
    question.append(quest)
    for(let i = 0; i<data.quizz.fr.débutant[quizzID].propositions.length; i++)
    {
        const p = document.createElement('p') 
        const prop = document.createElement('div')
        p.textContent = data.quizz.fr.débutant[quizzID].propositions[i]
        prop.append(p)
        prop.classList.add(`prop${i+1}`)
        propal.append(prop)
    }
    function result(e){
        if(e.target.textContent == rep)
        {
            propal.removeEventListener('click',result)  
            question.innerHTML = ""
            propal.innerHTML = ""
            fetch(url).then(handleFetch)
            bRep();
            console.log(bonneReponse+"bon");
        }else{
            propal.removeEventListener('click',result)  
            question.innerHTML = ""
            propal.innerHTML = ""
            fetch(url).then(handleFetch)
            mRep();
            console.log(mauvaiseReponse+"erreurs");
        }
      }
  propal.addEventListener('click',result) 
}
function bRep()
{
    const bon = document.querySelector('.bRep');
    bonneReponse++
    nbReponse++
    winOrLose(nbReponse)
    bon.textContent = bonneReponse + " Bonnes réponses ";
}
function mRep()
{
    const mauvais = document.querySelector('.mRep');
    mauvaiseReponse++
    nbReponse++
    winOrLose(nbReponse)
    mauvais.textContent = mauvaiseReponse + " Mauvaises réponses ";
}

function winOrLose(nbReponse) {
    console.log(nbReponse);
    if(nbReponse == 10)
    {
        if (bonneReponse == 10)
        console.log("Parfait ! " + bonneReponse + " / " + nbReponse);
        else if (bonneReponse >= 6 && bonneReponse <= 9)
        console.log("Pas Mal ! " + bonneReponse + " / " + nbReponse);
        else if (bonneReponse == 4 || bonneReponse == 5)
        console.log("Moyen ! " + bonneReponse + " / " + nbReponse);
        else if(bonneReponse <=3)
        console.log("Médiocre ! " + bonneReponse + " / " + nbReponse);
    }
}
function verifQ(){
    
    for(let i = 0; i<idPrecQuest.length; i++){
        if (quizzID !== idPrecQuest[i])
        fetch(url).then(handleFetch)
        else 
        verifQ();
    }
}