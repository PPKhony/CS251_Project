const promotionSlider = document.getElementById('promotionSlideCon');
let pisDown = false;
let pstartX;
let pscrollLeft;

promotionSlider.addEventListener('mousedown', (e) => {
    pisDown = true;
    pstartX = e.pageX - promotionSlider.offsetLeft;
    pscrollLeft = promotionSlider.scrollLeft;
});

promotionSlider.addEventListener('mouseleave', () => {
    pisDown = false;
});

promotionSlider.addEventListener('mouseup', () => {
    pisDown = false;
});

promotionSlider.addEventListener('mousemove', (e) => {
    if (!pisDown) return;
    e.preventDefault();
    const x = e.pageX - promotionSlider.offsetLeft;
    const walk = (x - pstartX) * 1; // Adjust scroll speed
    promotionSlider.scrollLeft = pscrollLeft - walk;
});

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

const logoutChange1 = document.getElementById("logoutIcon1");
const logoutChange2 = document.getElementById("logoutIcon2");

var toggleLogout = true;

logoutChange1.addEventListener("click", () => {
  if (toggleLogout) {
    logoutChange1.style.transform = "rotate(180deg)";
    logoutChange2.style.display = "flex";
    toggleLogout = false;
  } else {
    logoutChange1.style.transform = "rotate(0deg)";
    logoutChange2.style.display = "none";
    toggleLogout = true;
  }
});

const categoryPopup = document.getElementById("categoryPopup");
const exitCategory = document.getElementById("exitCategory");
const saveCategory = document.getElementById("saveCategory");

function openPopupCategory() {
  categoryPopup.style.display = "block";

  exitCategory.addEventListener("click", () => {
    categoryPopup.style.display = "none";
  });

  saveCategory.addEventListener("click", () => {
    categoryPopup.style.display = "none";
  });
}

const menuPopup = document.getElementById("menuPopup");
const exitMenu = document.getElementById("exitMenu");
const saveMenu = document.getElementById("saveMenu");

function openPopupMenu() {
  menuPopup.style.display = "block";

  exitMenu.addEventListener("click", () => {
    menuPopup.style.display = "none";
  });

  saveMenu.addEventListener("click", () => {
    menuPopup.style.display = "none";
  });
}

const promotionPopup = document.getElementById("promotionPopup");
const exitPromotion = document.getElementById("exitPromotion");
const savePromotion = document.getElementById("savePromotion");

async function openPopupPromotion() {
  promotionPopup.style.display = "block";

  exitPromotion.addEventListener("click", () => {
    promotionPopup.style.display = "none";
  });

  savePromotion.addEventListener("click", () => {
    promotionPopup.style.display = "none";
  });
}

async function loadMenu() {
  await fetch("http://localhost:8080/api/menu")
    .then((response) => {
      // Check if the response is successful (status code 200)
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Parse the JSON response
      return response.json();
    })
    .then((data) => {
      // Data retrieved successfully, do something with it
      console.log(data);
      data.forEach((dish) => {
        menu_data.push(dish);
        console.log("Pushing ", dish.foodname);
        console.log("Menu data is", menu_data);
      });
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("There was a problem with the fetch operation:", error);
    });

  await loadMenuCard();
}
loadMenu();

async function loadPromotion() {
  await fetch("http://localhost:8080/api/active/promotion")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(async (data) => {
      console.log("Get data promo", data.promotion_Name);
      Promise.all(
        data.map(async (promo) => {
          const menuPromo = await loadMenuPromo(promo.promotion_Code);
          promotion_data.push([promo, menuPromo]);
          console.log("Pushing Pro data ", [promo, menuPromo]);
        })
      ).then(() => {
        loadPromoCard();
      });
    })
    .catch((error) => {
      console.error("There was problem while fething promotion: ", error);
    });
}
loadPromotion();

function loadMenuPromo(promoCode) {
  let url = `http://localhost:8080/api/menuhavepromo/${promoCode}`;
  console.log("Fetching url:", url);
  return fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return null;
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
}

