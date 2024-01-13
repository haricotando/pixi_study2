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
        
        this.card = this.addChild(GraphicsHelper.exDrawRect(0, 0, 200, 300, true, {color:0x999999}));
        Utils.pivotCenter(this.card);

        // this.label = this.addChild(new PIXI.Text(index, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:80})));
        // this.label.anchor.set(0.5);





        this.label = this.addChild(new PIXI.Text(index, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:50})));
        this.label.anchor.set(0.5);
        this.label.y = -100;
        this.label2 = this.addChild(new PIXI.Text('00000', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:50})));
        this.label2.anchor.set(0.5);
        this.label3 = this.addChild(new PIXI.Text('00000', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:50})));
        this.label3.anchor.set(0.5);
        this.label3.y = 100;

    }

    suicide(){
    }
}