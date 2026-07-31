// import { response } from 'express';
// import {getLatestChampionDDragon} from './externals/ddragon.js'
// add CDragon
// Add the other one that gives lanes(?)

// const champDDragon=(await getLatestChampionDDragon()).data;
// This champDDragon will not work but it will work eventually
// const champDDragon = (await fetch("https://raw.githubusercontent.com/Tomas-Duron/Statstick/blob/main/data/cached-data.json").then((response) => response.json())).data;
// const laneRates=(await fetch("https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/championrates.json  ").then((response) => response.json())).data;

let champDDragon = null;
let laneRates = null;

async function startup()
{
    let dDragonRes = await getDDragon();
    // This should be dDragonRes.data but the json file refuses to update itself.
    champDDragon = dDragonRes.champions
    console.log(champDDragon)
    addChampTiles()
}

async function getDDragon()
{
    const response = await fetch('https://raw.githubusercontent.com/Tomas-Duron/Statstick/main/data/cached-data.json');
    const data = await response.json();
    return data;
}

function addChampTiles()
{
    const champGrid = document.getElementById("champGrid");
    Object.keys(champDDragon).forEach(key => {
        let champNameKey = key;
        if(champNameKey == "Fiddlesticks")
        {
            champNameKey = "FiddleSticks";
        };
        var champObject = champDDragon[key]

        // Champ Tile Wrapper
        var champTileWrapper = document.createElement('div');
        champTileWrapper.id = `champTileWrapper${champNameKey}`;
        champTileWrapper.className = "champTileWrapper";
        champGrid.appendChild(champTileWrapper);
        
        // Champ Tile
        var champTile = document    .createElement('div');
        champTile.id = `champTile${champNameKey}`;
        champTile.className = "champTile";
        champTileWrapper.appendChild(champTile);

        // Champ Tags and Lane
        var champTagLaneImageWrapper = document.createElement('div');
        champTagLaneImageWrapper.id = `champTagLaneWrapper${champNameKey}`;
        champTagLaneImageWrapper.className = "champTagLaneWrapper";
        
        var champTagImageWrapper = document.createElement('ul');
        champTagImageWrapper.id = `champTagImageWrapper${champNameKey}`
        champTagImageWrapper.className = "champTagLaneImageWrapper";
        champTagLaneImageWrapper.appendChild(champTagImageWrapper);

        var champLaneImageWrapper = document.createElement('ul');
        champLaneImageWrapper.id = `champLaneImageWrapper${champNameKey}`;
        champLaneImageWrapper.className = "champTagLaneImageWrapper";
        champTagLaneImageWrapper.appendChild(champLaneImageWrapper)
        for(const tag of champObject["tags"])
        {
            let roleImage = document.createElement('img');
            roleImage.id = `champTag${champNameKey}${tag}`
            roleImage.className = "champImage";
            roleImage.classList.add("Assassin-image")
            champTagImageWrapper.appendChild(roleImage);
        }


        // var champClass = document.createElement('img');
        // champClass.id = `champClass${champNameKey}`;
        // champClass.className = "champClass";
        // champRoleLaneWrapper.appendChild(champClass);
        // var champRole = document.createElement('img');
        // champRole.id = `champRole${champNameKey}`;
        // champRole.className = "champRole";
        // champRoleLaneWrapper.appendChild(champRole);
        // console.log(laneRates)
        champTile.appendChild(champTagLaneImageWrapper);

        // Champ Image Wrapper
        var champImgWrapper = document.createElement("div");
        champImgWrapper.id = `champImgWrapper${champNameKey}`;
        champImgWrapper.className = "champImgWrapper";
        champTile.appendChild(champImgWrapper);

        // Champ Image
        var champImg = document.createElement("img");
        champImg.id = `champImg${champNameKey}`
        champImg.className = "champImg"
        fetch(`https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${champNameKey}_0.jpg`)
        .then(response => response.blob())
        .then(imageBlob => {
            const imageObjectURL = URL.createObjectURL(imageBlob);
            champImg.src=imageObjectURL;
        });
        champImgWrapper.appendChild(champImg);

        // Champ Name
        var champName = document.createElement('div');
        champName.id = `champName${champNameKey}`
        champName.className = "champName"
        champName.innerHTML = champObject["id"]
        champTile.appendChild(champName);

        // Champ Title
        var champTitle = document.createElement('div');
        champTitle.id = `champTitle${champNameKey}`;
        champTitle.className = "champTitle";
        champTitle.innerHTML = champObject["title"];
        champTile.appendChild(champTitle);

        // Champ Tag Wrapper
        var champTagWrapper = document.createElement('ul');
        champTagWrapper.id = `champTagWrapper${champNameKey}`
        champTagWrapper.className = `champTagWrapper`
        champTile.appendChild(champTagWrapper);

        // Champ Tags
        for(const tag of champObject["tags"])
        {
            let tagElement = document.createElement('li');
            tagElement.id = `champTag${champNameKey}${tag}`
            tagElement.className = "champTag";
            tagElement.classList.add(tag)
            tagElement.innerHTML = tag;
            champTagWrapper.appendChild(tagElement);
        }
    })   
}

window.addEventListener ? 
window.addEventListener("load",startup(),false) : 
window.attachEvent && window.attachEvent("onload",startup);