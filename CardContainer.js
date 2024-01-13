import AlignHelper from './helper/AlignHelper.js';
import Utils from './helper/Utils.js';
import { dataProvider } from './dataProvider.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import { ApplicationRoot } from './ApplicationRoot.js';
import { Card } from './Card.js';
import Easing from './helper/Easing.js';

export class CardContainer extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();
        
        this.cardSpacing = 0;
        this.cardBaseWidth = 200;
        this.cardHolderWidth = 0;
        this.cardList = [];
        
2
        this.shadow = {
            minX:0,
            maxX:2000,
            tapStart:0,
            dest:0,
            current:0,
            last:0,
            holderLeft:0,
            holderRight:0,
        };

        this.initDebugElement();

        this.cardHolder = this.addChild(new PIXI.Container());
        this.cardHolder.sortableChildren = true;
        this.cardHolder.addChild(GraphicsHelper.exDrawRect(0, -300, 100, 100, false, {color:0xFF00FF}));
        this.cardHolder.y = 1500;
        for(let i=0; i<20; i++){
            let card = this.cardHolder.addChild(new Card(i));
            const obj = {card:card, index:i}
            card.x = i * this.cardBaseWidth + this.cardBaseWidth/2;
            // card.x = i * this.cardBaseWidth + this.cardBaseWidth/2;
            this.cardList.push(obj)
        }
        this.cardHolderWidth = this.cardList.length * this.cardBaseWidth;

        
        this.shadow.holderLeft = 0;
        this.shadow.holderRight = window.innerWidth - this.cardHolderWidth;
        
        // ===== swipe ticker関連
        this.initSwipeEvents();
        const ticker = dataProvider.data.app.ticker;
        ticker.add((delta) => {
            this.onTickerHandler();
        });
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
        const decel = 0.2;
        let diff = (this.shadow.dest - this.shadow.current) * decel;
        
        if(Math.abs(this.shadow.current - this.shadow.dest) < 1){
            this.shadow.current = this.shadow.dest;
        }else{
            this.shadow.current = Math.round((this.shadow.current + diff)*10)/10;
        }
        let holderX = Math.round(this.shadow.current / this.shadow.maxX * this.shadow.holderRight);
        this.cardHolder.x = holderX;
        
        // debug
        this.textFldA.text = `c: ${this.shadow.current} / d: ${this.shadow.maxX}`;
        this.textFldB.text = `cardHolder.x: ${holderX}`;

        this.textFldC.style.fontSize = 60;
        this.textFldC.style.align = 'center';
        this.textFldC.text = `window.innerWidth: ${window.innerWidth}\ncardHolderWidth:${this.cardHolderWidth}`
        this.textFldD.text = `shadow.holderRight = ${this.shadow.holderRight}`
        this.syncCards();
    }

    onTouchEnd(event){
    }

    syncCards(){
        let highestCard = undefined;
        let highestVal = 0;
        for (let i = 0; i < this.cardList.length; i++) {
            const card = this.cardList[i].card;
            // scale calc
            // このキメ打ち400をちゃんと分解したい
            const distanceFromCenter = card.x - 400 + this.cardHolder.x - this.cardBaseWidth/2;
            let tmpAbs = Math.abs(distanceFromCenter);
            tmpAbs = 0 - (tmpAbs > 400 ? 400 : tmpAbs) + 400;
            const scaled = tmpAbs / 400 * 0.8 + 1;
            if(scaled > highestVal){
                highestCard = card;
                highestVal = scaled;
            }
            

            // posY calc
            let tmpAbsPosY = 0-(tmpAbs > 400 ? 400 : tmpAbs);
            card.y = Math.round(tmpAbsPosY * 0.4);

            // rotation calc
            card.rotation = distanceFromCenter / 50 * PIXI.DEG_TO_RAD;
            
            card.label2.text= `${Math.round(scaled * 100) / 100}`;

            card.scale.set(scaled);
            card.zIndex = i;
          }
          highestCard.zIndex = 100;
          this.cardHolder.sortChildren();
        //   this.z ++;
        
    }

    initDebugElement(){
        this.bg = GraphicsHelper.exDrawRect(0, 0, window.innerWidth, window.innerHeight, true, true);
        this.addChild(this.bg);

        this.textFldA = this.addChild(new PIXI.Text(`shadow min: ${this.shadow.minX} - max: ${this.shadow.maxX}`, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:80})));
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

        this.shadowBox = this.addChild(GraphicsHelper.exDrawRect(0, 0, 100, 100, 40, {color:0xFF0000}));
        Utils.pivotCenter(this.shadowBox);
        this.shadowBox.y = 600;
    }

}

/*
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
            */