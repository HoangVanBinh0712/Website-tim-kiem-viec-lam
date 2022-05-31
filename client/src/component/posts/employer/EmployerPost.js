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
import EmployerSinglePost from "./EmployerSinglePost"

const EmployerPost = () => {
    const { postState: { post, posts, postsLoading }, getPosts,
        setShowAddPostModal, showToast: { show, message, type }, setShowToast } = useContext(PostContext)
    const { authState: { user } } = useContext(AuthContext)

    useEffect(() => { getPosts(true) }, [])
    let body = null
    var username = user.name ? user.name : user.companyname

    if (postsLoading) {
        body = (
            <div className="spinner-container"><Spinner animation="border" variant="info" /></div>
        )
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>{username}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Click the button below to Add Post 
                        </Card.Text>
                        <Button variant="primary" onClick={setShowAddPostModal.bind(this, true)}>Add</Button>
                    </Card.Body>
                </Card>
            </>
        )
    } else {
        body = (<>
            <Row className='g-4 mx-auto mt-3 container' >
                {posts.map(post => (
                    <Row key={post._id} className='my-2'>
                        <EmployerSinglePost post={post} role={user.role} />
                    </Row>
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


    return <>
        <div className="container" style={{ marginTop: "20px",fontSize: '40px', textAlign: "center", background: "#78c2ad", color: "white", borderRadius:"20px 20px 0px 0px",width: "1250px", margin:"20px auto",marginLeft: "123px"}}>Bài Đăng Tuyển Dụng</div>
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
export default EmployerPost