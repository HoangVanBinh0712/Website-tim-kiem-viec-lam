import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/esm/Button"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from './ActionButtons'
const SinglePost = ({ post: { _id, title, content } }) => (
    <Card className='white-space: nowrap' border='success'  >
        <Card.Body>
            <Card.Title>
                <Row>
                    <Col>
                        <p className='post-title'>{title}</p>
                    </Col>
					<Col className='text-right'>
						<ActionButtons _id={_id}/>
					</Col>
                </Row>
            </Card.Title>
            <Card.Text className='card-text'>{content}</Card.Text>
        </Card.Body>
    </Card>
)
export default SinglePost