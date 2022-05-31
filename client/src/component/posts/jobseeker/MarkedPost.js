import { PostContext } from "../../../contexts/PostContext"
import { useContext, useEffect } from "react"
import Spinner from "react-bootstrap/esm/Spinner"
import { AuthContext } from "../../../contexts/AuthContext"
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import MarkedSinglePost from "./MarkedSinglePost"

const MarkedPosts = () => {
    const { postState: { posts, postsLoading }, getMarkedPosts, showToast: { show, message, type }, setShowToast } = useContext(PostContext)
    const { authState: { user } } = useContext(AuthContext)

    useEffect(() => { getMarkedPosts() }, [])
    let body = null
    var username = user.name ? user.name : user.companyname
    if (postsLoading) {
        body = (
            <div className="spinner-container"><Spinner animation="border" variant="info" /></div>
        )
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'style={{width:"1250px", left:"82px"}}>
                    <Card.Header as='h1'style={{fontSize:"25px"}}>{username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Xin chào</Card.Title>
                        <Card.Text>
                            Không có bài viết đánh dấu
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        )
    } else if (posts != null) {
        body = (<>
            <Row className='g-4 mx-auto mt-3 container' >
                {posts.map(post => (
                    post.postId ? <Row key={post.postId._id} className='my-2'>
                        <MarkedSinglePost post={post.postId} role={user.role} />
                    </Row> : ""
                ))}

            </Row>
        </>)
    }


    return <>
        <div className="container" style={{ marginTop: "20px", fontSize: '40px', textAlign: "center", background: "#78c2ad", color: "white", borderRadius:"20px 20px 0px 0px",width: "1250px", margin:"20px auto",marginLeft: "130px" }}>Đánh Dấu Bài Viết</div>
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
export default MarkedPosts