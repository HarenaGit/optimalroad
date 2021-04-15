import React, {useState} from 'react';
import './App.css'
import {useCanvas} from './canvas_components/use_canvas'
import {Summit} from './canvas_components/components/summit'
import {Line} from './canvas_components/components/line'
import {DraggableLine} from './canvas_components/components/draggableLine'
import {DraggableSummit} from './canvas_components/components/DraggableSummit'
import Tool from './components/Tools'
import {Tools} from './canvas_components/utilities/tools'
import {AlgoType} from './canvas_components/utilities/algoType'
import {createDemouchronArray, Demouchron} from './canvas_components/algorithms/algorithms'
import {Algorithm} from './canvas_components/utilities/algorithm'

import { Button, Divider, Paper, TextField, Typography } from '@material-ui/core';
import IconPoint from '@material-ui/icons/Settings'
import DropDown from './components/dropdown'
import IconOptions from '@material-ui/icons/TollTwoTone'
import backgroundImage from './images/vector-dark.jpg'
import {CircleRadius} from './canvas_components/utilities/circleRadius'
import {Color} from './canvas_components/utilities/color'
import Slide from './components/slider'
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert'

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
  const [selectedSummit, setSelectedSummit] = useState()
  const [selectedLine, setSelectedLine] = useState()
  const [selectedLineValue, setSelectedLineValue] = useState()
  const [openDialog, setOpenDialog] = useState(false);
  const [currentLineDraw, setCurrentLineDraw] = useState();
  const [currentLineDrawValue, setCurrentLineDrawValue] = useState();
  const [isError, setIsError] = useState(false)
  const [lineCurveIndex, setLineCurveIndex] =useState();
  
  let paintDraggableLine = false
  let currentLineCoordinate = []
  let trackerLine = false
  let trackerEndLineDraw = false
  let newLine = null

  
  const paintingDraggableLine = (event) => {
    if(!paintDraggableLine) return;
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
  const stopPaintingDraggableLine = (event) => {
    paintDraggableLine = false
    trackerLine = false
    newLine = null
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
 lines.forEach((line) => {
      if(line.getIndexBegin() == currentLineCoordinate[0][3] && line.getIndexEnd() == currentLineCoordinate[1][3]) {
        ok = false;
         return;
        }
     
    })
    
    resetColor()
    if(ok){
      setOpenDialog(true)
      setCurrentLineDraw(currentLineCoordinate)
    }
    
    currentLineCoordinate = [] 
    trackerEndLineDraw = false
 
  }

  const startPaintingDraggableLine = (event) => {
    paintDraggableLine  = true
    currentLineCoordinate = []
    trackerLine = false
    trackerEndLineDraw = false
    newLine = null
    
  }

  let paintDraggableSummit = false
  let draggableSummitIndex = null;
  let currentDraggableSummit = null;

  const paintingDraggableSummit = (event) => {
    if(!paintDraggableSummit) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const clientX =  event.clientX - rect.left
    const clientY = event.clientY - rect.top
    currentDraggableSummit = new DraggableSummit(draggableSummitIndex, clientX, clientY, CIRCLE_RADIUS, "X" + draggableSummitIndex);
    currentDraggableSummit.draw(canvasRef.current.getContext('2d'), canvasWidth, canvasHeight)
    summits.forEach((summit) => {
      summit.draw(canvasRef.current.getContext('2d'), canvasWidth, canvasHeight)  
    })
    lines.forEach((line) => { line.draw(canvasRef.current.getContext('2d'), canvasWidth, canvasHeight) })  
  }

  const startPaintingDraggableSummit = (event) => {
    if(event.which == 3) return;
    summits.forEach((summit) => {
      const rect = canvasRef.current.getBoundingClientRect();
    
        const clientX =  event.clientX - rect.left
        const clientY = event.clientY - rect.top
        if(summit.summitClick(clientX, clientY)){   
          paintDraggableSummit = true;
          draggableSummitIndex = summit.getIndex()
        }
    })
  }
  const stopPaintingDraggableSummit = (event) => {
     
     summits.forEach((summit) => {
       if(draggableSummitIndex == summit.getIndex()){
        
        const rect = canvasRef.current.getBoundingClientRect();
        const clientX =  event.clientX - rect.left
        const clientY = event.clientY - rect.top
         summit.setX(clientX)
         summit.setY(clientY)
       }
     })
     setSummits([...summits])
     let existsLine = false
     lines.forEach((line) => {
       if(draggableSummitIndex == line.getIndexBegin()){
        const rect = canvasRef.current.getBoundingClientRect();
        const clientX =  event.clientX - rect.left
        const clientY = event.clientY - rect.top
         line.setXBegin(clientX)
         line.setYBegin(clientY)
         existsLine = true
       }
       if(draggableSummitIndex == line.getIndexEnd()){
        const rect = canvasRef.current.getBoundingClientRect();
        const clientX =  event.clientX - rect.left
        const clientY = event.clientY - rect.top
         line.setXEnd(clientX)
         line.setYEnd(clientY)
         existsLine = true
       }
     })
     if(existsLine) setLines([...lines])
     paintDraggableSummit = false
     draggableSummitIndex = null;
     currentDraggableSummit = null;
  }

  React.useEffect(function setupListener(){
      const startPainting = (event) => {
      if(currentTool == Tools.line) {
         startPaintingDraggableLine(event)
         return;
      }
      if(currentTool == Tools.select){
        startPaintingDraggableSummit(event)
      }
    }
  
    const stopPainting = (event) => {
      
      if(currentTool == Tools.line && trackerEndLineDraw){
        stopPaintingDraggableLine(event);
        return;
      }
      if(currentTool == Tools.select){
        stopPaintingDraggableSummit(event)
        return;
      }
     
      
    }
    const paint = async (event) => {
      if(currentTool == Tools.line){
        paintingDraggableLine(event)
        return;
      }
      if(currentTool == Tools.select){
        paintingDraggableSummit(event)
        return;
      }
    }

   
    window.addEventListener('mousedown', startPainting )
    window.addEventListener('mouseup', stopPainting)
    window.addEventListener('mousemove', paint)
  
    return function cleanupListener(){
      window.removeEventListener('mousedown', startPainting)
      window.removeEventListener('mouseup', stopPainting)
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

  const selectionFunctionnality = (event) => {
    resetColor()
    setSelectedSummit()
    setSelectedLine()
    let isSummitSelected = false
    summits.forEach((summit) =>{
        const rect = canvasRef.current.getBoundingClientRect();
        const clientX =  event.clientX - rect.left
        const clientY = event.clientY - rect.top
        if(summit.summitClick(clientX, clientY)){   
          setSelectedSummit(summit.getIndex())
          summit.setColor(Color.activeColor)
          isSummitSelected = true
          setSelectedLine()
        }
    })
    if(isSummitSelected) setSummits([...summits])
    let isLineSelected = false
    lines.forEach((line) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const clientX =  event.clientX - rect.left
        const clientY = event.clientY - rect.top
        if(line.lineClick(clientX, clientY)){
          isLineSelected = true;
          line.setColor(Color.activeColor, Color.whiteColor)
          setSelectedLine(line)
          setSelectedLineValue(line.getValue())
          setSelectedSummit()
        }
    })
    if(isLineSelected) setLines([...lines])
  }
  const deleteSummit = (index) => {
    resetColor()
    let newSummits = []
    summits.forEach((summit) => {

      if(index != summit.getIndex()){
        if(summit.getIndex() < index) newSummits = [...newSummits, summit]
        else {
          let newIndex = summit.getIndex() - 1
          summit.setIndex(newIndex)
          summit.setLabel("X" + newIndex)
          newSummits = [...newSummits, summit]
        }
      }
      
    })
    summits = newSummits
    setSummits([...newSummits])
    let newCurentLines = []
   
    lines.forEach((line, i) => {

      if(line.getIndexBegin() != index && line.getIndexEnd() != index) {
        if(line.getIndexBegin() > index ){
          line.setIndexBegin(line.getIndexBegin() - 1)     
         }
        if(line.getIndexEnd() > index ){
          line.setIndexEnd(line.getIndexEnd() - 1)    
        }
        
        newCurentLines = [...newCurentLines, line]
       }
     
    })
    lines = newCurentLines
    setLines([...newCurentLines])
    setSelectedLine()
    setSelectedSummit()

  }
  const deleteLine = (li) => {
    resetColor()
    let newLines = []
    lines.forEach((line) => {
      if(line.getIndexBegin() == li.getIndexEnd() && line.getIndexEnd() == li.getIndexBegin()){
        line.setCurveIndex(null)
      }
      if(line.getIndexBegin() == li.getIndexBegin() && line.getIndexEnd() == li.getIndexEnd()) {
          return
      }
      else newLines = [...newLines, line]
    })
    lines = newLines
    setLines([...lines])
    setSelectedLine()
    setSelectedSummit()
  }
  const handleCanvasClick =  (event) => {
      if(currentTool == Tools.summit){
         summitFunctionnality(event)
      }
      if(currentTool == Tools.select){
        selectionFunctionnality(event)
      }
  } 

  const handleClearCanvas = (event) => {
      
      setCurrentTool(Tools.clear)
      setSelectedLine()
      setSelectedSummit()
      setSelectedLineValue()
      setSummits([]);
      setLines([]);
      resetCurrentDetail()
  }
  const handleSummitTool = (e) => {
      resetColor()
      setSelectedLine()
      setSelectedSummit()
      setSelectedLineValue()
      setCurrentTool(Tools.summit)
  }
  const handleLineTool = (e) => {
      resetColor()
      setSelectedLine()
      setSelectedSummit()
      setSelectedLineValue()
      setCurrentTool(Tools.line)
  }
  const handleSelectionTool = (e) =>{
      resetColor()
      setSelectedLine()
      setSelectedSummit()
      setSelectedLineValue()
      setCurrentTool(Tools.select)
  }

  const  handleComputeRoad = async (e) => {
      resetColor()
      currentArrayDetail = []
      setCurrentArrayDetail([])
      let d = []
      let initialMatrice = []
      d = createDemouchronArray(summits.length, summits.length, currentAlgoType)
      initialMatrice = createDemouchronArray(summits.length, summits.length, currentAlgoType);
      
      lines.forEach((line) => {
          let idx = line.getIndex();
          let row = idx[0] -1;
          let col = idx[1] - 1;
          let value = line.getValue();
          d[row][col] = value;
          initialMatrice[row][col] = value;
      })
      
     Demouchron(currentAlgoType, d, initialMatrice, currentAlgorithm, addDetail, getResult)
     .then((resp) => { changeGraphColor(resp); d = []; initialMatrice = [] })
     .catch((err) => {setIsError(true); setTimeout(() => setIsError(false), 2000)} )

     
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
  const changeLinevalue = (event, li) => {
    resetColor()
    let isLineSelected = false
    lines.forEach((line) => {
        if(line.getIndexBegin() == li.getIndexBegin() && line.getIndexEnd() == li.getIndexEnd()){
          if(!isNaN(parseInt(event.target.value))){
            line.setValue(parseInt(event.target.value))
            
          }
          else{
            line.setValue(0)
          }
          isLineSelected = true
        }
    })
    if(isLineSelected) setLines([...lines])
    setSelectedLineValue(event.target.value)
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
    const selectedLineView = (line) => {
      if(line != null){
        return (
        <>
          {`x${line.getIndexBegin()} > x${line.getIndexEnd()}`}
        </>)
      }
    }

    const useStyles = makeStyles({
      root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: Color.whiteColor
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: Color.whiteColor
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: Color.whiteColor
        }
      }
    });
    const classes = useStyles();

  const summitPropertiesView = (index) => {
    return(
      <>
          <div style={{ 
                       
                       height: 50,
                       
                       display:"flex",
                       alignItems: "stretch",
                       justifyContent:"space-between",
                       marginRight: 10,
                       marginLeft: 10,
                      }} >
                         <Typography style={{width: 50, height: "inherit", display:"flex", justifyContent:"center", alignItems:"center", color: Color.whiteColor}}>x{index}</Typography>
                         <IconButton  aria-label="delete" onClick={() => deleteSummit(index)} >
                           <DeleteIcon style={{color: Color.whiteColor}} />
                         </IconButton>
                           
          </div> 
        
      </>
    )
  }

  const linePropertiesView = (value, line) => {
      return(
        <>
                       <div style={{ 
                       
                       height: 50,
                       
                       display:"flex",
                       alignItems: "stretch",
                       justifyContent:"space-between",
                       marginRight: 10,
                       marginLeft: 10,
                       marginBottom : 20
                      }} >
                        <Typography style={{ display:"flex", justifyContent:"center", alignItems:"center", color: Color.whiteColor}}>{selectedLineView(line)}</Typography>
                        <TextField
                         
                          value = {value}
                          className={classes.root}
                          onChange = {(event) => changeLinevalue(event, line)}
                          variant="outlined"
                          label=""
                          inputProps = {{
                            style : {
                              color: Color.whiteColor,
                              width: "50px",
                             
                            }
                          }}
                        />
                         <IconButton  aria-label="delete" onClick={() => deleteLine(line)} >
                           <DeleteIcon style={{color: Color.whiteColor}} />
                         </IconButton>
                           
                      </div> 
     
        
        </>
      )
  }

  const currentElementProperties = () => {
    if(selectedSummit != null){
      return(
        <>
         <div style={{ 
                       
                       height: 50,
                       
                       display:"flex",
                       alignItems: "stretch",
                       justifyContent:"space-between",
                       marginTop: 10,
                       marginRight: 10,
                       marginLeft: 10,
                      }} >
                         <Typography style={{height: "inherit", display:"flex", justifyContent:"center", alignItems:"center", color: Color.whiteColorWithOpacity, fontSize: 12}}>Sommet</Typography>
                         <Typography style={{height: "inherit", display:"flex", justifyContent:"center", alignItems:"center", color: Color.whiteColorWithOpacity, fontSize: 12}}>Action</Typography>                
          </div>
         {summitPropertiesView(selectedSummit)}
        </>
      )
    }
    if(selectedLine != null){
      return(
        <>
          <div style={{ 
                       
                       height: 50,
                       
                       display:"flex",
                       alignItems: "stretch",
                       justifyContent:"space-between",
                       marginTop: 10,
                       marginRight: 10,
                       marginLeft: 10,
                      }} >
                         <Typography style={{height: "inherit", display:"flex", justifyContent:"center", alignItems:"center", color: Color.whiteColorWithOpacity, fontSize: 12}}>Arc</Typography>
                         <Typography style={{height: "inherit", display:"flex", justifyContent:"center", alignItems:"center", color: Color.whiteColorWithOpacity, fontSize: 12}}>Valeur</Typography>
                         <Typography style={{height: "inherit", display:"flex", justifyContent:"center", alignItems:"center", color: Color.whiteColorWithOpacity, fontSize: 12}}>Action</Typography>
                           
                      </div>
          {linePropertiesView(selectedLineValue, selectedLine)}
        </>
      )
    }
  }
  const currentPropertiesView = () => {
    if(currentTool == Tools.select){
      return(
        <>
          {currentElementProperties()}
        </>
      )
    }
    if(currentTool == Tools.summit){
      return (
        <>
         <div style={{ 
                       
                       height: 50,
                       
                       display:"flex",
                       alignItems: "stretch",
                       justifyContent:"space-between",
                       marginTop: 10,
                       marginRight: 10,
                       marginLeft: 10,
                      }} >
                         <Typography style={{height: "inherit", display:"flex", justifyContent:"center", alignItems:"center", color: Color.whiteColorWithOpacity, fontSize: 12}}>Sommet</Typography>
                         <Typography style={{height: "inherit", display:"flex", justifyContent:"center", alignItems:"center", color: Color.whiteColorWithOpacity, fontSize: 12}}>Action</Typography>                
        </div>
        {summits.map((summit) => {
          return(
            <>
             {summitPropertiesView(summit.getIndex())}
            </>
          );
        })}
        </>
      )
    }
    if(currentTool == Tools.line){
      return(
        <>
            <div style={{ 
                       
                       height: 50,
                       
                       display:"flex",
                       alignItems: "stretch",
                       justifyContent:"space-between",
                       marginTop: 10,
                       marginRight: 10,
                       marginLeft: 10,
                      }} >
                         <Typography style={{height: "inherit", display:"flex", justifyContent:"center", alignItems:"center", color: Color.whiteColorWithOpacity, fontSize: 12}}>Arc</Typography>
                         <Typography style={{height: "inherit", display:"flex", justifyContent:"center", alignItems:"center", color: Color.whiteColorWithOpacity, fontSize: 12}}>Valeur</Typography>
                         <Typography style={{height: "inherit", display:"flex", justifyContent:"center", alignItems:"center", color: Color.whiteColorWithOpacity, fontSize: 12}}>Action</Typography>
                           
                      </div>
          {lines.map((line) => {
            return(
              <>
              {linePropertiesView(line.getValue(), line)}
              </>
            )
          })}
       
        </>
      )
    }
    
  }

  const styles = theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  
  const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6" style={{color: Color.whiteColor}}>{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles(theme => ({
    root: {
      padding: theme.spacing(2),
      color: Color.whiteColor,
    },
  
  }))(MuiDialogContent);
  
  const DialogActions = withStyles(theme => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
      color: Color.whiteColor
    },
  }))(MuiDialogActions);
  
    
  

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleAddLine = () => {
    if(!isNaN(parseInt(currentLineDrawValue))){
      let isCurvedLine =false
      lines.forEach((line) => {
        if(line.getIndexBegin() == currentLineDraw[1][3] && line.getIndexEnd() == currentLineDraw[0][3]){
          line.setCurveIndex(0)
          isCurvedLine = true
        }  
      })
      if(isCurvedLine) setLines([ ...lines, new Line (currentLineDraw[0][0], currentLineDraw[0][1], currentLineDraw[1][0], currentLineDraw[1][1], parseInt(currentLineDrawValue),  currentLineDraw[0][3], currentLineDraw[1][3], CIRCLE_RADIUS, null, 1)])
      else setLines([ ...lines, new Line (currentLineDraw[0][0], currentLineDraw[0][1], currentLineDraw[1][0], currentLineDraw[1][1], parseInt(currentLineDrawValue),  currentLineDraw[0][3], currentLineDraw[1][3], CIRCLE_RADIUS)])
   
   } 
  else setLineCoordinate([])
  setOpenDialog(false);
  setCurrentLineDrawValue()
  }
  const titleArcDialog = () => {
    if(currentLineDraw != null)
    {
      return(
        <>
        Veuiller saisir la distance entre X{currentLineDraw[0][3] ?? ""} et X{currentLineDraw[1][3] ?? ""} : 
        </>
      )
    }
  }

  const changeLineDrawValue = (event) => {
setCurrentLineDrawValue(event.target.value)
                        
  }

  const ErrorAlertView = () => {
    if(isError){
      return(
        <>
             <div style={{width: "30%", position: "fixed", zIndex: 16, top: 10, left: canvasWidth/2}}>
                  <Alert severity="error" onClose={() => {setIsError(false)}}>Erreur — <strong>Veuiller verifier votre graph, SVP!</strong></Alert>
              </div>
        </>
      )
    }
  }
    return (
       
         <div style = {{
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  width:"100%",
                  height: "100%"
                }}>
            {ErrorAlertView()}
            <Dialog  onClose={handleClose} aria-labelledby="customized-dialog-title" open={openDialog}>
                <DialogTitle style={{backgroundColor: Color.backgroundColor}} id="customized-dialog-title" onClose={handleClose}>
                   Valeur de l'arc
                </DialogTitle>
                <DialogContent style={{backgroundColor: Color.backgroundColor}} dividers>
                  <Typography style={{color: Color.whiteColor}} gutterBottom>
                  {titleArcDialog()}
                  </Typography>
                  <TextField
                         
                         fullWidth
                        autoFocus
                         value={currentLineDrawValue}
                         onKeyPress={(event) => {
                          
                          if (event.key === 'Enter') {
                            handleAddLine(event)
                            event.preventDefault();
                          }
                        }}
                         onSubmit = {handleAddLine}
                         onChange = {changeLineDrawValue}
                         label="..."
                         inputProps = {{
                           style : {
                             color: Color.whiteColor,
                           }
                         }}
                       />
                </DialogContent>
                <DialogActions style={{backgroundColor: Color.backgroundColor}}>
                  <Button  onClick={handleAddLine} style={{color: Color.whiteColor}}>
                    ok
                  </Button>
                </DialogActions>
              </Dialog>

                   
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
                      <Tool summitFunction = {handleSummitTool} clearFunction = {handleClearCanvas} selectFunction={handleSelectionTool}  lineFunction = {handleLineTool} />
                    </div>
                    <Paper style ={{
                      position: "absolute",
                      right: 0,
                      top:0,
                      width: 250,
                      height: canvasHeight,
                      backgroundColor: Color.backgroundColor,
                      zIndex: 5,
                      overflow: "auto"
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
                          <Typography variant="subtitle2" style={{
                           color: "white",
                           display: "flex"

                         }} >
                          <div style={{display:"flex", justifyContent: "center", alignItems:"center", marginRight: 10}} >
                          <IconOptions color="white" />
                          </div>
                          Propriétées
                         </Typography>
                           
                         </Typography>
                         
                       </div> 
                       <Divider style={{marginLeft: 10, marginRight:10, backgroundColor: Color.whiteColorWithOpacity, marginTop:20}} />
                       {currentPropertiesView()}
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