import Dashboard from './Dashboard'
import ApplyForm from './ApplyForm';
import {Link, Route} from 'react-router-dom'
import '../form-page.css'

function NavBar() {
  return (
    <div>
      
      <div className='navbar'>

        <div>
          <Link style={{ textDecoration: 'none', color:'white' }} to="/"><b>Job Seekers</b></Link>
        </div>

        <div>
          <Link style={{ textDecoration: 'none', color:'white'}} to="/admin"><b>Admin Dashboard</b></Link><br/>
        </div>
      
      </div>
      <Route path="/admin" component={Dashboard} exact/>
      <Route path="/" component={ApplyForm} exact/>

    </div>
  );
}

export default NavBar;
