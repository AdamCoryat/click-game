"use strict";

var minable = true;
var achievements = [{
  name: "1st click!",
  reached: 0,
  amount: 1
}, {
  name: "1000 gold!",
  reached: 0,
  amount: 1000
}, {
  name: "10000 gold!",
  reached: 0,
  amount: 10000
}];
var counters = {
  money: 0,
  click: 1,
  autoCount: 0,
  moneyTotal: 0
};
var clickUpgrades = {
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
var automaticUpgrades = {
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
loadCounters(); //stringifys objects then saves them to local storage

function saveData() {
  window.localStorage.setItem("counters", JSON.stringify(counters));
  window.localStorage.setItem("clickUpgrades", JSON.stringify(clickUpgrades));
  window.localStorage.setItem("automaticUpgrades", JSON.stringify(automaticUpgrades));
} //loads data that was stored i local storage


function loadCounters() {
  var counterData = JSON.parse(window.localStorage.getItem("counters"));
  var clickUpgradesData = JSON.parse(window.localStorage.getItem("clickUpgrades"));
  var automaticUpgradesData = JSON.parse(window.localStorage.getItem("automaticUpgrades"));

  if (counterData) {
    counters = counterData;
  }

  if (clickUpgradesData) {
    clickUpgrades = clickUpgradesData;
  }

  if (automaticUpgradesData) {
    automaticUpgrades = automaticUpgradesData;
  }
} // subtract price from money, add a chizel to quanity and add to the click count modifier


function buyChizel() {
  var chizel = clickUpgrades.chizel;

  if (counters.money >= chizel.price) {
    counters.money -= chizel.price;
    chizel.quantity++;
    chizel.price += 5;
    counters.click += chizel.multiplier;
  }

  saveData();
  update();
} //subtract price from money, add a pickaxe to quanity and add to the click count modifier


function buyPickaxe() {
  var pickaxe = clickUpgrades.pickaxe;

  if (counters.money >= pickaxe.price) {
    counters.money -= pickaxe.price;
    pickaxe.quantity++;
    counters.click += pickaxe.multiplier;
    pickaxe.price += 15;
  }

  saveData();
  update();
} //subtract price from money, add a miner to the quanity and add modifier to auotCounter


function buyMiner() {
  var miner = automaticUpgrades.miner;

  if (counters.money >= miner.price) {
    counters.money -= miner.price;
    miner.quantity++;
    counters.autoCount += miner.multiplier;
    miner.price += 20;
  }

  saveData();
  update();
} //subtract price from money, add to robot quanity and add modifier to autoCounter


function buyRobot() {
  var robot = automaticUpgrades.robot;

  if (counters.money >= robot.price) {
    counters.money -= robot.price;
    robot.quantity++;
    counters.autoCount += robot.multiplier;
    robot.price += 125;
  }

  saveData();
  update();
} // adds counters.autoCount to the total every 3 seconds. 


function moneyInterval() {
  setInterval(function () {
    counters.money += counters.autoCount; //counters.moneyTotal += counters.autoCount

    saveData();
    update();
  }, 3000);
} //draws smaller card for mobile applications to keep track of the gold


function drawMoneyMobile() {
  var template = "<div class=\"shadow-gold card trans-bg border border-secondary body-font d-block d-md-none text-center m-3 p-2\">\n        <h5><img class=\"goldNugget\" src=\"gold.png\"> <span class=\"body-font\" id=\"moneyMobile\">".concat(counters.money, "</span></h5><br>\n      </div>");
  document.getElementById("moneyMobileCard").innerHTML = template;
} //draws a md version and a mobile version of the stats of autoclick and click


function drawCurrentStats() {
  var template = "<div class=\"shadow-gold card trans-bg border border-secondary body-font d-none d-md-block\">\n  <div class=\"card-header font-weight-bold\">\n    Gold Getting Stats\n  </div>\n  <p class=\"card-text font-weight-lighter\">This is how much sweet gold loots your getting per click: <span id=\"clickValue\">".concat(counters.click, "</span></p>\n  <p class=\"card-text font-weight-lighter\">This is how much gold you're making not doing anything!: <span id=\"autoValue\">").concat(counters.autoCount, "</span></p>\n</div>\n    <div class=\"shadow-gold card trans-bg border border-secondary body-font d-block d-md-none m-3\" >\n      <div class=\"card-header font-weight-bold\">\n        Gold Gettin Stats\n  </div>\n      <p class=\"card-text font-weight-lighter\">Per Click: <span id=\"clickValueMobile\">").concat(counters.clickclick, "</span></p>\n      <p class=\"card-text font-weight-lighter\">Idle Gold:  <span id=\"autoValueMobile\">").concat(counters.autoCount, "</span></p>\n</div >");
  document.getElementById("currentStats").innerHTML = template;
} //draws a md version and a mobile version of the backpack with the items and amount of gold


function drawInventory() {
  var template = "<div class=\"shadow-gold card trans-bg border border-secondary body-font d-none d-md-block\">\n<div class=\"card-body\">\n  <h4 class=\"card-title body-font\">Backpack</h4>\n  <h5><img class=\"goldNugget\" src=\"gold.png\"> <span class=\"body-font\"id=\"money\">".concat(counters.money, "</span></h5>\n  <h5 class=\"body-font\">Earned: <span class=\"body-font\"id=\"moneyTotal\">").concat(counters.moneyTotal, "</span></h5>\n  <p class=\"card-text\">Chizel: <span id=\"chizel\">").concat(clickUpgrades.chizel.quantity, "</span></p>\n  <p class=\"card-text\">Pickaxe: <span id=\"pickaxe\">").concat(clickUpgrades.pickaxe.quantity, "</span></p>\n  <p class=\"card-text\">miner: <span id=\"miner\">").concat(automaticUpgrades.miner.quantity, "</span></p>\n  <p class=\"card-text\">robot: <span id=\"robot\">").concat(automaticUpgrades.robot.quantity, "</span></p>\n</div>\n</div>\n<div class=\"shadow-gold card trans-bg border border-secondary body-font d-block d-md-none m-3\">\n<div class=\"card-body\">\n  <p class=\"card-text\"><img class=\"tools\" src=\"chizel.png\"> <span id=\"chizelMobile\">").concat(clickUpgrades.chizel.quantity, "</span></p>\n  <p class=\"card-text\"><img class=\"tools\" src=\"pickaxe.png\"> <span id=\"pickaxeMobile\">").concat(clickUpgrades.pickaxe.quantity, "</span></p>\n  <p class=\"card-text\"><img class=\"tools\" src=\"miner.png\"> <span id=\"minerMobile\">").concat(automaticUpgrades.miner.quantity, "</span></p>\n  <p class=\"card-text\"><img class=\"tools\" src=\"robot.png\"> <span id=\"robotMobile\">").concat(automaticUpgrades.robot.quantity, "</span></p>\n</div>\n</div>");
  document.getElementById("inventory").innerHTML = template;
} //draws the buttons to access the purchase functions


function drawButtons() {
  var template = "\n  <div class=\"m-2 \">\n    <p><img class=\"goldNugget\" src=\"gold.png\">  <span id=\"chizelPrice\">".concat(clickUpgrades.chizel.price, "</span></p>\n    <button id=\"chizelBtn\" type=\"button\" class=\"btn btn-secondary\" onclick=\"buyChizel()\"><img class=\"tools\" src=\"chizel.png\"></button>\n  </div>\n  <div class=\"m-2\">\n    <p><img class=\"goldNugget\" src=\"gold.png\">  <span id=\"pickaxePrice\">").concat(clickUpgrades.pickaxe.price, "</span></p>\n    <button id=\"pickaxeBtn\" type=\"button\" class=\"btn btn-secondary\" onclick=\"buyPickaxe()\"><img class=\"tools\" src=\"pickaxe.png\"></button>\n  </div>\n  <div class=\"m-2\">\n    <p><img class=\"goldNugget\" src=\"gold.png\">  <span id=\"minerPrice\">").concat(automaticUpgrades.miner.price, "</span></p>\n    <button id=\"minerBtn\" type=\"button\" class=\"btn btn-secondary\" onclick=\"buyMiner()\"><img class=\"tools\" src=\"miner.png\"></button>\n  </div>\n  <div class=\"m-2\">\n    <p><img class=\"goldNugget\" src=\"gold.png\">  <span id=\"robotPrice\">").concat(automaticUpgrades.robot.price, "</span></p>\n    <button id=\"robotBtn\" type=\"button\" class=\"btn btn-secondary\" onclick=\"buyRobot()\"><img class=\"tools\" src=\"robot.png\"></button>\n  </div>");
  document.getElementById("buttons").innerHTML = template;
} //checks to see if moneyTotal meets an achievement amounts


function achievement() {
  for (var i = 0; i < achievements.length; i++) {
    var a = achievements[i];

    if (a.amount <= counters.moneyTotal && a.reached == 0) {
      a.reached++;
      alert(a.name);
    }

    saveData();
  }
} //an onclick function attached to the image to add to the gold


function mine() {
  if (!minable) {
    return;
  }

  counters.money += counters.click;
  counters.moneyTotal += counters.click;
  update();
  saveData();
  minable = false;
  setTimeout(function () {
    minable = true;
  }, 30);
} //updates all the stats in the game


function update() {
  document.getElementById("money").innerText = counters.money.toString();
  document.getElementById("moneyTotal").innerText = counters.moneyTotal.toString();
  document.getElementById("chizel").innerText = clickUpgrades.chizel.quantity.toString();
  document.getElementById("pickaxe").innerText = clickUpgrades.pickaxe.quantity.toString();
  document.getElementById("miner").innerText = automaticUpgrades.miner.quantity.toString();
  document.getElementById("robot").innerText = automaticUpgrades.robot.quantity.toString();
  document.getElementById("clickValue").innerText = counters.click.toString();
  document.getElementById("autoValue").innerText = counters.autoCount.toString();
  document.getElementById("chizelPrice").innerText = clickUpgrades.chizel.price.toString();
  document.getElementById("pickaxePrice").innerText = clickUpgrades.pickaxe.price.toString();
  document.getElementById("minerPrice").innerText = automaticUpgrades.miner.price.toString();
  document.getElementById("robotPrice").innerText = automaticUpgrades.robot.price.toString();
  document.getElementById("moneyMobile").innerText = counters.money.toString();
  document.getElementById("chizelMobile").innerText = clickUpgrades.chizel.quantity.toString();
  document.getElementById("pickaxeMobile").innerText = clickUpgrades.pickaxe.quantity.toString();
  document.getElementById("minerMobile").innerText = automaticUpgrades.miner.quantity.toString();
  document.getElementById("robotMobile").innerText = automaticUpgrades.robot.quantity.toString();
  document.getElementById("clickValueMobile").innerText = counters.click.toString();
  document.getElementById("autoValueMobile").innerText = counters.autoCount.toString();
  achievement();
} //test function to try and break click


function forLoopTest() {
  for (var i = 0; i <= 50; i++) {
    mine();
  }
} // instructions on how to play the game 


alert("Click the Globe to start earning gold, purchase items to increase your gold making skills!");
moneyInterval();
drawMoneyMobile();
drawButtons();
drawCurrentStats();
drawInventory();