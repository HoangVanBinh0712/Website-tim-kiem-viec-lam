import { PostContext } from "../contexts/PostContext"
import { useContext, useEffect, useState } from "react"
import Spinner from "react-bootstrap/esm/Spinner"
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SinglePost from "../component/posts/SinglePost"
import Toast from 'react-bootstrap/Toast'
import { CategoryContext } from "../contexts/CategoryContext"
import Button from "react-bootstrap/esm/Button"

const DashBoard = () => {

    const { postState: { posts, postsLoading }, getPosts,
        showToast: { show, message, type }, setShowToast, getSearchPosts } = useContext(PostContext)

    const { categoryState: { categoryLoading, categories }, getCategory } = useContext(CategoryContext)
    const [searchForm, setSearchForm] = useState({
        cate: "",
        title: "",
        location: ""
    })
    useEffect(() => { getPosts(false); getCategory(); }, [])
    const { title, location } = searchForm
    const onChangeSearchForm = event =>
        setSearchForm({ ...searchForm, [event.target.name]: event.target.value })

    const formSeachSubmit = async () => {
        getSearchPosts(searchForm)
    }
    let body = null
    if (postsLoading || categoryLoading) {
        body = (<div className="spinner-container"><Spinner animation="border" variant="info" /></div>)
    } if (posts.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Body>
                        <Card.Text>
                            Không tìm thấy bài viết nào phù hợp với nhu cầu của bạn.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        )
    } else {
        body = (<>
            <Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3 container main-row'>
                {posts.map(post => (
                    <Col key={post._id} className='my-2'>
                        <SinglePost post={post} />
                    </Col>
                ))}
            </Row>
        </>)
    }
    return <>
        {/* <Row className='row-cols-1'>
            <Card className="image-card">
                <Card.Img src="https://youthclinic.com/wp-content/uploads/2015/01/Job-Opportunities.jpg"
                    alt="Card image" className="container" style={{ height: "300px", padding: "0 0 0 0 " }} />
                <Card.ImgOverlay>
                    <form className="formTimKiem col-4" style={{ margin: "0px 0 20px 950px" }}>
                        <Row className="format-row">
                            <div>
                                <input name="title" value={title} onChange={onChangeSearchForm} type="text" placeholder="Nhập thông tin tìm kiếm" />
                            </div>
                        </Row>
                        <Row className="format-row">
                            <Col className="col-5">
                                <select name='cate' onChange={onChangeSearchForm} required>
                                    <option value={"all"}> Tất cả ngành nghề</option>
                                    {categories.map(category => (<option value={category._id} >  {category.name}</option>))}
                                </select>
                            </Col>
                            <Col className="col-4">
                                <input type="text" value={location} onChange={onChangeSearchForm} name="location" placeholder="Tỉnh thành" />
                            </Col>
                            <Col className="col-3">
                                <Button variant="primary" onClick={() => {
                                    formSeachSubmit()
                                }}>Tìm kiếm</Button>
                            </Col>
                        </Row>
                        <Row className="mx-0">
                            <Col>
                                <div href="#" style={{ color: "white" }}>Công nghệ thông tin</div>

                            </Col>
                            <Col>
                                <div href="#" style={{ color: "white" }}>Tài chính ngân hàng</div>

                            </Col>
                            <Col>
                                <div href="#" style={{ color: "white" }}>Giao thông vận tải</div>
                            </Col>
                        </Row>
                    </form>
                </Card.ImgOverlay>
            </Card>
        </Row> */}
        <div className="img-main container">
            <img src="https://youthclinic.com/wp-content/uploads/2015/01/Job-Opportunities.jpg"
                style={{ width: "100%", height: "300px", padding: "0 0 0 0 " }} />
            <form className="formTimKiem">
                <Row className="format-row">
                    <div>
                        <input name="title" value={title} onChange={onChangeSearchForm} type="text" placeholder="Nhập thông tin tìm kiếm" />
                    </div>
                </Row>
                <Row className="format-row">
                    <Col className="col-5">
                        <select name='cate' onChange={onChangeSearchForm} required>
                            <option value={"all"}> Tất cả ngành nghề</option>
                            {categories.map(category => (<option value={category._id} >  {category.name}</option>))}
                        </select>
                    </Col>
                    <Col className="col-4">
                        <input type="text" value={location} onChange={onChangeSearchForm} name="location" placeholder="Tỉnh thành" />
                    </Col>
                    <Col className="col-3">
                        <Button variant="primary" onClick={() => {
                            formSeachSubmit()
                        }}>Tìm kiếm</Button>
                    </Col>
                </Row>
                <Row className="mx-0">
                    <Col>
                        <div href="#" style={{ color: "white" }}>Công nghệ thông tin</div>

                    </Col>
                    <Col>
                        <div href="#" style={{ color: "white" }}>Tài chính ngân hàng</div>

                    </Col>
                    <Col>
                        <div href="#" style={{ color: "white" }}>Giao thông vận tải</div>
                    </Col>
                </Row>
            </form>
        </div>
        {body}
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
        {/* After post is added, show toast */}
    </>
}
export default DashBoard