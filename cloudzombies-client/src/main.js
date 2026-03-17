import { Game } from "phaser";
import { MapSelectScene } from "./scenes/MapSelectScene";
import { MenuScene } from "./scenes/MenuScene";
import { SplashScene } from "./scenes/SplashScene";
import { DominionScene } from "./scenes/DominionScene";

// More information about config: https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    parent: "phaser-container",
    width: 1565,
    height: 960,
    backgroundColor: "#1c172e",
    pixelArt: true,
    roundPixel: false,
    max: {
        width: 1565,
        height: 960,
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 100 }
        }
    },
    scene: [
        //SplashScene,
        // MenuScene,
        MapSelectScene,
        DominionScene,
        // HudScene,
        // GameOverScene
    ]
};

new Game(config);