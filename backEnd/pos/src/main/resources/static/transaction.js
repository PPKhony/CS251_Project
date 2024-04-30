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

const popup = document.querySelector('.add-member-popup');

function addMember() {
  popup.style.display = 'block';
}


var idCount = 1;
var idAuto = 1;
var memberList=[];
var memberInfoList=[];
var memberEditInfoList=[];

function loadTransaction(){
  fetch("http://localhost:8080/api/invoice/list/0/100")
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
    //console.log(data);
    data.forEach(async (invoice)=>{
      await saveTransaction(invoice);
      await addEditCardList(invoice);
    });
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('There was a problem with the fetch operation:', error);
  });
}
function loadTransactionHistory(t_id){
  return fetch(`http://localhost:8080/api/print/invoice/${t_id}`)
  .then(response =>{
    if(!response.ok){
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data =>{
    return data;
  })
  .catch(error =>{
    console.error("Error while load PrintInvoice :",error);
  });
}
function loadCurrentDate(){
  let currentDatehtml = document.getElementById('current-date');
  const date = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const formattedDate = `${days[date.getUTCDay()]}, ${months[date.getUTCMonth()]} ${date.getUTCDate()} ${date.getUTCFullYear()}`;
  currentDatehtml.textContent = formattedDate;

}
loadTransaction();
loadCurrentDate();

function saveTransaction(invoice) {
    //   {
  //     "i_change": 7.0,
  //     "payment": 125.12,
  //     "takeHome": false,
  //     "paymentMethod": "Cash",
  //     "dateTime": "2024-04-03T05:30:00.000+00:00",
  //     "netPrice": 124.12,
  //     "memberID": "1234567890",
  //     "totalDiscount": 1.0,
  //     "invoiceNo": 1
  // }

  let idString = String(invoice.invoiceNo).padStart(10,'0');

  var   date = new Date(invoice.dateTime);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const formattedDate = `${days[date.getUTCDay()]}, ${months[date.getUTCMonth()]} ${date.getUTCDate()} ${date.getUTCFullYear()}`;

  var serving;
  console.log("TakeHome : ",invoice.takeHome);
  if (invoice.takeHome === false){
    serving = 'Dine in';
  }
  else{
    serving = 'Take home';
  }
// Get day, month, and year

  let card = `
  <tr id="transaction${invoice.invoiceNo}">
  <td>${invoice.invoiceNo}</td>
  <td>${idString}</td>
  <td>${formattedDate}</td>
  <td>${serving}</td>
  <td>${invoice.paymentMethod}</td>
  <td>${invoice.netPrice}</td>
  <td><div class="member-edit-icon">
      <img src="./component/CS251 Component/icon/trash.png" id="del-transaction${invoice.invoiceNo}">
      <img src="./component/CS251 Component/icon/setting.png" id="edit-transaction${invoice.invoiceNo}">
  </div></td>
</tr>`;
  
  const table = document.getElementById('tableTransaction');
  table.innerHTML += card;
  memberList.push(invoice.invoiceNo);
  memberList.forEach(element => {
    delIDGenerate(element);
    // historyGenerate(element);
  });


 // console.log(table.innerHTML);
 
}
// function getOrder(t_id){
//     let url = "";
//     return fetch(url)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//         return null;
//       });
  

// }
function historyGenerate(index){
  const id = index;
  const button = document.getElementById(`edit-transaction${id}`);
  button.addEventListener('click',()=>{
    
    let popup = document.getElementById('order-popup');
    popup.style.display='block';
    //editTraGenerate(id);
    console.log("Now history show!");
  });
}

// function updateTable(){
//   const table = document.getElementById('tableTransaction');
//   table
// }

// var test = document.getElementById("testcard");
// test.addEventListener('click',function(){
//   saveMember();
// });//test until Db coming
function DbDelMenuOrderID(m_id){
  
}
function DbDelID(m_id){

  let url = `http://localhost:8080/api/delete/invoice/${m_id}`;
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
function delIDGenerate(index){
  // console.log("Adding del ID",index);
  const id = index;
  const button = document.getElementById(`del-transaction${id}`);
  button.addEventListener('click',async function(){

    //ADDING confirm code
    let delconfirm = confirm(`Do you want to delete transaction id ${id}?`);
    if(delconfirm){
      if(await DbDelID(id) !== null){
      const del = document.getElementById(`transaction${id}`);
      del.parentNode.removeChild(del);
     memberList = memberList.filter(item => item !== id);
      }
      else{
      window.alert("Cannot delete Transaction due to Database Error");
      }
    }
    
    
  });
}

const inputSearchMember = document.querySelector('.arrow');

inputSearchMember.addEventListener('click', () => {
  let numInputValue = document.getElementById('numInputSearchValue');
  let numDisplayNone = (numInputValue.value - 1) * 10;
  if(memberList.length > numDisplayNone){
    memberList.forEach(e => {
      let b = document.getElementById(`transaction${e}`);
      b.style.display = 'table-row';
    })
    for(let n=0;n<numDisplayNone;n++){
      let b = document.getElementById(`transaction${memberList[n]}`);
      b.style.display = 'none';
      console.log(b);
    }
    for(let n=numDisplayNone ; n < memberList.length;n++){
      let b = document.getElementById(`transaction${memberList[n]}`);
      b.style.display = 'table-row';
    }
    updatePageButton(numInputValue.value);
  }else{
    console.log('not enough');
  }
  
})
function updatePageButton(value){
  var nextCurrentPageButton = document.getElementById('next-current-page');
  var currentPageButton = document.getElementById('current-page');
  currentPageButton.textContent = value;
  nextCurrentPageButton.textContent = ((parseInt(value))+1);
}

const previousPage = document.getElementById('previous-page');
const nextPage = document.getElementById('next-page');
const currentPage = document.getElementById('current-page');
const nextCurrentPage = document.getElementById('next-current-page');

function updatePage(page){
  let numDisplayNone = (page - 1) * 10;
  if(memberList.length > numDisplayNone){
    memberList.forEach(e => {
      let b = document.getElementById(`transaction${e}`);
      b.style.display = 'table-row';
    })
    for(let n=0;n<numDisplayNone;n++){
      let b = document.getElementById(`transaction${memberList[n]}`);
      b.style.display = 'none';
      console.log(b);
    }
    for(let n=numDisplayNone ; n < memberList.length;n++){
      let b = document.getElementById(`transaction${memberList[n]}`);
      b.style.display = 'table-row';
    }
    updatePageButton(page);
  }else{
    console.log('not enough');
  }
}
previousPage.addEventListener('click', () => {
 let curval = parseInt(currentPage.textContent)-1; 
  updatePage(curval);
  
  });
  nextPage.addEventListener('click', () => {
    let curval = parseInt(currentPage.textContent)+1; 
     updatePage(curval);
     
 });


async function addEditCardList(newMember) {
  memberEditInfoList.push(newMember);

  // dateTime : "2024-04-29T00:51:34.000+00:00"
  // i_change : 919.75
  // invoiceNo : 464
  // memberID : null
  // netPrice : 80.25
  // payment : 1000
  // paymentMethod : "Cash"
  // takeHome : false
  // totalDiscount : 0
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
  let dataTime = formatDate(newMember.dateTime);
  let iChange = newMember.i_change;
  let invoiceNo = newMember.invoiceNo;
  let memberID = newMember.memberID;
  let netPrice = newMember.netPrice;
  let payment = newMember.payment;
  let paymentMethod = newMember.paymentMethod;
  let takeHome = newMember.takeHome;
  let totalDiscount = newMember.totalDiscount;
  



  let idString = String(invoiceNo).padStart(10,'0');
  let eatAt;
  let cashierID = "pongsatorn sripli";
  let memberIDString;

  if(takeHome === true){
    eatAt = "take home";
  }else{
    eatAt = "Dine in";
  }

  if(memberID === null){
    memberIDString = "-";
  }else{
    memberIDString = memberID;
  }
  let invoiceData = await loadTransactionHistory(invoiceNo);
  console.log("The data from ",invoiceNo ," is ",invoiceData);
  let invoicePromo = invoiceData.filter(item => item.promotionAmount > 0);
//Example invoicePromo
//   {
//     dateTime: "2024-04-29T11:28:09.000+00:00",
//     i_change: 561.3,
//     invoiceNo: 41,
//     memberID: null,
//     netPrice: 438.7,
//     orderedAmount: 0,
//     orderedFood: null,
//     payment: "1000.0",
//     paymentMethod: "Cash",
//     promotionAmount: 2,
//     promotionCode: "RH8I-31SS-LOPQ",
//     takeHome: false,
//     totalDiscount: 0
// }


  let invoiceMenu = invoiceData.filter(item => item.orderedAmount > 0);

//example invoiceMenu
//   {
//     dateTime: "2024-04-29T12:16:54.000+00:00",
//     i_change: 769.95,
//     invoiceNo: 43,
//     memberID: null,
//     netPrice: 230.05,
//     orderedAmount: 3,
//     orderedFood: "Classic Margarita",
//     payment: "1000.0",
//     paymentMethod: "Cash",
//     promotionAmount: 0,
//     promotionCode: null,
//     takeHome: false,
//     totalDiscount: 0
// }
  console.log("List is Order menu id " ,invoiceNo," is ", invoiceMenu);
  console.log("List of Promo id ", invoiceNo ," is ", invoicePromo);
  console.log(invoiceMenu[0]);

  

  let card = `
                    <div class="edit-transaction-popup" id="editTransactionPopup${invoiceNo}" style="display:none;">
                    <div class="edit-transaction-popup-container">
                        <div class="edit-transaction-popup-con">
  
                            <div class="order-and-quit">
                                <h3>Order #${idString}</h3>
                                <div class="exit" id="exit${invoiceNo}">X</div>
                            </div>
                            <div class="order-info">
                                <p>${dataTime}</p>
                                <p>${eatAt}</p>
                                <p>Cashier:${cashierID}</p>
                                <p>${memberIDString}</p>
                            </div>
                            <div class="item">
                                <div class="item-container">
                                  <div class="item-con">
                    
                                    <div class="item-add-con">
                                      <div class="item-qty">
                                        <h2>Item: <span id="itemCount${invoiceNo}">0</span></h2>
                                      </div>
                                    </div>
                                    
                                    <div class="qty-item-container" id="itemSlideCon${invoiceNo}">
                    
                                      

                                    </div>
                                  </div>
                                </div>
                              </div>
  
                            <div class="paymentslip-container">
                                <div class="sub-total">
                                    <h2>Sub total</h2>
                                    <h2 id="paymentTotal">$${netPrice}</h2>
                                </div>
                                <div class="tax">
                                    <h2 id="paymentTax">Tax 7%(VAT included)</h2>
                                    <h2 id="paymentTaxTotal">$0</h2>
                                </div>
                                <div class="discount">
                                    <h2>Discount</h2>
                                    <h2 id="paymentDiscountTotal">$${totalDiscount}</h2>
                                </div>
                                <div class="total">
                                    <h2>Total</h2>
                                    <h2 id="allTotal">$${netPrice}</h2>
                                </div>
                            </div>
  
                            <p class="payment-method">Payment Method : ${paymentMethod}</p>
  
                        </div>
                    </div>
                </div>
                `;
    let editTransactionCon = document.getElementById('editTransactionPopupContainer');
    editTransactionCon.innerHTML += card;

    await new Promise(resolve => setTimeout(resolve, 0)); //wait Aboove line to run

    let netPriceAll = 0;
    let totalDiscountAll = 0;
    let paymentAll = 0;
    let countItem = 0;

    invoiceMenu.forEach((menu) => {
      addCardItemMenu(menu);
      netPriceAll += menu.netPrice;
      totalDiscountAll += menu.totalDiscount;
      paymentAll += menu.payment;
      countItem++;
    })

    invoicePromo.forEach((promo) => {
      addCardItemPromo(promo);
      netPriceAll += menu.netPrice;
      totalDiscountAll += menu.totalDiscount;
      paymentAll += menu.payment;
      countItem++;
    })

    let itemCount = document.getElementById(`itemCount${invoiceNo}`);
    itemCount.textContent = countItem;
    

    historyMemberButton();
}

function addCardItemMenu(menu) {

//example invoiceMenu
//   {
//     dateTime: "2024-04-29T12:16:54.000+00:00",
//     i_change: 769.95,
//     invoiceNo: 43,
//     memberID: null,
//     netPrice: 230.05,
//     orderedAmount: 3,
//     orderedFood: "Classic Margarita",
//     payment: "1000.0",
//     paymentMethod: "Cash",
//     promotionAmount: 0,
//     promotionCode: null,
//     takeHome: false,
//     totalDiscount: 0
// }

  let invoiceNo = menu.invoiceNo;
  let orderedFood = menu.orderedFood;
  let orderedAmount = menu.orderedAmount;
  let netPrice = menu.netPrice;

  let cardItem = `
                    <div class="item-card" id="item-card-${invoiceNo}">
                      <div class="item-card-con">
                        <div class="item-card-pic-container">
                            <img src="./component/CS251 Component/HomeMenuDish/${orderedFood}.png">
                        </div>
                        <h3 id="name-item-${invoiceNo}">${orderedFood}</h3>
                        <h3 id="count-item-${invoiceNo}" class="count-item">${orderedAmount}</h3>
                        <h3 id="price-item-${invoiceNo}" class="price-item">${netPrice}</h3>
                    </div>
                  </div>
    `;

  let itemSlideCon = document.getElementById(`itemSlideCon${invoiceNo}`);
  itemSlideCon.innerHTML += cardItem;
}

function addCardItemPromo(promo) {

 //Example invoicePromo
//   {
//     dateTime: "2024-04-29T11:28:09.000+00:00",
//     i_change: 561.3,
//     invoiceNo: 41,
//     memberID: null,
//     netPrice: 438.7,
//     orderedAmount: 0,
//     orderedFood: null,
//     payment: "1000.0",
//     paymentMethod: "Cash",
//     promotionAmount: 2,
//     promotionCode: "RH8I-31SS-LOPQ",
//     takeHome: false,
//     totalDiscount: 0
// }
  
    let invoiceNo = promo.invoiceNo;
    let orderedFood = promo.promotionCode;
    let orderedAmount = promo.promotionAmount;
    let netPrice = promo.netPrice;
  
    let cardItem = `
                      <div class="item-card" id="item-card-${invoiceNo}">
                        <div class="item-card-con">
                          <div class="item-card-pic-container">
                              <img src="./component/CS251 Component/HomeMenuDish/Classic Margarita">
                          </div>
                          <h3 id="name-item-${invoiceNo}">${orderedFood}</h3>
                          <h3 id="count-item-${invoiceNo}" class="count-item">${orderedAmount}</h3>
                          <h3 id="price-item-${invoiceNo}" class="price-item">${netPrice}</h3>
                      </div>
                    </div>
      `;
  
    let itemSlideCon = document.getElementById(`itemSlideCon${invoiceNo}`);
    itemSlideCon.innerHTML += cardItem;
  }


function historyMemberButton(){
  memberEditInfoList.forEach(e => {
    let id = e.invoiceNo;
    let historyButton = document.getElementById(`edit-transaction${id}`);
    historyButton.addEventListener('click', () => {
      let transactionHistory = document.getElementById(`editTransactionPopup${id}`);
      transactionHistory.style.display = 'block';

      let exitButton = document.getElementById(`exit${id}`);
      exitButton.addEventListener('click', () => {
        transactionHistory.style.display = 'none';
      });
    });
  });
}