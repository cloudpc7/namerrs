/**
 * DesignerTabPanel.jsx — Tab panel region linked to DesignerTabBar controls.
 */

const DesignerTabPanel = ({ tabId, className = '', children }) => (
  <div
    id={`designer-tabpanel-${tabId}`}
    role="tabpanel"
    aria-labelledby={`designer-tab-${tabId}`}
    className={className}
  >
    {children}
  </div>
);

export default DesignerTabPanel;