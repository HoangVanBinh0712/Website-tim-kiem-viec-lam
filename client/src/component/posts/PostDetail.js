import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { PostContext } from '../../contexts/PostContext'
import Spinner from 'react-bootstrap/esm/Spinner'

const PostDetail = () => {
    let { id } = useParams();

    const { postState: { post, postsLoading }, findPostById, } = useContext(PostContext)
    useEffect(() => { findPostById(id) }, [id])
    let body
    if (postsLoading || post === null)
        body = (<div className="spinner-container"><Spinner animation="border" variant="info" /></div>)
    else
        body = <Card className='card-detail container' border='success'>
            <Card.Body>
                <Card.Title >
                    <Row>
                        <p className='post-title' style={{ fontSize: "40px", textAlign: "center",fontWeight: "700" }}>{post.title}</p>
                    </Row>
                </Card.Title>
                <Row>
                    <Card.Text className='card-text' style={{ fontSize: "30px",fontWeight: "600"}}>Mô tả công việc</Card.Text>
                    <Card.Text className='card-text'>{post.description}</Card.Text>

                    <Card.Text className='card-text'style={{ fontSize: "30px",fontWeight: "600"}} >Mức Lương</Card.Text>
                    <Card.Text className='card-text'>{post.salary} VNĐ</Card.Text>

                    <Card.Text className='card-text'style={{ fontSize: "30px",fontWeight: "600"}}>Yêu cầu</Card.Text>
                    <Card.Text className='card-text'>{post.requirement} </Card.Text>

                    <Card.Text className='card-text'style={{ fontSize: "30px",fontWeight: "600"}}>Địa điểm</Card.Text>
                    <Card.Text className='card-text'>{post.location} </Card.Text>

                    <Card.Text className='card-text'style={{ fontSize: "30px",fontWeight: "600"}}>Ngày kết thúc</Card.Text>
                    <Card.Text className='card-text'>{post.dateEnd}</Card.Text>
                </Row>

            </Card.Body>
        </Card>
    return <>{body}</>

}

export default PostDetail