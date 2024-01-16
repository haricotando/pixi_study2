import AlignHelper from './helper/AlignHelper.js';
import Utils from './helper/Utils.js';
import { dataProvider } from './dataProvider.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import ExMath from './helper/ExMath.js';
import { ApplicationRoot } from './ApplicationRoot.js';
import { Card } from './Card.js';
import Easing from './helper/Easing.js';

export class SwipeContainer2 extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();
        this.highestZ = 100;
        this.numOfCards = 20;
        this.cardSpacing = 0;
        this.cardBaseWidth = 196;
        this.cardHolderWidth = 0;
        this.cardList = [];
        this.windowCenter = window.innerWidth / 2;
        
        this.shadow = {
            minX:0,
            maxX:100 * this.numOfCards,
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
        for(let i=0; i<this.numOfCards; i++){
            let card = this.cardHolder.addChild(new Card(i));
            const obj = {card:card, index:i}
            card.x = i * this.cardBaseWidth + this.cardBaseWidth/2;
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
        this.textFldA.style.fontSize = 60;
        this.textFldA.style.align = 'center';
        this.textFldA.text = `cardHolderWidth:${this.cardHolderWidth}\nwindow.innerWidth: ${window.innerWidth}\nx:${holderX}`
        this.textFldB.text = `shadow c: ${this.shadow.current} / d: ${this.shadow.maxX}`;
        // this.textFldC.text = `${holderX + this.cardBaseWidth*3}`;
        // this.textFldD.text = `shadow.holderRight = ${this.shadow.holderRight}`
        this.textFldC.text = this.cardHolder.x;
        
        this.syncCards();
    }

    onTouchEnd(event){
    }



    syncCards(){

        const cardMaxScale = 1.3;
        const cardMaxYOffset = 120;
        let highestCard = undefined;
        let highestVal = 0;
        for (let i = 0; i < this.cardList.length; i++) {
            const card = this.cardList[i].card;

            // scale calc
            const localX = this.cardHolder.x + (this.cardBaseWidth * i) + this.cardBaseWidth /2;
            const localXByCenter = ExMath.symmetricDecay(this.windowCenter, localX);
            const localXShift = localX - this.windowCenter
            // const localXShift = ExMath.symmetricDecayX(this.windowCenter, localX);

            const scaleBuffer = Easing.easeOutCubic(localXByCenter, 1, cardMaxScale-1, this.windowCenter);
            const yBuffer = Easing.easeOutCubic(localXByCenter, 0, cardMaxYOffset, this.windowCenter);


            card.y = 0-yBuffer;
            card.scale.set(scaleBuffer);
            card.rotation = localXShift/40 * PIXI.DEG_TO_RAD;

            card.label2.text= `${Math.round(localXShift)}`;
            card.label3.text= `${localXByCenter}`;

            if(localXByCenter > highestVal){
                highestCard = card;
                highestVal = localXByCenter;
            }
            
          }
          this.highestZ ++;
          highestCard.zIndex = this.highestZ;
          this.cardHolder.sortChildren();
        
    }

    initDebugElement(){
        this.bg = GraphicsHelper.exDrawRect(0, 0, window.innerWidth, window.innerHeight, true, true);
        this.addChild(this.bg);

        this.textFldA = this.addChild(new PIXI.Text(`shadow min: ${this.shadow.minX} - max: ${this.shadow.maxX}`, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:80})));
        this.textFldA.anchor.set(0.5);
        AlignHelper.xCenterWindow(this.textFldA);
        this.textFldA.y = 350;

        this.textFldB = this.addChild(new PIXI.Text('', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:70})));
        this.textFldB.anchor.set(0.5);
        AlignHelper.xCenterWindow(this.textFldB);
        this.textFldB.y = 500;

        this.textFldC = this.addChild(new PIXI.Text('', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:70})));
        this.textFldC.anchor.set(0.5);
        AlignHelper.xCenterWindow(this.textFldC);
        this.textFldC.y = 650;

        this.textFldD = this.addChild(new PIXI.Text('', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:70})));
        this.textFldD.anchor.set(0.5);
        AlignHelper.xCenterWindow(this.textFldD);
        this.textFldD.y = 800;

        this.textFldE = this.addChild(new PIXI.Text('', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:70})));
        this.textFldE.anchor.set(0.5);
        AlignHelper.xCenterWindow(this.textFldE);
        this.textFldE.y = 950;

        this.shadowBox = this.addChild(GraphicsHelper.exDrawRect(0, 0, 100, 100, 40, {color:0xFF0000}));
        Utils.pivotCenter(this.shadowBox);
        this.shadowBox.y = 600;
    }

}