import AlignHelper from './helper/AlignHelper.js';
import Utils from './helper/Utils.js';
import { dataProvider } from './dataProvider.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import { Card } from './Card.js';
import Easing from './helper/Easing.js';

export class SwipeContainer5 extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();
        
        this.cardList = [];
        this.highestZ = 100;
        this.cardSpacing = 0;
        this.cardHolderWidth = 0;
        this.windowCenter = dataProvider.wWidth / 2;
        this.x = this.windowCenter;

        this.bg = GraphicsHelper.exDrawRect(0, 0, window.innerWidth, window.innerHeight, false, {color:dataProvider.color.light1});
        this.bg.x = 0-window.innerWidth/2;
        this.addChild(this.bg);

        this.initDeck();
        
        this.shadow = {
            minX:0,
            maxX:200 * dataProvider.deck.length,
            tapStart:0,
            dest:0,
            current:0,
            last:0,
        };

        this.initDebugElement();
        
        // // ===== swipe ticker関連
        this.initSwipeEvents();
        const ticker = dataProvider.data.app.ticker;
        ticker.add((delta) => {
            this.onTickerHandler();
        });
    }

    initDeck(){
        this.deck = this.addChild(new PIXI.Container());
        this.deck.y = dataProvider.wHeight - 250;
        dataProvider.deck = [0,0,0,1,2,2,3];
        for(let i=0; i<dataProvider.deck.length; i++){
            let card = this.deck.addChild(new Card(i, dataProvider.deck[i]));
            const obj = {card:card, index:i}
            // このxに意味はない
            card.x = dataProvider.cardGeometries.baseWidth * i;
            // card.y = (i*50);
            this.cardList.push(obj);
        }
    }
    
    // card.rotation = i * 10 * PIXI.DEG_TO_RAD

    initSwipeEvents(){
        this.bg.interactive = true;
        this.bg.on('pointerdown', this.onTouchStart.bind(this));
        this.bg.on('pointermove', this.onTouchMove.bind(this));
        this.bg.on('pointerup', this.onTouchEnd.bind(this));
        this.bg.on('pointerupoutside', this.onTouchEnd.bind(this));
    }
    
    onTouchStart(event){
        this.shadow.tapStart = event.data.global.x;
        this.shadow.last = this.shadow.dest;
        this.tickerSymbol.tint = 0xFFFF00;
    }
    
    onTouchMove(event){
        const diff = event.data.global.x - this.shadow.tapStart;
        let tmp = this.shadow.last - diff;
        tmp = tmp < this.shadow.minX ? this.shadow.minX : tmp;
        tmp = tmp > this.shadow.maxX ? this.shadow.maxX : tmp;
        this.shadow.dest = tmp;
    }
    
    onTickerHandler(){
        // 慣性不要な場合は1へ
        const decel = 0.2;
        let diff = (this.shadow.dest - this.shadow.current) * decel;
        if(Math.abs(this.shadow.current - this.shadow.dest) < 1){
            this.shadow.current = this.shadow.dest;
        }else{
            this.shadow.current = Math.round((this.shadow.current + diff)*10)/10;
        }

        this.textFldA.text = `${this.shadow.minX} / ${this.shadow.current} / ${this.shadow.maxX}`;

        /*
            1. 比率ベース軸で計算しているのか（＋になる）
            2. 可視化の実スケールで計算しているのか（ーになる）
            1で計算した内容を可視化するスケールに落とす、2の後に1をやらない
            どちらをやってるか注意する
        */

        /*
            2. debug用Tickerの可視化
        */
        let tickerX = Math.round(this.shadow.current / this.shadow.maxX * (0-dataProvider.wWidth/2));
        this.tickerSymbol.x = tickerX;

        /* 
            1. ベースとなるスナップ数（０〜 length-1 になるはず）
            可視化時は　対象の移動可能範囲 min / max * これ になる
        */
        const numOfSnaps = dataProvider.deck.length-1;
        const currentSnapId = Math.round(this.shadow.current / this.shadow.maxX * numOfSnaps);
        // 2. カードのスライド可能幅（可視化）
        // const cardMaxRange = numOfSnaps * 50;
        const cardMaxRange = numOfSnaps * dataProvider.cardGeometries.baseWidth;
        
        this.textFldC.text = `SnapId: ${currentSnapId} / ${numOfSnaps}`;

        for (let i = 0; i < this.cardList.length; i++) {
            const card = this.cardList[i].card;
            // 2
            const cardXMin = i * dataProvider.cardGeometries.baseWidth;
            const cardXMax = i * dataProvider.cardGeometries.baseWidth + cardMaxRange;
            const cardCurrent = 0 - Math.round(this.shadow.current / this.shadow.maxX * cardMaxRange) + cardXMin;
            card.x = cardCurrent;

            
            // ease
            const easedCardCurrent = Math.round(Easing.easeInOutSine(this.shadow.current, cardXMin, cardXMax, this.shadow.maxX));
            



            card.label3.text = `${cardXMin} / ${cardXMax}`;
            card.label4.text = `${cardCurrent}`;
            card.label5.text = `${easedCardCurrent}`;
        }
    }

    onTouchEnd(event){
        this.tickerSymbol.tint = 0x333333;
    }

    syncCards(){
    }

    initDebugElement(){


        this.textFldA = this.addChild(new PIXI.Text('A', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:50})));
        this.textFldA.anchor.set(0.5);
        this.textFldA.y = 200;

        this.textFldB = this.addChild(new PIXI.Text('B', Utils.cloneTextStyle(this.textFldA.style)));
        this.textFldB.anchor.set(0.5);
        this.textFldB.y = 300;

        this.textFldC = this.addChild(new PIXI.Text('C', Utils.cloneTextStyle(this.textFldA.style)));
        this.textFldC.anchor.set(0.5);
        this.textFldC.y = 400;

        this.textFldD = this.addChild(new PIXI.Text('D', Utils.cloneTextStyle(this.textFldA.style)));
        this.textFldD.anchor.set(0.5);
        this.textFldD.y = 500;

        this.textFldE = this.addChild(new PIXI.Text('E', Utils.cloneTextStyle(this.textFldA.style)));
        this.textFldE.anchor.set(0.5);
        this.textFldE.y = 600;

        this.tickerSymbol = this.addChild(GraphicsHelper.exDrawRect(0,0,100,100, false, {color:0xFFFFFF}))
        this.tickerSymbol.tint = 0x333333;
        this.tickerSymbol.y = dataProvider.wHeight - 500;
        Utils.pivotCenter(this.tickerSymbol);

    }

}