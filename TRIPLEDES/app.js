// app.js
const appDiv = document.getElementById('app');

// HTML UI
appDiv.innerHTML = `
<h1>🔐 Demo 3DES Interaktif</h1>

<label>Plaintext:</label>
<textarea id="plaintext" rows="3">Hello, 3DES demo!</textarea>

<label>Kunci 1 (K1):</label>
<input id="k1" value="key1pass">
<label>Kunci 2 (K2):</label>
<input id="k2" value="key2pass">
<label>Kunci 3 (K3):</label>
<input id="k3" value="key3pass">

<label>Mode:</label>
<select id="mode">
<option value="ECB">ECB</option>
<option value="CBC">CBC</option>
</select>

<label>IV (hex, untuk CBC):</label>
<input id="iv" value="0000000000000000">

<div style="margin: 1rem 0;">
<button id="encryptBtn">Encrypt</button>
<button id="decryptBtn">Decrypt</button>
</div>

<label>Ciphertext (base64):</label>
<textarea id="ciphertext" rows="4"></textarea>

<h3>Langkah & Log:</h3>
<div id="log" class="log" style="background:#f3f4f6;padding:1rem;height:200px;overflow-y:auto;border-radius:4px;border:1px solid #ddd;font-size:0.9rem;"></div>
`;

// Fungsi log
function logStep(text){
    const l = document.getElementById('log');
    l.innerHTML += text + '<br>';
    l.scrollTop = l.scrollHeight;
}

// Event button
document.getElementById('encryptBtn').onclick = ()=>{
    document.getElementById('log').innerHTML='';
    const pt = document.getElementById('plaintext').value;
    const k1 = document.getElementById('k1').value;
    const k2 = document.getElementById('k2').value;
    const k3 = document.getElementById('k3').value;
    const mode = document.getElementById('mode').value;
    const iv = document.getElementById('iv').value;
    const ct = encrypt3DES(pt, k1, k2, k3, mode, iv, logStep);
    document.getElementById('ciphertext').value = ct;
};

document.getElementById('decryptBtn').onclick = ()=>{
    document.getElementById('log').innerHTML='';
    const ct = document.getElementById('ciphertext').value;
    const k1 = document.getElementById('k1').value;
    const k2 = document.getElementById('k2').value;
    const k3 = document.getElementById('k3').value;
    const mode = document.getElementById('mode').value;
    const iv = document.getElementById('iv').value;
    decrypt3DES(ct, k1, k2, k3, mode, iv, logStep);
};
