var promotion_data = [];

var food_category = [
  {
    "name": "Burger",
    "image_category": "./component/CS251 Component/Food category/burger.svg"
  },
  {
    "name": "Chicken",
    "image_category": "./component/CS251 Component/Food category/chicken.svg"
  },
  {
    "name": "Taco",
    "image_category": "./component/CS251 Component/Food category/taco.svg"
  },
  {
    "name": "Fries",
    "image_category": "./component/CS251 Component/Food category/fries.svg"
  },
  {
    "name": "Dessert",
    "image_category": "./component/CS251 Component/Food category/dessert.svg"
  },
  {
    "name": "Drink",
    "image_category": "./component/CS251 Component/Food category/soda.svg"
  }
]

var menu_data = [];
var orderMenu = [];



// promotion section

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

// promotion section
loadPromotion();
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

async function loadPromoCard(){
  console.log("Now Start loading card!");
  await promotion_data.forEach(elm=>{
    console.log("Add promo card :",elm);
    addPromoCard(elm);
  });
}
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

function addPromoCard(promo_array){
  console.log("Now adding card !");
  let [promodata,promomenu] = promo_array;
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
  let promoformatdate = formatDate(promodata.promotion_Expire);
  let container = document.getElementById('promotionSlideCon');
  let card = `<div class="promotion-card">
  <div class="promotion-add-pic">
      <img src="./component/CS251 Component/HomeMenuDish/${promodata.promotion_Code}.png">
  <button type="button">ADD</button>
  </div>
</div>`
  container.innerHTML += card;
  console.log("Adding :",promodata.promotion_Name ,"!");
}



// menu section
loadMenu();
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



async function loadMenuCard(){
  const menuContainer = document.getElementById('menuSlideCon');
//console.log("We in load Menu card fn");
  // สร้างการ์ดสำหรับแต่ละรายการเมนู
  await menu_data.forEach((item,index) => {
    const card = `
      <div class="menu-card">
        <div class="menu-card-con">
          <div class="menu-pic-container">
            <img src="./component/CS251 Component/HomeMenuDish/${item.foodname}.png">
          </div>
          <div class="menu-desc-con">
            <div class="menu-desc">
              <h3>${item.foodname}</h3>
              <h3 class="h3-qty" id="qty-${index}">QTY: ${item.amount}</h3>
              <h3><span class="dollar-sign">฿</span>: ${item.price}</h3>
              <button type="button" id="menu-add-button-${index}" class="menu-add-button">ADD</button>
            </div>
          </div>
        </div>
      </div>
    `;
    // เพิ่มการ์ดลงใน container
    menuContainer.innerHTML += card;
  });
  var menuAdd = document.querySelectorAll('.menu-add-button');
  await updateAddMenuButton(menuAdd);
  
}


var menu_item = [];

const menuSlider = document.getElementById('menuSlideCon');
let misDown = false;
let mstartY;
let mscrollTop;

menuSlider.addEventListener('mousedown', (e) => {
    misDown = true;
    mstartY = e.pageY - menuSlider.offsetTop;
    mscrollTop = menuSlider.scrollTop;
});

menuSlider.addEventListener('mouseleave', () => {
    misDown = false;
});

menuSlider.addEventListener('mouseup', () => {
    misDown = false;
});

menuSlider.addEventListener('mousemove', (e) => {
    if (!misDown) return;
    e.preventDefault();
    const y = e.pageY - menuSlider.offsetTop;
    const walkDown = (y - mstartY) * 1; // Adjust scroll speed
    menuSlider.scrollTop = mscrollTop - walkDown;
});

// menu section

// order-list section

const orderListSlider = document.getElementById('orderListSlideCon');
let oisDown = false;
let ostartY;
let oscrollTop;

orderListSlider.addEventListener('mousedown', (e) => {
    oisDown = true;
    ostartY = e.pageY - orderListSlider.offsetTop;
    oscrollTop = orderListSlider.scrollTop;
});

orderListSlider.addEventListener('mouseleave', () => {
    oisDown = false;
});

orderListSlider.addEventListener('mouseup', () => {
    oisDown = false;
});

