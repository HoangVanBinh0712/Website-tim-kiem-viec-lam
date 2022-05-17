import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { PostContext } from '../../contexts/PostContext'
import Spinner from 'react-bootstrap/esm/Spinner'
import hollow_star from '../../assets/hollow_star.png'
import star from '../../assets/star.jpg'
import Toast from 'react-bootstrap/Toast'

import { UserContext } from '../../contexts/UserContext'
const PostDetail = () => {
    let { id } = useParams();

    const { postState: { post, postsLoading }, findPostById, showToast: { show, message, type }, setShowToast } = useContext(PostContext)
    const { markPost, isUserMarkedPost, isMarked, setIsMarked } = useContext(UserContext)
    useEffect(() => { findPostById(id); isUserMarkedPost(id) }, [id])
    const savePost = async postId => {
        const {success,message} = await markPost(postId)
        setShowToast({ show: true, message: message, type: success ? 'success' : 'danger' })
    }
    let body
    if (postsLoading || post === null)
        body = (<div className="spinner-container"><Spinner animation="border" variant="info" /></div>)
    else {
        body = <>
            <Card className='card-detail container' border='success'>
                <Card.Body>
                    <Card.Title >
                        <Row>
                            <Col className='col-7 post-title ' style={{ fontSize: "40px", textAlign: "right", fontWeight: "700" }}>{post.title}  </Col>
                            <Col className="col-5" style={{ textAlign: "right" }} >
                                <img src={isMarked ? star : hollow_star} style={{ width: "50px", height: "50px" }} />
                            </Col>
                        </Row>
                    </Card.Title>
                    <Row>
                        <Card.Text className='card-text' style={{ fontSize: "30px", fontWeight: "600" }}>Mô tả công việc</Card.Text>
                        <Card.Text className='card-text'>{post.description}</Card.Text>

                        <Card.Text className='card-text' style={{ fontSize: "30px", fontWeight: "600" }} >Mức Lương</Card.Text>
                        <Card.Text className='card-text'>{post.salary} VNĐ</Card.Text>

                        <Card.Text className='card-text' style={{ fontSize: "30px", fontWeight: "600" }}>Yêu cầu</Card.Text>
                        <Card.Text className='card-text'>{post.requirement} </Card.Text>

                        <Card.Text className='card-text' style={{ fontSize: "30px", fontWeight: "600" }}>Địa điểm</Card.Text>
                        <Card.Text className='card-text'>{post.location} </Card.Text>

                        <Card.Text className='card-text' style={{ fontSize: "30px", fontWeight: "600" }}>Ngày kết thúc</Card.Text>
                        <Card.Text className='card-text'>{post.dateEnd}</Card.Text>
                    </Row>

                </Card.Body>
                <Row>
                    <Button as={Col} className="col-2" onClick={() => {
                        const text = isMarked === true ? "Unmark" : "Mark"
                        const confirmBox = window.confirm(
                            `Do you really want to ${text} '` + post.title + "' ?"
                        )
                        if (confirmBox === true) {
                            savePost(post._id);
                            if (text == 'Unmark')
                                setIsMarked(false)
                            else
                                setIsMarked(true)

                        }

                    }}
                        style={{ margin: "0 10px 0 10px" }}>Lưu bài viết</Button>
                    <Button as={Col} className="col-2" style={{ margin: "0 10px 0 10px" }}>Nộp hồ sơ</Button>
                </Row>
            </Card>
        </>
    }

    return <>{body}
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

export default PostDetail