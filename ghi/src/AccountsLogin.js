import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function login() {
    return (
        <div className='modal show' style={{display: 'block', postion: 'initial'}}>
            <Modal.Dialog>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Login
                    </Modal.Title>
                </Modal.Header>
            </Modal.Dialog>
        </div>
    )
}
