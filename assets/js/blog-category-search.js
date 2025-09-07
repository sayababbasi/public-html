
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    if (category) {
        document.querySelectorAll('.blog-post').forEach(post => {
            const postCategory = post.getAttribute('data-category');
            if (postCategory !== category) {
                post.style.display = 'none';
            } else {
                post.style.display = '';
            }
        });
    }
});

