let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function formatRupiah(angka) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(angka);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('id-ID', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });
}

function saveToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function updateBalance() {
    const income = transactions.filter(t => t.jenis === 'income').reduce((sum, t) => sum + t.jumlah, 0);
    const expense = transactions.filter(t => t.jenis === 'expense').reduce((sum, t) => sum + t.jumlah, 0);
    const saldo = income - expense;
    document.getElementById('saldo').textContent = formatRupiah(saldo);
    document.getElementById('total-pemasukan').textContent = formatRupiah(income);
    document.getElementById('total-pengeluaran').textContent = formatRupiah(expense);
}

function renderTransactions() {
    const filterKategori = document.getElementById('filter-kategori').value;
    const listElement = document.getElementById('transactions-list');
    let filtered = filterKategori === 'all' ? transactions : transactions.filter(t => t.kategori === filterKategori);
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    if (filtered.length === 0) {
        listElement.innerHTML = '<div class="no-transactions"><p>Belum ada transaksi</p></div>';
        return;
    }
    
    listElement.innerHTML = filtered.map(t => `
        <div class="transaction-item ${t.jenis}">
            <div class="transaction-info">
                <div class="transaction-category">${t.kategori}</div>
                <div class="transaction-description">${t.keterangan}</div>
                <div class="transaction-date">${formatDate(t.timestamp)}</div>
            </div>
            <div class="transaction-amount ${t.jenis}">${t.jenis === 'income' ? '+' : '-'} ${formatRupiah(t.jumlah)}</div>
            <button class="btn-danger" onclick="deleteTransaction(${t.id})">Hapus</button>
        </div>
    `).join('');
}

document.getElementById('transaction-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const transaction = {
        id: Date.now(),
        jenis: document.getElementById('jenis').value,
        jumlah: parseFloat(document.getElementById('jumlah').value),
        kategori: document.getElementById('kategori').value,
        keterangan: document.getElementById('keterangan').value,
        timestamp: new Date().toISOString()
    };
    transactions.push(transaction);
    saveToLocalStorage();
    updateBalance();
    renderTransactions();
    this.reset();
});

function deleteTransaction(id) {
    if (confirm('Hapus transaksi ini?')) {
        transactions = transactions.filter(t => t.id !== id);
        saveToLocalStorage();
        updateBalance();
        renderTransactions();
    }
}

function clearAllData() {
    if (confirm('PERINGATAN: Semua data akan dihapus! Lanjutkan?')) {
        transactions = [];
        localStorage.removeItem('transactions');
        updateBalance();
        renderTransactions();
    }
}

updateBalance();
renderTransactions();