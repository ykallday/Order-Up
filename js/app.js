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
const foodButtons = [bagel, tomato, lox, onion, avocado ,special, bacon, creamcheese, 
    swiss, egg, vegegg, usa, cheddar, pastrami, sprouts, capers]
let ingredientsToPick;


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
    const ingredients = document.createElement('ul');
    orderName.appendChild(ingredients);
    for (let i = 0; i < choice.ingredients.length; i++){
        let ingredient = document.createElement('li');
        ingredient.innerText = choice.ingredients[i];
        ingredients.appendChild(ingredient);
    }
}
for (let i = 0; i < foodButtons.length; i++){
    
}
//
function play(){
    table.innerText="";
    chooseSandwich();

    }
    

// }

}

table.addEventListener('click', play);