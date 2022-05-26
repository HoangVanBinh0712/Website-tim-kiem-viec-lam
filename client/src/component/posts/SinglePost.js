import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link} from 'react-router-dom'

const SinglePost = ({ post: { _id, title, description,salary } }) => (
    <Card className='white-space: nowrap' border='success'  >
        <Card.Body>
            <Card.Title>
                <Row>
                    <Col className='col-12'>
                        <Link className='post-title' to={`/postDetail/${_id}`}>{title}</Link>
                    </Col>
                </Row>
            </Card.Title>
            <Card.Text className='card-text'>{description}</Card.Text>
            <Card.Text className='card-text'>{salary} VNĐ</Card.Text>
        </Card.Body>
    </Card>
)
export default SinglePost