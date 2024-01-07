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

        this.shadow = {
            tapStartX:0,
            tapEndX:0,
            destX:0,
            currentX:0,
        };

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
    }

    initSwipeEvents(){
        this.bg.on('pointerdown', this.onTouchStart.bind(this));
        this.bg.on('pointermove', this.onTouchMove.bind(this));
        this.bg.on('pointerup', this.onTouchEnd.bind(this));
        this.bg.on('pointerupoutside', this.onTouchEnd.bind(this));

    }
    
    onTouchStart(event){
        this.shadow.tapStartX = event.data.global.x;
        this.shadow.tapEndX = null;
        this.shadow.currentX = event.data.global.x;
    }
    
    onTouchMove(event){
        this.shadow.destX = event.data.global.x;
    }

    onTickerHandler(){
        const decel = 0.2;
        let diff = Math.round(((this.shadow.destX - this.shadow.currentX)*decel)*10)/10;
        this.shadow.currentX = this.shadow.currentX + diff;

        this.textFldA.text = `tapStart: ${this.shadow.tapStartX} / tapEnd: ${this.shadow.tapEndX}`;
        this.textFldB.text = `destX: ${this.shadow.destX}`;
        this.textFldC.text = `diff: ${diff}`;
        this.card.x = this.shadow.currentX;
    }

    onTouchEnd(event){
        this.shadow.tapEndX = event.data.global.x;
    }
}