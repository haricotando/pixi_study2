import AlignHelper from './helper/AlignHelper.js';
import Utils from './helper/Utils.js';
import { dataProvider } from './dataProvider.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import { Card } from './Card.js';
import Easing from './helper/Easing.js';

export class SwipeContainer4 extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();
        
        this.cardList = [];

        this.bg = GraphicsHelper.exDrawRect(0, 0, window.innerWidth, window.innerHeight, false, {color:dataProvider.color.light1});
        this.bg.x = 0-window.innerWidth/2;
        this.addChild(this.bg);

        this.initDeck();
        this.highestZ = 100;

        this.cardSpacing = 0;
        this.cardHolderWidth = 0;
        this.windowCenter = dataProvider.wWidth / 2;
        
        this.shadow = {
            minX:0,
            maxX:100 * dataProvider.deck.length,
            tapStart:0,
            dest:0,
            snapDest:0,
            current:0,
            last:0,
            holderLeft:0,
            holderRight:0,
        };

        
        this.initDebugElement();
        
        // this.cardHolder.sortableChildren = true;
        
        this.x = this.windowCenter;
        // let cardHeight = dataProvider.cardGeometries.baseWidth * dataProvider.cardGeometries.ratio;
        // this.textFldD.text = `${dataProvider.wHeight} / ${cardHeight}`;
        // this.cardHolder.y = dataProvider.wHeight - (cardHeight/1.3);
        // for(let i=0; i<dataProvider.deck.length; i++){
        //     let card = this.cardHolder.addChild(new Card(i, dataProvider.deck[i]));
        //     const obj = {card:card, index:i}
        //     card.x = i * dataProvider.cardGeometries.baseWidth + dataProvider.cardGeometries.baseWidth/2 + (i * this.cardSpacing);
        //     this.cardList.push(obj)
        // }
        // this.cardHolderWidth = (this.cardList.length-1) * (dataProvider.cardGeometries.baseWidth + this.cardSpacing);
        // this.shadow.holderRight = 0 - this.cardHolderWidth;

        this.snappedTickerSymbol = this.addChild(GraphicsHelper.exDrawRect(0,0,100,100,{width:1, color:0x00FFFF}, {color:0x333333}))
        this.snappedTickerSymbol.y = dataProvider.wHeight - 600;
        Utils.pivotCenter(this.snappedTickerSymbol);
        this.tickerSymbol = this.addChild(GraphicsHelper.exDrawRect(0,0,100,100,{width:1, color:0x00FFFF}, {color:0x333333}))
        this.tickerSymbol.y = dataProvider.wHeight - 500;
        Utils.pivotCenter(this.tickerSymbol);

        // // ===== swipe ticker関連
        this.initSwipeEvents();
        const ticker = dataProvider.data.app.ticker;
        ticker.add((delta) => {
            this.onTickerHandler();
        });
    }

    initDeck(){
        this.deck = this.addChild(new PIXI.Container());
        this.deck.y = dataProvider.wHeight - 350;
        dataProvider.deck = [0,0,0,1,2,2,3];
        for(let i=0; i<dataProvider.deck.length; i++){
            let card = this.deck.addChild(new Card(i, dataProvider.deck[i]));
            const obj = {card:card, index:i}
            // このxに意味はない
            card.x = dataProvider.cardGeometries.baseWidth * i;
            card.y = (i*50);
            // card.x = 100;
            // card.x = i * dataProvider.cardGeometries.baseWidth + dataProvider.cardGeometries.baseWidth/2 + (i * this.cardSpacing);
            // card.x = i * dataProvider.cardGeometries.baseWidth + dataProvider.cardGeometries.baseWidth/2 + (i * this.cardSpacing);
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
    }
    
    onTouchMove(event){
        const diff = event.data.global.x - this.shadow.tapStart;
        let tmp = this.shadow.last - diff;
        tmp = tmp < this.shadow.minX ? this.shadow.minX : tmp;
        tmp = tmp > this.shadow.maxX ? this.shadow.maxX : tmp;
        this.shadow.dest = tmp;
    }
    
    onTickerHandler(){
        // 慣性不要な場合は0へ
        const decel = 0.2;
        let diff = (this.shadow.dest - this.shadow.current) * decel;
        if(Math.abs(this.shadow.current - this.shadow.dest) < 1){
            this.shadow.current = this.shadow.dest;
        }else{
            this.shadow.current = Math.round((this.shadow.current + diff)*10)/10;
        }

        /*
            1. 比率ベース軸で計算しているのか（＋になる）
            2. 可視化の実スケールで計算しているのか（ーになる）
            2の後に1をやらない！

            どちらをやってるか注意する
        */


        // 2 可視化
        let holderX = Math.round(this.shadow.current / this.shadow.maxX * (0-dataProvider.wWidth/2));
        this.tickerSymbol.x = holderX;


        // 1 スナップ
        const snapGrid = Math.round(this.shadow.current / this.shadow.maxX * dataProvider.deck.length) * this.shadow.maxX / dataProvider.deck.length;
        // 最後の-1が気持ちわるい
        const snapById = Math.round(this.shadow.current / this.shadow.maxX * (dataProvider.deck.length - 1));
        // 2 Tickerをスナップで可視化
        this.snappedTickerSymbol.x = Math.round(snapGrid / this.shadow.maxX * (0-dataProvider.wWidth/2));

        // 2 1グリッド分のサイズ
        const gridPerSnap = dataProvider.wWidth * 2 / dataProvider.deck.length;

        this.textFldD.text = `Grid:${snapGrid}`;
        this.textFldE.text = `ById:${snapById}`;



        // this.snappedTickerSymbol.x = snapGrid;
        
        
        // this.cardHolder.x = holderX - dataProvider.cardGeometries.baseWidth / 2;
        
        // debug
        // this.textFldA.style.fontSize = 60;
        this.textFldA.style.align = 'center';
        this.textFldA.text = `cards:${dataProvider.deck.length}`
        this.textFldB.text = `shadow c: ${this.shadow.current} / d: ${this.shadow.maxX}`;
        this.textFldC.text = `holderX:${holderX}`;
        
        for (let i = 0; i < this.cardList.length; i++) {
            const card = this.cardList[i].card;
            let max = i * gridPerSnap;
            let current = 0 - (snapById - i) * gridPerSnap;
            card.x = current;
            card.label3.text = `min: ${0-(dataProvider.deck.length-1) * gridPerSnap}`;
            card.label4.text = `Max: ${max}`;
            card.label5.text = `Cu: ${current}`;

        }


        // this.syncCards();
    }

    onTouchEnd(event){
    }



    syncCards(){

  
    }

    initDebugElement(){


        this.textFldA = this.addChild(new PIXI.Text(`shadow min: ${this.shadow.minX} - max: ${this.shadow.maxX}`, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:50})));
        this.textFldA.anchor.set(0.5);
        // AlignHelper.xCenterWindow(this.textFldA);
        this.textFldA.y = 350;

        this.textFldB = this.addChild(new PIXI.Text('', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:50})));
        this.textFldB.anchor.set(0.5);
        // AlignHelper.xCenterWindow(this.textFldB);
        this.textFldB.y = 500;

        this.textFldC = this.addChild(new PIXI.Text('', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:50})));
        this.textFldC.anchor.set(0.5);
        // AlignHelper.xCenterWindow(this.textFldC);
        this.textFldC.y = 650;

        this.textFldD = this.addChild(new PIXI.Text('', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:50})));
        this.textFldD.anchor.set(0.5);
        // AlignHelper.xCenterWindow(this.textFldD);
        this.textFldD.y = 800;

        this.textFldE = this.addChild(new PIXI.Text('', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:50})));
        this.textFldE.anchor.set(0.5);
        // AlignHelper.xCenterWindow(this.textFldE);
        this.textFldE.y = 950;

    }

}