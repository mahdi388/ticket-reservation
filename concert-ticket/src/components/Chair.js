import { useContext } from "react";
import { dispatchContext,hoverContext } from "../App";

function Chair({chair}) {
    const dispatch=useContext(dispatchContext)
    const [hover,setHover]=useContext(hoverContext)
    // console.log(useContext(hoverContext))
    return <div className={`chair ${chair.state}`}
                title={chair.price} 
                onMouseDown={()=>dispatch({type:1,data:chair.number})}
                onMouseOver={()=>{
                    if(hover){
                        dispatch({type:1,data:chair.number})
                    }
                }}
                onMouseUp={()=>setHover(false)}>
                    {chair.number}
                </div> 
}

export default Chair;