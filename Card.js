import { dataProvider } from './dataProvider.js';
import AlignHelper from './helper/AlignHelper.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import Utils from './helper/Utils.js';

export class Card extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor(index) {
        super();

        const cardWitdh = dataProvider.cardGeometries.baseWidth;
        let cardHeight = Math.round(cardWitdh * dataProvider.cardGeometries.ratio);
        
        // this.card = this.addChild(GraphicsHelper.exDrawRect(0, 0, 200, 300, true, {color:0x999999}));
        this.card = this.addChild(GraphicsHelper.exDrawRoundedRect(0, 0, cardWitdh, cardHeight, 20, false, {color:dataProvider.color.light1}));
        Utils.pivotCenter(this.card);
        
        
        let lim = this.addChild(GraphicsHelper.exDrawRoundedRect(0, 0, cardWitdh-30, cardHeight-30, 10, {color:dataProvider.color.dark2, width:5}));
        Utils.pivotCenter(lim);
        
        // this.label = this.addChild(new PIXI.Text(index, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:80})));
        // this.label.anchor.set(0.5);





        this.label = this.addChild(new PIXI.Text('CardLabel', Utils.cloneTextStyle(dataProvider.baseStyle, {align:'center', fontSize:35})));
        this.label.anchor.set(0.5);
        this.label.y = -100;
        this.label2 = this.addChild(new PIXI.Text('日本語入力', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:30})));
        this.label2.anchor.set(0.5);
        this.label2.y = -30;
        this.label3 = this.addChild(new PIXI.Text('00000', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:30})));
        this.label3.anchor.set(0.5);
        this.label3.y = 25;
        this.label4 = this.addChild(new PIXI.Text('00000', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:30})));
        this.label4.anchor.set(0.5);
        this.label4.y = 80;

        // const sprite = PIXI.Sprite.from( "cards/look.png" );
        // sprite.x = -70;
        // sprite.y = -144;
        // sprite.scale.set(0.7)
        // this.addChild(sprite);

    }

    suicide(){
    }
}