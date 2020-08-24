let minable = true

let achievements = [
  {
    name: "1st click!",
    reached: 0,
    amount: 1
  },
  {
    name: "1000 gold!",
    reached: 0,
    amount: 1000
  },
  {
    name: "10000 gold!",
    reached: 0,
    amount: 10000
  },
]

let counters = {
  money: 0,
  click: 1,
  autoCount: 0,
  moneyTotal: 0
}

let clickUpgrades = {
  chizel: {
    price: 50,
    quantity: 0,
    multiplier: 2
  },
  pickaxe: {
    price: 150,
    quantity: 0,
    multiplier: 6
  }
};

let automaticUpgrades = {
  miner: {
    price: 500,
    quantity: 0,
    multiplier: 20
  },
  robot: {
    price: 2500,
    quantity: 0,
    multiplier: 100
  }
};

loadCounters()

//stringifys objects then saves them to local storage
function saveData() {
  window.localStorage.setItem("counters", JSON.stringify(counters))
  window.localStorage.setItem("clickUpgrades", JSON.stringify(clickUpgrades))
  window.localStorage.setItem("automaticUpgrades", JSON.stringify(automaticUpgrades))
}

//loads data that was stored i local storage
function loadCounters() {
  let counterData = JSON.parse(window.localStorage.getItem("counters"))
  let clickUpgradesData = JSON.parse(window.localStorage.getItem("clickUpgrades"))
  let automaticUpgradesData = JSON.parse(window.localStorage.getItem("automaticUpgrades"))
  if (counterData) {
    counters = counterData;
  } if (clickUpgradesData) {
    clickUpgrades = clickUpgradesData
  } if (automaticUpgradesData) {
    automaticUpgrades = automaticUpgradesData
  }
}

// subtract price from money, add a chizel to quanity and add to the click count modifier
function buyChizel() {
  let chizel = clickUpgrades.chizel
  if (counters.money >= chizel.price) {
    counters.money -= chizel.price
    chizel.quantity++
    chizel.price += 5

    counters.click += chizel.multiplier
  }
  saveData()
  update()
}

//subtract price from money, add a pickaxe to quanity and add to the click count modifier
function buyPickaxe() {
  let pickaxe = clickUpgrades.pickaxe
  if (counters.money >= pickaxe.price) {
    counters.money -= pickaxe.price
    pickaxe.quantity++
    counters.click += pickaxe.multiplier
    pickaxe.price += 15
  }
  saveData()
  update()
}

//subtract price from money, add a miner to the quanity and add modifier to auotCounter
function buyMiner() {
  let miner = automaticUpgrades.miner
  if (counters.money >= miner.price) {
    counters.money -= miner.price
    miner.quantity++
    counters.autoCount += miner.multiplier
    miner.price += 20
  }
  saveData()
  update()
}

//subtract price from money, add to robot quanity and add modifier to autoCounter
function buyRobot() {
  let robot = automaticUpgrades.robot
  if (counters.money >= robot.price) {
    counters.money -= robot.price
    robot.quantity++
    counters.autoCount += robot.multiplier
    robot.price += 125
  }
  saveData()
  update()
}

// adds counters.autoCount to the total every 3 seconds. 
function moneyInterval() {
  setInterval(() => {
    counters.money += counters.autoCount
    counters.moneyTotal += counters.autoCount
    saveData()
    update()
  }, 3000);
}

//draws smaller card for mobile applications to keep track of the gold
function drawMoneyMobile() {
  let template = `<div class="shadow-gold card trans-bg border border-secondary body-font d-block d-md-none text-center m-3 p-2">
        <h5><img class="goldNugget" src="gold.png"> <span class="body-font" id="moneyMobile">${counters.money}</span></h5><br>
      </div>`
  document.getElementById("moneyMobileCard").innerHTML = template
}

//draws a md version and a mobile version of the stats of autoclick and click
function drawCurrentStats() {
  let template = `<div class="shadow-gold card trans-bg border border-secondary body-font d-none d-md-block">
  <div class="card-header font-weight-bold">
    Gold Getting Stats
  </div>
  <p class="card-text font-weight-lighter">This is how much sweet gold loots your getting per click: <span id="clickValue">${counters.click}</span></p>
  <p class="card-text font-weight-lighter">This is how much gold you're making not doing anything!: <span id="autoValue">${counters.autoCount}</span></p>
</div>
    <div class="shadow-gold card trans-bg border border-secondary body-font d-block d-md-none m-3" >
      <div class="card-header font-weight-bold">
        Gold Gettin Stats
  </div>
      <p class="card-text font-weight-lighter">Per Click: <span id="clickValueMobile">${counters.clickclick}</span></p>
      <p class="card-text font-weight-lighter">Idle Gold:  <span id="autoValueMobile">${counters.autoCount}</span></p>
</div >`
  document.getElementById("currentStats").innerHTML = template
}

