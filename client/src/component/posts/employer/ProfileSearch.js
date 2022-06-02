import { useContext } from "react"
import Spinner from "react-bootstrap/esm/Spinner"
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import { AuthContext } from "../../../contexts/AuthContext"
import SingleProfile from "./SingleProfile"

const ProfileSearch = () => {
    const { authState: { user, profileLoading, profiles } } = useContext(AuthContext)
    let body = null
    var username = ""
    if (user)
        username = user.name ? user.name : user.companyname

    if (profileLoading) {
        body = (
            <div className="spinner-container" style={{marginTop: "10rem"}}><Spinner animation="border" variant="info" /></div>
        )
    } else if (profiles.length === 0) {
        body = (
            <>
                <Card className='text-center mx-auto my-5 container'>
                    <Card.Header as='h1' style={{fontSize:"25px"}}>Chào {username}</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Không tìm thấy hồ sơ phù hợp !
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
                        <SingleProfile profile={profile} />
                    </Row>
                ))}
            </div>
        </>)
    }


    return <>
        <div className="container" style={{ marginTop: "20px", fontSize: '40px', textAlign: "center", background: "#78c2ad", color: "white", borderRadius:"20px 20px 0px 0px", margin:"20px auto"}}>Tìm kiếm hồ sơ </div>
        {body}
    </>
}
export default ProfileSearch