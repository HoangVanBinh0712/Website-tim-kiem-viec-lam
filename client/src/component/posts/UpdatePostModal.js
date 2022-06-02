import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'
import { CategoryContext } from '../../contexts/CategoryContext'
import Spinner from 'react-bootstrap/esm/Spinner'
const UpdatePostModal = () => {
    // Contexts

    const { postState: { post }, showUpdatePostModal, setShowUpdatePostModal, updatePost, setShowToast } = useContext(PostContext)
    const { categoryState: { categories }, getCategory } = useContext(CategoryContext)

    // State
    const [cateState, setCateState] = useState("")
    const [updatedPost, setupdatedPost] = useState(post)

    useEffect(() => { setupdatedPost(post);}, [post])
    const { title, description, salary, requirement, location, dateEnd } = updatedPost

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
        setShowToast({ show: true, message: message, type: success ? 'success' : 'danger' })
    }
    let body
    if (categories.length === 0 ) {
        getCategory()
        body = (<div className="spinner-container"><Spinner animation="border" variant="info" /></div>)
    } else {
        body = (<Form onSubmit={onSubmit}>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Text id='title-help' muted> Tiêu đề  </Form.Text>
                    <Form.Control
                        type='text'
                        name='title'
                        required
                        aria-describedby='title-help'
                        value={title}
                        onChange={onChangeUpdatedPostForm}
                    />
                </Form.Group >
                <Form.Text id='title-help' muted> Mô tả  </Form.Text>

                <Form.Group className="mb-3">
                    <Form.Control
                        as='textarea'
                        rows={3}
                        name='description'
                        value={description}
                        onChange={onChangeUpdatedPostForm}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Text id='title-help' muted> Yêu cầu  </Form.Text>
                    <Form.Control
                        type='text'
                        name='requirement'
                        required
                        value={requirement}
                        onChange={onChangeUpdatedPostForm}
                    />
                </Form.Group >
                <Form.Group className="mb-3">
                    <Form.Text id='title-help' muted> Lương  </Form.Text>
                    <Form.Control
                        type='number'
                        name='salary'
                        required
                        value={salary}
                        onChange={onChangeUpdatedPostForm}
                    />
                </Form.Group >
                <Form.Group className="mb-3">
                    <Form.Text id='title-help' muted> Địa chỉ  </Form.Text>
                    <Form.Control
                        type='text'
                        name='location'
                        required
                        value={location}
                        onChange={onChangeUpdatedPostForm}
                    />
                </Form.Group >
                <Form.Text id='title-help' muted> Ngày kết thúc  </Form.Text>

                <Form.Group className="mb-3">
                    <Form.Control
                        type='text'
                        name='dateEnd'
                        required
                        aria-describedby='title-help'
                        value={dateEnd}
                        onChange={onChangeUpdatedPostForm}
                    />
                </Form.Group>
                <Form.Text id='title-help' muted> Danh mục  </Form.Text>
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
                    Hủy
                </Button>
                <Button variant='primary' type='submit'>
                    Cập nhật!
                </Button>
            </Modal.Footer>
        </Form>)
    }
    return <Modal show={showUpdatePostModal} onHide={closeDialog} >
        <Modal.Header closeButton>
            <Modal.Title>Cập nhật bài viết </Modal.Title>
        </Modal.Header>
        {body}
    </Modal>

}
export default UpdatePostModal
