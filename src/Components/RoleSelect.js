import {React, useState, useEffect} from 'react'
import DashTable from './DashTable'
import axios from 'axios'

const RoleSelect = (props) => {

    const [candidateData, setCandidateData] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect(()=>{
        axios.get('https://dct-application-form.herokuapp.com/users/application-forms')
        .then((response)=>{
            const result = response.data
            setCandidateData(result.reverse())
            console.log(result)
            setLoader(false)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }, [])

    const updateApplication = (user) => {
        const result = candidateData.map((candidate) => {
          if (candidate._id === user._id) {
            return { ...candidate, ...user };
          } else {
            return { ...candidate };
          }
        });
        setCandidateData(result);
      };

    const handleAll = () => {
        axios.get('https://dct-application-form.herokuapp.com/users/application-forms')
        .then((response)=>{
            const result = response.data
            setCandidateData(result)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }

    const handleFront = () => {
        axios.get('https://dct-application-form.herokuapp.com/users/application-forms')
        .then((response)=>{
            const data = response.data
            const result = data.filter(ele=>ele.jobTitle==="Front-End Developer")
            setCandidateData(result)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
    const handleNode = () => {
        axios.get('https://dct-application-form.herokuapp.com/users/application-forms')
        .then((response)=>{
            const data = response.data
            const result = data.filter(ele=>ele.jobTitle==="Node.js Developer")
            setCandidateData(result)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }

    const handleMean = () => {
        axios.get('https://dct-application-form.herokuapp.com/users/application-forms')
        .then((response)=>{
            const data = response.data
            const result = data.filter(ele=>ele.jobTitle==="MEAN Stack Developer")
            setCandidateData(result)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }

    const handleFull = () => {
        axios.get('https://dct-application-form.herokuapp.com/users/application-forms')
        .then((response)=>{
            const data = response.data
            const result = data.filter(ele=>ele.jobTitle==="FULL Stack Developer")
            setCandidateData(result)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }

    return (
        <div  className="nav nav-pills flex-column flex-sm-row">
            <div style={{margin:'8px', marginLeft:'16px'}} className="nav-item">
                <button className="nav-link active" onClick={handleAll}>All Roles</button>
            </div>
            <div style={{margin:'8px'}} className="nav-item">
                <button className="nav-link active" onClick={handleFront}>Front-End Developers</button>
            </div>
            <div style={{margin:'8px'}} className="nav-item">
                <button className="nav-link active" onClick={handleNode}>Node.js Developers</button>
            </div>
            <div style={{margin:'8px'}} className="nav-item">
                <button className="nav-link active" onClick={handleMean}>MEAN Stack Developers</button>
            </div>
            <div style={{margin:'8px'}} className="nav-item">
                <button className="nav-link active" onClick={handleFull}>FULL Stack Developers</button>
            </div>
            
            <DashTable candidateData={candidateData} updateApplication={updateApplication} loader={loader}/>
        </div>
    )
}

export default RoleSelect