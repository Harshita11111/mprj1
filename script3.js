let lastScrollTop = 0;
const background = document.querySelector('.background');

window.addEventListener('scroll', () => {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    
    if (st < lastScrollTop) {
        // Scrolling Up
        background.style.opacity = '1';
    } else {
        // Scrolling Down
        background.style.opacity = '0';
    }
    
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
});