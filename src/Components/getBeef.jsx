import React, { useEffect } from "react";
import { resolveMethod } from "thirdweb";
import { useReadContract } from "thirdweb/react";

export function Component({ contract }) {
  const { data, isLoading } = useReadContract({
    contract,
    method: resolveMethod("getBeefs"),
    params: []
  });

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  if (isLoading) {
    return <div style={{ textAlign: 'center', marginTop: '8px' }}>Loading...</div>;
  }

  if (!data || Object.keys(data).length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '8px' }}>No data available</div>;
  }

  const reversedKeys = Object.keys(data).reverse(); // Reverse the keys array

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4px' }}>
      {reversedKeys.map((cowKey) => (
        <div
          key={data[cowKey].cowId}
          style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden' }}
        >
          <div style={{ padding: '16px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Cow ID: {parseInt(data[cowKey].cowId)}</div>
            <div style={{ marginBottom: '8px' }}>Owner: {data[cowKey].eigenaar}</div>
            <div style={{ marginBottom: '8px' }}>Quality: {data[cowKey].kwaliteit}</div>
            <div style={{ marginBottom: '8px' }}>Fat Content: {data[cowKey].vetgehalte}%</div>
            <div style={{ marginBottom: '8px' }}>Served: {data[cowKey].geserveerd ? "Yes" : "No"}</div>
            <img
              src={data[cowKey].fotoUrl}
              alt={`Cow ${parseInt(data[cowKey].cowId)}`}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
