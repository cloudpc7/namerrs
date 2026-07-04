/**
 * SpecTable.jsx — Product specification key-value table.
 */

const SpecTable = ({ specs = [], className = '' }) => {
  if (!specs.length) {
    return null;
  }

  return (
    <table className={`spec-table ${className}`.trim()}>
      <tbody>
        {specs.map((spec) => (
          <tr key={`${spec.label}-${spec.value}`}>
            <th scope="row">{spec.label}</th>
            <td>{spec.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SpecTable;