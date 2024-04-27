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
    data.forEach((invoice)=>{
      saveTransaction(invoice);
    });
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('There was a problem with the fetch operation:', error);
  });
}
loadTransaction();

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
  if (invoice.serveType == true){
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
  <td>$55</td>
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
  });


  console.log(table.innerHTML);
 
}
function updateTable(){
  const table = document.getElementById('tableTransaction');
  table
}
// var test = document.getElementById("testcard");
// test.addEventListener('click',function(){
//   saveMember();
// });//test until Db coming

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
  button.addEventListener('click',function(){

    //ADDING confirm code
    if(DbDelID(id) !== null){
      const del = document.getElementById(`transaction${id}`);
      del.parentNode.removeChild(del);
     memberList = memberList.filter(item => item !== id);
    }
    else{
      window.alert("Cannot delete Transaction due to Database Error");
    }
    
  });
}

// function editMember(index){
  
//   let card = `<div class="add-member-popup">
//                 <div class="add-member-popup-container">
//                     <div class="add-member-popup-con">
//                         <div class="membertext-and-quit">
//                             <h3>Member Form</h3>
//                             <div class="exit">X</div>
//                         </div>
//                         <div class="member-name">
//                             <p>Member Name</p>
//                             <input type="text" id="addMemberName">
//                         </div>
//                         <div class="member-info">
//                             <div class="info-box">
//                                 <label for="password">password</label><input type="text" name="password" id="addMemberPassword">
//                             </div>
//                             <div class="info-box">
//                                 <label for="citizenID">citizen ID</label><input type="text" name="citizenID" id="addMemberCitizenID">
//                             </div>
//                             <div class="info-box">
//                                 <label for="tel">Tel</label><input type="text" name="tel" id="addMemberTel">
//                             </div>
//                             <div class="info-box">
//                                 <label for="birthDate">Birth Date</label><input type="text" name="birthDate" id="addMemberBirthDate">
//                             </div>
//                         </div>
//                         <div class="button-save">
//                             <button type="button" onclick="saveMember()">SAVE</button>
//                         </div>
//                     </div>
//                 </div>
//               </div>`;

// }

// const exit = document.querySelector('.exit');

// exit.addEventListener('click', () => {
//   popup.style.display = 'none';
// });

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


