import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'
const AddPostModal = () => {
    // Contexts

    const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } = useContext(PostContext)

    // State
    const [newPost, setNewPost] = useState({
        name: '',
        description: ''
    })

    const { name, description } = newPost
    const onChangeNewPostForm = event =>
        setNewPost({ ...newPost, [event.target.name]: event.target.value })

    const closeDialog = () => {
        setNewPost({ name: '', description: '' })
        setShowAddPostModal(false)
    }

    const onSubmit = async event => {
        event.preventDefault()
        const {success,message} = await addPost(newPost)
        setShowToast({show: true, message: message,type: success ? 'success' : 'danger'})
        setNewPost({ name: '', description: '' })
        setShowAddPostModal(false)
    }

    return (
        <Modal show={showAddPostModal} onHide={closeDialog} >
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn?</Modal.Title>
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
                            onChange={onChangeNewPostForm}
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
                            onChange={onChangeNewPostForm}
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
export default AddPostModal
