class Dice {
    
    static roll(probability){
        let result = Math.random();
        console.log(probability)
        console.log("🚀 ~ Dice ~ roll ~ result:", result)
        
        if(result < probability){
            return true;
        }else{
            return false;
        }
    }
}

export default Dice;