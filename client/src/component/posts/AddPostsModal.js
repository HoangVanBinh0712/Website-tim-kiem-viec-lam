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
    const { categoryState: { categories } } = useContext(CategoryContext)

    const { title, description,salary,requirement,location, dateEnd } = newPost
    const onChangeNewPostForm = event =>
        setNewPost({ ...newPost, [event.target.name]: event.target.value })

    const closeDialog = () => {
        setNewPost({ title: '', description: '', salary: '' ,requirement: '',location: '',dateEnd: ''})
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
                <Modal.Title>Anything Change ?</Modal.Title>
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
                    <Form.Group className="mb-3">
                        <Form.Text id='title-help' muted> Requirement  </Form.Text>
                        <Form.Control
                            type='text'
                            placeholder='Requirement'
                            name='requirement'
                            required
                            value={requirement}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group >
                    <Form.Group className="mb-3">
                        <Form.Text id='title-help' muted> Salary  </Form.Text>
                        <Form.Control
                            type='number'
                            placeholder='Salary'
                            name='salary'
                            required
                            value={salary}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group >
                    <Form.Group className="mb-3">
                        <Form.Text id='title-help' muted> Location  </Form.Text>
                        <Form.Control
                            type='text'
                            placeholder='Location'
                            name='location'
                            required
                            value={location}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group >
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
                    }}>
                        {categories.map(category => (
                            <option value={category._id}>  {category.name}</option>
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
