
  
  // var food_category = [
  //   {
  //     "name": "Burger",
  //     "image_category": "./component/CS251 Component/Food category/burger.svg"
  //   },
  //   {
  //     "name": "Chicken",
  //     "image_category": "./component/CS251 Component/Food category/chicken.svg"
  //   },
  //   {
  //     "name": "Taco",
  //     "image_category": "./component/CS251 Component/Food category/taco.svg"
  //   },
  //   {
  //     "name": "Fries",
  //     "image_category": "./component/CS251 Component/Food category/fries.svg"
  //   },
  //   {
  //     "name": "Dessert",
  //     "image_category": "./component/CS251 Component/Food category/dessert.svg"
  //   },
  //   {
  //     "name": "Drink",
  //     "image_category": "./component/CS251 Component/Food category/soda.svg"
  //   }
  // ]
  var promotion_data = [];
  var menu_data = [];

const logoutChange1 = document.getElementById('logoutIcon1');
const logoutChange2 = document.getElementById('logoutIcon2');

var toggleLogout = true;

logoutChange1.addEventListener('click', () => {

  if(toggleLogout){
    logoutChange1.style.transform = "rotate(180deg)";
    logoutChange2.style.display = 'flex';
    toggleLogout = false;
  }else{
    logoutChange1.style.transform = "rotate(0deg)";
    logoutChange2.style.display = 'none';
    toggleLogout = true;
  }
})

const categoryPopup = document.getElementById('categoryPopup');
const exitCategory = document.getElementById('exitCategory');
const saveCategory = document.getElementById('saveCategory');

function openPopupCategory () {
  categoryPopup.style.display = 'block';
  
  exitCategory.addEventListener('click', () => {
    categoryPopup.style.display = 'none';
  })

  saveCategory.addEventListener('click', () => {
    categoryPopup.style.display = 'none';
  })
}

const menuPopup = document.getElementById('menuPopup');
const exitMenu = document.getElementById('exitMenu');
const saveMenu = document.getElementById('saveMenu');

function openPopupMenu () {
  menuPopup.style.display = 'block';
  
  exitMenu.addEventListener('click', () => {
    menuPopup.style.display = 'none';
  })

  saveMenu.addEventListener('click', () => {
    menuPopup.style.display = 'none';
  })
}

const promotionPopup = document.getElementById('promotionPopup');
const exitPromotion = document.getElementById('exitPromotion');
const savePromotion = document.getElementById('savePromotion');

function openPopupPromotion () {
  promotionPopup.style.display = 'block';
  
  exitPromotion.addEventListener('click', () => {
    promotionPopup.style.display = 'none';
  })

  savePromotion.addEventListener('click', () => {
    promotionPopup.style.display = 'none';
  });
  

}

async function loadMenu(){
  await fetch("http://localhost:8080/api/menu")
  .then(response => {
    // Check if the response is successful (status code 200)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse the JSON response
    return response.json();
  })
  .then(data => {
    // Data retrieved successfully, do something with it
    console.log(data);
    data.forEach((dish)=>{
      menu_data.push(dish);
      console.log("Pushing ",dish.foodname);
      console.log("Menu data is" , menu_data);
    });
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('There was a problem with the fetch operation:', error);
  });

  await loadMenuCard();
}
loadMenu();

