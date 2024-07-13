import { Toaster } from 'react-hot-toast';
import './App.css';
import Main from './Main/Main';
import SearchBox from './Search/SearchBox';
// import backgroundImage from '../public/background.jpeg';

function App() {
  return (
    <div className="App">
      <Main/>
      <Toaster />
      {/* <SearchBox/> */}
    </div>
  );
}

export default App;
