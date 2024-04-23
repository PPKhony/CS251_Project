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
var serving = ["Dine in","Take away"];
var payment = ["Scan","Cash","Promptpay"];
var memberInfoList=[
  // {
  //   "name": "pee",
  //   "password": "admin",
  //   "citizenID": "1212312121",
  //   "tel": "0811231456",
  //   "birthDate": "12/34/56",
  // },
];

function saveMember() {
  // let name = document.getElementById('addMemberName').value;
  // let password = document.getElementById('addMemberPassword').value;
  // let citizenID = document.getElementById('addMemberCitizenID').value;
  // let tel = document.getElementById('addMemberTel').value;
  // let birthDate = document.getElementById('addMemberBirthDate').value;
  let idAutoString = String(idAuto).padStart(10,'0');

  // let newMember = {
  //   "name": name,
  //   "password": password,
  //   "citizenID": citizenID,
  //   "tel": tel,
  //   "birthDate": birthDate
  // };

  // memberInfoList.push(newMember);

  var currentDate = new Date();

// Days of the week and months array
  var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Get day, month, and year
  var day = daysOfWeek[currentDate.getDay()];
  var month = months[currentDate.getMonth()];
  var date = currentDate.getDate();
  var year = currentDate.getFullYear();
  var senddel = idAuto;

// Format the date
  var formattedDate = day + ", " + month + " " + date + " " + year;
  let card = `
  <tr id="transaction${idAuto}">
  <td>${idCount}</td>
  <td>${idAutoString}</td>
  <td>${formattedDate}</td>
  <td>${serving[idCount%2]}</td>
  <td>${payment[idCount%3]}</td>
  <td>$55</td>
  <td><div class="member-edit-icon">
      <img src="./component/CS251 Component/icon/trash.png" id="del-transaction${idAuto}">
      <img src="./component/CS251 Component/icon/setting.png" id="edit-transaction${idAuto}">
  </div></td>
</tr>`;
  
  const table = document.getElementById('tableTransaction');
  table.innerHTML += card;
  idCount++;
  idAuto++;
  memberList.push(senddel);
  memberList.forEach(element => {
    delIDGenerate(element);
  });
  // memberList.forEach(element => {
  //   delIDGenerate(element);
  // });
 
  console.log(table.innerHTML);
 
  
  // popup.style.display = 'none';
}
var test = document.getElementById("testcard");
test.addEventListener('click',function(){
  saveMember();
});//test until Db coming


function delIDGenerate(index){
  // console.log("Adding del ID",index);
  const id = index;
  const button = document.getElementById(`del-transaction${id}`);
  button.addEventListener('click',function(){
    //ADDING confirm code
    const del = document.getElementById(`transaction${id}`);
    del.parentNode.removeChild(del);
    memberList = memberList.filter(item => item !== id);
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


