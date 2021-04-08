import React, {useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { Container, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = (theme) => ({
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
  })

class ImagePicker extends React.Component{




    constructor(props){
        super(props);
        
        this.state = {
            currentImage : null,
            currentImageDisplay: null
        }

        props.tileData.map((val, idx) => {
            this[`ref_${idx}`] = React.createRef();
        });

        
    }

    render(){
        
        const { classes } = this.props;

       return(
        <div className={classes.root}>
     
        <div>
         <GridList cellHeight={160} className={classes.gridList} cols={3}>
           
           {this.props.tileData.map((tile, idx) => (
             
                   <GridListTile key={tile.img} style = {{cursor: "pointer"}} cols={tile.cols || 1}>
                       <div onClick={() => this.setState({
                           currentImage: this[`ref_${idx}`],
                           currentImageDisplay: tile.img
                       })}>
                           <img src={tile.img} alt={tile.title} ref={this[`ref_${idx}`]}  title= {tile.title} />
                       </div>
                   </GridListTile>
             
           ))}
         </GridList>
         
         <Button
                   variant="contained"
                   color="secondary"
                   onClick =  {() => this.props.onMakePrediction(this.state.currentImage)}
                   endIcon={<SendIcon />}
   
                   style = {{width: 125, height: 50, marginTop: 20,  marginBottom: 20}}
   
               >
                   Predict
          </Button>
            </div>
         <Container  className={classes.detailView}>
           {this.state.currentImageDisplay != null ?
           <img src = {this.state.currentImageDisplay} /> : "" 
           } 
         </Container>
       
       </div>
       );
    }

}

export default withStyles(styles)(ImagePicker);