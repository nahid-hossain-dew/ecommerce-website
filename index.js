let URL="./database/store.json";
let products=document.querySelector(".products");
let search =document.querySelector(".search");
let categories=document.querySelector(".all-categories");
// let allCategories=document.querySelector(".all-categories");
// console.log(allCategories);
// let allCats=[];


// let displayProduct= async ()=>{
//     let items= await fetch(URL);
//     let finalItems= await items.json();
//     finalItems.forEach(item => {

//     //  if(!allCats.includes(item.category)){
//     //     categories.innerHTML+=`<span class="category">${item.category}</span>`;
//     //     allCats.push(item.category);
       
//     //  }
   
     

//         products.innerHTML+=` <div class="product">
//         <div class="img-container">
//          <img src=${item.image} alt="">
//         </div>
//         <div class="details">
//             <h3 class="title">${item.title}</h3>
//             <h4 class="category">${item.category}</h4>
//             <p class="price">$ ${item.price}</p>
            

//         </div>
//         <div class="btn-container">
//             <button class="btn">Buy Now</button>
//         </div>`
//     })
//     categories.addEventListener("click",(e)=>{
//         let allCategories= finalItems.forEach((item)=>{
//             return item.category;
//             console.log(allCategories);
//         })
//        let selectedItem=e.target.innerHTML;
//        console.log(selectedItem);
//     });
// }

// displayProduct();


 fetch(URL)
     .then(response=>{
        return response.json();
     })
     .then( data =>{
        let displayProducts=(data)=>{
            // console.log(data)
         return products.innerHTML=data.map((x)=>{
           
            let {image,title,category,price}=x;
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
    let setCatogories=()=>{
      const allCategories=data.map((x)=>{
        return x.category;
    })
    const UniqueCategories=["All",...new Set(allCategories)];
    categories.innerHTML=UniqueCategories.map((category)=>{
        return `  <span class="category">${category}</span>`
    }).join("");
    }
    setCatogories();
    categories.addEventListener("click",(e)=>{
        
        let selectedItem=e.target.textContent;
        selectedItem==="All"?displayProducts(data):displayProducts(data.filter(item=>item.category===selectedItem)
          
        )
     })
     });


 

// //  create dynamic element
//      function items(append , value){
//      let div =document.createElement("div");
//         div.classList.add("product");

//         let {image,title,category,price}=value;

//         div.innerHTML=` <div class="img-container">
//         <img src="${image}" alt="">
//        </div>
//        <div class="details">
//            <h3 class="title">${title}</h3>
//            <h4 class="category">${category}</h4>
//            <p class="price">$${price}</p>
           
//            <div class="btn-container">
//            <button class="btn">Buy Now</button>
//        </div>
//        </div>
//       `
//         append.appendChild(div);
//      }
 
//      let doc=document.querySelectorAll(".product");
//      console.log(doc)

//      search.addEventListener("keyup",(e)=>{
//        const value=e.target.value.toUpperCase();

//         let items=document.querySelectorAll(".product");
//        console.log(items);
//         items.forEach((item)=>{
//             let title=item.querySelector(".title");

//             if(title.innerHTML.toLocaleUpperCase().indexOf(value) !==-1){
//                 item.style.display="initial";
//             }else{
//                 item.style.display="none";
//             }
//         })
//      });
 
