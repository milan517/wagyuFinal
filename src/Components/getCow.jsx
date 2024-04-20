import React, { useEffect } from "react";
import { resolveMethod } from "thirdweb";
import { useReadContract } from "thirdweb/react";

export default function GetCow({ contract }) {
  const { data, isLoading } = useReadContract({
    contract,
    method: resolveMethod("getCows"),
    params: []
  });

  useEffect(() => {
    console.log("cows", data);
  }, [data]);

  if (isLoading) {
    return <div style={{ textAlign: 'center', marginTop: '8px' }}>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '8px' }}>No data available</div>;
  }

  // Reverse the list of data
  const reversedData = [...data].reverse();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4px', width: '75%', margin: 'auto' }}>
      {reversedData.map((cow) => (
        <div
          key={cow.cowId}
          style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}
        >
          <div style={{ padding: '16px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Cow ID: {parseInt(cow.cowId)}</div>
            <div style={{ marginBottom: '8px' }}>Owner: {cow.eigenaar}</div>
            <div style={{ marginBottom: '8px' }}>Birth Date: {cow.geboorteDatum}</div>
            <div style={{ marginBottom: '8px' }}>Birth Place: {cow.geboortePlaats}</div>
            <div style={{ marginBottom: '8px' }}>Gender: {cow.geslacht}</div>
            <div style={{ marginBottom: '8px' }}>Mother ID: {parseInt(cow.moederId)}</div>
            <div style={{ marginBottom: '8px' }}>Father ID: {parseInt(cow.vaderId)}</div>
            <div style={{ marginBottom: '8px' }}>Slaughter Date: {parseInt(cow.slachtdatum)}</div>
            <div style={{ marginBottom: '8px' }}>Farm Location: {cow.boederijLocatie}</div>
            <div style={{ marginBottom: '8px' }}>Farm Owner: {cow.boederijOwner}</div>
            <div style={{ marginBottom: '8px' }}>Fat Content: {parseInt(cow.vetgehalte)}%</div>
            <div style={{ marginBottom: '8px' }}>Served: {cow.geserveerd ? "Yes" : "No"}</div>
            <img
              src={cow.fotoUrl}
              alt={`Cow ${parseInt(cow.cowId)}`}
              style={{ width: '15rem', height: 'auto' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
