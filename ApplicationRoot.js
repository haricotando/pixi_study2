import { dataProvider } from './dataProvider.js';
import Utils from './helper/Utils.js';
import Easing from './helper/Easing.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import { CardContainer } from './CardContainer.js';
import { SceneNeutral } from './Scenes/SceneNeutral.js';
import { SceneRest } from './scenes/SceneRest.js';
import { SceneEncount } from './scenes/SceneEncount.js';
import { SceneDie } from './scenes/SceneDie.js';


export class ApplicationRoot extends PIXI.Container {

    /* ============================================================
        constructor
    ============================================================ */
    constructor(appScreen) {
        super();
        this.initGlobalAssets();
        this.init();
    }

    init() {
        this.initDefaultDeck();
        this.updatePlayerStats();
        this.updateGameStats();
        //
        // this.setSceneNeutral();
        this.setSceneEncount();
        // this.setSceneDie()
    }

    initDefaultDeck() {
        dataProvider.deck = [
            0, 0, 0, 0, 0,
            1, 1, 1 ,1,
            2, 2, 2,
        ];
    }


    /* ------------------------------------------------------------
        Scenes
    ------------------------------------------------------------ */
    setSceneNeutral() {
        this.txtFldScene.text = 'Scene: Neutral';
        this.currentScene = this.addChild(new SceneNeutral());

        this.updatePlayerStats();
        this.updateGameStats();
    }

    setSceneRest() {
        this.removeChild(this.currentScene);
        this.txtFldScene.text = 'Scene: Rest';
        this.currentScene = this.addChild(new SceneRest());
    }

    setSceneEncount() {
        this.removeChild(this.currentScene);
        this.txtFldScene.text = 'Scene: Encount';
        this.currentScene = this.addChild(new SceneEncount());

        this.updateGameStats();
    }

    setSceneDie() {
        this.removeChild(this.currentScene);
        this.txtFldScene.text = 'Died...';
        this.currentScene = this.addChild(new SceneDie());

        this.updateGameStats();

    }



    /* ------------------------------------------------------------
        Dice forward
    ------------------------------------------------------------ */
    setSceneForward() {
        this.removeChild(this.currentScene);
        this.txtFldScene.text = 'Scene: Forward';
        dataProvider.playerStats.food -= 1;
        dataProvider.gameStats.dungeon += 1;

        // Dice回し
        gsap.timeline()
            .set(this.txtFldScene, { alpha: 0.1 })
            .to(this.txtFldScene, { alpha: 1, duration: 0.5, ease: 'linear', repeat: 2 })
            .call(() => {
                let result = Math.round(Math.random() * 2);
                switch (result) {
                    case 0:
                        this.setSceneNeutral();
                        break;
                    case 1:
                        this.setSceneEncount();
                        break;
                    case 2:
                        this.setSceneEncount();
                        break;
                }
            })
        // .call(()=>{
        //     this.updatePlayerStats();
        // })
    }

    /* ------------------------------------------------------------
        Stats
    ------------------------------------------------------------ */
    updatePlayerStats(withFx, lethalDamage) {
        let hp = `HP: ${dataProvider.playerStats.hp}`;
        let food = `Food: ${dataProvider.playerStats.food}`;
        this.txtFldPlayerStats.text = `${hp} / ${food}`
        if (withFx) {
            gsap.set(this, { y: -100 })
            gsap.to(this, { y: 0, duration: 0.2, ease: 'back.out(1.5)' })
        }
        if (lethalDamage) {
            this.setSceneDie();
        }
    }

    updateGameStats() {
        this.txtFldGame.text = `Dungeon: ${dataProvider.gameStats.dungeon}`
    }

    initGlobalAssets() {
        dataProvider.style.base = new PIXI.TextStyle({
            fontFamily: 'Teko', fontSize: 100, fontWeight: 500, fill: 0xFFFFFF,
        });

        dataProvider.style.jp = new PIXI.TextStyle({
            fontFamily: 'Teko', fontSize: 50, fontWeight: 500, fill: 0xFFFFFF,
        });

        this.txtFldScene = this.addChild(new PIXI.Text('Scene: Neutral', Utils.cloneTextStyle(dataProvider.style.base, { fontSize: 90 })));
        this.txtFldScene.anchor.set(0.5);
        this.txtFldScene.x = window.innerWidth / 2;
        this.txtFldScene.y = 100;
        //
        this.txtFldGame = this.addChild(new PIXI.Text('Dungeon: 12', Utils.cloneTextStyle(dataProvider.style.base, { fontWeight: 100, fontSize: 55 })));
        this.txtFldGame.anchor.set(0.5);
        this.txtFldGame.x = window.innerWidth / 2;
        this.txtFldGame.y = 200;
        //
        this.txtFldPlayerStats = this.addChild(new PIXI.Text('HP', Utils.cloneTextStyle(dataProvider.style.base, { fontSize: 60 })));
        this.txtFldPlayerStats.anchor.set(0.5);
        this.txtFldPlayerStats.x = window.innerWidth / 2;
        this.txtFldPlayerStats.y = 270;
        //
        this.txtFldRelic = this.addChild(new PIXI.Text('Relics: ', Utils.cloneTextStyle(dataProvider.style.base, { fontWeight: 300, fontSize: 55 })));
        this.txtFldRelic.anchor.set(0.5);
        this.txtFldRelic.x = window.innerWidth / 2;
        this.txtFldRelic.y = 340;
    }
}