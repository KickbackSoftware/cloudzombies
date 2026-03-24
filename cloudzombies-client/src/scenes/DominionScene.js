import { Scene } from "phaser";

export class DominionScene extends Scene {
    constructor() {
        super({ key: "DominionScene" })
    }

    preload() {
        this.load.setPath("assets/maps/dominion");
        this.load.tilemapTiledJSON('room-0', 'rooms/room-0.json')
        this.load.image("tiles", "tilesets/dominion.png")

        this.load.image("background", "paralax/background.png")
        this.load.image("bridge", "paralax/bridge.png")
        this.load.image("cages", "paralax/cages.png")
        this.load.image("fog", "paralax/fog.png")
        this.load.image("fogForeground", "paralax/fogForeground.png")
        this.load.image("pillars", "paralax/pillars.png")
    }

    create() {
        /** @type {Record<string, Phaser.Tilemaps.TilemapLayer>} */
        const layers = {};
        const map = this.make.tilemap({ key: "room-0" });

        const tileset = map.addTilesetImage('dominion', 'tiles');

        map.getTileLayerNames().forEach((name) => {
            layers[name] = map.createLayer(name, tileset, 0, 0).setPipeline('Light2D')
        })
        this.lights.enable().setAmbientColor(0x222222);
        layers["Collision"].setCollisionByProperty({ collides: true })
        layers["GlowLights"].forEachTile(tile => {
            if (tile.index !== -1) { // -1 means empty
                const worldX = tile.getCenterX();
                const worldY = tile.getCenterY();
                this.lights.addLight(worldX, worldY, 55, 0xFFFAE4, 1);
            }
        });

        let background = this.add.image(
            map.widthInPixels / 2, map.heightInPixels / 2, "background"
        ).setPipeline('Light2D');
        background.displayWidth = map.widthInPixels;
        background.displayHeight = map.heightInPixels;
        background.setDepth(-3);

        let pillars = this.add.image(
            map.widthInPixels / 2, map.heightInPixels / 2, "pillars"
        ).setPipeline('Light2D');
        pillars.displayWidth = map.widthInPixels;
        pillars.displayHeight = map.heightInPixels;
        pillars.setDepth(-2);


        const zoomX = this.scale.width / map.widthInPixels;
        const zoomY = this.scale.height / map.heightInPixels;
        const zoom = Math.max(zoomX, zoomY);

        this.cameras.main.setZoom(zoom);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.centerOn(map.widthInPixels / 2, map.heightInPixels / 2);



    }
}