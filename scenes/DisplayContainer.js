import AlignHelper from '../helper/AlignHelper.js';
import Utils from '../helper/Utils.js';
import { dataProvider } from '../dataProvider.js';
import GraphicsHelper from '../helper/GraphicsHelper.js';

export class DisplayContainer extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();

        this.initDisplay();
        this.txtFldHP.text = `HP: ${dataProvider.playerStats.hp}`
        this.txtFldFood.text = `Food: ${dataProvider.playerStats.food}`;
        this.updateDawn(gsap.timeline());
    }

    damage(tl, damage){
        tl
        .set(this.txtFldHP, {x:window.innerWidth / 2, y:190, delay:0.1})
        .to(this.txtFldHP, {x:window.innerWidth / 2 - 40, y:200, duration:0.1, ease:'back.out(4)'})
        .call(()=>{
            this.txtFldHP.text = `HP: ${dataProvider.playerStats.hp}`
            this.txtFldFood.text = `Food: ${dataProvider.playerStats.food}`;
        })
            .set(this, {x:100, y:100, duration:0.1, ease:'back.out(4)'})
            .to(this, {x:0, y:0, duration:0.1, ease:'back.out(4)'})

        let damageDrop = this.addChild(new PIXI.Text(damage, Utils.cloneTextStyle(dataProvider.style.base, {fontWeight:300, fontSize:70})));
        damageDrop.anchor.set(0.5);
        damageDrop.x = dataProvider.wWidth / 2 - 200;
        damageDrop.y = this.txtFldHP.y;
        damageDrop.alpha = 0;

        tl
        .set(damageDrop, {y:this.txtFldHP.y - 100, alpha:1})
        .to(damageDrop, {y:this.txtFldHP.y, duration:0.1, ease:'back.out(1.2)'})
        .to(damageDrop, {alpha:0.2, duration:0.1, onComplete: () => {
            this.removeChild(damageDrop);
            }})
    }

    updateHP(tl){
        tl
        .set(this.txtFldHP, {y:150, delay:0.1})
        .to(this.txtFldHP, {y:200, duration:0.1, ease:'back.out(4)'})
        .call(()=>{
            this.txtFldHP.text = `HP: ${dataProvider.playerStats.hp}`;
        })
    }

    updateFood(tl){
        tl
        .set(this.txtFldFood, {y:150, delay:0.1})
        .to(this.txtFldFood, {y:200, duration:0.1, ease:'back.out(4)'})
        .call(()=>{
            this.txtFldFood.text = `Food: ${dataProvider.playerStats.food}`;
        })
    }

    updateDawn(tl){
        this.txtFldGame.text = `${dataProvider.gameStats.untilDawn} actions until dawn..`;
        tl
        .set(this.txtFldGame, {alpha:0})
        .to(this.txtFldGame, {alpha:1, duration:0.1, ease:'steps(2)', repeat:2})
        .call(()=>{
            this.txtFldFood.text = `Food: ${dataProvider.playerStats.food}`;
        })
    }

    updateScene(arg){
        this.txtFldScene.text = `Scene: ${arg}`;
    }

    initDisplay() {
        dataProvider.style.base = new PIXI.TextStyle({
            fontFamily: 'Teko', fontSize: 100, fontWeight: 500, fill: 0xFFFFFF,
        });

        dataProvider.style.jp = new PIXI.TextStyle({
            fontFamily: 'Teko', fontSize: 50, fontWeight: 500, fill: 0xFFFFFF,
        });

        this.txtFldScene = this.addChild(new PIXI.Text('Scene: XXX', Utils.cloneTextStyle(dataProvider.style.base, { fontSize: 90 })));
        this.txtFldScene.anchor.set(0.5);
        this.txtFldScene.x = window.innerWidth / 2;
        this.txtFldScene.y = 100;

        //
        this.statsContainer = this.addChild(new PIXI.Container());

        this.txtFldHP = this.statsContainer.addChild(new PIXI.Text('HP: XXX', Utils.cloneTextStyle(dataProvider.style.base, { fontWeight:300, fontSize: 70 })));
        this.txtFldHP.anchor.set(1, 0.5);
        this.txtFldHP.x = window.innerWidth / 2 - 40;
        this.txtFldHP.y = 200;
        //
        this.txtFldStatsSlash = this.statsContainer.addChild(new PIXI.Text('/', Utils.cloneTextStyle(dataProvider.style.base, { fontWeight:300, fontSize: 70 })));
        this.txtFldStatsSlash.anchor.set(0.5);
        this.txtFldStatsSlash.x = window.innerWidth / 2;
        this.txtFldStatsSlash.y = 200;

        //
        this.txtFldFood = this.statsContainer.addChild(new PIXI.Text('Food: XXXXXXXXX', Utils.cloneTextStyle(dataProvider.style.base, { fontWeight:300, fontSize: 70 })));
        this.txtFldFood.anchor.set(0, 0.5);
        this.txtFldFood.x = window.innerWidth / 2 + 40;
        this.txtFldFood.y = 200;
        //
        this.txtFldRelic = this.addChild(new PIXI.Text('Relics: ', Utils.cloneTextStyle(dataProvider.style.base, { fontStyle:'italic', fontWeight: 300, fontSize: 50 })));
        this.txtFldRelic.anchor.set(0.5);
        this.txtFldRelic.x = window.innerWidth / 2;
        this.txtFldRelic.y = 280;
        //
        this.txtFldGame = this.addChild(new PIXI.Text('X actions until dawn..', Utils.cloneTextStyle(dataProvider.style.base, { fontWeight: 100, fontSize: 50 })));
        this.txtFldGame.anchor.set(0.5);
        this.txtFldGame.x = window.innerWidth / 2;
        this.txtFldGame.y = 350;
    }
}