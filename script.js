// script.js
function onScanSuccess(decodedText, decodedResult) {
    // Maneja el resultado aquí.
    console.log(`Code matched = ${decodedText}`, decodedResult);
    document.getElementById('qr-reader-results').innerText = `Resultado: ${decodedText}`;
    
    // Resaltar visualmente el área del escáner
    let qrReader = document.getElementById('qr-reader');
    qrReader.classList.add('scanning');

    // Redirigir automáticamente al enlace escaneado
    if (decodedText.startsWith("http://") || decodedText.startsWith("https://")) {
        window.location.href = decodedText;
    } else {
        console.log("El código escaneado no es un enlace válido.");
    }

    // Detener el escaneo después de un tiempo (opcional)
    setTimeout(() => {
        qrReader.classList.remove('scanning');
        html5QrCode.start();
    }, 2000); // 2000 milisegundos (2 segundos)
}

function onScanFailure(error) {
    // Maneja la falla del escaneo, usualmente es mejor ignorarlo y seguir escaneando.
    console.warn(`Code scan error = ${error}`);
}

document.addEventListener("DOMContentLoaded", () => {
    let html5QrCode = new Html5Qrcode("qr-reader");

    html5QrCode.start(
        { facingMode: "environment" }, // Elegir cámara frontal o trasera
        {
            fps: 10, // Establecer la frecuencia de escaneo
            qrbox: { width: 250, height: 250 } // Establecer las dimensiones del recuadro de escaneo
        },
        onScanSuccess,
        onScanFailure
    ).catch(err => {
        console.log(`Unable to start scanning, error: ${err}`);
    });
});



