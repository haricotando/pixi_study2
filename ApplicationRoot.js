import { dataProvider } from './dataProvider.js';
import Utils from './helper/Utils.js';
import { SwipeContainer } from './SwipeContainer.js';


export class ApplicationRoot extends PIXI.Container {

    /* ============================================================
        constructor
    ============================================================ */
    constructor(appScreen) {
        super();


        dataProvider.baseStyle = new PIXI.TextStyle({
            fontFamily: 'Pangolin', fontSize: 100, fontWeight: 100,
        });

        this.init();
    }

    init(){
        // console.log(app)
        
        this.swipeContainer = this.addChild(new SwipeContainer());
        this.txtFld = this.addChild(new PIXI.Text('Swipe event study', Utils.cloneTextStyle(dataProvider.baseStyle)));
        this.txtFld.anchor.set(0.5);
        this.txtFld.x = window.innerWidth / 2;
        this.txtFld.y = 100;
    }
}