async function loadMenuCard() {
  for (const elm of menu_data) {
    await addMenuCard(elm);
    await addEditMenuCard(elm);
  }

  await updateDeleteMenuButton();
  await updateEditMenuButton();
  // await menu_data.forEach(elm => {
  //   addCardItemMenuPromoAdd(elm);
  // });
  for (elm of menu_data){
    await addCardItemMenuPromoAdd(elm);
  }
  await updateButtonPromoMenu();
}

async function loadPromoCard() {
  for (const elm of promotion_data) {
    await addPromoCard(elm);
    await addEditPromoCard(elm);
  }

  await updateDeletePromoButton();
   //await updateEditPromoButton();
}

function addMenuCard(menudata) {
  let container = document.getElementById("menuSlideCon");
  let card = `<div class="menu-card" id="menu-${menudata.foodname}">
    <div class="menu-card-con">
    <div class="menu-pic-container">
      <img src="./component/CS251 Component/HomeMenuDish/${menudata.foodname}.png"/>
    </div>
    <div class="menu-desc-con">
      <div class="menu-desc">
        <h3 id="foodname${menudata.foodname}">${menudata.foodname}</h3>
        <h3 class="h3-qty" id="menu-${menudata.foodname}">QTY: ${menudata.amount}</h3>
        <h3 id="menuCardPrice${menudata.foodname}"><span class="dollar-sign">฿</span>:${menudata.price}</h3>
        <div class="member-edit-icon">
          <img src="./component/CS251 Component/icon/trash.png" id="del-${menudata.foodname}"/>
          <img src="./component/CS251 Component/icon/setting.png" id="edit-${menudata.foodname}"/>
        </div>
      </div>
    </div>
  </div>
</div>`;
  container.innerHTML += card;
}

