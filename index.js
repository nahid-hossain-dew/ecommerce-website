let URL = "./database/store.json";
let products = document.querySelector(".products");
let search = document.querySelector(".search");
let categories = document.querySelector(".all-categories");

fetch(URL)
    .then(response => {
        return response.json();
    })
    .then(data => {
        // +++++++display Products++++++=
        let displayProducts = (data) => {
            return products.innerHTML = data.map((x) => {
                let { image, title, category, price } = x;
                return `<div class="product">
             <div class="img-container">
              <img src="${image}" alt="">
             </div>
             <div class="details">
                 <h3 class="title">${title}</h3>
                 <h4 class="category">${category}</h4>
                 <p class="price">$ ${price}</p>
             </div>
             <div class="btn-container">
                 <button class="btn">Buy Now</button>
             </div>            
         </div>`
            }).join("");
        }
        displayProducts(data);
    // +++++++++display categories++++++++++
        let setCatogories = () => {
            const allCategories = data.map((x) => {
                return x.category;
            })
            const UniqueCategories = ["All", ...new Set(allCategories)];
            categories.innerHTML = UniqueCategories.map((category) => {
                return `  <span class="category">${category}</span>`
            }).join("");
        }
        setCatogories();
        categories.addEventListener("click", (e) => {
            let selectedItem = e.target.textContent;
            selectedItem === "All" ? displayProducts(data) : displayProducts(data.filter(item => item.category === selectedItem)
            )
        })
    });
