import { dataProvider } from './dataProvider.js';
import Utils from './helper/Utils.js';
import Easing from './helper/Easing.js';
import GraphicsHelper from './helper/GraphicsHelper.js';
import { SwipeContainer5 } from './SwipeContainer5.js';
import { SwipeContainer4 } from './SwipeContainer4.js';


export class ApplicationRoot extends PIXI.Container {

    /* ============================================================
        constructor
    ============================================================ */
    constructor(appScreen) {
        super();


        // families: ['Chewy', 'Acme', 'Changa One', 'Bowlby One SC', 'Dela Gothic One', 'DotGothic16', 'Train One', 'Rampart One'],
        dataProvider.baseStyle = new PIXI.TextStyle({
            fontFamily: 'Bowlby One SC', fontSize: 100, fontWeight: 100,
        });

        dataProvider.style.jp = new PIXI.TextStyle({
            fontFamily: 'Kiwi Maru', fontSize: 90, fontWeight:500,
        });

        this.init();
    }

    init(){

 

        // this.easeStudy();
        // this.cardContainer = this.addChild(new CardContainer());
        // this.swipeContainer = this.addChild(new SwipeContainer());
        // this.swipeContainer = this.addChild(new SwipeContainer4());
        this.swipeContainer = this.addChild(new SwipeContainer5());
        this.txtFld = this.addChild(new PIXI.Text('Swipe event study', Utils.cloneTextStyle(dataProvider.baseStyle, {fontSize:90})));
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