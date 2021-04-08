import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Typography } from '@material-ui/core';
import {Color} from '../canvas_components/utilities/color'


export default function SplitButton({width, options, defaultIndex, onChange }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  
  const [selectedIndex, setSelectedIndex] = React.useState(defaultIndex ?? 0);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
    
  };

  const handleMenuItemClick = (event, index) => {
    
    onChange(options[index])
    setSelectedIndex(index);
    setOpen(false);
    
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container style={{
      backgroundColor: Color.backgroundColor,
      color: Color.whiteColor
    }} direction="column" alignItems="center">
      <Grid style={{
          backgroundColor: Color.backgroundColor,
          color: Color.whiteColor
        }} item xs={12}>
        <ButtonGroup  variant="outlined" style={{
          backgroundColor: Color.backgroundColor,
          color: Color.whiteColor
        }} ref={anchorRef} aria-label="split button">
          <Button style={{
         backgroundColor: Color.backgroundColor,
         color: Color.whiteColor
        }}  onClick={handleClick}><Typography variant="subtitle2" >{options[selectedIndex]}</Typography></Button>
          <Button

              style={{
                backgroundColor: Color.backgroundColor,
                color: Color.whiteColor
              }}
            color="default"
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon style={{
          backgroundColor: Color.backgroundColor,
          color: Color.whiteColor
        }} />
          </Button>
        </ButtonGroup>
        <Popper style={{
          backgroundColor: Color.backgroundColor,
          color: Color.whiteColor
        }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper
              style={{
                backgroundColor: Color.backgroundColor,
          color: Color.whiteColor
              }}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        disabled={index === 2}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}

