let checkboxChecker = 0
const tutorial1 = document.getElementById('tutorial1');
const tutorial2 = document.getElementById('tutorial2');
const tutorial3 = document.getElementById('tutorial3');
const startButton = document.getElementById('startButton');
const famousCitiesCheckbox = document.getElementById("famousCitiesCheck");
const technologicalItemsCheckbox = document.getElementById("technologicalItemsCheck");
const foodItemsCheckbox = document.getElementById("foodItemsCheck");
const clothingItemsCheckbox = document.getElementById("clothingItemsCheck");
const famousCitiesLabel = document.getElementById("famousCitiesLabel");
const technologicalItemsLabel = document.getElementById("technologicalItemsLabel");
const foodItemsLabel = document.getElementById("foodItemsLabel");
const clothingItemsLabel = document.getElementById("clothingItemsLabel");
const continueButton = document.getElementById("continueButton");
const playerDropdown = document.getElementById("Players");
const playersLabel = document.getElementById("playersLabel");
const nextButton = document.getElementById("nextButton");
const playerCard = document.getElementById("playerCard");
const revealButton = document.getElementById("revealButton");
const doneButton = document.getElementById("doneButton");
const gameEndOptions = document.getElementById("gameEndOptions");
const replayButton = document.getElementById("replayButton");
const restartButton = document.getElementById("restartButton");

if (famousCitiesLabel) famousCitiesLabel.style.display = 'none';
if (technologicalItemsLabel) technologicalItemsLabel.style.display = 'none';
if (foodItemsLabel) foodItemsLabel.style.display = 'none';
if (clothingItemsLabel) clothingItemsLabel.style.display = 'none';
if (continueButton) continueButton.style.display = 'none';
if (playerDropdown) playerDropdown.style.display = 'none';
if (playersLabel) playersLabel.style.display = 'none';
if (nextButton) nextButton.style.display = 'none';
if (playerCard) playerCard.style.display = 'none';
if (revealButton) revealButton.style.display = 'none';
if (doneButton) doneButton.style.display = 'none';
if (gameEndOptions) gameEndOptions.style.display = 'none';

const famousCities = [
  "Paris", "London", "New York", "Tokyo", "Rome", 
  "Dubai", "Sydney", "Miami", "Cairo", "Beijing"
];

const technologicalItems = [
  "Laptop", "Phone", "Tablet", "Headphones", "Mouse",
  "Keyboard", "Monitor", "Printer", "Speaker", "Camera"
];

const foodItems = [
  "Apple", "Banana", "Orange", "Mango", "Pineapple",
  "Strawberry", "Blueberry", "Raspberry", "Cherry", "Watermelon"
];

const clothingItems = [
  "Shirt", "Pants", "Dress", "Shoes", "Hat",
  "Socks", "Jeans", "Jacket", "Coat", "Sweater"
];

let combinedItems = []
let playerAssignmentsList = []
let currentPlayerIndex = 0
let isRevealed = false
let savedCheckboxStates = {}
let savedPlayerCount = ''

function startGame() {
  if (tutorial1) tutorial1.style.display = 'none'
  if (tutorial2) tutorial2.style.display = 'none'
  if (tutorial3) tutorial3.style.display = 'none'
  if (startButton) startButton.style.display = 'none'
}

if (startButton) {
  startButton.addEventListener("click", function (event) {
    startGame()
    if (famousCitiesLabel) famousCitiesLabel.style.display = 'flex';
    if (technologicalItemsLabel) technologicalItemsLabel.style.display = 'flex';
    if (foodItemsLabel) foodItemsLabel.style.display = 'flex';
    if (clothingItemsLabel) clothingItemsLabel.style.display = 'flex';
    if (continueButton) continueButton.style.display = 'block';
  });
}

function continueGame() {
  combinedItems = [];
  checkboxChecker = 0;

  if (famousCitiesCheckbox) savedCheckboxStates.famousCities = famousCitiesCheckbox.checked;
  if (technologicalItemsCheckbox) savedCheckboxStates.technologicalItems = technologicalItemsCheckbox.checked;
  if (foodItemsCheckbox) savedCheckboxStates.foodItems = foodItemsCheckbox.checked;
  if (clothingItemsCheckbox) savedCheckboxStates.clothingItems = clothingItemsCheckbox.checked;
  
  if (famousCitiesCheckbox && famousCitiesCheckbox.checked) {
    combinedItems = combinedItems.concat(famousCities);
    checkboxChecker++
  }
  if (technologicalItemsCheckbox && technologicalItemsCheckbox.checked) {
    combinedItems = combinedItems.concat(technologicalItems);
    checkboxChecker++
  }
  if (foodItemsCheckbox && foodItemsCheckbox.checked) {
    combinedItems = combinedItems.concat(foodItems);
    checkboxChecker++
  }
  if (clothingItemsCheckbox && clothingItemsCheckbox.checked) {
    combinedItems = combinedItems.concat(clothingItems);
    checkboxChecker++
  }
  if (checkboxChecker === 0) {
    alert("Check a Box!")
  } else {
      if (famousCitiesLabel) famousCitiesLabel.style.display = 'none';
      if (technologicalItemsLabel) technologicalItemsLabel.style.display = 'none';
      if (foodItemsLabel) foodItemsLabel.style.display = 'none';
      if (clothingItemsLabel) clothingItemsLabel.style.display = 'none';
      if (continueButton) continueButton.style.display = 'none';
      if (playersLabel) playersLabel.style.display = 'block';
      if (playerDropdown) playerDropdown.style.display = 'block';
      if (nextButton) nextButton.style.display = 'block';
  }
}

