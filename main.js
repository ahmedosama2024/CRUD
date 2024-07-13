let title =document.querySelector("#title");
let price =document.querySelector("#price");
let taxes =document.querySelector("#taxes");
let ads =document.querySelector("#ads");
let total =document.querySelector("#total");
let discount =document.querySelector("#discount");
let count =document.querySelector("#count");
let catageroy =document.querySelector("#catageroy");
let create =document.querySelector(".create");
let table =document.querySelector(".content")
let deleteAll=document.querySelector(".deleteAll");
let mood ='create';
let tmp;

//=================================================get total===========================================
function gettotal(){
    if(price.value !== '' && +price.value !== 0)
        {
            let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
            total.innerHTML= result;
            total.style.backgroundColor="#040";
        }else{
            total.innerHTML= "";
            total.style.backgroundColor="#a50707";
        }
}

//======================================================create product================================
//======================================================save local storge=============================
let products;
if(localStorage.products != null)
    {
        products=JSON.parse(localStorage.products);
    }else{
        products =[];
    }

create.addEventListener("click",()=>{
    let product = {
        id: 1,
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        catageroy: catageroy.value.toLowerCase(),
       
    }
    // ===============================================count&cleandata=======================================
    if( product.title !="" && product.price !="" && product.catageroy !="" && product.count<=100 )
        {
            if(mood ==='create'){
                if(product.count > 1){
                    for(let i=0; i < product.count ;i++)
                        {
                            products.push(product);
                        }    
                }else{
                    products.push(product);
                }
            }else{
                products[tmp]=product;
                mood ='create'
            }
            clearData();
        }else if(product.title =="" ){
            title.focus()
        }else if(product.price ==""){
            price.focus()
        }else if( product.catageroy ==""){
            catageroy.focus()
        }else{
            count.focus();
        }
    create.innerHTML='Create';
    count.style.display='block';
    count.style.transition= '0.5s';
    localStorage.setItem('products',JSON.stringify(products))
    read();
})

// =======================================================clear input======================================
function clearData(){
    title.value='';
    price.value= '';
    taxes.value='';
    ads.value='';
    discount.value='';
    count.value='';
    total.innerHTML='';
    catageroy.value='';
}

//===================================================== read================================================

function read(){
    gettotal();
    let tr=`
    <tr class="text-center">
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Taxes</th>
            <th>ADS</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Catageroy</th>
            <th>Update</th>
            <th>Delete</th>
        </tr>      
    `   
     for(let j=0 ; j<products.length; j++)
                {
                    tr += `
                    <tr class="text-center">
                        <td>${j+1}</td>
                        <td>${products[j].title}</td>
                        <td>${products[j].price}</td>
                        <td>${products[j].taxes}</td>
                        <td>${products[j].ads}</td>
                        <td>${products[j].discount}</td>
                        <td>${products[j].total}</td>
                        <td>${products[j].catageroy}</td>
                        <td><button onclick="update(${j})" class="update">Update</button></td>
                        <td><button onclick="deleteData(${j})" class="delete">Delete</button></td>
                    </tr>
                    `
                }
    
        table.innerHTML=tr;
        if(products.length > 0)
            {
                let all= `<button onclick="deleteAllData()">Delete ALL (${products.length})</button>`
                deleteAll.innerHTML=all;
            }else{
                deleteAll.innerHTML='';
            }
}
read();

//=============================================delete=======================================================
function deleteData(i){
    products.splice(i,1);
    localStorage.products =JSON.stringify(products);
    read();
}
//==========================================deleteAll========================================================
      
function deleteAllData(){
    products.splice(0,);
    localStorage.removeItem("products");
    read();
}

//==============================================update==================================================
function update(i){
    title.value = products[i].title;
    price.value = products[i].price;
    taxes.value = products[i].taxes;
    ads.value = products[i].ads;
    discount.value = products[i].discount;
    gettotal();
    count.style.transition= '0.5s';
    count.style.display="none";
    catageroy.value= products[i].catageroy;
    create.innerHTML='Update';
    mood ='update'
    tmp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}

//=================================================search================================================
    let search = document.querySelector("input[type='search']")
    let searchmood = 'title'
function searchitem(id){
    if(id == 'searchtitle'){
        search.placeholder='Search By Title'
        searchmood='title';

    }else{
        search.placeholder='Search By Category'
        searchmood='catagory';
    }
    search.focus();
    search.value="";
    read();
}
function searchData(value){
   let tr=`
    <tr class="text-center">
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Taxes</th>
            <th>ADS</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Catageroy</th>
            <th>Update</th>
            <th>Delete</th>
        </tr>      
    `   
    if( searchmood=="title")
        {
            for(let i=0 ; i<products.length ; i++){

                if(products[i].title.includes(value)){
                    
                            tr += `
                            <tr class="text-center">
                                <td>${i}</td>
                                <td>${products[i].title}</td>
                                <td>${products[i].price}</td>
                                <td>${products[i].taxes}</td>
                                <td>${products[i].ads}</td>
                                <td>${products[i].discount}</td>
                                <td>${products[i].total}</td>
                                <td>${products[i].catageroy}</td>
                                <td><button onclick="update(${i})" class="update">Update</button></td>
                                <td><button onclick="deleteData(${i})" class="delete">Delete</button></td>
                            </tr>
                            `
                }
            }
        }else{
            for(let i=0 ; i<products.length ; i++){

                if(products[i].catageroy.includes(value)){
                    
                            tr += `
                            <tr class="text-center">
                                <td>${i}</td>
                                <td>${products[i].title}</td>
                                <td>${products[i].price}</td>
                                <td>${products[i].taxes}</td>
                                <td>${products[i].ads}</td>
                                <td>${products[i].discount}</td>
                                <td>${products[i].total}</td>
                                <td>${products[i].catageroy}</td>
                                <td><button onclick="update(${i})" class="update">Update</button></td>
                                <td><button onclick="deleteData(${i})" class="delete">Delete</button></td>
                            </tr>
                            `
                }
            }
        }
        table.innerHTML=tr;
}

