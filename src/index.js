import 'phaser';
import Menu from './Menu';
import GameScreen from './GameScreen';
import AlternateGame from './AlternateGame';

let scenes = [];
scenes.push(Menu);
scenes.push(GameScreen);
scenes.push(AlternateGame);

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 480,
    input: {
      gamepad: true
    },
    backgroundColor: '#000000',
    scene: scenes,
    physics: {
      default: 'arcade'
    }
};

let game = new Phaser.Game(config);
// Global variable
game._signature = 'GGJ19';
game.gameOptions = {
  platformSpeedRange: [300, 400],
  camSpeed: 5,
  spawnRange: [100, 350],
  platformSizeRange: [50, 250],
  playerGravity: 900,
  jumpForce: 400,
  playerStartPos: 200,
  jumps: 1
}
