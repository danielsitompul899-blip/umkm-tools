function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(angka);
}

function hitungHargaJual() {
    const modal = parseFloat(document.getElementById('hj-modal').value) || 0;
    const margin = parseFloat(document.getElementById('hj-margin').value) || 0;
    const keuntungan = modal * (margin / 100);
    const hargaJual = modal + keuntungan;
    document.getElementById('hj-harga').textContent = formatRupiah(hargaJual);
    document.getElementById('hj-untung').textContent = formatRupiah(keuntungan);
    document.getElementById('result-hj').style.display = 'block';
}

function hitungKeuntungan() {
    const modal = parseFloat(document.getElementById('kg-modal').value) || 0;
    const pendapatan = parseFloat(document.getElementById('kg-pendapatan').value) || 0;
    const keuntungan = pendapatan - modal;
    const persentase = modal > 0 ? (keuntungan / modal) * 100 : 0;
    document.getElementById('kg-untung').textContent = formatRupiah(keuntungan);
    document.getElementById('kg-persen').textContent = persentase.toFixed(2) + '%';
    document.getElementById('result-kg').style.display = 'block';
}

function hitungDiskon() {
    const harga = parseFloat(document.getElementById('kd-harga').value) || 0;
    const diskon = parseFloat(document.getElementById('kd-diskon').value) || 0;
    const potongan = harga * (diskon / 100);
    const hargaAkhir = harga - potongan;
    document.getElementById('kd-potong').textContent = formatRupiah(potongan);
    document.getElementById('kd-akhir').textContent = formatRupiah(hargaAkhir);
    document.getElementById('result-kd').style.display = 'block';
}

function hitungMargin() {
    const harga = parseFloat(document.getElementById('km-harga').value) || 0;
    const modal = parseFloat(document.getElementById('km-modal').value) || 0;
    const keuntungan = harga - modal;
    const margin = harga > 0 ? (keuntungan / harga) * 100 : 0;
    document.getElementById('km-margin').textContent = margin.toFixed(2) + '%';
    document.getElementById('km-untung').textContent = formatRupiah(keuntungan);
    document.getElementById('result-km').style.display = 'block';
}

function hitungModal() {
    const bahan = parseFloat(document.getElementById('kmod-bahan').value) || 0;
    const tenaga = parseFloat(document.getElementById('kmod-tenaga').value) || 0;
    const lain = parseFloat(document.getElementById('kmod-lain').value) || 0;
    const total = bahan + tenaga + lain;
    const perUnit = total / 10;
    document.getElementById('kmod-total').textContent = formatRupiah(total);
    document.getElementById('kmod-perunit').textContent = formatRupiah(perUnit);
    document.getElementById('result-kmod').style.display = 'block';
}

function hitungKebutuhanBahan() {
    const target = parseFloat(document.getElementById('kb-target').value) || 0;
    const perUnit = parseFloat(document.getElementById('kb-perunit').value) || 0;
    const satuan = document.getElementById('kb-satuan').value;
    const total = target * perUnit;
    const cadangan = total * 1.1;
    document.getElementById('kb-total').textContent = total.toLocaleString('id-ID') + ' ' + satuan;
    document.getElementById('kb-beli').textContent = cadangan.toLocaleString('id-ID') + ' ' + satuan;
    document.getElementById('result-kb').style.display = 'block';
}