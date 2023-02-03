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
const submitButton = document.getElementById("buttonCell");
const tip = document.getElementById("tip");
const foodButtons = [bagel, tomato, lox, onion, avocado ,special, bacon, creamcheese, 
    swiss, egg, vegegg, usa, cheddar, pastrami, sprouts, capers]
const ingredientsToPick=[];
const chosenIngredients=[];
const workBoard = document.getElementById("current-ingredients");
const currentTip = 0;

const sandwiches = [
    {name:'The Classic', ingredients: ['Bagel', 'Cream Cheese', 'Lox', 'Tomato', 'Capers', 'Onion']},
    {name:'The Classic1', ingredients: ['Bagel', 'Cream Cheese', 'Lox', 'Tomato', 'Capers', 'Onion']},
    {name:'The Classic2', ingredients: ['Bagel', 'Cream Cheese', 'Lox', 'Tomato', 'Capers', 'Onion']}
]

//chooses a sandwich from the list, prints its name and ingredients
function chooseSandwich (){
    let choose = Math.floor(Math.random() * sandwiches.length);
    let choice = sandwiches [choose]; //picks sandwich, assigns to choice
    ingredientsToPick = choice.ingredients;
    const orderName = document.createElement('p');
    table.appendChild(orderName);
    orderName.innerText = (`${choice.name}:`);//grabs name from chosen sandwich
    const ingredients = document.createElement('ul'); //makes a new list of ingredients
    orderName.appendChild(ingredients); //adds it to the table 
    for (let i = 0; i < ingredientsToPick.length; i++){ //adds items to that list of ingredients
        let ingredient = document.createElement('li');
        ingredient.innerText = choice.ingredients[i]; //fills it with text 
        ingredients.appendChild(ingredient); //puts on screen
    }
}
//
function play(){
    table.innerText="";
    chooseSandwich();
    for (let i = 0; i < foodButtons.length; i++){ //checks chosen buttons against winning buttons and adds matching ones to new array
        foodButtons[i].addEventListener('click', function clickedItems(){
            for (let b = 0; b < ingredientsToPick.length; b++){
                if (foodButtons[i].innerText === ingredientsToPick[b]){
                    chosenIngredients.push(ingredientsToPick[b]);
                    let picOfChosen = document.createElement('img');
                    picOfChosen.innerHTML = foodButtons[i].style.backgroundImage;
                    workBoard.appendChild(picOfChosen)
                }
            }
        })
    }
    for (let i = 0; i < ingredientsToPick.length; i ++){
        if (ingredientsToPick[i].every(v => chosenIngredients.includes(v))) { //if every element in our new array is selected, 
            submitButton.style.opacity=1;
            submitButton.addEventListener('click', function addTip(){
                tip.innerText = (`Your tip: ${currentTip + 5}`);
            })
        }
    }
}
table.addEventListener('click', play);