orderListSlider.addEventListener('mousemove', (e) => {
    if (!oisDown) return;
    e.preventDefault();
    const ox = e.pageY - orderListSlider.offsetTop;
    const owalk = (ox - ostartY) * 1; // Adjust scroll speed
    orderListSlider.scrollTop = oscrollTop - owalk;
});

//setting

const dineInMode = document.getElementById('dine-in');
const takeAwayMode = document.getElementById('take-away');
const haveTable = document.querySelector('.dive-input');
var hasDineIn = true;

takeAwayMode.addEventListener('click', function() {
  
    dineInMode.style.backgroundColor = '#E6E6E6';
    dineInMode.style.color = 'black';
    takeAwayMode.style.backgroundColor = '#E0115F';
    takeAwayMode.style.color = '#FFFFFF';
    hasDineIn = false;
  
    haveTable.style.display = 'none';
});

dineInMode.addEventListener('click', function() {

    takeAwayMode.style.backgroundColor = '#E6E6E6';
    takeAwayMode.style.color = 'black';
    dineInMode.style.backgroundColor = '#E0115F';
    dineInMode.style.color = '#FFFFFF';
    hasDineIn = true;

    haveTable.style.display = 'block';
});

const checkBoxMember = document.getElementById('checkMember');
const membershipInfo = document.getElementById('membershipInfo');
const newMember = document.getElementById('newMember');

checkBoxMember.addEventListener('click', function() {
    if(checkBoxMember.checked) {
        membershipInfo.style.display = 'block';
        newMember.style.display = 'none';
    } else {
        membershipInfo.style.display = 'none';
        newMember.style.display = 'block';
    }
});




const changeOrderCon = document.getElementById('add-order-button');
const changeBack = document.querySelector('.gg-corner-up-left');
const orderCon1 = document.querySelector('.popup-con-1');
const orderCon2 = document.querySelector('.popup-con-2');

changeOrderCon.addEventListener('click', () => {
    orderCon1.style.display = 'none';
    orderCon2.style.display = 'block';
    document.getElementById('orderNumber').textContent = 'order #' + (orderListCount+1);
})

changeBack.addEventListener('click', () => {
  orderCon1.style.display = 'block';
  orderCon2.style.display = 'none';
})

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


var cash = document.getElementById('cash');
var creditCard = document.getElementById('creditCard');
var scan = document.getElementById('scan');

var whichPayment = 1;

cash.style.backgroundColor = '#E0115F';
cash.style.color = '#FFFFFF';
cash.style.borderRadius = '15px';

takeAwayMode.style.backgroundColor = '#E6E6E6';
    takeAwayMode.style.color = 'black';
    dineInMode.style.backgroundColor = '#E0115F';
    dineInMode.style.color = '#FFFFFF';

cash.addEventListener('click', () => {
  cash.style.backgroundColor = '#E0115F';
  cash.style.color = '#FFFFFF';
  cash.style.borderRadius = '15px';
  creditCard.style.backgroundColor = '#E6E6E6';
  creditCard.style.color = 'black';
  creditCard.style.borderRadius = '15px';
  scan.style.backgroundColor = '#E6E6E6';
  scan.style.color = 'black';
  scan.style.borderRadius = '15px';
  whichPayment = 1;
  console.log(whichPayment);
})

creditCard.addEventListener('click', () => {
  whichPayment = 2;
  creditCard.style.backgroundColor = '#E0115F';
  creditCard.style.color = '#FFFFFF';
  creditCard.style.borderRadius = '15px';
  cash.style.backgroundColor = '#E6E6E6';
  cash.style.color = 'black';
  cash.style.borderRadius = '15px';
  scan.style.backgroundColor = '#E6E6E6';
  scan.style.color = 'black';
  scan.style.borderRadius = '15px';
  console.log(whichPayment);
})

scan.addEventListener('click', () => {
  scan.style.backgroundColor = '#E0115F';
  scan.style.color = '#FFFFFF';
  scan.style.borderRadius = '15px';
  creditCard.style.backgroundColor = '#E6E6E6';
  creditCard.style.color = 'black';
  creditCard.style.borderRadius = '15px';
  cash.style.backgroundColor = '#E6E6E6';
  cash.style.color = 'black';
  cash.style.borderRadius = '15px';
  whichPayment = 3;
  console.log(whichPayment);
})
































  // const categoryCon = document.querySelector('.category-con');

  // // สร้างการ์ดสำหรับแต่ละรายการเมนู
  // food_category.forEach((item, index) => {
  //   const card = `
  //       <div class="category-food" id= "categoryFood-${index}">
  //           <div class="icon-container">
  //               <img src="${item.image_category}">
  //           </div>
  //           <p>${item.name}</p>
  //       </div>
  //   `;
    
  //   // เพิ่มการ์ดลงใน container
  //   categoryCon.innerHTML += card;
  // });

