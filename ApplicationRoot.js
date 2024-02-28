import { dataProvider } from './dataProvider.js';
import Utils from './helper/Utils.js';
import Easing from './helper/Easing.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import { CardContainer } from './CardContainer.js';
import { SceneNeutral } from './Scenes/SceneNeutral.js';
import { SceneRest } from './scenes/SceneRest.js';
import { SceneEncount } from './scenes/SceneEncount.js';
import { SceneDie } from './scenes/SceneDie.js';
import { DisplayContainer } from './scenes/DisplayContainer.js';
import { SceneSelectReward } from './scenes/SceneSelectReward.js';


export class ApplicationRoot extends PIXI.Container {

    /* ============================================================
        constructor
    ============================================================ */
    constructor(appScreen) {
        super();
        // this.initGlobalAssets();
        this.init();
    }
 
    init() {
        this.initDefaultDeck();
        this.initDisplayContainer();
        
        // this.setSceneSelectReward();
        // this.setSceneNeutral();
        this.setSceneEncount();
        // this.setSceneDie()
    }

    initDisplayContainer(){
        this.display = this.addChild(new DisplayContainer());
        dataProvider.display = this.display;
    }

    initDefaultDeck() {
        dataProvider.deck = [
            0, 0, 0, 0, 0, 0,
            1, 1, 1, 1,
            2, 3, 4
        ];
    }


    /* ------------------------------------------------------------
        Scenes
    ------------------------------------------------------------ */
    setSceneNeutral() {
        this.removeChild(this.currentScene);
        dataProvider.display.updateScene('Neutral');
        this.currentScene = this.addChild(new SceneNeutral());
        
        // this.updatePlayerStats();
        // this.updateGameStats();
    }
    
    setSceneRest() {
        this.removeChild(this.currentScene);
        dataProvider.display.updateScene('Rest');
        this.currentScene = this.addChild(new SceneRest());
    }

    setSceneEncount() {
        this.removeChild(this.currentScene);
        dataProvider.display.updateScene('Encount');
        this.currentScene = this.addChild(new SceneEncount());
    }

    setSceneSelectReward() {
        this.removeChild(this.currentScene);
        dataProvider.display.updateScene('Select Reward');
        this.currentScene = this.addChild(new SceneSelectReward());
    }

    setSceneDie() {
        this.removeChild(this.currentScene);
        this.txtFldScene.text = 'Died...';
        this.currentScene = this.addChild(new SceneDie());

        // this.updateGameStats();

    }



    /* ------------------------------------------------------------
        Dice forward
    ------------------------------------------------------------ */
    setSceneForward() {
        this.removeChild(this.currentScene);
        
        dataProvider.display.updateScene('Forward');
        dataProvider.playerStats.food -= 1;
        dataProvider.gameStats.dungeon += 1;
        dataProvider.gameStats.untilDawn -= 1;
        dataProvider.display.updateDawn(gsap.timeline());


        // Dice回し
        gsap.timeline()
            .set(this.display, { alpha: 0.1 })
            .to(this.display, { alpha: 1, duration: 0.5, ease: 'linear', repeat: 2 })
            .call(() => {
                let result = Math.round(Math.random() * 3);
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
                    case 3:
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
    // updatePlayerStats(withFx, att, lethalDamage) {
    //     let hp = `HP: ${dataProvider.playerStats.hp}`;
    //     let food = `Food: ${dataProvider.playerStats.food}`;
    //     this.txtFldPlayerStats.text = `${hp} / ${food}`
    //     if (withFx) {
    //         gsap.set(this, { y: -100 })
    //         gsap.to(this, { y: 0, duration: 0.2, ease: 'back.out(1.5)' })
    //     }
    //     if (lethalDamage) {
    //         this.setSceneDie();
    //     }
        
    //     if (withFx) {
    //         let damageDrop = this.addChild(new PIXI.Text(att, Utils.cloneTextStyle(dataProvider.style.base, {fontSize:55})));
    //         damageDrop.anchor.set(0.5);
    //         damageDrop.x = 250;
    //         damageDrop.y = 250;
    //         damageDrop.alpha = 0;

    //         gsap.timeline()
    //             .set(damageDrop, {y:200, alpha:1, delay:0.1})
    //             .to(damageDrop, {y:250, ease:'bounce', duration:0.3})
    //             .to(damageDrop, {alpha:0, duration:0.1, ease:'linear', onComplete: () => {
    //                  this.removeChild(damageDrop);
    //                 }})
    //     }

    // }



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