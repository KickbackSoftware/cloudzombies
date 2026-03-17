import { Scene } from "phaser";

export class MenuScene extends Scene {
    constructor() {
        super("MenuScene");
    }

    preload() {
        this.load.spritesheet("menuBackground", "assets/menuBackground.png", { frameWidth: 1565, frameHeight: 960 });
        this.load.bitmapFont("pixelfont", "assets/fonts/pixelfont.png", "assets/fonts/pixelfont.xml");
    }

    init() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
    }

    create() {
        const config = {
            key: 'menuBackgroundAnimation',
            frames: this.anims.generateFrameNumbers('menuBackground', { start: 0, end: 25, first: 0 }),
            frameRate: 10,
            repeat: -1
        };

        this.anims.create(config);
        this.add.sprite(this.scale.width / 2, this.scale.height / 2, "menuBackground").play("menuBackgroundAnimation");

        const playBtn = this.add.bitmapText(this.scale.width / 2, this.scale.height / 2 + 150, "pixelfont", "PLAY", 8)
            .setOrigin(0.5)
            .setScale(8)
            .setTint(0x22ff44)
            .setInteractive({ useHandCursor: true });

        playBtn.on("pointerover", () => {
            playBtn.setTint(0xffffff);
            this.tweens.add({ targets: playBtn, scaleX: 9, scaleY: 9, duration: 100 });
        });

        playBtn.on("pointerout", () => {
            playBtn.setTint(0x22ff44);
            this.tweens.add({ targets: playBtn, scaleX: 8, scaleY: 8, duration: 100 });
        });

        playBtn.on("pointerdown", () => {
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once("camerafadeoutcomplete", () => {
                this.scene.start("MapSelectScene");
            });
        });
    }
}