import './App.scss';
import {library} from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {Sol} from 'component/solution1'
import {Sol2} from 'component/solution2'
import {Provider} from 'react-redux'
import store from 'redux/store'
library.add(fas)

function App() {
 
  return (
    <Provider store={store}>

    <div className="App">
      <Sol />
    </div>
    </Provider>
  );
}

export default App;
