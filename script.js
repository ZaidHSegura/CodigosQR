// script.js

function drawQrCodeHighlight(context, localization) {
    // Dibuja un rectángulo alrededor del código QR detectado
    context.strokeStyle = 'green'; // Color del borde del rectángulo
    context.lineWidth = 2; // Ancho del borde del rectángulo

    context.beginPath();
    context.moveTo(localization.topLeftCorner.x, localization.topLeftCorner.y);
    context.lineTo(localization.topRightCorner.x, localization.topRightCorner.y);
    context.lineTo(localization.bottomRightCorner.x, localization.bottomRightCorner.y);
    context.lineTo(localization.bottomLeftCorner.x, localization.bottomLeftCorner.y);
    context.closePath();
    context.stroke();
}

function showQrCodeHighlights(results) {
    let canvas = document.getElementById('qr-canvas');
    let context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height); // Limpiar cualquier dibujo anterior

    try {
        if (results && results.length > 0) {
            results.forEach(result => {
                drawQrCodeHighlight(context, result.location); // Dibujar el rectángulo alrededor del código QR
            });
        }
    } catch (error) {
        console.error('Error al dibujar el recuadro del código QR:', error);
    }
}

// Llamada a la función showQrCodeHighlights cuando se detecta un nuevo fotograma con códigos QR
scanner.onFrameRead = results => {
    showQrCodeHighlights(results);
};


