const gunSelectors = document.querySelectorAll(".button-container-gun")
const apiUrl = "https://valorant-api.com/v1/weapons"
const cardContainer = document.querySelector("#card-container")
gunSelectors.forEach((gunSelector) =>{
    gunSelector.addEventListener(("click"),()=>{
        cardDeleter()
        switch(gunSelector.children[0].textContent){
            case "All":
                everyGun()
            break;
            case "Melee":
                maleeCreator()
            break;
            case "Pistols":
                pistolCreator()
            break;
            case "SMGs":
                SMGCreator()
            break;
            case "Shotguns":
                shotgunsCreator()
            break;
            case "Rifles":
                riflesCreator()
            break;
            case "Snipers Rifles":
                sniperRiflesCreator()
            break;
            case "Heavy Weapons":
                heavyWeaponsCreator()
            break;
        }
    })
})

function everyGun(){
    fetch(apiUrl)
    .then(result => result.json())
    .then(everyCartCreator)
    .then(skinCallFunc)
}
function everyCartCreator(result){
    const datas = result["data"].reverse()
    datas.forEach((eachData)=>{
        cardCreator(eachData)
    })
    return result
}
function cardCreator(eachData){
    let html = " "
    let displayName = eachData["displayName"]
    let photo = eachData["displayIcon"]
    if(displayName == "Melee"){
        let catagory = "Melee"
        html = 
        `
        <div class="card">
            <div class="gun-name">${displayName}</div>
            <div class="catagory-name">Category: ${catagory}</div>
            <div class="gun-photo">
                <img src=${photo} alt="gun">
            </div>
            <div class="skins-button">
                <div class="skins-button-text">Skins</div>
            </div>
        </div>
        `
        cardContainer.innerHTML += html
    }
    else{
        let category = eachData["shopData"]["category"]
        let cost = eachData["shopData"]["cost"]
        let fireRate = eachData["weaponStats"]["fireRate"]
        let firstBulletAccuracy = eachData["weaponStats"]["firstBulletAccuracy"]
        let magazineSize = eachData["weaponStats"]["magazineSize"]
        let reloadTimeSeconds = eachData["weaponStats"]["reloadTimeSeconds"]

        html = 
        `
        <div class="card">
            <div class="gun-name">${displayName}</div>
            <div class="catagory-name">Category: ${category}</div>
            <div class="gun-photo">
                <img src="${photo}" alt="gun">
            </div>
            <div class="gun-properties">
                <div class="cost">Cost: ${cost}</div>
                <div class="fireRate">Fire Rate: ${fireRate}</div>
                <div class="magazineSize">Magazine Size: ${magazineSize}</div>
                <div class="ReloadTimeSeconds">Reload Time: ${reloadTimeSeconds}sec</div>
                <div class="firstBulletAccuracy">First Bullet Accuracy: ${firstBulletAccuracy}</div>
                <div class="damageRanges"></div>
            </div>
            <div class="skins-button">
                <div class="skins-button-text">Skins</div>
            </div>
        </div>
        `
        cardContainer.innerHTML += html
        const damageRanges = document.querySelectorAll(".damageRanges")
        let range = ``
        eachData["weaponStats"]["damageRanges"].forEach((ranges)=>{
            range = 
            `
            <div class="range">
                <div class="start-end">${ranges["rangeStartMeters"]}-${ranges["rangeEndMeters"]} Meters</div>
                <div class="head-damage">Head: ${Math.round(ranges["headDamage"])}</div>
                <div class="body-damage">Body: ${Math.round(ranges["bodyDamage"])}</div>
                <div class="leg-damage">Leg: ${Math.round(ranges["legDamage"])}</div>
            </div>
            `
            damageRanges[damageRanges.length - 1].innerHTML += range
        })
    }
}
function cardDeleter(){
    const cards = document.querySelectorAll(".card")
    cards.forEach((card)=>card.remove())
}
function maleeCreator(){
    let html = " "
    let displayName = "Melee"
    let photo = "https://media.valorant-api.com/weapons/2f59173c-4bed-b6c3-2191-dea9b58be9c7/displayicon.png"
    html = 
    `
    <div class="card">
        <div class="gun-name">${displayName}</div>
        <div class="catagory-name">Category: ${displayName}</div>
        <div class="gun-photo">
            <img src=${photo} alt="gun">
        </div>
        <div class="skins-button">
            <div class="skins-button-text">Skins</div>
        </div>
    </div>
    `
    cardContainer.innerHTML += html
    fetch(apiUrl)
    .then(result => result.json())
    .then(skinCallFunc) 

}
function pistolCreator(){
    fetch(apiUrl)
    .then(result => result.json())
    .then(pistolDetector)
    .then(skinCallFunc)
}
function pistolDetector(result){
    let html = ""
    result["data"].forEach((eachData)=>{
        if(eachData["displayName"] !== "Melee"){
            if(eachData["shopData"]["category"] == "Pistols"){
                creator(eachData,html)
            }
        }
    })
    return result
}
function creator(eachData,html){
        let displayName = eachData["displayName"]
        let photo = eachData["displayIcon"]
        let category = eachData["shopData"]["category"]
        let cost = eachData["shopData"]["cost"]
        let fireRate = eachData["weaponStats"]["fireRate"]
        let firstBulletAccuracy = eachData["weaponStats"]["firstBulletAccuracy"]
        let magazineSize = eachData["weaponStats"]["magazineSize"]
        let reloadTimeSeconds = eachData["weaponStats"]["reloadTimeSeconds"]

        html = 
        `
        <div class="card">
            <div class="gun-name">${displayName}</div>
            <div class="catagory-name">Category: ${category}</div>
            <div class="gun-photo">
                <img src="${photo}" alt="gun">
            </div>
            <div class="gun-properties">
                <div class="cost">Cost: ${cost}</div>
                <div class="fireRate">Fire Rate: ${fireRate}</div>
                <div class="magazineSize">Magazine Size: ${magazineSize}</div>
                <div class="ReloadTimeSeconds">Reload Time: ${reloadTimeSeconds}sec</div>
                <div class="firstBulletAccuracy">First Bullet Accuracy: ${firstBulletAccuracy}</div>
                <div class="damageRanges"></div>
            </div>
            <div class="skins-button">
                <div class="skins-button-text">Skins</div>
            </div>
        </div>
        `
        cardContainer.innerHTML += html
        const damageRanges = document.querySelectorAll(".damageRanges")
        let range = ``
        eachData["weaponStats"]["damageRanges"].forEach((ranges)=>{
            range = 
            `
            <div class="range">
                <div class="start-end">${ranges["rangeStartMeters"]}-${ranges["rangeEndMeters"]} Meters</div>
                <div class="head-damage">Head: ${Math.round(ranges["headDamage"])}</div>
                <div class="body-damage">Body: ${Math.round(ranges["bodyDamage"])}</div>
                <div class="leg-damage">Leg: ${Math.round(ranges["legDamage"])}</div>
            </div>
            `
            damageRanges[damageRanges.length - 1].innerHTML += range
        })
}
function SMGCreator(){
    fetch(apiUrl)
    .then(result => result.json())
    .then(SMGDetector)
    .then(skinCallFunc)

}
function SMGDetector(result){
    let html = ""
    result["data"].forEach((eachData)=>{
        if(eachData["displayName"] !== "Melee"){
            if(eachData["shopData"]["category"] == "SMGs"){
                creator(eachData,html)
            }   
        }   
    })
    return result
}
function shotgunsCreator(){
    fetch(apiUrl)
    .then(result => result.json())
    .then(shotgunDetector)
    .then(skinCallFunc)
}
function shotgunDetector(result){
    let html = ""
    result["data"].forEach((eachData)=>{
        if(eachData["displayName"] !== "Melee"){
            if(eachData["shopData"]["category"] == "Shotguns"){
                creator(eachData,html)
            }   
        }
    })
    return result
}
function riflesCreator(){
    fetch(apiUrl)
    .then(result => result.json())
    .then(riflesDetector)
    .then(skinCallFunc)
}
function riflesDetector(result){
    let html = ""
    result["data"].forEach((eachData)=>{
        if(eachData["displayName"] != "Melee"){
            if(eachData["shopData"]["category"] == "Rifles"){
                creator(eachData,html)
            }   
        }
    })
    return result
}
function sniperRiflesCreator(){
    fetch(apiUrl)
    .then(result => result.json())
    .then(sniperRiflesDetector)
    .then(skinCallFunc)

}
function sniperRiflesDetector(result){
    let html = ""
    result["data"].forEach((eachData)=>{
        if(eachData["displayName"] != "Melee"){
            if(eachData["shopData"]["category"] == "Sniper Rifles"){
                creator(eachData,html)
            }   
        }
    })
    return result

}
function heavyWeaponsCreator(){
    fetch(apiUrl)
    .then(result => result.json())
    .then(heavyWeaponsDetector)
    .then(skinCallFunc)
}
function heavyWeaponsDetector(result){
    let html = ""
    result["data"].forEach((eachData)=>{
        if(eachData["displayName"] != "Melee"){
            if(eachData["shopData"]["category"] == "Heavy Weapons" && eachData["displayName"] !== "Melee"){
                creator(eachData,html)
            }   
        }
    })
    return result
}
function skinCallFunc(result){
    const skinsCaller = document.querySelectorAll(".skins-button")
    let clickedGunName
    skinsCaller.forEach((skinBtn)=>{
        skinBtn.addEventListener(("click"),()=>{
            cardDeleter()
            clickedGunName = skinBtn.parentElement.children[0].textContent
            skinBoxCreator(clickedGunName,result)
        })
    })
}
function skinBoxCreator(clickedGunName,result){
    result = result["data"]
    let selectedGun
    result.forEach((eachData)=>{
        if(eachData["displayName"] == clickedGunName){
            selectedGun = eachData
        }
    })
    let skinsObj = selectedGun["skins"]
    skinsObj.forEach((skin)=>{
        let html = ``
        html = 
        `
        <div class="card">
            <div class="gun-name">${skin["displayName"]}</div>
            <div class="gun-photo">
                <img src="${skin["chromas"][0]["fullRender"]}" alt="gun">
            </div>
            <div class="gun-properties"></div>
        </div>
        `
        cardContainer.innerHTML += html
    })
}