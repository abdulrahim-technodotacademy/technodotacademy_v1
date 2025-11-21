// Get DOM elements
const svg = document.querySelector('.svg-container svg');
const svgPath = document.querySelector('.st0');
const colorPicker = document.getElementById('colorPicker');
const scaleSlider = document.getElementById('scaleSlider');
const scaleValue = document.getElementById('scaleValue');
const resetBtn = document.getElementById('resetBtn');
const downloadBtn = document.getElementById('downloadBtn');

// Initial values
const initialColor = '#07A6C6';
const initialScale = 1;

// Color picker event
colorPicker.addEventListener('input', (e) => {
    svgPath.style.fill = e.target.value;
});

// Scale slider event
scaleSlider.addEventListener('input', (e) => {
    const scale = e.target.value;
    scaleValue.textContent = scale;
    svg.style.transform = `scale(${scale})`;
});

// Reset button event
resetBtn.addEventListener('click', () => {
    // Reset color
    colorPicker.value = initialColor;
    svgPath.style.fill = initialColor;
    
    // Reset scale
    scaleSlider.value = initialScale;
    scaleValue.textContent = initialScale.toFixed(1);
    svg.style.transform = `scale(${initialScale})`;
    
    // Add animation feedback
    resetBtn.textContent = '✓ Reset!';
    setTimeout(() => {
        resetBtn.textContent = 'Reset';
    }, 1000);
});

// Download button event
downloadBtn.addEventListener('click', () => {
    // Clone the SVG
    const svgClone = svg.cloneNode(true);
    
    // Get current color
    const currentColor = svgPath.style.fill || initialColor;
    svgClone.querySelector('.st0').style.fill = currentColor;
    
    // Create SVG string
    const svgData = new XMLSerializer().serializeToString(svgClone);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    // Create download link
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'custom-svg.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(svgUrl);
    
    // Add animation feedback
    downloadBtn.textContent = '✓ Downloaded!';
    setTimeout(() => {
        downloadBtn.textContent = 'Download SVG';
    }, 1500);
});

// Add smooth entrance animation
window.addEventListener('load', () => {
    svg.style.opacity = '0';
    svg.style.transition = 'opacity 0.8s ease-in';
    setTimeout(() => {
        svg.style.opacity = '1';
    }, 100);
});

console.log('SVG Viewer initialized successfully!');
