export function quadraticEquation(a, b, c){

let x1, x2;

let discriminant = b * b - 4 * a * c;
if (discriminant > 0) {
    x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
   
   return [x1, x2];
}

else if (discriminant == 0) {
    x1 = x2 = -b / (2 * a);
    return [x1];
}
else{
    return [];
}

}