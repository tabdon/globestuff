import {useEffect, useState} from "react";
import Globe from "react-globe.gl";

const Hex = () => {
  const [countries, setCountries] = useState({features: []});

  useEffect(() => {
    // load data
    fetch('./globe_bounds.geojson').then(res => res.json()).then(setCountries);
  }, []);

  return <Globe
    globeImageUrl="./lroc_color_poles_16k.jpg"
    bumpImageUrl="./ldem_64_uint.jpg"
    backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

    hexPolygonsData={countries.features}
    hexPolygonResolution={3}
    hexPolygonMargin={0.1}
    // hexPolygonColor={() => `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}`}
    hexPolygonColor={() => `#00000033`}
    hexPolygonLabel={({properties: d}) => `
        <div style="background-color: #${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}; color:black;">
        <b>${d.NAME}</b> <br/>
        <b>#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}</b>
        </div>
      `}
  />;
};

export default Hex
