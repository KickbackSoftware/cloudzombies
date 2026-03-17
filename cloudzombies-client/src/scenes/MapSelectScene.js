import { Scene } from "phaser";

export class MapSelectScene extends Scene {
    constructor() {
        super("MapSelectScene");
    }

    preload() {
        this.load.image("mapSelect", "assets/MapSelect.webp");
        this.load.bitmapFont("pixelfont", "assets/fonts/pixelfont.png", "assets/fonts/pixelfont.xml");
    }



    create() {

        const mapSelect = this.add.image(this.scale.width / 2, this.scale.height / 2, "mapSelect")
        mapSelect.preFX.addPixelate();
        const cm = mapSelect.preFX.addColorMatrix()
        cm.grayscale(1)

        const dropZoneText =this.add.bitmapText(this.scale.width / 2, this.scale.height - 200, "pixelfont", "SELECT DROP ZONE", 8)
            .setOrigin(0.5)
            .setScale(4)
            .setTint(0xffffff);
        
        dropZoneText.postFX.addGlow(0xffffff, 0.5, 10, 0)

        this.tweens.add({
            targets: dropZoneText,
            scale: 4.5,
            loop: -1,
            yoyo: true,
        });

        mapSelect.postFX.addShine(1, .2, 5);

        const dominionBtn = this.add.circle(this.scale.width / 2, this.scale.height / 5, 32, 0xffffff, 0.8)
            .setInteractive({ useHandCursor: true });

        let hoverLabel = this.add.bitmapText(dominionBtn.x, dominionBtn.y - 50, "pixelfont", "DOMINION", 8)
                                .setOrigin(0.5)
                                .setScale(4)
                                .setTint(0xffffff)
                                .setDepth(10)
                                .setVisible(false)

        dominionBtn.on("pointerover", () => {
            this.tweens.add({ targets: dominionBtn, scaleX: 0.8, scaleY: 0.8, duration: 100 });
            hoverLabel.setVisible(true); 
        });

        dominionBtn.on("pointerout", () => {
            this.tweens.add({ targets: dominionBtn, scaleX: 1, scaleY: 1, duration: 100 });
            hoverLabel.setVisible(false);
        });

        dominionBtn.on("pointerdown", () => {
            this.cameras.main.fadeOut(500, 0, 0, 0);
            this.cameras.main.once("camerafadeoutcomplete", () => {
                this.scene.start("DominionScene");
            });
        });
    }
}