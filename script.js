document.getElementById('algorithmSelect').addEventListener('change', function () {
    const selectedAlgorithm = document.getElementById('algorithmSelect').value;
    const customAlgorithmDiv = document.getElementById('customAlgorithmDiv');
    customAlgorithmDiv.style.display = selectedAlgorithm === 'custom' ? 'block' : 'none';
});

document.getElementById('algorithmSelectDecode').addEventListener('change', function () {
    const selectedAlgorithmDecode = document.getElementById('algorithmSelectDecode').value;
    const customAlgorithmDivDecode = document.getElementById('customAlgorithmDivDecode');
    customAlgorithmDivDecode.style.display = selectedAlgorithmDecode === 'custom' ? 'block' : 'none';
});

document.getElementById('encodeButton').addEventListener('click', function () {
    // Kodowanie
    const inputText = document.getElementById('encodeInput').value;
    const selectedAlgorithm = document.getElementById('algorithmSelect').value;
    let encodedResult = '';

    if (inputText.trim() === '') {
        alert('Please enter text to encode.');
        return;
    }

    if (selectedAlgorithm === 'custom') {
        const customAlgorithm = document.getElementById('customAlgorithmInput').value;
        if (customAlgorithm.trim() === '') {
            alert('Please enter a custom algorithm.');
            return;
        }
        if (!validateCustomAlgorithm(customAlgorithm)) {
            alert('Invalid custom algorithm. It should only contain letters and numbers and have at least 3 characters.');
            return;
        }
        encodedResult = escapeHTML(customHash(inputText, customAlgorithm));
    } else {
        if (!isAlgorithmAvailable(selectedAlgorithm)) {
            alert('Selected algorithm is not available.');
            return;
        }
        encodedResult = escapeHTML(hashByAlgorithm(inputText, selectedAlgorithm));
    }

    displayResult('encodedResult', encodedResult);
});

document.getElementById('decodeButton').addEventListener('click', function () {
    // Dekodowanie
    const inputText = document.getElementById('decodeInput').value;
    const selectedAlgorithm = document.getElementById('algorithmSelectDecode').value;
    let decodedResult = '';

    if (inputText.trim() === '') {
        alert('Please enter text to decode.');
        return;
    }

    if (selectedAlgorithm === 'custom') {
        const customAlgorithm = document.getElementById('customAlgorithmInputDecode').value;
        if (customAlgorithm.trim() === '') {
            alert('Please enter a custom algorithm.');
            return;
        }
        if (!validateCustomAlgorithm(customAlgorithm)) {
            alert('Invalid custom algorithm. It should only contain letters and numbers and have at least 3 characters.');
            return;
        }
        decodedResult = customDecode(inputText, customAlgorithm);
    } else {
        if (!isAlgorithmAvailable(selectedAlgorithm)) {
            alert('Selected algorithm is not available.');
            return;
        }
        decodedResult = escapeHTML(decodeByAlgorithm(inputText, selectedAlgorithm));
    }

    displayResult('decodedResult', decodedResult);
});

document.getElementById('clearEncodeButton').addEventListener('click', function () {
    // Czyszczenie pola kodowania
    document.getElementById('encodeInput').value = '';
    document.getElementById('encodedResult').value = '';
});

document.getElementById('clearDecodeButton').addEventListener('click', function () {
    // Czyszczenie pola dekodowania
    document.getElementById('decodeInput').value = '';
    document.getElementById('decodedResult').value = '';
});

// Nowe funkcje do kopiowania wyników kodowania i dekodowania
const encodedClipboard = new ClipboardJS('#copyEncodedButton');
const decodedClipboard = new ClipboardJS('#copyDecodedButton');

encodedClipboard.on('success', function (e) {
    e.trigger.innerText = 'Copied!';
    setTimeout(function () {
        e.trigger.innerText = 'Copy';
    }, 2000);
});

decodedClipboard.on('success', function (e) {
    e.trigger.innerText = 'Copied!';
    setTimeout(function () {
        e.trigger.innerText = 'Copy';
    }, 2000);
});

// Obsługa niestandardowych algorytmów
function customHash(str, customAlgorithm) {
    // Tutaj możesz dodać implementację dowolnego niestandardowego algorytmu hashowania
    // Na przykład, użyj biblioteki CryptoJS, aby użyć SHA-256 do kodowania tekstu
    if (customAlgorithm === 'sha256') {
        return CryptoJS.SHA256(str).toString();
    }
    // Dodaj więcej warunków dla innych algorytmów, jeśli są dostępne
    // np. if (customAlgorithm === 'md5') { ... }
    //     else if (customAlgorithm === 'sha1') { ... }
    
    // W przeciwnym razie, jeśli algorytm nie jest obsługiwany, zwróć pusty ciąg
    return '';
}



function customDecode(hash, customAlgorithm) {
    if (customAlgorithm === 'sha1') {
        return 'Unable to decode. SHA-1 is a one-way hash function.';
    }
    // Tutaj można dodać implementację dekodowania dla innych niestandardowych algorytmów
    // W tym przykładzie, zwracamy oryginalny hash bez zmian
    return hash;
}

function isAlgorithmAvailable(algorithm) {
    return (
        algorithm === 'md5' ||
        algorithm === 'sha1' ||
        algorithm === 'sha256' ||
        algorithm === 'sha512' ||
        algorithm === 'sha3' ||
        algorithm === 'sha384' // Dodajemy sprawdzenie dla SHA-384
    );
}

