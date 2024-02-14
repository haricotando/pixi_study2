import AlignHelper from '../helper/AlignHelper.js';
import Utils from '../helper/Utils.js';
import { dataProvider } from '../dataProvider.js';
import GraphicsHelper from '../helper/GraphicsHelper.js';
import { CardContainer } from '../CardContainer.js';

export class SceneEncount extends PIXI.Container {
    /* ============================================================
        constructor
    ============================================================ */
    constructor() {
        super();
        this.enemy;

        this.enemyNextAction = {
            attack:     0,
            defence:    0
        };

        this.txtFldEnemy = this.addChild(new PIXI.Text('Enemy: ', Utils.cloneTextStyle(dataProvider.style.base, {fontSize:60})));
        this.txtFldEnemy.anchor.set(0.5);
        this.txtFldEnemy.x = dataProvider.wWidth / 2;
        this.txtFldEnemy.y = 300;

        this.txtFldEnemyAction = this.addChild(new PIXI.Text('NextAction: ', Utils.cloneTextStyle(dataProvider.style.base, {fontSize:50})));
        this.txtFldEnemyAction.anchor.set(0.5);
        this.txtFldEnemyAction.x = dataProvider.wWidth / 2;
        this.txtFldEnemyAction.y = 400;


        this.initEnemy();
        this.diceEnemyAction();
        this.updateEnemyStats();
        
        
        this.initMessage();
        this.addChild(new CardContainer());
        // this.initSelector();
    }
    
    playCard(id){
        let card = dataProvider.cards[id];
        if(card.attack){
            this.enemy.hp -= card.attack;
            gsap.set(this.txtFldEnemy, {x:dataProvider.wWidth / 2-300})
            gsap.to(this.txtFldEnemy, {x:dataProvider.wWidth/2, duration:0.2, ease:'back.out(1.7)'})

        }
        dataProvider.playerStats.hp -= this.enemyNextAction.attack;
        this.parent.updatePlayerStats();
        this.updateEnemyStats();
    }

    initEnemy(){
        this.enemy = JSON.parse(JSON.stringify(dataProvider.enemy[0]));
        this.diceEnemyAction();
    }

    updateEnemyStats(){
        this.txtFldEnemy.text = `Enemy: ${this.enemy.name} / hp: ${this.enemy.hp}`;
    }
    
    diceEnemyAction(){
        this.enemyNextAction.attack = this.enemy.attack[Math.round(Math.random()*this.enemy.attack.length)];
        this.txtFldEnemyAction.text = `NextAction: attack -> ${this.enemyNextAction.attack}`;
    }

    initMessage(){
        let message = this.addChild(new PIXI.Text('敵と遭遇した', Utils.cloneTextStyle(dataProvider.style.jp, {fontSize:40})));
        message.anchor.set(0.5);
        message.x = dataProvider.wWidth / 2;
        message.y = 500;
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