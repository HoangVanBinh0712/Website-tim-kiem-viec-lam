import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import learnItLogo from '../assets/logo.svg'
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
				<Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
					<div className='container' style={{ position: "relative" }}>
						<Navbar.Brand className='font-weight-bolder text-white' as={Link} to='/'>
							<div className='div-button'>
								<img
									src={learnItLogo}
									alt='learnItLogo'
									width='32'
									height='32'
									className='mr-2'
								/>
								<Nav.Link className='font-weight-bolder text-white' to='/dashboard' as={Link}>CNPM HĐT</Nav.Link>
							</div>
						</Navbar.Brand>

						<Navbar.Toggle aria-controls='basic-navbar-nav' />

						<Navbar.Collapse id='basic-navbar-nav'>
							<Nav className='mr-auto'>
								<Nav.Link className='font-weight-bolder text-white' to='/dashboard' as={Link}>Dashboard</Nav.Link>
								<Nav.Link className='font-weight-bolder text-white' to='/about' as={Link}>About</Nav.Link>
							</Nav>
							<Nav>
								{user.role === 0 && <>
									<Dropdown>
										<Dropdown.Toggle id="dropdown-basic">
											{username}
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Dropdown.Item to="/information" as={Link}>Account</Dropdown.Item>
											<Dropdown.Item onClick={setShowModal.bind(this, true)}>Change Password</Dropdown.Item>
											<Dropdown.Item as={Link} to={"/posts/markedposts"}>Marked Posts</Dropdown.Item>
											<Dropdown.Item as={Link} to={"/profile"}>Your Profile</Dropdown.Item>
											<Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</>}
								{user.role === 1 &&
									<Dropdown>
										<Dropdown.Toggle id="dropdown-basic">
											{username}
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Dropdown.Item to="/information" as={Link}>Account</Dropdown.Item>
											<Dropdown.Item onClick={setShowModal.bind(this, true)}>Change Password</Dropdown.Item>
											<Dropdown.Item as={Link} to={"/posts/yourposts"}>Your Posts</Dropdown.Item>
											<Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>

										</Dropdown.Menu>
									</Dropdown>}

								{user.role === 2 && <Dropdown>
									<Dropdown.Toggle id="dropdown-basic">
										{username}
									</Dropdown.Toggle>
									<Dropdown.Menu>
										<Dropdown.Item to="/information" as={Link}>Account</Dropdown.Item>
										<Dropdown.Item as={Link} to={"/posts/admin"}>Unapproved Posts</Dropdown.Item>
										<Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>}
							</Nav >
							{user.role > 0 && <div className='nav-search'>
								<input type="text" value={search} name="search" onChange={onChangeInputSearch} placeholder="Tìm kiếm hồ sơ" />
								<Button style={{ background: "#7f8c8d", marginTop: "-0.5px" }} onClick={() => {
									searchProfile(profileSearchForm);
									if (window.location.pathname != "/profile/search")
										navigate("/profile/search")
								}
								}>Search</Button>
							</div>}
						</Navbar.Collapse>
					</div>
				</Navbar>

				<ChangePasswordModal />
			</>
		</>
	} else {
		body = <>

			<Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
				<div className='container' style={{ position: "relative" }}>

					<Navbar.Brand className='font-weight-bolder text-white'
						as={Link} to='/dashboard'>
						<img src={learnItLogo} alt='learnItLogo' width='32' height='32' className='mr-2' />CNPM HĐT</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='mr-auto'>
							<Nav.Link className='font-weight-bolder text-white' to='/login' as={Link}>Login</Nav.Link>
							<Nav.Link className='font-weight-bolder text-white' to='/about' as={Link}>About</Nav.Link>
							<Nav.Link className='font-weight-bolder text-white' to='/dashboard' as={Link}>Dashboard</Nav.Link>
						</Nav>
						<Nav>
							<Nav.Link className='font-weight-bolder text-white'></Nav.Link>
						</Nav>

					</Navbar.Collapse>
				</div>

			</Navbar>
		</>
	}


	return (body)
}

export default NavbarMenu