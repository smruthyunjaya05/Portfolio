// Project page mapping
const projectPages = {
    'raktaseva': 'raktaseva.html',
    'farmconnect': 'farmconnect.html',
    'mediswitch': 'mediswitch.html',
    'pedestrian': 'pedestrian.html'
};

// Handle project card clicks
function initProjectLinks() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectType = card.getAttribute('data-project');
            if (projectPages[projectType]) {
                window.location.href = projectPages[projectType];
            }
        });
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initProjectLinks();
});
