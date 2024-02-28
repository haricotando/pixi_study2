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

        // init Enemy
        this.enemy = JSON.parse(JSON.stringify(dataProvider.enemy[Math.floor(Math.random() * dataProvider.enemy.length)]));
        this.enemyNextAction = {attack: 0, defence: 0};

        this.initEnemyDisplay();
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
        this.playerNextAction = {attack:0, defence:0};
    }

    diceEnemyAction(){
        let randomIndex = Math.floor(Math.random() * this.enemy.attack.length);
        this.enemyNextAction.attack = Math.round(this.enemy.attack[randomIndex] * dataProvider.playerStats.damageDebuff);
        this.txtFldEnemyNext.text = `Next ... Attack: ${this.enemyNextAction.attack}`;
    }

    /* ------------------------------------------------------------
        Player
    ------------------------------------------------------------ */
    playCard(id){
        let card = dataProvider.cards[id];
        
        this.playerNextAction.attack = Math.round(card.attack * dataProvider.playerStats.damageBuff);
        // this.playerNextAction.attack = card.attack;
        this.playerNextAction.defence = card.defence;

        let isPlayerDie;
        let isLethal;

        let tl = gsap.timeline();

        switch(card.type){
            case 'attack':
                dataProvider.display.playerAction(tl);
                let isLethal = this.atlAttack(tl);
                if(!isLethal){
                    this.atlEnemyAction(tl);
                    let isPlayerDie = this.atlDefence(tl);
                    if(!isPlayerDie){
                        this.atlTurnEnd(tl);
                    }
                }
                break;

            case 'defence':
                this.atlEnemyAction(tl);
                isPlayerDie = this.atlDefence(tl);
                if(!isPlayerDie){
                    this.atlTurnEnd(tl);
                }
                break;

            case 'counter':
                this.atlEnemyAction(tl);
                if(Dice.roll(card.probability)){
                    dataProvider.display.playerDodge(tl);
                    dataProvider.display.playerAction(tl);
                    let isLethal = this.atlAttack(tl);
                    if(!isLethal){
                        this.atlTurnEnd(tl);
                    }
                }else{
                    let isPlayerDie = this.atlDefence(tl);
                    if(!isPlayerDie){
                        this.atlTurnEnd(tl);
                    }
               }
                break;

            case 'charge':                    
                this.atlEnemyAction(tl);
                isPlayerDie = this.atlDefence(tl);
                if(!isPlayerDie){
                    this.atlCharge(tl, card);
                    this.atlTurnEnd(tl);
                }
                break;

            case 'dodge':                    
                this.atlEnemyAction(tl);
                if(Dice.roll(card.probability)){
                    dataProvider.display.playerDodge(tl);
                    this.atlTurnEnd(tl);
                }else{
                    let isPlayerDie = this.atlDefence(tl);
                    if(!isPlayerDie){
                        this.atlTurnEnd(tl);
                    }
                }
                break;
        }

        this.cardContainer.visible = false;
    }

   /* ============================================================
        Add Timeline
    ============================================================ */
    atlCharge(tl, card){
        dataProvider.display.playerCharge(tl);
        tl
        .call(()=>{
            dataProvider.playerStats.damageBuffCount += 1;
            dataProvider.playerStats.damageBuff = card.damageBuff;
            dataProvider.playerStats.damageDebuffCount += 1;
            dataProvider.playerStats.damageDebuff = card.damageDebuff;
            this.txtFldPlayerBuff.text = `AttackAmp = ${dataProvider.playerStats.damageBuff} / DamageAmp = ${dataProvider.playerStats.damageDebuff}`;
        })
        .set(this.txtFldPlayerBuff.scale, {x:1.5, y:1.5})
        .to(this.txtFldPlayerBuff.scale, {x:1, y:1,duration:0.2, ease:'bounce'})

        
    }
    
    atlAttack(tl){
        let attack = this.playerNextAction.attack;
        let isLethal = this.enemy.hp - attack <= 0;
        this.atlEmenyDamage(tl, attack);
        if(isLethal){
            this.atlDefeatEnemy(tl);
        }
        return isLethal;
    }

    atlEmenyDamage(tl, attack){
        this.enemy.hp -= attack;
        
        let orgPosX = this.txtFldEnemyStats.x;
        tl
        .set(this.txtFldEnemyStats, {x:orgPosX - 40, y:120, delay:0.05})
        .call(()=>{
            this.txtFldEnemyStats.text = `HP: ${this.enemy.hp}`;
        })
        .to(this.txtFldEnemyStats, {x:orgPosX, y:140, duration:0.1, ease:'back.out(4)'})
        .set(this.enemyDisplay, {x:dataProvider.wWidth / 2 + 100, y:350, duration:0.1, ease:'back.out(4)'})
        .to(this.enemyDisplay, {x:dataProvider.wWidth / 2, y:450, duration:0.1, ease:'back.out(4)'})

        let damageDrop = this.addChild(new PIXI.Text(attack, Utils.cloneTextStyle(dataProvider.style.base, {fontSize:70})));
        damageDrop.anchor.set(0.5);
        damageDrop.x = dataProvider.wWidth / 2;
        damageDrop.y = 750;
        damageDrop.alpha = 0;

        tl
        .set(damageDrop, {y:650, alpha:1})
        .to(damageDrop, {y:750, duration:0.1, ease:'back.out(1.2)'})
        .to(damageDrop, {alpha:0.2, duration:0.1, onComplete: () => {
            this.removeChild(damageDrop);
           }})
    }

    atlDefence(tl){
        let damage = this.enemyNextAction.attack - this.playerNextAction.defence;
        console.log("🚀 ~ SceneEncount ~ atlDefence ~ this.playerNextAction.defence:", this.playerNextAction.defence)
        console.log("🚀 ~ SceneEncount ~ atlDefence ~ this.enemyNextAction.attack:", this.enemyNextAction.attack)
        console.log("🚀 ~ SceneEncount ~ atlDefence ~ damage:", damage)
        damage = damage < 0 ? 0 : damage;
        let isPlayerDie = dataProvider.playerStats.hp - damage <= 0;
        this.atlEmemyAttack(tl, damage);
        if(isPlayerDie){
            this.atlDie(tl);
        }
        return isPlayerDie;
    }

    atlEnemyAction(tl){
        let orgPosX = this.txtFldEnemy.x;
        tl
        .set(this.txtFldEnemy, {alpha:0})
        .to(this.txtFldEnemy, {alpha:1, duration:0.1, ease:'steps(2)', repeat:2})
    }

    atlEmemyAttack(tl, attack){
        dataProvider.playerStats.hp -= attack;
        dataProvider.display.damage(tl, attack);
    }

    atlTurnEnd(tl){
        tl
        .call(()=>{

            if(dataProvider.playerStats.damageBuffCount > 0){
                dataProvider.playerStats.damageBuffCount -= 1;
            }else{
                dataProvider.playerStats.damageBuff = 1;
            }

            if(dataProvider.playerStats.damageDebuffCount > 0){
                dataProvider.playerStats.damageDebuffCount -= 1;
            }else{
                dataProvider.playerStats.damageDebuff = 1;
            }
            this.txtFldPlayerBuff.text = `AttackAmp = ${dataProvider.playerStats.damageBuff} / DamageAmp = ${dataProvider.playerStats.damageDebuff}`;
            this.cardContainer.visible = true;
            this.turnStart();
        });
    }

    atlDefeatEnemy(tl){
        tl
        .call(()=>{
            this.endGame();
        });
    }

    atlDie(tl){
        tl
        .call(()=>{
            let btnContinue = this.addButton('Continue..');
            btnContinue.y = 1000;
            btnContinue.on('touchstart', (event) => {
                this.endGameContinue();
            });
        });
    }

    /* ------------------------------------------------------------
        endGame
    ------------------------------------------------------------ */
    endGame(){
        this.removeChild(this.cardContainer);
        this.txtFldEnemy.text = 'enemy defeated.';
        this.txtFldEnemyStats.text = '';
        this.txtFldEnemyNext.text = 'food + 2';
        this.txtFldEnemyExtra.text = 'select card rewards...';
        let btnContinue = this.addButton('Continue..');
        btnContinue.y = 900;
        btnContinue.on('touchstart', (event) => {
            this.endGameContinue();
        });
    }
    
    endGameContinue(){
        dataProvider.playerStats.food += 2;
        dataProvider.display.updateFood(gsap.timeline())
        // dataProvider.updateStats()
        gsap.timeline()
            .call(()=>{
                this.parent.setSceneSelectReward();
            })

    }

    /* ------------------------------------------------------------
        initDisplays
    ------------------------------------------------------------ */
    initEnemyDisplay(){
        let margin = 100;
        this.enemyDisplay = this.addChild(new PIXI.Container());
        
        this.enemyDisplay.y = 450;
        let frameWidth = dataProvider.wWidth - margin*2;
        this.frame = this.enemyDisplay.addChild(GraphicsHelper.exDrawRect(0, 0, frameWidth, 350, {color:0xFFFFFF, width:2}, false));
        Utils.pivotCenter(this.frame);
        this.frame.x = frameWidth / 2;
        this.frame.y = 175;
        

        Utils.pivotX(this.enemyDisplay);
        this.enemyDisplay.x = dataProvider.wWidth/2;

        this.txtFldEnemy = this.enemyDisplay.addChild(new PIXI.Text('XXX', Utils.cloneTextStyle(dataProvider.style.base, {fontSize:55})));
        this.txtFldEnemy.anchor.set(0.5);
        this.txtFldEnemy.x = frameWidth / 2;
        this.txtFldEnemy.y = 70;

        this.txtFldEnemyStats = this.enemyDisplay.addChild(new PIXI.Text('HP: XX', Utils.cloneTextStyle(dataProvider.style.base, {fontWeight:300, fontSize:55})));
        this.txtFldEnemyStats.anchor.set(0.5);
        this.txtFldEnemyStats.x = frameWidth / 2;
        this.txtFldEnemyStats.y = 140;

        this.txtFldEnemyNext = this.enemyDisplay.addChild(new PIXI.Text('Next ... Attack: XX', Utils.cloneTextStyle(dataProvider.style.base, {fontWeight:300, fontSize:55})));
        this.txtFldEnemyNext.anchor.set(0.5);
        this.txtFldEnemyNext.x = frameWidth / 2;
        this.txtFldEnemyNext.y = 210;

        this.txtFldEnemyExtra = this.enemyDisplay.addChild(new PIXI.Text(' XXXX ', Utils.cloneTextStyle(dataProvider.style.base, {fontStyle:'italic', fontWeight:300, fontSize:55})));
        this.txtFldEnemyExtra.anchor.set(0.5);
        this.txtFldEnemyExtra.x = frameWidth / 2;
        this.txtFldEnemyExtra.y = 280;
        
        //
        this.txtFldEnemy.text = this.enemy.name;
        this.txtFldEnemyStats.text = `HP: ${this.enemy.hp}`
        this.txtFldEnemyExtra.text = '';
        
        this.txtFldPlayerBuff = this.addChild(new PIXI.Text(' XXXX ', Utils.cloneTextStyle(dataProvider.style.base, {fontWeight:300, fontSize:55})));
        this.txtFldPlayerBuff.text = '';
        this.txtFldPlayerBuff.anchor.set(0.5);
        this.txtFldPlayerBuff.x = dataProvider.wWidth / 2;
        this.txtFldPlayerBuff.y = 850;
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