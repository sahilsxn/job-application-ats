import React from 'react'
import RoleSelect from './RoleSelect.js'

const Dashboard = (props) => {

return (
    <div style={{backgroundColor:"white"}}>
        <h1 style={{margin:'16px' , color:'black'}}>Admin Dashboard</h1>
        <RoleSelect/>
    </div>
)
}

export default Dashboard