

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

function loadUser(){
  fetch("http://localhost:8080/api/member/all")
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
    data.forEach(async (member)=>{
      await addCardList(member);
      await addEditCardList(member);
    });
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('There was a problem with the fetch operation:', error);
  });
}
loadUser();

// let newMember = {
//   "m_id" : randomTenDigitNumber,
//   "m_password": password,
//   "m_rank":"Bronze",
//   "m_citizenId": citizenID,
//   "m_name": name,
//   "m_points": 500,
//   "m_enroll" : DBformattedDate,
//   "m_birthdate": formatBD(birthDate),
// };
function validating(obj){
  let regexCitizen = /^\d{13}$/
  let regexBd = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  let arrayCit = obj.m_citizenId.split("").reverse().map((num, index) => ({ index: index + 1, value: parseInt(num) }));
  let sum = 0;
  let [y,m,d] = obj.m_birthdate.split("-");
  let inputBD = `${d}/${m}/${y}`;
  console.log(inputBD);
  if(regexCitizen.test(obj.m_citizenId)){
  for(let i = 1 ; i < 13; i++){
    sum += arrayCit[i].index * arrayCit[i].value;
  }
    sum = (11-sum%11)%10;
  }
  
  if(!(regexCitizen.test(obj.m_citizenId) && (sum==arrayCit[0].value))){
    window.alert("Invalid citizen ID format")
  }
  if(!(regexBd.test(inputBD))){
    window.alert("Invalid Birthdate format (dd/mm/yyyy)");
  }
  return regexCitizen.test(obj.m_citizenId)  && regexBd.test(inputBD) && (sum==arrayCit[0].value);
}
function validatingtel(obj){
  let regextel = /^0\d{9}$/;
  //  regextel.test(obj.tel)
  return true;
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
function dbAddmember(json) {
  console.log(json);
  let url = 'http://localhost:8080/api/add/member';
  
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
function dbAddMemberTel(jsontel){
  let telurl = 'http://localhost:8080/api/add/member/tel'
  return fetch(telurl,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body : jsontel,
  }).then(res =>{
    if(res.ok){
      return res.json();
    }
    else{
      console.error('Network response was not ok');
      return null;
    }
    
  }).catch(err =>{
    console.error('Error : ',err);
  });
}

function dbEditMember(json, id) {
  console.log(json);
  let url = `http://localhost:8080/api/update/member/${id}`;
  
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
        //throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Member updated successfully:', data);
      return data;
      // จัดการกับการอัปเดตข้อมูลต่อไปเมื่อทำสำเร็จ
    })
    .catch(error => {
      console.error('Error updating member:', error);
      // จัดการกับข้อผิดพลาดที่เกิดขึ้น
    });
}

function dbEditMemberTel(jsontel, id){
  let telurl = '#' //รอ backend
  return fetch(telurl,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body : jsontel,
  }).then(res =>{
    if(res.ok){
      return res.json();
    }
    else{
      console.error('Network response was not ok');
      return null;
    }
    
  }).catch(err =>{
    console.error('Error : ',err);
  });
}

function addCardList(newMember){
  memberInfoList.push(newMember);
  let userId = newMember.m_id;
  const date = new Date(newMember.m_enroll);
  let userNo = userId%10000;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const formattedDate = `${days[date.getUTCDay()]}, ${months[date.getUTCMonth()]} ${date.getUTCDate()} ${date.getUTCFullYear()}`;
    let card = `
                <tr id = "memberList${userId}">
                  <td>${userNo}</td>
                  <td>${userId}</td>
                  <td>${formattedDate}</td>
                  <td>${newMember.m_points}</td>
                  <td><div class="member-edit-icon">
                  <img src="./component/CS251 Component/icon/trash.png" id = "removeList${userId}">
                  <img src="./component/CS251 Component/icon/setting.png" id="editList${userId}">
                   </div></td>
                </tr>
              `;
    
    const table = document.getElementById('tableMember');
    table.innerHTML += card;
    memberList.push(userId);
    memberList.forEach(element => {
      delIDGenerate(element);
    });

}

