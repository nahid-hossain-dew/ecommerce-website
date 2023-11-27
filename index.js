let URL = "./database/store.json";
let products = document.querySelector(".products");
let search = document.querySelector(".search");
let categories = document.querySelector(".all-categories");



// ++++++data fetch from api++++++++++
fetch(URL)
    .then(response => {
        return response.json();
    })
    .then(data => {
        // +++++++display Products++++++=
        let displayProducts = (data) => {
            return products.innerHTML = data.map((x) => {
                let { id,image, title, category, price } = x;
                let search= basket.find((x)=> x.id === id);
                return `<div class="product">
             <div class="img-container">
              <img src="${image}" alt="">
             </div>
             <div class="details"> 
                 <h3 class="title">${title}</h3>
                 <h4 class="category">${category}</h4>
                    <div class="price-quantity">
                        <p class="price">$ ${price}</p>
                        <div class="quantity">
                            <i onclick="decrement(${id})"  class="fa-solid fa-minus"></i>
                            <div id="${id}">${search === undefined ? 0 : search.item }</div>
                            <i onclick="increment(${id})"  class="fa-solid fa-plus"></i>
                        </div>
                    </div>                
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
        // +++++++++added click event on categories+++++++++
        categories.addEventListener("click", (e) => {
            let selectedItem = e.target.textContent;
            selectedItem === "All" ? displayProducts(data) : displayProducts(data.filter(item => item.category === selectedItem)
            )
        })
        //    +++++++search product+++++++++
        let debounce=(func,delay=500)=>{
            let timeoutId;
           return function(...args){
            if(timeoutId){
                clearTimeout(timeoutId);
            }
             timeoutId = setTimeout(()=>{
                // console.log(this);
                    func.call(this,...args);
                },delay);
            
             
           } 
        }

    let searchProduct= (e) => {
           
        let value = e.target.value.toUpperCase();
        if (value) {
            displayProducts(data.filter((x) => x.title.toUpperCase().indexOf(value) !== -1))
        } else {
            displayProducts(data);
        }
    }


        search.addEventListener("input", debounce(searchProduct)) 
    });


// ++++++++ quantity functionality+++++++++=  
    let basket= JSON.parse(localStorage.getItem("data"))|| [] ;
    let increment=(id)=>{
       let selectedItem=id;
       let search=basket.find((x)=>x.id===selectedItem);
        if(search=== undefined){
            basket.push({
                id : selectedItem,
                item:1
               })
        }else{
            search.item+=1;
        }      
      update(selectedItem);
      localStorage.setItem("data",JSON.stringify(basket));
    }; 
    let decrement=(id)=>{
        let selectedItem=id;
        let search=basket.find((x)=>x.id===selectedItem);
        if(search=== undefined) return;
        else if(search.item=== 0) return;
        else{
             search.item -=1;
         }
         update(selectedItem);
         basket= basket.filter((x)=> x.item !== 0);
         localStorage.setItem("data",JSON.stringify(basket));
    };
    let update=(id)=>{
        let search = basket.find((x)=> x.id===id);       
        document.getElementById(id).innerHTML= search.item;
    };