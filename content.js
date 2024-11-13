
function replaceNonImgColors() {
  chrome.storage.sync.get(['replaceBgColor', 'replaceTextColor', 'excludedSites'], ({ replaceBgColor, replaceTextColor, excludedSites }) => {
    // Check if the current site is excluded
    const currentHost = window.location.hostname;
    if (excludedSites && excludedSites.some(site => currentHost.includes(site))) {
      return;  // Exit if the site is in the excluded list
    }

    const bgColor = replaceBgColor || '#888888';  // Default background color
    const textColor = replaceTextColor || '#333333';  // Default text color

    // Apply colors on non-featured elements only
    document.querySelectorAll('*:not(img):not(video):not([role="img"]):not([aria-label="image"]):not([class*="preview"])').forEach(element => {
      element.style.backgroundColor = bgColor;
      element.style.color = textColor;
    });
  });
}

// Run replacement when the page loads
replaceNonImgColors();
