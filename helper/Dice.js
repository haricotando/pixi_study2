class Dice {
    
    static roll(probability){
        let result = Math.random();
        
        if(result < probability){
            console.log(`🦒 Probability: ${probability} / Result: ${result} :: true`);
            return true;
        }else{
            console.log(`🦒 Probability: ${probability} / Result: ${result} :: false`);
            return false;
        }
    }
}

export default Dice;