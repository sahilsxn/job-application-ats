import Dashboard from './Dashboard'
import ApplyForm from './ApplyForm';
import {Link, Route} from 'react-router-dom'

function NavBar() {
  return (
    <div>
      
      <div style={{display:'flex', justifyContent:'space-between', backgroundColor:'black', marginBottom:'0px', padding:'16px'}}>

        <div style={{margin: 'auto' }}>
          <Link style={{ textDecoration: 'none', color:'white' }} to="/"><b>Job Seekers</b></Link>
        </div>

        <div style={{margin: 'auto'}}>
          <Link style={{ textDecoration: 'none', color:'white'}} to="/admin"><b>Admin Dashboard</b></Link><br/>
        </div>
      
      </div>
      <Route path="/admin" component={Dashboard} exact/>
      <Route path="/" component={ApplyForm} exact/>

    </div>
  );
}

export default NavBar;
