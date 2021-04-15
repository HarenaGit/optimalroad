import {circle2LineIntersectionCoordinate, lineEquation} from '../algorithms/circle2LineIntersection'
import {Color} from '../utilities/color'
import {quadraticEquation} from '../algorithms/quadraticEquation'
export class Line{
    constructor(x_begin, y_begin, x_end, y_end, value = 0, index_begin=0, index_end=0, circle_radius, color = null, curveIndex = null){
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
        this.valueColor = Color.activeColor
        this.ctx = null;
        this.circle_radius = circle_radius;
        this.size = 25
        this.curveIndex = curveIndex
        this.x_begin_drawed = null
        this.y_begin_drawed = null
        this.x_end_drawed = null
        this.y_begin_drawed = null
        this.font = 180
        this.fontStyle = 'Verdana'
    }

    lineClick(xmouse, ymouse){
        xmouse = xmouse / this.SCALE-this.OFFSET;
        ymouse = ymouse / this.SCALE-this.OFFSET;
        if(this.x_begin_drawed == this.x_end_drawed){
            console.log("test")
        }
        if(this.x_begin_drawed < this.x_end_drawed){
            let isXmouseOk = xmouse > this.x_begin_drawed && xmouse < this.x_end_drawed 
            if(!isXmouseOk) return false;
           }
       
        else{
            let isXmouseOk = xmouse < this.x_begin_drawed && xmouse > this.x_end_drawed 
            if(!isXmouseOk) return false;
           
        }
        let coeficient = lineEquation(this.x_begin_drawed, this.y_begin_drawed, this.x_end_drawed, this.y_end_drawed)
        let a = coeficient[0]
        let b = coeficient[1]
        let ymouseResult = a*xmouse + b
       
        const distance = Math.sqrt(
             ((ymouse - ymouseResult)*(ymouse - ymouseResult))
        );
       
        if(distance <= this.size) return true;
        else return false;
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
    setIndexBegin(idxBg){
        this.index_begin = idxBg
    }
    setIndexEnd(idxEnd){
        this.index_end = idxEnd
    }
    setValue(val){
        this.value = val
    }
    
    draw(ctx){
        this.ctx = ctx;

        let firstLine = lineEquation(this.x_begin, this.y_begin, this.x_end, this.y_end)
        let secondLine = lineEquation(this.x_begin, this.y_begin, this.x_begin + 1, this.y_begin)

        let tanTheta = (secondLine[0] - firstLine[0])/( 1 + firstLine[0]*secondLine[0])

        let theta = Math.atan(tanTheta) * (180/Math.PI)
        

        let intersection_end, intersection_begin;

        if(theta >= 0){
            if(this.y_end >= this.y_begin){
        
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
       
        if(this.curveIndex == 0  || this.curveIndex == 1){
          let tan_a_begin = - ((x_arrow_begin - this.x_begin)/(y_arrow_begin - this.y_begin)) 
          let tan_b_begin = y_arrow_begin - (tan_a_begin*x_arrow_begin)
          let quadratic_eq_begin = quadraticEquation(tan_a_begin*tan_a_begin + 1, ((-2*x_arrow_begin) +(2*tan_a_begin*(tan_b_begin-y_arrow_begin))), (x_arrow_begin*x_arrow_begin) - (this.circle_radius*this.circle_radius) + (tan_b_begin-y_arrow_begin)*(tan_b_begin-y_arrow_begin) )
          let tan_a_end = - ((x_arrow - this.x_end)/(y_arrow - this.y_end)) 
          let tan_b_end = y_arrow - (tan_a_end*x_arrow)
          let quadratic_eq_end = quadraticEquation(tan_a_end*tan_a_end + 1, ((-2*x_arrow) +(2*tan_a_end*(tan_b_end-y_arrow))), (x_arrow*x_arrow) - (this.circle_radius*this.circle_radius) + (tan_b_end-y_arrow)*(tan_b_end-y_arrow) )
          

          if(this.curveIndex == 0){
              x_arrow_begin = quadratic_eq_begin[0]
              y_arrow_begin = tan_a_begin*x_arrow_begin + tan_b_begin
              x_arrow = quadratic_eq_end[0]
              y_arrow = tan_a_end*x_arrow + tan_b_end
          }
          if(this.curveIndex == 1){
            x_arrow_begin = quadratic_eq_begin[1]
            y_arrow_begin = tan_a_begin*x_arrow_begin + tan_b_begin
            x_arrow = quadratic_eq_end[1]
            y_arrow = tan_a_end*x_arrow + tan_b_end
        }
        }
        
        this.x_begin_drawed = x_arrow_begin
        this.y_begin_drawed = y_arrow_begin
        this.x_end_drawed = x_arrow
        this.y_end_drawed = y_arrow
        ctx.save();
        ctx.scale(this.SCALE, this.SCALE); 
        
        
        let centerX = (x_arrow_begin+ x_arrow)/2
        let centerY = (y_arrow_begin + y_arrow)/2



       
        let p1 = {x: x_arrow_begin, y: y_arrow_begin}
        let p2 = {x: x_arrow, y: y_arrow}
        let size = this.size
        var angle =  Math.atan2((p2.y - p1.y) , (p2.x - p1.x));
        var hyp =  Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
      
       
        
        ctx.beginPath();	
        ctx.strokeStyle  = this.color ?? Color.defaultColor
        ctx.lineWidth = this.size
        ctx.stroke();
        ctx.moveTo(x_arrow_begin, y_arrow_begin);
        ctx.lineTo(x_arrow, y_arrow);
        ctx.strokeStyle  = this.color ?? Color.defaultColor
        ctx.lineWidth = this.size
        ctx.stroke()

        ctx.translate(p1.x, p1.y);
        ctx.rotate(angle);
        ctx.beginPath();
        
        ctx.lineTo(hyp - size*4 , size*4);
        ctx.lineTo(hyp, 0);
        ctx.lineTo(hyp - size*4, -size*4);
        ctx.strokeStyle  = this.color ?? Color.defaultColor
        ctx.fillStyle = this.color ?? Color.defaultColor;
        ctx.lineWidth = this.size

        ctx.fill()


    
      ctx.restore()
        ctx.save();
        ctx.scale(this.SCALE, this.SCALE); 

      
     

      ctx.beginPath();
      ctx.font = this.font + 'px ' + this.fontStyle;
      ctx.fillStyle = Color.blackColor
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle'
      let textWidth = ctx.measureText("" + this.value).width + 150
      let textHeight = this.font + 150
      ctx.fillRect(centerX - textWidth/2, centerY - textHeight/2, textWidth, textHeight);
      ctx.fillStyle = this.color ?? Color.defaultColor;
      ctx.fillText(""+this.value, centerX ,  centerY ); 
      ctx.fill();
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

    setCurveIndex(idx){
        this.curveIndex = idx 
    }
    getBezierXY(t, sx, sy, cp1x, cp1y, cp2x, cp2y, ex, ey) {
        return {
          x: Math.pow(1-t,3) * sx + 3 * t * Math.pow(1 - t, 2) * cp1x 
            + 3 * t * t * (1 - t) * cp2x + t * t * t * ex,
          y: Math.pow(1-t,3) * sy + 3 * t * Math.pow(1 - t, 2) * cp1y 
            + 3 * t * t * (1 - t) * cp2y + t * t * t * ey
        };
      }

}