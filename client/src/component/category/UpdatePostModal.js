import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'
import { CategoryContext } from '../../contexts/CategoryContext'
import Select from 'react-select'
const UpdatePostModal = () => {
    // Contexts

    const { postState: { post }, showUpdatePostModal, setShowUpdatePostModal, updatePost, setShowToast } = useContext(PostContext)
    const { categoryState: { categoryLoading, categories } } = useContext(CategoryContext)

    // State
    const [cateState, setCateState] = useState("")
    const [updatedPost, setupdatedPost] = useState(post)

    useEffect(() => setupdatedPost(post), [post])
    const { title, content, dateEnd } = updatedPost

    const onChangeUpdatedPostForm = event =>
        setupdatedPost({ ...updatedPost, [event.target.name]: event.target.value })

    const closeDialog = () => {
        setShowUpdatePostModal(false)
    }

    const onSubmit = async event => {
        event.preventDefault()
        if (cateState) updatedPost.category = cateState
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
                        <Form.Text id='title-help' muted> Title  </Form.Text>
                        <Form.Control
                            type='text'
                            placeholder='Title'
                            name='title'
                            required
                            aria-describedby='title-help'
                            value={title}
                            onChange={onChangeUpdatedPostForm}
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
                            onChange={onChangeUpdatedPostForm}
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
                            onChange={onChangeUpdatedPostForm}
                        />
                    </Form.Group>
                    <select name='category' onChange={(e) => {
                        const selected = e.target.value;
                        setCateState(selected);
                    }}>
                        {categories.map(category => (
                            <option value={category._id} selected={(category._id === post.category)} >  {category.name}</option>
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
export default UpdatePostModal
