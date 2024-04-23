const promotion_data = [
    {
        "promotionName" : "you are my special!",
        "promotionCode" : "12345",
        "Expired" : "12/34/56",
        "Price" : 900,
        "image_url" : "https://example.com/classic_cheeseburger.jpg",
        "menu_id_data" : [0, 1]
    }
  ]
  
  const food_category = [
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
  
  const menu_data = [
    {
      "id": "0",
      "name": "Classic Cheeseburger",
      "food_category": "Burger",
      "quantity": 10,
      "price": 120,
      "description": "A classic cheeseburger with cheddar cheese, lettuce, tomato, and pickles.",
      "image_url": "https://example.com/classic_cheeseburger.jpg"
    },
    {
      "id": "1",
      "name": "Crispy Chicken Wings",
      "food_category": "Chicken",
      "quantity": 3,
      "price": 150,
      "description": "Crispy chicken wings served with your choice of dipping sauce.",
      "image_url": "https://example.com/crispy_chicken_wings.jpg"
    },
    {
      "id": "2",
      "name": "Taco Supreme",
      "food_category": "Taco",
      "quantity": 6,
      "price": 100,
      "description": "A supreme taco filled with seasoned ground beef, lettuce, cheese, and tomato.",
      "image_url": "https://example.com/taco_supreme.jpg"
    },
    {
      "id": "3",
      "name": "Loaded Fries",
      "food_category": "Fries",
      "quantity": 8,
      "price": 90,
      "description": "Fries loaded with melted cheese, crispy bacon, and green onions.",
      "image_url": "https://example.com/loaded_fries.jpg"
    },
    {
      "id": "4",
      "name": "Chocolate Brownie Sundae",
      "food_category": "Dessert",
      "quantity": 2,
      "price": 80,
      "description": "A decadent chocolate brownie topped with vanilla ice cream and chocolate sauce.",
      "image_url": "https://example.com/chocolate_brownie_sundae.jpg"
    },
    {
      "id": "5",
      "name": "Classic Margarita",
      "food_category": "Drink",
      "quantity": 3,
      "price": 70,
      "description": "A classic margarita made with tequila, lime juice, and triple sec.",
      "image_url": "https://example.com/classic_margarita.jpg"
    },
    {
      "id": "6",
      "name": "All American Burger",
      "food_category": "Burger",
      "quantity": 4,
      "price": 130,
      "description": "A burger with all the classic fixings: lettuce, tomato, onion, and pickles.",
      "image_url": "https://example.com/all_american_burger.jpg"
    },
    {
      "id": "7",
      "name": "Spicy Chicken Sandwich",
      "food_category": "Chicken",
      "quantity": 99,
      "price": 140,
      "description": "A spicy chicken sandwich served on a toasted bun with lettuce and mayo.",
      "image_url": "https://example.com/spicy_chicken_sandwich.jpg"
    },
    {
      "id": "8",
      "name": "Crispy Fish Taco",
      "food_category": "Taco",
      "quantity": 3,
      "price": 110,
      "description": "A crispy fish taco with shredded cabbage and tangy tartar sauce.",
      "image_url": "https://example.com/crispy_fish_taco.jpg"
    },
    {
      "id": "9",
      "name": "Sweet Potato Fries",
      "food_category": "Fries",
      "quantity": 69,
      "price": 100,
      "description": "Sweet potato fries seasoned with cinnamon and sugar.",
      "image_url": "https://example.com/sweet_potato_fries.jpg"
    }
];

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
  })
}


