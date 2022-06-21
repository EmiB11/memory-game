import React ,{useState, useEffect} from 'react'
import { FaBaby , FaChild , FaSkull} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound'
import {Howl, Howler} from 'howler';
import mySound from '../sounds/crash_bandicoot_loading.mp3'
function Home() {
  const navigate = useNavigate()
  var sound = new Howl({
    src: [mySound],
    autoplay: true,
    loop: true,
    volume: 0.007,
  });
  useEffect(() => {
    sound.play()
    return () =>{ sound.stop()}
  },
  []
);
  const selectLevel = (level) =>{
       
       if (level === 'easy') navigate(`/game?level=easy&files=4&rows=4`)
      else if (level === 'normal') {
        if(window.matchMedia("(max-width: 720px)").matches){
          navigate(`/game?level=normal&files=4&rows=6`)
        
      }else{
        navigate(`/game?level=normal&files=6&rows=4`)
        
      }
       }else{
        if(window.matchMedia("(max-width: 720px)").matches){
          navigate(`/game?level=hard&files=5&rows=6`)
          
      }else{
        navigate(`/game?level=hard&files=6&rows=5`)
         
         
      }   
       }
      
   }
      
  return (
    
    <section className="containerHome">
    <h1 className="titleMain">Welcome To The Memory Game<br/><span className="title2">(of Emojis 😊, food version)</span></h1>
    <h3 className="subtitle">Select difficulty level 😕<span></span> </h3>
    <ul className="cardLevel">
        <li className="startEasy" onClick={()=> selectLevel('easy')}><FaBaby/>Easy</li>
        <li className="startNormal"onClick={()=> selectLevel('normal')}><FaChild />Normal</li>
        <li className="startHard"onClick={()=> selectLevel('hard')}><FaSkull/>Hard</li>
    </ul>
</section>
  
  )
}

export default Home












