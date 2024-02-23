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

        const card = dataProvider.cards[cardId];

        const cardWitdh = dataProvider.cardGeometries.baseWidth;
        let cardHeight = Math.round(cardWitdh * dataProvider.cardGeometries.ratio);
        this.background = this.addChild(GraphicsHelper.exDrawRect(0, 0, cardWitdh, cardHeight, false, {color:0xFFFFFF}));

        this.label = this.addChild(new PIXI.Text(card.name, Utils.cloneTextStyle(dataProvider.style.base, {fill:dataProvider.color.dark1, align:'center', fontWeight:500, fontSize:40})));
        this.label.anchor.set(0.5);
        this.label.x = cardWitdh / 2;
        this.label.y = 40;

        this.labelVal = this.addChild(new PIXI.Text('--', Utils.cloneTextStyle(dataProvider.style.base, {fill:dataProvider.color.dark1, align:'center', fontWeight:500, fontSize:80})));
        this.labelVal.anchor.set(0.5);
        this.labelVal.x = cardWitdh / 2;
        this.labelVal.y = 100;
        
        this.labelText = this.addChild(new PIXI.Text('', Utils.cloneTextStyle(dataProvider.style.base, {fill:dataProvider.color.dark1, align:'center', fontWeight:300, fontSize:40})));
        this.labelText.anchor.set(0.5);
        this.labelText.x = cardWitdh / 2;
        this.labelText.y = 170;

        switch(card.type){
            case 'attack':
                this.labelVal.text = card.attack;
                break;
            case 'defence':
                this.labelVal.text = card.defence;
                break;
            case 'counter':
                this.labelVal.text = card.attack;
                let dodgeVal = card.probability * 100;
                this.labelText.text = `Dodge: ${dodgeVal}%`;
                break;
            case 'bash':
                this.labelVal.text = card.attack;
                let bashVal = card.probability * 100;
                this.labelText.text = `Dodge: ${bashVal}%`;
                break;
        }
    }
}