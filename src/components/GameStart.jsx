import React, {useState , useMemo , useCallback ,useContext , useEffect} from 'react'
import{useNavigate, useSearchParams  } from "react-router-dom"
import ContainerGame from './ContainerGame';
import Timer from './Timer';
import { StoreContext } from '../store/storeProvider';
import {FaReply} from "react-icons/fa";
import {Howl} from 'howler';
import useSound from 'use-sound';
import sound from '../sounds/angry_birds.mp3'
import gameOver from '../sounds/candy_crush_nivel_no_completado.mp3'
import matched from '../sounds/candy_crush_bomba_de_color_creada.mp3'
import winner from '../sounds/mario_kart_wii_fanfare.mp3'
function GameStart() {
    let audioGame = new Audio(matched)
    audioGame.volume = 0.05
    const [audio , setAudio] = useState(audioGame)
   
 const [play] = useSound(gameOver, { volume: 0.05 });
    
    let soundGame = useMemo(()=> new Howl({
        src: [sound],
        autoplay: true,
        loop: true,
        volume: 0.007,
      }),[]);

   let soundWin = useMemo(()=> new Howl({
        src: [winner],
        autoplay: false,
        loop: false,
        volume: 0.05,
      }),[]);

    const [searchParams] = useSearchParams();
    const files = searchParams.get('files')
    const rows= searchParams.get('rows')
    const level = searchParams.get('level')
    const navigate = useNavigate()
    let figure = []
    if(level === 'easy') figure = ['🍿', '🥣', '🥗', '🍜', '🍲', '🍛', '🍝', '🍚'];
    else if(level === 'normal') figure = ['🍡', '🎂', '🍫', '🍭', '🍦', '🍧', '🍨', '🍰', '🍪', '🍩', '🍮', '🍬'];
    else figure =  ['🍎', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🍅', '🍄', '🥥', '🥝', '🍋', '🍊', '🍍'];
    
   
   //shuffle function           
   //shuffle devuelve un array aleatorio a partir del array original

    const shuffle = array => {                   
        const clonedArray = [...array]
    
        for (let index = clonedArray.length - 1; index > 0; index--) {
            const randomIndex = Math.floor(Math.random() * (index + 1))
            const original = clonedArray[index]
    
            clonedArray[index] = clonedArray[randomIndex]
            clonedArray[randomIndex] = original
        }
         
         
        return clonedArray
    }
  
  
   
   let figureRandom =  useMemo(()=> shuffle([...figure,...figure]) ,[])
   const [store , dispatch] = useContext(StoreContext)
   const {timer}= store
  
    const [game , setGame] = useState({
        totalMoves: 0,
      remainingPairs: figure.length
    })
   

     useEffect(() => {
        soundGame.play()
        
        return () =>{ soundGame.stop()}
      },
      [soundGame]
    ); 
   
    if(timer === 0 || game.remainingPairs === 0){
         soundGame.stop()
        if(game.remainingPairs !== 0) play()
        else{
           soundWin.play()
        }
    }
    
    let flip = 0
 
 
 
  const resizeWindow = () => {                                                    //al cambiar el tamaño de la pantalla, para que cuadros se adapten a móvil
        if(window.matchMedia("(max-width: 720px)").matches){
            
            return 60;
        }else{
            return 100;
        }   
    }
    
        
       const flipBackCards = () => {                                      //flip back cards    //flipBackCards es llamada en la linea 101, y comprueba si las tarjetas coinciden
            document.querySelectorAll('.card:not(.matched)').forEach(card => { 
                console.log(card)                               //selecciona todas las tarjetas que no estén marcadas como matched
                card.classList.remove('flipped')               //remueve la clase flipped que las asigna la linea 84, si es que no tiene la clase matched
            })
           flip = 0                              //reinicia el contador de tarjetas volteadas
                                       
        }
    
        const flipCard = card => {                      //flip card function //flipCard es una función que se ejecuta cuando se hace click en una tarjeta
            flip++                                                          
            setGame({
                ...game,
                totalMoves: ++game.totalMoves                    //incrementa el contador de movimientos
            })                                                
    
            if (flip <= 2) {                             //comprueba si el contador de tarjetas volteadas es menor o igual a 2
                                          
                card.classList.add('flipped')           //si es así, añade la clase flipped a la tarjeta
            }
        
            if (flip === 2) {                                                                     //comprueba si el contador de tarjetas volteadas es igual a 2
                const flippedCards = document.querySelectorAll('.flipped:not(.matched)')                        //selecciona todas las tarjetas que no estén marcadas con la clase matched (las que ya tengan la clase, no las toca)
        
                if (flippedCards[0].innerText === flippedCards[1].innerText) {                                  //comprueba si el contenido de las tarjetas volteadas es igual entre ellas (por esto use emojis, aunque con imágenes seria comprobar sus id o clases)	
                    flippedCards[0].classList.add('matched')
                    flippedCards[1].classList.add('matched')
                   
                    setAudio(audio.play())
                    setGame({
                        ...game,
                       remainingPairs: --game.remainingPairs
                    })                                                                      //cada vez que se encuentran parejas, resta 1 al contador de parejas (remainingPairs)
                }
        
                setTimeout(() => { 
                                                                                              //llama a la función flipBackCards después de medio segundo
                    flipBackCards()
                }, 650)
            }
           
    
        }
    
    const handleCard =(e)=>{
       console.log(game)
        const eventTarget = e.target
        const eventParent = eventTarget.parentElement                                                   //eventParent almacena el nombre del padre del elemento que se ha pulsado
      
             //comprueba si el elemento pulsado tiene la clase card y no tiene la clase flipped
             if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')){
                
            flipCard(eventParent)                                                                       //llama a la función flipCard que es la que se encarga de comprobar la tarjeta, para darle vuelta
             }
        
    }
       const handleCardMemo =  useCallback((e) => handleCard(e), []);
  return (
    <section >
        <div className="stats">
           
            < FaReply className="back" onClick={()=> navigate('/')}/>
            <div className="moves">{game.totalMoves} moves</div>
            <div className="pairs">Remaining pairs:{game.remainingPairs}</div>
            <Timer remainingPairs={game.remainingPairs} />

        </div>
         <ContainerGame  resizeWindow = {resizeWindow} 
         handleCard={handleCardMemo} figureRandom={figureRandom} 
         files={files} rows={rows} game = {game} time={timer} soundGame={soundGame}/>
         
    </section>
  )
}

export default GameStart