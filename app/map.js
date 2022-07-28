const apiUrl = "https://valorant-api.com/v1/maps"
const mapContainer = document.querySelector("#map-container")


fetch(apiUrl)
.then(result => result.json())
.then(data => {
    data["data"].forEach((eachData)=>{
        let displayName = eachData["displayName"]
        if(displayName !== "The Range"){
            
        let displayIcon = eachData["displayIcon"]
        let coordinates = eachData["coordinates"]
        let background = eachData["splash"]
        let html =
        `
        <div style="background: url(${background})" class="map">
            <div class="mapTitle">${displayName}</div>
            <div class="coordinate">${coordinates}</div>
            <div class="icon">
                <img src="${displayIcon}" alt="">
            </div>
        </div>
        `
        mapContainer.innerHTML += html
        }
    })
})
.then(data => console.log(data))