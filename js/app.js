// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*(dt)
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//function to show the winning game screen
function gameOver() {
    swal.fire({
        type: 'success',
        title: 'Congratulations!',
        html: 'You have won the game!',
        confirmButtonText: 'Awesome',
        allowOutsideClick: false
    }).then(
            resetGame
  )
}

//function to reset the game after winning or losing
function resetGame() {
    player.x = 200;
    player.y = 375;
    allEnemies = populateInitialEnemies();
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;

    // The image/sprite for a player character
    this.sprite = 'images/char-boy.png';
};

Player.prototype.handleInput = function(e) {
    movement_mod_x = 100;
    movement_mod_y = 83;
    switch(e) {
        case 'left':
            if(this.x>0) {
                this.x = this.x-movement_mod_x;
            }
            break;
        case 'right':
            if(this.x<400) {
                this.x = this.x+movement_mod_x;
            }
            break;
        case 'up':
            if(this.y>90) {
                this.y = this.y-movement_mod_y;
            }
            else {
                gameOver();
            }
            break;
        case 'down':
        if(this.y<375) {
            this.y = this.y+movement_mod_y;
        }
            break;
    }
};

// Update the player's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    this.render();
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function randomRange(min, max) {
    let anInt = Math.floor(Math.random() * (max-min+1))+min
    return anInt
}

// Now instantiate your objects.
// Create a function to instantiate enemies that will be called at set
// intervals to keep enemies progressing across the screen at random positions
// and speeds
function makeBugEnemy() {
    const x = -80;
    let y = randomRange(0, 210);
    let speed = randomRange(40, 80);
    let anEnemy = new Enemy(x, y, speed);
    return anEnemy
}

// function to populate the game board initially with enemies
// otherwise the player could just go directly to the water at the beginning!
function populateInitialEnemies() {
    let theseEnemies = [];
    for (let i = 0; i<10; i++) {
        let x = randomRange(-20, 400);
        let y = randomRange(25, 220);
        let speed = randomRange(40, 80);
        let anEnemy = new Enemy(x, y, speed);
        theseEnemies.push(anEnemy);
    }
    return theseEnemies;
}

// Place all enemy objects in an array called allEnemies
// let thisEnemy = new Enemy(-80, 10, 80)
let allEnemies = populateInitialEnemies();

setInterval(function() {
    allEnemies.push(makeBugEnemy());
}, 1500);
console.log(allEnemies)
// Place the player object in a variable called player
let player = new Player(200, 375);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
