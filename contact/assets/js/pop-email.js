// pop-email.js

(function () {
    const popup = document.getElementById('revPopup');
    const backdrop = document.getElementById('revBackdrop');
    const closeBtn = document.getElementById('revClose');
    const icon = document.getElementById('revIcon');
    const countdownEl = document.getElementById('revCountdown');

    // Countdown (3h 23m)
    let timeLeft = (3 * 60 * 60 + 23 * 60);
    function updateCountdown() {
        let h = Math.floor(timeLeft / 3600);
        let m = Math.floor((timeLeft % 3600) / 60);
        let s = timeLeft % 60;
        countdownEl.textContent = `${h}h ${m}m ${s}s remaining`;
        if (timeLeft > 0) { timeLeft--; }
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    function openPop() {
        popup.classList.add('rev-open');
        backdrop.classList.add('rev-open');
        icon.classList.remove('rev-show');
    }
    function closePop() {
        popup.classList.remove('rev-open');
        backdrop.classList.remove('rev-open');
        icon.classList.add('rev-show');
    }

    closeBtn.onclick = closePop;
    backdrop.onclick = closePop;
    icon.onclick = openPop;

    // Auto open after delay
    setTimeout(openPop, 7000);

    // Form submission
    document.getElementById('revForm').addEventListener('submit', e => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Send form data to the backend using Fetch API
        fetch('http://localhost:5000/popup-form', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            if (result.ok) {
                alert('Form submitted successfully!');
            } else {
                alert('There was an error submitting the form.');
            }
            closePop();
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again later.');
        });
    });
})();
