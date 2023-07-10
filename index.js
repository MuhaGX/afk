const mineflayer = require('mineflayer');
const cmd = require('mineflayer-cmd').plugin;
const fs = require('fs');

const configData = fs.readFileSync('config.json');
const config = JSON.parse(configData);

const {
  ip: host,
  name: username,
  'auto-night-skip': nightSkip,
} = config;

const actions = ['forward', 'back', 'left', 'right'];
let lastAction;
let lastTime = -1;
let moving = false;
let connected = false;

const moveInterval = 2; // Movement interval in seconds
const maxRandom = 5; // Random seconds added to movement interval

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const bot = mineflayer.createBot({
  host,
  username,
});

bot.loadPlugin(cmd);

// Login event handler
bot.on('login', function () {
  console.log('Logged in');
  bot.chat('hello');
});

// Time event handler
bot.on('time', async function (time) {
  if (nightSkip === true && bot.time.timeOfDay >= 13000) {
    await bot.chat('/time set day');
  }

  if (!connected) {
    return;
  }

  if (lastTime < 0) {
    lastTime = bot.time.age;
  } else {
    const randomAdd = Math.random() * maxRandom * 20;
    const interval = moveInterval * 20 + randomAdd;
    const timeElapsed = bot.time.age - lastTime;

    if (timeElapsed > interval) {
      if (moving) {
        bot.setControlState(lastAction, false);
        moving = false;
        lastTime = bot.time.age;
      } else {
        const yaw = Math.random() * Math.PI - 0.5 * Math.PI;
        const pitch = Math.random() * Math.PI - 0.5 * Math.PI;
        bot.look
