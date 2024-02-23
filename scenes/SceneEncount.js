import AlignHelper from '../helper/AlignHelper.js';
import Dice from '../helper/Dice.js';
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
        this.enemy = JSON.parse(JSON.stringify(dataProvider.enemy[0]));
        this.enemyNextAction = {
            attack:     0, defence:    0
        };

        this.playerNextAction = {
            attack:0, defence:0, 
        }

        this.initDisplay();

        this.txtFldEnemy.text = `Enemy: ${this.enemy.name}`;
        this.txtFldEnemyStats.text = `hp: ${this.enemy.hp}`;


        this.turnStart();
        
        this.cardContainer = this.addChild(new CardContainer());
        Utils.pivotX(this.cardContainer);
        this.cardContainer.x = dataProvider.wWidth / 2;
        this.cardContainer.y = dataProvider.wHeight - this.cardContainer.height - 10;
    }

    /* ------------------------------------------------------------
        turn init
    ------------------------------------------------------------ */
    turnStart(){
        this.diceEnemyAction();
        this.playerNextAction.attack = 0;
        this.playerNextAction.defence = 0;
        // this.updateEnemyStats();
    }

    /* ------------------------------------------------------------
        Enemy
    ------------------------------------------------------------ */
    diceEnemyAction(){
        let randomIndex = Math.floor(Math.random() * this.enemy.attack.length);
        this.enemyNextAction.attack = this.enemy.attack[randomIndex];
        this.txtFldEnemyNext.text = `next ... attack: ${this.enemyNextAction.attack}`;
    }
    
    enemyTurn(card, isCounter){

        let isCounterSuccess = false;
        if(isCounter){
            isCounterSuccess = Math.random()*1 < card.probability;
            console.log("🚀 ~ SceneEncount ~ enemyTurn ~ isCounterSuccess:", isCounterSuccess)
        }

        let att = this.enemyNextAction.attack - this.playerNextAction.defence;
        att = att < 0 ? 0 : att;
        let isLethalDamage = dataProvider.playerStats.hp - att <= 0;

        gsap.timeline()
            .set(this.txtFldEnemyNext, {alpha:0})
            .to(this.txtFldEnemyNext, {alpha:1, duration:0.1, repeat:2})
            .call(()=>{
                if(isCounterSuccess){
                    this.playerTurn(card, true);
                }else{
                    dataProvider.playerStats.hp -= att;
                    this.parent.updatePlayerStats(true, isLethalDamage);
                    if(!isLethalDamage){
                        this.turnStart();
                    }
                }
                
        });
    }

    /* ------------------------------------------------------------
        Player
    ------------------------------------------------------------ */
    playCard(id){
        let card = dataProvider.cards[id];

        this.playerNextAction.attack = card.attack;
        this.playerNextAction.defence = card.defence;

        let tl = gsap.timeline();

        switch(card.type){
            case 'attack':
                this.enemy.hp -= card.attack;
                let isLethal = this.enemy.hp <= 0;
                this.addTimelineAttack(card, tl);
                if(isLethal){
                    this.addTimelineEndGame(tl);
                }else{
                    this.
                    // this.addTimelineTurnStart(tl);
                }
                break;
            case 'defence':
                let att = this.enemyNextAction.attack - this.playerNextAction.defence;
                att = att < 0 ? 0 : att;
                let isPlayerDie = dataProvider.playerStats.hp - att <= 0;
                this.addTimelineEnemyAtcion(tl);
                this.addTimelineDefence(tl, att, isPlayerDie);
                if(isPlayerDie){
                    // this.add(tl);
                }else{
                    this.addTimelineTurnStart(tl);
                }
                // this.enemyTurn(card);
                break;
            case 'counter':
                this.addTimelineEnemyAtcion(tl);
                if(Dice.roll(card.probability)){
                    this.addTimelineAttack(card, tl);
                }else{
                    this.addTimelineDefence(tl, this.enemyNextAction.attack);
                }
                this.addTimelineTurnStart(tl);
                break;
            case 'bash':
                this.addTimelineEnemyAtcion(tl);
                if(Dice.roll(card.probability)){
                    this.addTimelineAttack(card, tl);
                }else{
                    this.addTimelineDefence(tl, this.enemyNextAction.attack);
                }
                this.addTimelineTurnStart(tl);
                break;
        }

        this.cardContainer.visible = false;
    }

    addTimelineAttack(card, tl){
        let damageDrop = this.addChild(new PIXI.Text(card.attack, Utils.cloneTextStyle(dataProvider.style.base, {fontSize:55})));
        damageDrop.anchor.set(0.5);
        damageDrop.x = 350;
        damageDrop.y = this.txtFldEnemyStats.y;
        damageDrop.alpha = 0;

        gsap.timeline()
            .set(damageDrop, {y:this.txtFldEnemyStats.y-50, alpha:1, delay:0.1})
            .to(damageDrop, {y:this.txtFldEnemyStats.y, ease:'bounce', duration:0.3})
            .to(damageDrop, {alpha:0, duration:0.1, ease:'linear', onComplete: () => {
                 this.removeChild(damageDrop);
                }})

        tl
        .set(this.txtFldEnemy, {y:460, x:dataProvider.wWidth / 2 + 50, delay:0.05})
        .call(()=>{
            this.txtFldEnemyStats.text = `hp: ${this.enemy.hp}`;
        })
        .set(this.txtFldEnemy, {y:440, x:dataProvider.wWidth / 2 - 50, delay:0.05})
        .to(this.txtFldEnemy, {x:dataProvider.wWidth/2, y:450, duration:0.2, ease:'back.out(1.5)'})
    }

    addTimelineEnemyAtcion(tl){
        tl
            .set(this.txtFldEnemyNext, {alpha:0})
            .to(this.txtFldEnemyNext, {alpha:1, duration:0.1, repeat:2})
    }

    addTimelineDefence(tl, att, isPlayerDie){
        tl
            .call(()=>{
                dataProvider.playerStats.hp -= att;
                this.parent.updatePlayerStats(true, att, isPlayerDie);
        });
    }


    addTimelineTurnStart(tl){
        tl
        .call(()=>{
            this.cardContainer.visible = true;
            this.turnStart();
        });
    }

    addTimelineEndGame(tl){
        tl.call(()=>{
            this.endGame();
        });
    }

    playerTurn(card, isCounter){
        this.enemy.hp -= card.attack;

        let isLethal = this.enemy.hp <= 0;

        gsap.timeline()
            .set(this.txtFldEnemy, {y:460, x:dataProvider.wWidth / 2 + 50, delay:0.05})
            .set(this.txtFldEnemy, {y:440, x:dataProvider.wWidth / 2 - 50, delay:0.05})
            .to(this.txtFldEnemy, {x:dataProvider.wWidth/2, y:450, duration:0.2, ease:'back.out(1.5)'})
            .call(()=>{

                this.txtFldEnemyStats.text = `hp: ${this.enemy.hp}`;
                gsap.timeline()
                    .set(this.txtFldEnemyStats, {alpha:0, delay:0})
                    .to(this.txtFldEnemyStats, {alpha:1, ease:"steps(1)", duration:0.1, repeat:1})

                    .call(()=>{
                        if(isLethal){
                            //  Lethal flag
                            gsap.timeline()
                                .to(this.txtFldEnemy, {alpha:0, duration:0.1, repeat:2})
                                .call(()=>{
                                    this.endGame();
                                });
                        }else{
                            // Enemy turn
                            if(isCounter){
                                this.turnStart();
                            }else{
                                this.enemyTurn(card);
                            }
                        }
                    });

            });
    }

    endGame(){
        this.removeChild(this.cardContainer);
        this.txtFldEnemy.text = 'enemy defeated.';
        this.txtFldEnemyStats.text = '';
        this.txtFldEnemyNext.text = 'food + 10';
        this.txtFldEnemyExtra.text = 'select card rewards...';
        let btnContinue = this.addButton('Continue..');
        btnContinue.y = 800;
        btnContinue.on('touchstart', (event) => {
            this.endGameContinue();
        });
    }
    
    selectCardReward(){

    }

    endGameContinue(){
        dataProvider.playerStats.food += 10;
        gsap.timeline()
            .set(this.parent.txtFldPlayerStats, {alpha:0.1})
            .to(this.parent.txtFldPlayerStats, {alpha:1, duration:0.5, ease:'linear', repeat:1})
            .call(()=>{
                this.parent.updatePlayerStats();
                this.parent.setSceneForward();
            })

    }


    /* ------------------------------------------------------------
        initDisplays
    ------------------------------------------------------------ */
    initDisplay(){
        let margin = 100;
        let frame = this.addChild(GraphicsHelper.exDrawRect(0, 0, dataProvider.wWidth - margin*2, 300, {color:0xFFFFFF, width:2}, false));
        Utils.pivotX(frame);
        frame.x = dataProvider.wWidth / 2;
        frame.y = 400;

        this.txtFldEnemy = this.addChild(new PIXI.Text('Enemy: XXX', Utils.cloneTextStyle(dataProvider.style.base, {fontSize:55})));
        this.txtFldEnemy.anchor.set(0.5);
        this.txtFldEnemy.x = dataProvider.wWidth / 2;
        this.txtFldEnemy.y = 450;

        this.txtFldEnemyStats = this.addChild(new PIXI.Text('HP: XX', Utils.cloneTextStyle(dataProvider.style.base, {fontWeight:300, fontSize:55})));
        this.txtFldEnemyStats.anchor.set(0.5);
        this.txtFldEnemyStats.x = dataProvider.wWidth / 2;
        this.txtFldEnemyStats.y = 520;

        this.txtFldEnemyNext = this.addChild(new PIXI.Text('@ attack: XX', Utils.cloneTextStyle(dataProvider.style.base, {fontWeight:300, fontSize:55})));
        this.txtFldEnemyNext.anchor.set(0.5);
        this.txtFldEnemyNext.x = dataProvider.wWidth / 2;
        this.txtFldEnemyNext.y = 580;

        this.txtFldEnemyExtra = this.addChild(new PIXI.Text('-----', Utils.cloneTextStyle(dataProvider.style.base, {fontWeight:300, fontSize:55})));
        this.txtFldEnemyExtra.anchor.set(0.5);
        this.txtFldEnemyExtra.x = dataProvider.wWidth / 2;
        this.txtFldEnemyExtra.y = 640;
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