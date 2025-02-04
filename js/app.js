// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // built in variables that represent the width and height of the enemy bugs
    this.width = 100;
    this.height = 50;

    //bounding box transform to match bug base in sprite image
    this.vertTransform = 138-this.height;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

//  add sound effect upon enemy colliding with character
let enemyHit = new Howl({
    src: ['sounds/enemy_collision.wav']
})

// check for collisions by comparing the bounding box of this enemy bug to
// that of the player - resets the game if a collision is detected!
Enemy.prototype.checkCollisions = function () {
    if (player.x + player.horizTransform < this.x + this.width  &&
        player.x + player.width + player.horizTransform > this.x &&
		player.y + player.vertTransform < this.y + this.height + this.vertTransform &&
        player.y + player.height + player.vertTransform > this.y + this.vertTransform) {

        enemyHit.play();
        let score = document.querySelector("span")
        score.textContent = 0
        // The objects are touching, so there is a collision! Reset the game!
        resetGame();
}
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*(dt);
    // checks collision with player after movement
    this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//function to show the winning game screen
function gameOver() {
    resetGame()
    swal.fire({
        type: 'success',
        title: 'Congratulations!',
        html: 'You have won the game!',
        confirmButtonText: 'Awesome',
        allowOutsideClick: false
    })
}

//function to reset the game after winning or losing
function resetGame() {
    player.x = 200;
    player.y = 375;
    allEnemies = populateInitialEnemies();
    allGemstones = populateGemstones();
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, char) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;

    // built-in bounding box size
    this.width = 33;
    this.height = 30;

    //bounding box transform from sprite corner to base of character
    this.horizTransform = 68 - this.width;
    this.vertTransform = 138 - this.height;

    // The image/sprite for a player character
    this.sprite = char;
};

// Add "win game" sound for when Player reaches water
let gameWin = new Howl({
    src: ['sounds/cheer_horn.wav']
})

// Player method used to move the player character in the game.
// Triggers a "win" screen upon reaching the water, and forces the player
// character to remain on the pavers or grass due to bounding conditions
Player.prototype.handleInput = function(e) {
    movement_mod_x = 100;
    movement_mod_y = 83;
    switch(e) {
        // character moves left unless at the left edge of the screen
        case 'left':
            if(this.x>0) {
                this.x = this.x-movement_mod_x;
            }
            break;
        // character moves right unless at the right edge of the screen
        case 'right':
            if(this.x<400) {
                this.x = this.x+movement_mod_x;
            }
            break;
        // character moves up unless directly under the water, in which case
        // the "win" screen is triggered and the game is reset!
        case 'up':
            if(this.y>90) {
                this.y = this.y-movement_mod_y;
            }
            else {
                gameWin.play();
                gameOver();
            }
            break;
        // character moves down unless at the bottom edge of the screen
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

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// helper function used to produce a random number in a range between min and
// max, inclusive - used to generate enemy bug positions and speeds!
function randomRange(min, max) {
    let anInt = Math.floor(Math.random() * (max-min+1))+min;
    return anInt;
}

// Now instantiate your objects.
// Create a function to instantiate enemies that will be called at set
// intervals to keep enemies progressing across the screen at random positions
// and speeds
function makeBugEnemy() {
    const x = -80;
    let y = randomRange(25, 220);
    let speed = randomRange(40, 80);
    let anEnemy = new Enemy(x, y, speed);
    return anEnemy;
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

// Removes enemies that have already moved through the board
function removePassedEnemies() {
    let i = 0;
    while(i<allEnemies.length) {
        bug = allEnemies[i];
        if(bug.x>700) {
            allEnemies.splice(i, 1);
        }
        i++;
    }
}

//colors of gemstones available
gemColors = ['Blue', 'Green', 'Orange']

//create a class for Gemstones (which will add score)
function Gemstone(color, x, y) {
    this.x = x;
    this.y = y;

    // built-in bounding box size
    this.width = 50;
    this.height = 80;

    //bounding box transform from sprite corner to base of character
    this.horizTransform = 25;
    this.vertTransform = 115;

    this.sprite = `images/Gem ${color}.png`;
}

// Draw the enemy on the screen, required method for game
Gemstone.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};

// Add "gem pickup" sound for when Player reaches a gemstone
let gemPickup = new Howl({
    src: ['sounds/magic-chime-02.wav']
})

// check for collisions by comparing the bounding box of this gemstone to
// that of the player - adds points and removes the gemstone if there is a hit!
Gemstone.prototype.checkCollisions = function () {
    if (player.x + player.horizTransform < this.x + this.horizTransform  &&
        player.x + player.width + player.horizTransform > this.x + this.horizTransform - this.width &&
		player.y + player.vertTransform < this.y+this.vertTransform &&
        player.y + player.height + player.vertTransform > this.y +this.vertTransform - this.height) {
        // The objects are touching, so there is a collision!
        // Play the gem pickup sound!
        gemPickup.play();
        // Add to the score!
        let score = document.querySelector("span")
        score.textContent = Number.parseInt(score.textContent)+100
        allGemstones = allGemstones.filter(a => a!==this);
        }
}


//Add gemstones to the game board
function populateGemstones() {
    let gems = []
    for (let gemstone of gemColors) {
        let gem_x = randomRange(0, 4)*100+25;
        let gem_y = randomRange(0, 2)*83+115;
        gems.push(new Gemstone(gemstone, gem_x, gem_y))
    }
    return gems;
}

// Place all enemy objects in an array called allEnemies
let allEnemies = populateInitialEnemies();

// Place all gemstones in a gemstone array
let allGemstones = populateGemstones();

// Continue to generate enemies across the board
// Also remove enemies that are offscreen to the right (cannot interact with
// the player anymore)
setInterval(function() {
    allEnemies.push(makeBugEnemy());
    removePassedEnemies();
}, 1500);


//from sweetalert2 page, modified to select character!
/* inputOptions can be an object or Promise */
const inputOptions = {
      "images/char-cat-girl.png": '<img tabindex=0 src="images/char-cat-girl.png">',
      "images/char-boy.png": '<img tabindex=0 src="images/char-boy.png">',
      "images/char-horn-girl.png": '<img tabindex=0 src="images/char-horn-girl.png">',
      "images/char-pink-girl.png": '<img tabindex=0 src="images/char-pink-girl.png">',
      "images/char-princess-girl.png": '<img tabindex=0 src="images/char-princess-girl.png">'
  }

async function getSelectedChar() {
    let {value:selectedChar} = await Swal.fire({
      title: 'Select character',
      input: 'radio',
      width: 600,
      inputOptions: inputOptions,
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to choose something!'
        }
      }
    })
    console.log(selectedChar)
    return selectedChar;

}


// Place the player object in a variable called player
let player;

new Promise(function(resolve) {
    return resolve(getSelectedChar());
    }).then((char) => {
    console.log(char)
    player = new Player(200, 375, char);
    let engineScript = document.createElement("script");
    engineScript.src = "js/engine.js";
    document.body.appendChild(engineScript);
    return player;
})

console.log(player)


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
