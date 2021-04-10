import {circle2LineIntersectionCoordinate, lineEquation} from '../algorithms/circle2LineIntersection'
import {Color} from '../utilities/color'

export class Line{
    constructor(x_begin, y_begin, x_end, y_end, value = 0, index_begin=0, index_end=0, circle_radius, color = null){
        this.SCALE = 0.1;
        this.OFFSET = 10;
        this.x_begin = x_begin
        this.y_begin = y_begin
        this.x_end = x_end
        this.y_end= y_end
        this.index_begin = index_begin;
        this.index_end = index_end;
        this.value = value;
        this.color = color;
        this.valueColor = Color.blackColor
        this.ctx = null;
        this.circle_radius = circle_radius;
    }

    setXBegin(x){
        this.x_begin = x/this.SCALE - this.OFFSET
    }
    setYBegin(y){
        this.y_begin = y/this.SCALE - this.OFFSET
    }
    setXEnd(x){
        this.x_end = x/this.SCALE - this.OFFSET
    }
    setYEnd(y){
        this.y_end = y/this.SCALE - this.OFFSET
    }
    
    draw(ctx){
        this.ctx = ctx;

        let firstLine = lineEquation(this.x_begin, this.y_begin, this.x_end, this.y_end)
        let secondLine = lineEquation(this.x_begin, this.y_begin, this.x_begin + 1, this.y_begin)

        let tanTheta = (secondLine[0] - firstLine[0])/( 1 + firstLine[0]*secondLine[0])

        let theta = Math.atan(tanTheta) * (180/Math.PI)

        let intersection_end, intersection_begin;

      
        if(theta >= 0){
            if(this.y_end > this.y_begin){
        
                intersection_end = circle2LineIntersectionCoordinate(this.x_end, this.y_end, this.circle_radius, this.x_begin, this.y_begin, this.x_end, this.y_end, 0)
                intersection_begin = circle2LineIntersectionCoordinate(this.x_begin, this.y_begin, this.circle_radius, this.x_begin, this.y_begin, this.x_end, this.y_end, 1)   
               
            }
            else{
                intersection_end = circle2LineIntersectionCoordinate(this.x_end, this.y_end, this.circle_radius, this.x_begin, this.y_begin, this.x_end, this.y_end, 1)
                intersection_begin = circle2LineIntersectionCoordinate(this.x_begin, this.y_begin, this.circle_radius, this.x_begin, this.y_begin, this.x_end, this.y_end, 0)
              
            }
 
           
        }
        else{
            if(this.y_end > this.y_begin){
               
                intersection_end = circle2LineIntersectionCoordinate(this.x_end, this.y_end, this.circle_radius, this.x_begin, this.y_begin, this.x_end, this.y_end, 1)
                intersection_begin = circle2LineIntersectionCoordinate(this.x_begin, this.y_begin, this.circle_radius, this.x_begin, this.y_begin, this.x_end, this.y_end, 0)   
                
            }
            else{
                intersection_end = circle2LineIntersectionCoordinate(this.x_end, this.y_end, this.circle_radius, this.x_begin, this.y_begin, this.x_end, this.y_end, 0)
                intersection_begin = circle2LineIntersectionCoordinate(this.x_begin, this.y_begin, this.circle_radius, this.x_begin, this.y_begin, this.x_end, this.y_end, 1)
             
            }
           
        }

      
        var x_arrow = intersection_end[0]
        var y_arrow = intersection_end[1]
      
        var x_arrow_begin = intersection_begin[0]
        var y_arrow_begin = intersection_begin[1]
        
     
        ctx.save();
        ctx.scale(this.SCALE, this.SCALE); 
        
        
        let centerX = (x_arrow_begin+ x_arrow)/2
        let centerY = (y_arrow_begin + y_arrow)/2



       
        let p1 = {x: x_arrow_begin, y: y_arrow_begin}
        let p2 = {x: x_arrow, y: y_arrow}
        let size = 60
        var angle = Math.atan2((p2.y - p1.y) , (p2.x - p1.x));
        var hyp = Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
      
       // ctx.globalCompositeOperation = "destination-over";
       
        ctx.translate(p1.x, p1.y);
        ctx.rotate(angle);
        ctx.beginPath();	
        ctx.moveTo(0, 0);
        ctx.lineTo(hyp - size, 0);
        ctx.strokeStyle  = this.color ?? Color.defaultColor
        ctx.fillStyle = this.color ?? Color.defaultColor;
        ctx.lineWidth = 25
        ctx.stroke();
        ctx.moveTo(0, 0);
        ctx.lineTo(hyp - size, 0);
        ctx.strokeStyle  = this.color ?? Color.defaultColor
        ctx.lineWidth = 25
        ctx.stroke()

       
        ctx.beginPath();
        
        ctx.lineTo(hyp - size, size);
        ctx.lineTo(hyp, 0);
        ctx.lineTo(hyp - size, -size);
        ctx.strokeStyle  = this.color ?? Color.defaultColor
        ctx.fillStyle = this.color ?? Color.defaultColor;
        ctx.lineWidth = 20

        ctx.fill()

        ctx.lineTo(hyp - size, size);
        ctx.lineTo(hyp, 0);
        ctx.lineTo(hyp - size, -size);
        ctx.fillStyle = this.color ?? Color.defaultColor;
        ctx.lineWidth = 50
        ctx.fill()

    
        ctx.restore()
        ctx.save();
        ctx.scale(this.SCALE, this.SCALE); 

      ctx.beginPath();
        
      ctx.arc(centerX, centerY, 90, 0, 2*Math.PI, true)
      ctx.strokeStyle = this.color ?? Color.defaultColor;
      ctx.fillStyle = this.color ?? Color.whiteColor;
      ctx.lineWidth = 15
      ctx.fill();
      ctx.stroke()

  
      ctx.beginPath();
     
      ctx.font = "130px Verdana";
      ctx.fillStyle = this.valueColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle'
      ctx.fillText(""+this.value, centerX, centerY); 
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

    

}