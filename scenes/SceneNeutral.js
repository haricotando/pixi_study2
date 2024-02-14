import AlignHelper from '../helper/AlignHelper.js';
import Utils from '../helper/Utils.js';
import { dataProvider } from '../dataProvider.js';
import GraphicsHelper from '../helper/GraphicsHelper.js';

export class SceneNeutral extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();

        this.initSelector();
    }

    initSelector(){
        let btnForward = this.addButton('Foward');
        btnForward.x = 100;
        btnForward.y = 300;

        let btnRest = this.addButton('Rest');
        btnRest.x = 350;
        btnRest.y = 300;

        let btnPortal = this.addButton('Portal');
        btnPortal.x = 600;
        btnPortal.y = 300;

        btnForward.on('touchstart', (event) => {
            this.parent.setSceneForward();
        });

        btnRest.on('touchstart', (event) => {
            this.parent.setSceneRest();
        });
        
        
    }
    
    addButton(arg){
        let button = this.addChild(new PIXI.Sprite());
        let rect = button.addChild(GraphicsHelper.exDrawRect(0, 0, 200, 100, {color:0xFFFFFF}, {color:0x000000}))
        let label = button.addChild(new PIXI.Text(arg, Utils.cloneTextStyle(dataProvider.style.jp)));
        label.x = 20;
        label.y = 20;
        
        button.interactive = true;
        return button;
    }
}