// tripleDES.js
function hexFromWA(wa){ return CryptoJS.enc.Hex.stringify(wa); }

function encrypt3DES(plaintext, k1Str, k2Str, k3Str, mode, ivHex, logCallback){
    logCallback('Plaintext: ' + plaintext);
    const cfg = {};
    cfg.mode = mode==='CBC'?CryptoJS.mode.CBC:CryptoJS.mode.ECB;
    cfg.padding = CryptoJS.pad.Pkcs7;
    if(mode==='CBC'){ cfg.iv = CryptoJS.enc.Hex.parse(ivHex); }

    const pWA = CryptoJS.enc.Utf8.parse(plaintext);
    const k1 = CryptoJS.enc.Utf8.parse(k1Str);
    const k2 = CryptoJS.enc.Utf8.parse(k2Str);
    const k3 = CryptoJS.enc.Utf8.parse(k3Str);

    const e1 = CryptoJS.DES.encrypt(pWA, k1, cfg);
    logCallback('E_k1 -> hex: ' + hexFromWA(e1.ciphertext));

    const cp1 = CryptoJS.lib.CipherParams.create({ ciphertext: e1.ciphertext });
    const d2 = CryptoJS.DES.decrypt(cp1, k2, cfg);
    logCallback('D_k2 -> hex: ' + hexFromWA(d2));

    const e3 = CryptoJS.DES.encrypt(d2, k3, cfg);
    logCallback('E_k3 -> base64: ' + e3.toString());
    logCallback('Enkripsi selesai.');
    return e3.toString();
}

function decrypt3DES(ciphertextBase64, k1Str, k2Str, k3Str, mode, ivHex, logCallback){
    try{
        const cfg = {};
        cfg.mode = mode==='CBC'?CryptoJS.mode.CBC:CryptoJS.mode.ECB;
        cfg.padding = CryptoJS.pad.Pkcs7;
        if(mode==='CBC'){ cfg.iv = CryptoJS.enc.Hex.parse(ivHex); }

        const cp = CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Base64.parse(ciphertextBase64) });
        const k1 = CryptoJS.enc.Utf8.parse(k1Str);
        const k2 = CryptoJS.enc.Utf8.parse(k2Str);
        const k3 = CryptoJS.enc.Utf8.parse(k3Str);

        const d3 = CryptoJS.DES.decrypt(cp, k3, cfg);
        const e2 = CryptoJS.DES.encrypt(d3, k2, cfg);
        const cp3 = CryptoJS.lib.CipherParams.create({ ciphertext: e2.ciphertext });
        const d1 = CryptoJS.DES.decrypt(cp3, k1, cfg);

        const result = d1.toString(CryptoJS.enc.Utf8);
        logCallback('Hasil akhir: ' + result);
        logCallback('Dekripsi selesai.');
        return result;
    }catch(e){
        logCallback('Error: ' + e.message);
        return '';
    }
}
