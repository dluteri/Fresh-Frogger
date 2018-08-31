// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y + 55;  //center
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.horiz = 101;
    this.boundary = this.horiz * 5;
    this.resetPosition = -this.horiz;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
if(this.x < this.boundary) {
  this.x += this.speed * dt;
}
else {
  //resets to start
  this.x = this.resetPosition;
}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Hero {
  constructor() {
    this.sprite = 'images/char-horn-girl.png';
    this.horiz = 101;
    this.vert = 83;
    this.startX = this.horiz * 2;
    this.startY = (this.vert * 4) + 55;
    this.x = this.startX;
    this.y = this.startY;
    this.victory = false;
  }



// draw hero sprite on current x and y coordinate position (MC Walkthrough)

render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
      // console.log(this.x, this.y);
  }

// Direction of hero's travel

handleInput(input) {
  switch(input) {
    case 'left':
      if (this.x > 0) {
        this.x -= this.horiz;
      }
      break;
    case 'up':
      if (this.y > 0) {
        this.y -= this.vert;
      }
      break;
    case 'right':
      if (this.x < this.horiz * 4) {
        this.x += this.horiz;
      }
      break;
    case 'down':
      if (this.y < this.vert * 4) {
        this.y += this.vert;
      }
      break;
  }
}

update() {
  //check for collisions
  for(let enemy of allEnemies) {
    if (this.y === enemy.y && (enemy.x + enemy.horiz/2 > this.x
      && enemy.x < this.x + this.horiz/2)) {
        this.reset();
  }
  }
  //check for win
  if(this.y === -28) {
    this.sprite = 'images/SpriteShark.png';
    this.y = 35;
    this.victory = true;  //stops game
  }
}

reset() {
  this.y = this.startY;
  this.x = this.startX;
}
}




//   this.victory() {
//   $("#fade").modal({  // modal courtesy of http://jquerymodal.com/
//     fadeDuration: 1000,
//     fadeDelay: 1.75 // Will fade in 750ms after the overlay finishes.
//   });
// }



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Hero();
const bug1 = new Enemy(-101, 0, 200);  // top stone row (x, y, speed)
const bug2 = new Enemy(-101, 83, 300); // middle stone row
const bug3 = new Enemy((-101*2.5), 166, 300);  //botom stone row
const allEnemies = [];
allEnemies.push(bug1, bug2, bug3);
console.log(allEnemies);

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

// Modal globals
const modal = document.querySelector('.modal-background');
const modal_button = document.querySelector('#modalButton');

function toggleModal() {
    modal.classList.toggle('hide');
}


document.onload = function() {
  console.log('modal');

  modalBtn.addEventListener('click', function(e) {
    modal.classList.toggel('hide');
    player.reset();
    player.victory = false;
    win.requestAnimationFrame(main);
  });
  toggleModal() // opens the modal
  toggleModal() // closes the modal
}

// "No thanks"/cancel button function
document.querySelector('.modal-cancel').addEventListener('click', () => {
  toggleModal();
});

// "Play Again"/Replay button function
document.querySelector('.modal-replay').addEventListener('click', () => {
console.log('replay');
//  function resetGame() {
  player.victory = false;
  player.reset();
//  win.requestAnimationFrame(main);
// hero.reset();
//  toggleModal();
//  requestAnimationFrame(main);
});
