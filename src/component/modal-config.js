import { Button, Row, Col, Modal } from "react-bootstrap";

function generateOptions(nMin, nMax){
  let a = []
  for(let i=nMin; i<=nMax;i++){
    if(i%2===0){
      a.push(i)
    }
  }
  return a
}

function RenderButtons({optMin, optMax, handleClose, props}){
  const {cardNum, setCardNum} = props
  const opt = generateOptions(optMin, optMax)
  return opt.map((item, index)=>{
    return <Col key={index}>
      <Button variant={`${cardNum===item ? "success": "dark" }`} className='w-100' onClick={()=>{setCardNum(item); handleClose()}}>{item}</Button>
    </Col>
  })
}

export default function ModalConfig({show, handleClose, isGameComplete, ...props}){
  return (
  <Modal show={show} onHide={handleClose} backdrop="static">
    <Modal.Header><div className="text-center w-100 fw-bold fs-3">Game Configuration</div></Modal.Header>
    <Modal.Body>
      {isGameComplete ? (
        <div className="text-center">
          <div className="fs-1">Congratulations!</div>
          <div>Let's play more!</div>
          <hr />
        </div>
      ) : <></>}
      <div className='mb-3 text-center'>Select Number of Cards to Play</div>
      <Row xs={3} className='g-2'>
        <RenderButtons optMin={4} optMax={20} handleClose={handleClose} props={props}/>
      </Row>
    </Modal.Body>
    {!isGameComplete ? (
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>Done</Button>
      </Modal.Footer>
    ) : <></>}
  </Modal>
  )
}