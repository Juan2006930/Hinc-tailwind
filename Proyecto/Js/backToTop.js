window.onscroll = function() {
    const btn = document.getElementById("backToTopBtn");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        btn.classList.add("show");
    } else {
        btn.classList.remove("show");
    }
};

function smoothScrollToTop() {
    const scrollStep = -window.scrollY / 15;
    const scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
}

document.getElementById("backToTopBtn").addEventListener("click", smoothScrollToTop);