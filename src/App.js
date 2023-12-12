import './App.css';
import { Link } from './components/atoms';
import { RoutesComponent } from './Routes';

function App() {
  return (
    <div>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/signup'>Sign Up</Link>
      </div>
      <div>
        <Link to='/login'>Log In</Link>
      </div>
      <RoutesComponent />
    </div>
  );
};

export default App;
