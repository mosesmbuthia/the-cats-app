
const factForm = document.getElementById("fact-form");
const factInput = document.getElementById("factInput");
const display = document.getElementById("display");
const errorDisplay = document.getElementById("error-display");
const imageForm = document.getElementById("image-form");
const imageInput = document.getElementById("imageInput");
const loading = document.getElementById("loading");

factForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    display.innerHTML = "";
    errorDisplay.textContent = ""; 
    loading.style.display = "block";

    const limit = parseInt(factInput.value) || 1;
    
    if (limit < 1 || limit > 50) {
        errorDisplay.textContent = "There was an error. Please try again later";
        loading.style.display = "none";
        return;
    }

    try {
        const response = await fetch(`https://meowfacts.herokuapp.com/?count=${limit}`);
        const data = await response.json();
        
        let listHTML = "<ol>";
        data.data.forEach((fact) => {
            listHTML += `<li>${fact}</li>`;
        });
        listHTML += "</ol>";

        setTimeout(() => {
            display.innerHTML = listHTML;
            loading.style.display = "none"; 
        }, 2000);


        // display.innerHTML = listHTML;
    } catch (error) {
        errorDisplay.textContent = "There was an error. Please try again later.";
        loading.style.display = "none"
        console.error(error);
    }
});


imageForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    display.innerHTML = "";
    errorDisplay.textContent = ""; 
    loading.style.display = "block";

    const limit = parseInt(imageInput.value) || 1;

    if (limit < 1 || limit > 10) {
        errorDisplay.textContent = "There was an error. Please try again later.";
        loading.style.display = "none";
        return;
    }

    try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${limit}`);
        const data = await response.json();

        let imagesHTML = `<div class="imgCat">`;
        data.forEach((cat) => {
            if (cat.url) {
                imagesHTML += `<img src="${cat.url}" alt="cat" width="200" height="200" style="object-fit: cover;">`;
            }
        });
        imagesHTML += "</div>";

        setTimeout(() => {
            display.innerHTML = imagesHTML;
            loading.style.display = "none"; 
        }, 2000);

        // display.innerHTML = imagesHTML;
    } catch (error) {
        errorDisplay.textContent = "There was an error. Please try again later.";
        loading.style.display = "none";
        console.error(error);
    }
});
