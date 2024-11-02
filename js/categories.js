const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

    // Mostrar el usuario en el NAVBAR
    let usuarioDisplay = document.getElementById("usuarioDisplay");
    let usuario = localStorage.getItem("correoUsuario");
    if (usuarioDisplay && usuario) {
        usuarioDisplay.textContent = usuario;
    }

function sortCategories(criteria, array) {
    let result = array.slice(); // Crea una copia del array
    if (criteria === ORDER_ASC_BY_NAME) {
        result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (criteria === ORDER_BY_PROD_COUNT) {
        result.sort((a, b) => parseInt(b.productCount) - parseInt(a.productCount));
    }
    return result;
}

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html";
}

function showCategoriesList() {
    let htmlContentToAppend = "";
    for (let category of currentCategoriesArray) {
        if (((minCount === undefined) || (parseInt(category.productCount) >= minCount)) &&
            ((maxCount === undefined) || (parseInt(category.productCount) <= maxCount))) {

            htmlContentToAppend += `
            <div onclick="setCatID(${category.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name}</h4>
                            <small class="text-muted">${category.productCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </div>
            `;
        }
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;
    if (categoriesArray) {
        currentCategoriesArray = categoriesArray;
    }
    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);
    showCategoriesList();
}

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(CATEGORIES_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCategoriesArray = resultObj.data;
            showCategoriesList();
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
        minCount = undefined;
        maxCount = undefined;
        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        minCount = parseInt(document.getElementById("rangeFilterCountMin").value) || undefined;
        maxCount = parseInt(document.getElementById("rangeFilterCountMax").value) || undefined;
        showCategoriesList();
    });
});