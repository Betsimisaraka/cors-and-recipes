const baseEndpoint = "http://www.recipepuppy.com/api";
const proxy = 'https://cors-anywhere.herokuapp.com/';
const form = document.querySelector('.search');
const recipesEl = document.querySelector('.recipes');
const ingCheckboxes = Array.from(form.querySelectorAll('[type="checkbox"]'))

async function fetchRecipes(query, ingredients) {
    const ingredientString = ingredients.join(",");
    const res = await fetch(`${proxy}${baseEndpoint}?q=${query}&i=${ingredientString}`);
    console.log(`${baseEndpoint}?q=${query}&i=${ingredientString}`);
    const data = await res.json();
    return data;
}

const handleSubmit = async event => {
    event.preventDefault();
    const el = event.currentTarget;
    fetchAndDisplay(el.query.value);
}

async function fetchAndDisplay(query) {
    //turn the form off
    form.submit.disabled = true;
    //submit the search
    let ingredients = [];
    ingCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            ingredients.push(checkbox.name);
        }
    })
    const recipes = await fetchRecipes(query, ingredients);
     //turn the form on
    form.submit.disabled = false;
    console.log(recipes);
    displayRecipes(recipes.results);
}

function displayRecipes(recipes) {
    const html = recipes.map(recipe => {
        return `
            <div class="recipe">
                <h2>${recipe.title}</h2>
                <p>${recipe.ingredients}</p>
                ${recipe.thumbnail && 
                    `<img src="${recipe.thumbnail}" 
                    alt="${recipe.thumbnail}"`}
                <a href="${recipe.href}">View Recipe -></a>
            </div>
        `;
    });
    recipesEl.innerHTML = html.join('');
}

form.addEventListener('submit', handleSubmit);

fetchAndDisplay('pizza');