if (continueButton) {
  continueButton.addEventListener("click", function (event) {
    continueGame();
  });
}

function advance() {
 if (!playerDropdown || playerDropdown.value === 'None' || playerDropdown.value === '') {
  alert('Choose a number!');
 } else {
  savedPlayerCount = playerDropdown.value;
  if (playersLabel) playersLabel.style.display = 'none';
  if (playerDropdown) playerDropdown.style.display = 'none';
  if (nextButton) nextButton.style.display = 'none';
  reveal();
 }
}

if (nextButton) {
  nextButton.addEventListener("click", function (event) {
    advance();
  });
}

function reveal() {
  if (playerAssignmentsList.length > 0) {
    if (isRevealed) {
      if (playerCard) playerCard.style.display = 'none';
      isRevealed = false;
      currentPlayerIndex++;
      
      if (currentPlayerIndex >= playerAssignmentsList.length) {
        if (revealButton) revealButton.style.display = 'none';
        if (doneButton) doneButton.style.display = 'block';
        return;
      }
      
      if (revealButton) {
        revealButton.textContent = 'Reveal Player ' + (currentPlayerIndex + 1);
      }
    } else {
      const currentPlayer = playerAssignmentsList[currentPlayerIndex];
      if (playerCard && currentPlayer) {
        if (currentPlayer.isImposter) {
          playerCard.className = 'player-card imposter';
          playerCard.innerHTML = 'Player ' + currentPlayer.player + ': You are the <strong>IMPOSTER</strong>!';
        } else {
          playerCard.className = 'player-card';
          playerCard.innerHTML = 'Player ' + currentPlayer.player + ': Your word is "<strong>' + currentPlayer.word + '</strong>"';
        }
        playerCard.style.display = 'block';
        isRevealed = true;
        
        if (currentPlayerIndex < playerAssignmentsList.length - 1) {
          if (revealButton) revealButton.textContent = 'Hide';
        } else {
          if (revealButton) revealButton.textContent = 'Hide';
        }
      }
    }
    return;
  }
  
  if (playerDropdown && playerDropdown.value === 'Three') {
    const imposter = Math.floor(Math.random() * 3) + 1;
    const randomWord = combinedItems[Math.floor(Math.random() * combinedItems.length)];
    
    playerAssignmentsList = [];
    for (let i = 1; i <= 3; i++) {
      if (i === imposter) {
        playerAssignmentsList.push({
          player: i,
          isImposter: true,
          word: null
        });
      } else {
        playerAssignmentsList.push({
          player: i,
          isImposter: false,
          word: randomWord
        });
      }
    }
    
    currentPlayerIndex = 0;
    isRevealed = false;
    
    if (playerAssignments) playerAssignments.style.display = 'block';
    if (playerCard) playerCard.style.display = 'none';
    if (revealButton) {
      revealButton.style.display = 'block';
      revealButton.textContent = 'Reveal Player ' + (currentPlayerIndex + 1);
    }
    
  } else if (playerDropdown && playerDropdown.value === 'Four') {
    const imposter = Math.floor(Math.random() * 4) + 1;
    const randomWord = combinedItems[Math.floor(Math.random() * combinedItems.length)];
    
    playerAssignmentsList = [];
    for (let i = 1; i <= 4; i++) {
      if (i === imposter) {
        playerAssignmentsList.push({
          player: i,
          isImposter: true,
          word: null
        });
      } else {
        playerAssignmentsList.push({
          player: i,
          isImposter: false,
          word: randomWord
        });
      }
    }
    
    currentPlayerIndex = 0;
    isRevealed = false;
    
    if (playerAssignments) playerAssignments.style.display = 'block';
    if (playerCard) playerCard.style.display = 'none';
    if (revealButton) {
      revealButton.style.display = 'block';
      revealButton.textContent = 'Reveal Player ' + (currentPlayerIndex + 1);
    }
    
  } else if (playerDropdown && playerDropdown.value === 'Five') {
    const imposter = Math.floor(Math.random() * 5) + 1;
    const randomWord = combinedItems[Math.floor(Math.random() * combinedItems.length)];
    
    playerAssignmentsList = [];
    for (let i = 1; i <= 5; i++) {
      if (i === imposter) {
        playerAssignmentsList.push({
          player: i,
          isImposter: true,
          word: null
        });
      } else {
        playerAssignmentsList.push({
          player: i,
          isImposter: false,
          word: randomWord
        });
      }
    }
    
    currentPlayerIndex = 0;
    isRevealed = false;
    
    if (playerAssignments) playerAssignments.style.display = 'block';
    if (playerCard) playerCard.style.display = 'none';
    if (revealButton) {
      revealButton.style.display = 'block';
      revealButton.textContent = 'Reveal Player ' + (currentPlayerIndex + 1);
    }
    
  } else if (playerDropdown && playerDropdown.value === 'Six') {
    const imposter = Math.floor(Math.random() * 6) + 1;
    const randomWord = combinedItems[Math.floor(Math.random() * combinedItems.length)];
    
    playerAssignmentsList = [];
    for (let i = 1; i <= 6; i++) {
      if (i === imposter) {
        playerAssignmentsList.push({
          player: i,
          isImposter: true,
          word: null
        });
      } else {
        playerAssignmentsList.push({
          player: i,
          isImposter: false,
          word: randomWord
        });
      }
    }
    
    currentPlayerIndex = 0;
    isRevealed = false;
    
    if (playerAssignments) playerAssignments.style.display = 'block';
    if (playerCard) playerCard.style.display = 'none';
    if (revealButton) {
      revealButton.style.display = 'block';
      revealButton.textContent = 'Reveal Player ' + (currentPlayerIndex + 1);
    }
    
  } else if (playerDropdown && playerDropdown.value === 'Seven') {
    const imposter = Math.floor(Math.random() * 7) + 1;
    const randomWord = combinedItems[Math.floor(Math.random() * combinedItems.length)];
    
    playerAssignmentsList = [];
    for (let i = 1; i <= 7; i++) {
      if (i === imposter) {
        playerAssignmentsList.push({
          player: i,
          isImposter: true,
          word: null
        });
      } else {
        playerAssignmentsList.push({
          player: i,
          isImposter: false,
          word: randomWord
        });
      }
    }
    
    currentPlayerIndex = 0;
    isRevealed = false;
    
    if (playerAssignments) playerAssignments.style.display = 'block';
    if (playerCard) playerCard.style.display = 'none';
    if (revealButton) {
      revealButton.style.display = 'block';
      revealButton.textContent = 'Reveal Player ' + (currentPlayerIndex + 1);
    }
    
  } else if (playerDropdown && playerDropdown.value === 'Eight') {
    const imposter = Math.floor(Math.random() * 8) + 1;
    const randomWord = combinedItems[Math.floor(Math.random() * combinedItems.length)];
    
    playerAssignmentsList = [];
    for (let i = 1; i <= 8; i++) {
      if (i === imposter) {
        playerAssignmentsList.push({
          player: i,
          isImposter: true,
          word: null
        });
      } else {
        playerAssignmentsList.push({
          player: i,
          isImposter: false,
          word: randomWord
        });
      }
    }
    
    currentPlayerIndex = 0;
    isRevealed = false;
    
    if (playerAssignments) playerAssignments.style.display = 'block';
    if (playerCard) playerCard.style.display = 'none';
    if (revealButton) {
      revealButton.style.display = 'block';
      revealButton.textContent = 'Reveal Player ' + (currentPlayerIndex + 1);
    }
    
  } else if (playerDropdown && playerDropdown.value === 'Nine') {
    const imposter = Math.floor(Math.random() * 9) + 1;
    const randomWord = combinedItems[Math.floor(Math.random() * combinedItems.length)];
    
    playerAssignmentsList = [];
    for (let i = 1; i <= 9; i++) {
      if (i === imposter) {
        playerAssignmentsList.push({
          player: i,
          isImposter: true,
          word: null
        });
      } else {
        playerAssignmentsList.push({
          player: i,
          isImposter: false,
          word: randomWord
        });
      }
    }
    
    currentPlayerIndex = 0;
    isRevealed = false;
    
    if (playerAssignments) playerAssignments.style.display = 'block';
    if (playerCard) playerCard.style.display = 'none';
    if (revealButton) {
      revealButton.style.display = 'block';
      revealButton.textContent = 'Reveal Player ' + (currentPlayerIndex + 1);
    }
    
  } else if (playerDropdown && playerDropdown.value === 'Ten') {
    const imposter = Math.floor(Math.random() * 10) + 1;
    const randomWord = combinedItems[Math.floor(Math.random() * combinedItems.length)];
    
    playerAssignmentsList = [];
    for (let i = 1; i <= 10; i++) {
      if (i === imposter) {
        playerAssignmentsList.push({
          player: i,
          isImposter: true,
          word: null
        });
      } else {
        playerAssignmentsList.push({
          player: i,
          isImposter: false,
          word: randomWord
        });
      }
    }
    
    currentPlayerIndex = 0;
    isRevealed = false;
    
    if (playerAssignments) playerAssignments.style.display = 'block';
    if (playerCard) playerCard.style.display = 'none';
    if (revealButton) {
      revealButton.style.display = 'block';
      revealButton.textContent = 'Reveal Player ' + (currentPlayerIndex + 1);
    }
    
  }
}

