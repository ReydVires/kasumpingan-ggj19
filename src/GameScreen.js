class GameScreen extends Phaser.Scene {
  constructor() {
    super({key: 'GameScreen'});
  }

  init(){
    console.log(this.game._signature);
  }

  preload(){
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('background1', 'assets/Background-obstacle1.png');
    this.load.image('ground', 'assets/ground.png');
    this.load.spritesheet('char', 'assets/CharAnim.png', {
      frameWidth: 100,
      frameHeight: 128
    });
    this.load.spritesheet('waterBullet', 'assets/PeluruAir.png', {
      frameWidth: 100,
      frameHeight: 64
    });
  }

  create(){
    this.bg = this.add.sprite(0, 0, 'background1').setOrigin(0, 0);

    // Setup control
    // Gamepad
    this.input.gamepad.once('down', (pad, button, index) => {
      this.gamepad = pad;
      console.log('index: ', index, ', button: ', button);
    });

    //Keyboard
    this.input.keyboard.on('keydown_UP', event => {
      this.jump();
    });
    this.key_down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);


    this.input.keyboard.on('keydown_DOWN', event => {
      // this.physics.world.removeCollider(this.topCharCollider);
    });

    this.input.keyboard.on('keyup_DOWN', event => {
      // this.physics.world.removeCollider(this.topCharCollider);
      // this.topCharCollider = this.physics.add.collider(this.char, this.colliderCollection);
    });

    this.input.keyboard.on('keydown_RIGHT', event => {
      if (!this.isShooting){
        this.doShooting();
      }
    });
    this.input.keyboard.on('keydown_R', event => {
      this.scene.start('Menu');
    });

    this.bullets = this.physics.add.group({
      defaultKey: 'waterBullet'
    });

    this.colliderCollection = this.physics.add.group();
    let box = this.physics.add.sprite(690, 430, 'player');
    this.colliderCollection.add(box);
    box.setImmovable();
    box.alpha = 0;
    box = this.physics.add.sprite(880, 430, 'player');
    this.colliderCollection.add(box);
    box.setImmovable();
    box.alpha = 0;
    box = this.physics.add.sprite(1080, 230, 'player');
    this.colliderCollection.add(box);
    box.setImmovable();
    box.alpha = 0;


    this.ground = this.physics.add.sprite(400, 470, 'ground');
    this.ground.setOrigin(0, 1);
    this.ground.setImmovable();
    this.ground.alpha = 0;

    this.char = this.physics.add.sprite(300, 240, 'char');
    this.char.setGravityY(this.game.gameOptions.playerGravity);

    box = this.physics.add.sprite(this.char.x, this.char.y + 100, 'player');
    box.displayWidth = 64;
    box.displayHeight = 40;
    console.log(box.body);
    // box.alpha = 0;
    this.lowCharCollider = box;
    this.physics.add.collider(this.lowCharCollider, this.colliderCollection);
    this.physics.add.collider(this.lowCharCollider, this.ground);

    // this.physics.add.collider(this.char, this.ground);
    // this.topCharCollider = this.physics.add.collider(this.char, this.colliderCollection);
    this.physics.add.collider(this.colliderCollection, this.ground);

    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('char', {start: 0, end: 6}),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: 'slide',
      frames: this.anims.generateFrameNumbers('char', {start: 7, end: 7}),
      frameRate: 12,
      repeat: 0
    });
    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('char', {start: 8, end: 10}),
      frameRate: 12,
      repeat: 0
    });
    this.anims.create({
      key: 'doubleJump',
      frames: this.anims.generateFrameNumbers('char', {start: 11, end: 14}),
      frameRate: 12,
      repeat: 0
    });
    this.anims.create({
      key: 'airpose',
      frames: this.anims.generateFrameNumbers('char', {start: 15, end: 15}),
      frameRate: 12,
      repeat: 0
    });
    this.anims.create({
      key: 'runWithGun',
      frames: this.anims.generateFrameNumbers('char', {start: 16, end: 22}),
      frameRate: 12,
      repeat: 0
    });
    this.anims.create({
      key: 'slideWithGun',
      frames: this.anims.generateFrameNumbers('char', {start: 23, end: 23}),
      frameRate: 12,
      repeat: 0
    });
    this.anims.create({
      key: 'shootingWithGun',
      frames: this.anims.generateFrameNumbers('char', {start: 35, end: 37}),
      frameRate: 12,
      repeat: 0
    });
    this.anims.create({
      key: 'shooting',
      frames: this.anims.generateFrameNumbers('char', {start: 38}),
      frameRate: 12,
      repeat: 0
    });

    this.anims.create({
      key: 'shooted',
      frames: this.anims.generateFrameNumbers('waterBullet', {start: 0}),
      frameRate: 12,
      repeat: -1
    });

    this.gameFinish = false;


    this.text = this.add.text(50, 50, 'Welcome to GLOBAL GAMEJAM 2019!', {
      font: '40px Roboto'
    });

  }

  doShooting(){
    if (this.char.body.touching.down){
      this.char.anims.play('shooting');
    }
    else if (this.playerJumps != 0 && !this.char.body.touching.down){
      this.char.anims.play('shootingWithGun');
    }

    let bullet = this.bullets.get(this.char.x + 45, this.char.y + 5);
    if (bullet){
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.body.setVelocityX(450);
      bullet.anims.play('shooted');
    }

    this.isShooting = true;
    this.time.addEvent({
      delay: 800,
      callback: () => {
        bullet.setActive(false);
        bullet.setVisible(false);
      }
    });
    this.time.addEvent({
      delay: 350,
      callback: () => {this.isShooting = false}
    });
  }

  jump(){
    if (!this.gameFinish && this.char.body.touching.down || (this.playerJumps > 0 && this.playerJumps < this.game.gameOptions.jumps)){
      this.char.anims.stop();
      this.char.anims.play('jump');
      if (this.char.body.touching.down){
        this.playerJumps = 0;
      }
      this.char.setVelocityY(this.game.gameOptions.jumpForce * -1);
      this.playerJumps++;
      if (this.playerJumps == 2){
        this.char.anims.play('doubleJump');
      }
    }
  }

  doSlide(){
    if (this.char.body.touching.down){
      this.char.anims.play('slide');
    }
    else {
      this.char.anims.play('airpose');
    }
  }

  update(){
    let cam = this.cameras.main;
    this.ground.x = cam.scrollX;
    let endCam = 4580;
    if (cam.scrollX < endCam){
      cam.scrollX += 1 * this.game.gameOptions.camSpeed;
    }
    if (this.char.x < endCam + this.game.config.width + 64){
      this.char.setVelocityX(60 * this.game.gameOptions.camSpeed);
      this.lowCharCollider.x = this.char.x;
      this.lowCharCollider.y = this.char.y + 55;
    }
    else if (!this.gameFinish){
      this.char.setVelocityX(0);
      console.log('END');
      this.gameFinish = true;
      this.tweens.add({
        targets: this.bg,
        x: 115,
        ease: 'Sine.easeInOut',
        yoyo: false,
        repeat: 0,
        duration: 2000
      });
      this.cameras.main.fadeOut(6000);
    }

    if (this.char.body.touching.down && !this.isShooting){
      this.char.anims.play('run', true);
    }

    if (this.key_down.isDown){
      this.doSlide();

    }

    if (this.gamepad){
      // if (this.gamepad.A){
      //   this.doSlide();
      //   this.physics.world.removeCollider(this.topCharCollider);
      //   this.botCharCollider = this.physics.add.collider(this.lowCharCollider, this.colliderCollection);
      // }
      if (this.gamepad.A && !this.isShooting){
        this.doShooting();
        this.lastButton = 'A';
      }
      if (this.gamepad.B && this.lastButton != 'B'){
        this.jump();
        console.log(this.gamepad.B);
        this.lastButton = 'B';
      }

      this.lastButton = '';
    }


  }

}

export default GameScreen;
