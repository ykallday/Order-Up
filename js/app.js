let table = document.querySelector("#upperText");
let startButton = document.querySelector("openShop");
let restartButton;
let continueCheck;
let iQuit;
let goHome;
let keepWorking;
let timeLeft = 30;
let timerSpot;
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
let addedTip = 5;
let totalRounds = 0;
let checkVal = true;
let finalIngredients = [];
let level = 0;
const sandwiches = [
    { name: 'The Classic', ingredients: ['Bagel', 'Cream Cheese', 'Lox', 'Tomato', 'Capers', 'Onion'] },
    { name: 'The Basic', ingredients: ['Bagel', 'Cream Cheese'] },
    { name: 'The Egg, Cheese & Bacon', ingredients: ['Bagel', 'Egg', 'American Cheese', 'Special Sauce', 'Avocado', 'Bacon'] },
    { name: 'The Vegan', ingredients: ['Bagel', 'Avocado', 'Sprouts', 'Tomato', 'Onion', 'Vegan Egg'] },
    { name: 'The Pastrami Breakfast', ingredients: ['Bagel', 'Pastrami', 'Egg', 'Swiss Cheese', 'Special Sauce'] },
    { name: 'The Bacon-Schmear-Tomato', ingredients: ['Bagel', 'Cream Cheese', 'Tomato', 'Bacon' ]},
    { name: 'Custom Order', ingredients: ['Bagel', 'Avocado', 'Tomato', 'Bacon' ]},
    { name: 'Custom Order', ingredients: ['Bagel', 'Egg', 'Tomato', 'American Cheese', 'Cheddar Cheese' ]},
    { name: 'Custom Order', ingredients: ['Bagel', 'Cream Cheese', 'Tomato', 'Onion', 'Bacon' ]},
    { name: 'Custom Order', ingredients: ['Bagel', 'Cream Cheese', 'Lox']}
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
    console.log("totalRounds " + totalRounds);
    addedTip = 5;
    table.innerText = "";
    chooseSandwich();
    if (level === 1){
        setUpTimer();
        setInterval(levelOneTimer, 1000);
        clearInterval();
    }
    if (level === 2 && totalRounds < 5){
        setInterval(timedTips, 5000);
        clearInterval();
    } 
    console.log("current level  " + level);
    checkList = document.createElement('ul'); //create new list
    workBoard.appendChild(checkList); //add it to workspace
    for (let i = 0; i < foodButtons.length; i++) { //checks chosen buttons against winning buttons and adds matching ones to new array
        foodButtons[i].addEventListener('click', function clickedItems() {//add event listeners for food buttons
            for (let b = 0; b < ingredientsToPick.length; b++) {//go through the food buttons and see if they match what was selected
                if (foodButtons[i].innerText === ingredientsToPick[b]) {
                    checkIngredientExist(ingredientsToPick[b]);
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
    console.log("passed level " + level);
    addedTip = 5; 
    level += 1;
    console.log("new level " + level);
    totalRounds = 0;
    play();
}

function playReset(){
    totalRounds = 0;
    currentTip = 0;
    level = 0;
    tiptext.innerText = (`Your Tip: $${currentTip}`);
    play();
}

function endGame(){
    console.log("endgame triggered");
    table.innerText="";
    iQuit = document.createElement('p');
    iQuit.innerText=`Great work. You made $${currentTip} in tips! The shop is now closed!`;
    let enjoyTip = document.createElement('p');
    enjoyTip.innerText= `Enjoy your $${currentTip}!`;
    const closedSign = document.createElement('img');
    closedSign.src='/order-up/style/closedsign.png';
    closedSign.setAttribute('id', 'closedSignIMG');
    restartButton = document.createElement('BUTTON');
    restartButton.innerText = "Replay";
    restartButton.setAttribute('id', 'restartButton');
    restartButton.addEventListener('click', playReset);
    table.appendChild(iQuit);
    table.appendChild(closedSign);
    table.appendChild(enjoyTip);
    table.appendChild(restartButton);
    level=0;
}

function continuePlayCheck(){
    if (timeLeft > 0 && level == 1 || totalRounds < 5 && level === 2 || level === 0 && totalRounds < 5){
        play();
    } else {
        table.innerText="";
        continueCheck = document.createElement('p');
        if (level === 0){
            continueCheck.innerText=(`You've done well, but the lunch rush is coming! In the next level, you'll only have 30 seconds to make as many sandwiches as possible. Do you want to continue, or take your $${currentTip} and clock out?`);}
        else if (level === 1){
            continueCheck.innerText = (`Great work! You've got an early bird dinner rush coming in. They are impatient, and your speed will matter. They'll tip lower for slow service. Do you want to continue, or take your $${currentTip} and clock out?`);
        }else if (level === 2 && totalRounds >=5){
            return endGame();
        }
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

function setUpTimer(){
    timerSpot = document.createElement('div');
    timerSpot.setAttribute('id', 'timer');
    timerSpot.innerText = timeLeft;
    table.appendChild(timerSpot);
}


function levelOneTimer(){
    if (timeLeft > 0 && level === 1){
        timeLeft -=1;
        timerSpot.innerText = timeLeft;
        }

    if (timeLeft <= 0 && level === 1){
        timeLeft = 0;
        clearInterval();
        checkList.remove();
        continuePlayCheck();  
    }

}

function timedTips(){
    if (addedTip > 1){
        return addedTip -= 1;
    } else {
         return addedTip = 1;
}
}

openShop.addEventListener('click', play);

submitButton.addEventListener('click', function addTip(){
    submitButton.style.opacity = .7;
    submitButton.style.borderColor = "white";
    if (ingredientsToPick.length === chosenIngredients.length){
        console.log(addedTip);
        currentTip+=addedTip;
        tiptext.innerText = (`Your Tip: $${currentTip}`);
        chosenIngredients=[];
        checkList.remove();
        ingredientsToPick=[]; 
        continuePlayCheck();
}
})

