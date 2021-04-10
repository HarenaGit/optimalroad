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

    draw(ctx, canvasWidth, canvasHeight){

        this.ctx = ctx;  
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