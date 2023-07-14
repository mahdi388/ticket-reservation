import {useEffect,useReducer} from 'react'
import './App.css'
import Chair from './components/Chair'

const reducer=(state,{type,data})=>{
  switch(type){
    case 0:
      return data
    default:
      return state
  }
}

function App() {
  const [state,dispatch]=useReducer(reducer,'[]')
  
  useEffect(()=>{
    fetch('/chairs.json')
    .then(res=>res.json())
    .then(res=>dispatch({type:0,data:JSON.stringify(res)}))
  },[])

  return <>
    <div className="stage">
      stage
    </div>
    <div className="front-chairs">
      <div className="b">
        {JSON.parse(state).map(i=>{
          if(i.section=='B'){
            return <Chair chair={i}/>
          }
        })}
      </div>
      <div className="a">
        {JSON.parse(state).map(i=>{
          if(i.section=='A'){
            return <Chair chair={i}/>
          }
        })}
      </div>
      <div className="c">
        {JSON.parse(state).map(i=>{
          if(i.section=='C'){
            return <Chair chair={i}/>
          }
        })}
      </div>
    </div>
    <div className="back-chairs">
      {JSON.parse(state).map(i=>{
        if(i.section=='D'){
          return <Chair chair={i}/>
        }
      })}
    </div>
  </>;
}

export default App;