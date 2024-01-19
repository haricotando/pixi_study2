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
        this.card = this.addChild(GraphicsHelper.exDrawRoundedRect(0, 0, cardWitdh, cardHeight, 20, {color:0x333333}, {color:dataProvider.color.light1}));
        Utils.pivotCenter(this.card);
        
        let lim = this.addChild(GraphicsHelper.exDrawRoundedRect(0, 0, cardWitdh-30, cardHeight-30, 10, {color:dataProvider.color.dark2, width:5}));
        Utils.pivotCenter(lim);
        
        let bottomBG = this.addChild(GraphicsHelper.exDrawRoundedRect(0, 135, cardWitdh-30, cardHeight/3, 10, {color:dataProvider.color.dark2, width:5}, {color:dataProvider.color.dark2}));
        Utils.pivotCenter(bottomBG);



        this.label = this.addChild(new PIXI.Text('Dreadnote', Utils.cloneTextStyle(dataProvider.baseStyle, {fill:dataProvider.color.light1, align:'center', fontSize:35})));
        this.label.anchor.set(0.5);
        this.label.y = 90;
        
        this.labelx = this.addChild(new PIXI.Text('このターン\nゴニョゴニョする\n', Utils.cloneTextStyle(dataProvider.style.jp, {fill:dataProvider.color.light1, align:'center', fontSize:22})));
        this.labelx.anchor.set(0.5);
        this.labelx.y = 160;




        
        // this.label2 = this.addChild(new PIXI.Text('日本語入力', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:30})));
        // this.label2.anchor.set(0.5);
        // this.label2.y = -30;
        // this.label3 = this.addChild(new PIXI.Text('00000', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:30})));
        // this.label3.anchor.set(0.5);
        // this.label3.y = 25;
        // this.label4 = this.addChild(new PIXI.Text('00000', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:30})));
        // this.label4.anchor.set(0.5);
        // this.label4.y = 0;
    }

    suicide(){
    }
}