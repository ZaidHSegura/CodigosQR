// script.js
function onScanSuccess(decodedText, decodedResult) {
    // Maneja el resultado aquí.
    console.log(`Code matched = ${decodedText}`, decodedResult);
    document.getElementById('qr-reader-results').innerText = `Resultado: ${decodedText}`;
    
    // Resaltar visualmente el área del escáner cuando detecta un código QR
    let qrReader = document.getElementById('qr-reader');
    qrReader.classList.add('scanning');

    // Mostrar recuadro de detección
    if (decodedResult && decodedResult.decodedText && decodedResult.decodedText === decodedText) {
        showQrCodeHighlight(decodedResult.location);
    }

    // Redirigir automáticamente al enlace escaneado (si es un enlace válido)
    if (isValidUrl(decodedText)) {
        setTimeout(() => {
            window.location.href = decodedText;
        }, 2000); // 2000 milisegundos (2 segundos)
    } else {
        console.log("El código escaneado no es un enlace válido.");
    }

    // Quitar el resaltado después de un tiempo (opcional)
    setTimeout(() => {
        qrReader.classList.remove('scanning');
        hideQrCodeHighlight();
        html5QrCode.start();
    }, 2000); // 2000 milisegundos (2 segundos)
}

function onScanFailure(error) {
    // Maneja la falla del escaneo, usualmente es mejor ignorarlo y seguir escaneando.
    console.warn(`Code scan error = ${error}`);
}

// Función para validar si el texto escaneado es una URL válida
function isValidUrl(text) {
    // Implementa lógica para verificar si el texto es una URL válida
    return text.startsWith("http://") || text.startsWith("https://");
}

function showQrCodeHighlight(location) {
    const highlight = document.createElement('div');
    highlight.classList.add('qr-code-highlight');
    highlight.style.width = `${location.width}px`;
    highlight.style.height = `${location.height}px`;
    highlight.style.top = `${location.top}px`;
    highlight.style.left = `${location.left}px`;
    document.getElementById('qr-reader').appendChild(highlight);
}

function hideQrCodeHighlight() {
    const highlight = document.querySelector('.qr-code-highlight');
    if (highlight) {
        highlight.remove();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let html5QrCode = new Html5Qrcode("qr-reader");

    html5QrCode.start(
        { facingMode: "environment" }, // Elegir cámara frontal o trasera
        {
            fps: 10, // Establecer la frecuencia de escaneo
            qrbox: { width: 300, height: 300 } // Establecer las dimensiones del recuadro de escaneo
        },
        onScanSuccess,
        onScanFailure
    ).catch(err => {
        console.log(`Unable to start scanning, error: ${err}`);
    });
});

