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

        this.textFldD = this.addChild(new PIXI.Text(0, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:80})));
        this.textFldD.anchor.set(0.5);
        AlignHelper.xCenterWindow(this.textFldD);
        this.textFldD.y = 800;

        this.textFldE = this.addChild(new PIXI.Text(0, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:80})));
        this.textFldE.anchor.set(0.5);
        AlignHelper.xCenterWindow(this.textFldE);
        this.textFldE.y = 950;

        this.card = this.addChild(GraphicsHelper.exDrawRect(0, 0, 100, 150, 40, {color:0xFF0000}));
        Utils.pivotCenter(this.card);
        this.card.y = 1200;


        // ===== swipe ticker関連
        this.initSwipeEvents();
        const ticker = dataProvider.data.app.ticker;
        ticker.add((delta) => {
            this.onTickerHandler();
        });

        this.shadow = {
            minX:0,
            maxX:1000,
            tapStart:0,
            dest:0,
            current:0,
            last:0,
        };
    }

    initSwipeEvents(){
        this.bg.on('pointerdown', this.onTouchStart.bind(this));
        this.bg.on('pointermove', this.onTouchMove.bind(this));
        this.bg.on('pointerup', this.onTouchEnd.bind(this));
        this.bg.on('pointerupoutside', this.onTouchEnd.bind(this));

    }
    
    onTouchStart(event){
        this.shadow.tapStart = event.data.global.x;
        this.shadow.last = this.shadow.dest;
    }
    
    onTouchMove(event){
        const diff = event.data.global.x - this.shadow.tapStart;
        let tmp = this.shadow.last + diff;
        tmp = tmp < this.shadow.minX ? this.shadow.minX : tmp;
        tmp = tmp > this.shadow.maxX ? this.shadow.maxX : tmp;
        this.shadow.dest = tmp;
        
        this.textFldB.text = `diff: ${diff}`;
    }
    
    onTickerHandler(){
        const decel = 0.2;
        let diff = (this.shadow.dest - this.shadow.current) * decel;
        
        if(Math.abs(this.shadow.current - this.shadow.dest) < 1){
            this.shadow.current = this.shadow.dest;
        }else{
            this.shadow.current = Math.round((this.shadow.current + diff)*10)/10;
        }

        this.card.x = this.shadow.current;
        
        this.textFldA.text = `tapStart: ${this.shadow.tapStart}`;
        this.textFldC.text = `dest: ${this.shadow.dest} / current: ${this.shadow.current}`;
    }

    onTouchEnd(event){
    }
}