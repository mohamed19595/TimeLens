import React, { useEffect, useState } from "react";
import "./App.css";
import Map from "./Components/Map/Map";
import TimeScale from "./Components/TimeScale/TimeScale";
import { Provider,useSelector } from "react-redux";
import store from "./Redux/store"; // Import Redux store

import { statesData as world_100 } from "./assets/geojson/world_100";
import { statesData as world_200 } from "./assets/geojson/world_200";
import { statesData as world_300 } from "./assets/geojson/world_300";
import { statesData as world_400 } from "./assets/geojson/world_400";
import { statesData as world_500 } from "./assets/geojson/world_500";
import { statesData as world_600 } from "./assets/geojson/world_600";
import { statesData as world_700 } from "./assets/geojson/world_700";
import { statesData as world_800 } from "./assets/geojson/world_800";
import { statesData as world_900 } from "./assets/geojson/world_900";
import { statesData as world_1000 } from "./assets/geojson/world_1000";
import { statesData as world_1100 } from "./assets/geojson/world_1100";
import { statesData as world_1200 } from "./assets/geojson/world_1200";
import { statesData as world_1300 } from "./assets/geojson/world_1300";
import { statesData as world_1400 } from "./assets/geojson/world_1400";
import { statesData as world_1500 } from "./assets/geojson/world_1500";
import { statesData as world_1600 } from "./assets/geojson/world_1600";
import { statesData as world_1700 } from "./assets/geojson/world_1700";
import { statesData as world_1800 } from "./assets/geojson/world_1800";
import { statesData as world_1900 } from "./assets/geojson/world_1900";
import { statesData as world_2000 } from "./assets/geojson/world_2000";
import { statesData as world_100b } from "./assets/geojson/world_bc100";
import { statesData as world_200b } from "./assets/geojson/world_bc200";
import { statesData as world_300b } from "./assets/geojson/world_bc300";
import { statesData as world_400b } from "./assets/geojson/world_bc400";
import { statesData as world_500b } from "./assets/geojson/world_bc500";
import { statesData as world_700b } from "./assets/geojson/world_bc700";
import { statesData as world_1000b} from "./assets/geojson/world_bc1000";
import { statesData as world_1500b } from "./assets/geojson/world_bc1500";
import { statesData as world_2000b } from "./assets/geojson/world_bc2000";
import { statesData as world_3000b } from "./assets/geojson/world_bc3000";



function App() {
  const [world, setWorld] = useState(world_2000);
  const [mapKey, setMapKey] = useState(0); // State to force re-render of the Map component
  const time = useSelector((state) => state.time.value); // Access time from Redux

  useEffect(() => {
    if (time >= -3000 && time < -2000) {
      setWorld(world_3000b);
    } else if (time >= -2000 && time < -1500) {
      setWorld(world_2000b);
    }
    else if (time >= -1500 && time < -1000) {
      setWorld(world_1500b);
    }
    else if (time >= -1000 && time < -700) {
      setWorld(world_1000b);
    }
    else if (time >= -700 && time < -500) {
      setWorld(world_700b);
    }
    else if (time >= -500 && time < -400) {
      setWorld(world_500b);
    }
    else if (time >= -400 && time < -300) {
      setWorld(world_400b);
    }
    else if (time >= -300 && time < -200) {
      setWorld(world_300b);
    }
    else if (time >= -200 && time < -100) {
      setWorld(world_200b);
    }
    else if (time >= -100 && time < 0) {
      setWorld(world_100b);
    }
    else if (time >= 0 && time < 100) {
      setWorld(world_100);
    }
    else if (time >= 100 && time < 200) {
      setWorld(world_200);
    }
    else if (time >= 200 && time < 300) {
      setWorld(world_300);
    }
    else if (time >= 300 && time < 400) {
      setWorld(world_400);
    }
    else if (time >= 400 && time < 500) {
      setWorld(world_500);
    }
    else if (time >= 500 && time < 600) {
      setWorld(world_600);
    }
    else if (time >= 600 && time < 700) {
      setWorld(world_700);
    }
    else if (time >= 700 && time < 800) {
      setWorld(world_800);
    }
    else if (time >= 800 && time < 900) {
      setWorld(world_900);
    }
    else if (time >= 900 && time < 1000) {
      setWorld(world_1000);
    }
    else if (time >= 1000 && time < 1100) {
      setWorld(world_1100);
    }
    else if (time >= 1100 && time < 1200) {
      setWorld(world_1200);   
    }
    else if (time >= 1200 && time < 1300) {
      setWorld(world_1300);
    }
    else if (time >= 1300 && time < 1400) {
      setWorld(world_1400);
    }
    else if (time >= 1400 && time < 1500) {
      setWorld(world_1500);
    }
    else if (time >= 1500 && time < 1600) {
      setWorld(world_1600);
    }
    else if (time >= 1600 && time < 1700) {
      setWorld(world_1700);
    }
    else if (time >= 1700 && time < 1800) {
      setWorld(world_1800);
    }
    else if (time >= 1800 && time < 1900) {
      setWorld(world_1900);
    }
    else if (time >= 1900 ) {
      setWorld(world_2000);
    }
    setMapKey((prevKey) => prevKey + 1); // Force re-render of the Map component
  }, [time]);
  
  return (
    <>
    <Provider store={store}>
        <TimeScale />
        <Map key={mapKey} data = {world} />
    </Provider>
    </>
  );
}

export default App;