function addPromoCard(promodata_array) {
  console.log(promodata_array);
  function formatDate(inputDate) {
    // Parse the input date string
    const date = new Date(inputDate);

    // Extract day, month, and year components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Adding 1 because months are zero-based
    const year = date.getFullYear();

    // Format components as DD/MM/YYYY
    const formattedDate = `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;

    return formattedDate;
  }
  let [promodata, promoMenu] = promodata_array;
  let promoformatdate = formatDate(promodata.promotion_Expire);
  promoformatdate = promoformatdate.slice(0, 10);
  
  let card = `<div class="promotion-card" id="promo-${promodata.promotion_Code}">
                <div class="promotion-add-pic">
                  <img src="./component/CS251 Component/HomeMenuDish/${promodata.promotion_Code}.png" />
                    <div class="promotion-card-con">
                      <h3>${promodata.promotion_Name}</h3>
                      <div class="member-edit-icon">
                        <h3>${promoformatdate}</h3>
                        <img src="./component/CS251 Component/icon/trash.png" id="del-promo-${promodata.promotion_Code}"/>
                      </div>
                    </div>
                  </div>
                </div>`;

  // <img src="./component/CS251 Component/icon/setting.png" id="edit-promo-${promodata.promotion_Code}"/>

  let container = document.getElementById("promotionSlideCon");              
  container.innerHTML += card;
  console.log("Adding :", promodata.promotion_Name, "!");
}

async function addEditPromoCard(data_array) {
  // let data = {
  //   "promotionName": promotionName.value,
  //   "promotionCode" : promotionCode.value,
  //   "promotionExpired" :parseInt(promotionExpired.value),
  //   "promotionPrice": parseInt(promotionPrice.value)
  // }

  // private String Promotion_Name;
  //   private double Promotion_Price;
  //   private String Promotion_Code;
  //   private Timestamp Promotion_Expire;

  let [data, menus] = data_array

  let promotionName = data.promotion_Name;
  let promotionCode = data.promotion_Code;
  let promotionExpired = data.promotion_Expire;
  let promotionPrice = data.promotion_Price;


  let card = `
              <div class="promotion-popup" style="display: none;" id="promotionPopup${promotionCode}">
                <div class="promotion-popup-container">
                  <div class="promotion-popup-top">
                    <h3>Promotion #10</h3>
                    <div class="exit" id="exitPromotion${promotionCode}">X</div>
                  </div>
                  <div class="promotion-info-name">
                    <p>Promotion Name</p>
                    <input type="text" id="promotionName${promotionCode}" value="${promotionName}">
                  </div>
                  <div class="promotion-info-code">
                    <p>Promotion Code</p>
                    <input type="text" id="promotionCode${promotionCode}" value="${promotionCode}">
                  </div>
                  <div class="promotion-info-exp-price">
                    <div class="promotion-info-exp">
                      <h4>EXP</h4>
                      <input type="text" id="promotionExpired${promotionCode}" value="${promotionExpired}">
                    </div>
                    <div class="promotion-info-price">
                      <h4>Price</h4>
                      <input type="text" id="promotionPrice${promotionCode}" value="${promotionPrice}">
                    </div>
                  </div>
                    <div class="promotion-item">
                      <div class="promotion-item-container">
                        <div class="promotion-item-con">

                          <div class="item-add-con">
                            <div class="item-qty">
                              <h2>Item: <span id="itemCount${promotionCode}">0</span></h2>
                            </div>

                            <button type="button">ADD</button>
                          </div>
                        
                          <div class="qty-item-container" id="itemSlideCon${promotionCode}">

                          </div>

                        </div>
                      </div>
                    </div>

                <div class="promotion-popup-bottom">
                  <div class="promotion-popup-bottom-pic">
                    <p>Add Photo</p>
                    <img src="./component/CS251 Component/icon/image.png">
                  </div>
                  <button type="button" id="savePromotion${promotionCode}">SAVE</button>
                </div>
              </div>
            </div>
  `;

  let promotionEditPopupContainer = document.getElementById(
    "promotionEditPopupContainer"
  );
  promotionEditPopupContainer.innerHTML += card;

  await new Promise((resolve) => setTimeout(resolve, 0));

  // private String unit;
  //   private String foodname;
  //   private int amount;
  //   private double price;

  menus.forEach(elm => {
    addCardItemMenuPromo(elm, promotionCode);
  });


}

function addCardItemMenuPromo (item, promoCode) {

  let unit = item.unit;
  let amount = item.amount;
  let price = item.price;
  let foodname = item.foodname;

  let cardItem = `
                  <div class="item-card" id="item-card-${foodname}">
                    <div class="item-card-con">
                      <div class="item-card-pic-container">
                        <img src="./component/CS251 Component/HomeMenuDish/${foodname}">
                      </div>
                      <h3 id="name-item-${foodname}">${foodname}</h3>
                      <h3 id="count-item-${foodname}" class="count-item">${0}</h3>
                      <h3 id="price-item-${foodname}" class="price-item">${price}</h3>
                      <h3 id="qty-item-${foodname}">QTY:${amount}</h3>
                      <h3 id="add-item-${foodname}" class="add-item-icon">+</h3>
                      <h3 id="rm-item-${foodname}" class="rm-item-icon">-</h3>
                      <img id="rm-all-item-${foodname}" src="./component/CS251 Component/icon/trash.png" class="item-bin">
                    </div>
                  </div>
  `;

  let itemSlideCon = document.getElementById(`itemSlideCon${promoCode}`);
  itemSlideCon.innerHTML += cardItem;

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

  let menuEditPopupContainer = document.getElementById(
    "menuEditPopupContainer"
  );
  menuEditPopupContainer.innerHTML += card;
}

function updateDeleteMenuButton() {
  menu_data.forEach((elm) => {
    console.log("Updating ", elm.foodname);
    var button = document.getElementById(`del-${elm.foodname}`);
    button.addEventListener("click", function () {
      delDBMenu(elm).then(async (result) => {
        if (result !== null) {
          var del = document.getElementById(`menu-${elm.foodname}`);
          await del.parentNode.removeChild(del);
          menu_data = menu_data.filter((item) => item !== elm);
          await new Promise((resolve) => setTimeout(resolve, 0));
          console.log("removing node ",elm.foodname);
          let delPromo = document.getElementById(`item-card-${elm.foodname}`);
          await delPromo.parentNode.removeChild(delPromo);
          console.log("remove done :",elm.foodname);
         // await updateButtonPromoMenu();
        } else {
          window.alert("Fail to delete the food");
        }
      });
    });
  });
}

function updateDeletePromoButton() {
  promotion_data.forEach((elm_array) => {
    let [elm,elm_menu] = elm_array;
    console.log("Updating ", elm.promotion_Code);
    let button = document.getElementById(`del-promo-${elm.promotion_Code}`);
    button.addEventListener("click", function () {
      delDBPromo(elm).then((result) => {
        if (result !== null) {
          let del = document.getElementById(`promo-${elm.promotion_Code}`);
          del.parentNode.removeChild(del);
          promotion_data = promotion_data.filter((item) => item != elm);
          
        } else {
          window.alert("Fail to delete promotion");
        }
      });
    });
  });
}
function updateEditMenuButton() {
  menu_data.forEach((elm) => {
    let button = document.getElementById(`edit-${elm.foodname}`);
    button.addEventListener("click", () => {
      console.log(elm.foodname + "edit access");
      let popup = document.getElementById(`menuEditPopup${elm.foodname}`);
      popup.style.display = "block";

      let exit = document.getElementById(`exitMenu${elm.foodname}`);
      exit.addEventListener("click", () => {
        popup.style.display = "none";
      });

      let save = document.getElementById(`saveEditMenu${elm.foodname}`);
      save.addEventListener("click", () => {
        console.log("save success!! " + elm.foodname);
        saveEditMenu(elm.foodname);
      });
    });
  });
}
function clearAddpromoList(){
  for (menu of menu_data){
    let promoMenuhtml = document.getElementById(`count-item-${menu.foodname}`);
    promoMenuhtml.textContent = "0";
  }
}

function saveEditMenu(foodname) {
  let unit = document.getElementById(`menuUnit${foodname}`).value;
  let amount = document.getElementById(`menuAmount${foodname}`).value;
  let price = document.getElementById(`menuPrice${foodname}`).value;

  let data = {
    unit: unit,
    foodname: foodname,
    amount: amount,
    price: price,
  };

  let json = JSON.stringify(data);
  console.log(json);

  EditDBMenu(json, foodname).then((res) => {
    if (res !== null) {
      console.log("edit complete!!");
      // document.getElementById(`foodname${foodname}`).textContent = foodname;
      // document.getElementById(`menu-${foodname}`).textContent = `QTY: ${amount}`;
      // document.getElementById(`menuCardPrice${foodname}`).textContent = `:${price}`;
    } else {
      window.alert("Failure due to edit Menu database error");
    }
  });

  let popup = document.getElementById(`menuEditPopup${foodname}`);
  popup.style.display = "none";

  document.getElementById(`menuUnit${foodname}`).value = unit;
  document.getElementById(`menuFoodname${foodname}`).value = foodname;
  document.getElementById(`menuAmount${foodname}`).value = amount;
  document.getElementById(`menuPrice${foodname}`).value = price;

  // <h3>${menudata.foodname}</h3>
  //       <h3 class="h3-qty" id="menu-${menudata.foodname}">QTY: ${menudata.amount}</h3>
  //       <h3><span class="dollar-sign">฿</span>:${menudata.price}</h3>


  //idk what to do
}

function EditDBMenu(json, foodname) {
  let url = `http://localhost:8080/api/update/menu/${foodname}`;

  // กำหนด request headers และ body ด้วย JSON.stringify(json)
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  };

  // ส่ง request โดยใช้ fetch API
  return fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        return null;
      }
      return response.json();
    })
    .then((data) => {
      console.log("Menu updated successfully:", data);
      return data;
      // จัดการกับการอัปเดตข้อมูลต่อไปเมื่อทำสำเร็จ
    })
    .catch((error) => {
      console.error("Error updating Menu:", error);
      // จัดการกับข้อผิดพลาดที่เกิดขึ้น
    });
}

