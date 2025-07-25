// =======================
// 🚀 Chargement script particles 
// =======================

particlesJS.load('particles-js', 'js/particles-config.json', function () {
    console.log('particles.js loaded 🚀')
  })

// =======================
// 🚀 Element html
// =======================

const divContainer = document.getElementById("container")
const divLoad = document.getElementById("loading")
const form = document.getElementById("planet-form")
const descriptionDiv = document.getElementById("planet-description")
const planetImageDiv = document.getElementById("planet-image")
const homePageBtn = document.getElementById("homePageBtn")
const inputSearch = document.getElementById("input-search")
//console.log(form)

// =======================
// 🚀 Formulaire > evenement
// =======================

form.addEventListener("submit", (event) => {
    event.preventDefault()
    const input = inputSearch.value
    descriptionDiv.innerHTML = ""
    planetImageDiv.innerHTML= "" 
    divLoad.innerHTML= ""    
    descriptionWikipediaFetch(input)
    descriptionSystemSolaireFetch(input)
    showPlanet(input)
    inputSearch.value=""
})

// =======================
// 🚀 description Api Wiki
// =======================

const descriptionWikipediaFetch = async (input) => {
    try{
        const loading = loadingApi()
        const search = wikiOther(input)
        const response = await fetch(`https://fr.wikipedia.org/api/rest_v1/page/summary/${search.toLowerCase()}`)
        const data = await response.json()
        loading.style.display = "none"
        createDescription(data)
        return data 
    }
    catch(error){
        console.log(error, "erreur")
    }
}

// ===========================================================
// fonction pour les appels lunes, soleils etc et les Planètes 
// ===========================================================

const wikiOther = (input) => {
  const name = input.toLowerCase()
  if(name === "lune" || name ==="soleil"){
    return name
  } else {
    return `${name}%20(planète)`
  }
}

/// ============================================
/// créer description (balise p)
/// ============================================
const createDescription = (data)=> {
        const paragraph = document.createElement("p")
        paragraph.innerHTML = data.extract
        descriptionDiv.appendChild(paragraph)
        descriptionDiv.prepend(paragraph) // para sera en premier dans la div descri
        typeWriter(data.extract,paragraph)
        
}

///
/// affiche lettre par lettre
///




/// ============================================
/// Deuxieme api pour le reste de la description 
/// ============================================
const descriptionSystemSolaireFetch = async (input) => {
  try{
    loadingApi()
    const response = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${input.toLowerCase()}`)
    const data = await response.json()
    loading.style.display="none"
    infoPlanet(data)
    return data
  }
  catch(err){
    console.log("erreur", err)
  }
}

/// ============================================
/// création description deuxieme api
/// ============================================

const infoPlanet = (data) =>{
  const ul = document.createElement("ul")
  descriptionDiv.appendChild(ul)

  const infosToDisplay = {
    "🌡️ Température moyenne": data.avgTemp ? `${(data.avgTemp - 273.15).toFixed(1)} °C` : "Inconnue",
    "🌍 Gravité": data.gravity ? `${data.gravity} m/s²` : "Inconnue",
    "📏 Rayon moyen": data.meanRadius ? `${data.meanRadius} km` : "Inconnu",
    "🌞 Distance du Soleil": data.semimajorAxis ? `${(data.semimajorAxis / 1_000_000).toFixed(0)} millions de km` : "Inconnue",
    "🕰️ Durée d’un jour": data.sideralRotation ? `${data.sideralRotation} h` : "Inconnue",
    "📅 Durée d’une année": data.sideralOrbit ? `${data.sideralOrbit} jours` : "Inconnue",
  };

  for(const item of Object.entries(infosToDisplay)){
    const li = document.createElement("li")
    ul.appendChild(li)
    li.innerHTML = `<strong>${item[0]} : <strong> ${item[1]}`
  }
  
}
// =======================
// 🚀 Chargement api
// =======================

const loadingApi = () => {
    divLoad.innerHTML=""
    const loading = document.createElement("p")
    divLoad.appendChild(loading)
    loading.innerText = "décollage en cours ... 🚀"
    return loading
}
// ===============
// Affichage image 
// ===============

function showPlanet(name) {
  planetImageDiv.innerHTML = ""; // reset total

  // Crée un wrapper qui contiendra l’image
  const animation = document.createElement("div");
  animation.classList.add("planetAnimation");

  const img = document.createElement("img");
  img.src = `img/planets/${name.toLowerCase()}.png`;

  animation.appendChild(img);
  planetImageDiv.appendChild(animation);

  // Reflow forcé pour déclencher la transition
  void animation.offsetWidth;

  // Classe visible pour l'effet
  animation.classList.add("visible");
}

// ===================
// 🚀 Menu Hamburger
// ==================

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});


// ===================
// création d'étoiles
// ==================