// Aktualizujemy funkcję hashByAlgorithm
function hashByAlgorithm(str, algorithm) {
    if (algorithm === 'md5') {
        return CryptoJS.MD5(str).toString();
    } else if (algorithm === 'sha1') {
        return CryptoJS.SHA1(str).toString();
    } else if (algorithm === 'sha256') {
        return CryptoJS.SHA256(str).toString();
    } else if (algorithm === 'sha512') {
        return CryptoJS.SHA512(str).toString();
    } else if (algorithm === 'sha3') {
        return CryptoJS.SHA3(str).toString();
    } else if (algorithm === 'sha384') {
        return CryptoJS.SHA384(str).toString();
    }
    return '';
}

// Funkcja używająca "js-sha384" do hashowania za pomocą SHA-384
function sha384(str) {
    return sha384_digest(str); // Używamy funkcji sha384_digest z biblioteki "js-sha384"
}


// Nowe funkcje dekodujące
function decodeByAlgorithm(str, algorithm) {
    if (algorithm === 'md5') {
      return 'Decoding not available. MD5 is a one-way hash function.';
    } else if (algorithm === 'sha1') {
      return 'Decoding not available. SHA-1 is a one-way hash function.';
    } else if (algorithm === 'sha256') {
      return 'Decoding not available. SHA-256 is a one-way hash function.';
    } else if (algorithm === 'sha512') {
      return 'Decoding not available. SHA-512 is a one-way hash function.';
    } else if (algorithm === 'sha3') {
      return 'Decoding not available. SHA-3 is a one-way hash function.';
    } else if (algorithm === 'sha384') {
      return 'Decoding not available. SHA-384 is a one-way hash function.';
    }
    return '';
  }
  
  function encodeWithSalt(str, salt) {
    // Implementacja kodowania z solą dla niestandardowego algorytmu
    // Tu można użyć odpowiednich funkcji z biblioteki CryptoJS do kodowania z solą
    // Na przykład, jeśli jest to algorytm z solą SHA-256:
    // return CryptoJS.SHA256(str + salt).toString();
    return 'Encoded with salt: ' + str + ', ' + salt;
  }
  
  function decodeWithSalt(hash, salt) {
    // Implementacja dekodowania z solą dla niestandardowego algorytmu
    // Tu można użyć odpowiednich funkcji z biblioteki CryptoJS do dekodowania z solą
    // Na przykład, jeśli jest to algorytm z solą SHA-256:
    // return CryptoJS.SHA256(hash + salt).toString();
    return 'Decoded with salt: ' + hash + ', ' + salt;
  }



/* Aktualizujemy funkcję decodeByAlgorithm
function decodeByAlgorithm(str, algorithm) {
    if (algorithm === 'md5') {
        return decodeMD5(str);
    } else if (algorithm === 'sha1') {
        return decodeSHA1(str);
    } else if (algorithm === 'sha256') {
        return decodeSHA256(str);
    } else if (algorithm === 'sha512') {
        return decodeSHA512(str);
    } else if (algorithm === 'sha3') {
        return decodeSHA3(str);
    } else if (algorithm === 'sha384') {
        return decodeSHA384(str);
    }
    return '';
}
*/

function md5(str) {
    // Implementacja algorytmu MD5 (niebezpieczny w zastosowaniach produkcyjnych)
    // Tu można użyć zewnętrznej biblioteki do obliczeń MD5
    return 'md5:' + str;
}

function sha1(str) {
    // Implementacja algorytmu SHA-1
    // Tu można użyć zewnętrznej biblioteki do obliczeń SHA-1
    return 'sha1:' + str;
}

function sha256(str) {
    // Implementacja algorytmu SHA-256
    // Tu można użyć zewnętrznej biblioteki do obliczeń SHA-256
    return 'sha256:' + str;
}

function sha512(str) {
    // Implementacja algorytmu SHA-512
    // Tu można użyć zewnętrznej biblioteki do obliczeń SHA-512
    return 'sha512:' + str;
}

function sha3(str) {
    // Implementacja algorytmu SHA-3
    // Tu można użyć zewnętrznej biblioteki do obliczeń SHA-3
    return 'sha3:' + str;
}

function sha384(str) {
    // Implementacja algorytmu SHA-384
    // Tu można użyć zewnętrznej biblioteki do obliczeń SHA-384
    return 'sha384:' + str;
}

// Zabezpieczenie przed atakami XSS - escaping danych użytkownika
function escapeHTML(text) {
    const element = document.createElement('div');
    element.innerText = text;
    return element.innerHTML;
}

// Funkcja sprawdzająca dostępność algorytmu
function isAlgorithmAvailable(algorithm) {
    return algorithm === 'md5' || algorithm === 'sha1' || algorithm === 'sha256' || algorithm === 'sha512' || algorithm === 'sha3';
}

// Walidacja niestandardowego algorytmu
function validateCustomAlgorithm(customAlgorithm) {
    const pattern = /^[A-Za-z0-9]+$/;
    return pattern.test(customAlgorithm) && customAlgorithm.length >= 3;
}

// Funkcja do wyświetlania wyników
function displayResult(resultElementId, result) {
    document.getElementById(resultElementId).innerText = result;
}
