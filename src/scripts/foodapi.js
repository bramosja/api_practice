fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    let productDetails = grabInfo(productInfo.product.ingredients_text, productInfo.product.countries, productInfo.product.serving_quantity, productInfo.product.nutriments.fat, productInfo.product.nutriments.sugars);
            const foodAsHTML = foodFactory(food.name, food.type, food.ethnicity, productDetails);
            addFoodToSection(foodAsHTML);
                });
        });
    });

const h1 = (title, style) => {
    return `<h1 class="${style}">${title}</h1>`;
};
const h3 = (title, style) => {
    return `<h3 class="${style}">${title}</h3>`;
};

const p = (ingredients, country, calories, fat, sugar) => {
    return `<p>${ingredients}, ${country}, ${calories}, ${fat}, ${sugar}.</p>`;
}


const div = (name, type, ethnicity, infoString, style) => {
    return `<div class="${style}">
            ${h1(name, "h1--style")}
            ${h3(type, "h3--style")}
            ${h3(ethnicity, "h3--style")}
            ${p(infoString)}
        </div>
    `;
};

let foodFactory = (name, type, ethnicity, infoString) => {
    let factoryResults = div(name, type, ethnicity, infoString, "div--style");
        return `${factoryResults}`;
    };

let addFoodToSection = (item) => {
   document.querySelector("section").innerHTML += item;
};

let grabInfo = (ingredients, country, calories, fat, sugar) => {
    return `${ingredients}, ${country}, ${calories}, ${fat}, ${sugar}.`;
};



