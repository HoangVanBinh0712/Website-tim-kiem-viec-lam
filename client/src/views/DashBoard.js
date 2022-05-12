import { PostContext } from "../contexts/PostContext"
import { useContext, useEffect, useState } from "react"
import Spinner from "react-bootstrap/esm/Spinner"
import { AuthContext } from "../contexts/AuthContext"
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/esm/Button"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SinglePost from "../component/category/SinglePost"
import AddPostModal from "../component/category/AddPostsModal"
import addIcon from '../assets/plus-circle-fill.svg'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Toast from 'react-bootstrap/Toast'
import Form from 'react-bootstrap/Form'
import UpdatePostModal from "../component/category/UpdatePostModal"
import { CategoryContext } from "../contexts/CategoryContext"

const DashBoard = () => {
    const { postState: { post, posts, postsLoading }, getPosts,
        setShowAddPostModal, showToast: { show, message, type }, setShowToast } = useContext(PostContext)
    const { authState: { user } } = useContext(AuthContext)
    const { categoryState: { categoryLoading, categories }, getCategory } = useContext(CategoryContext)
    const [cateState, setCateState] = useState("")
    useEffect(() => { getPosts(); getCategory(); }, [])

    let body = null

    if (!user) {
        if (postsLoading) {
            body = (
                <div className="spinner-container"><Spinner animation="border" variant="info" /></div>
            )
        } else if (posts.length === 0) {
            body = (
                <>
                    <Card className='text-center mx-5 my-5'>
                        <Card.Header as='h1'>Wellcome</Card.Header>
                        <Card.Body>
                            <Card.Title>Wellcome</Card.Title>
                            <Card.Text>
                                Click the button below to do ST
                            </Card.Text>
                            <Button variant="primary" onClick={setShowAddPostModal.bind(this, true)}>Add</Button>
                        </Card.Body>
                    </Card>
                </>
            )
        } else {
            body = (<>
                <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                    {posts.map(post => (
                        <Col key={post._id} className='my-2'>
                            <SinglePost post={post} role={0} />
                        </Col>
                    ))}
                </Row>
                {/*Open Add , show text when put on button */}
                <OverlayTrigger placement='left'
                    overlay={<Tooltip>Add category</Tooltip>}>
                    <Button className="btn-floating" onClick={setShowAddPostModal.bind(this, true)}>
                        <img src={addIcon} alt="add post" width="60" height="60" />
                    </Button>
                </OverlayTrigger>
    
            </>)
        }
    
    } else {
        var username = user.name ? user.name : user.companyname
        if (postsLoading) {
            body = (
                <div className="spinner-container"><Spinner animation="border" variant="info" /></div>
            )
        } else if (posts.length === 0) {
            body = (
                <>
                    <Card className='text-center mx-5 my-5'>
                        <Card.Header as='h1'>Hi {username}</Card.Header>
                        <Card.Body>
                            <Card.Title>Wellcome</Card.Title>
                            <Card.Text>
                                Click the button below to do ST
                            </Card.Text>
                            <Button variant="primary" onClick={setShowAddPostModal.bind(this, true)}>Add</Button>
                        </Card.Body>
                    </Card>
                </>
            )
        } else {
            body = (<>
                <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
                    {posts.map(post => (
                        <Col key={post._id} className='my-2'>
                            <SinglePost post={post} role={user.role} />
                        </Col>
                    ))}
                </Row>
                {/*Open Add , show text when put on button */}
                <OverlayTrigger placement='left'
                    overlay={<Tooltip>Add category</Tooltip>}>
                    <Button className="btn-floating" onClick={setShowAddPostModal.bind(this, true)}>
                        <img src={addIcon} alt="add post" width="60" height="60" />
                    </Button>
                </OverlayTrigger>

            </>)
        }

    }

    return <>
        <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>

            <Form className='white-space: nowrap' border='success'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Nhập thông tin tìm kiếm" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Row>
                        <Col>
                            <div><Form.Text> Ngành nghề </Form.Text></div>
                            <div>      <select name='category' onChange={(e) => {
                                const selected = e.target.value; setCateState(selected);
                            }} required>
                                {categories.map(category => (<option value={category._id} >  {category.name}</option>))}
                            </select>
                            </div>
                        </Col>
                        <Col>
                        </Col>
                    </Row>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Row>
        {body}
        <AddPostModal />
        <Toast
            show={show}
            style={{ position: 'fixed', top: '20%', right: '10px' }}
            className={`bg-${type} text-white`}
            onClose={setShowToast.bind(this, {
                show: false,
                message: '',
                type: null
            })}
            delay={3000}
            autohide
        >
            <Toast.Body>
                <strong>{message}</strong>
            </Toast.Body>
        </Toast>
        {post !== null && <UpdatePostModal />}
        {/* After post is added, show toast */}


    </>
}
export default DashBoard