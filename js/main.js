const coins = document.getElementById("coins");
const mcap = document.getElementById("total-market-cap");

const coinUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false";
const mcapUrl = "https://api.coingecko.com/api/v3/global";

const coinsFetch = async () => {
  const response = await fetch(coinUrl);
  const coinsRes = await response.json();

  coinsRes.forEach((coin, i) => {
    coins.innerHTML += `
      <div class="coin">
        <p class="rank">${i + 1}</p>
        <div class="row">
          <img class="ticker-image" src=${coin.image} />
          <p>${coin.name}</p>
        </div>
        <p>$ ${coin.current_price.toFixed(2)}</p>
        <p class="change">
          <b>24h:</b>
          <span class=${coin.price_change_percentage_24h > 0 ? "green" : "red"}>
            ${coin.price_change_percentage_24h.toFixed(2)} %
          </span>
        </p>
      </div>
    `;
  });
};
coinsFetch().catch((error) => console.log(error));

const mcapFetch = async () => {
  const response = await fetch(mcapUrl);

  const mcapRes = await response.json();

  mcap.innerHTML = `$ ${(
    mcapRes.data.total_market_cap.usd / 1000000000000
  ).toFixed(2)} Trillion`;
};
mcapFetch().catch((error) => console.log(error));
