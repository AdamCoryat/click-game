let money = 0
let click = 1
let autoCount = 0
let minable = true

let clickUpgrades = {
  chizel: {
    price: 2,
    quantity: 0,
    multiplier: 30
  },
  pickaxe: {
    price: 250,
    quantity: 0,
    multiplier: 6
  }
};

let automaticUpgrades = {
  miner: {
    price: 5,
    quantity: 0,
    multiplier: 20
  },
  robot: {
    price: 2500,
    quantity: 0,
    multiplier: 100
  }
};

function buyChizel(){
  let chizel = clickUpgrades.chizel
  if (money >= chizel.price){
  money -= chizel.price
  chizel.quantity++
  chizel.price += 20

  click += chizel.multiplier
  }
 update()
}

function buyPickaxe(){
  let pickaxe = clickUpgrades.pickaxe
  if (money >= pickaxe.price){
    money -= pickaxe.price
    pickaxe.quantity++
    click += pickaxe.multiplier
    pickaxe.price += 30
  }
  update()
}

function buyMiner(){
  let miner = automaticUpgrades.miner
  if(money >= miner.price){
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


function buyRobot(){
  let robot = automaticUpgrades.robot
  if(money >= robot.price){
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

function drawCurrentStats(){
  let template = `<div class="card" style="width: 18rem;">
  <div class="card-header">
    Stats
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Click Modifer:<span id="clickValue">${click}</span></li>
    <li class="list-group-item">Auto Modifer:<span id="autoValue">${autoCount}</span></li>
  </ul>
</div>`
document.getElementById("currentStats").innerHTML = template
}

function drawInventory(){
let template = `<div class="card" style="width: 18rem;">
<div class="card-body">
  <h4 class="card-title">Backpack</h4>
  <h5><img class="goldNugget" src="gold.png"> <span id="money">${money}</span></h5>
  <p class="card-text">Chizel: <span id="chizel">${clickUpgrades.chizel.quantity}</span></p>
  <p class="card-text">Pickaxe: <span id="pickaxe">${clickUpgrades.pickaxe.quantity}</span></p>
  <p class="card-text">miner: <span id="miner">${automaticUpgrades.miner.quantity}</span></p>
  <p class="card-text">robot: <span id="robot">${automaticUpgrades.robot.quantity}</span></p>
</div>
</div>`
document.getElementById("inventory").innerHTML = template 
}

function drawButtons(){
  let template = `
  <div class="m-2">
    <p><img class="goldNugget" src="gold.png"><span id="chizelPrice">${clickUpgrades.chizel.price}</span></p>
    <button type="button" class="btn btn-primary" onclick="buyChizel()">Chizel</button>
  </div>
  <div class="m-2">
    <p><img class="goldNugget" src="gold.png"><span id="pickaxePrice">${clickUpgrades.pickaxe.price}</span></p>
    <button type="button" class="btn btn-primary" onclick="buyPickaxe()">Pickaxe</button>
  </div>
  <div class="m-2">
    <p><img class="goldNugget" src="gold.png"><span id="minerPrice">${automaticUpgrades.miner.price}</span></p>
    <button type="button" class="btn btn-primary" onclick="buyMiner()">Miner</button>
  </div>
  <div class="m-2">
    <p><img class="goldNugget" src="gold.png"><span id="robotPrice">${automaticUpgrades.robot.price}</span></p>
    <button type="button" class="btn btn-primary" onclick="buyRobot()">Robot</button>
  </div>`
  document.getElementById("buttons").innerHTML = template
}


function mine(){
  if(!minable){
    return
  }
  money += click
  update()

  minable = false
  setTimeout(() => {
    minable = true
  }, 30);

}


function update(){
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
}


function forLoopTest(){
  for (let i = 0; i <= 50; i++) {
    mine()
    
  }
}




drawButtons()
drawCurrentStats()
drawInventory()