const agentSelectors = document.querySelectorAll(".button-container-agent")
const apiUrl = "https://valorant-api.com/v1/agents"
const cardContainer = document.querySelector("#card-container")
agentSelectors.forEach((agentSelector) =>{
    agentSelector.addEventListener(("click"),()=>{
        cardDeleter()
        switch(agentSelector.children[0].textContent){
            case "All":
                everyAgent()
            break;
            case "Initiator":
                initiatorCreator()
            break;
            case "Duelist":
                duelistCreator()
            break;
            case "Sentinel":
                sentinelCreator()
            break;
            case "Controller":
                controllerCreator()
            break;
        }
    })
})
function everyAgent(){
    fetch(apiUrl)
    .then(result => result.json())
    .then(everyCartCreator)
}
function everyCartCreator(result){
    const datas = result["data"]
    datas.forEach((eachData)=>{
        if(eachData["isPlayableCharacter"]){
            cardCreator(eachData)
        }
    })
    return result
}
function cardCreator(eachData){
    let html = " "
    let displayName = eachData["displayName"]
    let background = eachData["backgroundGradientColors"]
    let description = eachData["description"]
    let role = eachData["role"]["displayName"]
    let roleIcon = eachData["role"]["displayIcon"]
    let heroIcon = eachData["displayIcon"]

    html = 
        `
        <div style="background: linear-gradient(45deg,#${background[0]},#${background[1]},#${background[2]},#${background[3]})" class="card">
            <div class="hero-name">${displayName}</div>
            <div class="role-name">
                Category: ${role}
                <div class="role-icon">
                    <img src="${roleIcon}" />
                </div>
            </div>
            <div class="hero-photo">
                <img src="${heroIcon}" alt="hero">
            </div>
            <div class="hero-description">${description}</div>
            <div class="abilities-container">Abilities:</div>
        </div>
        `
        cardContainer.innerHTML += html
        const abilities = document.querySelectorAll(".abilities-container")
        let abilityHtml = ` `
        eachData["abilities"].forEach((ability)=>{
            abilityHtml = 
            `
            <div class="ability">
                <div class="abilityName">${ability["displayName"]}</div>
                <div class="abilityPhoto">
                    <img src="${ability["displayIcon"]}" />
                </div>
                <div class="abilityDiscription">${ability["description"]}</div>
            </div>
            `
            abilities[abilities.length - 1].innerHTML += abilityHtml
        })
}

function cardDeleter(){
    const cards = document.querySelectorAll(".card")
    cards.forEach((card)=>card.remove())
}
function initiatorCreator(){
    fetch(apiUrl)
    .then(result => result.json())
    .then(initiatorCardCreator)
}
function initiatorCardCreator(result){
    result["data"].forEach((eachData)=>{
        if(eachData["isPlayableCharacter"]){
            if(eachData["role"]["displayName"] == "Initiator"){
                    cardCreator(eachData)
            }
        }
    })
}
function duelistCreator(){
    fetch(apiUrl)
    .then(result => result.json())
    .then(duelistCardCreator)
}
function duelistCardCreator(result){
    result["data"].forEach((eachData)=>{
        if(eachData["isPlayableCharacter"]){
            if(eachData["role"]["displayName"] == "Duelist"){
                    cardCreator(eachData)
            }
        }
    })
}
function sentinelCreator(){
    fetch(apiUrl)
    .then(result => result.json())
    .then(sentinelCardCreator)
}
function sentinelCardCreator(result){
    result["data"].forEach((eachData)=>{
        if(eachData["isPlayableCharacter"]){
            if(eachData["role"]["displayName"] == "Sentinel"){
                    cardCreator(eachData)
            }
        }
    })
}
function controllerCreator(){
    fetch(apiUrl)
    .then(result => result.json())
    .then(controllerCardCreator)
}
function controllerCardCreator(result){
    result["data"].forEach((eachData)=>{
        if(eachData["isPlayableCharacter"]){
            if(eachData["role"]["displayName"] == "Controller"){
                    cardCreator(eachData)
            }
        }
    })
}
