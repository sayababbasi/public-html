<script>
document.querySelector('.sidebar-search form').addEventListener('submit', function(e) {
    e.preventDefault();
    const category = this.querySelector('input').value.trim();
    if (category) {
        window.location.href = `/blog?category=${encodeURIComponent(category)}`;
    }
});
</script>
