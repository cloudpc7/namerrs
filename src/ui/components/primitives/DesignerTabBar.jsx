/**
 * DesignerTabBar.jsx — Bottom tab navigation for the designer wizard.
 */

const DesignerTabBar = ({ tabs = [], activeTab, onChange, className = '' }) => (
  <nav
    className={`designer-tab-bar ${className}`.trim()}
    aria-label="Designer options"
  >
    <ul className="designer-tab-bar__list" role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <li key={tab.id} className="designer-tab-bar__item" role="presentation">
            <button
              type="button"
              role="tab"
              id={`designer-tab-${tab.id}`}
              aria-controls={`designer-tabpanel-${tab.id}`}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={`designer-tab-bar__tab${isActive ? ' designer-tab-bar__tab--active' : ''}`}
              onClick={() => onChange?.(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        );
      })}
    </ul>
  </nav>
);

export default DesignerTabBar;