function delDBMenu(data) {
  console.log(data);
  let url = `http://localhost:8080/api/delete/menu/${data.foodname}`;

  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // Add any other headers if required
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Return parsed JSON for successful response
      } else if (response.status === 500) {
        console.error("Network response was not ok");
        return null;
      } else {
        console.error("Network response was not ok");
        return null; // Return null for non-success response
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      //throw error; // Re-throw the error for further handling
    });
}
function delDBPromo(data) {
  let url = `http://localhost:8080/api/delete/promotion/${data.promotion_Code}`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // Add any other headers if required
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Network response was not ok");
        return null;
      }
    })
    .catch((error) => {
      console.error("Error: ", error);
    });
}

function DBaddMenuList(json) {
  //   {
  //     "unit": "piece",
  //     "foodname": "Crispy Fish Taco",
  //     "amount": 42,
  //     "price": 110
  //    }
  let url = "http://localhost:8080/api/add/menu";
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add any other headers if required
    },
    body: json,
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Return parsed JSON for successful response
      } else {
        console.error("Network response was not ok");
        return null; // Return null for non-success response
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      //throw error; // Re-throw the error for further handling
    });
}

function DBaddPromoList(json) {
  //   {
  //     "Promotion_Name": "myPromotion",
  //     "Promotion_Price": 110,
  //     "Promotion_Code": "TestCode",
  //     "Promotion_Expire": "2024-06-03T05:30:00.000+00:00"
  //    }
  let url = "http://localhost:8080/api/add/promotion";
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add any other headers if required
    },
    body: json,
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Return parsed JSON for successful response
      } else {
        console.error("Network response was not ok");
        return null; // Return null for non-success response
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      //throw error; // Re-throw the error for further handling
    });
}