if (revealButton) {
  revealButton.addEventListener('click', function(event) {
    reveal();
  });
}

if (doneButton) {
  doneButton.addEventListener('click', function(event) {
    if (playerAssignments) playerAssignments.style.display = 'none';
    if (doneButton) doneButton.style.display = 'none';
    if (gameEndOptions) gameEndOptions.style.display = 'block';
  });
}

function replayGame() {
  if (gameEndOptions) gameEndOptions.style.display = 'none';

  if (famousCitiesCheckbox && savedCheckboxStates.famousCities !== undefined) {
    famousCitiesCheckbox.checked = savedCheckboxStates.famousCities;
  }
  if (technologicalItemsCheckbox && savedCheckboxStates.technologicalItems !== undefined) {
    technologicalItemsCheckbox.checked = savedCheckboxStates.technologicalItems;
  }
  if (foodItemsCheckbox && savedCheckboxStates.foodItems !== undefined) {
    foodItemsCheckbox.checked = savedCheckboxStates.foodItems;
  }
  if (clothingItemsCheckbox && savedCheckboxStates.clothingItems !== undefined) {
    clothingItemsCheckbox.checked = savedCheckboxStates.clothingItems;
  }
  
  if (playerDropdown && savedPlayerCount) {
    playerDropdown.value = savedPlayerCount;
  }

  combinedItems = [];
  if (famousCitiesCheckbox && famousCitiesCheckbox.checked) {
    combinedItems = combinedItems.concat(famousCities);
  }
  if (technologicalItemsCheckbox && technologicalItemsCheckbox.checked) {
    combinedItems = combinedItems.concat(technologicalItems);
  }
  if (foodItemsCheckbox && foodItemsCheckbox.checked) {
    combinedItems = combinedItems.concat(foodItems);
  }
  if (clothingItemsCheckbox && clothingItemsCheckbox.checked) {
    combinedItems = combinedItems.concat(clothingItems);
  }
  
  playerAssignmentsList = [];
  currentPlayerIndex = 0;
  isRevealed = false;
  reveal();
}

