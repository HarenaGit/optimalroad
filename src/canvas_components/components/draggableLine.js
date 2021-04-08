import {circle2LineIntersectionCoordinate, lineEquation} from '../algorithms/circle2LineIntersection'
import {Color} from '../utilities/color'

export class DraggableLine{
    constructor(x_begin, y_begin, x_end, y_end, value = 0, index_begin=0, index_end=0, circle_radius, color = null){
        this.SCALE = 0.1;
        this.OFFSET = 10;
        this.x_begin = x_begin/this.SCALE-this.OFFSET;
        this.y_begin = y_begin/this.SCALE-this.OFFSET;
        this.x_end = x_end/this.SCALE-this.OFFSET;
        this.y_end= y_end/this.SCALE-this.OFFSET;
        this.index_begin = index_begin;
        this.index_end = index_end;
        this.value = value;
        this.color = color;
        this.valueColor = Color.blackColor
        this.ctx = null;
        this.circle_radius = circle_radius;
        this.size = 25
    }


    clearLineSquared(context,x1,y1,x2,y2,thickness) {
        var tmp, length;
    
        // swap coordinate pairs if x-coordinates are RTL to make them LTR
        if (x2 < x1) {
            tmp = x1; x1 = x2; x2 = tmp;
            tmp = y1; y1 = y2; y2 = tmp;
        }
    
        length = this.dist(x1,y1,x2,y2);
    
        context.save();
        context.translate(x1,y1);
        context.rotate(Math.atan2(y2-y1,x2-x1));
        context.clearRect(0,0,length,thickness);
        context.restore();
    }
    
    draw(ctx, canvasWidth, canvasHeight){

        this.ctx = ctx;  
      // this.clearLineSquared(ctx, this.x_begin, this.y_begin, this.x_end, this.y_end, this.size); 
       ctx.clearRect(0,0, canvasWidth, canvasHeight)
        ctx.save();
        ctx.scale(this.SCALE, this.SCALE); 
        
        ctx.beginPath();	
        ctx.moveTo(this.x_begin, this.y_begin);
        ctx.lineTo(this.x_end, this.y_end);
        ctx.strokeStyle  = this.color ?? Color.defaultColor
        ctx.fillStyle = this.color ?? Color.defaultColor;
        ctx.lineWidth = this.size
        ctx.stroke();
       
        ctx.restore()
    }

    dist(x1,y1,x2,y2) { 
        x2-=x1; y2-=y1; 
        return Math.sqrt((x2*x2) + (y2*y2)); 
    }
    
   
    clearLineRounded(ctx, x1, y1, x2, y2, thickness){
        if(thickness <= 2){
            this.clearLineSquared(ctx, x1, y1, x2, y2, thickness);
            return;
        }
        var tmp, half_thickness = thickness / 2, length, PI15 = 1.5 * Math.PI, PI05 = 0.5 * Math.PI;
        if(x2<x1){
            tmp = x1; x1 = x2; x2 = tmp;
            tmp = y1; y1 = y2; y2 = tmp;
        }
        length = this.dist(x1, y1, x2, y2)
        ctx.save()
        ctx.translate(x1,y1)
        ctx.rotate(Math.atan2(y2-y1, x2-x1));
        x1 = 0;
        y1 = 0;
        x2 = length - 1;
        y2 = 0;

        ctx.moveTo(x1, y1-half_thickness)
        ctx.lineTo(x2,y2-half_thickness)
        ctx.arc(x2,y2,half_thickness, PI15, PI05, false)
        ctx.lineTo(x1, y1-half_thickness+thickness)
        ctx.arc(x1,y1, half_thickness, PI05, PI15, false)
        ctx.closePath()
        x1 -= half_thickness
        x2 -= half_thickness

        ctx.clip()
        ctx.clearRect(x1, y1, length+thickness, thickness)
        ctx.restore();

    }

   
    getIndex(){
        return [this.index_begin, this.index_end];
    }

    getValue(){
        return this.value;
    }

    getIndexEnd(){
        return this.index_end
    }
    getIndexBegin(){
        return this.index_begin
    }

    getXBegin(){
        return this.x_begin;
    }
    getXEnd(){
        return this.x_end;
    }

    getYBegin(){
        return this.y_begin;
    }

    getYEnd(){
        return this.y_end;
    }

    setValue(val){
        this.value = val;
    }

    setColor(color, valueColor){
        this.color = color;
        this.valueColor = valueColor
        this.draw(this.ctx)
    }
    setXBegin(value){
        this.x_begin = value/this.SCALE-this.OFFSET
    }
    setYBegin(value){
        this.y_begin = value/this.SCALE-this.OFFSET
    }
    setXEnd(value){
        this.x_end = value/this.SCALE-this.OFFSET
    }
    setYEnd(value){
        this.y_end = value/this.SCALE-this.OFFSET
    }

    

}