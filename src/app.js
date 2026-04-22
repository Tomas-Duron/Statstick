import { response } from 'express';
import {getLatestChampionDDragon} from './externals/ddragon.js'
// add CDragon
// Add the other one that gives lanes(?)

// const champDDragon=(await getLatestChampionDDragon()).data;
// const champDDragon = 
fetch('../data/cached-data.json')
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();  
                })
                .then(data => console.log(data))  
                .catch(error => console.error('Failed to fetch data:', error)); 
const laneRates=(await fetch("https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/championrates.json  ").then((response) => response.json())).data;

console.log(champDDragon)

function startup()
{
    addChampTiles()
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

        // Champ Roles and Lane
        var champRoleLaneWrapper = document.createElement('div');
        champRoleLaneWrapper.id = `champRoleLaneWrapper${champNameKey}`;
        champRoleLaneWrapper.className = "champRoleLaneWrapper";
        var champClass = document.createElement('img');
        champClass.id = `champClass${champNameKey}`;
        champClass.className = "champClass";
        champRoleLaneWrapper.appendChild(champClass);
        var champRole = document.createElement('img');
        champRole.id = `champRole${champNameKey}`;
        champRole.className = "champRole";
        champRoleLaneWrapper.appendChild(champRole);
        console.log(laneRates)
        champTile.appendChild(champRoleLaneWrapper);

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
        for(const tag of champObject["tags"])
        {
            let tagElement = document.createElement('li');
            tagElement.id = `champTag${champNameKey}${tag}`
            tagElement.className = "champTag";
            tagElement.innerHTML = tag;
            champTagWrapper.appendChild(tagElement);
        }
        champTile.appendChild(champTagWrapper);
    })   
}

window.addEventListener ? 
window.addEventListener("load",startup(),false) : 
window.attachEvent && window.attachEvent("onload",startup());