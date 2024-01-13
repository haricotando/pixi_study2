import AlignHelper from './helper/AlignHelper.js';
import Utils from './helper/Utils.js';
import { dataProvider } from './dataProvider.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import { ApplicationRoot } from './ApplicationRoot.js';
import { Card } from './Card.js';
import Easing from './helper/Easing.js';

export class SwipeContainer extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();

        this.shadow = {
            minX:0,
            maxX:800,
            tapStart:0,
            dest:0,
            current:0,
            last:0,
            holderLeft:0,
            holderRight:0,
        };

        this.cardList = [];

        this.bg = GraphicsHelper.exDrawRect(0, 0, window.innerWidth, window.innerHeight, true, true);
        this.addChild(this.bg);
        this.bg.buttonMode = true;
        this.bg.interactive = true;

        this.textFldA = this.addChild(new PIXI.Text(`shadow min: ${this.shadow.minX} - max: ${this.shadow.maxX}`, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:80})));
        this.textFldA.anchor.set(0.5);
        AlignHelper.xCenterWindow(this.textFldA);
        this.textFldA.y = 350;

        this.textFldB = this.addChild(new PIXI.Text(0, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:80})));
        this.textFldB.anchor.set(0.5);
        AlignHelper.xCenterWindow(this.textFldB);
        this.textFldB.y = 500;

        this.shadowBox = this.addChild(GraphicsHelper.exDrawRect(0, 0, 100, 100, 40, {color:0xFF0000}));
        Utils.pivotCenter(this.shadowBox);
        this.shadowBox.y = 600;

        this.cardHolder = this.addChild(new PIXI.Container());
        this.cardHolder.y = 1500;
        for(let i=0; i<10; i++){
            let card = this.cardHolder.addChild(new Card(i));
            const obj = {card:card, index:i}
            card.x = i * 210 + 100;
            this.cardList.push(obj);
        }

        this.shadow.holderLeft = 0;
        this.shadow.holderRight = window.innerWidth - this.cardHolder.width;

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
        this.shadow.tapStart = event.data.global.x;
        this.shadow.last = this.shadow.dest;
    }
    
    onTouchMove(event){
        const diff = event.data.global.x - this.shadow.tapStart;
        let tmp = this.shadow.last - diff;
        tmp = tmp < this.shadow.minX ? this.shadow.minX : tmp;
        tmp = tmp > this.shadow.maxX ? this.shadow.maxX : tmp;
        this.shadow.dest = tmp;
    }
    
    onTickerHandler(){
        const decel = 0.2;
        let diff = (this.shadow.dest - this.shadow.current) * decel;
        
        if(Math.abs(this.shadow.current - this.shadow.dest) < 1){
            this.shadow.current = this.shadow.dest;
        }else{
            this.shadow.current = Math.round((this.shadow.current + diff)*10)/10;
        }
        // this.syncCards();

        const relX = (window.innerWidth - 800)/2  + this.shadow.current;
        this.shadowBox.x = relX;
        this.textFldA.text = `c: ${this.shadow.current} / d: ${this.shadow.maxX}`;
        let holderX = Math.round(this.shadow.current / this.shadow.maxX * this.shadow.holderRight);
        this.cardHolder.x = holderX;
        this.textFldB.text = `${holderX}`;
        
    }

    onTouchEnd(event){
    }

    syncCards(){
        const shadowGrid = this.shadow.maxX / this.cardList.length/2;
        
        for (let i = 0; i < this.cardList.length; i++) {
            const head = i * shadowGrid;
            const tail = (this.cardList.length - i) * shadowGrid;
            const tmpCurrent = this.shadow.current + head > this.shadow.maxX ? this.shadow.maxX : this.shadow.current + head;
            const tmpCurrentHalf = tmpCurrent > this.shadow.maxX/2 ? this.shadow.maxX - tmpCurrent : tmpCurrent;
            if(i == 0){

                // this.textFldD.text = `${tmpCurrentHalf}`;
            }
            
            
            const nextX = Easing.linear(tmpCurrent, 0, window.innerWidth, this.shadow.maxX+ tail);
            const nextY = Easing.linear(tmpCurrent, 0, 100, this.shadow.maxX+ tail);
            // const nextScale = Easing.easeInOutExpo(tmpCurrentHalf, 1, 1, (this.shadow.maxX+ tail)/2);

            const card = this.cardList[i].card;
            card.x = nextX;
            card.y = Math.abs(50-nextY);
            // card.scale.set(nextScale+0.5);
          }
        
    }

}