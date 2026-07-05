/**
 * SizeChart.jsx — Standard T-shirt measurements table.
 */

const SIZE_CHART = [
  { size: 'S', chest: '34–36"', length: '28"', fit: 'male' },
  { size: 'M', chest: '38–40"', length: '29"', fit: 'male' },
  { size: 'L', chest: '42–44"', length: '30"', fit: 'male' },
  { size: 'XL', chest: '46–48"', length: '31"', fit: 'male' },
  { size: '2XL', chest: '50–52"', length: '32"', fit: 'male' },
  { size: '3XL', chest: '54–56"', length: '33"', fit: 'male' },
  { size: 'S', chest: '32–34"', length: '26"', fit: 'female' },
  { size: 'M', chest: '34–36"', length: '27"', fit: 'female' },
  { size: 'L', chest: '36–38"', length: '28"', fit: 'female' },
  { size: 'XL', chest: '38–40"', length: '29"', fit: 'female' },
  { size: '2XL', chest: '40–42"', length: '30"', fit: 'female' },
];

const SizeChart = ({ fit = 'male' }) => {
  const rows = SIZE_CHART.filter((row) => row.fit === fit);

  return (
    <details className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] p-3">
      <summary className="cursor-pointer text-sm font-medium text-[#374151]">Size chart</summary>
      <table className="mt-3 w-full text-left text-xs text-[#374151]">
        <thead>
          <tr className="border-b border-[#e5e7eb]">
            <th className="py-1 pr-2 font-medium">Size</th>
            <th className="py-1 pr-2 font-medium">Chest</th>
            <th className="py-1 font-medium">Length</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.fit}-${row.size}`} className="border-b border-[#e5e7eb]/60">
              <td className="py-1 pr-2">{row.size}</td>
              <td className="py-1 pr-2">{row.chest}</td>
              <td className="py-1">{row.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
};

export default SizeChart;