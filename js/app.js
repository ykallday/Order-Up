let table = document.querySelector("#upperText");
let startButton = document.querySelector("openShop");
let cellbuttons = document.querySelectorAll('.cell');
let foodButtons = Array.from(cellbuttons);
let workBoard = document.getElementById("current-ingredients");
let timerSpot = document.getElementById("timer");
const submitButton = document.getElementById("orderUp");
const tip = document.getElementById("tiptext");
let restartButton;
let continueCheck;
let iQuit;
let goHome;
let keepWorking;
let timeLeft = 30;
let ingredientsToPick = [];
let doneIngredient;
let chosenIngredients = [];
let checkList;
let currentTip = 0;
let addedTip = 5;
let totalRounds = 0;
let checkVal = true;
let level = 1;

//array of sandwich objects, which each have an array of ingredients
const sandwiches = [
    { name: 'The Classic', ingredients: ['Bagel', 'Cream Cheese', 'Lox', 'Tomato', 'Capers', 'Onion'] },
    { name: 'The Basic', ingredients: ['Bagel', 'Cream Cheese'] },
    { name: 'The Egg, Cheese & Bacon', ingredients: ['Bagel', 'Egg', 'American Cheese', 'Special Sauce', 'Avocado', 'Bacon'] },
    { name: 'The Vegan', ingredients: ['Bagel', 'Avocado', 'Sprouts', 'Tomato', 'Onion', 'Vegan Egg'] },
    { name: 'The Pastrami Breakfast', ingredients: ['Bagel', 'Pastrami', 'Egg', 'Swiss Cheese', 'Special Sauce'] },
    { name: 'The Bacon-Schmear-Tomato', ingredients: ['Bagel', 'Tomato', 'Cream Cheese','Bacon' ]},
    { name: 'Custom Order', ingredients: ['Bagel', 'Avocado', 'Tomato', 'Bacon' ]},
    { name: 'Custom Order', ingredients: ['Bagel', 'Egg', 'Tomato', 'American Cheese', 'Cheddar Cheese' ]},
    { name: 'Custom Order', ingredients: ['Bagel', 'Tomato', 'Onion', 'Cream Cheese','Bacon' ]},
    { name: 'Custom Order', ingredients: ['Bagel', 'Cream Cheese', 'Lox']},
    { name: 'Reuben-Ish', ingredients: ['Bagel', 'Pastrami', 'Swiss Cheese', 'Special Sauce']}
]

//chooses a sandwich from the list, prints its name and ingredients
function chooseSandwich() {
    ingredientsToPick=[]; //creates empty array of solution ingredients
    let choose = Math.floor(Math.random() * sandwiches.length); //selects index
    let choice = sandwiches[choose]; //selects sandwich using index, assigns to choice
    ingredientsToPick = choice.ingredients; //fills ingredientsToPick with sandwich's ingredients
    let orderName = document.createElement('p'); //create paragraph
    table.appendChild(orderName); //add it to the table
    orderName.innerText = (`${choice.name}:`);//grabs name from chosen sandwich and prints it
    let ingredients = document.createElement('ul'); //makes a new list of ingredients
    orderName.appendChild(ingredients); //adds general list to the table 
    for (let i = 0; i < ingredientsToPick.length; i++) { //adds items to that list of ingredients
        let ingredient = document.createElement('li');
        ingredient.innerText = ingredientsToPick[i]; //fills it with text 
        ingredients.appendChild(ingredient); //puts on screen
    }

}

function checkIngredientExist(current){ //prevents multiples of same correct ingredient
    checkVal=true;
    for (let i = 0; i < chosenIngredients.length; i++){
        if (current === chosenIngredients[i]){
            return checkVal = false; //if our current chosen ingredient is the same as any ingredient we've already chosen, return false
        } else{
            checkVal = true; //if we haven't selected it before, return true
        }
    }
    if (checkVal){ //if we haven't selected it before
        chosenIngredients.push(current);  //add to our array of chosen ingredients
        doneIngredient = document.createElement("li"); //create list item
        doneIngredient.innerText = current; //assign it to the value of the current selected ingredient
        checkList.appendChild(doneIngredient); //add it to our workboard (which our checklist has been added to already)
    }
}

function playGame() {
    totalRounds += 1; //increase round count
    console.log("totalRounds " + totalRounds);
    addedTip = 5; //assign tip value
    table.innerText = ""; //clear table
    chooseSandwich(); 
    if (level === 2){ 
        setUpTimer();
        setInterval(levelTwoTimer, 1000);
        clearInterval();
    }
    if (level === 3 && totalRounds < 5){
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
    playGame();
}

function playReset(){
    totalRounds = 0;
    currentTip = 0;
    level = 1;
    tiptext.innerText = (`Your Tip: $${currentTip}`);
    playGame();
}

function endGame(){
    console.log("endgame triggered");
    table.innerText="";
    iQuit = document.createElement('p');
    iQuit.innerText=`Great work. You made $${currentTip} in tips! The shop is now closed!`;
    const closedSign = document.createElement('img');
    closedSign.src='/order-up/style/closedsign.png';
    closedSign.setAttribute('id', 'closedSignIMG');
    restartButton = document.createElement('BUTTON');
    restartButton.innerText = "Replay";
    restartButton.setAttribute('id', 'restartButton');
    restartButton.addEventListener('click', playReset);
    table.appendChild(iQuit);
    table.appendChild(closedSign);
    table.appendChild(restartButton);
    level=1;
    
    
}


function continuePlayCheck(){
    checkList.remove();
    chosenIngredients=[];
    ingredientsToPick=[]; 
    if (timeLeft > 0 && level == 2 || totalRounds < 5 && level === 3 || level === 1 && totalRounds < 5){
        playGame();
    } else {
        table.innerText="";
        continueCheck = document.createElement('p');
        if (level === 1){
            continueCheck.innerText=(`You've done well, but the lunch rush is coming! In the next level, you'll only have 30 seconds to make as many sandwiches as possible. Do you want to continue, or take your $${currentTip} and clock out?`);}
        else if (level === 2){
            continueCheck.innerText = (`Great work! You've got an early bird dinner rush coming in. They are impatient, and your speed will matter. They'll tip lower for slow service. Do you want to continue, or take your $${currentTip} and clock out?`);
        }else if (level === 3 && totalRounds >=5){
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
    timerSpot.innerText = timeLeft;
    timerSpot.style.display="block";
    
}


function levelTwoTimer(){
    if (timeLeft > 0 && level === 2){
        timeLeft -=1;
        timerSpot.innerText = timeLeft;
        }

    if (timeLeft <= 0 && level === 2){
        timeLeft = 0;
        clearInterval();
        timerSpot.style.display = "none";
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

openShop.addEventListener('click', playGame);

submitButton.addEventListener('click', function addTip(){
    submitButton.style.opacity = .7;
    submitButton.style.borderColor = "white";
    if (ingredientsToPick.length === chosenIngredients.length){
        console.log(addedTip);
        currentTip+=addedTip;
        tiptext.innerText = (`Your Tip: $${currentTip}`);
        chosenIngredients=[];
        ingredientsToPick=[]; 
        continuePlayCheck();
}
})

