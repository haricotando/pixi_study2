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
        let btnForward = this.addButton('Foward..');
        btnForward.y = 500;

        let btnRest = this.addButton('Rest..');
        btnRest.y = 650;

        let btnPortal = this.addButton('Portal..');
        btnPortal.y = 800;

        btnForward.on('touchstart', (event) => {
            this.parent.setSceneForward();
        });

        btnRest.on('touchstart', (event) => {
            this.parent.setSceneRest();
        });
        
        
    }
    
    addButton(arg){
        let margin = 300;
        let button = this.addChild(new PIXI.Sprite());
        let rect = button.addChild(GraphicsHelper.exDrawRect(0, 0, dataProvider.wWidth - margin*2, 100, {color:0xFFFFFF}, {color:0x000000}))
        let label = button.addChild(new PIXI.Text(arg, Utils.cloneTextStyle(dataProvider.style.base, {fontSize: 50})));
        label.anchor.set(0, 0.5);
        label.x = 20;
        label.y = 50;
        button.x = margin;
        button.interactive = true;
        return button;
    }
}