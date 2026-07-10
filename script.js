// 1. Theme toggle button aur poori body ko select karein
let themeBtn = document.querySelector(".theme-toggle-btn");
let bodyElement = document.body;

// 2. Button par click event lagayein
themeBtn.addEventListener("click", function() {
    // toggle ka matlab hai: agar class lagi hui hai to hata do, agar nahi lagi to laga do!
    bodyElement.classList.toggle("dark-theme");
    
    // Sath hi button ka text bhi badalte hain ke pata chale ab kia hoga
    if (bodyElement.classList.contains("dark-theme")) {
        themeBtn.innerText = "☀️ Light Mode";
    } else {
        themeBtn.innerText = "🌙 Dark Mode";
    }
});
//  down step //

let cardsContainer = document.querySelector(".cards-container");
let searchInput = document.getElementById("search-input");
let searchBtn = document.getElementById("search-btn"); // 🆕 Button select kiya
let noDataMessage = document.getElementById("no-data-message"); // 🆕 Message wala dabba

let allUsers = [];

fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(usersList => {
      allUsers = usersList;
      displayCards(allUsers);
  });

function displayCards(users) {
    cardsContainer.innerHTML = "";
    
    // 🆕 Agar koi user na mile (List khali ho)
    if (users.length === 0) {
        noDataMessage.innerText = "😞 No developer found with this name!";
        return; // Yahin se wapis chale jao, neeche ka loop chalane ki zaroorat nahi
    } else {
        noDataMessage.innerText = ""; // Agar data mil jaye to message saaf kar do
    }
    
    users.forEach(user => {
        let card = document.createElement("div");
        card.className = "profile-card";
        
        let randomId = user.id;
        let profilePic = `https://picsum.photos/150?random=${randomId}`;

        card.innerHTML = `
            <img src="${profilePic}" alt="Profile Picture">
            <h2>${user.name}</h2>
            <p>📍 ${user.address.city}</p>
            <p style="font-size: 13px; color: #666;">📧 ${user.email}</p>
            <button class="connect-btn">Connect</button>
        `;
        
        cardsContainer.appendChild(card);

        let currentBtn = card.querySelector(".connect-btn");
        currentBtn.addEventListener("click", function() {
            alert(`Connection request sent to ${user.name}! 🤝`);
            currentBtn.innerText = "Requested";
            currentBtn.style.backgroundColor = "#28a745";
        });
    });
}

// 🆕 Ek common machine (Function) filtering ke liye
function filterData() {
    let searchText = searchInput.value.toLowerCase();
    
    let filteredUsers = allUsers.filter(user => {
        return user.name.toLowerCase().includes(searchText);
    });
    
    displayCards(filteredUsers);
}

// 1. Agar user type kare to sath sath filter ho (Live Search)
searchInput.addEventListener("input", filterData);

// 2. 🆕 Agar user Search Button par click kare tab filter ho
searchBtn.addEventListener("click", filterData);

