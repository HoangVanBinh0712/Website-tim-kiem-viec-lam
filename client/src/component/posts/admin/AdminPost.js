import { PostContext } from "../../../contexts/PostContext"
import { useContext, useEffect, useState } from "react"
import Spinner from "react-bootstrap/esm/Spinner"
import { AuthContext } from "../../../contexts/AuthContext"
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/esm/Button"
import Row from 'react-bootstrap/Row'
import AddPostModal from "../AddPostsModal"
import addIcon from '../../../assets/plus-circle-fill.svg'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Toast from 'react-bootstrap/Toast'
import UpdatePostModal from "../UpdatePostModal"
import AdminSinglePost from "./AdminSinglePost"
import Col from "react-bootstrap/esm/Col"

const AdminPost = () => {
    const { postState: { posts, postsLoading }, adminGetPosts,
        setShowAddPostModal, showToast: { show, message, type }, setShowToast } = useContext(PostContext)
    const { authState: { user } } = useContext(AuthContext)
    const [pageMode, setPageMode] = useState("unapproved")
    useEffect(() => { adminGetPosts(pageMode) }, [pageMode])
    
    const setRejected = ()=>{
        setPageMode("rejected")

    }
    const setUnapproved = ()=>{
        setPageMode("unapproved")

    }
    const setAllPost = ()=>{
        setPageMode("all")

    }
    let body = null

    var username = user.name ? user.name : user.companyname
    if (postsLoading) {
        body = (
            <div className="spinner-container"><Spinner animation="border" variant="info" /></div>
        )
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'style={{width:"1235px", left:"85px"}}>
                    <Card.Header as='h1' style={{fontSize:"25px"}}>{username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Xin Chào Admin</Card.Title>
                        <Card.Text>
                            Không có bài đăng!
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        )
    } else {
        body = (<>
            <Row className='g-4 mx-auto mt-3 container' >
                {posts.map(post => (
                    <Row key={post._id} className='my-2'>
                        <AdminSinglePost post={post} role={user.role} />
                    </Row>
                ))}
            </Row>
        </>)
    }


    return <>
        <div className="container">
            <div style={{ marginTop: "20px", fontSize: '40px', textAlign: "center", background: "#78c2ad", color: "white", borderRadius:"20px 20px 0px 0px",width: "1240px",margin:"20px auto", marginLeft: "18px"}}>Quản Trị Viên</div>
            <Row className="container">
                <Col className="col-4 col-text" onClick={setUnapproved} style={pageMode === "unapproved" ? {textDecoration: "underline"}: {} }>Bài viết chờ duyệt</Col>
                <Col className="col-4 col-text"onClick={setRejected} style={pageMode === "rejected" ? {textDecoration: "underline"}: {} }>Bài viết đã bị từ chối</Col>
                <Col className="col-4 col-text" onClick={setAllPost} style={pageMode === "all" ? {textDecoration: "underline"}: {} }>Tất cả bài viết</Col>
            </Row>
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
    </>
}
export default AdminPost