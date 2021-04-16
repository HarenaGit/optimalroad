import { LensTwoTone } from '@material-ui/icons';
import {quadraticEquation} from './quadraticEquation'

/*
(x-a)*(x-a) + (y-b)*(y-b) = r*r >> circle equation
y = a*x + b >> line equation
*/

export function lineEquation(line_x_begin, line_y_begin, line_x_end, line_y_end){
  let a = (line_y_begin - line_y_end) / (line_x_begin - line_x_end)

  let b = line_y_begin - a*line_x_begin

  return [a, b];
}

export function distanceLine2Point(x,y,a,b){
  return Math.abs(a*x - y + b) / Math.sqrt(a*a + 1);
}
export function perpendicularLineEquation(x, y, a){
  let m = - 1 / a
  let b = y - m*x
  return [m, b]
}
export function lineIntersection(a,b, a1, b1){
  let x =(b1 - b)/(a - a1)
  let y = a1*x + b1
  return [x, y]
} 

export function dist(x1, y1, x2, y2){
  return Math.sqrt(Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2));
}

export function isPointInSegment(x_begin, y_begin, x_end, y_end, x,y){
  let d1 = dist(x, y, x_begin,y_begin)
  let d2 = dist(x,y, x_end,y_end)
  let lineLen = dist(x_begin,y_begin,x_end,y_end)
  let buffer = 0.1
  if(d1+d2>=lineLen-buffer && d1+d2 <= lineLen+buffer) return true;
  return false;
}


export function circle2LineIntersectionCoordinate(circle_x, circle_y, circle_radius, line_x_begin, line_y_begin, line_x_end, line_y_end, type){
  
    let line = lineEquation(line_x_begin, line_y_begin, line_x_end, line_y_end)
    let a = line[0];
    let b = line[1];

    let quadraticEq = quadraticEquation(
    (a*a + 1), 
    (-2*circle_x + 2*a*b - 2*circle_y*a), 
    (circle_x*circle_x + b*b + circle_y*circle_y - circle_radius*circle_radius - 2*b*circle_y)
    );

    let x = quadraticEq[type]

    let y = a*x + b;
    return [x,y];
}