import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'
import { UserContext } from '../../contexts/UserContext'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../../layouts/Alert'

const ChangePasswordModal = () => {

    const { showModal, setShowModal, changePassword } = useContext(UserContext)
    const { authState: { user } } = useContext(AuthContext)
    const {setShowToast} = useContext(PostContext)
    const [newModal, setNewModal] = useState({
        oldpassword: '',
        newpassword: '',
        confirmnewpassword: '',
        role: user.role
    })
    const [alert, setAlert] = useState(null)

    const { oldpassword, newpassword, confirmnewpassword } = newModal
    const closeDialog = () => {
        setNewModal({ oldpassword: '', newpassword: '', confirmnewpassword: '', role: '' })
        setShowModal(false)
    }

    const onChangeModalForm = event =>
        setNewModal({ ...newModal, [event.target.name]: event.target.value })

    const onSubmit = async event => {
        event.preventDefault()
        try {
            if (newModal.role == '') newModal.role = user.role
            const { success, message } = await changePassword(newModal)
            if (success) {
                setNewModal({ oldpassword: '', newpassword: '', confirmnewpassword: '', role: '' })
                setShowToast({ show: true, message: message, type: success ? 'success' : 'danger' })
                setShowModal(false)
            } else {
                setAlert({ type: 'danger', message: message })
                setTimeout(() => setAlert(null), 5000)
            }

        } catch (error) {
            console.log("Error: " + error)
        }
    }
    return (
        <Modal show={showModal} onHide={closeDialog} >
            <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <AlertMessage info={alert} />
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Text id='title-help' muted> Old Password  </Form.Text>
                        <Form.Control
                            type='Password'
                            name='oldpassword'
                            required
                            aria-describedby='title-help'
                            value={oldpassword}
                            onChange={onChangeModalForm}
                        />
                    </Form.Group >
                    <Form.Group className="mb-3">
                        <Form.Text id='title-help' muted> New Password  </Form.Text>
                        <Form.Control
                            type='Password'
                            name='newpassword'
                            value={newpassword}
                            required
                            aria-describedby='title-help'
                            onChange={onChangeModalForm}

                        />
                    </Form.Group >
                    <Form.Group className="mb-3">
                        <Form.Text id='title-help' muted> Confirm Password </Form.Text>
                        <Form.Control
                            type='Password'
                            name='confirmnewpassword'
                            value={confirmnewpassword}
                            required
                            aria-describedby='title-help'
                            onChange={onChangeModalForm}
                        />
                    </Form.Group >
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant='primary' type='submit'>
                        Apply
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default ChangePasswordModal
