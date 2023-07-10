# Minecraft AFK Bot

This repository contains a Node.js script for creating an AFK (Away From Keyboard) bot for Minecraft using the mineflayer library. The bot is capable of performing random movements at specified intervals and skipping the night automatically.

## Prerequisites

Before running the script, ensure that you have the following dependencies installed:

- Node.js
- mineflayer package
- mineflayer-cmd plugin
- fs package

You can install the required packages by running the following command:

```
npm install mineflayer mineflayer-cmd fs
```

## Configuration

The script uses a JSON configuration file (`config.json`) to specify the bot's settings. Ensure that you have a valid `config.json` file in the same directory as the script. The configuration file should have the following structure:

```json
{
  "ip": "MINECRAFT_SERVER_IP",
  "name": "BOT_USERNAME",
  "auto-night-skip": true
}
```

- `"ip"`: The IP address of the Minecraft server you want the bot to connect to.
- `"name"`: The username for the bot's Minecraft account.
- `"auto-night-skip"`: A boolean value (`true` or `false`) indicating whether the bot should automatically skip the night by setting the time to day. If set to `true`, the bot will execute `/time set day` command when it becomes nighttime (timeOfDay >= 13000).

## Usage

To run the bot, execute the following command:

```
node bot.js
```

The bot will connect to the Minecraft server using the provided IP address and username. Once connected, it will send a "hello" message in the chat. The bot will then start performing random movements at the specified interval.

The movement interval and maximum random seconds added to the interval can be adjusted by modifying the `moveInterval` and `maxRandom` variables in the script.

## Event Handlers

The script utilizes event handlers to perform specific actions:

- **'login' event**: Triggered when the bot successfully logs into the Minecraft server. It prints a log message and sends a "hello" message in the chat.

- **'time' event**: Triggered when the time in the Minecraft world changes. If the `"auto-night-skip"` configuration is set to `true` and it becomes nighttime (timeOfDay >= 13000), the bot will execute `/time set day` command to skip the night.


## Disclaimer

This script is intended for educational purposes only. Use it responsibly and respect the terms of service of the Minecraft server you connect to.
