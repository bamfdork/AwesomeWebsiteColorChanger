
document.getElementById('applyButton').addEventListener('click', () => {
  const bgColor = document.getElementById('bgColorPicker').value;
  const textColor = document.getElementById('textColorPicker').value;
  
  chrome.storage.sync.set({ replaceBgColor: bgColor, replaceTextColor: textColor }, () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.reload(tabs[0].id);
    });
  });
});

// Toggle exclusion for the current site
document.getElementById('toggleExclusionButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentHost = new URL(tabs[0].url).hostname;
    
    chrome.storage.sync.get('excludedSites', ({ excludedSites }) => {
      let updatedSites = excludedSites || [];
      
      if (updatedSites.includes(currentHost)) {
        // Remove from exclusion if already present
        updatedSites = updatedSites.filter(site => site !== currentHost);
      } else {
        // Add to exclusion if not present
        updatedSites.push(currentHost);
      }
      
      chrome.storage.sync.set({ excludedSites: updatedSites }, () => {
        alert(`${currentHost} ${updatedSites.includes(currentHost) ? 'excluded' : 'included'} successfully.`);
      });
    });
  });
});