const promotionSlideCon = document.querySelector('.promotion-slide-con');

  // สร้างการ์ดสำหรับแต่ละรายการเมนู
  promotion_data.forEach((item, index) => {
    const card = `
        <div class="promotion-card">
            <div class="promotion-add-pic">
                <img src="${item.image_url}">
                <button type="button" class="promotion-add-button">ADD</button>
            </div>
        </div>
    `;
    
    // เพิ่มการ์ดลงใน container
    promotionSlideCon.innerHTML += card;
  });
  

const categoryFoods = document.querySelectorAll('.category-food'); 

function selectCategory(index) {
    let allMenu = document.querySelectorAll('.menu-card');

    allMenu.forEach(menu => {
        menu.style.display = 'none'; // ซ่อนทุกเมนู
    });

    if (index === 0) { // ถ้าเป็นหมวดหมู่ทั้งหมด
        allMenu.forEach(menu => {
            menu.style.display = 'block'; // แสดงทุกเมนู
        });
    } else {
        const categoryFood = food_category[index-1].name;
        let l = 0;
        allMenu.forEach(menu => {
            if(menu_data[l].food_category === categoryFood){
                //console.log(menu_data[l].name);
                menu.style.display = 'block'; // แสดงทุกเมนู
            }
            l++;
        });
    }
}

  categoryFoods.forEach((category, index) => {
      category.addEventListener('click', () => {
          selectCategory(index);
      });
  });


var itemNum = [];

function addItem(index) {

    const card = `
        <div class="item-card" id="item-card-${index}">
            <div class="item-card-con">
                <div class="item-card-pic-container">
                    <img src="./component/CS251 Component/HomeMenuDish/${menu_data[index].foodname}.png">
                </div>
                <h3 id="name-item-${index}">${menu_data[index].foodname}</h3>
                <h3 id="count-item-${index}" class="count-item">${1}</h3>
                <h3 id="price-item-${index}" class="price-item">฿${menu_data[index].price}</h3>
                <h3 id="qty-item-${index}">QTY:${menu_data[index].amount}</h3>
                <h3 id="add-item-${index}" class="add-item-icon">+</h3>
                <h3 id="rm-item-${index}" class="rm-item-icon">-</h3>
                <img id="rm-all-item-${index}" src="./component/CS251 Component/icon/trash.png" class="item-bin">
            </div>
        </div>
    `;

    let itemAdd = document.querySelector('.qty-item-container');

    itemAdd.innerHTML += card;

    itemNum.push(index);
    orderMenu.push([menu_data[index],1]);
    console.log(orderMenu);
    
    var cardv = document.getElementById(`item-card-${index}`);
    cardv.value = index;
    for(let j=0;j<itemNum.length;j++){
      
      var addItemIcon = document.getElementById(`add-item-${itemNum[j]}`);
      const idx = itemNum[j];
      addItemIcon.addEventListener('click', () => {
           addQty(idx);
           updatedPay();
         })
    }

    for(let j=0;j<itemNum.length;j++){
      var rmItemIcon = document.getElementById(`rm-item-${itemNum[j]}`);
      const idx = itemNum[j];
      rmItemIcon.addEventListener('click', () => {
        rmQty(idx);
        updatedPay();
      })
    }

    for(let j=0;j<itemNum.length;j++){
      var rmAllItemIcon = document.getElementById(`rm-all-item-${itemNum[j]}`);
      rmAllItemIcon.addEventListener('click', () => {
        let rmNum = document.getElementById(`count-item-${index}`);
        rmNum.textContent = 1;
        console.log(rmNum.textContent);
        const idx = itemNum[j];
        rmQty(idx);
        updatedPay();
      })
    }

    updatedPay();
}

var totalPay = 0;

