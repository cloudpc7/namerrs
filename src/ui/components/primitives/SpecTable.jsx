/**
 * SpecTable.jsx — Product specification key-value table.
 */

const SpecTable = ({ specs = [], className = '', label = 'Specifications' }) => {
  if (!specs.length) {
    return null;
  }

  return (
    <div className={`spec-table-panel ${className}`.trim()}>
      {label && <p className="spec-table-panel__label">{label}</p>}

      <div className="spec-table-panel__surface">
        <table className="spec-table">
          <tbody>
            {specs.map((spec) => (
              <tr key={`${spec.label}-${spec.value}`}>
                <th scope="row">{spec.label}</th>
                <td>{spec.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpecTable;