import {React, useState} from 'react'
import validator from 'validator';
import axios from 'axios'
import illustration from '../Images/illustration.svg'
import illustration1 from '../Images/illustration1.svg'
import '../form-page.css'

const ApplyForm = (props) => {

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userNumber, setUserNumber] = useState('')
    const [role, setRole] = useState('')
    const [experience, setExperience] = useState('')
    const [skills, setSkills] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const errors = {}

    const handleChange = (e) => {
        if(e.target.name === "userName"){
            setUserName(e.target.value)
        } else if(e.target.name === "userEmail"){
            setUserEmail(e.target.value)
        } else if(e.target.name === "userNumber"){
            setUserNumber(e.target.value)
        } else if(e.target.name === "role"){
            setRole(e.target.value)
        } else if(e.target.name === "experience"){
            setExperience(e.target.value)
        } else if(e.target.name === "skills"){
            setSkills(e.target.value)
        }
    }

    const runValidations = () => {
        if(userName.trim().length === 0) {
            errors.userName = 'Name cannot be blank :)'
        }
        if(userEmail.trim().length === 0) {
            errors.userEmail = 'Email cannot be blank :)'
        } else if (!validator.isEmail(userEmail)) {
            errors.userEmail = 'Invalid Email Format :)'
        }
        if(userNumber.trim().length === 0) {
            errors.userNumber = 'Number cannot be blank :)'
        }
        if(role === '') {
            errors.role = 'Please select a Role :)'
        }
        if(experience.trim().length === 0) {
            errors.experience = 'Experience cannot be blank :)'
        }
        if(skills.trim().length === 0) {
            errors.skills = 'Skills cannot be blank :)'
        }   
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()
        if (Object.keys(errors).length === 0){
            const formData = {
                name: userName, 
                email:userEmail, 
                phone: userNumber,
                skills: skills,
                jobTitle: role, 
                experience: experience}
                console.log(formData)
            
                axios.post("https://dct-application-form.herokuapp.com/users/application-form", formData)
                .then((response)=>
                console.log(response.data))
                .catch((err)=>{
                    console.log(err)
                });
                setUserName('')
                setUserEmail('')
                setUserNumber('')
                setRole('')
                setExperience('')
                setSkills('')
        } else {
            setFormErrors(errors)
        }
    }

    return (
        <div style={{display:"flex", justifyContent:"space-between", paddingTop:'16px', paddingBottom:'48px'}} className="form-page">
        <div style={{background:'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(40px)', margin:'16px',marginTop:'0px', padding:'24px', borderRadius:'12px', width:'40%'}}>
            <h3 style={{paddingBottom:'16px'}} >Apply for a Job</h3> 
            
            
            <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
            <input placeholder="name@example.com" className="form-control" id="floatingInputGrid" type="text" name="userName" value={userName} onChange={handleChange} />
            <label htmlFor="floatingInputGrid">Full Name</label>
            </div>
            {formErrors.userName && <p style={{color:'red'}}>{formErrors.userName}</p>}

            <div className="form-floating mb-3">
            <input placeholder="name@example.com" className="form-control" id="floatingInputGrid" type="text" name="userEmail" value={userEmail} onChange={handleChange}/>
            <label htmlFor="floatingInputGrid">Email Address</label>
            </div>
            {formErrors.userEmail && <p style={{color:'red'}}>{formErrors.userEmail}</p>}

            <div className="form-floating mb-3">
            <input placeholder="name@example.com" className="form-control" id="floatingInputGrid" type="text" name="userNumber" value={userNumber} onChange={handleChange}/>
            <label htmlFor="floatingInputGrid">Contact Number</label>
            </div>
            {formErrors.userNumber && <p style={{color:'red'}}>{formErrors.userNumber}</p>}

            <div className="form-floating mb-3">
            <select className="form-select" id="floatingSelect" aria-label="Floating label select example" name="role" value={role} onChange={handleChange}>
            <option value="">Select your role</option>
            <option value="Front-End Developer">Front-End Developer</option>
            <option value="Node.js Developer">Node.js Developer</option>
            <option value="MEAN Stack Developer">MEAN Stack Developer</option>
            <option value="FULL Stack Developer">FULL Stack Developer</option>
            </select>
            <label htmlFor="floatingSelect">Job Profile</label>
            </div>
            {formErrors.role && <p style={{color:'red'}}>{formErrors.role}</p>}

            <div className="form-floating mb-3">
            <input placeholder="name@example.com" className="form-control" id="floatingInputGrid" type="text" name="experience" value={experience} onChange={handleChange}/>
            <label htmlFor="floatingInputGrid">Experience</label>
            </div>
            {formErrors.experience && <p style={{color:'red'}}>{formErrors.experience}</p>}

            <div className="form-floating mb-3">
            <textarea placeholder="name@example.com" className="form-control" id="floatingInputGrid" name="skills" value={skills} onChange={handleChange}></textarea>
            <label htmlFor="floatingInputGrid">Technical Skills</label>
            </div>
            {formErrors.skills && <p style={{color:'red'}}>{formErrors.skills}</p>}

            <div className="d-grid gap-2">
            <input className="btn btn-primary" type="submit" value="Send Application"/>
            </div>
            </form>

        </div>
        <div style={{width:'50%', margin:'32px'}}>
            <img className='md sm lg' src={illustration1} alt="illustration"/>
        </div>
        </div>
    )
}

export default ApplyForm