/**
 * DesignerTabBar.jsx — Bottom tab navigation for the designer wizard.
 */

const DesignerTabBar = ({ tabs = [], activeTab, onChange, className = '' }) => (
  <nav
    className={`designer-tab-bar ${className}`.trim()}
    aria-label="Designer options"
  >
    <ul className="designer-tab-bar__list">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <li key={tab.id} className="designer-tab-bar__item">
            <button
              type="button"
              className={`designer-tab-bar__tab${isActive ? ' designer-tab-bar__tab--active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
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