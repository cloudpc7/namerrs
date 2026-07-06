/**
 * DesignerTabBar.jsx — Bottom tab navigation for the designer wizard.
 */

import { useRef } from 'react';

const DesignerTabBar = ({ tabs = [], activeTab, onChange, className = '' }) => {
  const tabRefs = useRef([]);

  const handleKeyDown = (event, index) => {
    const lastIndex = tabs.length - 1;
    let nextIndex = null;

    if (event.key === 'ArrowRight') {
      nextIndex = index === lastIndex ? 0 : index + 1;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = index === 0 ? lastIndex : index - 1;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = lastIndex;
    }

    if (nextIndex === null) {
      return;
    }

    event.preventDefault();
    onChange?.(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <nav
      className={`designer-tab-bar ${className}`.trim()}
      aria-label="Designer options"
    >
      <ul className="designer-tab-bar__list" role="tablist">
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;

          return (
            <li key={tab.id} className="designer-tab-bar__item" role="presentation">
              <button
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`designer-tab-${tab.id}`}
                aria-controls={`designer-tabpanel-${tab.id}`}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                className={`designer-tab-bar__tab${isActive ? ' designer-tab-bar__tab--active' : ''}`}
                onClick={() => onChange?.(tab.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                {tab.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DesignerTabBar;