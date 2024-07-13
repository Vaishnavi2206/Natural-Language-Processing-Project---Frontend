import React, { useEffect, useState } from 'react'
import videoBg from '../assets/videoBg.mp4'
import SearchBox from '../Search/SearchBox'
import InfiniteScrollTable from '../Table/InfiniteScrollTable'
import axios from 'axios'

const Main = () => {
    const [inputValue, setInputValue] = useState('');
    const receiveInput = (data)=>{
        console.log("data",data)
        setInputValue(data);
    }

    
  return (
    <div className='main'>
        <div className="overlay"></div>
        <video src={videoBg} autoPlay loop muted />
        <div className="content">
           <SearchBox sendSearchInput = {receiveInput}/>
           <InfiniteScrollTable inputValue={inputValue}/>
        </div>
    </div>
  )
}

export default Main