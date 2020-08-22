let money = 0
let click = 1
let autoCount = 0
let minable = true

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


function buyChizel() {
  let chizel = clickUpgrades.chizel
  if (money >= chizel.price) {
    money -= chizel.price
    chizel.quantity++
    chizel.price += 20

    click += chizel.multiplier
  }
  update()
}

function buyPickaxe() {
  let pickaxe = clickUpgrades.pickaxe
  if (money >= pickaxe.price) {
    money -= pickaxe.price
    pickaxe.quantity++
    click += pickaxe.multiplier
    pickaxe.price += 30
  }
  update()
}

function buyMiner() {
  let miner = automaticUpgrades.miner
  if (money >= miner.price) {
    money -= miner.price
    miner.quantity++
    autoCount += miner.multiplier
    miner.price += 50

    setInterval(() => {
      money += miner.multiplier
      update()
    }, 3000);
  }
  update()
}


function buyRobot() {
  let robot = automaticUpgrades.robot
  if (money >= robot.price) {
    money -= robot.price
    robot.quantity++
    autoCount += robot.multiplier
    robot.price += 250
    setInterval(() => {
      money += robot.multiplier
      update()
    }, 3000);
  }
  update()
}

function drawMoneyMobile() {
  let template = `<div class="card trans-bg border border-secondary body-font d-block d-md-none text-center">
        <h5><img class="goldNugget" src="gold.png"> <span class="body-font" id="moneyMobile">${money}</span></h5>
      </div>`
  document.getElementById("moneyMobileCard").innerHTML = template
}

function drawCurrentStats() {
  let template = `<div class="card trans-bg border border-secondary body-font d-none d-md-block">
  <div class="card-header font-weight-bold">
    Gold Getting Stats
  </div>
  <p class="card-text font-weight-lighter">This is how much sweet gold loots your getting per click: <span id="clickValue">${click}</span></p>
  <p class="card-text font-weight-lighter">This is how much gold you're making not doing anything!: <span id="autoValue">${autoCount}</span></p>
</div>
    <div class="card trans-bg border border-secondary body-font d-block d-md-none" >
      <div class="card-header font-weight-bold">
        Gold Getting Stats
  </div>
      <p class="card-text font-weight-lighter">Per Click: <span id="clickValueMobile">${click}</span></p>
      <p class="card-text font-weight-lighter">Idle Gold:  <span id="autoValueMobile">${autoCount}</span></p>
</div >`
  document.getElementById("currentStats").innerHTML = template
}

function drawInventory() {
  let template = `<div class="card trans-bg border border-secondary body-font d-none d-md-block">
<div class="card-body">
  <h4 class="card-title body-font">Backpack</h4>
  <h5><img class="goldNugget" src="gold.png"> <span class="body-font"id="money">${money}</span></h5>
  <p class="card-text">Chizel: <span id="chizel">${clickUpgrades.chizel.quantity}</span></p>
  <p class="card-text">Pickaxe: <span id="pickaxe">${clickUpgrades.pickaxe.quantity}</span></p>
  <p class="card-text">miner: <span id="miner">${automaticUpgrades.miner.quantity}</span></p>
  <p class="card-text">robot: <span id="robot">${automaticUpgrades.robot.quantity}</span></p>
</div>
</div>
<div class="card trans-bg border border-secondary body-font d-block d-md-none">
<div class="card-body">
  <p class="card-text"><img class="tools" src="chizel.png"> <span id="chizelMobile">${clickUpgrades.chizel.quantity}</span></p>
  <p class="card-text"><img class="tools" src="pickaxe.png"> <span id="pickaxeMobile">${clickUpgrades.pickaxe.quantity}</span></p>
  <p class="card-text"><img class="tools" src="miner.png"> <span id="minerMobile">${automaticUpgrades.miner.quantity}</span></p>
  <p class="card-text"><img class="tools" src="robot.png"> <span id="robotMobile">${automaticUpgrades.robot.quantity}</span></p>
</div>
</div>`
  document.getElementById("inventory").innerHTML = template
}

function drawButtons() {
  let template = `
  <div class="m-2">
    <p><img class="goldNugget" src="gold.png">  <span id="chizelPrice">${clickUpgrades.chizel.price}</span></p>
    <button type="button" class="btn btn-secondary" onclick="buyChizel()"><img class="tools" src="chizel.png"></button>
  </div>
  <div class="m-2">
    <p><img class="goldNugget" src="gold.png">  <span id="pickaxePrice">${clickUpgrades.pickaxe.price}</span></p>
    <button type="button" class="btn btn-secondary" onclick="buyPickaxe()"><img class="tools" src="pickaxe.png"></button>
  </div>
  <div class="m-2">
    <p><img class="goldNugget" src="gold.png">  <span id="minerPrice">${automaticUpgrades.miner.price}</span></p>
    <button type="button" class="btn btn-secondary" onclick="buyMiner()"><img class="tools" src="miner.png"></button>
  </div>
  <div class="m-2">
    <p><img class="goldNugget" src="gold.png">  <span id="robotPrice">${automaticUpgrades.robot.price}</span></p>
    <button type="button" class="btn btn-secondary" onclick="buyRobot()"><img class="tools" src="robot.png"></button>
  </div>`
  document.getElementById("buttons").innerHTML = template
}


function mine() {
  if (!minable) {
    return
  }
  money += click
  update()

  minable = false
  setTimeout(() => {
    minable = true
  }, 30);

}


function update() {
  document.getElementById("money").innerText = money.toString()
  document.getElementById("chizel").innerText = clickUpgrades.chizel.quantity.toString()
  document.getElementById("pickaxe").innerText = clickUpgrades.pickaxe.quantity.toString()
  document.getElementById("miner").innerText = automaticUpgrades.miner.quantity.toString()
  document.getElementById("robot").innerText = automaticUpgrades.robot.quantity.toString()
  document.getElementById("clickValue").innerText = click.toString()
  document.getElementById("autoValue").innerText = autoCount.toString()
  document.getElementById("chizelPrice").innerText = clickUpgrades.chizel.price.toString()
  document.getElementById("pickaxePrice").innerText = clickUpgrades.pickaxe.price.toString()
  document.getElementById("minerPrice").innerText = automaticUpgrades.miner.price.toString()
  document.getElementById("robotPrice").innerText = automaticUpgrades.robot.price.toString()
  document.getElementById("moneyMobile").innerText = money.toString()
  document.getElementById("chizelMobile").innerText = clickUpgrades.chizel.quantity.toString()
  document.getElementById("pickaxeMobile").innerText = clickUpgrades.pickaxe.quantity.toString()
  document.getElementById("minerMobile").innerText = automaticUpgrades.miner.quantity.toString()
  document.getElementById("robotMobile").innerText = automaticUpgrades.robot.quantity.toString()
  document.getElementById("clickValueMobile").innerText = click.toString()
  document.getElementById("autoValueMobile").innerText = autoCount.toString()
}


function forLoopTest() {
  for (let i = 0; i <= 50; i++) {
    mine()

  }
}



drawMoneyMobile()
drawButtons()
drawCurrentStats()
drawInventory()