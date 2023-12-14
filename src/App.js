import './App.css';
import { LanguageSelect, Link } from './components/atoms';
import { RoutesComponent } from './routes/Routes';
import { useTranslation } from 'react-i18next';

function App() {

  const { t, i18n } = useTranslation()

  return (

    <div>
      <LanguageSelect />
      <div>
        <div>
          <Link to='/'>{t('home')}</Link>
        </div>
        <div>
          <Link to='/signup'>Sign Up</Link>
        </div>
        <div>
          <Link to='/login'>Log In</Link>
        </div>
        <div>
          <Link to='/products/add'>Add Products</Link>
        </div>
        <RoutesComponent />
      </div>
    </div>
  );
};

export default App;
