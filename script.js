const form = document.getElementById("tipForm");
const results = document.getElementById("results");

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});

function readNumber(id) {
  return Number.parseFloat(document.getElementById(id).value);
}

function money(value) {
  return currency.format(value);
}

function sheetValue(className, value, label) {
  return `
    <span class="sheet-value ${className}">
      <span class="sr-only">${label}: </span>
      ${value}
    </span>
  `;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const netCash = readNumber("netCash");
  const foodSales = readNumber("foodSales");
  const beerSales = readNumber("beerSales");
  const liquorSales = readNumber("liquorSales");
  const wineSales = readNumber("wineSales");
  const totalSales = readNumber("totalSales");
  const creditCardTips = readNumber("creditCardTips");

  const requiredValues = [
    foodSales,
    beerSales,
    liquorSales,
    wineSales,
    totalSales
  ];

  if (requiredValues.some(value => !Number.isFinite(value))) {
    return;
  }

  const barSales = beerSales + liquorSales + wineSales;

  // Preserve the original individual-tipout rounding.
  const busser = Math.round(foodSales * 0.018);
  const expo = Math.round(foodSales * 0.018);
  const host = Math.round(foodSales * 0.002);
  const bartender = Math.round(barSales * 0.09);

  const totalTipout = busser + expo + host + bartender;
  const declaredTips = Math.floor(creditCardTips - totalTipout);

  const hasCreditCardTips = Number.isFinite(creditCardTips);

  const date = new Date().toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit"
  });

  results.innerHTML = `
    <div
      class="checkout-sheet-scroll"
      tabindex="0"
      role="region"
      aria-label="Completed checkout sheet; scroll horizontally to view"
    >
      <div class="checkout-sheet">
        <img
          class="checkout-sheet-image"
          src="checkout sheet.png"
          alt="Checkout sheet with food sales, bar sales, tipout calculations, and tip summary"
        >

        ${sheetValue(
          "sheet-date",
          date,
          "Date"
        )}

        ${sheetValue(
          "sheet-net-sales",
          money(totalSales),
          "Net sales"
        )}

        ${sheetValue(
          "sheet-left sheet-food",
          money(foodSales),
          "Food"
        )}

        ${sheetValue(
          "sheet-left sheet-food-total",
          money(foodSales),
          "Total food sales"
        )}

        ${sheetValue(
          "sheet-left sheet-beer",
          money(beerSales),
          "Beer"
        )}

        ${sheetValue(
          "sheet-left sheet-liquor",
          money(liquorSales),
          "Liquor"
        )}

        ${sheetValue(
          "sheet-left sheet-wine",
          money(wineSales),
          "Wine"
        )}

        ${sheetValue(
          "sheet-left sheet-bar-total",
          money(barSales),
          "Total bar sales"
        )}

        ${sheetValue(
          "sheet-right sheet-busser",
          money(busser),
          "Busser tipout"
        )}

        ${sheetValue(
          "sheet-right sheet-expo",
          money(expo),
          "Expo tipout"
        )}

        ${sheetValue(
          "sheet-right sheet-host",
          money(host),
          "Host tipout"
        )}

        ${sheetValue(
          "sheet-right sheet-bartender",
          money(bartender),
          "Bartender tipout"
        )}

        ${sheetValue(
          "sheet-right sheet-total-tipout",
          money(totalTipout),
          "Total tipout"
        )}

        ${
          hasCreditCardTips
            ? sheetValue(
                "sheet-bottom sheet-gratuity",
                money(creditCardTips),
                "Total gratuity and non-cash tips"
              )
            : ""
        }

        ${sheetValue(
          "sheet-bottom sheet-bottom-tipout",
          money(totalTipout),
          "Total tipout summary"
        )}

        ${sheetValue(
          "sheet-bottom sheet-declared",
          money(declaredTips),
          "Tips declared"
        )}

        ${sheetValue(
          "sheet-net-cash",
          money(netCash),
          "Net cash"
        )}
      </div>
    </div>

    ${
      hasCreditCardTips
        ? `
          <p class="kickfin-result">
          </p>
        `
        : ""
    }
  `;

  results.hidden = false;
});