function addEditCardList(newMember) {
    memberEditInfoList.push(newMember);
    let userId = newMember.m_id;
    let user = newMember;
    let card = `
                <div class="edit-member-popup" id="edit-member-popup${userId}" style="display:none;">
                <div class="edit-member-popup-container">
                    <div class="edit-member-popup-con">
                        <div class="membertext-and-quit">
                            <h3>Member Form</h3>
                            <div class="exit" id="exit${userId}">X</div>
                        </div>
                        <div class="member-name">
                            <p>Member Name</p>
                            <input type="text" id="editMemberName${userId}" value="${user.m_name}">
                        </div>
                        <div class="member-info">
                            <div class="info-box">
                                <label for="password">password</label><input type="text" name="password" id="editMemberPassword${userId}" value="${user.m_password}">
                            </div>
                            <div class="info-box">
                                <label for="citizenID">citizen ID</label><input type="text" name="citizenID" id="editMemberCitizenID${userId}" value="${user.m_citizenId}">
                            </div>
                            <div class="info-box">
                                <label for="tel">Tel</label><input type="text" name="tel" id="editMemberTel${userId}" value="ExampleTel">
                            </div>
                            <div class="info-box">
                                <label for="birthDate">Birth Date</label><input type="text" name="birthDate" id="editMemberBirthDate${userId}" value="${user.m_birthdate}">
                            </div>
                        </div>
                        <div class="button-save">
                            <button type="button" id="saveEditMember${userId}">SAVE</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
      let editMemberCon = document.getElementById('editMemberCon');
      editMemberCon.innerHTML += card;

      editMemberButton();
}

function editMemberButton() {
  memberEditInfoList.forEach(e => {
    console.log(e.m_id + ' access edit');
    let userId = e.m_id;
    let editButton = document.getElementById(`editList${userId}`);
    editButton.addEventListener('click', () => {

      let userPopup = document.getElementById(`edit-member-popup${userId}`);
      userPopup.style.display = 'block';

      let exit = document.getElementById(`exit${userId}`);
      exit.addEventListener('click', () => {
      console.log(e.m_id + ' exit edit!!');
      userPopup.style.display = 'none';
      });

      let save = document.getElementById(`saveEditMember${userId}`);
      save.addEventListener('click', () => {
        console.log(' save success!!');
        saveEditMember(userId, e);
      });
    
    });
  });
}

function saveEditMember(userId, e) {
  let editMemberName = document.getElementById(`editMemberName${userId}`).value;
  let editMemberCitizenID = document.getElementById(`editMemberCitizenID${userId}`).value;
  let editMemberPassword = document.getElementById(`editMemberPassword${userId}`).value;
  let editMemberTel = document.getElementById(`editMemberTel${userId}`).value;
  let editMemberBirthDate = document.getElementById(`editMemberBirthDate${userId}`).value;

  var currentDate = new Date();
  let memberCurrentPoint = e.m_points;
  let memberCurrentRank = e.m_rank;
  let memberCurrentBD = e.m_birthdate;
  
  var DBformattedDate = currentDate.toISOString().replace('Z', '+07:00');


  //  function formatBD(dateString) {
  //   // Split the date string into day, month, and year components
  //    const [day, month, year] = dateString.split('/');

  //   // Reorder the components to YYYY-MM-DD format
  //     const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

  //     return formattedDate;
  //   }

let editMember = {
    "m_password": editMemberPassword,
    "m_rank": memberCurrentRank,
    "m_citizenId": editMemberCitizenID,
    "m_name": editMemberName,
    "m_points": memberCurrentPoint,
    "m_enroll" : DBformattedDate,
    "m_birthdate": memberCurrentBD,
  };


  if(validating(editMember)){
    let jsonMember = JSON.stringify(editMember);
    console.log(jsonMember);
      dbEditMember(jsonMember, userId).then(result=>{
      if(result !== null){
        // addCardList(newMember);
        // addEditCardList(newMember);
        // clearAddmemberBox();
        editMemberBox(userId, editMemberPassword, memberCurrentRank, editMemberCitizenID, editMemberName, memberCurrentPoint, DBformattedDate, memberCurrentBD);
        console.log('edit member complete!!');
      }
      else{
        window.alert("Failue due to database error");
      }
     });
    
  }
  else{
    window.alert("Invalid format. Cancel Adding...");
  }
   
    //console.log(table.innerHTML);
   
    let userPopup = document.getElementById(`edit-member-popup${userId}`);
    userPopup.style.display = 'none';
}

function editMemberBox(userId, password, rank, citizenID, name, point, enroll, bd){
  
}

function saveMember() {
  let name = document.getElementById('addMemberName').value;
  let password = document.getElementById('addMemberPassword').value;
  let citizenID = document.getElementById('addMemberCitizenID').value;
  let tel = document.getElementById('addMemberTel').value;
  let birthDate = document.getElementById('addMemberBirthDate').value;

  var currentDate = new Date();
  const randomNumber = Math.floor(Math.random() * 90000) + 10000;

// Concatenate '42069' with the random number
  const randomTenDigitNumber = '42069' + randomNumber;
  var DBformattedDate = currentDate.toISOString().replace('Z', '+07:00');


   function formatBD(dateString) {
    // Split the date string into day, month, and year components
     const [day, month, year] = dateString.split('/');

    // Reorder the components to YYYY-MM-DD format
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

      return formattedDate;
    }

let newMember = {
    "m_id" : randomTenDigitNumber,
    "m_password": password,
    "m_rank":"Bronze",
    "m_citizenId": citizenID,
    "m_name": name,
    "m_points": 500,
    "m_enroll" : DBformattedDate,
    "m_birthdate": formatBD(birthDate),
  };
  let newMemberTel = {
    "m_id" : randomTenDigitNumber,
    "m_tel" : tel
  }
  let newMemberTeljson = JSON.stringify(newMemberTel);

//   let jsonexample = {
//     "m_id": "6509681141",
//   "m_password": "password",
//   "m_rank": "Gold",
//   "m_citizenId": "1121155511111",
//   "m_name": "Ratatui",
//   "m_points": 500,
//   "m_enroll": "2024-04-03T05:30:00.000+00:00",
//   "m_birthdate": "2024-04-03"
//  }
  
  if(validating(newMember)){
  let jsonMember = JSON.stringify(newMember);
  //console.log(jsonMember,newMemberTeljson);
   dbAddmember(jsonMember).then(result=>{
    if(result === null){
      window.alert("Failue due to add Member database error");
    }
    else{
    dbAddMemberTel(newMemberTeljson).then((telresult)=>{
      if(telresult !== null){
        addCardList(newMember);
        clearAddmemberBox();
      }
      else{
        window.alert("Failue due to add Member tel database error");
      }
    });
  }
    
   });
  
}
else{
  window.alert("Invalid format. Cancel Adding...");
}
 
  //console.log(table.innerHTML);
 
  
  popup.style.display = 'none';
}

function DbDelID(m_id){
  let url = `http://localhost:8080/api/delete/member/${m_id}`;
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
  // return true;
  
}
function delIDGenerate(dbID){
  // console.log("Adding del ID",index);
  const id = dbID;
  const button = document.getElementById(`removeList${id}`);
  button.addEventListener('click',function(){

    //ADDING confirm code

    if(DbDelID(dbID) !== null){
      const del = document.getElementById(`memberList${id}`);
      del.parentNode.removeChild(del);
      memberList = memberList.filter(item => item !== id);
    }
    else{
      window.alert("Failed to delete from DB");
    }
  });

}

