import { useState , useCallback, useEffect, useRef} from 'react'


function App() {
  const[length , setLength] = useState(8)
  const[numberAllowed,setnumberAllowed] = useState(false)
  const[charAllowed,setcharAllowed] = useState(false)
  const[password,setpassword]=useState("")

  //useRef hook

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed)str+="!@#$%^&*()"
    for(let i = 1 ; i<=length;i++){
      let char = Math.floor(Math.random() * str.length+1)
      pass+=str.charAt(char)
      console.log(char)
    }
    setpassword(pass)
    
  },[length,numberAllowed,charAllowed,setpassword])

const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0,100)
window.navigator.clipboard.writeText(password)
},[password])

useEffect(()=>{
passwordGenerator()
},[length,numberAllowed,charAllowed,passwordGenerator])
  return (
    
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-green-950'
    >
      <h1 className='text-white text center mx-10 my-1'>password generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text" 
        value={password}
        className='outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef}/>
      
<button onClick={copyPasswordToClipboard} class="group relative h-12 overflow-hidden overflow-x-hidden rounded-md bg-neutral-950 px-8 py-2 text-neutral-50"><span class="relative z-10">copy</span><span class="absolute inset-0 overflow-hidden rounded-md"><span class="absolute left-0 aspect-square w-full origin-center -translate-x-full rounded-full bg-blue-500 transition-all duration-500 group-hover:-translate-x-0 group-hover:scale-150"></span></span></button>
      </div>
      <div className=''>
        <div>
          <input type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{
            setLength(e.target.value)
          }}/>
          <label>length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={()=>{
            setnumberAllowed((prev)=>! prev) 
          }}
          />
          <label>number</label>
        </div>
          <div className='flex items-center gap-x-1'>
          <input
          type='checkbox'
          defaultChecked={numberAllowed}
          id="charcterinput"
          onChange={()=>{
            setcharAllowed((prev)=>! prev)
          }}
          />
          <label>character</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
