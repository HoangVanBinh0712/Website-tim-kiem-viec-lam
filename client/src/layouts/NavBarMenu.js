import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learnItLogo from '../assets/BHQ.png'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import ChangePasswordModal from '../component/account/ChangePasswordModal'
import { UserContext } from '../contexts/UserContext'
import Button from 'react-bootstrap/esm/Button'

const NavbarMenu = () => {
	let navigate = useNavigate();

	const { authState: { user }, logoutUser, searchProfile } = useContext(AuthContext)
	const { setShowModal } = useContext(UserContext)
	const [profileSearchForm, setProfileSearchForm] = useState({
		search: ""
	})
	const onChangeInputSearch = event => {
		setProfileSearchForm({ ...profileSearchForm, [event.target.name]: event.target.value })
	}
	const { search } = profileSearchForm
	let body
	if (user) {
		var username = user.name ? user.name : user.companyname
		const logout = () => logoutUser()
		body = <>
			<>
				<Navbar expand='lg' bg='primary' variant='dark' className='shadow' style={{padding:"0px"}}>
					<div className='container' style={{ position: "relative"}}>
						<Navbar.Brand className='font-weight-bolder text-white' as={Link} to='/dashboard'>
							<div className='div-button'>
								<img
									src={learnItLogo}
									alt='learnItLogo'
									width='170'
									height='60'
									className='mr-2'
									style={{padding:"0 0 0 0"}}
								/>
								<Nav.Link className='font-weight-bolder text-white' to='/dashboard' as={Link}></Nav.Link>
							</div>
						</Navbar.Brand>

						<Navbar.Toggle aria-controls='basic-navbar-nav' />

						<Navbar.Collapse id='basic-navbar-nav'>
							<Nav className='mr-auto'>
								<Nav.Link className='font-weight-bolder text-white' to='/dashboard' as={Link}>Việc Làm</Nav.Link>
								<Nav.Link className='font-weight-bolder text-white' to='/about' as={Link}>Công Ty BHQ</Nav.Link>
							</Nav>
							<Nav>
								{user.role === 0 && <>
									<Dropdown style={{marginLeft:'650px'}}>
										<Dropdown.Toggle id="dropdown-basic">
											{username}
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Dropdown.Item to="/information" as={Link}>Tài Khoản</Dropdown.Item>
											<Dropdown.Item onClick={setShowModal.bind(this, true)}>Đổi Mật Khẩu</Dropdown.Item>
											<Dropdown.Item as={Link} to={"/posts/markedposts"}>Đánh Dấu</Dropdown.Item>
											<Dropdown.Item as={Link} to={"/profile"}>Hồ Sơ Của Tôi</Dropdown.Item>
											<Dropdown.Item onClick={logout}>Đăng Xuất</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</>}
								{user.role === 1 &&
									<Dropdown>
										<Dropdown.Toggle id="dropdown-basic">
											{username}
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Dropdown.Item to="/information" as={Link}>Tài Khoản</Dropdown.Item>
											<Dropdown.Item onClick={setShowModal.bind(this, true)}>Đổi Mật Khẩu</Dropdown.Item>
											<Dropdown.Item as={Link} to={"/posts/yourposts"}>Bài Đăng Của Tôi</Dropdown.Item>
											<Dropdown.Item onClick={logout}>Đăng Xuất</Dropdown.Item>

										</Dropdown.Menu>
									</Dropdown>}

								{user.role === 2 && <Dropdown>
									<Dropdown.Toggle id="dropdown-basic">
										{username}
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item to="/information" as={Link}>Tài Khoản</Dropdown.Item>
										<Dropdown.Item as={Link} to={"/posts/admin"}>Quản Lý Bài Đăng</Dropdown.Item>
										<Dropdown.Item onClick={logout}>Đăng Xuất</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>}
							</Nav >
							{user.role > 0 && <div className='nav-search'>
								<input type="text" value={search} name="search" onChange={onChangeInputSearch} placeholder="Tìm kiếm hồ sơ" />
								<Button style={{ background: "#7f8c8d", marginTop: "-0.5px" }} onClick={() => {
									searchProfile(profileSearchForm);
									if (window.location.pathname !== "/profile/search")
										navigate("/profile/search")
								}
								}><img alt='' src='https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-512.png' style={{maxHeight:"20px",maxWidth:"20px"}}/></Button>
							</div>}
						</Navbar.Collapse>
					</div>
				</Navbar>

				<ChangePasswordModal />
			</>
		</>
	} else {
		body = <>

			<Navbar expand='lg' bg='primary' variant='dark' className='shadow' style={{padding:"0px"}}>
				<div className='container' style={{ position: "relative" }}>

					<Navbar.Brand className='font-weight-bolder text-white'
						as={Link} to='/dashboard'>
						<img src={learnItLogo} alt='learnItLogo' width='150' height='60' className='mr-2' /></Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='mr-auto'>
							<Nav.Link className='font-weight-bolder text-white' to='/dashboard' as={Link}>Việc Làm</Nav.Link>
							<Nav.Link className='font-weight-bolder text-white' to='/about' as={Link} style={{marginLeft:'10px'}}>Giới Thiệu BHQ</Nav.Link>
							<Nav.Link className='font-weight-bolder text-white ' to='/login' as={Link} style={{marginLeft:'760px',border:'1px solid white'}}>Đăng Nhập</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</div>

			</Navbar>
		</>
	}


	return (body)
}

export default NavbarMenu