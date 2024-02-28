import AlignHelper from '../helper/AlignHelper.js';
import Dice from '../helper/Dice.js';
import Utils from '../helper/Utils.js';
import { dataProvider } from '../dataProvider.js';
import GraphicsHelper from '../helper/GraphicsHelper.js';
import { CardContainer } from '../CardContainer.js';
import { Card } from '../Card.js';

export class SceneSelectReward extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();

        this.cards = [];
        this.numOfMaxSelect = 0;
        if(dataProvider.playerStats.cardMax > dataProvider.deck.length){
           let diff = dataProvider.playerStats.cardMax - dataProvider.deck.length;
           diff = diff > 5 ? 5 : diff;
           this.numOfMaxSelect = diff;
        }
        this.rewardCards = [
            0, 0, 0,
            1, 1, 1, 
            2,
            3,
            4,
        ];

        this.initDeck();
        this.cardHolder.y = dataProvider.wHeight - this.cardHolder.height - 10;
        this.initDisplay();

        this.btnContinue = this.addButton('OK');
        this.btnContinue.y = 900;
        this.btnContinue.on('touchstart', (event) => {
            this.addRewardsToDeck();
        });
        if(this.numOfMaxSelect > 0){
            this.btnContinue.visible = false;
        }
    }

    initDeck(){
        // this.txtFldB.text = dataProvider.deck;

        let posX = 0;
        let posXCount = 0;
        let posY= 0;

        this.cardHolder = this.addChild(new PIXI.Container());
        // this.cardHolder.y = 900;
        for(let i=0; i<this.rewardCards.length; i++){
            let card  = this.cardHolder.addChild(new Card(i, this.rewardCards[i]));
            this.cards.push(card);
            card.x = posX;
            card.y = posY;
            posX += (dataProvider.cardGeometries.baseWidth + 10);
            posXCount ++;
            if(posXCount > this.numOfMaxSelect){
                posX = 0;
                posXCount = 0;
                posY += dataProvider.cardGeometries.baseWidth * dataProvider.cardGeometries.ratio + 10;
            }

            card.interactive = true;
            card.on('touchstart', (event) => {
                card.bSelected = card.bSelected ? false : true;
                card.alpha = card.bSelected ? 0.75 : 1;
                this.checkCount();
            });
        }
    }

    checkCount(){
        let numOfSelected = 0;
        for(let i=0; i<this.cards.length; i++){
            let card = this.cards[i];
            if(card.bSelected){
                numOfSelected ++;
            }
        }
        this.txtFldCounter.text = `Selected: ${numOfSelected} / ${this.numOfMaxSelect}`;
        this.btnContinue.visible = numOfSelected == this.numOfMaxSelect;
    }

    addRewardsToDeck(){
        for(let i=0; i<this.cards.length; i++){
            let card = this.cards[i];
            if(card.bSelected){
                dataProvider.deck.push(card.cardId);
            }
        }

        dataProvider.deck.sort();
        this.parent.setSceneNeutral();
    }

    /* ------------------------------------------------------------
        initDisplays
    ------------------------------------------------------------ */
    initDisplay(){
        let margin = 100;
        let frameWidth = dataProvider.wWidth - margin*2;
        this.displayContainer = this.addChild(new PIXI.Container());
        this.displayContainer.x = dataProvider.wWidth/2;
        this.frame = this.displayContainer.addChild(GraphicsHelper.exDrawRect(0, 0, frameWidth, 200, {color:0xFFFFFF, width:2}, false));
        Utils.pivotCenter(this.frame);
        this.displayContainer.y = 600;

        this.txtFldCounter = this.displayContainer.addChild(new PIXI.Text('Count: XX / XX', Utils.cloneTextStyle(dataProvider.style.base, {fontWeight:300, fontSize:55})));
        this.txtFldCounter.anchor.set(0.5);
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