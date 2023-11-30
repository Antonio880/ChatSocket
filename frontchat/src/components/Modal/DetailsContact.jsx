import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
function DetailsContact({ userClicked }) {

// function abrirModal() {
//   setIsOpen(true);
// }
//   function fecharModal() {
//     setIsOpen(false);
//   }

  return(
    <div className='rounded-md shadow-md w-[300px] h-[300px] mt-6 bg-gray-100 mx-4'>
      <div className='flex justify-center py-4'>
        <img src="https://source.unsplash.com/random/110x110" className='rounded-full' alt="" />
      </div>
      {
        userClicked && userClicked.username && (
          <div className='flex justify-start'>
            <h1>Email</h1>
            <h2>{userClicked.username}</h2>
            <div className="mt-1 flex items-center gap-x-1.5">
              <div className="flex-none rounded-full bg-emerald-500/20 p-1 ">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-xs leading-5 text-gray-500">Online</p>
            </div>
          </div>
        )
      }
      
      {/* <Modal show={modalIsOpen} onHide={fecharModal}>
        <Modal.Header closeButton>
          <Modal.Title>Details User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              {
                userCliked && userCliked.email && (
                  <Form.label className="">{userCliked.email}</Form.label>
                )
              }
            </Form.Group>
            {/* <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
            </Form.Group> */}
          {/* </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-secondary" onClick={fecharModal}>
            Close
          </Button> */}
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        {/* </Modal.Footer>
      </Modal> */ }
    </div>
  );
}

export default DetailsContact;