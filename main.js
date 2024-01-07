import { ApplicationRoot } from './ApplicationRoot.js';
import { dataProvider } from './dataProvider.js';
import Utils from './helper/Utils.js';

/* ------------------------------------------------------------
    変数定義
------------------------------------------------------------ */

/* ------------------------------------------------------------
    アセット読み込み
------------------------------------------------------------ */
WebFont.load({
    google: {
      families: ['Pangolin'],
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
    let app = new PIXI.Application({
        background: '#FFFFFF',
        resizeTo: window
    });
    document.body.appendChild(app.view);
    dataProvider.data.app = app;
    
    const applicationRoot = new ApplicationRoot(app);
    app.stage.addChild(applicationRoot);
}

