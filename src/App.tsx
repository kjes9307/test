import './App.scss';
import {library} from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import {Sol} from 'component/solution1'
library.add(fas)

function App() {
 
  return (
    <div className="App">
      <Sol />
    </div>
  );
}

export default App;
