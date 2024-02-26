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
        dataProvider.display.updateHP(gsap.timeline())
        dataProvider.display.updateFood(gsap.timeline())
        this.initSelector();
    }

    initMessage(){
        let message = this.addChild(new PIXI.Text('Rest.. HP 50% / food-1', Utils.cloneTextStyle(dataProvider.style.jp, {fontSize:40})));
        message.anchor.set(0.5);
        message.x = dataProvider.wWidth / 2;
        message.y = 400;
    }

    initSelector(){

        let btnForward = this.addButton('Foward..');
        btnForward.y = 500;

        btnForward.on('touchstart', (event) => {
            this.parent.setSceneForward();
        });
    }
    
    addButton(arg){
        let margin = 300;
        let button = this.addChild(new PIXI.Sprite());
        let rect = button.addChild(GraphicsHelper.exDrawRect(0, 0, dataProvider.wWidth - margin*2, 100, {color:0xFFFFFF}, {color:0x000000}))
        let label = button.addChild(new PIXI.Text(arg, Utils.cloneTextStyle(dataProvider.style.base, {fontSize: 50})));
        label.anchor.set(0, 0.5);
        label.x = 20;
        label.y = 50;
        button.x = margin;
        button.interactive = true;
        return button;
    }
}