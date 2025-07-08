import React, { use, useContext, useEffect, useState } from 'react'
import './assets/css/styles.css'
import { IconContext } from 'react-icons'
import { FaFacebookF, FaGoogle, FaLinkedinIn, FaUser } from 'react-icons/fa'
import { IoMail } from 'react-icons/io5'
import { IoMdUnlock } from 'react-icons/io'
import supabase from './utils/supabase'
import { AuthContext } from './context/AuthContext'
const App = () => {

  const [caopen, setCaopen] = useState(true);
  const [caname, setCaname] = useState("");
  const [caemail, setCaemail] = useState("");
  const [capassword, setCapassword] = useState("");
  const [laemail, setLaemail] = useState("");
  const [lapassword, setLapassword] = useState("");

  const { session, signUp, signIn, signOut } = useContext(AuthContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (caname === "" || caemail === "" || capassword === "") {
      alert("Please fill all fields");
      return;
    }
    const { error } = await signUp({ name: caname, email: caemail, password: capassword });
    if (error) {
      alert(`Sign up failed: ${error.message}`);
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (laemail === "" || lapassword === "") {
      alert("Please fill all fields");
      return;
    }
    const { error } = await signIn({ email: laemail, password: lapassword });
    if (error) {
      alert(`Sign in failed: ${error.message}`);
    }
  }






  useEffect(() => {
    if (caopen && !session) {

      document.querySelector('.animation-overlay').classList.add('animate-overlay2');

      setTimeout(() => {
        [...document.querySelectorAll('.for-ca')].map(item => { item.classList.add('opened'); item.classList.remove('closed') });
        [...document.querySelectorAll('.for-la')].map(item => { item.classList.add('closed'); item.classList.remove('opened') });

        document.querySelector('.main-con').style.flexDirection = "row";
      }, 500)
      setTimeout(() => {
        document.querySelector('.animation-overlay').classList.remove('animate-overlay2');
      }, 1000)

    } else if (!session) {


      document.querySelector('.animation-overlay').classList.add('animate-overlay1');

      setTimeout(() => {
        [...document.querySelectorAll('.for-la')].map(item => { item.classList.add('opened'); item.classList.remove('closed') });
        [...document.querySelectorAll('.for-ca')].map(item => { item.classList.add('closed'); item.classList.remove('opened') });

        document.querySelector('.main-con').style.flexDirection = "row-reverse";
      }, 500);

      setTimeout(() => {
        document.querySelector('.animation-overlay').classList.remove('animate-overlay1');
      }, 1000)
    }

  }, [caopen, session]);





  return (
    <div>
      {session!=null && session != undefined && (
        <div className='d-flex justify-content-center align-items-center flex-column vh-100'>
          <h1 className='text-center my-5'>Welcome, {session.user.user_metadata.name}!</h1>
          <button className='button my-5' onClick={() => signOut()}>Sign Out</button>
        </div>
      )}
      {session ==null && session ==undefined && (
      <div className='main-con row d-flex'>
        <div className="animation-overlay w-100 h-100"></div>
        <div className="col-12 col-md-5 sldesc">
          <div className="for-ca w-100 h-100 justify-content-center align-items-center flex-column text-light">
            <p className='text1'>One Of Us?</p>
            <p className='fs-5 text-center px-4 mt-4'>If you already have an account, just sign in. We've missed you!</p>
            <button className='button mt-5' onClick={() => { setCaopen(false) }}>SIGN IN</button>
          </div>
          <div className="for-la w-100 h-100 justify-content-center align-items-center flex-column text-light">
            <p className='text1'>New Here?</p>
            <p className='fs-5 text-center px-4 mt-4'>Sign up and discover a great amount of new opportunities!</p>
            <button className='button mt-5' onClick={() => { setCaopen(true) }}>SIGN UP</button>
          </div>
        </div>
        <div className="col-12 col-md-7 slform">
          <div className="for-ca w-100 py-5 h-100 justify-content-center align-items-center flex-column">
            <p className='text1 m-0'>Create Account</p>
            <p className='text-secondary fs-6'>Sign up using social networks</p>
            <div className='d-flex justify-content-center align-items-center flex-row gap-4 my-3 socialmediasec'>
              <div className='btn border rounded-circle text-center d-flex justify-content-center align-items-center' style={{ width: "60px", height: "60px" }}>
                <IconContext.Provider value={{ size: "2em", color: "black" }}>
                  <FaFacebookF />
                </IconContext.Provider>
              </div>
              <div className='btn border rounded-circle text-center d-flex justify-content-center align-items-center' style={{ width: "60px", height: "60px" }}>
                <IconContext.Provider value={{ size: "2em", color: "black" }}>
                  <FaGoogle />
                </IconContext.Provider>
              </div>
              <div className='btn border rounded-circle text-center d-flex justify-content-center align-items-center' style={{ width: "60px", height: "60px" }}>
                <IconContext.Provider value={{ size: "2em", color: "black" }}>
                  <FaLinkedinIn />
                </IconContext.Provider>
              </div>
            </div>
            <p className='text-secondary fs-6 my-2'>or use your email for registration:</p>
            <form onSubmit={handleSignUp} className='formbox'>
              <div className="input-group mb-3 ps-3 pe-5">
                <span className='iconc'>
                  <IconContext.Provider value={{ color: "gray" }}><FaUser /></IconContext.Provider>
                </span>
                <input onChange={(e) => setCaname(e.target.value)} className='border-0 ms-2' placeholder='Name' type="text" />
              </div>
              <div className="input-group mb-3 ps-3 pe-5">
                <span className='iconc'>
                  <IconContext.Provider value={{ color: "gray" }}><IoMail /></IconContext.Provider>
                </span>
                <input onChange={(e) => setCaemail(e.target.value)} className='border-0 ms-2' placeholder='Email' type="email" />
              </div>
              <div className="input-group mb-3 ps-3 pe-5">
                <span className='iconc'>
                  <IconContext.Provider value={{ color: "gray" }}><IoMdUnlock /></IconContext.Provider>
                </span>
                <input onChange={(e) => setCapassword(e.target.value)} className='border-0 ms-2' placeholder='Password' type="password" />
              </div>
              <button className='button mt-3'>SIGN UP</button>
            </form>
          </div>
          <div className="for-la w-100 py-5 h-100 justify-content-center align-items-center flex-column">
            <p className='text1 m-0'>Login Account</p>
            <p className='text-secondary fs-6'>Login using social networks</p>
            <div className='d-flex justify-content-center align-items-center flex-row gap-4 my-3 socialmediasec'>
              <div className='btn border rounded-circle text-center d-flex justify-content-center align-items-center' style={{ width: "60px", height: "60px" }}>
                <IconContext.Provider value={{ size: "2em", color: "black" }}>
                  <FaFacebookF />
                </IconContext.Provider>
              </div>
              <div className='btn border rounded-circle text-center d-flex justify-content-center align-items-center' style={{ width: "60px", height: "60px" }}>
                <IconContext.Provider value={{ size: "2em", color: "black" }}>
                  <FaGoogle />
                </IconContext.Provider>
              </div>
              <div className='btn border rounded-circle text-center d-flex justify-content-center align-items-center' style={{ width: "60px", height: "60px" }}>
                <IconContext.Provider value={{ size: "2em", color: "black" }}>
                  <FaLinkedinIn />
                </IconContext.Provider>
              </div>
            </div>
            <p className='text-secondary fs-6 my-2'>or use your email for login</p>
            <form onSubmit={handleSignIn} className='formbox'>
              <div className="input-group mb-3 ps-3 pe-5">
                <span className='iconc'>
                  <IconContext.Provider value={{ color: "gray" }}><IoMail /></IconContext.Provider>
                </span>
                <input onChange={(e)=>setLaemail(e.target.value)} className='border-0 ms-2' placeholder='Email' type="email" />
              </div>
              <div className="input-group mb-3 ps-3 pe-5">
                <span className='iconc'>
                  <IconContext.Provider value={{ color: "gray" }}><IoMdUnlock /></IconContext.Provider>
                </span>
                <input onChange={(e)=>setLapassword(e.target.value)} className='border-0 ms-2' placeholder='Password' type="password" />
              </div>
              <button className='button mt-3'>SIGN IN</button>
            </form>
          </div>
        </div>
      </div>
      )}
    </div>
  )
}

export default App