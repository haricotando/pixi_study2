import { dataProvider } from './dataProvider.js';
import Utils from './helper/Utils.js';
import Easing from './helper/Easing.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import { CardContainer } from './CardContainer.js';
import { SceneNeutral } from './Scenes/SceneNeutral.js';
import { SceneRest } from './scenes/SceneRest.js';
import { SceneEncount } from './scenes/SceneEncount.js';


export class ApplicationRoot extends PIXI.Container {

    /* ============================================================
        constructor
    ============================================================ */
    constructor(appScreen) {
        super();
        this.initDebugAssets();
        this.init();
    }

    init(){
        this.initDefaultDeck();

        this.setSceneNeutral();
        // this.setSceneEncount();
        // this.updatePlayerStats();
    }

    setSceneNeutral(){
        this.txtFldScene.text = 'Scene: Neutral';
        this.currentScene = this.addChild(new SceneNeutral());
    }

    setSceneForward(){
        this.removeChild(this.currentScene);
        this.txtFldScene.text = 'Scene: Forward';
        dataProvider.playerStats.oxigen -= 10;

        // Dice回し
        gsap.timeline()
            .set(this.txtFldScene, {alpha:0.1})
            .to(this.txtFldScene, {alpha:1, duration:0.5, ease:'linear', repeat:2})
            .call(()=>{
                let result = Math.round(Math.random()*2);
                switch(result){
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
            .call(()=>{
                this.updatePlayerStats();
            })
    }

    setSceneRest(){
        this.removeChild(this.currentScene);
        this.txtFldScene.text = 'Scene: Rest';
        this.currentScene = this.addChild(new SceneRest());
    }

    setSceneEncount(){
        this.removeChild(this.currentScene);
        this.txtFldScene.text = 'Scene: Encount';
        this.currentScene = this.addChild(new SceneEncount());
    }




    initDefaultDeck(){
        dataProvider.deck = [0,2,0,1,2,2,3,1,2,3];
    }

    updatePlayerStats(){
        this.txtFldPlayerStats.text = `HP: ${dataProvider.playerStats.hp} / Oxi: ${dataProvider.playerStats.oxigen}  - Cards: ${dataProvider.deck.length}`
    }

    initDebugAssets(){

        dataProvider.style.base = new PIXI.TextStyle({
            fontFamily: 'Teko', fontSize: 100, fontWeight: 500, fill:0xFFFFFF,
        });

        dataProvider.style.jp = new PIXI.TextStyle({
            fontFamily: 'Teko', fontSize: 50, fontWeight:500, fill:0xFFFFFF,
        });

        this.txtFldScene = this.addChild(new PIXI.Text('Scene: ', Utils.cloneTextStyle(dataProvider.style.base, {fontSize:90})));
        this.txtFldScene.anchor.set(0.5);
        this.txtFldScene.x = window.innerWidth / 2;
        this.txtFldScene.y = 100;
        //
        this.txtFldPlayerStats = this.addChild(new PIXI.Text('PlayerStats:', Utils.cloneTextStyle(dataProvider.style.base, {fontSize:50})));
        this.txtFldPlayerStats.anchor.set(0.5);
        this.txtFldPlayerStats.x = window.innerWidth / 2;
        this.txtFldPlayerStats.y = 200;
    }
}