function updatedPay() {

  let total = 0;
  for(let j=0;j<itemNum.length;j++){
    let priceItems = document.getElementById(`price-item-${itemNum[j]}`);
    let currentValue = priceItems.textContent;
    currentValue = parseInt(currentValue.substring(1));
    total += currentValue;
  }
  totalPay = total;
  let showPayment = document.getElementById('paymentTotal');
  let currentValue = showPayment.textContent;
  currentValue = parseInt(currentValue.substring(1));
  currentValue = total;
  showPayment.textContent = '$'+currentValue;

  let PaymentAfterTax = document.getElementById('paymentTaxTotal');
  let currentValue2 = PaymentAfterTax.textContent;
  currentValue2 = parseInt(currentValue2.substring(1));
  currentValue2 = (total*7.0/100);
  PaymentAfterTax.textContent = '$'+currentValue2;

  let PaymentDiscount = document.getElementById('paymentDiscountTotal');
  let currentValue3 = PaymentDiscount.textContent;
  currentValue3 = parseInt(currentValue3.substring(1));
  currentValue3 = 0;
  PaymentDiscount.textContent = '$'+currentValue3;

  let allTotal = document.getElementById('allTotal');
  let currentValue4 = allTotal.textContent;
  currentValue4 = parseInt(currentValue4.substring(1));
  currentValue4 = total + currentValue2 - currentValue3;
  if(currentValue4 < 0){
    currentValue4 = 0;
  }
  allTotal.textContent = '$'+currentValue4.toFixed(2);
}

function addPrice(index) {
  let addPrice = document.getElementById(`price-item-${index}`); 
  let currentValue = addPrice.textContent;
  currentValue = parseInt(currentValue.substring(1));
  currentValue = currentValue+menu_data[index].price;
  addPrice.textContent = '$'+currentValue;
}

function rmPrice(index) {
  let rmPrice = document.getElementById(`price-item-${index}`); 
  let currentValue = rmPrice.textContent;
  currentValue = parseInt(currentValue.substring(1));
  currentValue = currentValue-menu_data[index].price;
  rmPrice.textContent = '$'+currentValue;
}
function updateOrderMenu(index,qty){
  orderMenu.forEach((elm)=>{
    if(elm[0] == menu_data[index]){
      elm[1] = qty;
    }
  });
}
function addQty(index) {
  console.log("addqty index:",index);
  let countItem = document.getElementById(`count-item-${index}`);
  let nameItem = document.getElementById(`name-item-${index}`);
  let checkItem = document.getElementById(`qty-item-${index}`);
  let currentItemName = nameItem.textContent;
  let currentQtyLeft = parseInt(((checkItem.textContent).match(/\d+/)[0]));
  let currentQty = parseInt(countItem.textContent);
  if(currentQty < currentQtyLeft){
    currentQty++;
    updateOrderMenu(index,currentQty);
    addPrice(index);
  }else{
    console.log(currentItemName+' = หมด');
  }
  countItem.textContent = currentQty;
  updatedPay();
}

function rmQty(index) {
  console.log("Rmqty index:",index);
  let countItem = document.getElementById(`count-item-${index}`);
  let nameItem = document.getElementById(`name-item-${index}`);
  let checkItem = document.getElementById(`qty-item-${index}`);
  let currentItemName = nameItem.textContent;
  // let currentQtyLeft = parseInt(((checkItem.textContent).match(/\d+/)[0]));
  let currentQty = parseInt(countItem.textContent);
  const RmitemCard = document.getElementById(`item-card-${index}`);
  if(currentQty <= 1){
    RmitemCard.parentNode.removeChild(RmitemCard);
    const itemCount = document.getElementById('itemCount');
    let currentValue = parseInt(itemCount.textContent);
    currentValue--;
    itemCount.textContent = currentValue;
    console.log(currentItemName + ': นำออก');
    itemNum = itemNum.filter(item => item !== index);
    orderMenu = orderMenu.filter(item => item[0] !== menu_data[index]);
    console.log(orderMenu);
  }else{
    currentQty--;
    updateOrderMenu(index,currentQty);
    rmPrice(index);
  }
  countItem.textContent = currentQty;
  updatedPay();
}
function updateAddMenuButton(menuAdd){
    
  menuAdd.forEach((add,index) => {

    add.addEventListener('click', () => {
      let qty = menu_data[index].amount;
      if(qty > 0){
        let checkItem = document.getElementById(`count-item-${index}`);
      if(checkItem !== null){
        addQty(index);
      }else{
      addItem(index);
      const priceItem = document.getElementById(`price-item-${index}`);
      let currentPriceValue = priceItem.textContent;
      currentPriceValue = parseInt(currentPriceValue.substring(1));
      currentPriceValue = currentPriceValue-menu_data[index].price;

      const itemCount = document.getElementById('itemCount');
      let currentValue = parseInt(itemCount.textContent);
      currentValue++;
      itemCount.textContent = currentValue;
      }
      
      }
      else{
        console.log("No adding after 0 or less");
      }
    })
});
}


