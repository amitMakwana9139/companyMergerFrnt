import { Provider } from 'react-redux';
import { store } from '../store/store'; // Make sure this is correct
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
