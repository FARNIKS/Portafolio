document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('nav ul li a');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth'
            });
        });
    });

    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-theme');
    });

    const form = document.querySelector("form");
    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        
        const formData = new FormData(this);
        try {
            const response = await fetch(this.action, {
                method: this.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                this.reset();
                showMessage("Mensaje enviado correctamente!", "success");
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.error || "Hubo un error al enviar el mensaje. Inténtalo de nuevo.";
                showMessage(errorMessage, "error");
            }
        } catch (error) {
            showMessage("Error de red. Inténtalo de nuevo.", "error");
        }
    });

    function showMessage(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('alert', type === "success" ? 'alert-success' : 'alert-error');
        alertDiv.textContent = message;
        document.querySelector("#contact").appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
});
