import AlignHelper from '../helper/AlignHelper.js';
import Utils from '../helper/Utils.js';
import { dataProvider } from '../dataProvider.js';
import GraphicsHelper from '../helper/GraphicsHelper.js';

export class SceneRest extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();


        dataProvider.playerStats.hp += Math.round(dataProvider.playerStats.maxHp / 5);
        dataProvider.playerStats.hp = dataProvider.playerStats.hp > dataProvider.playerStats.maxHp ? dataProvider.playerStats.maxHp : dataProvider.playerStats.hp;
        dataProvider.playerStats.food -= 1;

        this.initMessage();
        this.initSelector();

        this.parent.updatePlayerStats();

        // this.parent.updatePlayerStats.alhpa = 0.2;
        // gsap.timeline()
            // .set(this.parent.txtFldPlayerStats, {alpha:0})
            // .to(this.parent.txtFldPlayerStats, {alpha:1, duration:0.1, repeat:2})
    }

    initMessage(){
        let message = this.addChild(new PIXI.Text('Rest.. HP 50% / food-1', Utils.cloneTextStyle(dataProvider.style.jp, {fontSize:40})));
        message.anchor.set(0.5);
        message.x = dataProvider.wWidth / 2;
        message.y = 400;
    }

    initSelector(){
        let btn = this.addButton('Go');
        btn.x = 100;
        btn.y = 500;

        btn.on('touchstart', (event) => {
            this.parent.setSceneForward();
        });
        
        
    }
    
    addButton(arg){
        let button = this.addChild(new PIXI.Sprite());
        let rect = button.addChild(GraphicsHelper.exDrawRect(0, 0, 200, 100, {color:0xFFFFFF}, {color:0x000000}))
        let label = button.addChild(new PIXI.Text(arg, Utils.cloneTextStyle(dataProvider.style.jp)));
        label.x = 20;
        label.y = 20;
        
        button.interactive = true;
        return button;
    }
}