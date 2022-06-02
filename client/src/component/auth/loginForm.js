import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import AlertMessage from '../../layouts/Alert'

const LoginForm = () => {
    const navigate = useNavigate()
    //Context
    const { authState: { authLoading, isAuthenticated }, loginUser, getProfile } = useContext(AuthContext)
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
        mode: ''
    })
    const [alert, setAlert] = useState(null)
    if (authLoading) {
        return <>
            <div className='landing'>
                <div className='dark-overlay'>
                    <div className='landing-inner'>
                        <h1>Đăng nhập</h1>
                        <h4>Giúp bạn tìm công việc phù hợp nhất với bạn.</h4>
                        <div className='d-flex justify-content-center mt-2'>
                            <Spinner animation='border' variant='info' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    } else if (isAuthenticated) return <Navigate to={'/dashboard'} />
    //Router

    var { email, password, mode } = loginForm

    const onChangeLoginForm = event => setLoginForm({
        ...loginForm, [event.target.name]: event.target.value
    })
    const onClick = () => {
        setAlert({ type: 'info', message: "Đang đăng nhập..." })
        setTimeout(() => setAlert(null), 3000)
    }
    const login = async event => {
        event.preventDefault()
        try {
            if (!loginForm.mode) loginForm.mode = '0';
            console.log(loginForm)
            const loginData = await loginUser(loginForm)
            if (loginData.success) {
                getProfile()
                navigate('/dashboard')
            } else {
                setAlert({ type: 'danger', message: loginData.message })
                setTimeout(() => setAlert(null), 5000)
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            <div className='landing'>
                <div className='dark-overlay'>
                    <div className='landing-inner'>
                        <h1>Đăng Nhập</h1>
                        <h4>Website Hỗ Trợ Tìm Kiếm Việc Làm Cho Sinh Viên</h4>

                        <Form className='my-4' onSubmit={login}>
                            <AlertMessage info={alert} />
                            <Form.Group className="mb-3"  >
                                <Form.Control type='email' placeholder='Địa chỉ Email' name='email'
                                    required value={email} onChange={onChangeLoginForm}></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type='password' placeholder='Mật khẩu' name='password'
                                    required value={password} onChange={onChangeLoginForm} />
                            </Form.Group>
                            <Form.Label type='text' className="mb-3" controlId="formBasicLable" >Chọn chế độ</Form.Label>
                            <Form.Group className="mb-3" controlId="formBasicSelection">
                                <Form.Select name='mode' value={mode} onChange={onChangeLoginForm}>
                                    <option value="0" >Người tìm việc</option>
                                    <option value="1" >Nhà tuyển dụng</option>
                                    <option value="2" >Quản trị viên</option>
                                </Form.Select>
                            </Form.Group>
                            <Button variant='success' type='submit' onClick={() => {
                                onClick();
                            }}>
                                Đăng Nhập
                            </Button>
                        </Form>
                        <p>
                            Bạn Chưa Có Tài Khoản?
                            <Link to={'/register'}>Đăng Ký</Link>
                        </p>
                    </div>
                </div>
            </div>

        </>)
}
export default (LoginForm)