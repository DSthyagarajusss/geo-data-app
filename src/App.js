import React, { useState } from 'react';
import Map from './component/Map';
import FileUpload from './component/FileUpload';

const App = () => {
  const [geojsonData, setGeojsonData] = useState(null);

  const handleFileUpload = (fileContent) => {
    setGeojsonData(fileContent);
  };

  return (
    <div>
   <div style={{ textAlign: 'center' }}>
  <h2 style={{ margin: 'auto' }}>Geo Data App</h2>
</div>
      <FileUpload onFileUpload={handleFileUpload} />
      <Map geojsonData={geojsonData} />
    </div>
  );
};

export default App;
