const today = new Date();
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const formattedDate = `${months[today.getMonth()]} ${today.getDate()}`;

document.getElementById('tipForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const foodSales = parseFloat(document.getElementById('foodSales').value);
    const beerSales = parseFloat(document.getElementById('beerSales').value);
    const liquorSales = parseFloat(document.getElementById('liquorSales').value);
    const wineSales = parseFloat(document.getElementById('wineSales').value);
    const totalSales = parseFloat(document.getElementById('totalSales').value);
    const creditCardTips = parseFloat(document.getElementById('creditCardTips').value);

    const expo = foodSales * 0.018;
    const busser = foodSales * 0.018;
    const host = foodSales * 0.002;
    const bartender = (beerSales + liquorSales + wineSales) * 0.09;
    const declaredTips = totalSales * 0.10;
    const totalTipout = Math.round(expo) + Math.round(busser) + Math.round(bartender) + Math.round(host);

    let resultsHTML = `
        <p><strong>Date:</strong> <strong>${formattedDate}</strong></p>
        <div class="results-grid">
            <div style="color: #273be2;"><strong>Food Sales</strong></div><div style="color: #273be2;"><strong>$${foodSales}</strong></div>
            <div style="color: #273be2;"><strong>Beverage Sales</strong></div><div style="color: #273be2;"><strong>$${(beerSales + liquorSales + wineSales).toFixed(2)}</strong></div>
            <div style="color: #006600;"><strong>Busser</strong></div><div style="color: #006600;"><strong>$${Math.round(busser)}</strong></div>
            <div style="color: #006600;"><strong>Expo</strong></div><div style="color: #006600;"><strong>$${Math.round(expo)}</strong></div>
            <div style="color: #006600;"><strong>Bartender</strong></div><div style="color: #006600;"><strong>$${Math.round(bartender)}</strong></div>
            <div style="color: #006600;"><strong>Host</strong></div><div style="color: #006600;"><strong>$${Math.round(host)}</strong></div>
            <div style="color: #b22222;"><strong>Total Tipout</strong></div><div style="color: #b22222;"><strong>$${totalTipout}</strong></div>
            <div style="color: #b22222;"><strong>Total Sales</strong></div><div style="color: #b22222;"><strong>$${Math.round(totalSales)}</strong></div>
            <div style="color: #b22222;"><strong>Tips Declared</strong></div><div style="color: #b22222;"><strong>$${Math.floor(declaredTips)}</strong></div>`;

    if (!isNaN(creditCardTips)) {
        const kickfin = (creditCardTips - totalTipout);
        resultsHTML += `
            <div style="color: #b22222;"><strong>Kickfin Tips</strong></div>
            <div style="color: #b22222;"><strong>$${kickfin}</strong></div>`;
    }

    resultsHTML += `</div>`;

    document.getElementById('results').innerHTML = resultsHTML;
});
