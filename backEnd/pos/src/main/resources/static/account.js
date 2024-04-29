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

const editButton = document.getElementById('editButton');
const saveButton = document.getElementById('saveButton');
const adressInfo = document.getElementById('adressInfo');
const changeAddress = document.getElementById('changeAddress');

var toggleEdit = true;

editButton.addEventListener('click', () => {
  if(toggleEdit === true){
    saveButton.style.display = 'inline';
    editButton.style.marginLeft = '0px';
    editButton.textContent = 'Cancel';
    toggleEdit = false;

    adressInfo.style.display = 'none';
    changeAddress.style.display = 'block';
  }else{
    saveButton.style.display = 'none';
    editButton.style.marginLeft = '115px';
    editButton.textContent = 'Edit';
    toggleEdit = true;

    adressInfo.style.display = 'block';
    changeAddress.style.display = 'none';
  }
})

saveButton.addEventListener('click', () => {
    saveButton.style.display = 'none';
    editButton.style.marginLeft = '115px';
    editButton.textContent = 'Edit';
    toggleEdit = true;

    adressInfo.style.display = 'block';
    let newAdress = changeAddress.value;
    adressInfo.textContent = newAdress;
    console.log(newAdress.length);
    changeAddress.style.display = 'none';
})

const dailySales = document.getElementById('dailySales');
const monthlySales = document.getElementById('monthlySales');
const changeGraph = document.getElementById('changeGraph');

dailySales.addEventListener('click', () => {
  changeGraph.style.opacity = '0'; 
  setTimeout(() => {
    changeGraph.src = './component/CS251 Component/icon/graph1.png';
    changeGraph.style.opacity = '1';
  }, 800); 
});

monthlySales.addEventListener('click', () => {
  changeGraph.style.opacity = '0'; 
  setTimeout(() => {
    changeGraph.src = './component/CS251 Component/icon/graph1.png';
    changeGraph.style.opacity = '1';
  }, 800);
});

/* <h2>Account</h2>
<div class="main-con">
    <div class="account-info">
        <div class="account-info-profile-and-name">
            <img src="./component/CS251 Component/Food category/1777635_can_coke_cola_drink_packaging_icon.svg">
            <h2 id="name">Name:xxxxxxxxxx</h2>
        </div>
        <div class="account-info-word-id">
            <h3>Word ID:</h3>
            <span style="padding: 0 70px;"></span>
            <h3 id="work-id">12345678</h3>
        </div>
        <div class="account-info-tel">
            <h3>Tel:</h3>
            <span style="padding: 0 70px;"></span>
            <h3 id="tel">123-123-1234</h3>
        </div>
        <div class="account-info-address">
            <h3 style="height: 30px;">Address:</h3>
            <h3 id="adressInfo">
                99 Village
                No.18
                Kamphaeng Din Road,
                Si Phum Sub-district,
                Muang District,
                Chiang Mai, 50180
            </h3>
            <textarea rows="4" cols="50" style="display:none" id="changeAddress"></textarea>
        </div>
        <div class="account-info-start-date">
            <h3>Start Date:</h3>
            <span style="padding: 0 67px;"></span>
            <h3 id="start-date">xx/xx/xx</h3>
        </div>
        <div class="account-info-button">
            <button type="button" id="editButton">Edit</button>
            <button type="button" style="display:none" id="saveButton">Save</button>
        </div>
    </div> */
let currentSeller;
function getSeller(){
 
   return fetch("http://localhost:8080/api/seller/6509681141")
    .then(response => {
      // Check if the response is successful (status code 200)
      if (!response.ok) {
        //throw new Error('Network response was not ok');
        return null;
      }
      // Parse the JSON response
      return response.json();
    })
    .then(data => {
      // Data retrieved successfully, do something with it
      console.log(data);
      return data;
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('There was a problem with the fetch operation:', error);
    }); 
}
function getSellerTel(){
  return fetch("http://localhost:8080/api/seller/tel/6509681141")
  .then(response =>{
    if(!response.ok){
      return null;
    }
    return response.json();
  }).then(data=>{
    console.log(data);
    return data;
  })
  .catch(error =>{
    console.error('There was a problem with the fetch operation:', error);
  });
}
getSeller().then((result)=>{
  currentSeller = result;
  let namehtml = document.getElementById('name');
  let telhtml = document.getElementById('tel');
  let workidhtml = document.getElementById('work-id');
  let addresshtml = document.getElementById('addressInfo');
  let startDatehtml = document.getElementById('start-date');
  namehtml.textContent = currentSeller.s_name;
  //telhtml.textContent = currentSeller.s_tel;
  workidhtml.textContent = currentSeller.s_workid;
  addresshtml.textContent = currentSeller.s_address;
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
  let format_s_Date = formatDate(currentSeller.s_startDate);
  startDatehtml.textContent = format_s_Date;
  getSellerTel().then(telresult=>{
    if(telresult !== null){
      telhtml.textContent="";
      console.log(telresult);
      telresult.forEach((tel,index) =>{
      if(index > 0) telhtml.textContent += '\n';
      telhtml.textContent += tel.s_tel
      });
    }
  });
  //console.log(currentSeller);
});
