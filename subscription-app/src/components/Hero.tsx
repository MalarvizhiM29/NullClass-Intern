import "./Hero.css"
import heroImage from "../assets/bg-image-new.jpg"
import { useState } from "react"


const Hero:React.FC = () => {

  const [isPopupOpen,setIsPopupOpen] = useState(false);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [isLoginForm,setIsLoginForm] = useState(true);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  }

  const handleEmailChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setPassword(event.target.value);
  }

  const switchForm = () =>{
    setIsLoginForm(!isLoginForm);
  }

  return (
    <div className="hero">
      <img src={heroImage} alt="image" className="hero-img"></img>
      <div className={`hero-content ${isPopupOpen ? 'blur' : ''}`}>
        <div className="content">
          <h2 className="disk">Empowering Learning Through Collaborative Exchange
          <span className="disk-span">Unlocking Learning Potential through Collaborative Knowledge Exchange.</span></h2>
          <button  className="hero-button" onClick={togglePopup}>Login</button>
          <button className="hero-button" onClick={togglePopup}>Sign Up</button>
        </div>
      </div>
      {isPopupOpen &&(
        <div className="popup">
          <div className="popup-inner">
            <div className="popup-first">
            <h3 className="popup-heading">Enter your email:</h3>
            <button className="popup-close" onClick={togglePopup}>X</button>
            </div>
            <form action={isLoginForm? '/login':'/signup'} method="POST">
              <div className="form-group">
              <input type="email" placeholder="Enter Email" className="popup-input" value={email} onChange={handleEmailChange}></input>
              </div>
              <div className="form-group">
              <input type="password" placeholder="Enter Password" className="popup-input" value={password} onChange={handlePasswordChange}></input>
              </div>
              <div className="popup-action">
                <button type="submit" className="popup-action-button">
                  {isLoginForm?"Login":"Sign Up"}
                </button>
                <button type="button" className="popup-action-button" onClick={switchForm}>
                  {isLoginForm?"Switch to Sign Up":"Switch to Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Hero