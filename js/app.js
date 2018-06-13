
const counter = document.querySelector('.moves');
const livesNumber = document.querySelector('.livesnumber');
const record = document.querySelector('.record');
const endscreen = document.querySelector('.endscreen');
const finalScore = document.querySelector('.finalscore');
const yes = document.querySelector('#yes');
const no = document.querySelector('#no');
const explanation = document.querySelector('.explanation');
const howto = document.querySelector('.howto');
const close = document.querySelector('.close');
function bestScore() {
    if (counter.innerHTML > record.innerHTML) {
        record.innerHTML = counter.innerHTML; 
    }
}
// Enemies 
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};
Enemy.prototype.checkCollision = function() {
    if (
        player.y + 121 >= this.y + 90
        && player.x + 25 <= this.x + 88
        && player.y + 73 <= this.y + 135
        && player.x + 76 >= this.x + 11) {
            player.x = 404;
            player.y = 500;
            livesNumber.innerHTML--;
            if (livesNumber.innerHTML == 0) {
                endscreen.style.display ='inline-block';
                yourScore();
                bestScore();
            }
    }
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
   this.x += this.speed*dt;
    // When enemies exit right, they loop back to the left.
    if (this.x >= 705) {
        this.x = -100;
    }
    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Choose the avatar for the game
const main = document.querySelector('.players');
var selectedPlayer = ['images/char-boy.png'];
main.addEventListener('click', function(event) {
    var src = event.target.getAttribute('src');
    selectedPlayer.pop('images/char-boy.png');
    selectedPlayer.push(src);
})
//Player
var Player = function(x, y, speed) {
    this.sprite = selectedPlayer;
    this.x = x;
    this.y = y;
    this.speed = speed;
};
// Player Updates:
Player.prototype.update = function(dt) {
    // Keeps player from leaving left, right, or bottom boundaries.
    if (this.y > 500) {
        this.y = 500;
    }
    if (this.x > 602.5) {
        this.x = 602.5;
    }
    if (this.x < 4.5) {
        this.x = 4.5;
    }
    // Resets player to starting point if he touches the water
    if (this.y + 28 <= 11) {
        this.x = 404;
        this.y = 500;
    //Add a point for each time the player touches the water and call the function for the new levels 
        counter.innerHTML++;
        if (counter.innerHTML>= 5) {
            speedUpOne();
        }
        if (counter.innerHTML>= 10) {
            speedUpTwo();
        }
        if (counter.innerHTML>= 15) {
            speedUpThree();
        }
    }
};


// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Function to control player with directional arrow keys.
Player.prototype.handleInput = function (e) {
    if (e == 'left') {
        this.x -= this.speed;
    }
    if (e == 'up') {
        this.y -= this.speed - 14;  
    }
    if (e == 'right') {
        this.x += this.speed;
    }
    if (e == 'down') {
        this.y += this.speed - 20;
    }  
};

// Instantiates Player object:
var player = new Player(404, 500, 100);

// Instantiates Enemy objects:
// Creates a random number for the speed
var randomNum = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
// Creates an array to instantiate Enemy objects.
var allEnemies = [];
allEnemies.push(new Enemy(0, 60, randomNum(100, 300)));
allEnemies.push(new Enemy(0, 146, randomNum(100, 300)));
allEnemies.push(new Enemy(0, 230, randomNum(100, 300)));
allEnemies.push(new Enemy(0, 312, randomNum(100, 300)));
allEnemies.push(new Enemy(0, 395, randomNum(100, 300)));
//Creates functions to increase difficulties by increasing the speed
function speedUpOne() {
      for (var Enemy of allEnemies ) {
        Enemy.speed = randomNum(300, 450);
      }
}
function speedUpTwo() {
    for (var Enemy of allEnemies ) {
        Enemy.speed = randomNum(450, 600);
    }
}
function speedUpThree() {
    for (var Enemy of allEnemies ) {
        Enemy.speed = randomNum(600, 700);
      }
}

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
    preventScrolling();
  
});
//This prevents the scrolling of the entire page when moving player with key presses
function preventScrolling() {
    document.addEventListener("keydown", function(e) {
        if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);
}

//This creates the message on the end screen and define what the yes and no buttons do
function yourScore() {
    if (endscreen.style.display = 'inline-block') {
        finalScore.innerHTML = 'You score is: ' + counter.innerHTML;
    }
}
yes.addEventListener('click', function() {
    endscreen.style.display = 'none';
    counter.innerHTML = 0;
    livesNumber.innerHTML = 3;
    for (var Enemy of allEnemies) {
        Enemy.speed = randomNum(100, 300);
    }
    bestScore();
})
no.addEventListener('click', function() {
    endscreen.style.display = 'none';
    counter.innerHTML = 0;
    livesNumber.innerHTML = 3;
    for (var Enemy of allEnemies) {
        Enemy.speed = randomNum(100, 300);
    }
    record.innerHTML = 0;
})
//This makes the howto window slide and close
howto.addEventListener('click',function() {
   explanation.style.width = "300px";
})
close.addEventListener('click', function() {
    explanation.style.width = "0px";
})

