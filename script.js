// script.js
function onScanSuccess(decodedText, decodedResult) {
    console.log(`Code matched = ${decodedText}`, decodedResult);
    document.getElementById('qr-reader-results').innerText = `Resultado: ${decodedText}`;

    // Mostrar recuadro de detección si hay coordenadas válidas
    if (decodedResult && decodedResult.location) {
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
        hideQrCodeHighlight();
    }, 2000); // 2000 milisegundos (2 segundos)
}

function onScanFailure(error) {
    console.warn(`Code scan error = ${error}`);
}

// Función para validar si el texto escaneado es una URL válida
function isValidUrl(text) {
    try {
        new URL(text);
        return true;
    } catch (e) {
        return false;
    }
}

function showQrCodeHighlight(location) {
    hideQrCodeHighlight(); // Elimina cualquier recuadro anterior

    const highlight = document.createElement('div');
    highlight.classList.add('qr-code-highlight');
    
    // Calcular el tamaño y posición del recuadro en base a la ubicación del código QR
    highlight.style.width = `${location.bottomRightCorner.x - location.topLeftCorner.x}px`;
    highlight.style.height = `${location.bottomRightCorner.y - location.topLeftCorner.y}px`;
    highlight.style.top = `${location.topLeftCorner.y}px`;
    highlight.style.left = `${location.topLeftCorner.x}px`;

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

