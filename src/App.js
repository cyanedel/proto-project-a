import { useEffect, useState } from 'react';
import './App.css';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

import { ReactComponent as IconHat } from './assets/hat.svg';

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
  const [cardNum, setCardNum] = useState(0);
  const [cardList, setCardList] = useState([]);
  const [cardStatelist, setCardStatelist] = useState([])

  function generateOptions(nMin, nMax){
    let a = []
    for(let i=nMin; i<=nMax;i++){
      if(i%2===0){
        a.push(i)
      }
    }
    return a
  }

  function shuffle(array) {
    const shuffled = array.slice();
    shuffled.sort(() => Math.random() - 0.5);
    return shuffled;
  }

  function RenderButtons({optMin, optMax}){
    const opt = generateOptions(optMin, optMax)
    return opt.map((item, index)=>{
      return <Col key={index}>
        <Button variant={`${cardNum===item ? "success": "dark" }`} className='w-100' onClick={()=>{setCardNum(item)}}>{item}</Button>
      </Col>
    })
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
    // const defaultCardState = Array(cardNum).fill(false)
    // const shuffledWithState = shuffled.map((item)=>{return [item, false]})
    setCardList(shuffled)
    setCardStatelist(Array(cardNum).fill(false))
  }, [cardNum])

  function handleCardClick(cardIndex){
    setCardStatelist(prevState => prevState.map((item, index)=>{
      return index === cardIndex ? !item : item
    }))
  }

  return (
    <div className="App">
      <Container className='my-5 mw-1'>
        {/* <div>{cardList}</div> */}
        <div className='mb-3'>Playing with: {cardNum} cards</div>
        <Row className='g-2 align-items-center justify-content-center'>
          {cardList.map((item, index)=>{
            return (
              <Card key={index} className={`m-1 p-3 d-flex shadow ${cardStatelist[index] ? "flip": ""}`} onClick={()=>handleCardClick(index)}>
                <div className='card-front bg-light text-black'>{cardStatelist[index] ? item[1] : ""}</div>
                <div className='card-back bg-dark'><IconHat width="64" height="64" className='fill-white' /></div>
              </Card>
              )
          })}
        </Row>
      </Container>
      <Container className='my-5 mw-2'>
        <div className='mb-3'>Select Number of Cards to Play</div>
        <Row xs={3} className='g-2'>
          <RenderButtons optMin={4} optMax={20} />
        </Row>
      </Container>
    </div>
  );
}

export default App;
