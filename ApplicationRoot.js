import { dataProvider } from './dataProvider.js';
import Utils from './helper/Utils.js';
import Easing from './helper/Easing.js';
import { SwipeContainer } from './SwipeContainer.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import { CardContainer } from './CardContainer.js';
import { SwipeContainer2 } from './SwipeContainer2.js';


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

 

        // this.easeStudy();
        // this.cardContainer = this.addChild(new CardContainer());
        this.swipeContainer = this.addChild(new SwipeContainer2());
        this.txtFld = this.addChild(new PIXI.Text('Swipe event study', Utils.cloneTextStyle(dataProvider.baseStyle)));
        this.txtFld.anchor.set(0.5);
        this.txtFld.x = window.innerWidth / 2;
        this.txtFld.y = 100;

        const grid = this.addChild(Utils.drawGrid(196/2));
        grid.alpha = 0.5;
    }

    easeStudy(){
        let time = 0;
        let box = this.addChild(GraphicsHelper.exDrawRect(0, 0, 100, 100, true, {color:0xFF00FF}));
        Utils.pivotCenter(box);
        box.x = 100;
        box.y = 100;

        let StartVal = 0;
        let endVal = 500;


        const ticker = dataProvider.data.app.ticker;
        ticker.add((delta) => {
            // this.box.x += 1;
            if(time < 100){
                time++;
                /*  
                t: current time
                b: begInnIng value
                c: change In value
                d: duration
                */
               let result = Easing.easeInOutQuad(time, 500, -300, 100);
               console.log(result);
               box.x = result;
            }
        });
    }
}