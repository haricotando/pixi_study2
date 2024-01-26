class GraphicsHelper {
    // 2024/01/19

    static hello(){
        console.log('hello');
    }

    /* ------------------------------------------------------------
        drawRect + line, fill
    ------------------------------------------------------------ */
    static exDrawRect(x, y, width, height, line, fill) {
        const graphics = new PIXI.Graphics();
        if(line){
            let lineWidth = line.width ? line.width : 1;
            let lineColor = line.color != undefined ? line.color : 0xFFFFFF;
            let lineAlpha = line.alpha != undefined ? line.alpha : 1;
            graphics.lineStyle(lineWidth, lineColor, lineAlpha);
        }

        if(fill){
            let fillColor = fill.color != undefined ? fill.color : 0xFFFFFF;
            let fillAlpha = fill.alpha != undefined ? fill.alpha : 1;
            graphics.beginFill(fillColor, fillAlpha);   
        }
        graphics.drawRect(x, y, width, height);
        if(fill){
            graphics.endFill();
        }
        return graphics;
    }

    /* ------------------------------------------------------------
        drawRoundedRect + line, fill
    ------------------------------------------------------------ */
    static exDrawRoundedRect(x, y, width, height, radius, line, fill) {
        const graphics = new PIXI.Graphics();
        if(line){
            let lineWidth = line.width ? line.width : 1;
            let lineColor = line.color != undefined ? line.color : 0xFFFFFF;
            let lineAlpha = line.alpha != undefined ? line.alpha : 1;
            graphics.lineStyle(lineWidth, lineColor, lineAlpha);
        }

        if(fill){
            let fillColor = fill.color != undefined ? fill.color : 0xFFFFFF;
            let fillAlpha = fill.alpha != undefined ? fill.alpha : 1;
            graphics.beginFill(fillColor, fillAlpha);   
        }
        graphics.drawRoundedRect(x, y, width, height, radius);
        if(fill){
            graphics.endFill();
        }
        return graphics;
    }

    /* ------------------------------------------------------------
        drawCircle + line, fill
    ------------------------------------------------------------ */
    static exDrawCircle(x, y, radius, line, fill){
        const graphics = new PIXI.Graphics();
        
        if(line){
            let lineWidth = line.width ? line.width : 1;
            let lineColor = line.color != undefined ? line.color : 0xFFFFFF;
            let lineAlpha = line.alpha != undefined ? line.alpha : 1;
            graphics.lineStyle(lineWidth, lineColor, lineAlpha);
        }
        
        if(fill){
            let fillColor = fill.color != undefined ? fill.color : 0xFFFFFF;
            let fillAlpha = fill.alpha != undefined ? fill.alpha : 1;
            graphics.beginFill(fillColor, fillAlpha);   
        }
        
        graphics.drawCircle(x, y, radius);
        
        if(fill){
            graphics.endFill();
        }
        return graphics;
    };
}
    
export default GraphicsHelper;