async function loadPromotion(){
  await fetch('http://localhost:8080/api/active/promotion')
  .then(response =>{
    if(!response.ok){
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data =>{
    data.forEach((promo)=>{
      promotion_data.push(promo);
    });
  })
  .catch(error =>{
    console.error("There was problem while fething promotion: ",error);
  });
  await loadPromoCard();
}
loadPromotion();


async function loadMenuCard(){
  await menu_data.forEach(elm=>{
   addMenuCard(elm);
  });
  await updateDeleteMenuButton();
}

async function loadPromoCard(){
  await promotion_data.forEach(elm=>{
    addPromoCard(elm);
  });
  await updateDeletePromoButton();
}
  

function addMenuCard(menudata){
  let container = document.getElementById("menuSlideCon");
  let card = `<div class="menu-card" id="menu-${menudata.foodname}">
    <div class="menu-card-con">
    <div class="menu-pic-container">
      <img src="./component/CS251 Component/HomeMenuDish/${menudata.foodname}.png"/>
    </div>
    <div class="menu-desc-con">
      <div class="menu-desc">
        <h3>${menudata.foodname}</h3>
        <h3 class="h3-qty" id="menu-${menudata.foodname}">QTY: ${menudata.amount}</h3>
        <h3><span class="dollar-sign">฿</span>:${menudata.price}</h3>
        <div class="member-edit-icon">
          <img src="./component/CS251 Component/icon/trash.png" id="del-${menudata.foodname}"/>
          <img src="./component/CS251 Component/icon/setting.png" id="edit-${menudata.foodname}"/>
        </div>
      </div>
    </div>
  </div>
</div>`
  container.innerHTML += card;
  
}
function addPromoCard(promodata){
  let container = document.getElementById('promotionSlideCon');
  let card = `<div class="promotion-card" id="promo-${promodata.promotion_Code}">
      <div class="promotion-add-pic">
        <img src="./component/CS251 Component/HomeMenuDish/${promodata.promotion_Code}.png" />
      <div class="promotion-card-con">
        <h3>${promodata.promotion_Name}</h3>
      <div class="member-edit-icon">
        <h3>${promodata.promotion_Expire}</h3>
        <img src="./component/CS251 Component/icon/trash.png" id="del-promo-${promodata.promotion_Code}"/>
        <img src="./component/CS251 Component/icon/setting.png" id="edit-promo-${promodata.promotion_Code}"/>
      </div>
    </div>
  </div>
</div>`
  container.innerHTML += card;
  console.log("Adding :",promodata.promotion_Name ,"!");
}

function updateDeleteMenuButton(){
  menu_data.forEach(elm =>{
    console.log("Updating ",elm.foodname);
    var button = document.getElementById(`del-${elm.foodname}`);
    button.addEventListener("click", function() {
      delDBMenu(elm).then((result)=>{
        if(result !== null){
          var del = document.getElementById(`menu-${elm.foodname}`);
          del.parentNode.removeChild(del);
          menu_data = menu_data.filter(item => item !== elm);
        }
        else{
          window.alert('Fail to delete the food');
        }
      });
    });
  });
}
function updateDeletePromoButton(){
  promotion_data.forEach(elm=>{
    let button = document.getElementById(`del-promo-${elm.promotion_Code}`);
    button.addEventListener("click", function(){
      delDBPromo(elm).then((result)=>{
        if (result != null) {
          let del = document.getElementById(`promo-${promodata.promotion_Code}`);
          del.parentNode.removeChild(del);
          promotion_data = promotion_data.filter(item => item != elm);
        }
        else{
          window.alert('Fail to delete promotion');
        }
      });
    });
  });
}

function delDBMenu(data){
  console.log(data);
  let url = `http://localhost:8080/api/delete/menu/${data.foodname}`;
  return fetch(url, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          // Add any other headers if required
      },
      
  })
  .then(response => {
      if (response.ok) {
          return response.json(); // Return parsed JSON for successful response
      } else if(response.status === 500){
        console.error('Network response was not ok');
          return null;
      }
      else{
          console.error('Network response was not ok');
          return null; // Return null for non-success response
      }
  })
  .catch(error => {
      console.error('Error:', error);
      //throw error; // Re-throw the error for further handling
  });

}
function delDBPromo(data){
  let url = `http://localhost:8080/api/delete/promotion/${data.promotion_Code}`
  return fetch(url,{
     method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if required
     },
  })
  .then(response =>{
    if(response.ok){
      return response.json();
    }
    else{
      console.error('Network response was not ok');
      return null;
    }

  })
  .catch(error=>{
    console.error('Error: ',error);
  })
}


function  DBaddMenuList(json){
  //   {
  //     "unit": "piece",
  //     "foodname": "Crispy Fish Taco",
  //     "amount": 42,
  //     "price": 110
  //    }
  let url = 'http://localhost:8080/api/add/menu';
  return fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          // Add any other headers if required
      },
      body: json,
  })
  .then(response => {
      if (response.ok) {
          return response.json(); // Return parsed JSON for successful response
      } else {
          console.error('Network response was not ok');
          return null; // Return null for non-success response
      }
  })
  .catch(error => {
      console.error('Error:', error);
      //throw error; // Re-throw the error for further handling
  });
}



function clearAddmenu(){
  let unit = document.getElementById("menu-unit");
  let foodname = document.getElementById("menu-foodname");
  let amount = document.getElementById("menu-amount");
  let price = document.getElementById("menu-price");
  unit.value="";
  foodname.value="";
  amount.value="";
  price.value="";
}
function addMenuList(){
 // console.log("Running!");
  let unit = document.getElementById("menu-unit");
  let foodname = document.getElementById("menu-foodname");
  let amount = document.getElementById("menu-amount");
  let price = document.getElementById("menu-price");
  let data = {
    "unit": unit.value,
    "foodname" : foodname.value,
    "amount" :parseInt(amount.value),
    "price": parseInt(price.value)
  }
  console.log(data);
  let jsondata = JSON.stringify(data);
  DBaddMenuList(jsondata).then(async (result)=>{
    if (result !== null){
      menu_data.push(data);
      await addMenuCard(data);
      console.log(menu_data);
      await updateDeleteMenuButton();
      
    }
    else{
      window.alert("Fail to add menu due to database");
    }
  });
}
function addPromoList(){

}



