
  
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
  .then(async data =>{
    console.log("Get data promo",data);
    Promise.all(data.map(async (promo) => {
      const menuPromo = await loadMenuPromo(promo.promotion_Code);
      promotion_data.push([promo, menuPromo]);
      console.log("Pushing Pro data ", [promo, menuPromo]);
  })).then(() => {
      loadPromoCard();
  });
    
  })
  .catch(error =>{
    console.error("There was problem while fething promotion: ",error);
  });

}
loadPromotion();

function loadMenuPromo(promoCode){
  let url = `http://localhost:8080/api/menuhavepromo/${promoCode}`;
  console.log("Fetching url:",url);
  return fetch(url)
  .then(res => {
    if (res.ok){
      return res.json();
    }
    else{
      return null;
    }
  }).then(
    data => {return data;}
  )
  .catch(err =>{console.error(err);});
}


async function loadMenuCard(){
  for(const elm of menu_data){
    await addMenuCard(elm);
    await addEditMenuCard(elm);
  }
   
  await updateDeleteMenuButton();
  await updateEditMenuButton();
 
}

async function loadPromoCard(){
  for(const elm of promotion_data){
    await addMenuCard(elm);
  }
   
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
function addPromoCard(promodata_array){
  function formatDate(inputDate) {
    // Parse the input date string
    const date = new Date(inputDate);
    
    // Extract day, month, and year components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Adding 1 because months are zero-based
    const year = date.getFullYear();
    
    // Format components as DD/MM/YYYY
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    
    return formattedDate;
}
 let [promodata,promoMenu] = promodata_array;
  let promoformatdate = formatDate(promodata.promotion_Expire);
  let container = document.getElementById('promotionSlideCon');
  let card = `<div class="promotion-card" id="promo-${promodata.promotion_Code}">
      <div class="promotion-add-pic">
        <img src="./component/CS251 Component/HomeMenuDish/${promodata.promotion_Code}.png" />
      <div class="promotion-card-con">
        <h3>${promodata.promotion_Name}</h3>
      <div class="member-edit-icon">
        <h3>${promoformatdate}</h3>
        <img src="./component/CS251 Component/icon/trash.png" id="del-promo-${promodata.promotion_Code}"/>
        <img src="./component/CS251 Component/icon/setting.png" id="edit-promo-${promodata.promotion_Code}"/>
      </div>
    </div>
  </div>
</div>`
  container.innerHTML += card;
  console.log("Adding :",promodata.promotion_Name ,"!");
}

var countEditFood = 0;

function addEditMenuCard(data) {

  // let data = {
  //   "unit": unit.value,
  //   "foodname" : foodname.value,
  //   "amount" :parseInt(amount.value),
  //   "price": parseInt(price.value)
  // }

  let unit = data.unit;
  let foodname = data.foodname;
  let amount = data.amount;
  let price = data.price;
  
  let card = `
              <div class="menu-popup" style="display: none;" id="menuEditPopup${foodname}">
                <div class="menu-popup-container">
                  <div class="menu-popup-top">
                    <h3>Dish ${++countEditFood}</h3>
                    <div class="exit" id="exitMenu${foodname}">X</div>
                  </div>
                    <div class="menu-info-name">
                      <p>Dish Name</p>
                      <input type="text" id="menuFoodname${foodname}" value="${foodname}">
                    </div>
                    <div class="menu-info-desc">
                      <p>Unit</p>
                      <input type="text" id="menuUnit${foodname}" value="${unit}">
                    </div>
                    <div class="menu-info-price-qty">
                      <div class="menu-info-price">
                        <h4>Price</h4>
                        <input type="text" id="menuPrice${foodname}" value="${price}">
                      </div>
                      <div class="menu-info-qty">
                        <h4>QTY</h4>
                        <input type="text" id="menuAmount${foodname}" value="${amount}">
                      </div>
                    </div>
                    
                    <div class="menu-popup-bottom">
                      <div class="menu-popup-bottom-pic">
                        <p>Add Photo</p>
                        <img src="./component/CS251 Component/icon/image.png">
                      </div>
                        <button type="button" id="saveEditMenu${foodname}">SAVE</button>
                    </div>
                  </div>
                </div>
              </div>
  `;

  let menuEditPopupContainer = document.getElementById('menuEditPopupContainer');
  menuEditPopupContainer.innerHTML += card;
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
        if (result !== null) {
          let del = document.getElementById(`promo-${elm.promotion_Code}`);
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
function updateEditMenuButton(){
  menu_data.forEach(elm=>{
    let button = document.getElementById(`edit-${elm.foodname}`);
    button.addEventListener('click', () => {
      console.log(elm.foodname + "edit access");
      let popup = document.getElementById(`menuEditPopup${elm.foodname}`);
      popup.style.display = 'block';

      let exit = document.getElementById(`exitMenu${elm.foodname}`);
      exit.addEventListener('click', () => {
      popup.style.display = 'none';
      });

      let save = document.getElementById(`saveEditMenu${elm.foodname}`);
      save.addEventListener('click', () => {
        console.log('save success!! ' + elm.foodname);
        saveEditMenu(elm.foodname);
      });

    });
  });
}

function saveEditMenu(foodname) {

  // let data = {
  //   "unit": unit.value,
  //   "foodname" : foodname.value,
  //   "amount" :parseInt(amount.value),
  //   "price": parseInt(price.value)
  // }

  let unit = document.getElementById(`menuUnit${foodname}`).value;
  let foodname = document.getElementById(`menuFoodname${foodname}`).value;
  let amount = document.getElementById(`menuAmount${foodname}`).value;
  let price = document.getElementById(`menuPrice${foodname}`).value;

  let data = {
    "unit": unit,
    "foodname" : foodname,
    "amount" :amount,
    "price": price
  }

  let json = JSON.stringify(data);
  console.log(json);

  EditDBMenu(json, foodname).then(res=> {
    if(res !== null){
      console.log('edit complete!!');
    }else{
      window.alert("Failure due to edit Menu database error");
    }
  });

  let popup = document.getElementById(`menuEditPopup${elm.foodname}`);
  popup.style.display = 'none';

}

function EditDBMenu(json, foodname){
  let url = `http://localhost:8080/api/update/menu/${foodname}`;
  
  // กำหนด request headers และ body ด้วย JSON.stringify(json)
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: json
  };

  // ส่ง request โดยใช้ fetch API
  return fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        return null;
      }
      return response.json();
    })
    .then(data => {
      console.log('Menu updated successfully:', data);
      return data;
      // จัดการกับการอัปเดตข้อมูลต่อไปเมื่อทำสำเร็จ
    })
    .catch(error => {
      console.error('Error updating Menu:', error);
      // จัดการกับข้อผิดพลาดที่เกิดขึ้น
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
      await menu_data.push(data);
      await addMenuCard(data);
      console.log(menu_data);
      await updateDeleteMenuButton();
      // await updateEditMenuButton();
      
    }
    else{
      window.alert("Fail to add menu due to database");
    }
  });
}
function addPromoList(){

}

