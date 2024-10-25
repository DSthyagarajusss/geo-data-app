import { useState } from 'react'; // Only import what's necessary
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import 'leaflet-draw/dist/leaflet.draw.css';
import "leaflet/dist/leaflet.css";
import '../map.css';

const Map = ({ geojsonData }) => {
  const [drawnShapes, setDrawnShapes] = useState([]);

  const handleDrawCreated = (event) => {
    const { layerType, layer } = event;
    const shapeData = {};
    if (layerType === 'polygon') {
      shapeData.type = 'Polygon';
      shapeData.coordinates = layer.getLatLngs().map(latlng => [latlng.lng, latlng.lat]);
    } else if (layerType === 'circle') {
      shapeData.type = 'Circle';
      shapeData.center = [layer.getLatLng().lng, layer.getLatLng().lat];
      shapeData.radius = layer.getRadius();
    }
    setDrawnShapes([...drawnShapes, shapeData]);
  };

  const handleDownloadGeoJSON = () => {
    const geoJSONData = {
      type: 'FeatureCollection',
      features: drawnShapes.map(shape => ({
        type: 'Feature',
        geometry: {
          type: shape.type === 'Polygon' ? 'Polygon' : 'Point',
          coordinates: shape.type === 'Polygon' ? [shape.coordinates] : shape.center,
        },
        properties: shape.type === 'Polygon' ? {} : { radius: shape.radius },
      })),
    };
    const blob = new Blob([JSON.stringify(geoJSONData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'drawn_shapes.geojson';
    a.click();
  };

  return (
    <div style={{ width: '90%', height: '80vh', margin: 'auto', borderRadius: '5px', position: 'relative' }}>
      <MapContainer center={[12.9716, 77.5946]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; DS Thyagaraju"
        />
        {geojsonData && <GeoJSON data={JSON.parse(geojsonData)} />}
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleDrawCreated}
            draw={{
              rectangle: false,
              marker: false,
            }}
          />
        </FeatureGroup>
      </MapContainer>
      <button id='btn' onClick={handleDownloadGeoJSON}>Download GeoJSON</button>

      {/* Custom logo */}
      <img src="data:image/jpeg;base64,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" alt="Custom Logo" className="custom-logo" />
    </div>
  );
};

// Add prop validation
Map.propTypes = {
  geojsonData: PropTypes.string,
};

export default Map;
