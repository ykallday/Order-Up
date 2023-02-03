const table = document.querySelector("#upperText");
const bagel = document.getElementById("bagel");
const tomato = document.getElementById("tomato");
const lox = document.getElementById("lox");
const onion = document.getElementById("onion");
const avocado = document.getElementById("avocado");
const special = document.getElementById("special-sauce");
const bacon = document.getElementById("bacon");
const creamcheese = document.getElementById("cream-cheese");
const swiss = document.getElementById("swiss");
const egg = document.getElementById("eggs");
const vegegg = document.getElementById("vegan-egg");
const usa = document.getElementById("usacheese");
const cheddar = document.getElementById("cheddar");
const pastrami = document.getElementById("pastrami");
const sprouts = document.getElementById("sprouts");
const capers = document.getElementById("capers");
const submitButton = document.getElementById("orderUp");
const tip = document.getElementById("tiptext");
const foodButtons = [bagel, tomato, lox, onion, avocado, special, bacon, creamcheese,
    swiss, egg, vegegg, usa, cheddar, pastrami, sprouts, capers];
let ingredientsToPick = [];
let chosenIngredients = [];
const workBoard = document.getElementById("current-ingredients");
let currentTip = 0;
let totalRounds = 0;
let checkVal = false;
let finalIngredients=[];
const sandwiches = [
    { name: 'The Classic', ingredients: ['Bagel', 'Cream Cheese', 'Lox', 'Tomato', 'Capers', 'Onion'] },
    { name: 'The Basic', ingredients: ['Bagel', 'Cream Cheese'] },
    { name: 'The Egg, Cheese & Bacon', ingredients: ['Bagel', 'Egg', 'American Cheese', 'Special Sauce', 'Avocado', 'Bacon'] },
    { name: 'The Vegan', ingredients: ['Bagel', 'Avocado', 'Sprouts', 'Tomato', 'Onion', 'Vegan Egg'] },
    { name: 'The Pastrami Breakfast', ingredients: ['Bagel', 'Pastrami', 'Egg', 'Swiss Cheese', 'Special Sauce'] }
]

//chooses a sandwich from the list, prints its name and ingredients
function chooseSandwich() {
    let choose = Math.floor(Math.random() * sandwiches.length);
    let choice = sandwiches[choose]; //picks sandwich, assigns to choice
    ingredientsToPick = choice.ingredients;
    let orderName = document.createElement('p');
    table.appendChild(orderName);
    orderName.innerText = (`${choice.name}:`);//grabs name from chosen sandwich
    let ingredients = document.createElement('ul'); //makes a new list of ingredients
    orderName.appendChild(ingredients); //adds it to the table 
    for (let i = 0; i < ingredientsToPick.length; i++) { //adds items to that list of ingredients
        let ingredient = document.createElement('li');
        ingredient.innerText = ingredientsToPick[i]; //fills it with text 
        ingredients.appendChild(ingredient); //puts on screen
    }

}



function play() {
    totalRounds += 1;
    table.innerText = "";
    chooseSandwich();
    for (let i = 0; i < foodButtons.length; i++) { //checks chosen buttons against winning buttons and adds matching ones to new array
        foodButtons[i].addEventListener('click', function clickedItems() {
            for (let b = 0; b < ingredientsToPick.length; b++) {
                if (foodButtons[i].innerText === ingredientsToPick[b]) {
                    chosenIngredients.push(ingredientsToPick[b]);
        
                    //     let picOfChosen = document.createElement('img');
                    //      picOfChosen.innerHTML = foodButtons[i].style.backgroundImage;
                    //      console.log(picOfChosen);
                    //      workBoard.appendChild(picOfChosen)
                    // }
                }}
                ingredientsToPick.sort();
                chosenIngredients.sort();
                finalIngredients = [...new Set(chosenIngredients)]; //removes duplicates
                for (let i = 0; i < ingredientsToPick.length; i++) {
                    if (ingredientsToPick[i] === finalIngredients[i]) {
                        checkVal = true;//if every element in our new array is selected, 
                    } else {
                        checkVal = false;
                        i = ingredientsToPick.length;
                    }
                }
            
                if (checkVal === true && ingredientsToPick.length === finalIngredients.length) {
                    console.log ("checkval is running")
                    submitButton.style.opacity = 1;
                    submitButton.style.borderColor = "red";
                    submitButton.addEventListener('click', function addTip() {
                        submitButton.style.opacity = .7;
                        submitButton.style.borderColor = "white";
                        currentTip += 5;
                        chosenIngredients = [];
                        tiptext.innerText = (`Your Tip: $${currentTip}`);
                        play();
                    })

                }
            })
            
      
    }
}
// if (totalRounds < 6){


// }else{
//     table.innerText = "Great work! You have many happy customers, but lunch is around the corner. Would you like to continue at this pace, or work the lunch rush?"
// }



table.addEventListener('click', play);