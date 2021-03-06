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
import mainimage from '../assets/main-image.jpg'

const DashBoard = () => {

    const { postState: { posts, postsLoading, max_page }, getPosts, pageingPost,
        showToast: { show, message, type }, setShowToast, getSearchPosts } = useContext(PostContext)

    const { categoryState: { categoryLoading, categories }, getCategory } = useContext(CategoryContext)
    const [searchForm, setSearchForm] = useState({
        cate: "",
        title: "",
        location: ""
    })
    const [currentPage, setCurrentPage] = useState(1)
    useEffect(() => { getPosts(false); getCategory(); }, [])
    const { title, location } = searchForm
    const onChangeSearchForm = event =>
        setSearchForm({ ...searchForm, [event.target.name]: event.target.value })
    const formSeachSubmit = async () => {
        await getSearchPosts(searchForm)
        setCurrentPage(1)
    }
    let body = null
    if (postsLoading || categoryLoading) {
        body = (<div className="spinner-container"><Spinner animation="border" variant="info" /></div>)
    } else if (posts.length === 0) {
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
            <div className="paging-block">
                <Button onClick={() => {
                    if (currentPage > 1) {
                        pageingPost(currentPage - 1)
                        setCurrentPage(currentPage - 1)
                    }
                }}>Prev</Button>
                <div style={{
                    textAlign: "center", fontSize: "1.5rem", marginLeft: "20px",
                    marginRight: "20px", height: "2.5rem", width: "5rem"
                }}>{currentPage} / {max_page}</div>
                <Button onClick={() => {
                    if (currentPage + 1 <= max_page) {
                        pageingPost(currentPage + 1)
                        setCurrentPage(currentPage + 1)
                    }
                }}>Next</Button>
            </div>
        </>)
    }
    return <>
        <div className="img-main">
            <img src={mainimage} alt=''
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
                            <option id="all" value={"all"}> Tất cả ngành nghề</option>
                            {categories.map(category => (<option id={category._id} value={category._id} >  {category.name}</option>))}
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
                <h4 style={{ color: "white", fontFamily: "inherit", textShadow: "6px 2px 10px black" }}>Các công ty tuyển dụng hàng đầu trên website </h4>
                <div>
                    <div style={{ maxHeight: "50px", maxWidth: "70" }}>
                        <img src="https://www.topcv.vn/v4/image/welcome/companies/teachcombank.png" style={{ maxHeight: "100px", maxWidth: "60px" }} alt='' />
                        <img src="https://baothuathienhue.vn/image/fckeditor/upload/2017/20170803/images/amazon_logo_500500.png" style={{ maxHeight: "100px", maxWidth: "60px" }} alt=''></img>
                        <img src="https://www.topcv.vn/v4/image/welcome/companies/fpt.png" style={{ maxHeight: "100px", maxWidth: "60px" }} alt=''></img>
                        <img src="https://thumbor.forbes.com/thumbor/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fi.forbesimg.com%2Fmedia%2Flists%2Fcompanies%2Fvingroup_416x416.jpg" alt='' style={{ maxHeight: "100px", maxWidth: "60px" }}></img>
                    </div>
                </div>
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