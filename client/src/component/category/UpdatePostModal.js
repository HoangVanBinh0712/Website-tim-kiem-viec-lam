import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'
const UpdatePostModal = () => {
    // Contexts

    const { postState: { post }, showUpdatePostModal, setShowUpdatePostModal, updatePost, setShowToast } = useContext(PostContext)

    // State
    const [updatedPost, setupdatedPost] = useState(post)

    useEffect(()=>setupdatedPost(post),[post])
    const { name, description } = updatedPost

    const onChangeUpdatedPostForm = event =>
        setupdatedPost({ ...updatedPost, [event.target.name]: event.target.value })

    const closeDialog = () => {
        setShowUpdatePostModal(false)
    }

    const onSubmit = async event => {
        event.preventDefault()
        const { success, message } = await updatePost(updatedPost)
      
        setShowUpdatePostModal(false)

//        setShowToast({ show: true, message: message, type: success ? 'success' : 'danger' })
    }

    return (
        <Modal show={showUpdatePostModal} onHide={closeDialog} >
            <Modal.Header closeButton>
                <Modal.Title>Anything Change ?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Text id='title-help' muted> Name  </Form.Text>
                        <Form.Control
                            type='text'
                            placeholder='name'
                            name='name'
                            required
                            aria-describedby='title-help'
                            value={name}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group >
                    <Form.Text id='title-help' muted> Description  </Form.Text>

                    <Form.Group className="mb-3">
                        <Form.Control
                            as='textarea'
                            rows={3}
                            placeholder='Description'
                            name='description'
                            value={description}
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant='primary' type='submit'>
                        Add!
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
export default UpdatePostModal