//idk just wait

// function editIDGenerate(dbID){
//   let id = dbID;
//   let button = document.getElementById(`editList${id}`);
//   button.addEventListener('click',function(){

//     if(DbEditID(dbID) !== null){
//       const edit = document.getElementById(`memberList${id}`);
      
      
//     }
//     else{
//       window.alert("Failed to update from DB");
//     }

//   });
// }

//wait

// function DbEditID(m_id){
//   let url = `http://localhost:8080/api/update/member/${m_id}`;
//   return fetch(url, {
//       method: 'PUT',
//       headers: {
//           'Content-Type': 'application/json',
//           // Add any other headers if required
//       },
      
//   })
//   .then(response => {
//       if (response.ok) {
//           return response.json(); // Return parsed JSON for successful response
//       } else {
//           console.error('Network response was not ok');
//           return null; // Return null for non-success response
//       }
//   })
//   .catch(error => {
//       console.error('Error:', error);
//       //throw error; // Re-throw the error for further handling
//   });
//   // return true; 
// }

// function editIDGenerate(dbID) {
//   const id = dbID;
//   const button = document.getElementById(`editList${id}`);

//   button.addEventListener('click', () => {

//     const card = `
//                   <div class="edit-member-popup" id="edit-member-popup${id}">
//                     <div class="edit-member-popup-container">
//                         <div class="edit-member-popup-con">
//                             <div class="membertext-and-quit">
//                                 <h3>Member Form</h3>
//                                 <div class="exit">X</div>
//                             </div>
//                             <div class="member-name">
//                                 <p>Member Name</p>
//                                 <input type="text" id="editMemberName${id}" placeholder="ExampleMemberName">
//                             </div>
//                             <div class="member-info">
//                                 <div class="info-box">
//                                     <label for="password">password</label><input type="text" name="password" id="addMemberPassword${id}" placeholder="ExampleMemberPassword">
//                                 </div>
//                                 <div class="info-box">
//                                     <label for="citizenID">citizen ID</label><input type="text" name="citizenID" id="addMemberCitizenID${id}" placeholder="ExampleMemberCitizenID">
//                                 </div>
//                                 <div class="info-box">
//                                     <label for="tel">Tel</label><input type="text" name="tel" id="addMemberTel${id}" placeholder="ExampleMemberTel">
//                                 </div>
//                                 <div class="info-box">
//                                     <label for="birthDate">Birth Date</label><input type="text" name="birthDate" id="addMemberBirthDate${id}" placeholder="ExampleMemberBD">
//                                 </div>
//                             </div>
//                             <div class="button-save">
//                                 <button type="button" onclick="saveEditMember(${id})">SAVE</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//               `;

//     const container = document.createElement('div');
//     container.innerHTML = card;

//     document.body.appendChild(container);
//   });
// }

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


