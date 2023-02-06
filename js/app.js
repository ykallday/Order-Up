let table = document.querySelector("#upperText");
let startButton = document.querySelector("openShop");
let restartButton;
let continueCheck;
let iQuit;
let goHome;
let keepWorking;
let cellbuttons = document.querySelectorAll('.cell');
let foodButtons = Array.from(cellbuttons);
const submitButton = document.getElementById("orderUp");
const tip = document.getElementById("tiptext");
let ingredientsToPick = [];
let doneIngredient;
let chosenIngredients = [];
let workBoard = document.getElementById("current-ingredients");
let checkList;
let currentTip = 0;
let totalRounds = 0;
let checkVal = true;
let finalIngredients = [];
const sandwiches = [
    { name: 'The Classic', ingredients: ['Bagel', 'Cream Cheese', 'Lox', 'Tomato', 'Capers', 'Onion'] },
    { name: 'The Basic', ingredients: ['Bagel', 'Cream Cheese'] },
    { name: 'The Egg, Cheese & Bacon', ingredients: ['Bagel', 'Egg', 'American Cheese', 'Special Sauce', 'Avocado', 'Bacon'] },
    { name: 'The Vegan', ingredients: ['Bagel', 'Avocado', 'Sprouts', 'Tomato', 'Onion', 'Vegan Egg'] },
    { name: 'The Pastrami Breakfast', ingredients: ['Bagel', 'Pastrami', 'Egg', 'Swiss Cheese', 'Special Sauce'] },
    { name: 'The Bacon-Schmear-Tomato', ingredients: ['Bagel', 'Cream Cheese', 'Tomato', 'Bacon' ]}
]

//chooses a sandwich from the list, prints its name and ingredients
function chooseSandwich() {
    ingredientsToPick=[];
    let choose = Math.floor(Math.random() * sandwiches.length); //selects index
    let choice = sandwiches[choose]; //selects sandwich using index, assigns to choice
    ingredientsToPick = choice.ingredients; //assign array to value of that sandwiches ingredients
    let orderName = document.createElement('p'); //create paragraph
    table.appendChild(orderName); //add it to the table
    orderName.innerText = (`${choice.name}:`);//grabs name from chosen sandwich and prints it
    let ingredients = document.createElement('ul'); //makes a new list of ingredients
    orderName.appendChild(ingredients); //adds it to the table 
    for (let i = 0; i < ingredientsToPick.length; i++) { //adds items to that list of ingredients
        let ingredient = document.createElement('li');
        ingredient.innerText = ingredientsToPick[i]; //fills it with text 
        ingredients.appendChild(ingredient); //puts on screen
    }

}

function checkIngredientExist(current){
    checkVal=true;
    for (let i = 0; i < chosenIngredients.length; i++){
        if (current === chosenIngredients[i]){
            return checkVal = false;
        } else{
            checkVal = true;
        }
    }
    if (checkVal){
        chosenIngredients.push(current);  //add to array
        doneIngredient = document.createElement("li");
        doneIngredient.innerText = current;
        checkList.appendChild(doneIngredient);
    }
}

function play() {
    totalRounds += 1;
    table.innerText = "";
    chooseSandwich();
    checkList = document.createElement('ul'); //create new list
    workBoard.appendChild(checkList); //add it to workspace
    for (let i = 0; i < foodButtons.length; i++) { //checks chosen buttons against winning buttons and adds matching ones to new array
        foodButtons[i].addEventListener('click', function clickedItems() {//add event listeners for food buttons
            for (let b = 0; b < ingredientsToPick.length; b++) {//go through the food buttons and see if they match what was selected
                if (foodButtons[i].innerText === ingredientsToPick[b]) {
                    checkIngredientExist(ingredientsToPick[b]);
                    console.log(ingredientsToPick.length, chosenIngredients.length)
                    if (ingredientsToPick.length === chosenIngredients.length) {
                        submitButton.style.opacity = 1;
                        submitButton.style.borderColor = "red";
                    }
        
                }
            }
        }) 
    }

}

function playMore(){
    totalRounds = 0;
    play();
}

function playReset(){
    totalRounds = 0;
    currentTip = 0;
    tiptext.innerText = (`Your Tip: $${currentTip}`);
    play();
}

function endGame(){
    console.log("gohome")
    table.innerText="";
    iQuit = document.createElement('p');
    iQuit.innerText=`The shop is closed! Enjoy your $${currentTip}!`;
    restartButton = document.createElement('BUTTON');
    restartButton.innerText = "Replay";
    restartButton.addEventListener('click', playReset);
    table.appendChild(iQuit);
    table.appendChild(restartButton);
    console.log("bottom")
}

function continuePlayCheck(){
    if (totalRounds < 1){
        console.log (totalRounds);
        play();
    } else {
        table.innerText="";
        continueCheck = document.createElement('p');
        continueCheck.innerText=(`You've done well! The lunch rush will be here soon. Do you want to continue, or take your $${currentTip} and clock out?`);
        table.appendChild(continueCheck);
        keepWorking = document.createElement("BUTTON");
        keepWorking.innerText = "Keep Working";
        goHome = document.createElement("BUTTON");
        goHome.innerText = "Go Home";
        table.appendChild(keepWorking);
        table.appendChild(goHome);
        keepWorking.addEventListener('click', playMore);
        goHome.addEventListener('click', endGame);
    }
}





openShop.addEventListener('click', play);

submitButton.addEventListener('click', function addTip(){
    submitButton.style.opacity = .7;
    submitButton.style.borderColor = "white";
    if (ingredientsToPick.length === chosenIngredients.length){
        currentTip+=5;
        tiptext.innerText = (`Your Tip: $${currentTip}`);
        chosenIngredients=[];
        checkList.remove();
        ingredientsToPick=[]; 
        continuePlayCheck();
}
})


