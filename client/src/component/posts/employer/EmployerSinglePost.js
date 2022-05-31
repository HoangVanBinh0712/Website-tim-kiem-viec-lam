import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ActionButtons from '../ActionButtons'
import { Link } from 'react-router-dom'

const EmployerSinglePost = ({ post: { _id, title, description,salary,status,location }, role }) => (
    <Card className='white-space: nowrap' border={status==="approved"?'success' : status === "pending"? "warning": 'danger'} >
        <Card.Body>
            <Card.Title>
                <Row>
                    <Col className='col-10'>
                        <Link className='post-title' to={`/postDetail/${_id}`}>{title}</Link>
                    </Col>
                    <Col className='text-right col-2'>
                        {role > 0 ? <ActionButtons _id={_id} ptitle={title} /> : ""}
                    </Col>
                </Row>
            </Card.Title>
            <Card.Text as={Col} className='card-detail col-8'>{description}</Card.Text>

            <Card.Text as={Col} className='card-detail col-6'>{location}</Card.Text>
        </Card.Body>
    </Card>
)
export default EmployerSinglePost