//draws a md version and a mobile version of the backpack with the items and amount of gold
function drawInventory() {
  let template = `<div class="shadow-gold card trans-bg border border-secondary body-font d-none d-md-block">
<div class="card-body">
  <h4 class="card-title body-font">Backpack</h4>
  <h5><img class="goldNugget" src="gold.png"> <span class="body-font"id="money">${counters.money}</span></h5>
  <h5 class="body-font">Earned: <span class="body-font"id="moneyTotal">${counters.moneyTotal}</span></h5>
  <p class="card-text">Chizel: <span id="chizel">${clickUpgrades.chizel.quantity}</span></p>
  <p class="card-text">Pickaxe: <span id="pickaxe">${clickUpgrades.pickaxe.quantity}</span></p>
  <p class="card-text">miner: <span id="miner">${automaticUpgrades.miner.quantity}</span></p>
  <p class="card-text">robot: <span id="robot">${automaticUpgrades.robot.quantity}</span></p>
</div>
</div>
<div class="shadow-gold card trans-bg border border-secondary body-font d-block d-md-none m-3">
<div class="card-body">
  <p class="card-text"><img class="tools" src="chizel.png"> <span id="chizelMobile">${clickUpgrades.chizel.quantity}</span></p>
  <p class="card-text"><img class="tools" src="pickaxe.png"> <span id="pickaxeMobile">${clickUpgrades.pickaxe.quantity}</span></p>
  <p class="card-text"><img class="tools" src="miner.png"> <span id="minerMobile">${automaticUpgrades.miner.quantity}</span></p>
  <p class="card-text"><img class="tools" src="robot.png"> <span id="robotMobile">${automaticUpgrades.robot.quantity}</span></p>
</div>
</div>`
  document.getElementById("inventory").innerHTML = template
}

//draws the buttons to access the purchase functions
function drawButtons() {
  let template = `
  <div class="m-2 ">
    <p><img class="goldNugget" src="gold.png">  <span id="chizelPrice">${clickUpgrades.chizel.price}</span></p>
    <button id="chizelBtn" type="button" class="btn btn-secondary" onclick="buyChizel()"><img class="tools" src="chizel.png"></button>
  </div>
  <div class="m-2">
    <p><img class="goldNugget" src="gold.png">  <span id="pickaxePrice">${clickUpgrades.pickaxe.price}</span></p>
    <button id="pickaxeBtn" type="button" class="btn btn-secondary" onclick="buyPickaxe()"><img class="tools" src="pickaxe.png"></button>
  </div>
  <div class="m-2">
    <p><img class="goldNugget" src="gold.png">  <span id="minerPrice">${automaticUpgrades.miner.price}</span></p>
    <button id="minerBtn" type="button" class="btn btn-secondary" onclick="buyMiner()"><img class="tools" src="miner.png"></button>
  </div>
  <div class="m-2">
    <p><img class="goldNugget" src="gold.png">  <span id="robotPrice">${automaticUpgrades.robot.price}</span></p>
    <button id="robotBtn" type="button" class="btn btn-secondary" onclick="buyRobot()"><img class="tools" src="robot.png"></button>
  </div>`
  document.getElementById("buttons").innerHTML = template
}



//checks to see if moneyTotal meets an achievement amounts
function achievement() {
  for (let i = 0; i < achievements.length; i++) {
    const a = achievements[i];
    if (a.amount <= counters.moneyTotal && a.reached == 0) {
      a.reached++
      alert(a.name)
    }
    saveData()
  }

}


//an onclick function attached to the image to add to the gold
function mine() {
  if (!minable) {
    return
  }
  counters.money += counters.click
  counters.moneyTotal += counters.click
  update()
  saveData()

  minable = false
  setTimeout(() => {
    minable = true
  }, 30);

}

//updates all the stats in the game
function update() {
  document.getElementById("money").innerText = counters.money.toString()
  document.getElementById("moneyTotal").innerText = counters.moneyTotal.toString()
  document.getElementById("chizel").innerText = clickUpgrades.chizel.quantity.toString()
  document.getElementById("pickaxe").innerText = clickUpgrades.pickaxe.quantity.toString()
  document.getElementById("miner").innerText = automaticUpgrades.miner.quantity.toString()
  document.getElementById("robot").innerText = automaticUpgrades.robot.quantity.toString()
  document.getElementById("clickValue").innerText = counters.click.toString()
  document.getElementById("autoValue").innerText = counters.autoCount.toString()
  document.getElementById("chizelPrice").innerText = clickUpgrades.chizel.price.toString()
  document.getElementById("pickaxePrice").innerText = clickUpgrades.pickaxe.price.toString()
  document.getElementById("minerPrice").innerText = automaticUpgrades.miner.price.toString()
  document.getElementById("robotPrice").innerText = automaticUpgrades.robot.price.toString()
  document.getElementById("moneyMobile").innerText = counters.money.toString()
  document.getElementById("chizelMobile").innerText = clickUpgrades.chizel.quantity.toString()
  document.getElementById("pickaxeMobile").innerText = clickUpgrades.pickaxe.quantity.toString()
  document.getElementById("minerMobile").innerText = automaticUpgrades.miner.quantity.toString()
  document.getElementById("robotMobile").innerText = automaticUpgrades.robot.quantity.toString()
  document.getElementById("clickValueMobile").innerText = counters.click.toString()
  document.getElementById("autoValueMobile").innerText = counters.autoCount.toString()
  achievement()
}

//test function to try and break click
function forLoopTest() {
  for (let i = 0; i <= 50; i++) {
    mine()

  }
}

// instructions on how to play the game 
alert("Click the Globe to start earning gold, purchase items to increase your gold making skills!")

moneyInterval()
drawMoneyMobile()
drawButtons()
drawCurrentStats()
drawInventory()