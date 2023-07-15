import {useEffect,useReducer,createContext,useState} from 'react'
import './App.css'
import Chair from './components/Chair'

export const dispatchContext=createContext()
export const hoverContext=createContext()

function App() {
  const [hover,setHover]=useState(false)
  const [count,setCount]=useState(0)
  const [sum,setSum]=useState(0)
  const reducer=(state,{type,data})=>{
    switch(type){
      case 0:
        return data
      case 1:
        let temp=[]
        for (let chair of JSON.parse(state)) {
          if(chair.number==data){
            switch(chair.state){
              case "unselected":
                chair.state="selected"
                break
              case "selected":
                chair.state="ready"
                setTimeout(() => {
                  dispatch({type:2,data:chair.number})
                }, 10000);
                break
              case "ready":
                chair.state="reserve"
                setCount(count+1)
                setSum(sum+chair.price)
            }
          }
          temp.push(chair)
        }
        setHover(true)
        return JSON.stringify(temp)
      case 2:
        let chairs=[]
        for (let chair of JSON.parse(state)) {
          if(chair.number==data && chair.state=="ready"){
            chair.state="unselected"
          }
          chairs.push(chair)
        }
        return JSON.stringify(chairs)
      default:
        return state
    }
  }
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
    <div className='count-sum'>
      <div>
        count : {count}
      </div>

      <div>
        sum : {sum}
      </div>
    </div>
    <dispatchContext.Provider value={dispatch}>
      <hoverContext.Provider value={[hover,setHover]}>
        <div className="front-chairs" onMouseLeave={()=>setHover(false)}>
          <div className="b">
            {JSON.parse(state).map(i=>{
              if(i.section=='B'){
                return <Chair chair={i} key={i.bumber}/>
              }
            })}
          </div>
          <div className="a">
            {JSON.parse(state).map(i=>{
              if(i.section=='A'){
                return <Chair chair={i} key={i.bumber}/>
              }
            })}
          </div>
          <div className="c">
            {JSON.parse(state).map(i=>{
              if(i.section=='C'){
                return <Chair chair={i} key={i.bumber}/>
              }
            })}
          </div>
        </div>
        <div className="back-chairs" onMouseLeave={()=>setHover(false)}>
          {JSON.parse(state).map(i=>{
            if(i.section=='D'){
              return <Chair chair={i} key={i.bumber}/>
            }
          })}
        </div>
      </hoverContext.Provider>
    </dispatchContext.Provider>
  </>;
}

export default App;