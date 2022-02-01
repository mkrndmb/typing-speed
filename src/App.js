import './App.css';
import {useEffect, useState ,useRef} from 'react'

const words = ["but","little","first","words","called","people","going","still","mane","important","does","us","asked","different","me","through","big","mile","so","word","next","give","small","men","from","what","we","than","out","many","as","back","children","see","all","really","put","later","great","question","her","always","around","same","right","hear","here","eat","side","country","on","sometimes","you","had","soon","carry","add","high","know","city","far","at","each","car","read","time","there","kind","made","came","no","something","plant","school","air","change","water","paper","river","idea","found","open","number","how","eye","has","long","tree","talk","want","mountain","about","near","or","again","list","almost","while","would","life","make","set","girl","well","last","large","enough","them","only","show","some","most","once","can","take","could","like","two","in","head","their","state","mean","begin","it","to","think","way","will","young","my","family","should","name","which","say","these","up","after","those","together","world","took","under","not","learn","said","good","thing","who","white","day","left","where","part","because","before","never","try","get","are","tell","ask","house","place","run","with","him","just","saw","thought","might","and","between","man","any","our","his","go","over","an","turn","much","cut","into","another","your","point","by","write","help","every","its","example","start","too","sound","boy","call","now","be","letter","both","face","live","animal","other","end","if","follow","then","do","above","this","three","the","miss","oil","seem","line","away","was","let","that","why","find","have","come","below","old","they","did","new","answer","hand","without","is","book","form","work","until","when","quickly","feet","move","went","sentence","food","year","she","stop","may","sea","play","quick","spell","group","of","also","home","along","been","song","second","being","very","one","story","even","off","such","page","hard","down","use","light","own","look","land","few","often","got","don't","father","more","leave","must","mother","it's","were","walk","watch","picture","quite","close","for","he","study","keep","four"]

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

shuffle(words)

let x=0
console.log('outside')

function App() {

  const [seconds,setSeconds] = useState(60)
  // const [minute,setMinute] = useState(1)
  const [input,setInput] = useState('')
  const [highScore,setHighScore] = useState(localStorage.getItem('highScore'))
  
  const cl = useRef(null)
  const count = useRef(0)
  const score = useRef(0)
  const reff = useRef(null)
  const focusRef = useRef(null)
  const temp = useRef(0)
  const minute = useRef(1)
 
  const handleInput = (e) =>{
    setInput(e.target.value)
    temp.current++
    if(temp.current===1){
      handleStart()
    }
  }
  const handleStart=()=>{
   
     cl.current = setInterval( () => {
      setSeconds((seconds)=>seconds-1)
      }, 1000);
  }

  const handleStop=()=>{
    clearInterval(cl.current)
    setInput('')
    focusRef.current.blur()
    if(score.current>localStorage.getItem('highScore'))
    {
      localStorage.setItem('highScore', score.current)
      setHighScore(score.current)
    }
  }

  const handleReset=()=>{
    clearInterval(cl.current)
    minute.current=1
    setSeconds(60)
    shuffle(words)
    x=0
    Array.from(reff.current.children).forEach(child=>{
      child.style.color=''
      child.style.backgroundColor=''
    })
    count.current=0
    score.current=0
    temp.current=0
    setInput('')
  }

  const handleKeyPress=(e)=>{
    if(e.code==='Space'){
      reff.current.children[count.current].style.backgroundColor=''
      // reff.current.children[count.current+1].style.backgroundColor='#D67D3E'
      if(input===words[count.current]){
        reff.current.children[count.current].style.color='#06FF00'
        score.current++
      }else{
        reff.current.children[count.current].style.color='#F90716'
      }
      
      count.current++
      x++
      setInput('')
      if(count.current%11===0){
        words.splice(0,11)
        count.current=0
      }
    }
  }
  
  useEffect(() => {
    
    focusRef.current.focus()
    reff.current.children[count.current].style.backgroundColor='#D67D3E'
    reff.current.children[count.current].style.borderRadius='5px'
    
    // if(seconds===60){
    //   minute.current=0
    // }
    if(seconds===0){
      // setSeconds(60)
        handleStop()
    }
    
  }, [seconds,input,highScore]);
    
  
 

  return (
    <div className="App">
      <header className="App-header">
      <p style={{position:'absolute',top:'50px',right:'50px'}}>High Score : {highScore} WPM</p>
        <div ref={reff} style={{border:'1px solid wheat',maxWidth:'55vw',maxHeight:'13vh',overflow:'clip',display:'flex',flexWrap:'wrap',padding:'6px'}}>{words.map(word=><span style={{marginLeft:'10px',padding:'5px'}} key={word}>{word}</span>)}</div>
        <h2>{seconds===0 && score.current + ' WPM'}</h2> 
        <p>{seconds===0 && ' Accuracy: '+ ((score.current*100)/x).toFixed() + ' %'} </p>
        <input ref={focusRef} style={{marginTop:'30px',padding:'10px',fontSize:'20px'}} type ='text' value={input.trim()} onChange={handleInput} onKeyDown={handleKeyPress} tabIndex="0"/>
          <h1>{seconds<60 ? '0'+ 0 : '01'}:{seconds<10 ? '0'+seconds : seconds===60 ? '00' :seconds }</h1>
        {/* <button type='button' style={{}} onClick={handleStart}>Start</button>
        <button type='button' style={{}} onClick={handleStop}>Stop</button> */}
        <button type='button' className='reset-butt' onClick={handleReset}>Reset</button>
      </header>
    </div>
  );
}

export default App;
