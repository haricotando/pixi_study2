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

        this.label = this.addChild(new PIXI.Text(index, Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:80})));
        this.label.anchor.set(0.5);

    }

    suicide(){
    }
}