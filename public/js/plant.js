var plantBtn = document.getElementById("plantBtn");

function findPlants(event) {
    event.preventDefault();

    var searchPlant = document.getElementById("searchPlant").value.trim();
    console.log(searchPlant)
    document.location.href = "/search?q=" + searchPlant
    // plantDataAPI(searchPlant)
}

// function plantDataAPI(searchPlant) {
//     var requestPlant = 'https://perenual.com/api/species-list?page=1&key=sk-E8Po641b35fe1568e294&q=' + searchPlant;

//     fetch(requestPlant)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//         })
// }

plantBtn.addEventListener("click", findPlants);