const promotionAdd = document.querySelectorAll('.promotion-add-button');

promotionAdd.forEach((pro, index) => {
  pro.addEventListener('click', () => {
    let pass = true;
    let ordered = false
    promotion_data[index].menu_id_data.forEach((menu)=>{
      console.log("checking for ",menu);
      let ordering = document.getElementById(`count-item-${menu[0]}`);
      let orderingVal = 0;
      if(ordering){
        orderingVal = parseInt(ordering.textContent);
      }
      if(menu_data[menu[0]].amount < menu[1] + orderingVal){
        pass = false;
      }
    });
    promotion_data[index].menu_id_data.forEach((menu) => {
      if(pass){
        for(let i = 0 ; i < menu[1] ; i++){
          let checkItem = document.getElementById(`count-item-${menu[0]}`);
         if(checkItem !== null){
          
          addQty(menu[0]);
        }else{
        addItem(menu[0]);
        const itemCount = document.getElementById('itemCount');
        let currentValue = parseInt(itemCount.textContent);
       currentValue++;
       itemCount.textContent = currentValue;
      } 
        }
        
    }
    else{
      console.log("No adding promotion after stock shortage");
    }
      
    })
  });
});

var placeOrder = document.getElementById('placeOrder');
var orderListCount = 0;


placeOrder.addEventListener('click', async () => {
  let countItem = document.getElementById('itemCount').textContent;
  if(countItem === '0') return;
  orderListCount++;
  const orderlistCardContainer = document.querySelector('.popup-order-list-slide-con');
  let orderNumber = document.getElementById('orderNumber').textContent;
  let orderNumberValue = parseInt(((orderNumber).match(/\d+/)[0]));
  orderNumberValue = orderListCount;
  orderNumber = 'order #' + orderNumberValue;

  let tableNum = document.getElementById('served-table').value;

  let t_takehome;
  let dineinbutton = document.getElementById('dine-in');
  
  let computedStyle = window.getComputedStyle(dineinbutton);
  let color = computedStyle.backgroundColor;
  console.log("BG dine-in color ",color);
  if(color == "rgb(230, 230, 230)"){
    t_takehome = true;
  }
  else{
    t_takehome = false;
  }
  let methodSelect;
  let scanhtml = document.getElementById('scan');
  let credithtml = document.getElementById('creditCard'); 
  let scanstyle = window.getComputedStyle(scanhtml);
  let scancolor = scanstyle.background;
  let creditstyle = window.getComputedStyle(credithtml);
  let creditcolor = creditstyle.background;
  console.log("BG Scan",scancolor);
  console.log("BG credit",creditcolor);
 

  if(whichPayment === 3){
    methodSelect = "Scan";
  }
  else if(whichPayment === 2){
    methodSelect = "Credit Card";
  }
  else{
    methodSelect = "Cash";
  }
  console.log("Method is" , methodSelect);

  console.log(orderNumberValue);

  if(tableNum == "" || hasDineIn == false){
    tableNum = '-';
  }

  let card = `
              <div class="list-card-wait">
                <div class="list-card-con" id="order-${orderNumber}">
                  <h3>${orderNumber}</h3>
                  <h3>Table ${tableNum}</h3>
                  <h3>Order: ${countItem} item</h3>
                  <h3>1 mins ago</h3>
                  <button type="button">Wait List</button>
                </div>
              </div>
            `

   orderlistCardContainer.innerHTML += card;
  let currentDate = new Date();

  let Payment = 1000;
  let PaymentMethod = methodSelect;
  let DBformattedDate = currentDate.toISOString().replace('Z', '+00:00');
  let TotalDiscountelement = document.getElementById('paymentDiscountTotal');
  let stringTotalDiscount = TotalDiscountelement.textContent;
  let TotalDiscount = parseFloat(stringTotalDiscount.replace("$", ""));
  let NetPriceElm = document.getElementById('allTotal');
  let stringTotalNetPrice  = NetPriceElm.textContent; 
  let NetPrice = parseFloat(stringTotalNetPrice.replace("$",""));
  let IsTakeHome = t_takehome;
  let MemberID;
  let checkMemberhtml = document.getElementById('checkMember');
  let checkMember = checkMemberhtml.checked;
  if(checkMember){
    let idBox = document.getElementById('member-input');
    MemberID = idBox.value;
  }
  else{
    MemberID = null;
  }
  

  //"InvoiceNo" : orderNumberValue,
  let invoicedb = {
   
    "payment" : Payment,
    "paymentMethod" : PaymentMethod,
    "dateTime" : DBformattedDate,
    "totalDiscount":TotalDiscount,
    "netPrice":NetPrice,
    "takeHome":IsTakeHome,
    "memberID":MemberID,
    "i_change": Payment-NetPrice

  };
  let jsoninvoice = JSON.stringify(invoicedb);
  function updateDBInvoice(jsonInvoice){
    console.log(jsonInvoice);
  let url = 'http://localhost:8080/api/add/invoice';
  return fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          // Add any other headers if required
      },
      body: jsonInvoice,
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
  let pass = 0;
  function getInvoice(){
    fetch("http://localhost:8080/api/invoice/list/0/1")
    .then(response => {
    // Check if the response is successful (status code 200)
    if (!response.ok) {
      return null;
      //throw new Error('Network response was not ok');
    }
    // Parse the JSON response
    return response.json();
  })
  .then(async data => {
    // Data retrieved successfully, do something with it
    console.log("Invoice in data: ",data);
    await orderMenu.forEach(async (menu)=>{
      console.log("Menu is ", menu);
      console.log("Data[0] is ", data[0]);
      let dbUpdateMenu ={
        "invoiceNo" : data[0].invoiceNo,
        "foodname" : menu[0].foodname,
        "m_amount" : menu[1]
      };
      let jsonUpdateOrderMenu = JSON.stringify(dbUpdateMenu);
      console.log("Json order menu before send :",jsonUpdateOrderMenu);
      await updateOrderMenu(jsonUpdateOrderMenu);
      
   
    });
    await updateQty();
    orderCon1.style.display = 'block';
    orderCon2.style.display = 'none';
    return data;
    
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('There was a problem with the fetch operation:', error);
  });

  }
  function updateOrderMenu(jsonMenu){
    console.log("Now we in update with json :",jsonMenu);
    let url = 'http://localhost:8080/api/add/order/menu';
  return fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          // Add any other headers if required
      },
      body: jsonMenu,
  })
  .then(response => {
      if (response.ok) {
        console.log("Update OrderMenu pass!");
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

  if(await updateDBInvoice(jsoninvoice) !== null){
   
    await getInvoice();

  }
  else
  {window.alert("Update invoice error due to Database");}

});
function updateMemuQty(item){
  let url = `/api/update/menu/${item.foodname}`
  let itemjson = JSON.stringify(item);
  return fetch(url, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        // You might need to include other headers like authentication token if required
    },
    body: itemjson,
})
.then(response => {
    if (!response.ok) {
        return null; // Return null if response is not OK
    }
    return response.json();
})
.then(updatedFood => {
    console.log('Food updated successfully:', updatedFood);
    return updatedFood; // Optionally, you can return the updated food object
})
.catch(error => {
    console.error('Error updating food:', error);
    return -1; // Return null in case of any other error
});
}

