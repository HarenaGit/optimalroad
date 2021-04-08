import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import DropDown from './dropdown'

const useStyles = makeStyles((theme) => ({
    root :{
        display : "flex",
        '& > *' : {
            margin: theme.spacing(1)
        }
    }
}))


export default function Tools(){
    const classes = useStyles();

    return(
       
           <div>
               <div style = {{display: "flex"}}>
                 <DropDown />
                 <DropDown />
               </div>
               <div style = {{display: "flex", justifyContent: "center", alignItems: "center"}}>
                 <Button>
                     Lancer
                 </Button>
               </div>
           </div>
    )
}