function clearAddmenu() {
  let unit = document.getElementById("menu-unit");
  let foodname = document.getElementById("menu-foodname");
  let amount = document.getElementById("menu-amount");
  let price = document.getElementById("menu-price");
  unit.value = "";
  foodname.value = "";
  amount.value = "";
  price.value = "";
}
function clearAddpromo() {
  let promotionName = document.getElementById("promotionName");
  let promotionCode = document.getElementById("promotionCode");
  let promotionExpired = document.getElementById("promotionExpired");
  let promotionPrice = document.getElementById("promotionPrice");
  promotionName.value = "";
  promotionCode.value = "";
  promotionExpired.value = "";
  promotionPrice.value = "";
}
function addMenuList() {
  // console.log("Running!");
  let unit = document.getElementById("menu-unit");
  let foodname = document.getElementById("menu-foodname");
  let amount = document.getElementById("menu-amount");
  let price = document.getElementById("menu-price");
  let data = {
    unit: unit.value,
    foodname: foodname.value,
    amount: parseInt(amount.value),
    price: parseInt(price.value),
  };
  console.log(data);
  let jsondata = JSON.stringify(data);
  DBaddMenuList(jsondata).then(async (result) => {
    if (result !== null) {
      await menu_data.push(data);
      await addMenuCard(data);
      await addCardItemMenuPromoAdd(data);
      console.log(menu_data);
      await updateDeleteMenuButton();
      await updateButtonPromoMenu();
    } else {
      window.alert("Fail to add menu due to database");
    }
  });
}