function updateQty () {
  
  let itemCard = document.querySelectorAll('.item-card');
  itemCard.forEach(() => {
    let index = itemNum[0];
    let val = document.getElementById(`count-item-${index}`);
    let upd = val.textContent;
    let toUpdate = menu_data[index];
    toUpdate.amount -= parseInt(upd);
    if(updateMemuQty(toUpdate) !== null){
      //menu_data[index].amount -= parseInt(upd);
    let menu = document.getElementById(`qty-${index}`);
    menu.textContent = "QTY: " + menu_data[index].amount;
    val.textContent = 1;
    const idx = itemNum[0];
    rmQty(idx);
    }
    else{
      toUpdate.amount += parseInt(upd);
      window.alert("Fail to Update DB");
    }
    
 
  });
}

const newestMember = document.getElementById('newMember');
const popup = document.querySelector('.add-member-popup');

newestMember.addEventListener('click', () => {
  popup.style.display = 'block';
})

function validating(obj){
  let regexCitizen = /^\d{13}$/
  let regextel = /^0\d{9}$/;
  let regexBd = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  let arrayCit = obj.citizenID.split("").reverse().map((num, index) => ({ index: index + 1, value: parseInt(num) }));
  let sum = 0;
  
  if(regexCitizen.test(obj.citizenID)){
  for(let i = 1 ; i < 13; i++){
    sum += arrayCit[i].index * arrayCit[i].value;
  }
    sum = (11-sum%11)%10;
  }
  
  if(!(regexCitizen.test(obj.citizenID) && (sum==arrayCit[0].value))){
    window.alert("Invalid citizen ID format")
  }
  if(!regextel.test(obj.tel)){
    window.alert("Invalid telephone number format")
  }
  if(!(regexBd.test(obj.birthDate))){
    window.alert("Invalid Birthdate format (dd/mm/yyyy)");
  }
  return regexCitizen.test(obj.citizenID) && regextel.test(obj.tel) && regexBd.test(obj.birthDate) && (sum==arrayCit[0].value);
}
function clearAddmemberBox(){
  let nameBox = document.getElementById('addMemberName');
  let passwordBox = document.getElementById('addMemberPassword');
  let citizenIDBox = document.getElementById('addMemberCitizenID');
  let telBox = document.getElementById('addMemberTel');
  let birthDateBox = document.getElementById('addMemberBirthDate');
  nameBox.value="";
  passwordBox.value="";
  citizenIDBox.value="";
  telBox.value="";
  birthDateBox.value="";
}

