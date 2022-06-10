import { Navbar,Container,Nav,Row} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'


function NavbarSection(){
  let navigate=useNavigate(); 

    return(
        <Navbar expand="lg">
            <Container fluid>
            <div className='infoMenu'>
                <Nav.Link onClick={()=>{navigate("/myinfo")}} className="myinfo">내정보</Nav.Link>  
                <Nav.Link onClick={()=>{navigate("/cart")}} className="cart">장바구니</Nav.Link>
            </div>
        
            <Navbar.Brand onClick={()=>{navigate("/")}} >NEARFETCH</Navbar.Brand>
            <br/>
            <Navbar.Collapse id="navbarScroll">
                <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
                >
                <Nav.Link onClick={()=>{navigate("/designers")}}>DESIGNERS</Nav.Link>
                <Nav.Link onClick={()=>{navigate("/women")}}>WOMEN</Nav.Link>
                <Nav.Link onClick={()=>{navigate("/men")}}>MEN</Nav.Link>
                <Nav.Link onClick={()=>{navigate("/sale")}}>SALE</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Container>
         </Navbar>
    )
}

export default NavbarSection;