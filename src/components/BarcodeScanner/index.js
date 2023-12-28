import React, { useState } from 'react';
import BarcodeReader from 'react-barcode-reader';

export const BarcodeScanner = () => {
  const [result, setResult] = useState('');

  const handleScan = (data) => {
    setResult(data);
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <BarcodeReader
        onError={handleError}
        onScan={handleScan}
        minLength={6} // Ajusta según la longitud mínima del código de barras
      />
      <p>Resultado: {result}</p>
    </div>
  );
};
