import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AmendPropertyModal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [inputs, setInputs] = useState({});
    
    const [sellersList, setSellers] = useState([]);
    
    const commitDate = new Date();
        let day = commitDate.getDate();
        let month = commitDate.getMonth() + 1;
        let year = commitDate.getFullYear();
        let currentDate = `${year}/${month}/${day}`;

    useEffect(() => {
        fetch('http://localhost:9002/sellers')
            .then((response) => response.json())
            .then((data) => { setSellers(data) });
    }, []);

    const handleChange = () => {

        var elements = document.getElementById("updateProperty").elements;
        
        for(var i=0; i < elements.length; i++){
            const name = elements[i].name;
            const value = elements[i].value;
            if (elements[i].type == "number") {
                setInputs(values => ({ ...values, [name]: parseInt(value) }))
            } else {
                setInputs(values => ({ ...values, [name]: value }))
            }
        } 
    }

const updateCard = (event) => {

    var entryID = event.target.id;
    
        fetch(`http://localhost:9002/properties/${entryID}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(inputs)
    })

    .then(()=>{
        handleClose();
    })
    
    .then((response) => { 
        console.log(response); 
    }, (error) => console.log(error));
    window.location.reload(false)
  }

  return (
    <>

        <Button onClick={handleShow} variant="success" className="float-right">Update</Button>

      <Modal
        show={show}
        size="lg"
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Existing Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
            <form id="updateProperty" action="" >
                
            </form>

        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={updateCard} id={props.id}>Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}