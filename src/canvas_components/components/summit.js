import {Color} from '../utilities/color'
export class Summit {
    
    constructor(index, x, y, radius,label="", color = null, lineWidth = 15){
        this.SCALE = 0.1;
        this.OFFSET = 10;
        this.index = index;
        this.label = label;
        this.x = x/this.SCALE-this.OFFSET;
        this.y = y/this.SCALE - this.OFFSET;
        this.radius = radius;
        this.color = color;
        this.lineWidth = lineWidth;
        this.ctx = null;
    }

    setShadow(ctx, color, ox, oy, blur)
    {
        ctx.shadowColor = color;
        ctx.shadowOffsetX = ox;
        ctx.shadowOffsetY = oy;
        ctx.shadowBlur = blur;
    }

    draw(ctx){
        this.ctx = ctx;
        ctx.save();
        ctx.scale(this.SCALE, this.SCALE);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true)

        ctx.fillStyle = this.color ?? Color.defaultColor;
        this.setShadow(ctx, "rgba(0,0,0,0.7)", 0,0,5)
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius - 75, 0, 2*Math.PI, true)
        ctx.fillStyle = Color.whiteColor;
        ctx.fill();
      
        ctx.beginPath();
        this.setShadow(ctx, "rgba(0,0,0,0.7)", 0,0,0)
        ctx.font = "130px Verdana";
        ctx.fillStyle =Color.whiteColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle'
        ctx.fillText(this.label, this.x, this.y + 350); 
           
      ctx.restore()
      
    }

    setColor(color){
        this.color = color
        this.draw(this.ctx);
    }

    summitClick(xmouse, ymouse){
        xmouse = xmouse / this.SCALE-this.OFFSET;
        ymouse = ymouse / this.SCALE-this.OFFSET;
        const distance = Math.sqrt(
            ((xmouse - this.x) * (xmouse - this.x)) + ((ymouse - this.y)*(ymouse - this.y))
        );
        if(distance < this.radius) return true;
        else return false;
    }

    

    getIndex(){
        return this.index;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    getLabel(){
        return this.label;
    }
    getRadius(){
        return this.radius;
    }
}