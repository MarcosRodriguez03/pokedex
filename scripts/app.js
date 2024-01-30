let inputBox = document.getElementById("inputBox");
let coverPic = document.getElementById("coverPic");
let pkmnName = document.getElementById("pkmnName");
let pkmnNum = document.getElementById("pkmnNum");
let pkmnType = document.getElementById("pkmnType");
let typePic = document.getElementById("typePic");
let injectHere = document.getElementById("injectHere");







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
inputBox.addEventListener('keydown', async (event) => {

    if (event.key === "Enter") {
        console.clear();
        let pokemon = await pokemonApiCall(event.target.value);




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
        determineType(typeArr[0])

        if (typeArr.length > 1) {

            injectHere.innerHTML = "";
            for (let i = 0; i < typeArr.length; i++) {


                let img = document.createElement("img");
                img.src = determineType(typeArr[i]);
                console.log(typeArr[i])
                img.classList.add("w-[150px]", "h-[40px]")


                injectHere.appendChild(img);
                console.log(i)


            }
        }


    }
})



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









const randomNumGen = async () => {
    let rndm = Math.floor(Math.random() * 151) + 1;
    const promise = await fetch('https://pokeapi.co/api/v2/pokemon/' + rndm);
    const data = await promise.json();
    // console.log(data);
    console.log(data.name)
    return data;
}