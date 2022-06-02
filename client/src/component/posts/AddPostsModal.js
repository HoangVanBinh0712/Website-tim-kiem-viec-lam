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
        description: '',
        salary: '',
        requirement: '',
        location: '',
        dateEnd: ''
    })
    const [cateState, setCateState] = useState("")
    const { categoryState: { categories } } = useContext(CategoryContext)

    const { title, description, salary, requirement, location, dateEnd } = newPost
    const onChangeNewPostForm = event =>
        setNewPost({ ...newPost, [event.target.name]: event.target.value })

    const closeDialog = () => {
        setNewPost({ title: '', description: '', salary: '', requirement: '', location: '', dateEnd: '' })
        setShowAddPostModal(false)
    }

    const onSubmit = async event => {
        event.preventDefault()
        newPost.category = cateState ? cateState : categories[0]._id
        console.log(newPost)
        const { success, message } = await addPost(newPost)
        setShowToast({ show: true, message: message, type: success ? 'success' : 'danger' })
        setNewPost({ title: '', description: '', salary: '', requirement: '', location: '', dateEnd: '' })
        setShowAddPostModal(false)
    }

    return (
        <Modal show={showAddPostModal} onHide={closeDialog} >
            <Modal.Header closeButton>
                <Modal.Title>Thêm mới bài viết</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Text id='title-help' muted> Tiêu đề  </Form.Text>
                        <Form.Control
                            type='text'
                            name='title'
                            required
                            aria-describedby='title-help'
                            value={title}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group >
                    <Form.Text id='title-help' muted> Mô tả  </Form.Text>

                    <Form.Group className="mb-3">
                        <Form.Control
                            as='textarea'
                            rows={3}
                            name='description'
                            value={description}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Text id='title-help' muted> Yêu cầu  </Form.Text>
                        <Form.Control
                            type='text'
                            name='requirement'
                            required
                            value={requirement}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group >
                    <Form.Group className="mb-3">
                        <Form.Text id='title-help' muted> Lương  </Form.Text>
                        <Form.Control
                            type='number'
                            name='salary'
                            required
                            value={salary}
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group >
                    <Form.Group className="mb-3">
                        <Form.Text id='title-help' muted> Địa chỉ  </Form.Text>
                        <Form.Control
                            type='text'
                            name='location'
                            required
                            value={location}
                            onChange={onChangeNewPostForm}
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
                            onChange={onChangeNewPostForm}
                        />
                    </Form.Group>
                    <Form.Text id='title-help' muted> Danh mục  </Form.Text>
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
                        Hủy
                    </Button>
                    <Button variant='primary' type='submit'>
                        Xác nhận!
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
export default AddPostModal
