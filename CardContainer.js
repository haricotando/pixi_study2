import AlignHelper from './helper/AlignHelper.js';
import Utils from './helper/Utils.js';
import { dataProvider } from './dataProvider.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import { ApplicationRoot } from './ApplicationRoot.js';
import Easing from './helper/Easing.js';
import { Card } from './Card.js';

export class CardContainer extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();
        this.initDebugAssets();
        this.selectedCard = null;

        this.initDeck();
    }

    cardSelectHanadler(index, cardId){
        console.log('cardSelectHanadler');
        if(this.selectedCard != null){
            this.removeChild(this.selectedCard);
        }
        this.selectedCard = this.addChild(new Card(index, cardId));
        Utils.pivotCenter(this.selectedCard);
        this.selectedCard.x = dataProvider.wWidth / 2;
        this.selectedCard.y = 700;

        this.selectedCard.interactive = true;
        this.selectedCard.on('touchstart', (event) => {
            this.playCard(index, cardId)
        });
    }

    playCard(index, cardId){
        this.parent.playCard(cardId);
        dataProvider.deck.splice(index, 1);
        this.removeChild(this.selectedCard);
        this.reDeck();

    }

    reDeck(){
        this.removeChild(this.cardHolder);
        this.initDeck();
    }

    initDeck(){
        // this.txtFldB.text = dataProvider.deck;

        let posX = 0;
        let posXCount = 0;
        let posY= 0;

        this.cardHolder = this.addChild(new PIXI.Container());
        this.cardHolder.y = 900;
        for(let i=0; i<dataProvider.deck.length; i++){
            let card  = this.cardHolder.addChild(new Card(i, dataProvider.deck[i]));
            card.x = posX;
            card.y = posY;
            posX += (dataProvider.cardGeometries.baseWidth + 10);
            posXCount ++;
            if(posXCount > 5){
                posX = 0;
                posXCount = 0;
                posY += dataProvider.cardGeometries.baseWidth * dataProvider.cardGeometries.ratio + 10;
            }

            card.interactive = true;
            card.on('touchstart', (event) => {
                this.cardSelectHanadler(i, dataProvider.deck[i]);
            });
        }
    }

    initDebugAssets(){
        // this.txtFldB = this.addChild(new PIXI.Text('Game logic', Utils.cloneTextStyle(dataProvider.style.base, {fontSize:50})));
        // this.txtFldB.anchor.set(0.5);
        // this.txtFldB.x = window.innerWidth / 2;
        // this.txtFldB.y = 250;
    }
}