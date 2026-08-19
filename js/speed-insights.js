/**
 * Vercel Speed Insights
 * This script initializes Vercel Speed Insights for performance monitoring.
 */
(function() {
  // Initialize Speed Insights queue
  function initQueue() {
    if (window.si) return;
    window.si = function() {
      window.siq = window.siq || [];
      window.siq.push(arguments);
    };
  }

  // Inject the Speed Insights script
  function injectSpeedInsights() {
    if (typeof window === 'undefined') return;
    
    initQueue();
    
    // Check if script is already loaded
    var scriptSrc = '/_vercel/speed-insights/script.js';
    if (document.head.querySelector('script[src*="' + scriptSrc + '"]')) {
      return;
    }
    
    // Create and configure the script element
    var script = document.createElement('script');
    script.src = scriptSrc;
    script.defer = true;
    script.dataset.sdkn = '@vercel/speed-insights';
    script.dataset.sdkv = '2.0.0';
    
    script.onerror = function() {
      console.log('[Vercel Speed Insights] Failed to load script from ' + scriptSrc + '. Please check if any content blockers are enabled and try again.');
    };
    
    document.head.appendChild(script);
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSpeedInsights);
  } else {
    injectSpeedInsights();
  }
})();
