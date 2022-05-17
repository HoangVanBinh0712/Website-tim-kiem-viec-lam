import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/esm/Button"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ActionButtons from '../ActionButtons'
import { Link } from 'react-router-dom'
import AdminPostButton from '../AdminPostButton'

const AdminSinglePost = ({ post: { _id, title, description,salary,status,location }, role }) => (
    <Card className='white-space: nowrap' border={status=="approved"?'success' : status == "pending"? "warning": 'danger'} >
        <Card.Body>
            <Card.Title>
                <Row>
                    <Col className='col-9'>
                        <Link className='post-title' to={`/postDetail/${_id}`}>{title}</Link>
                    </Col>
                    <Col className='text-right col-3'>
                        {role > 0 ? <AdminPostButton _id={_id} ptitle={title} /> : ""}
                    </Col>
                </Row>
            </Card.Title>
            <Card.Text as={Col} className='card-detail col-8'>{description}</Card.Text>

            <Row>
            <Card.Text as={Col} className='card-detail col-6'>{location}</Card.Text>
            <Card.Text as={Col} className='card-detail col-4'>Lương: {salary} VNĐ</Card.Text>
            </Row>
        </Card.Body>
    </Card>
)
export default AdminSinglePost