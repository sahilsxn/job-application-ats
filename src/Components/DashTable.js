import React, { useState } from 'react'
import axios from 'axios'
import Modal from './Modal'


const DashTable = (props) => {

    const {candidateData, updateApplication, loader} = props

    const [modal, setModal] = useState(false)
    const [modalData, setModalData] = useState({})

    const showModal = (id) => {
        setModal(!modal)
        axios.get(`https://dct-application-form.herokuapp.com/users/application-form/${id}`)
        .then((response)=>{
            setModalData(response.data)
            
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }

    const hideModal = () => {
        setModal(!modal)
    }

    const handleSelect = (id) => {

        const result = {status: "shortlisted"}

        axios.put(`https://dct-application-form.herokuapp.com/users/application-form/update/${id}`, result)
        .then((response)=>{
            updateApplication(response.data)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }

    const handleReject = (id) => {

        const result = {status: "rejected"}

        axios.put(`https://dct-application-form.herokuapp.com/users/application-form/update/${id}`, result)
        .then(response=>{
            console.log(response.data)
            // const data = response.data
            // handleToggle()
            updateApplication(response.data)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }


    return (
        <div style={{background:'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(40px)', margin:'16px', padding:'16px', borderRadius:'16px'}}>
            <div style={{display:'flex', justifyContent:'center'}}>
            {loader && <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_3pb9gbyk.json" background="transparent"  speed="1"  style={{width: "300px", height: "300px"}} loop autoplay></lottie-player>}
            </div>
            <table style={{tableLayout:'fixed'}} className="table table-striped align-middle">
                <thead>
                    <tr style={{padding: '15px'}}>
                        <th>Name</th>
                        <th>Technical Skills</th>
                        <th>Experience</th>
                        <th>Applied Date</th>
                        <th>Status</th>
                        <th>View Details</th>
                    </tr>
                </thead>
                <tbody >
                        {candidateData.length>0 && candidateData.map(ele=>{
                            return (
                                <tr key={ele._id}>
                                    <td>{ele.name}</td>
                                    <td style={{overflow: 'hidden'}}>{ele.skills}</td>
                                    <td>{ele.experience}</td>
                                    <td>{new Date(ele.createdAt).getDate()}/
                                        {new Date(ele.createdAt).getMonth()+1}/
                                        {new Date(ele.createdAt).getFullYear()}
                                    </td>
                                    <td><button class="btn btn-primary" onClick={()=>{showModal(ele._id)}}>View Details</button></td>
                                    <td>
                                        {ele.status === "rejected" && <span class="material-icons-outlined">block</span>} 
                                        {ele.status === "shortlisted" && <span class="material-icons-outlined">task_alt</span>}
                                        {/* {ele.status === "rejected" && <button className="btn btn-success" onClick={()=>{handleSelect(ele._id)}}>Select</button>} 
                                        {ele.status === "shortlisted" && <button className="btn btn-danger" onClick={()=>{handleReject(ele._id)}}>Reject</button>} */}
                                        {ele.status === "applied" && 
                                        <div>
                                            <button style={{marginRight: '20px'}} className="btn btn-success" onClick={()=>{handleSelect(ele._id)}}>Select</button>
                                            <button className="btn btn-danger" onClick={()=>{handleReject(ele._id)}}>Reject</button>
                                        </div>
                                        }
                                    </td>               
                                </tr>
                            )
                        })}
                </tbody>
            </table>
                <Modal modal={modal} hideModal={hideModal}>
                    <h2>{modalData.name}</h2>
                    <hr/>
                    <b>Contact Number</b><p>{modalData.phone}</p>
                    <b>Email</b><p>{modalData.email}</p>
                    <b>Skills</b><p>{modalData.skills}</p>
                    <b>Experience</b><p>{modalData.experience}</p>
                    <hr/>
                </Modal>
        </div>
    )
}

export default DashTable