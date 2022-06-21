import React ,{useMemo} from 'react'
import image from '../imagencircular.png'

function ContainerGame({handleCard ,resizeWindow ,figureRandom ,files ,rows , game ,time  }) {
 
  let minutes = (Math.floor(time / 60000) % 60) 
  minutes = minutes === 0 ? 1 : 0
  const seconds = 60 - (Math.floor(time / 1000) % 60) 
   console.log(time , minutes , seconds)
   
  return (
    <div className="containerGame">
    <div className="boardContainer" style={game.remainingPairs === 0 || time === 0 ? {display: 'none'} :{ gridTemplateColumns :`repeat(${files}, ${resizeWindow()}px)` ,gridTemplateRows :`repeat(${rows}, ${resizeWindow()}px)`}}>
    {figureRandom?.map((item,index) => 
        <div key={index} className="card">
            <div className="cardFront" onClick={handleCard}><img className="back" src={image} alt='flechas'/></div>
            <div className="cardBack"><span className="emoji">{item}</span></div>
        </div>
    )}
       
    </div>
  <div className="win winner" style={time > 0 && game.remainingPairs > 0 ? {display:'none'} : {display:'grid'} } >
  {time > 0 && game.remainingPairs === 0 ? ( <span className="winText">
      You won! 😁<br />
     with <span className="highlight">{game.totalMoves}</span>{" "} moves<br />
      in <span className="highlight">{`${minutes === 0 ? '0' + minutes : minutes}:${seconds <= 9 ? '0' + seconds : seconds}`} {minutes === 0 ? 'seconds' : 'minutes'}</span>{" "}
    </span>)
    : time === 0 ? 
    <span className="winText">
       You Lose 😭<br />
      Your Time is over</span>
     : ''
    }
 </div>
</div>
  )
}

export default ContainerGame