"use strict";

var money = 0;
var click = 1;
var autoCount = 0;
var minable = true;
var clickUpgrades = {
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
var automaticUpgrades = {
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

function buyChizel() {
  var chizel = clickUpgrades.chizel;

  if (money >= chizel.price) {
    money -= chizel.price;
    chizel.quantity++;
    chizel.price += 20;
    click += chizel.multiplier;
  }

  update();
}

function buyPickaxe() {
  var pickaxe = clickUpgrades.pickaxe;

  if (money >= pickaxe.price) {
    money -= pickaxe.price;
    pickaxe.quantity++;
    click += pickaxe.multiplier;
    pickaxe.price += 30;
  }

  update();
}

function buyMiner() {
  var miner = automaticUpgrades.miner;

  if (money >= miner.price) {
    money -= miner.price;
    miner.quantity++;
    autoCount += miner.multiplier;
    miner.price += 50;
    setInterval(function () {
      money += miner.multiplier;
      update();
    }, 3000);
  }

  update();
}

function buyRobot() {
  var robot = automaticUpgrades.robot;

  if (money >= robot.price) {
    money -= robot.price;
    robot.quantity++;
    autoCount += robot.multiplier;
    robot.price += 250;
    setInterval(function () {
      money += robot.multiplier;
      update();
    }, 3000);
  }

  update();
}

function drawMoneyMobile() {
  var template = "<div class=\"card trans-bg border border-secondary body-font d-block d-md-none text-center\">\n        <h5><img class=\"goldNugget\" src=\"gold.png\"> <span class=\"body-font\" id=\"moneyMobile\">".concat(money, "</span></h5>\n      </div>");
  document.getElementById("moneyMobileCard").innerHTML = template;
}

function drawCurrentStats() {
  var template = "<div class=\"card trans-bg border border-secondary body-font d-none d-md-block\">\n  <div class=\"card-header font-weight-bold\">\n    Gold Getting Stats\n  </div>\n  <p class=\"card-text font-weight-lighter\">This is how much sweet gold loots your getting per click: <span id=\"clickValue\">".concat(click, "</span></p>\n  <p class=\"card-text font-weight-lighter\">This is how much gold you're making not doing anything!: <span id=\"autoValue\">").concat(autoCount, "</span></p>\n</div>\n    <div class=\"card trans-bg border border-secondary body-font d-block d-md-none\" >\n      <div class=\"card-header font-weight-bold\">\n        Gold Getting Stats\n  </div>\n      <p class=\"card-text font-weight-lighter\">Per Click: <span id=\"clickValueMobile\">").concat(click, "</span></p>\n      <p class=\"card-text font-weight-lighter\">Idle Gold:  <span id=\"autoValueMobile\">").concat(autoCount, "</span></p>\n</div >");
  document.getElementById("currentStats").innerHTML = template;
}

function drawInventory() {
  var template = "<div class=\"card trans-bg border border-secondary body-font d-none d-md-block\">\n<div class=\"card-body\">\n  <h4 class=\"card-title body-font\">Backpack</h4>\n  <h5><img class=\"goldNugget\" src=\"gold.png\"> <span class=\"body-font\"id=\"money\">".concat(money, "</span></h5>\n  <p class=\"card-text\">Chizel: <span id=\"chizel\">").concat(clickUpgrades.chizel.quantity, "</span></p>\n  <p class=\"card-text\">Pickaxe: <span id=\"pickaxe\">").concat(clickUpgrades.pickaxe.quantity, "</span></p>\n  <p class=\"card-text\">miner: <span id=\"miner\">").concat(automaticUpgrades.miner.quantity, "</span></p>\n  <p class=\"card-text\">robot: <span id=\"robot\">").concat(automaticUpgrades.robot.quantity, "</span></p>\n</div>\n</div>\n<div class=\"card trans-bg border border-secondary body-font d-block d-md-none\">\n<div class=\"card-body\">\n  <p class=\"card-text\"><img class=\"tools\" src=\"chizel.png\"> <span id=\"chizelMobile\">").concat(clickUpgrades.chizel.quantity, "</span></p>\n  <p class=\"card-text\"><img class=\"tools\" src=\"pickaxe.png\"> <span id=\"pickaxeMobile\">").concat(clickUpgrades.pickaxe.quantity, "</span></p>\n  <p class=\"card-text\"><img class=\"tools\" src=\"miner.png\"> <span id=\"minerMobile\">").concat(automaticUpgrades.miner.quantity, "</span></p>\n  <p class=\"card-text\"><img class=\"tools\" src=\"robot.png\"> <span id=\"robotMobile\">").concat(automaticUpgrades.robot.quantity, "</span></p>\n</div>\n</div>");
  document.getElementById("inventory").innerHTML = template;
}

function drawButtons() {
  var template = "\n  <div class=\"m-2\">\n    <p><img class=\"goldNugget\" src=\"gold.png\">  <span id=\"chizelPrice\">".concat(clickUpgrades.chizel.price, "</span></p>\n    <button type=\"button\" class=\"btn btn-secondary\" onclick=\"buyChizel()\"><img class=\"tools\" src=\"chizel.png\"></button>\n  </div>\n  <div class=\"m-2\">\n    <p><img class=\"goldNugget\" src=\"gold.png\">  <span id=\"pickaxePrice\">").concat(clickUpgrades.pickaxe.price, "</span></p>\n    <button type=\"button\" class=\"btn btn-secondary\" onclick=\"buyPickaxe()\"><img class=\"tools\" src=\"pickaxe.png\"></button>\n  </div>\n  <div class=\"m-2\">\n    <p><img class=\"goldNugget\" src=\"gold.png\">  <span id=\"minerPrice\">").concat(automaticUpgrades.miner.price, "</span></p>\n    <button type=\"button\" class=\"btn btn-secondary\" onclick=\"buyMiner()\"><img class=\"tools\" src=\"miner.png\"></button>\n  </div>\n  <div class=\"m-2\">\n    <p><img class=\"goldNugget\" src=\"gold.png\">  <span id=\"robotPrice\">").concat(automaticUpgrades.robot.price, "</span></p>\n    <button type=\"button\" class=\"btn btn-secondary\" onclick=\"buyRobot()\"><img class=\"tools\" src=\"robot.png\"></button>\n  </div>");
  document.getElementById("buttons").innerHTML = template;
}

function mine() {
  if (!minable) {
    return;
  }

  money += click;
  update();
  minable = false;
  setTimeout(function () {
    minable = true;
  }, 30);
}

function update() {
  document.getElementById("money").innerText = money.toString();
  document.getElementById("chizel").innerText = clickUpgrades.chizel.quantity.toString();
  document.getElementById("pickaxe").innerText = clickUpgrades.pickaxe.quantity.toString();
  document.getElementById("miner").innerText = automaticUpgrades.miner.quantity.toString();
  document.getElementById("robot").innerText = automaticUpgrades.robot.quantity.toString();
  document.getElementById("clickValue").innerText = click.toString();
  document.getElementById("autoValue").innerText = autoCount.toString();
  document.getElementById("chizelPrice").innerText = clickUpgrades.chizel.price.toString();
  document.getElementById("pickaxePrice").innerText = clickUpgrades.pickaxe.price.toString();
  document.getElementById("minerPrice").innerText = automaticUpgrades.miner.price.toString();
  document.getElementById("robotPrice").innerText = automaticUpgrades.robot.price.toString();
  document.getElementById("moneyMobile").innerText = money.toString();
  document.getElementById("chizelMobile").innerText = clickUpgrades.chizel.quantity.toString();
  document.getElementById("pickaxeMobile").innerText = clickUpgrades.pickaxe.quantity.toString();
  document.getElementById("minerMobile").innerText = automaticUpgrades.miner.quantity.toString();
  document.getElementById("robotMobile").innerText = automaticUpgrades.robot.quantity.toString();
  document.getElementById("clickValueMobile").innerText = click.toString();
  document.getElementById("autoValueMobile").innerText = autoCount.toString();
}

function forLoopTest() {
  for (var i = 0; i <= 50; i++) {
    mine();
  }
}

drawMoneyMobile();
drawButtons();
drawCurrentStats();
drawInventory();