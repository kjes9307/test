import './App.scss';
import {library} from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {Sol} from 'component/solution1'
import {Sol2} from 'component/solution2'
import {Provider} from 'react-redux'
import store from 'redux/store'
import Sidebar from 'component/re-sidebar'
import {Test} from 'component/testSide'
library.add(fas)

function App() {
 
  return (
    <Sidebar />
    // <Provider store={store}>

    // <div className="App">
    //   <Sol2 />
    // </div>
    // </Provider>
  );
}

export default App;
