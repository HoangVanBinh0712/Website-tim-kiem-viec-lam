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
import { AuthContext } from '../../contexts/AuthContext'
const PostDetail = () => {
    let { id } = useParams();

    const { postState: { post, postsLoading }, findPostById,
        showToast: { show, message, type }, setShowToast } = useContext(PostContext)

    const { isSubmitted, setIsSubmitted, isSubmittedPost,
        applyJob, markPost, isUserMarkedPost,
        isMarked, setIsMarked } = useContext(UserContext)
    const { authState: { user } } = useContext(AuthContext)

    useEffect(() => { isSubmittedPost(id); isUserMarkedPost(id);findPostById(id);  }, [id])
    const savePost = async postId => {
        const { success, message } = await markPost(postId)
        setShowToast({ show: true, message: message, type: success ? 'success' : 'danger' })
    }

    const applyForJob = async postId => {
        const { success, message } = await applyJob(postId)
        setShowToast({ show: true, message: message, type: success ? 'success' : 'danger' })
        if (success) setIsSubmitted(!isSubmitted)
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
                        <Card.Text className='card-text' style={{ fontSize: "30px", fontWeight: "600",textDecoration: "underline" }}>M?? t??? c??ng vi???c</Card.Text>
                        {/* <Card.Text className='card-text' style={{maxLines: "5"}}>{post.description}</Card.Text> */}
                        <textarea style={{ border: "0px" }}>{post.description}</textarea>
                        <hr/>
                        <Card.Text className='card-text' style={{ fontSize: "30px", fontWeight: "600" ,textDecoration: "underline"}} >M???c L????ng</Card.Text>
                        <Card.Text className='card-text'><img src="https://www.pngitem.com/pimgs/m/90-907567_transparent-cash-cow-png-money-icon-png-image.png" width="40px" height="30px" style={{marginRight: "10px"}}/>{post.salary} tri???u</Card.Text>

                        <hr/>

                        <Card.Text className='card-text' style={{ fontSize: "30px", fontWeight: "600",textDecoration: "underline" }}>Y??u c???u</Card.Text>
                        <Card.Text className='card-text'>{post.requirement} </Card.Text>

                        <hr/>
                        <Card.Text className='card-text' style={{ fontSize: "30px", fontWeight: "600",textDecoration: "underline" }}>?????a ??i???m</Card.Text>
                        <Card.Text className='card-text'>{post.location} </Card.Text>
                        <hr/>

                        <Card.Text className='card-text' style={{ fontSize: "30px", fontWeight: "600",textDecoration: "underline" }}>Ng??y k???t th??c</Card.Text>
                        <Card.Text className='card-text'>{post.dateEnd}</Card.Text>

                        <hr/>
                    </Row>
                    {user ? user.role === 0 && <Row>

                        <Button as={Col} className="col-2" onClick={() => {
                            const text = isMarked === true ? "b??? ????nh d???u" : "????nh d???u"
                            const confirmBox = window.confirm(
                                `B???n c?? mu???n ${text} '` + post.title + " kh??ng' ?"
                            )
                            if (confirmBox === true) {
                                savePost(post._id);
                                setIsMarked(!isMarked)

                            }
                        }}
                            style={{ margin: "0 10px 0 10px" }}>{isMarked === true ? "B??? l??u b??i vi???t" : "L??u b??i vi???t"}</Button>
                        {/*isSubmittedPost*/}
                        <Button as={Col} className="col-2" style={{ margin: "0 10px 0 10px" }}
                            onClick={() => {
                                const text = isSubmitted === true ? "r??t h??? s?? kh???i" : "n???p h??? s?? v??o"
                                const confirmBox = window.confirm(
                                    `B???n c?? mu???n ${text} '` + post.title + " kh??ng ' ?"
                                )
                                if (confirmBox === true) {
                                    applyForJob(post._id)
                                }
                            }}> {isSubmitted ? "R??t h??? s??" : "N???p h??? s??"}</Button>
                    </Row> : ""}
                </Card.Body>
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