let inputBox = document.getElementById("inputBox");
let coverPic = document.getElementById("coverPic");
let pkmnName = document.getElementById("pkmnName");
let pkmnNum = document.getElementById("pkmnNum");
let pkmnType = document.getElementById("pkmnType");
let typePic = document.getElementById("typePic");
let injectHere = document.getElementById("injectHere");
let searchBtn = document.getElementById("searchBtn");
let randomBtn = document.getElementById("randomBtn");

let locationText = document.getElementById("locationText");
let moveText = document.getElementById("moveText");
let AbilitiesText = document.getElementById("AbilitiesText");
let background = document.getElementById("background");
let background2 = document.getElementById("background2");
let injectEvo = document.getElementById("injectEvo");




const pokemonApiCall = async (pokemonName) => {
    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await promise.json();
    return data;
}
const location = async (number) => {
    try {
        const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}/encounters`);
        const data = await promise.json();
        return data[0].location_area.name.replace("-", " ")
    }
    catch (err) {
        return "No no no, N/A"
    }
}
const speciesUrl = async (url) => {
    const promise = await fetch(url);
    const data = await promise.json();
    return data.evolution_chain.url;
}
const evoChainUrl = async (url) => {
    const promise = await fetch(url);
    const data = await promise.json();
    return data;
}
// inputBox.addEventListener('keydown', async (event) => {

//     if (event.key === "Enter") {
//         console.clear();
//         let pokemon = await pokemonApiCall(event.target.value);


//         let typeArr = [];
//         for (let i = 0; i < pokemon.types.length; i++) {

//             typeArr.push(pokemon.types[i].type.name)
//         }

//         let moveArray = pokemon.moves.map(currentMove => {
//             return currentMove.move.name.replace("-", " ")
//         })



//         //evo chain work
//         let evoPostMan = await evoChainUrl(await speciesUrl(pokemon.species.url))
//         let evoArr = [];


//         evoArr.push(evoPostMan.chain.species.name)
//         if (evoPostMan.chain.evolves_to.length > 0) {

//             // console.log(evoPostMan.chain.species.name)

//             if (evoPostMan.chain.evolves_to.length > 1) {
//                 for (let i = 0; i < evoPostMan.chain.evolves_to.length; i++) {
//                     evoArr.push(evoPostMan.chain.evolves_to[i].species.name)
//                     // console.log(evoPostMan.chain.evolves_to[i].species.name)

//                 }

//             } else {
//                 // console.log(evoPostMan.chain.evolves_to[0].species.name)
//                 evoArr.push(evoPostMan.chain.evolves_to[0].species.name)
//                 if (evoPostMan.chain.evolves_to[0].evolves_to.length > 0) {
//                     evoArr.push(evoPostMan.chain.evolves_to[0].evolves_to[0].species.name)
//                     // console.log(evoPostMan.chain.evolves_to[0].evolves_to[0].species.name)
//                 }

//             }

//         }

//         //abilities
//         let abilitiesArray = pokemon.abilities.map(currentMove => {
//             return currentMove.ability.name.replace("-", " ")
//         })



//         console.log(evoArr)
//         //type/s
//         console.log(typeArr)
//         console.log(abilitiesArray)
//         //pokemon #
//         console.log(pokemon.id)
//         //name
//         console.log(pokemon.name)
//         //moves
//         console.log(moveArray)
//         //location
//         console.log(await location(pokemon.id))



//         let isShiny = false;
//         coverPic.src = pokemon.sprites.other['official-artwork'].front_default;
//         coverPic.addEventListener('click', () => {
//             if (isShiny) {
//                 coverPic.src = pokemon.sprites.other['official-artwork'].front_default;
//                 isShiny = false;
//             } else {
//                 coverPic.src = pokemon.sprites.other['official-artwork'].front_shiny;
//                 isShiny = true;
//             }
//         })

//         pkmnName.innerText = "Name: " + pokemon.name;
//         pkmnNum.innerText = "Pokedex Number: " + pokemon.id;
//         locationText.innerText = await location(pokemon.id);
//         moveText.innerText = moveArray;
//         AbilitiesText.innerText = abilitiesArray;

//         let check = typeArr[0];
//         console.log(check);
//         determineColor(check)

//         if (typeArr.length > 1) {

//             injectHere.innerHTML = "";
//             let p = document.createElement("p");
//             p.innerText = "Types: "
//             p.classList.add("customText");
//             injectHere.appendChild(p)

//             for (let i = 0; i < typeArr.length; i++) {

//                 let img = document.createElement("img");
//                 img.src = determineType(typeArr[i]);
//                 console.log(typeArr[i])
//                 img.classList.add("md:w-[120px]", "md:h-[40px]", "w-[75px]", "h-[25px]")

//                 injectHere.appendChild(img);
//                 console.log(i)
//             }
//         } else if (typeArr.length == 1) {

//             injectHere.innerHTML = "";
//             let p = document.createElement("p");
//             p.innerText = "Types: "
//             p.classList.add("customText");


//             injectHere.innerHTML = "";
//             let img = document.createElement("img");
//             img.src = determineType(typeArr[0]);
//             console.log(typeArr[0])
//             img.classList.add("md:w-[120px]", "md:h-[40px]", "w-[75px]", "h-[25px]")

//             injectHere.appendChild(p)
//             injectHere.appendChild(img);

//         }


//         while (injectEvo.firstChild) {
//             injectEvo.removeChild(injectEvo.firstChild);
//         }

//         for (let i = 0; i < evoArr.length; i++) {


//             let picSrc = await pokemonApiCall(evoArr[i])


//             let div2 = document.createElement("div")
//             div2.className = "flex justify-center items-center"
//             let img2 = document.createElement("img")
//             img2.className = "w-[300px] h-[300px]"
//             img2.src = picSrc.sprites.other['official-artwork'].front_default;
//             //pokemon.sprites.other['official-artwork'].front_default

//             div2.appendChild(img2)
//             injectEvo.appendChild(div2)
//         }





//         //     <div class=" flex justify-center items-center ">
//         //     <img id="evo1" class="w-[300px] h-[300px]" src="./assets/fullHeart.png" alt="placeholder">
//         // </div>

//     }
// })





inputBox.addEventListener('keydown', async (event) => {

    if (event.key === "Enter") {

        doAll(event.target.value)
    }

})

searchBtn.addEventListener('click', async (event) => {
    console.log(inputBox.value)
    doAll(inputBox.value)
})

randomBtn.addEventListener('click', async () => {
    doAll(randomNumGen())

})



const doAll = async (parameter) => {


    console.clear();
    let pokemon = await pokemonApiCall(parameter);


    let typeArr = [];
    for (let i = 0; i < pokemon.types.length; i++) {

        typeArr.push(pokemon.types[i].type.name)
    }

    let moveArray = pokemon.moves.map(currentMove => {
        return currentMove.move.name.replace("-", " ")
    })



    //evo chain work
    let evoPostMan = await evoChainUrl(await speciesUrl(pokemon.species.url))
    let evoArr = [];


    evoArr.push(evoPostMan.chain.species.name)
    if (evoPostMan.chain.evolves_to.length > 0) {

        // console.log(evoPostMan.chain.species.name)

        if (evoPostMan.chain.evolves_to.length > 1) {
            for (let i = 0; i < evoPostMan.chain.evolves_to.length; i++) {
                evoArr.push(evoPostMan.chain.evolves_to[i].species.name)
                // console.log(evoPostMan.chain.evolves_to[i].species.name)

            }

        } else {
            // console.log(evoPostMan.chain.evolves_to[0].species.name)
            evoArr.push(evoPostMan.chain.evolves_to[0].species.name)
            if (evoPostMan.chain.evolves_to[0].evolves_to.length > 0) {
                evoArr.push(evoPostMan.chain.evolves_to[0].evolves_to[0].species.name)
                // console.log(evoPostMan.chain.evolves_to[0].evolves_to[0].species.name)
            }

        }

    }

    //abilities
    let abilitiesArray = pokemon.abilities.map(currentMove => {
        return currentMove.ability.name.replace("-", " ")
    })



    console.log(evoArr)
    //type/s
    console.log(typeArr)
    console.log(abilitiesArray)
    //pokemon #
    console.log(pokemon.id)
    //name
    console.log(pokemon.name)
    //moves
    console.log(moveArray)
    //location
    console.log(await location(pokemon.id))



    let isShiny = false;
    coverPic.src = pokemon.sprites.other['official-artwork'].front_default;
    coverPic.addEventListener('click', () => {
        if (isShiny) {
            coverPic.src = pokemon.sprites.other['official-artwork'].front_default;
            isShiny = false;
        } else {
            coverPic.src = pokemon.sprites.other['official-artwork'].front_shiny;
            isShiny = true;
        }
    })

    pkmnName.innerText = "Name: " + pokemon.name;
    pkmnNum.innerText = "Pokedex Number: " + pokemon.id;
    locationText.innerText = await location(pokemon.id);
    moveText.innerText = moveArray;
    AbilitiesText.innerText = abilitiesArray;

    let check = typeArr[0];
    console.log(check);
    determineColor(check)

    if (typeArr.length > 1) {

        injectHere.innerHTML = "";
        let p = document.createElement("p");
        p.innerText = "Types: "
        p.classList.add("customText");
        injectHere.appendChild(p)

        for (let i = 0; i < typeArr.length; i++) {

            let img = document.createElement("img");
            img.src = determineType(typeArr[i]);
            console.log(typeArr[i])
            img.classList.add("md:w-[120px]", "md:h-[40px]", "w-[75px]", "h-[25px]")

            injectHere.appendChild(img);
            console.log(i)
        }
    } else if (typeArr.length == 1) {

        injectHere.innerHTML = "";
        let p = document.createElement("p");
        p.innerText = "Types: "
        p.classList.add("customText");


        injectHere.innerHTML = "";
        let img = document.createElement("img");
        img.src = determineType(typeArr[0]);
        console.log(typeArr[0])
        img.classList.add("md:w-[120px]", "md:h-[40px]", "w-[75px]", "h-[25px]")

        injectHere.appendChild(p)
        injectHere.appendChild(img);

    }


    while (injectEvo.firstChild) {
        injectEvo.removeChild(injectEvo.firstChild);
    }

    for (let i = 0; i < evoArr.length; i++) {


        let picSrc = await pokemonApiCall(evoArr[i])


        let div2 = document.createElement("div")
        div2.className = "flex justify-center items-center"
        let img2 = document.createElement("img")
        img2.className = "w-[300px] h-[300px]"
        img2.src = picSrc.sprites.other['official-artwork'].front_default;
        //pokemon.sprites.other['official-artwork'].front_default

        div2.appendChild(img2)
        injectEvo.appendChild(div2)
    }





    //     <div class=" flex justify-center items-center ">
    //     <img id="evo1" class="w-[300px] h-[300px]" src="./assets/fullHeart.png" alt="placeholder">
    // </div>


}


// doAll("mew")










const determineType = (type) => {
    switch (type) {
        case "fire":

            return "./assets/fire.png";
        case "bug":

            return "./assets/BugIC_Big.png";
        case "dark":

            return "./assets/DarkIC_Big.png";
        case "dragon":

            return "./assets/DragonIC_Big.png";
        case "electric":

            return "./assets/ElectricIC_Big.png";
        case "fighting":

            return "./assets/fightingIC_Big.png";
        case "flying":

            return "./assets/FlyingIC_Big.png";
        case "ghost":

            return "./assets/GhostIC_Big.png";
        case "grass":

            return "./assets/GrassIC_Big.png";
        case "ground":

            return "./assets/GroundIC_Big.png";
        case "ice":

            return "./assets/IceIC_Big.png";
        case "normal":

            return "./assets/NormalIC_Big.png";
        case "poison":

            return "./assets/PoisonIC_Big.png";
        case "psychic":

            return "./assets/PsychicIC_Big.png";
        case "rock":

            return "./assets/RockIC_Big.png";
        case "steel":

            return "./assets/SteelIC_Big.png";
        case "water":

            return "./assets/WaterIC_Big.png";

    }
}
const determineColor = (type) => {
    switch (type) {
        case "fire":
            background.className = ""
            background.style = "background-color: #F89030 ;";
            background2.style = "background-color: #F89030 ;";
            break;

        case "bug":
            background.style = "background-color: #A0C887 ;";
            background2.style = "background-color: #A0C887 ;";
            break;

        case "dark":
            background.style = "background-color: #775444 ;";
            background2.style = "background-color: #775444 ;";
            break;

        case "dragon":
            background.style = "background-color: #7666EE ;";
            background2.style = "background-color: #7666EE ;";
            break;

        case "electric":
            background.style = "background-color: #E4E451 ;";
            background2.style = "background-color: #E4E451 ;";
            break;

        case "fighting":
            background.style = "background-color: #F87070 ;";
            background2.style = "background-color: #F87070 ;";
            break;

        case "flying":
            background.style = "background-color: #58C8F0 ;";
            background2.style = "background-color: #58C8F0 ;";
            break;

        case "ghost":
            background.style = "background-color: #A86FF8 ;";
            background2.style = "background-color: #A86FF8 ;";
            break;

        case "grass":
            background.style = "background-color: #8FE87F ;";
            background2.style = "background-color: #8FE87F ;";
            break;

        case "ground":
            background.style = "background-color: #B99644 ;";
            background2.style = "background-color: #B99644 ;";
            break;

        case "ice":
            background.style = "background-color: #76DDFF ;";
            background2.style = "background-color: #76DDFF ;";
            break;

        case "normal":
            background.style = "background-color: #B8B8A8 ;";
            background2.style = "background-color: #B8B8A8 ;";
            break;

        case "poison":
            background.style = "background-color: #E090F8 ;";
            background2.style = "background-color: #E090F8 ;";
            break;

        case "psychic":
            background.style = "background-color: #FA6DBD ;";
            background2.style = "background-color: #FA6DBD ;";
            break;

        case "rock":
            background.style = "background-color: #BE9845 ;";
            background2.style = "background-color: #BE9845 ;";
            break;

        case "steel":
            background.style = "background-color: #B8B8D0 ;";
            background2.style = "background-color: #B8B8D0 ;";
            break;

        case "water":
            background.style = "background-color: #6798F8 ;";
            background2.style = "background-color: #6798F8 ;";
            break;

    }


}






// let coverPic = document.getElementById("coverPic");

// let randomNum = 0;



// const evo = async () => {
//     const promise = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${2}/`);
//     const data = await promise.json();
//     // console.log(data);
//     return data;
// }

// let value = await pokemonApi();
// let locations = await location();
// let evolution = await evo();


















// console.log(pokemon.species.url)
// console.log(await speciesUrl(pokemon.species.url))
// console.log("----------------------------------")














































// console.log(evolution)
// console.log(evolution.chain.species.name)
// console.log(evolution.chain.evolves_to[0].species.name)
// console.log(evolution.chain.evolves_to[0].evolves_to[0].species.name)




//ability  value.abilities[0].ability.name 
//name  value.name
//type  value.types[0].type.name
//number  value.id
//moves value.moves[0].move.name
//png value.sprites.other['official-artwork'].front_default
//pngshiny value.sprites.other['official-artwork'].front_shiny

//area locations[0].location_area.name









function randomNumGen() {
    let rndm = Math.floor(Math.random() * 151) + 1;
    return rndm
}