import AlignHelper from './helper/AlignHelper.js';
import Utils from './helper/Utils.js';
import { dataProvider } from './dataProvider.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import { ApplicationRoot } from './ApplicationRoot.js';

export class SwipeContainer extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();



        this.bg = GraphicsHelper.exDrawRect(0, 0, window.innerWidth, window.innerHeight, true, true);
        this.addChild(this.bg);
        this.bg.buttonMode = true;
        this.bg.interactive = true;

        this.textFldA = this.addChild(new PIXI.Text(0, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:80})));
        this.textFldA.anchor.set(0.5);
        AlignHelper.xCenterWindow(this.textFldA);
        this.textFldA.y = 350;

        this.textFldB = this.addChild(new PIXI.Text(0, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:80})));
        this.textFldB.anchor.set(0.5);
        AlignHelper.xCenterWindow(this.textFldB);
        this.textFldB.y = 500;

        this.textFldC = this.addChild(new PIXI.Text(0, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:80})));
        this.textFldC.anchor.set(0.5);
        AlignHelper.xCenterWindow(this.textFldC);
        this.textFldC.y = 650;

        this.card = this.addChild(GraphicsHelper.exDrawRect(0, 0, 100, 150, 40, {color:0xFF0000}));
        Utils.pivotCenter(this.card);
        this.card.y = 1200;


        // ===== swipe ticker関連
        this.initSwipeEvents();
        const ticker = dataProvider.data.app.ticker;
        ticker.add((delta) => {
            this.onTickerHandler();
        });

        this.swipe = {
            tapStart:0,
            tapCurrent:0,
            diff:0,
            lastShadow:0,
            shadowDest:0,
            shadowCurrent:0,

        };
    }

    initSwipeEvents(){
        this.bg.on('pointerdown', this.onTouchStart.bind(this));
        this.bg.on('pointermove', this.onTouchMove.bind(this));
        this.bg.on('pointerup', this.onTouchEnd.bind(this));
        this.bg.on('pointerupoutside', this.onTouchEnd.bind(this));

    }
    
    onTouchStart(event){
        this.swipe.tapStart = event.data.global.x;
        this.swipe.lastShadow = this.swipe.shadowDest;
    }
    
    onTouchMove(event){
        this.swipe.tapCurrent = event.data.global.x;
        this.swipe.diff = this.swipe.tapCurrent - this.swipe.tapStart;
        this.swipe.shadowDest = this.swipe.lastShadow + this.swipe.diff;

    }

    onTickerHandler(){

        this.swipe.shadowCurrent = this.swipe.shadowDest;
        this.card.x = this.swipe.shadowCurrent;
        this.textFldA.text = `tapStart: ${this.swipe.tapStart} / current: ${this.swipe.tapCurrent}`;
        this.textFldB.text = `diff: ${this.swipe.diff}`;
        this.textFldC.text = `dest: ${this.swipe.shadowDest}`;
    }

    onTouchEnd(event){
    }
}