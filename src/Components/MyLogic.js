import {useEffect} from "react";

function SearchList({data,arrSuggest,selectSuggestion,suggestionList}){
    useEffect(()=>{
        console.log("I can")
        var index;
        for (index=0;index < arrSuggest.length-1; index++){
        let temp=index
        document.querySelector("#sList"+temp).addEventListener("keydown",(e)=>{console.log("Current Index",temp);selectSuggestion(e,temp)})
        }
        }
    )
    function findFocus(){
        console.log("Focus Finder of",document.activeElement.classList[0])
        if(document.activeElement.classList[0] === 'MuiInputBase-input'){
          document.querySelector('#suggestionContainer').classList.remove('NoSuggestions')
          console.log("Matched",document.querySelector('#suggestionContainer').classList)
       //   setShow(true)
         
        }
        else{
          document.querySelector('#suggestionContainer').classList.add('NoSuggestions')
          console.log("Unmatched", document.querySelector('#suggestionContainer').classList)
        //  setShow(false)
        }
      }
    document.body.addEventListener("click",findFocus)


   return (
    <div className="NoSuggestions" id='suggestionContainer' style={{maxHeight : '10em', overflowY: 'scroll',padding:'0px',zIndex:'2' ,position:"absolute",color:'grey',width:'100%', backgroundColor:'white' }}>
    { data && suggestionList.map((item,index)=>(<button style={{padding:'10px',width:"100%"}} id={"sList"+index} className="Suggestions" >{item}</button>)) }
   </div>)

}


export default SearchList;