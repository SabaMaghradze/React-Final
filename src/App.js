import { useDispatch } from 'react-redux';
import './App.css';

import { LanguageSelect, Link } from './components/atoms';
import { RoutesComponent } from './routes/Routes';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { fetchHomeProducts } from './redux';
import { Header } from './components/header/Header';
import { Grid } from '@mui/material';
import { useUser } from './hooks';
import { fetchCart } from './redux/slices/cartSlice';

function App() {

  const { t, i18n } = useTranslation();

  const { userData } = useUser();

  const dispatch = useDispatch();

  useEffect(() => {
    if (userData?._id) {
      dispatch(fetchCart(userData._id))
    }
  });

  useEffect(() => {
    dispatch(fetchHomeProducts());
  }, [dispatch]);

  return (

    <div>
      <Grid>
        <Header />
      </Grid>
      <Grid item sx={{ paddingTop: 20, minHeight: '100vh', width: '100%', pb: 10, backgroundColor: '#f5f5f5' }} >
        <RoutesComponent />
      </Grid>
    </div>

    // <div>
    //   <LanguageSelect />
    //   <div>
    //     <div>
    //       <Link to='/'>{t('home')}</Link>
    //     </div>
    //     <div>
    //       <Link to='/signup'>{t('sign_up')}</Link>
    //     </div>
    //     <div>
    //       <Link to='/login'>{t('sign_in')}</Link>
    //     </div>
    //     <div>
    //       <Link to='/products/add'>{t('add_products')}</Link>
    //     </div>
    //     <RoutesComponent />
    //   </div>
    // </div>
  );
};

export default App;
