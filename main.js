import { ApplicationRoot } from './ApplicationRoot.js';
import { dataProvider } from './dataProvider.js';
import Utils from './helper/Utils.js';
import AlignHelper from './helper/AlignHelper.js';


console.log(PIXI.VERSION)

/* ------------------------------------------------------------
    変数定義
------------------------------------------------------------ */

/* ------------------------------------------------------------
    アセット読み込み
------------------------------------------------------------ */
WebFont.load({
    google: {
      families: ['Teko:300,500,700'],
    },
    
    active: () => {
        init();
        console.log('OK: Font');
    },
    // フォント読み込み失敗時
    inactive: () => {
        console.log("ER: Font");
    },
  });

function init(){

    // gsap.registerPlugin(PixiPlugin);

    dataProvider.wWidth = window.innerWidth;
    dataProvider.wHeight = window.innerHeight;
    console.log(window.innerHeight)
    console.log(dataProvider.wHeight);
    let app = new PIXI.Application({
        background: '#1A1F22',
        resizeTo: window
    });
    document.body.appendChild(app.view);
    dataProvider.data.app = app;

    dataProvider.wWidth = window.innerWidth;
    dataProvider.wHeight = window.innerHeight;

    AlignHelper.lockedScreenWidth = dataProvider.wWidth;
    AlignHelper.lockedScreenHeight = dataProvider.wHeight;
    
    const applicationRoot = new ApplicationRoot(app);
    app.stage.addChild(applicationRoot);
}

