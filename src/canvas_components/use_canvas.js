import React, {useState, useEffect, useRef} from 'react'
import {Summit} from  './components/summit'

const SCALE = 0.1
const OFFSET = 80
 
export function useCanvas(){
    const canvasRef = useRef(null);
    const [summits, setSummits] = useState([]);
    const [lines, setLines] = useState([]);
    const [draggableLine, setDraggableLine] = useState(null);
    const [canvasWidth, setCanvasWidth] = useState(window.innerWidth -250);
    const [canvasHeight, setCanvasHeight] = useState(window.innerHeight-2);
    window.addEventListener('resize', () => {
        setCanvasWidth(window.innerWidth-250)
        setCanvasHeight(window.innerHeight-2)
    })

    useEffect(()=>{
        const canvasObj = canvasRef.current;
        const ctx = canvasObj.getContext('2d');
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        summits.forEach((summit) => {
            summit.draw(ctx)
        })
        lines.forEach((line) => {
            line.draw(ctx)
            
        })
        if(draggableLine != null) draggableLine.draw(ctx)
        

    })

    return [summits, setSummits, lines, setLines, draggableLine, setDraggableLine, canvasRef, canvasWidth, canvasHeight];
}