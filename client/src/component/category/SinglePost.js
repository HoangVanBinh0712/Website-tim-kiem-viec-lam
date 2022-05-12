import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/esm/Button"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from './ActionButtons'
import { Link, Navigate } from 'react-router-dom'

const SinglePost = ({ post: { _id, title, content }, role }) => (
    <Card className='white-space: nowrap' border='success'  >
        <Card.Body>
            <Card.Title>
                <Row>
                    <Col>
                        <Link className='post-title' to={`/postDetail/${_id}`}>{title}</Link>
                    </Col>
                    <Col className='text-right'>
                        {role > 0 ? <ActionButtons _id={_id} ptitle={title} /> : ""}
                        {role == 0 ? <Button>
                            Detail
                        </Button> : ""}
                    </Col>
                </Row>
            </Card.Title>
            <Card.Text className='card-text'>{content}</Card.Text>
        </Card.Body>
    </Card>
)
export default SinglePost