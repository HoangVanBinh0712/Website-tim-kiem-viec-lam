import { useContext, useEffect } from "react"
import Spinner from "react-bootstrap/esm/Spinner"
import { AuthContext } from "../../../contexts/AuthContext"
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import SingleProfile from "./SingleProfile"
import { useParams } from "react-router-dom"

const ViewSubmmiterProfile = () => {
    const {id} = useParams();
    const { authState: { user,profileLoading,profiles },getProfileSubmitted } = useContext(AuthContext)


    useEffect(() => { getProfileSubmitted(id) }, [])
    let body = null
    var username = user.name ? user.name : user.companyname

    if (profileLoading) {
        body = (
            <div className="spinner-container"><Spinner animation="border" variant="info" /></div>
        )
    } else if (profiles.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Wellcome</Card.Title>
                        <Card.Text>
                            No profile has been submitted to your post !.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        )
    } else {
        body = (<>
            <div className='g-4 mx-auto mt-3 container' >
                {profiles.map(profile => (
                    <Row key={profile._id} className='my-2 mt-3'>
                        <SingleProfile profile={profile}/>
                    </Row>
                ))}
            </div>
        </>)
    }


    return <>
        <div className="container" style={{ marginTop: "20px",fontSize: '40px', textAlign: "center",  background: "#78c2ad", 
        color: "white", borderRadius:"20px 20px 0px 0px", margin:"20px auto" }}>Hồ sơ ứng tuyển</div>
        {body}
    </>
}
export default ViewSubmmiterProfile