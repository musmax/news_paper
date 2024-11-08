import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Routes from './routes.jsx'

{
  /* The following line can be included in your src/index.js or App.js file */
}
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';

import {Provider} from 'react-redux'
import store from './stores'
createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <Routes>
      <App />
    </Routes>
  </Provider>

)
