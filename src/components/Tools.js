import React, {useState} from 'react';

import ButtonGroup from '@material-ui/core/ButtonGroup'
import {makeStyles} from '@material-ui/core/styles'

import IconButton from '@material-ui/core/IconButton'
import Delete from '@material-ui/icons/DeleteForever'
import Arrow from '@material-ui/icons/ArrowRightAlt'
import Circle from '@material-ui/icons/Adjust'
import Selection from '@material-ui/icons/TouchApp'
import {Color} from '../canvas_components/utilities/color'

const useStyles = makeStyles((theme) => ({
    root :{
        display : "flex",
        '& > *' : {
            margin: theme.spacing(1)
        }
    }
}))


export default function Tools({summitFunction, lineFunction, selectFunction, clearFunction}){
    const classes = useStyles();
    const activeColor = Color.whiteColor
    const inactiveColor = Color.activeColor
    const [activeSummit, setActiveSummit] = useState(activeColor)
    const [activeLine, setActiveLine] = useState(inactiveColor)
    const [activeSelect, setActiveSelect] = useState(inactiveColor)
    const [activeClear, setActiveClear] = useState(inactiveColor)

    return(
       
            <ButtonGroup
            orientation = "vertical"
            color = 'primary'
            aria-label = 'vertical outlined'
            
            style = {{
                marginLeft: 15
            }}
            >
               <IconButton
               title ='Sommet'
               aria-label = "node"
               onClick = {() => {
                   setActiveSummit(activeColor)
                   setActiveLine(inactiveColor)
                   setActiveSelect(inactiveColor)
                   setActiveClear(inactiveColor)
                   summitFunction()
                }}
               style = {{
                   marginLeft: 15,
                   backgroundColor: Color.backgroundColor,
                   color: activeSummit
                   
               }} 
                >
                   <Circle />
               </IconButton>
               <IconButton
               title ='Ligne'
               aria-label = "node"
               onClick = {() => {
                setActiveSummit(inactiveColor)
                setActiveLine(activeColor)
                setActiveSelect(inactiveColor)
                setActiveClear(inactiveColor)
                   lineFunction()
                }}
               style = {{
                   marginLeft: 15,
                   backgroundColor: Color.backgroundColor,
                   color: activeLine
               }} 
                >
                    <Arrow /> 
               </IconButton>

               <IconButton
               title ='Selection'
               aria-label = "node"
               onClick = {() => {
                setActiveSummit(inactiveColor)
                setActiveLine(inactiveColor)
                setActiveSelect(activeColor)
                setActiveClear(inactiveColor)
                    selectFunction()
                }}
               style = {{
                   marginLeft: 15,
                   backgroundColor: Color.backgroundColor,
                   color: activeSelect
               }} 
                >
                  <Selection />
               </IconButton>

               <IconButton
               title = "Suppression"
               aria-label = "node"
               onClick = {() => {
                setActiveSummit(inactiveColor)
                setActiveLine(inactiveColor)
                setActiveSelect(inactiveColor)
                setActiveClear(activeColor)
                clearFunction()
                
                }}
               style = {{
                   marginLeft: 15,
                   backgroundColor: Color.backgroundColor,
                   color: activeClear
               }} 
                >
                  <Delete />
               </IconButton>

            </ButtonGroup>
      

        
    )
}