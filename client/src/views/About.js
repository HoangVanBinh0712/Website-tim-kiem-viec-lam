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
      <a href="https://www.facebook.com/hoang.binh.58958343"><img src='https://scontent.fsgn16-1.fna.fbcdn.net/v/t31.18172-8/18839822_460759074273224_5112445143152378029_o.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=OFIPhumkWGsAX_CzSbf&_nc_ht=scontent.fsgn16-1.fna&oh=00_AT8x3IYCm7N0n9OeRIn099PcbDBJh-zom0rSgwxC0tf8WQ&oe=62B9A24C' alt="learnItLogo " style={{maxHeight:"360px",maxWidth:"200px"}}/></a>
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