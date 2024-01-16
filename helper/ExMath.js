class ExMath {

    static hello(){
        console.log('hello');
    }

    /* ------------------------------------------------------------
        数字Aを入力すると、Xを中心に相対的に減少していく値を返す
        X = 500
        100 -> 100
        400 -> 400
        500 -> 500
        600 -> 400
        clampToZero:true でマイナスは0にまとめる（デフォルト）
    ------------------------------------------------------------ */
    static symmetricDecay(center, x, clampToZero) {
        let buffer = x - center;
        if(buffer < 0){
          buffer = Math.abs(buffer);
        }
        buffer = center - buffer;
        if(clampToZero == undefined || clampToZero == true){
            buffer = buffer < 0 ? 0 : buffer;
        }
        return buffer;
    }
}

export default ExMath;



