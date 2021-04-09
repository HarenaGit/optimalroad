import React from 'react';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import {Color} from '../canvas_components/utilities/color'
import IconPoint from '@material-ui/icons/ChevronLeft'
import IconPointRight from '@material-ui/icons/ChevronRight'
import IconButton from '@material-ui/core/IconButton'
const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  wrapper: {
   
  },
  paper: {
    zIndex: 1,
    position: 'relative',
    margin: theme.spacing(1),
   
  },
 
}));

export default function SimpleSlide(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const [active, setActive] = React.useState(Color.whiteColor)

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const handleIconChange = () => {
     if(active == Color.whiteColor){
       return(
          <>
            <IconPoint />
          </>
       );
     }
     else{
      return(
        <>
          <IconPointRight />
        </>
     );
     }
  }
  return (
    <div className={classes.root}>
      <Paper elevation={1} style={{backgroundColor:' rgba(255,255,255, 0.1)', position:'relative', right: 50, width: 50, height: 50}}  className={classes.paper}>     

        <IconButton
        title ='Details des calculs'
        aria-label = "node"
        onClick = {() => {
          
          setChecked((prev) => {
              if(!prev) setActive(Color.activeColor);
              else setActive(Color.whiteColor)
              return !prev;
          });
          
        }}
        style = {{
            
            color: active    
        }} 
       >
       {handleIconChange()}
   </IconButton>           

      </Paper>
      <div className={classes.wrapper}>
        <Slide style = {{
            positon: 'relative', 
            right: 50,
            top: -3,
            backgroundColor: Color.backgroundColor,
            maxwidth: props.maxWidth, minWidth: 100,
        }} direction="left"  in={checked} mountOnEnter unmountOnExit>
          <Paper elevation={1} style={{backgroundColor: 'rgba(0,0,0,0)', maxWidth: props.maxWidth, minWidth: 100, maxHeight: props.maxHeight, overflow: 'auto'}}  className={classes.paper}>     
            {props.children}           
          </Paper>
        </Slide>
      </div>
    </div>
  );
}
