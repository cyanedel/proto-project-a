import { useEffect, useState } from 'react';
import './App.css';
import { Container, Row, Button, Card } from 'react-bootstrap';
import ModalConfig from './component/modal-config';

import { ReactComponent as IconHat } from './assets/hat.svg';
import { ReactComponent as IconCog } from './assets/cog-wheel.svg';

import { ReactComponent as IconFlame } from './assets/flames.svg';
import { ReactComponent as IconWater } from './assets/water.svg';
import { ReactComponent as IconLeaf } from './assets/leaf.svg';
import { ReactComponent as IconStone } from './assets/stone.svg';
import { ReactComponent as IconMedal } from './assets/gold-medal.svg';
import { ReactComponent as IconDiamond } from './assets/diamond.svg';
import { ReactComponent as IconRocket } from './assets/shuttle.svg';
import { ReactComponent as IconRabbit } from './assets/rabbit.svg';
import { ReactComponent as IconDragon } from './assets/dragon.svg';
import { ReactComponent as IconPoop } from './assets/poop.svg';
import { ReactComponent as IconZeus } from './assets/zeus.svg';

function App() {
  const [oScore, setOScore] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [showModalConfig, setShowModalConfig] = useState(false);
  const [cardNum, setCardNum] = useState(0);
  const [cardList, setCardList] = useState([]);
  const [cardStatelist, setCardStatelist] = useState([]);
  const [cardCompare, setCardCompare] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);

  function shuffle(array) {
    const shuffled = array.slice();
    shuffled.sort(() => Math.random() - 0.5);
    return shuffled;
  }

  useEffect(()=>{
    const variants = [
        [1, <IconFlame width="64" height="64" />]
      , [2, <IconWater width="64" height="64" />]
      , [3, <IconStone width="64" height="64" />]
      , [4, <IconLeaf width="64" height="64" />]
      , [5, <IconDiamond width="64" height="64" />]
      , [6, <IconRabbit width="64" height="64" />]
      , [7, <IconPoop width="64" height="64" />]
      , [8, <IconDragon width="64" height="64" />]
      , [9, <IconRocket width="64" height="64" />]
      , [10, <IconMedal width="64" height="64" />]
      , [11, <IconZeus width="64" height="64" />]
    ]
    const shuffledVariants = shuffle(variants)
    const base = shuffledVariants.slice(0,cardNum/2)
    const dups = base.concat(base)
    const shuffled = shuffle(dups)
    setCardList(shuffled)
    setCardStatelist(Array(cardNum).fill(false))
    setCardCompare([])
    setGameScore(0)
  }, [cardNum])

  useEffect(()=>{
    if(cardCompare.length === 2){
      setShowOverlay(true)
      console.log(cardCompare)
      setTimeout(() => {
        if(cardCompare[0][1] === cardCompare[1][1]){
          setGameScore(gs=>gs+1)
          console.log('same!')
        } else {
          cardCompare.forEach( item => {
            setCardStatelist(prevState => prevState.map((item2, index)=>{
              return index === item[0] ? false : item2
            }))
          })
        }
        setCardCompare([])
        setShowOverlay(false)
      }, 1000);
    }
  }, [cardCompare])

  useEffect(()=>{
    if(gameScore === cardNum/2){
      setOScore(ogs=>ogs+cardNum)
    }
  }, [gameScore, cardNum])

  function handleCardClick(cardIndex, cardTrueVal){
    if(!cardStatelist[cardIndex]){
      setCardStatelist(prevState => prevState.map((item, index)=>{
        return index === cardIndex ? !item : item
      }))
  
      const prevCardCompare = cardCompare.slice()
      prevCardCompare.push([cardIndex, cardTrueVal])
      setCardCompare(prevCardCompare)
    }
  }

  return (
    <div className="App mt-3 mb-5">
      {showOverlay ? <div className='game-overlay'></div> : <></>}
      <ModalConfig
        show={showModalConfig}
        handleClose={()=>{setShowModalConfig(false)}}
        cardNum={cardNum}
        setCardNum={setCardNum}
      />
      <Container>
        <div className='d-flex align-items-center justify-content-between bg-light p-3 rounded'>
          <div><p className='fw-bold fs-4 m-0'>Overall score: {oScore}</p></div>
          <div className='holder-game-conf'>
            <Button variant='light' className='btn-game-conf' onClick={()=>{setShowModalConfig(true)}}><IconCog height={24} width={24} /></Button>
          </div>
        </div>
      </Container>
      <Container className='mt-3 mb-5'>
        <div className='mb-3'>Playing with: {cardNum} cards</div>
        <Row className='g-2 align-items-center justify-content-center'>
          {cardList.map((item, index)=>{
            return (
              <Card key={index} className={`m-1 p-3 d-flex shadow ${cardStatelist[index] ? "flip": ""}`} onClick={()=>handleCardClick(index, item[0])}>
                <div className='card-front bg-light text-black'>{cardStatelist[index] ? item[1] : ""}</div>
                <div className='card-back bg-dark'><IconHat width="64" height="64" className='fill-white' /></div>
              </Card>
              )
          })}
        </Row>
      </Container>
    </div>
  );
}

export default App;
