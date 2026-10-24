/**
 * KisanVaani AI (KissanAI) — Main React Application Entry Point
 * Dhenu Agro AI 2.0 • Multilingual Agricultural Operating System
 */

(function() {
  let attempts = 0;
  function tryMount() {
    const rootElement = document.getElementById('root');
    if (!rootElement || window.__KISAN_APP_MOUNTED__) return;

    const Component = window.App || (typeof App !== 'undefined' ? App : null);
    if (Component) {
      window.__KISAN_APP_MOUNTED__ = true;
      const root = ReactDOM.createRoot(rootElement);
      root.render(React.createElement(Component));
      console.log('✅ [KissanAI] React Application mounted successfully via index.jsx.');
      return;
    }

    if (attempts < 50) {
      attempts++;
      setTimeout(tryMount, 100);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryMount);
  } else {
    tryMount();
  }
})();
