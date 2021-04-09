import React, {useState} from 'react';
import './App.css'
import {useCanvas} from './canvas_components/use_canvas'
import {Summit} from './canvas_components/components/summit'
import {Line} from './canvas_components/components/line'
import {DraggableLine} from './canvas_components/components/draggableLine'
import Tool from './components/Tools'
import {Tools} from './canvas_components/utilities/tools'
import {AlgoType} from './canvas_components/utilities/algoType'
import {createDemouchronArray, Demouchron} from './canvas_components/algorithms/algorithms'
import {Algorithm} from './canvas_components/utilities/algorithm'

import { Button, Divider, Paper, Typography } from '@material-ui/core';
import IconPoint from '@material-ui/icons/Settings'
import DropDown from './components/dropdown'
import IconOptions from '@material-ui/icons/TollTwoTone'
import backgroundImage from './images/vector-dark.jpg'
import {CircleRadius} from './canvas_components/utilities/circleRadius'
import {Color} from './canvas_components/utilities/color'
import Slide from './components/slider'


const CIRCLE_RADIUS = CircleRadius;
const infinie = '∞';

function App(){


  const [currentTool, setCurrentTool] = useState(Tools.summit);
  const [currentAlgoType, setCurrentAlgoType] = useState(AlgoType.min)
  const [currentAlgorithm, setCurrentAlgorithm] = useState(Algorithm.demouchronWarshallFloyd)
  let   [currentArrayDetail, setCurrentArrayDetail] = useState([])
  let   [currentResult, setCurrentResult] = useState([])
  let [summits, setSummits,lines, setLines, draggableLine, setDraggableLine, canvasRef, canvasWidth, canvasHeight] = useCanvas();
  const  [lineCoordinate, setLineCoordinate] = useState([])
  let painting = false
  let currentLineCoordinate = []
  let trackerLine = false
  let trackerEndLineDraw = false
  let newLine = null

 
  React.useEffect(function setupListener(){
    const startPaintingLine = (e) => {
      if(currentTool == Tools.line) {
        painting  = true
         currentLineCoordinate = []
         trackerLine = false
       trackerEndLineDraw = false
         newLine = null
      }
      else{
        painting = false
         currentLineCoordinate = []
        trackerLine = false
        trackerEndLineDraw = false
        newLine = null
      }
    }
  
    const stopPaintingLine = (e) => {
      
      painting = false
      trackerLine = false
      newLine = null
      if(currentTool == Tools.line && trackerEndLineDraw){
         summits.forEach((summit) => {
          const clientX =  currentLineCoordinate[0][0]
          const clientY = currentLineCoordinate[0][1]
          if(summit.summitClick(clientX, clientY)){ 
            currentLineCoordinate[0][0] = summit.getX()
            currentLineCoordinate[0][1] = summit.getY() 
            currentLineCoordinate[0][3] = summit.getIndex()
          }
         })
        let ok = false
        summits.forEach((summit) => {
            const clientX =  currentLineCoordinate[1][0]
            const clientY = currentLineCoordinate[1][1]
            if(summit.summitClick(clientX, clientY)){ 
              currentLineCoordinate[1][0] = summit.getX()
              currentLineCoordinate[1][1] = summit.getY() 
              currentLineCoordinate[1][3] = summit.getIndex()
              ok = true
            }
        })
        if(currentLineCoordinate[0][0] == currentLineCoordinate[1][0] && currentLineCoordinate[0][1] == currentLineCoordinate[1][1]) return;
      
        resetColor()
        if(ok){
          let value =  prompt("Veuiller saisir la distance entre " + "X"+ currentLineCoordinate[0][3] + " et " + "X" + currentLineCoordinate[1][3])
          
          if(!isNaN(parseInt(value))){
            setLines([ ...lines, new Line(currentLineCoordinate[0][0], currentLineCoordinate[0][1], currentLineCoordinate[1][0], currentLineCoordinate[1][1], parseInt(value),  currentLineCoordinate[0][3], currentLineCoordinate[1][3], CIRCLE_RADIUS)])
          } 
            
        }
        else setLineCoordinate([])
       
      }
      currentLineCoordinate = [] 
      trackerEndLineDraw = false
      
    }
    const paint = async (event) => {
      if(!painting) return;
      if(currentTool == Tools.line){
        const rect = canvasRef.current.getBoundingClientRect();     
        const clientX =  event.clientX - rect.left
        const clientY = event.clientY - rect.top
        
  
        if(newLine == null){
  
          summits.forEach((summit) => {
            const rect = canvasRef.current.getBoundingClientRect();
          
              const clientX =  event.clientX - rect.left
              const clientY = event.clientY - rect.top
              if(summit.summitClick(clientX, clientY)){  
                let x = summit.getX();
                let y = summit.getY(); 
                currentLineCoordinate.push([clientX, clientY, 1, summit.getIndex()])
                currentLineCoordinate.push([clientX, clientY, 2, summit.getIndex()])
                newLine = new DraggableLine(currentLineCoordinate[0][0],  currentLineCoordinate[0][1],  currentLineCoordinate[1][0],  currentLineCoordinate[1][1], 4,   currentLineCoordinate[0][2],  currentLineCoordinate[1][2], CIRCLE_RADIUS)
                newLine.draw(canvasRef.current.getContext('2d'), canvasWidth, canvasHeight)
                summits.forEach((summit) => {
                  summit.draw(canvasRef.current.getContext('2d'), canvasWidth, canvasHeight)  
                })
                lines.forEach((line) => { line.draw(canvasRef.current.getContext('2d'), canvasWidth, canvasHeight) })  
  
              }
          })
          
        }
        else{
          newLine.setXEnd(clientX)
          newLine.setYEnd(clientY)
          currentLineCoordinate[1] = [clientX, clientY, 2]
          newLine.draw(canvasRef.current.getContext('2d'), canvasWidth, canvasHeight)
          summits.forEach((summit) => {
            summit.draw(canvasRef.current.getContext('2d'), canvasWidth, canvasHeight)
          })
          lines.forEach((line) => { line.draw(canvasRef.current.getContext('2d'), canvasWidth, canvasHeight) })
          trackerEndLineDraw = true
        }
      }
      else return;
    }
    window.addEventListener('mousedown', startPaintingLine )
    window.addEventListener('mouseup', stopPaintingLine)
    window.addEventListener('mousemove', paint)
    return function cleanupListener(){
      window.removeEventListener('mousedown', startPaintingLine )
      window.removeEventListener('mouseup', stopPaintingLine)
      window.removeEventListener('mousemove', paint)
    }
  })
 
  
  const summitFunctionnality = (event) => {
    resetColor()
         
    var index = summits.length+1;
    const rect = canvasRef.current.getBoundingClientRect();
    
    const x =  event.clientX - rect.left
    const y = event.clientY - rect.top
    setSummits([...summits, new Summit(index, x, y, CIRCLE_RADIUS, "X" + index)])
    return
  }

  const selectFunctionnality = (event) => {

  }
 
  const handleCanvasClick =  (event) => {
    
      if(currentTool == Tools.summit){
         summitFunctionnality(event)
      }
      if(currentTool == Tools.select){
        selectFunctionnality(event)
      }
     

  } 

  const handleClearCanvas = (event) => {
      setSummits([]);
      setLines([]);
      resetCurrentDetail()
  }
  const handleSummitTool = (e) => {
      setCurrentTool(Tools.summit)
  }
  const handleLineTool = (e) => {
      setCurrentTool(Tools.line)
  }
  const handleSelectionTool = (e) =>{
      setCurrentTool(Tools.select)
  }

  const  handleComputeRoad = async (e) => {
      resetColor()
      currentArrayDetail = []
      setCurrentArrayDetail([])
      let d = createDemouchronArray(summits.length, summits.length, currentAlgoType)
      let initialMatrice = createDemouchronArray(summits.length, summits.length, currentAlgoType);
      
      lines.forEach((line) => {
          let idx = line.getIndex();
          let row = idx[0] -1;
          let col = idx[1] - 1;
          let value = line.getValue();
          d[row][col] = value;
          initialMatrice[row][col] = value;
      })
      
     Demouchron(currentAlgoType, d, initialMatrice, currentAlgorithm, addDetail, getResult).then((resp) => { changeGraphColor(resp); }) 

     
  }

  const getResult = (table) => {
    let d = currentResult
    d.push(table)
    setCurrentResult(d)
  }

  const addDetail =  (table) => {
    let d = currentArrayDetail
    d.push(table)
    setCurrentArrayDetail(d)
  }
  const changeGraphColor = (responses) => {
      let color = Color.activeColor;
      let valueColor = Color.whiteColor
      for(let i = 0; i < responses.length; i++){
          summits.forEach((summit) => {
             
              if(summit.getIndex() == responses[i]){
      
                  summit.setColor(color);
                  lines.forEach((line) => {
                      if(i != responses.length - 1){
                          if(line.getIndexEnd() == responses[i] && line.getIndexBegin() == responses[i+1]) line.setColor(color, valueColor)    
                      }
                       
               }) 
              } 
          })
      }
      setSummits([]);
      setLines([]);
      setSummits(summits)   
      setLines(lines)    
  }

  const resetColor = () => {
    let color = Color.defaultColor;
    let valueColor = Color.blackColor
    summits.forEach((summit) => {summit.setColor(color);}) 
    lines.forEach((line) => { line.setColor(color, valueColor) })
    setSummits([]);
    setLines([]);
    setSummits(summits)   
    setLines(lines)  
    resetCurrentDetail()
  }

  const resetCurrentDetail = () => {
         currentArrayDetail = []
         currentResult = []
         setCurrentResult([])
         setCurrentArrayDetail([])
  }

  const selectAlgoType = (option) =>{
    setCurrentAlgoType(option)
  }
  const selectAlgorithm = (option) => {
    setCurrentAlgorithm(option)
  }

  const viewCalculatedValue = (j, isResult) => {
    if(j == Infinity) {
      return (
        <span style={{height: 30, color: Color.whiteColor, fontSize: 20, paddingLeft: 10, paddingRight: 10, borderWidth: 1, borderColor: Color.whiteColor, borderStyle: 'solid' }} >{infinie}</span>
        )
    }
    if(isResult){
      return (
        <span style={{height: 30, color: Color.whiteColor, fontSize: 20, paddingLeft: 10, paddingRight: 10, borderWidth: 1, borderColor: Color.whiteColor, borderStyle: 'solid' }}>{j+1}</span>
        )
    }
    return (
    <span style={{height: 30, color: Color.whiteColor, fontSize: 20, paddingLeft: 10, paddingRight: 10, borderWidth: 1, borderColor: Color.whiteColor, borderStyle: 'solid' }}>{j}</span>
    )
  }
  const viewCurrentDetailData = (k,idx, isResult = false) =>  (
      <Paper key={idx} elevation={1} style={{backgroundColor: Color.backgroundColor, marginBottom: 40, padding: 10}}>
        {
         (
           
           <div style={{padding: 10}}>
           <span style={{color: Color.whiteColor}}>K = {idx+1}</span>
            
            {k.map((i, idx_i)=>{

           return(
           <div>
             {  i.map((j, idx_j) => {
                   return (<span key={idx} >{viewCalculatedValue(j, isResult)}</span>)
                 })
             }
           </div>
           )
            
          })}
           </div>
           
          )
        }
      </Paper>
    )
  
  const viewResult = (algo) => {
      if(algo == Algorithm.demouchronWarshallFloyd){
        return(
          <div>
              {currentResult.map((k, idx) => {
                return(
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <div style={{color: Color.whiteColor}}>
                      <span >{infinie}</span>     
                    </div>
                    {viewCurrentDetailData(k, idx, true)}
                  </div>
                )
                
                })}
          </div>
        )
      }
      else return (<></>)
    }

    return (
       
         <div style = {{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  width:"100%",
                  height: "100%"
                }}>
                    
                    <div style = {{
                      display: 'flex',
                      overflow: "hidden"
                    }}>
                    <canvas
                           ref = {canvasRef}
                           width = {canvasWidth}
                           height = {canvasHeight}
                           onClick = {handleCanvasClick} 
                           style = {{
                               backgroundColor: "rgba(0,0,0,0)",
                               cursor: "pointer"
                             }}
                       />
                    </div>
                    <div style ={{
                      zIndex : 4,
                      position: "absolute",
                      left: - 10,
                      top: 10
                    }}>
                      <Tool summitFunction = {handleSummitTool} clearFunction = {handleClearCanvas}  lineFunction = {handleLineTool} />
                    </div>
                    <Paper style ={{
                      position: "absolute",
                      right: 0,
                      top:0,
                      width: 250,
                      height: canvasHeight,
                      backgroundColor: Color.backgroundColor,
                      zIndex: 5,
                      
                    }}>

                       <div style={{
                         display: "flex",
                         alignItems: "stretch",
                         justifyContent: "center",
                         marginTop: 20,
                         marginLeft: 10,
                         marginRight: 10,
                         
                       }} >
                           <Button fullWidth variant="contained" style={{
                             backgroundColor: Color.activeColor,
                             color : Color.whiteColor
                           }} component="span" onClick={handleComputeRoad} >
                              Lancer
                            </Button> 
                            
                       </div>

                       <div style={{marginTop: 20}}>
                      <Divider color="primary"  />
                      </div>

                       <div style={{
                         display: "flex",
                         alignItems: "stretch",
                         justifyContent: "center",
                         marginTop: 20,
                         marginLeft: 10,
                         marginRight: 10
                       }} >
                         <Typography variant="subtitle2" style={{
                           color: "white",
                           display: "flex"

                         }} >
                          <div style={{display:"flex", justifyContent: "center", alignItems:"center", marginRight: 10}} >
                          <IconOptions color="white" />
                          </div>
                          Propriétées
                         </Typography>
                       </div>
                       <div style={{
                         display: "flex",
                         alignItems: "stretch",
                         justifyContent: "flex-end",
                         marginTop: 20,
                         marginLeft: 10,
                         marginRight: 10
                       }} >
                         <Typography variant="subtitle2" style={{
                           color: "white",
                           display: "flex",
                          alignItems: "flex-start",
                          fontWeight: "bold"
                         }} >
                           <IconPoint  />
                           <IconPoint  />
                           
                         </Typography>
                       </div>   

                    </Paper>  

                       <div style={{
                         zIndex: 4,
                         position: 'fixed',
                         top: 10,
                         right: 200,
                       }} >
                         <Slide maxWidth = {550} maxHeight = {canvasHeight - 130} >
                           <div class="row" style={{display: 'flex', }}>
                             <div>
                                {currentArrayDetail.map((k, idx) => { return viewCurrentDetailData(k, idx)})}
                             </div>
                             
                             {viewResult(currentAlgorithm)}
                           </div>

                         </Slide>
                       </div>
                      <div style={{
                        position: "absolute",
                        bottom: 20,
                        left: 20,
                        zIndex: 10
                                              }}>
                        <Paper>
                          <DropDown onChange = {selectAlgoType}options={[AlgoType.min, AlgoType.max]} />
                        </Paper>
                        
                      </div>

                      <div style={{
                        position: "absolute",
                        bottom: 20,
                        left: 130,
                        zIndex: 10
                      }}>
                        <Paper>
                        <DropDown onChange = {selectAlgorithm} options={[Algorithm.demouchronWarshallFloyd, Algorithm.demouchron]} defaultIndex={0} />
                        </Paper>
                        
                      </div>

                </div>
               
      );
}



export default App;