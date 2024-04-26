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
    changeGraph.src = './component/CS251 Component/icon/yuji.jpg';
    changeGraph.style.opacity = '1';
  }, 800);
});