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

var memberInfoList=[
  // {
  //   "name": "pee",
  //   "password": "admin",
  //   "citizenID": "1212312121",
  //   "tel": "0811231456",
  //   "birthDate": "12/34/56",
  // },
];
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
function dbAddmember(json){
  window.alert(json);
  return true;
}

function saveMember() {
  let name = document.getElementById('addMemberName').value;
  let password = document.getElementById('addMemberPassword').value;
  let citizenID = document.getElementById('addMemberCitizenID').value;
  let tel = document.getElementById('addMemberTel').value;
  let birthDate = document.getElementById('addMemberBirthDate').value;

  var currentDate = new Date();
  let idAutoString = String(idAuto).padStart(10,'0');

  var daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  var day = daysOfWeek[currentDate.getDay()];
  var month = months[currentDate.getMonth()];
  var date = currentDate.getDate();
  var year = currentDate.getFullYear();
  var senddel = idAuto;

  const DBmonth = String(currentDate.getMonth() + 1).padStart(2, '0');
  const DBday = String(currentDate.getDate()).padStart(2, '0');
  
  // Format the date string as YYYY-MM-DD
  var DBformattedDate = `${currentDate.getFullYear()}-${DBmonth}-${DBday}`;

  var formattedDate = day + ", " + month + " " + date + " " + year;

let newMember = {
    "name": name,
    "password": password,
    "citizenID": citizenID,
    "tel": tel,
    "birthDate": birthDate,
    "Date" : DBformattedDate
  };
  
  if(validating(newMember)){
  console.log(newMember);
  let jsonMember = JSON.stringify(newMember);

  memberInfoList.push(newMember);
  if(dbAddmember(jsonMember)){


  let card = `
              <tr id = "memberList${idAuto}">
                <td>${idCount}</td>
                <td>${idAutoString}</td>
                <td>${formattedDate}</td>
                <td>0</td>
                <td><div class="member-edit-icon">
                <img src="./component/CS251 Component/icon/trash.png" id = "removeList${idAuto}">
                <img src="./component/CS251 Component/icon/setting.png" id="editList${idAuto}">
                 </div></td>
              </tr>
            `;
  
  const table = document.getElementById('tableMember');
  table.innerHTML += card;
  idCount++;
  idAuto++;
  memberList.push(senddel);
  memberList.forEach(element => {
    delIDGenerate(element);
  });
  memberList.forEach(element => {
    delIDGenerate(element);
  });
  clearAddmemberBox();
  }
  else{
    window.alert("Failue due to database error");
  }
}
else{
  window.alert("Invalid format. Cancel Adding...");
}
 
  //console.log(table.innerHTML);
 
  
  popup.style.display = 'none';
}
function DbDelID(id){
  return true;
}
function delIDGenerate(index){
  // console.log("Adding del ID",index);
  const id = index;
  const button = document.getElementById(`removeList${id}`);
  button.addEventListener('click',function(){

    //ADDING confirm code

    if(DbDelID(id)){
      const del = document.getElementById(`memberList${id}`);
      del.parentNode.removeChild(del);
      memberList = memberList.filter(item => item !== id);
    }
    else{
      window.alert("Failed to delete from DB");
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

const exit = document.querySelector('.exit');

exit.addEventListener('click', () => {
  popup.style.display = 'none';
});

const inputSearchMember = document.querySelector('.arrow');

inputSearchMember.addEventListener('click', () => {
  let numInputValue = document.getElementById('numInputSearchValue');
  let numDisplayNone = (numInputValue.value - 1) * 10;
  if(memberList.length > numDisplayNone){
    memberList.forEach(e => {
      let b = document.getElementById(`memberList${e}`);
      b.style.display = 'table-row';
    })
    for(let n=0;n<numDisplayNone;n++){
      let b = document.getElementById(`memberList${memberList[n]}`);
      b.style.display = 'none';
      console.log(b);
    }
    for(let n=numDisplayNone ; n < memberList.length;n++){
      let b = document.getElementById(`memberList${memberList[n]}`);
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
      let b = document.getElementById(`memberList${e}`);
      b.style.display = 'table-row';
    })
    for(let n=0;n<numDisplayNone;n++){
      let b = document.getElementById(`memberList${memberList[n]}`);
      b.style.display = 'none';
      console.log(b);
    }
    for(let n=numDisplayNone ; n < memberList.length;n++){
      let b = document.getElementById(`memberList${memberList[n]}`);
      b.style.display = 'table-row';
    }
    updatePageButton(page);
  }else{
    console.log('not enough');
  }
}
previousPage.addEventListener('click', () => {
 let curval = parseInt(currentPage.textContent)-1; 
 currentPage.value = curval;
 nextCurrentPage.value = (curval + 1);
  updatePage(curval);
  
  });
  nextPage.addEventListener('click', () => {
    let curval = parseInt(currentPage.textContent)+1; 
    currentPage.value = curval;
    nextCurrentPage.value = (curval + 1);
     updatePage(curval);
 });


