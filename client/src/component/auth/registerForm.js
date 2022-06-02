import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import AlertMessage from '../../layouts/Alert'

const RegisterForm = () => {
    //Context
    const navigate = useNavigate()
    const [registerForm, setRegisterForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        mode: ''
    })
    const { registerUser, authState: { authLoading, isAuthenticated } } = useContext(AuthContext)
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


    var { email, password, confirmPassword, mode, phonenumber, address, name, birthday } = registerForm

    const onChangeRegisterForm = event => setRegisterForm({
        ...registerForm, [event.target.name]: event.target.value
    })
    const register = async event => {
        event.preventDefault()
        if (!registerForm.mode) registerForm.mode = '0'
        if (password !== confirmPassword) {
            setAlert({ type: 'danger', message: 'Mật khẩu không khớp !' })
            setTimeout(() => setAlert(null), 5000)
            return
        }

        try {
            const registerData = await registerUser(registerForm)
            if (!registerData.success) {
                setAlert({ type: 'danger', message: registerData.message })
                setTimeout(() => setAlert(null), 5000)
            } else {
                setAlert({ type: 'success', message: registerData.message })
                setTimeout(() => setAlert(null), 5000)
            }
        } catch (error) {
            console.log('error')
        }

    }

    return (
        <>
            <div className='landing'>
                <div className='dark-overlay'>
                    <div className='landing-inner'>
                        <h1>Đăng Ký Tìm Việc</h1>
                        <h4>Website Hỗ Trợ Tìm Kiếm Việc Làm Cho Sinh Viên</h4>
                        <Form className='my-4' onSubmit={register}>
                            <AlertMessage info={alert} />
                            <Form.Group className="mb-3"   >
                                <Form.Control type='email' placeholder='Địa chỉ email' name='email' value={email} required onChange={onChangeRegisterForm} />
                            </Form.Group>
                            <Form.Group className="mb-3"   >
                                <Form.Control type='text' placeholder='Số điện thoại' name='phonenumber' value={phonenumber} required onChange={onChangeRegisterForm} />
                            </Form.Group>
                            <Form.Group className="mb-3"   >
                                <Form.Control type='text' placeholder='Địa chỉ' name='address' value={address} required onChange={onChangeRegisterForm} />
                            </Form.Group>
                            <Form.Group className="mb-3"   >
                                <Form.Control type='text' placeholder='Họ và Tên' name='name' value={name} required onChange={onChangeRegisterForm} />
                            </Form.Group>
                            <Form.Group className="mb-3"   >
                                <Form.Control type='Date' placeholder='Ngày sinh' name='birthday' value={birthday} required onChange={onChangeRegisterForm} />
                            </Form.Group>
                            <Form.Group className="mb-3"   >
                                <Form.Control type='password' placeholder='Mật khẩu' name='password' value={password} required onChange={onChangeRegisterForm} />
                            </Form.Group>
                            <Form.Group className="mb-3"   >
                                <Form.Control type='password' placeholder='Xác nhận mật khẩu' name='confirmPassword' value={confirmPassword} required onChange={onChangeRegisterForm} />
                            </Form.Group>
                            <Button variant='success' type='submit'>Đăng Ký</Button>
                        </Form>
                        <p>Bạn Đã Có Tài Khoản ?
                            <Link to={'/login'}>Đăng Nhập</Link>
                        </p>
                        <p>
                            Bạn Là Nhà Tuyển Dụng ?
                            <Link to={'/registerEmp'}>Đăng Ký Tuyển Dụng</Link>
                        </p>
                    </div>
                </div>
            </div>

        </>)
}
export default (RegisterForm)