import AlignHelper from './helper/AlignHelper.js';
import Utils from './helper/Utils.js';
import { dataProvider } from './dataProvider.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import { ApplicationRoot } from './ApplicationRoot.js';
import Easing from './helper/Easing.js';

export class Card extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor(index, cardId) {
        super();

        const cardWitdh = dataProvider.cardGeometries.baseWidth;
        let cardHeight = Math.round(cardWitdh * dataProvider.cardGeometries.ratio);
        this.background = this.addChild(GraphicsHelper.exDrawRect(0, 0, cardWitdh, cardHeight, false, {color:0xFFFFFF}));

        this.label = this.addChild(new PIXI.Text(dataProvider.cards[cardId].name, Utils.cloneTextStyle(dataProvider.style.base, {fill:dataProvider.color.dark1, align:'center', fontSize:35})));
        this.label.anchor.set(0.5);
        this.label.x = cardWitdh / 2;
        this.label.y = 40;
        
        this.labelCost = this.addChild(new PIXI.Text('cost: ' + dataProvider.cards[cardId].cost, Utils.cloneTextStyle(dataProvider.style.base, {fill:dataProvider.color.dark1, align:'center', fontSize:35})));
        this.labelCost.anchor.set(0.5);
        this.labelCost.x = cardWitdh / 2;
        this.labelCost.y = 100;
        
        this.labelMessage = this.addChild(new PIXI.Text('', Utils.cloneTextStyle(dataProvider.style.base, {fill:dataProvider.color.dark1, align:'center', fontSize:35})));
        let messageVal = dataProvider.cards[cardId].attack ? `at: ${dataProvider.cards[cardId].attack}` : '';
        let def = dataProvider.cards[cardId].defence ? `df: ${dataProvider.cards[cardId].defence}` : '';
        this.labelMessage.anchor.set(0.5);
        this.labelMessage.x = cardWitdh / 2;
        this.labelMessage.text = messageVal + def;
        this.labelMessage.y = 150;

        // this.initEvents();
    }

    // initEvents(){
    //     this.interactive = true;
    //     this.on('touchstart', (event) => {
    //         this.clickHandler();
    //     });
    // }

    /* ------------------------------------------------------------
        KeyPadContainer / KeyPads
    ------------------------------------------------------------ */
    // clickHandler(event){
    //     console.log(this.parent.parent)
    //     this.parent.parent.cardSelectHanadler(index, cardId);
    // }
}