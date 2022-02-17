import {useEffect, useState} from "react";
import Globe from "react-globe.gl";
import * as d3 from "d3";

const colorScale = d3.scaleOrdinal(['orangered', 'mediumblue', 'darkgreen', 'yellow']);
const labelsTopOrientation = new Set(['Apollo 12', 'Luna 2', 'Luna 20', 'Luna 21', 'Luna 24', 'LCROSS Probe']); // avoid label collisions

const Moon = () => {
  const [landingSites, setLandingSites] = useState([]);

  useEffect(() => {
    fetch('./moon_landings.json')
      .then(r => r.json())
      .then(setLandingSites);
  }, []);

  return <Globe
    globeImageUrl="./lunar_surface.jpg"
    bumpImageUrl="./lunar_bumpmap.jpg"
    // backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
    showGraticules={true}
    labelsData={landingSites}
    labelText="label"
    labelSize={1.7}
    labelDotRadius={0.4}
    labelDotOrientation={d => labelsTopOrientation.has(d.label) ? 'top' : 'bottom'}
    labelColor={d => colorScale(d.agency)}
    labelLabel={d => `
        <div><b>${d.label}</b></div>
        <div>${d.agency} - ${d.program} Program</div>
        <div>Landing on <i>${new Date(d.date).toLocaleDateString()}</i></div>
      `}
    onLabelClick={d => window.open(d.url, '_blank')}
  />;
};

export default Moon
