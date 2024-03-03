const apiKey = 'Api от Etherscan';
const apiUrl = 'https://api.etherscan.io/api';

document.getElementById("walletForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию
    const walletAddress = document.getElementById("walletAddress").value;
    await displayTransactions(walletAddress);
});

async function fetchTransactions(walletAddress) {
    const url = `${apiUrl}?module=account&action=txlist&address=${walletAddress}&sort=desc&apikey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.result.slice(0, 5); // Возвращаем только последние 5 транзакций
    } catch (error) {
        console.error('Ошибка при запросе данных с Etherscan:', error);
        return [];
    }
}

async function displayTransactions(walletAddress) {
    const transactions = await fetchTransactions(walletAddress);
    const transactionList = document.getElementById('transactionList');
    
    transactionList.innerHTML = ''; // Очищаем список транзакций перед добавлением новых
    
    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        const valueInEther = (parseFloat(transaction.value) / 1e18).toFixed(18); // Переводим значение транзакции в ETH
        listItem.textContent = `Txn Hash: ${transaction.hash}, Value: ${valueInEther} ETH, To: ${transaction.to}`;
        transactionList.appendChild(listItem);
    });
}
