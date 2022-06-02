import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/esm/Button"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import star from '../../../assets/star.jpg'
import { useContext } from 'react'
import { PostContext } from '../../../contexts/PostContext'
const MarkedSinglePost = ({ post: { _id, title, description, salary, status, location } }) => {
    const { setShowToast,deleteMarkPost } = useContext(PostContext)

    const savePost = async postId => {
        const { success, message } = await deleteMarkPost(postId)
        setShowToast({ show: true, message: message, type: success ? 'success' : 'danger' })
    }
    return <><Card className='white-space: nowrap' border={status === "approved" ? 'success' : status === "pending" ? "warning" : 'danger'} >
        <Card.Body>
            <Card.Title>
                <Row>
                    <Row>
                        <Col as={Link} to={`/postDetail/${_id}`} className='col-7 post-title ' style={{ fontSize: "40px", textAlign: "left", fontWeight: "700" }}>{title}  </Col>
                        <Col className="col-5" style={{ textAlign: "right" }} >
                            <img src={star} style={{ width: "50px", height: "50px" }} alt=''/>
                        </Col>
                    </Row>
                </Row>
            </Card.Title>
            <Card.Text as={Col} className='card-detail col-8'>{description}</Card.Text>
            <Row>
                <Card.Text as={Col} className='card-detail col-6'>{location}</Card.Text>
                <Card.Text as={Col} className='card-detail col-4'>Lương: {salary} Triệu</Card.Text>
                <Button as={Col} className='col-2' style={{ background: "#e74c3c", textAlign: 'center', fontSize: "25px", marginTop: "5px" }}
                    onClick={() => {
                        const confirmBox = window.confirm(
                            `Bạn có muốn bỏ đánh dấu bài viết '` + title + "' không ?"
                        )
                        if (confirmBox === true) {
                            savePost(_id);
                        }
                    }}>Xóa</Button>
            </Row>
        </Card.Body>
    </Card>
    </>
}
export default MarkedSinglePost