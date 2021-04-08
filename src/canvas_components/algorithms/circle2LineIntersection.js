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