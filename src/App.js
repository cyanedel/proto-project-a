import { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
// import { icons } from './component/icons';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

function App() {
  const [cardNum, setCardNum] = useState(0);
  const [cardList, setCardList] = useState([]);
  // const [cardStates, setCardStates] = useState([])

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
    const variants = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const base = variants.slice(0,cardNum/2)
    const dups = base.concat(base)
    const shuffled = shuffle(dups)
    const shuffledWithState = shuffled.map((item)=>{return [item, 0]})
    setCardList(shuffledWithState)
  }, [cardNum])

  function RenderCards(){
    return cardList.map((item, index)=>{
      return (
        <Card key={index} className="m-1 p-3 d-flex align-items-center justify-content-center" style={{height: 120, width: 120}}>
          {item[0]}, {item[1]}
        </Card>
        )
    })
  }

  return (
    <div className="App">
      <Container className='my-5' style={{maxWidth: 720}}>
        <div className='mb-3'>Playing with: {cardNum} cards</div>
        <Row className='g-2 align-items-center justify-content-center'>
          {cardNum ? <RenderCards /> : <></>}
        </Row>
        
      </Container>
      <Container style={{maxWidth: 480}} className='my-5'>
        <div className='mb-3'>Select Number of Cards to Play</div>
        <Row xs={3} className='g-2'>
          <RenderButtons optMin={4} optMax={20} />
        </Row>
      </Container>
    </div>
  );
}

export default App;
