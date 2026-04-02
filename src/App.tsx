import './App.css';
import Header from './components/Header/Header';
import SideBar from './components/SideBar/SideBar';
import Activities from './components/Activities/Activities';
import AirConditions from './components/AirConditions/AirConditions';
import Forecast from './components/Forecast/Forecast';

function App() {
  return (
    <div className="px-8 max-w-360 mx-auto">
      <Header />
      <div className="flex justify-between items-start">
        <SideBar />
        <div className="flex flex-col gap-8">
          <Activities />
          <Forecast />
        </div>
        <AirConditions />
      </div>
    </div>
  );
}

export default App;
