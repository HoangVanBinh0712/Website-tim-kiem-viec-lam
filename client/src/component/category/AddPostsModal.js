import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'
import { CategoryContext } from '../../contexts/CategoryContext'
const AddPostModal = () => {
    // Contexts

    const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } = useContext(PostContext)

    // State
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        category: '',
        dateEnd: ''
    })
    const [cateState, setCateState] = useState("")
    const { categoryState: { categoryLoading, categories } } = useContext(CategoryContext)

    const { title, content, dateEnd } = newPost
    const onChangeNewPostForm = event =>
        setNewPost({ ...newPost, [event.target.name]: event.target.value })

    const closeDialog = () => {
        setNewPost({ title: '', content: '', dateEnd: '' })
        setShowAddPostModal(false)
    }

    const onSubmit = async event => {
        event.preventDefault()
        newPost.category = cateState
        console.log(newPost)
        const { success, message } = await addPost(newPost)
        setShowToast({ show: true, message: message, type: success ? 'success' : 'danger' })
        setNewPost({ title: '', content: '', dateEnd: '' })
        setShowAddPostModal(false)
    }

    return (
        <Modal show={showAddPostModal} onHide={closeDialog} >
            <Modal.Header closeButton>
                <Modal.Title>Add new Post</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Text id='title-help' muted> Title  </Form.Text>
                        <Form.Control
                            type='text'
                            placeholder='Title'
                            name='title'
                            required
                            aria-describedby='title-help'
                            value={title}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group >
                    <Form.Text id='title-help' muted> Content  </Form.Text>

                    <Form.Group className="mb-3">
                        <Form.Control
                            as='textarea'
                            rows={3}
                            placeholder='Content'
                            name='content'
                            value={content}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                    <Form.Text id='title-help' muted> Date End  </Form.Text>

                    <Form.Group className="mb-3">
                        <Form.Control
                            type='text'
                            placeholder='dateEnd'
                            name='dateEnd'
                            required
                            aria-describedby='title-help'
                            value={dateEnd}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                    <select name='category' onChange={(e) => {
                        const selected = e.target.value;
                        setCateState(selected);
                    }} required>
                        {categories.map(category => (
                            <option value={category._id} >  {category.name}</option>
                        ))}

                    </select>
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