// function saveMember() {
//   let name = document.getElementById('addMemberName').value;
//   let password = document.getElementById('addMemberPassword').value;
//   let citizenID = document.getElementById('addMemberCitizenID').value;
//   let tel = document.getElementById('addMemberTel').value;
//   let birthDate = document.getElementById('addMemberBirthDate').value;

// let newMember = {
//     "name": name,
//     "password": password,
//     "citizenID": citizenID,
//     "tel": tel,
//     "birthDate": birthDate
//   };
  
//   if(validating(newMember)){
//   console.log(newMember);
//   memberInfoList.push(newMember);

//   var currentDate = new Date();
//   let idAutoString = String(idAuto).padStart(10,'0');
// // Days of the week and months array
//   var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// // Get day, month, and year
//   var day = daysOfWeek[currentDate.getDay()];
//   var month = months[currentDate.getMonth()];
//   var date = currentDate.getDate();
//   var year = currentDate.getFullYear();
//   var senddel = idAuto;

// // Format the date
//   var formattedDate = day + ", " + month + " " + date + " " + year;
//   let card = `
//               <tr id = "memberList${idAuto}">
//                 <td>${idCount}</td>
//                 <td>${idAutoString}</td>
//                 <td>${formattedDate}</td>
//                 <td>0</td>
//                 <td><div class="member-edit-icon">
//                 <img src="./component/CS251 Component/icon/trash.png" id = "removeList${idAuto}">
//                 <img src="./component/CS251 Component/icon/setting.png" id="editList${idAuto}">
//                  </div></td>
//               </tr>
//             `;
  
//   const table = document.getElementById('tableMember');
//   table.innerHTML += card;
//   idCount++;
//   idAuto++;
//   memberList.push(senddel);
//   memberList.forEach(element => {
//     delIDGenerate(element);
//   });

//   clearAddmemberBox();
// }
// else{
//   window.alert("Invalid format. Cancel Adding...");
// }
 
//   //console.log(table.innerHTML);
 
  
//   popup.style.display = 'none';
// }

const exit = document.querySelector('.exit');

exit.addEventListener('click', () => {
  popup.style.display = 'none';
});












