export class DominionScene extends Phaser.Scene {
    constructor() {
        super({key: "DominionScene"})
    }

    preload() {
        this.load.setPath("assets/maps/dominion"); 
        this.load.spritesheet("dominion-tiles", "tilesets/dominion.png", { frameWidth: 64, frameHeight: 64 })
        this.load.tilemapTiledJSON('map', 'assets/tilemaps')
        this.load.image("background", "paralax/background.png")
        this.load.image("bridge", "paralax/bridge.png")
        this.load.image("cages", "paralax/cages.png")
        this.load.image("fog", "paralax/fog.png")
        this.load.image("fogForeground", "paralax/fogForeground.png")
        this.load.image("pillars", "paralax/pillars.png")
    }
}