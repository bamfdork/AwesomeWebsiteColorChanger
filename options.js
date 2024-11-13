
document.addEventListener('DOMContentLoaded', () => {
  // Load the excluded sites from storage
  chrome.storage.sync.get('excludedSites', ({ excludedSites }) => {
    document.getElementById('excludedSites').value = excludedSites ? excludedSites.join('\n') : '';
  });

  // Save the excluded sites to storage
  document.getElementById('saveButton').addEventListener('click', () => {
    const excludedSites = document.getElementById('excludedSites').value
      .split('\n')
      .map(site => site.trim())
      .filter(site => site);
      
    chrome.storage.sync.set({ excludedSites }, () => {
      alert('Excluded sites saved!');
    });
  });
});
