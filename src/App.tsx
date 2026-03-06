import { Route, Routes } from 'react-router';
import AppLayout from './AppLayout';
import Play from './Play';
import Home from './Home';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route Component={AppLayout}></Route>
        <Route path="/" Component={Home}></Route>
        <Route path="/play/:slug" Component={Play}></Route>
      </Routes>
    </>
  );
};

export default App;
