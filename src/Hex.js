import {useEffect, useState} from "react";
import Globe from "react-globe.gl";

const Hex = () => {
  const [countries, setCountries] = useState({features: []});

  useEffect(() => {
    // load data
    fetch('./ne_110m_admin_0_countries.geojson').then(res => res.json()).then(setCountries);
  }, []);

  return <Globe
    globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"

    hexPolygonsData={countries.features}
    hexPolygonResolution={3}
    hexPolygonMargin={0.3}
    hexPolygonColor={() => `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}`}
    hexPolygonLabel={({properties: d}) => `
        <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
        Population: <i>${d.POP_EST}</i>
      `}
  />;
};

export default Hex