function addPromoList() {
  // console.log("Running!");
  let promotionName = document.getElementById("promotionName").value;
  let promotionCode = document.getElementById("promotionCode").value;
  let promotionExpired = document.getElementById("promotionExpired").value;
  let promotionPrice = document.getElementById("promotionPrice").value;

  let promotionExpiredCheck = validateDate(promotionExpired);

  let data = {
    promotion_Name: promotionName,
    promotion_Price: parseInt(promotionPrice),
    promotion_Code: promotionCode,
    promotion_Expire: promotionExpiredCheck
  };
  let menu_list = [];
  //ADDING menuList!!
  for(menu of menu_data){
    let menuhtml = document.getElementById(`count-item-${menu.foodname}`);
    let menuAmount = parseInt(menuhtml.textContent);
    if(menuAmount > 0){
      let promoMenu = {
        "foodname": menu.foodname,
        "promotion_Code":promotionCode,
        "amount": menuAmount
      }
      menu_list.push(promoMenu);
    }
  }
  console.log(data);
  let jsondata = JSON.stringify(data);
  DBaddPromoList(jsondata).then(async (result) => {
    if (result !== null) {
      for (menu of menu_list){
        let menujson = JSON.stringify(menu);
        await DBaddMenuHavePronotion(menujson);
      }
      await promotion_data.push([data,menu_list]);
      await addPromoCard([data,menu_list]);
      await updateDeletePromoButton();
    } else {
      window.alert("Fail to add menu due to database");
    }
  });
}
function DBaddMenuHavePronotion(json){
  let url = `http://localhost:8080/api/add/menu/havepromotion`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add any other headers if required
    },
    body: json,
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Return parsed JSON for successful response
      } else {
        console.error("Network response was not ok");
        return null; // Return null for non-success response
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      //throw error; // Re-throw the error for further handling
    });
}

function validateDate(input) {
  const inputDateStr = input;
  const [day, month, year] = inputDateStr.split('/');
  const dateObj = new Date(year, month - 1, day);
  const isoString = dateObj.toISOString();
  const trimmedIsoString = isoString.replace('Z', '+00:00');
  return trimmedIsoString;
}

function addCardItemMenuPromoRemove () {
  let itemSlideCon = document.getElementById(`itemSlideCon`);
  itemSlideCon.parentNode.removeChild(itemSlideCon);
}
var addPromoMenuList = [];

async function addCardItemMenuPromoAdd (item) {

let unit = item.unit;
let amount = item.amount;
let price = item.price;
let foodname = item.foodname;

let cardItem = `
                <div class="item-card" id="item-card-${foodname}">
                  <div class="item-card-con">
                    <div class="item-card-pic-container">
                      <img src="./component/CS251 Component/HomeMenuDish/${foodname}.png">
                    </div>
                    <h3 id="name-item-${foodname}">${foodname}</h3>
                    <h3 id="count-item-${foodname}" class="count-item">${0}</h3>
                    <h3 id="price-item-${foodname}" class="price-item">${price}</h3>
                    <h3 id="qty-item-${foodname}">QTY:${amount}</h3>
                    <h3 id="add-item-${foodname}" class="add-item-icon">+</h3>
                    <h3 id="rm-item-${foodname}" class="rm-item-icon">-</h3>
                    <img id="rm-all-item-${foodname}" src="./component/CS251 Component/icon/trash.png" class="item-bin">
                  </div>
                </div>
`;

let itemSlideCon = document.getElementById(`itemSlideCon`);
itemSlideCon.innerHTML += cardItem;

//var menuAdd = document.querySelectorAll('.menu-add-button');



}
function updateButtonPromoMenu(){
  for (let menu of menu_data) {
    let addBtn = document.getElementById(`add-item-${menu.foodname}`);
    let rmBtn = document.getElementById(`rm-item-${menu.foodname}`);
    let cntItemhtml = document.getElementById(`count-item-${menu.foodname}`);
    let setZerohtml = document.getElementById(`rm-all-item-${menu.foodname}`);
    
    // Use a closure to capture the current 'menu' and 'cntItemhtml'
    addBtn.addEventListener("click", (currentMenu => {
      return () => {
        let countItem = parseInt(cntItemhtml.textContent);
        countItem = parseInt(countItem)+1;
        console.log("Inc cnt value :",countItem);
        cntItemhtml.textContent = countItem;
      };
    })(menu));
  
    // Use a closure to capture the current 'menu' and 'cntItemhtml'
    rmBtn.addEventListener("click", (currentMenu => {
      return () => {
        let countItem = parseInt(cntItemhtml.textContent);
        if (countItem > 0) {
          countItem = parseInt(countItem)-1;
          console.log("Dec cnt value :",countItem);
          cntItemhtml.textContent = countItem;
        }
      };
    })(menu));
    setZerohtml.addEventListener("click", (currentMenu =>{
      return () =>{
        cntItemhtml.textContent = 0;
      }
    })(menu));
  }
}

