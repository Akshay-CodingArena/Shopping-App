import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {useState} from 'react';
import SearchList from "./MyLogic.js";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


export default function SearchAppBar({data=false}) {
  const [userInput,setUserInput] = useState("")
  const [arrSuggest,setSuggest] = useState(false);
  const [selectedValue, setSelectedValue] = useState(-1);

//  const [show,setShow] = useState()
  

  
  function initializedListeners(e){
    document.querySelector("#sList0").focus()
    setSelectedValue(0)
  }

  function findSelectedSuggestion(){
    var k = 0;  
    return function(e,i=k){
        console.log("inside list",e.keyCode, i)
        if(e.keyCode === 40){
        document.querySelector("#sList"+(i+1)).focus();
        
        } else if(e.keyCode === 38){
          document.querySelector("#sList"+(i-1)).focus();
        }

    }
  }

  const selectSuggestion = findSelectedSuggestion();
  document.querySelector("#sList0")?.addEventListener("keypress",selectSuggestion)
  

    


  console.log("Navigation",data, userInput)
  

// ---------------------- My Code -----------------------------

  function suggestionList(){
    if (userInput.length>0){
    const myarr = data.reduce((arr,item)=>{
          if(item?.title.search(userInput) >= 0)
              {  arr.push(item.title) 
                return arr  }
            return arr  
            },[])
    console.log("List",myarr)
    if(arrSuggest===false){
    setTimeout(()=>{
      console.log("Array Assigned")
      setSuggest(myarr);
    },0)}
    return myarr
    }
    return []
  }

  function debounce(){
    var id
    return (e)=>{
      console.log(document.activeElement)
    clearTimeout(id)
    console.log("Pressed key is",e.keyCode)
    if(e.keyCode === 40){
      initializedListeners(e)
    }
    else{
    id = setTimeout(() => {
      console.log("debounce",e.target.value)
      setUserInput(e.target.value)
    }, 1000);}
    
  }}
  

  if(document.activeElement.id.search("sList")>=0){
    console.log("sb set h")
    document.querySelector("#sList"+selectedValue).addEventListener("keypress",selectSuggestion)
  }
  
  const debounced = debounce()
  // Will return the inner function having var id already declared 

// ------------------- My Code End-----------------------------------

  return (
    <Box sx={{ flexGrow: 1 }}>
    {  data ?  <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onKeyUp = {(e)=>{debounced(e)
                              }}
              style = {{width:"40vw"}}
            /> 
         <SearchList data={data} arrSuggest= {arrSuggest} selectSuggestion={selectSuggestion} suggestionList={suggestionList()}/> 
            </Search>
        </Toolbar>
      </AppBar> : <h1>Loading.................</h1> }
     

    </Box>    

  );
}