function restartGame() {
  if (gameEndOptions) gameEndOptions.style.display = 'none';
  playerAssignmentsList = [];
  currentPlayerIndex = 0;
  isRevealed = false;
  
  if (tutorial1) tutorial1.style.display = 'block';
  if (tutorial2) tutorial2.style.display = 'block';
  if (tutorial3) tutorial3.style.display = 'block';
  if (startButton) startButton.style.display = 'block';
  if (famousCitiesLabel) famousCitiesLabel.style.display = 'none';
  if (technologicalItemsLabel) technologicalItemsLabel.style.display = 'none';
  if (foodItemsLabel) foodItemsLabel.style.display = 'none';
  if (clothingItemsLabel) clothingItemsLabel.style.display = 'none';
  if (continueButton) continueButton.style.display = 'none';
  if (playerDropdown) playerDropdown.style.display = 'none';
  if (playersLabel) playersLabel.style.display = 'none';
  if (nextButton) nextButton.style.display = 'none';
  if (playerAssignments) playerAssignments.style.display = 'none';
  if (playerCard) playerCard.style.display = 'none';
  if (revealButton) revealButton.style.display = 'none';
  if (doneButton) doneButton.style.display = 'none';
  
  if (famousCitiesCheckbox) famousCitiesCheckbox.checked = false;
  if (technologicalItemsCheckbox) technologicalItemsCheckbox.checked = false;
  if (foodItemsCheckbox) foodItemsCheckbox.checked = false;
  if (clothingItemsCheckbox) clothingItemsCheckbox.checked = false;
  if (playerDropdown) playerDropdown.value = 'None';
}

if (replayButton) {
  replayButton.addEventListener('click', function(event) {
    replayGame();
  });
}

if (restartButton) {
  restartButton.addEventListener('click', function(event) {
    restartGame();
  });
}