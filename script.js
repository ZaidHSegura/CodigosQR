// script.js

document.addEventListener("DOMContentLoaded", () => {
    let html5QrCode = new Html5Qrcode("qr-reader");

    html5QrCode.start(
        { facingMode: "environment" }, // Puede ser "user" para la cámara frontal
        {
            fps: 10, // Frecuencia de escaneo
            qrbox: { width: 300, height: 300 } // Dimensiones del área de escaneo
        },
        (decodedText, decodedResult) => {
            // Manejar el éxito del escaneo
            console.log(`Código escaneado: ${decodedText}`);
            document.getElementById('qr-reader-results').innerText = `Resultado: ${decodedText}`;

            // Redirigir automáticamente al enlace escaneado si es una URL válida
            if (isValidUrl(decodedText)) {
                window.location.href = decodedText;
            } else {
                console.log("El código escaneado no es un enlace válido.");
            }

            // Resaltar visualmente el área del escáner cuando detecta un código QR
            let qrReader = document.getElementById('qr-reader');
            qrReader.classList.add('scanning');

            // Quitar el resaltado después de un tiempo (opcional)
            setTimeout(() => {
                qrReader.classList.remove('scanning');
                html5QrCode.start();
            }, 2000); // 2 segundos
        },
        (error) => {
            // Manejar el fallo del escaneo
            console.warn(`Error de escaneo: ${error}`);
        }
    ).catch(err => {
        console.error(`No se pudo iniciar el escaneo: ${err}`);
    });
});

// Función para validar si el texto escaneado es una URL válida
function isValidUrl(text) {
    // Implementa lógica para verificar si el texto es una URL válida
    return text.startsWith("http://") || text.startsWith("https://");
}
