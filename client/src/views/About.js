import Quang from '../assets/Quang.jpg'
const About = () => {
	return (
		<>
<div className='container text-center'>
  <h3 style={{marginTop:'18px'}}>Find Job Team</h3>
  <p>OOAD-UML</p>
  <p>Team có ba thành viên và đang trên đà tìm việc, website hỗ trợ tìm kiếm việc làm là 1 phần hỗ trợ tìm việc cho chúng tôi! Thank you for Visiting</p>
  <div class="row">
    <div className='col-sm-4'>
      <p><strong>Nguyễn Thanh Hiền</strong></p>
      <a href="https://www.facebook.com/nguyenhoangthanhbao2801/"><img src='https://scontent.fsgn5-11.fna.fbcdn.net/v/t39.30808-6/273303385_692792885214858_2154211187740679939_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=KszCAarCp-cAX-H50hB&_nc_ht=scontent.fsgn5-11.fna&oh=00_AT_xMNqJuTqnytSYKuFO0w9AUKnDiCYtkI1XoQnPbylNYg&oe=629971BE' alt="learnItLogo" style={{maxHeight:"376px",maxWidth:"240px"}} /></a>
    </div>
    <div className='col-sm-4'>
      <p><strong>Hoàng Văn Bình</strong></p>
      <a href="https://www.facebook.com/hoang.binh.58958343"><img src='https://scontent.fsgn5-15.fna.fbcdn.net/v/t31.18172-8/14917286_356889497993516_6584905443046973026_o.jpg?_nc_cat=111&ccb=1-7&_nc_sid=174925&_nc_ohc=90ue7FKUWUUAX9vziDL&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT-5gN0JE6BaRv_MPBAUEGnW0hH5uejJA6j1gCImykk0jw&oe=62B90450' alt="learnItLogo " style={{maxHeight:"360px",maxWidth:"200px"}}/></a>
    </div>
    <div className='col-sm-4'>
      <p><strong>Trần Văn Quang</strong></p>
      <a href="https://www.facebook.com/tomo.quang.0901"> <img src={Quang} alt="learnItLogo" style={{maxHeight:"355px",maxWidth:"268px"}}/></a>
    </div>
  </div>
</div>
		</>
	)
}
export default About