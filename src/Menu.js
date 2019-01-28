class Menu extends Phaser.Scene {
  constructor() {
    super({key: 'Menu'});
  }

  preload(){
    this.load.image('TitleBG', 'assets/titlescreen.png');
    this.load.image('level_1', 'assets/Background1-.png');
    this.load.image('level_2', 'assets/Background2-13724.png');
    this.load.image('Logo', 'assets/logo.png');

    this.load.audio('titleBgm', ['assets/audio/title.mp3']);
    this.load.audio('level1bgm', ['assets/audio/Level 1_.mp3']);
    this.load.audio('jump', ['assets/audio/jump.wav']);
  }

  create(){
    this.soundBGM = this.sound.add('titleBgm', {volume: 0.8, loop: "true"});
    this.soundBGM.play();

    this.add.sprite(400, 240, 'Logo');

    this.cameras.main.fadeFrom(1500, 0, 0, 0, false, () => {
      this.time.addEvent({
        delay: 1800,
        callback: () => {
          this.cameras.main.fadeOut(1000);
          this.startScreenTrigger = true;
        }
      });
    });

    // Keyboard Control
    this.input.keyboard.on('keydown_SPACE', (event) => {
      if (this.canStartGame){
        this.scene.start('AlternateGame');
        this.soundBGM.stop();
      }
    });

    // Gamepad Control
    this.input.gamepad.once('down', (pad, button, index) => {
      if (this.canStartGame){
        this.scene.start('AlternateGame');
        this.soundBGM.stop();
      }
    });

  }

  update(){
    if (this.startScreenTrigger){
      this.time.addEvent({
        delay: 2500,
        callback: () => {
          this.add.sprite(0, 0, 'TitleBG').setOrigin(0, 0);
          this.text = this.add.text(400, 400, 'PRESS SPACE TO PLAY!', {
            font: '20px Roboto',
            fill: '#000000'
          });
          this.cameras.main.fadeIn(500);
          this.canStartGame = true;
        }
      });
      this.startScreenTrigger = false;
    }
  }

}

export default Menu;
