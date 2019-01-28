class AlternateGame extends Phaser.Scene {
  constructor() {
    super({key: 'AlternateGame'})
  }

  preload(){
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('block', 'assets/obj_col.png');
    this.load.image('block2', 'assets/obj_col2.png');
    this.load.image('block3', 'assets/obj_col3.png');
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
    // Environment
    this.background = this.add.sprite(0, 0, 'level_1').setOrigin(0);
    this.gameOver = false;

    // Audio setting
    this.soundBGM = this.sound.add('level1bgm', {loop: "true"});
    this.soundBGM.play();
    this.soundJump = this.sound.add('jump', {loop: "false"});

    // Gamepad Control
    this.input.gamepad.once('down', (pad, button, index) => {
      this.gamepad = pad;
    });

    // GameObject Group
    this.bullets = this.physics.add.group({
      defaultKey: 'waterBullet'
    });
    this.obstacles = this.physics.add.group();

    // Platform object
    this.platform = this.physics.add.sprite(400, 470, 'ground');
    this.platform.setOrigin(0, 1);
    this.platform.setImmovable();
    this.platform.alpha = 0;

    // Character object (Player)
    this.char = this.physics.add.sprite(300, 240, 'char');
    this.char.setGravityY(this.game.gameOptions.playerGravity);
    this.bodyChar = this.physics.add.sprite(this.char.x, this.char.y, 'block');
    this.bodyChar.alpha = 0;
    // this.bodyChar.setGravityY(this.game.gameOptions.playerGravity);
    this.footChar = this.physics.add.sprite(this.char.x, this.char.y, 'block2');
    this.footChar.alpha = 0;
    // this.footChar.setGravityY(this.game.gameOptions.playerGravity);


    // Animation handling
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

    // Animation bullet
    this.anims.create({
      key: 'shooted',
      frames: this.anims.generateFrameNumbers('waterBullet', {start: 0}),
      frameRate: 12,
      repeat: -1
    });

    // Level design
    let box = this.physics.add.sprite(2045, 397, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    // Lego
    box = this.physics.add.sprite(2688, 392, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    box = this.physics.add.sprite(2742, 349, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    box = this.physics.add.sprite(2795, 392, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    // Guling
    box = this.physics.add.sprite(3479, 0, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    box = this.physics.add.sprite(3597, 202, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    box = this.physics.add.sprite(3597, 242, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    // Penghapus
    box = this.physics.add.sprite(4060, 413, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    // Selimut
    box = this.physics.add.sprite(4863, 144, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    // Bantal
    box = this.physics.add.sprite(4813, 378, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    // sponge
    box = this.physics.add.sprite(4897, 390, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    // buku diary
    box = this.physics.add.sprite(5461, 375, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Lego
    box = this.physics.add.sprite(5781, 375, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Guling
    box = this.physics.add.sprite(6065, 375, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //sponge
    box = this.physics.add.sprite(6253, 375, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Per
    box = this.physics.add.sprite(6428, 375, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Peraut
    box = this.physics.add.sprite(6588, 383, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Guling
    box = this.physics.add.sprite(6780, 301, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Pulpen
    box = this.physics.add.sprite(6790, 394, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Pensil
    box = this.physics.add.sprite(7102, 375, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Pulpen
    box = this.physics.add.sprite(7232, 394, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Kunci
    box = this.physics.add.sprite(7385, 361, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Pensil
    box = this.physics.add.sprite(7536, 388, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Tipe x
    box = this.physics.add.sprite(7672, 381, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Ryu
    box = this.physics.add.sprite(7939, 163, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Bubble 1
    box = this.physics.add.sprite(8535, 364, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Persib
    box = this.physics.add.sprite(9096, 198, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Bubble 2
    box = this.physics.add.sprite(9713, 364, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Kumang
    box = this.physics.add.sprite(10326, 392, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Jepitan
    box = this.physics.add.sprite(10964, 199, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //buku
    box = this.physics.add.sprite(10968, 390, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Selimut
    box = this.physics.add.sprite(11696, 94, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Bantal sepotong
    box = this.physics.add.sprite(11746, 384, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //sponge
    box = this.physics.add.sprite(11665, 388, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Penghapus
    box = this.physics.add.sprite(12404, 393, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Guling Naruto
    box = this.physics.add.sprite(13012, 165, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Lego 1
    box = this.physics.add.sprite(13466, 395, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Lego 2
    box = this.physics.add.sprite(13521, 377, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Lego 3
    box = this.physics.add.sprite(13576, 395, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;
    //Peraut
    box = this.physics.add.sprite(14014, 386, 'block3');
    this.obstacles.add(box);
    box.setImmovable();
    box.alpha = 0;

    // Collider handling
    this.physics.add.collider(this.char, this.platform);
    this.physics.add.collider(this.char, this.obstacles);
    this.physics.add.collider(this.bodyChar, this.obstacles);

    this.key_R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

  }

  doSlide(){
    if (this.char.body.touching.down){
      this.char.anims.play('slide');
      this.animState = 'slide';
    }
    else{
      this.char.anims.play('airpose');
      this.animState = 'airpose'
    }
  }

  doShooting(){
    if (this.char.body.touching.down){
      if (this.animState == 'run'){
        this.char.anims.play('shooting');
        this.animState = 'shooting';
      }
      else if (this.animState == 'jump' && !this.char.body.touching.down){
        this.char.anims.stop();
        this.char.anims.play('shootingWithGun');
        this.animState = 'shooting';
      }
    }

    let bullet = this.bullets.get(this.char.x + 45, this.char.y + 5);
    if (bullet){
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.body.setVelocityX(450);
      bullet.anims.play('shooted');
    }
    this.time.addEvent({
      delay: 800,
      callback: () => {
        bullet.setVisible(false);
        bullet.setActive(false);
      }
    });
    this.time.addEvent({
      delay: 350,
      callback: () => {this.animState = 'run'}
    });
  }

  doJump(){
    
    if (this.char.body.touching.down ||
        (this.playerJumps > 0 && this.playerJumps < this.game.gameOptions.jumps)){
      this.char.anims.stop();
      this.char.anims.play('jump');
      this.animState = 'jump';
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

  nextLevel(){
    this.level++;
    this.cameras.main.fadeFrom(1000, 0, 0, 0, false, () => {
      this.background = this.add.sprite(0, 0, 'level_2').setOrigin(0);
      this.cameras.main.scrollX = 0;

    });
  }

  update(){

    let cam = this.cameras.main;
    let endCam = 15150; // Based on assets

    if (this.key_R.isDown){
      this.scene.start('Menu');
    }

    // Lose condition
    if (((this.char.x - cam.scrollX) < -100 ) && !this.gameOver){
      this.gameOver = true;
      this.soundBGM.stop();
      console.log('GAME OVER');
      this.scene.restart();
    }

    // Game condition 4813
    if (this.char.x > 1813 && this.game.gameOptions.jumps != 2){
      console.log('2 Jump');
      this.game.gameOptions.jumps = 2;
      this.tweens.add({
        targets: this.char,
        scale: 2.2,
        duration: 300,
        ease: 'Sine.easeInOut',
        yoyo: true
      });
    }

    // Camera setting
    this.platform.x = cam.scrollX;
    if (cam.scrollX < endCam){
      cam.scrollX += 1 * this.game.gameOptions.camSpeed;
    }
    if (this.char.x < endCam + this.game.config.width + 64){
      this.char.setVelocityX(60 * this.game.gameOptions.camSpeed);
      this.bodyChar.x = this.char.x;
      this.bodyChar.y = this.char.y;
      this.footChar.x = this.char.x;
      this.footChar.y = this.char.y + 48;
    }
    else if (!this.gameFinish){
      this.char.setVelocityX(0);
      console.log('END');
      this.gameFinish = true;
      this.tweens.add({
        targets: this.background,
        x: 115,
        ease: 'Sine.easeInOut',
        yoyo: false,
        repeat: 0,
        duration: 2000
      });
      this.cameras.main.fadeOut(2000, 0, 0, 0, false, () => {
        console.log('next level');
        this.nextLevel();
      });
    }

    // Animation state
    if (this.char.body.touching.down &&
        (this.animState != 'slide' || this.animState != 'airpose') && this.animState != 'shooting'){
      this.char.anims.play('run', true);
      this.animState = 'run';
    }

    // Gamepad behavior
    if (this.gamepad){
      if (this.gamepad.A){
        console.log('A pressing');
        this.doSlide();
        if (!this.isPressedA){
          console.log('A pressed');
          // this.doShooting();
          this.isPressedA = true;
        }
      }
      else {
        this.isPressedA = false;
      }
      if (this.gamepad.B){
        console.log('B pressing');
        if (!this.isPressedB){
          console.log('B pressed');
          this.doJump();
          this.soundJump.play();
          this.isPressedB = true;
        }
      }
      else{
        if (this.animState != 'shooting'){
          this.animState = 'run';
        }
        this.isPressedB = false;
      }
    }
  }

}

export default AlternateGame;
