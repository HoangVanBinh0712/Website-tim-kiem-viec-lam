import { PostContext } from "../../../contexts/PostContext"
import { useContext, useEffect, useState } from "react"
import Spinner from "react-bootstrap/esm/Spinner"
import { AuthContext } from "../../../contexts/AuthContext"
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import Button from "react-bootstrap/esm/Button"
import AdminSinglePost from "./AdminSinglePost"

const AdminPost = () => {
    const { postState: { posts, postsLoading,max_page }, adminGetPosts,pageingPost,
        showToast: { show, message, type }, setShowToast } = useContext(PostContext)
    const { authState: { user } } = useContext(AuthContext)
    const [pageMode, setPageMode] = useState("unapproved")
    useEffect(() => { adminGetPosts(pageMode) }, [pageMode])
    const [currentPage, setCurrentPage] = useState(1)

    const setRejected = () => {
        setPageMode("rejected")

    }
    const setUnapproved = () => {
        setPageMode("unapproved")

    }
    const setAllPost = () => {
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
                <Card className='container text-center mx-auto my-5'>
                    <Card.Header as='h1' style={{fontSize:"25px"}}>{username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Xin Chào Quản Trị Viên</Card.Title>
                        <Card.Text>
                            Không có bài đăng!
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        )
    } else {
        body = (<>
            <div className='g-4 mx-auto mt-3 container' >
                {posts.map(post => (
                    <Row key={post._id} className='my-2 mt-3'>
                        <AdminSinglePost post={post} role={user.role} />
                    </Row>
                ))}
            </div>
            <div className="paging-block">
                <Button onClick={() => {
                    if (currentPage > 1) {
                        pageingPost(currentPage - 1)
                        setCurrentPage(currentPage - 1)
                    }
                }}>Prev</Button>
                <div style={{ textAlign: "center", fontSize: "1.5rem", marginLeft: "20px",
                 marginRight: "20px", height: "2.5rem", width: "5rem" }}>{currentPage} / {max_page}</div>
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
        <div className="container">
            <div style={{ marginTop: "20px", fontSize: '40px', textAlign: "center", background: "#78c2ad", color: "white", borderRadius: "20px 20px 0px 0px", margin: "20px auto" }}>Quản Trị Viên</div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="col-text" onClick={setUnapproved} style={pageMode === "unapproved" ? { textDecoration: "underline", width: "33%" } : { width: "33%" }}>Bài viết chờ duyệt</div>
                <div className="col-text" onClick={setRejected} style={pageMode === "rejected" ? { textDecoration: "underline", width: "33%" } : { width: "33%" }}>Bài viết đã bị từ chối</div>
                <div className="col-text" onClick={setAllPost} style={pageMode === "all" ? { textDecoration: "underline", width: "33%" } : { width: "33%" }}>Tất cả bài viết</div>
            </div>
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