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
const tip = document.getElementById("tip");
const foodButtons = [bagel, tomato, lox, onion, avocado ,special, bacon, creamcheese, 
    swiss, egg, vegegg, usa, cheddar, pastrami, sprouts, capers];
let ingredientsToPick=[];
let chosenIngredients=[];
const workBoard = document.getElementById("current-ingredients");
let currentTip = 0;

const sandwiches = [
    {name:'The Classic', ingredients: ['Bagel', 'Cream Cheese', 'Lox', 'Tomato', 'Capers', 'Onion']},
    {name:'The Classic1', ingredients: ['Bagel', 'Cream Cheese', 'Lox', 'Tomato', 'Capers', 'Onion']},
    {name:'The Classic2', ingredients: ['Bagel', 'Cream Cheese', 'Lox', 'Tomato', 'Capers', 'Onion']}
]

//chooses a sandwich from the list, prints its name and ingredients
function chooseSandwich (){
    let choose = Math.floor(Math.random() * sandwiches.length);
    console.log(choose);
    let choice = sandwiches[choose]; //picks sandwich, assigns to choice
    ingredientsToPick = choice.ingredients;
    console.log("Ingredients to pick" + ingredientsToPick);
    let orderName = document.createElement('p');
    table.appendChild(orderName);
    orderName.innerText = (`${choice.name}:`);//grabs name from chosen sandwich
    let ingredients = document.createElement('ul'); //makes a new list of ingredients
    orderName.appendChild(ingredients); //adds it to the table 
    for (let i = 0; i < ingredientsToPick.length; i++){ //adds items to that list of ingredients
        let ingredient = document.createElement('li');
        ingredient.innerText = ingredientsToPick[i]; //fills it with text 
        ingredients.appendChild(ingredient); //puts on screen
    }
   
}



function play(){
    table.innerText="";
    chooseSandwich();
    for (let i = 0; i < foodButtons.length; i++){ //checks chosen buttons against winning buttons and adds matching ones to new array
        foodButtons[i].addEventListener('click', function clickedItems(){
            for (let b = 0; b < ingredientsToPick.length; b++){
                if (foodButtons[i].innerText === ingredientsToPick[b]){
                    chosenIngredients.push(ingredientsToPick[b]);
                    console.log ("Chosen Ingredients " +   chosenIngredients);
                    // let picOfChosen = document.createElement('img');
                    // picOfChosen.innerHTML = foodButtons[i].style.backgroundImage;
                    // workBoard.appendChild(picOfChosen)
                }
            }
            ingredientsToPick.sort();
            chosenIngredients.sort();
            console.log ("Ingredients to pick " + ingredientsToPick);
            console.log ("Chosen Ingredients " +   chosenIngredients);
            let checkVal = true;
            for (let i = 0; i < ingredientsToPick.length; i ++){
                if (ingredientsToPick[i] === chosenIngredients[i]) { 
                    checkVal = true;//if every element in our new array is selected, 
            }else{
                    checkVal = false;
                    i = ingredientsToPick.length;
            }}
            if (checkVal){    
                submitButton.addEventListener('click', function addTip(){
                    tip.innerText = (`Your tip: ${currentTip + 5}`);
                })
        
            }
        })
    }
  
    
}

table.addEventListener('click', play);