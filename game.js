const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const balanceEl = document.getElementById("balance");
let balance = 1000;
let jumpCount = 0;

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" || event.code === "ArrowUp") {
        jump();
    }
});

function jump() {
    if (dino.classList != "jump") {
        dino.classList.add("jump")
        jumpCount++;
    }
    setTimeout( function() {
        dino.classList.remove("jump")
    }, 300)
    
    if (jumpCount === 5) {
        askSpending();
        jumpCount = 0;
    }
}

function askSpending() {
    const choice = prompt("Куда вы потратите деньги?\n1. Ресторан (-200)\n2. Игрушки (-150)\n3. Книги (-100)\n4. Никуда (0)");
    
    let amount = 0;
    if (choice === "1") amount = 200;
    else if (choice === "2") amount = 150;
    else if (choice === "3") amount = 100;
    
    balance -= amount;
    balanceEl.textContent = balance;
}

let isAlive = setInterval(function() {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
        alert("Game Over");
    }
}, 10);
