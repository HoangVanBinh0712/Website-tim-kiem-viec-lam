import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
const SingleProfile = ({ profile: {name, owner_email, phonenumber, birthday, introduce, experience, degree } }) => (
    <Card className='white-space: nowrap' >
        <Card.Body>
            <Card.Title>
                <Card.Text className='post-title'>{name}</Card.Text>
            </Card.Title>
            <Card.Text className='card-detail'>{owner_email}</Card.Text>
            <Row>
                <Card.Text as={Col} className='card-detail col-6'>{phonenumber}</Card.Text>
                <Card.Text as={Col} className='card-detail col-4'>Birthday: {birthday} VNĐ</Card.Text>
            </Row>
            <Card.Text className='card-detail'>{introduce}</Card.Text>
            <Card.Text className='card-detail'>{experience}</Card.Text>
            <Card.Text className='card-detail'>{degree}</Card.Text>
        </Card.Body>
    </Card>
)
export default SingleProfile