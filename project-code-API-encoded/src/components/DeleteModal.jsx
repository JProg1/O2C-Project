import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TrashFill } from 'react-bootstrap-icons';

export default function DeleteModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteCard = (event) => {
    event.preventDefault();
    var entryID = event.target.id;

    fetch(`http://localhost:9002/${props.type}/${entryID}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then((response) => { 
        console.log(response); 
        handleClose();
        window.location.reload(false);
    }, (error) => console.log(error));
    

    // console.log("Delete card clicked for " + entryID);
    // handleClose();
}  

  return (
    <>

        <Button onClick={handleShow} variant="danger"><TrashFill/></Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            You are about to delete {props.data}<br />
            Are you sure you want to delete this record? <br /><br /><em>Deleted records <strong>can not</strong> be recovered.</em>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteCard} id={props.id}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}