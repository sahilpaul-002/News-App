import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import Alert from './components/Alert';
import Spinner from "./components/Spinner";
import { Outlet, useNavigation } from "react-router-dom";

function App() {
  // Get the navigation state while navigating using loader
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  // State for light/dark mode
  const [mode, setMode] = useState({
    theme: "light",
    text: "Dark Mode",
    // textColor: "text-black"
  });

  // Function to switch between modes
  const switchMode = () => {
    if(mode.theme==="light")
    {
      setMode({
        theme: "dark",
        text: "Dark Mode",
        // textColor: "text-white"
      })
      // Set the document body style
      document.body.style.backgroundColor = "#343a40"
      document.body.style.color = "white";

      // Call display alert function
      showALert("Dark mode on !", "success")
    }
    else 
    {
      setMode({
        theme: "light",
        text: "Light Mode",
        textColor: "text-black"
      })
      // Set the document body style
      document.body.style.backgroundColor = "#fefee3"
      document.body.style.color = "black";

      // Call display alert function
      showALert("Light mode on !", "success")
    }
  }

  // Set default background color on first render when state is by default is light
  useEffect(() => {
    if (mode.theme === "light") {
      document.body.style.backgroundColor = "#fefee3";
      document.body.style.color = "black";
    } else {
      document.body.style.backgroundColor = "#343a40";
      document.body.style.color = "white";
    }
  }, [mode.theme]); // Run only once on mount

  // State for Alert
  const [alert, setAlert] = useState(null);

  // Function to display alert
  const showALert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
  };
  
  // Auto dismiss alert display logic in useEffect
  useEffect(() => {
    if(alert!==null)
    {
      const timer = setTimeout(() => {
        setAlert(null);
      },4000);

      // CLeanup timeout alert changes or component unmounts
      return () =>clearTimeout(timer);
    };
  },[alert]);

  return (
    <>
      <Navbar title="NewsApp" mode={mode} switchMode={switchMode}/>  {/* mode={mode} toggleMode={toggleMode} */}
      <Alert alert={alert} dismissAlert={() => {setAlert(null)}}/>
      <div className="container mb-3" style={{ minHeight: "100vh" }}>
        
        {/*   Display spinner logic due to navigating using loader */}
        {isNavigating ? <Spinner /> : <Outlet context={{mode}} />}
        
        {/* {isNavigating && <Spinner />} */}
        {/* <Outlet context={{mode}} /> */}
        </div>
      <Footer mode={mode}/>
    </>
  );
}

export default App;