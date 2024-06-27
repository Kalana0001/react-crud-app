import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home';
import AddEdit from './pages/AddEdit/AddEdit';
import View from './pages/View/View';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer position="top-center" />

      <Routes>
        <Route exact path="/" Component={Home}/>
        <Route exact path="/addContact" Component={AddEdit}/>
        <Route exact path="/update/:id" Component={AddEdit}/>
        <Route exact path="/view/:id" Component={View}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
