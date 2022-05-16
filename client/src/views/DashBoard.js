import { PostContext } from "../contexts/PostContext"
import { useContext, useEffect, useState } from "react"
import Spinner from "react-bootstrap/esm/Spinner"
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SinglePost from "../component/posts/SinglePost"
import AddPostModal from "../component/posts/AddPostsModal"
import Toast from 'react-bootstrap/Toast'
import UpdatePostModal from "../component/posts/UpdatePostModal"
import { CategoryContext } from "../contexts/CategoryContext"

const DashBoard = () => {
    const { postState: { post, posts, postsLoading }, getPosts,
     showToast: { show, message, type }, setShowToast } = useContext(PostContext)

    const { categoryState: { categoryLoading, categories }, getCategory } = useContext(CategoryContext)
    const [cateState, setCateState] = useState("")

    useEffect(() => { getPosts(false); getCategory(); }, [])
    let body = null
    if (postsLoading || categoryLoading) {
        body = (<div className="spinner-container"><Spinner animation="border" variant="info" /></div>)
    } else {
        body = (<>
            <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3 container'>
                {posts.map(post => (
                    <Col key={post._id} className='my-2'>
                        <SinglePost post={post} />
                    </Col>
                ))}
            </Row>
        </>)}
    return <>
        <Row className='row-cols-1'>
            <Card>
                <Card.Img src="https://youthclinic.com/wp-content/uploads/2015/01/Job-Opportunities.jpg" alt="Card image" className="container" style={{ height: "300px", padding: "0 0 0 0 " }} />
                <Card.ImgOverlay>
                    <form className="formTimKiem col-4" style={{margin:"0px 0 20px 950px"}}>
                        <Row className="format-row">
                            <div>
                                <input type="text" placeholder="Nhập thông tin tìm kiếm" />
                            </div>
                        </Row>
                        <Row className="format-row">
                            <Col className="col-5">
                                <select name='category' onChange={(e) => {
                                    const selected = e.target.value; setCateState(selected);
                                }} required>
                                    {categories.map(category => (<option value={category._id} >  {category.name}</option>))}
                                </select>
                            </Col>
                            <Col className="col-4">
                                <input type="text" placeholder="Tỉnh thành" />
                            </Col>
                            <Col className="col-3">
                                <button variant="primary" type="submit">Tìm kiếm</button>
                            </Col>
                        </Row>
                        <Row className="mx-0">
                            <Col>
                                <a style={{ color: "white" }}>Công nghệ thông tin</a>

                            </Col>
                            <Col>
                                <a style={{ color: "white" }}>Tài chính ngân hàng</a>

                            </Col>
                            <Col>
                                <a style={{ color: "white" }}>Giao thông vận tải</a>
                            </Col>
                        </Row>
                    </form>
                </Card.ImgOverlay>
            </Card>
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