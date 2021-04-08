import React, {useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { Container, Typography } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { registerCallbackConstructor } from '@tensorflow/tfjs';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    maxHeight: 500
  },
  detailView:{
      width: 500,
     
  }
}));

const useConstructor = (callBack = () => {}) => {
  const [hasBeenCalled, setHasBeenCalled] = useState(false);
  if (hasBeenCalled) return;
  callBack();
  setHasBeenCalled(true);
}

export default function ImageGridList(props) {

  useConstructor(() => {
    console.log(
      "This only happens ONCE and it happens BEFORE the initial render."
    );
  });

  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState(null);

 


  return (
    <div className={classes.root}>
     
     <div>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        
        {props.tileData.map((tile) => (
          
                <GridListTile key={tile.img} style = {{cursor: "pointer"}} cols={tile.cols || 1}>
                    <div onClick={() => setCurrentImage(tile.img)}>
                        <img src={tile.img} alt={tile.title}  title= {tile.title} />
                    </div>
                </GridListTile>
          
        ))}
      </GridList>
      
      <Button
                variant="contained"
                color="secondary"
                onClick =  {() => props.onMakePrediction(currentImage)}
                endIcon={<SendIcon />}

                style = {{width: 125, height: 50, marginTop: 20,  marginBottom: 20}}

            >
                Predict
       </Button>
         </div>
      <Container  className={classes.detailView}>
        {currentImage != null ?
        <img src = {currentImage} /> : "" 
        } 
      </Container>
    
    </div>
  );
}
