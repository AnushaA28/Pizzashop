import logo from './logo.svg';
import './App.css';
import { legacy_createStore as createStore} from 'redux';
import rootReducer from './reducers';
import PizzaForm from './components/PizzaForm';
import PizzaBoard from './components/PizzaBoard';
import MainDisplay from './components/MainDisplay';
import { Provider } from 'react-redux';

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
    <div className="App">
     <PizzaForm/>
     <PizzaBoard/>
     <MainDisplay/>
    </div>
    </Provider>
  );
}

export default App;
