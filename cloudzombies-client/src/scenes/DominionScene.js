export class DominionScene extends Phaser.Scene {
    constructor() {
        super({key: "DominionScene"})
    }

    preload() {
        this.load.setPath("assets/maps/dominion"); 
        this.load.spritesheet("dominion-tiles", "tilesets/dominion.png", { frameWidth: 64, frameHeight: 64 })
        this.load.tilemapTiledJSON('map', 'tilesets/dominion.json')
        
        // this.load.image("background", "paralax/background.png")
        // this.load.image("bridge", "paralax/bridge.png")
        // this.load.image("cages", "paralax/cages.png")
        // this.load.image("fog", "paralax/fog.png")
        // this.load.image("fogForeground", "paralax/fogForeground.png")
        // this.load.image("pillars", "paralax/pillars.png")
    }

    create() {
        // const map = this.add.tilemap({ key: 'map' });
        // const tiles = map.addTilesetImage('dominion-tiles');
        // const layer = map.createLayer('Tile Layer 1', tiles);
        // const sprites = map.createFromTiles([ 53, 50 ], -1, { useSpriteSheet: true });
        // this.tweens.add({
        //     targets: sprites,
        //     y: '-=32',
        //     duration: 1000,
        //     ease: 'Sine.easeInOut',
        //     yoyo: true,
        //     repeat: -1
        // });
    }
}