
const h1 = (title, style) => {
    return `<h1 class="${style}">${title}</h1>`;
};
const h3 = (title, style) => {
    return `<h3 class="${style}">${title}</h3>`;
    };

const div = (name, type, ethnicity, style) => {
    return `<div class="${style}">
            ${h1(name, "h1--style")}
            ${h3(type, "h3--style")}
            ${h3(ethnicity, "h3--style")}
        </div>
    `;
    };

let foodFactory = (name, type, ethnicity) => {
    console.log(`${name}, ${type}, ${ethnicity},`);

    let factoryResults = div(name, type, ethnicity, "div--style");
        return `${factoryResults}`;
    };

let addFoodToSection = (item) => {
   console.log(item);
   document.querySelector("section").innerHTML += item;
};

fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food => {
            const foodAsHTML = foodFactory(food.name, food.type, food.ethnicity);
            addFoodToSection(foodAsHTML);
        });
    });