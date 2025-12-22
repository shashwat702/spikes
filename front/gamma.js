
tsParticles.load("tsparticles", {
      fullScreen: {
        enable: true,
        zIndex: -1
      },
      particles: {
        number: { value: 60, density: { enable: true, area: 800 } },
        color: { value: "#F8F7FF" },
        opacity: { value: 0.6 },
        size: { value: 3.6 },
        links: {
          enable: true,
          distance: 120,
          color: "#F8F7FF",
          opacity: 0.35,
          width: 0.3
        },
        move: { enable: true, speed: 1 }
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
          resize: true
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 }
        }
      },
      background: { color: "#030c48" }
    });



const canvas = document.getElementById('trail-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Particle trail array
let sparks = [];

// Add spark particles on mousemove
document.addEventListener('mousemove', (e) => {
  for (let i = 0; i < 5; i++) { // more density
    sparks.push({
      x: e.clientX,
      y: e.clientY,
      vx: (Math.random() - 0.5) * 2, // sparkle motion
      vy: (Math.random() - 0.5) * 2,
      radius: Math.random() * 2 + 1.5,
      alpha: 150,
      life: 90
    });
  }
});

function animateSparkTrail() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < sparks.length; i++) {
    let s = sparks[i];
    s.x += s.vx;
    s.y += s.vy;
    s.alpha -= 0.015;
    s.life--;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(255, 215, 0, ${s.alpha})`;

    // Glow
    ctx.shadowColor = 'rgba(255, 215, 0, 0.8)';
    ctx.shadowBlur = 15;

    ctx.fill();
    ctx.shadowBlur = 0;
  }

  sparks = sparks.filter(s => s.alpha > 0 && s.life > 0);
  requestAnimationFrame(animateSparkTrail);
}
animateSparkTrail();
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const skillBars = document.querySelectorAll('.skill-progress');

// Navigation functionality
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});
window.addEventListener('scroll',()=>{
  if(window.scrollY>300){
    backToTopBtn.classList.add('visible');
  }
  else{
    backToTopBtn.classList.remove('visible');
  }
});
backToTopBtn.addEventListener('click',()=>{
  window.scrollTo({
    top:0,
    behaviour:'smooth'
  });
});

const hero=document.querySelector('.accent-text');
const heroArray=['Welcome to the world of Finance'];
const typingDelay1 = 240;
const erasingDelay1 = 300;
const newTextDelay1 = 350;
let textArrayIndex1 = 0;
let charIndex1 = 0;
function type1(){
  if(charIndex1<heroArray[textArrayIndex1].length){
    hero.textContent+=heroArray[textArrayIndex1].charAt(charIndex1);
    charIndex1++;
    setTimeout(type1,typingDelay1);
  }
  else{
    setTimeout(erase1,newTextDelay1);
  }
}
function erase1() {
    if (charIndex1 > 0) {
        hero.textContent = heroArray[textArrayIndex1].substring(0, charIndex1 - 1);
        charIndex1--;
        setTimeout(erase1, erasingDelay1);
    } else {
        textArrayIndex1++;
        if (textArrayIndex1 >= heroArray.length) textArrayIndex1 = 0;
        setTimeout(type1, typingDelay1 + 1100);
    }
}
const typedTextSpan=document.querySelector('.typed-text');
const textArray=['Be as consistent as a sun','Keep spiking and keep earning'];
const typingDelay = 85;
const erasingDelay = 70;
const newTextDelay = 450;
let textArrayIndex = 0;
let charIndex = 0;
function type(){
  if(charIndex<textArray[textArrayIndex].length){
    typedTextSpan.textContent+=textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type,typingDelay);
  }
  else{
    setTimeout(erase,newTextDelay);
  }
}
function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}
document.addEventListener('DOMContentLoaded',()=>{
  setTimeout(type,newTextDelay+250);
  setTimeout(type1,newTextDelay+250);
});
document.addEventListener('DOMContentLoaded',()=>{
  setTimeout(type1,newTextDelay+250);
});
const animateOnScrollOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, animateOnScrollOptions);

// Elements to animate on scroll
const animatedElements = document.querySelectorAll('.project-card, .achievement-card, .skill-category, .about-text, .profile-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(el);
});
if (!('ontouchstart' in window)) {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

    document.querySelectorAll('.flip-card').forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

  

let chart = null;
async function fetchStockData(symbol) {
  const status = document.getElementById("status");
  status.innerText = "⏳ Fetching data...";

  try {
    const response = await fetch(
      `http://localhost:3000/api/stock/${symbol}`
    );

    const json = await response.json();

    if (!json.labels || !json.prices) {
      status.innerText = "No data found";
      return;
    }

   status.innerText = `Showing ${json.symbol} live data`;

  if (json.labels.length === 0) {
  status.innerText = "No intraday data available (market closed)";
  return;
}

renderChart(json.symbol, json.labels, json.prices);

  } catch (error) {
    console.error(error);
    status.innerText = "❌ Error fetching data";
  }
}

function renderChart(symbol, labels, prices) {
  const canvas = document.getElementById("stockChart");
  if (!canvas) {
    console.error("Canvas not found");
    return;
  }

  const ctx = canvas.getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: `${symbol}`,
        data: prices,
        borderColor: "orange",
        backgroundColor: "rgba(255,165,0,0.2)",
        fill: true,
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { ticks: { color: "#b7e912ff" }},
        y: { ticks: { color: "#fbc672ff" }}
      },
      plugins: {
        legend: { labels: { color: "#fff" }}
      }
    }
  });
}


async function loadStock() {
  const status = document.getElementById("status");
  const input = document
    .getElementById("stockInput")
    .value
    .trim()
    .toUpperCase();

  if (!input) {
    status.innerText = "❌ Enter Stock Symbol like INFY.NSE";
    return;
  }

  fetchStockData(input);
}

async function loadMarketNews() {
  try {
    const res = await fetch("http://localhost:3000/api/market-news");
    const data = await res.json();

    const ticker = document.getElementById("newsTicker");
    ticker.innerHTML = "";

    data.news.forEach(item => {
      const div = document.createElement("div");
      div.className = "news-line";
      div.textContent = "🔸 " + item;
      ticker.appendChild(div);
    });

  } catch (err) {
    console.error("News fetch error", err);
  }
}

loadMarketNews();
setInterval(loadMarketNews, 30000);
async function loadMarketStats() {
  try {
    const res = await fetch("http://localhost:3000/api/market-stats");
    const data = await res.json();

    document.getElementById("stat-number1").innerText = data.advances;
    document.getElementById("stat-number2").innerText = data.unchanged;
    document.getElementById("stat-number3").innerText = data.declines;

  } catch (err) {
    console.error("Market stats error", err);
  }
}

loadMarketStats();
setInterval(loadMarketStats, 3 * 60 * 1000); // refresh every 3 min

async function fetchBitcoinPrice() {
  const url = `https://api.twelvedata.com/price?symbol=BTC/USD&apikey=d1eea1d7ec684c829e70d4c82de71cbf`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.price) {
      document.getElementById("btc-price").innerText = `Bitcoin : $ ${data.price}`;
    } else {
      document.getElementById("btc-price").innerText = "Failed to fetch price.";
      console.error("API response:", data);
    }
  } catch (error) {
    console.error("Error fetching Bitcoin price:", error);
    document.getElementById("btc-price").innerText = "Error loading price.";
  }
}

// Auto-refresh every 60 seconds
fetchBitcoinPrice();
setInterval(fetchBitcoinPrice, 600000);
async function fetchDogecoinPrice() {
  const url = `https://api.twelvedata.com/time_series?symbol=DOGE/USD&interval=1min&apikey=d1eea1d7ec684c829e70d4c82de71cbf`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.values && data.values.length > 0) {
      const latestPrice = data.values[0].close;
      document.getElementById("dtc-price").innerText = `Dogecoin: $${latestPrice}`;
    } else {
      document.getElementById("dtc-price").innerText = "Failed to fetch price.";
      console.error("Invalid API response:", data);
    }
  } catch (error) {
    console.error("Error fetching Dogecoin price:", error);
    document.getElementById("dtc-price").innerText = "Error loading price.";
  }
}

// Auto-refresh every 60 seconds
fetchDogecoinPrice();
setInterval(fetchDogecoinPrice, 600000);
async function fetchlitecoinPrice() {
  const url = `https://api.twelvedata.com/time_series?apikey=d1eea1d7ec684c829e70d4c82de71cbf&interval=1min&symbol=LTC/USD`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.values && data.values.length > 0) {
      const latestPrice = data.values[0].close;
      document.getElementById("ltc-price").innerText = `Litecoin: $${latestPrice}`;
    } else {
      document.getElementById("ltc-price").innerText = "Failed to fetch price.";
      console.error("Invalid API response:", data);
    }
  } catch (error) {
    console.error("Error fetching Dogecoin price:", error);
    document.getElementById("ltc-price").innerText = "Error loading price.";
  }
}

// Auto-refresh every 60 seconds
fetchlitecoinPrice();
setInterval(fetchlitecoinPrice, 600000);
async function fetchdragoPrice() {
  const url = `https://api.twelvedata.com/time_series?apikey=d1eea1d7ec684c829e70d4c82de71cbf&interval=1min&symbol=DRG/USD`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.values && data.values.length > 0) {
      const latestPrice = data.values[0].close;
      document.getElementById("dg-price").innerText = `Drago: $${latestPrice}`;
    } else {
      document.getElementById("dg-price").innerText = "Failed to fetch price.";
      console.error("Invalid API response:", data);
    }
  } catch (error) {
    console.error("Error fetching drago price:", error);
    document.getElementById("dg-price").innerText = "Error loading price.";
  }
}

// Auto-refresh every 60 seconds
fetchdragoPrice();
setInterval(fetchdragoPrice, 600000);
 async function fetchCryptoPrice() {
    const url = `https://api.twelvedata.com/time_series?apikey=d1eea1d7ec684c829e70d4c82de71cbf&interval=1min&symbol=BTC/USD`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.values && data.values.length > 0) {
        const latestPrice = data.values[0].close;
        document.getElementById("crypto-price").innerText = `BTC/USD: $${latestPrice}`;
      } else {
        document.getElementById("crypto-price").innerText = "Failed to fetch price.";
        console.error("Invalid API response:", data);
      }
    } catch (error) {
      console.error("Error fetching price:", error);
      document.getElementById("crypto-price").innerText = "Error loading price.";
    }
  }

  // Initial load and auto-refresh every 60 seconds
  fetchCryptoPrice();
  setInterval(fetchCryptoPrice, 600000);
async function fetchExchangeRate() {
      const url = 'https://v6.exchangerate-api.com/v6/5e2b4e7e9b1df405092d49c2/latest/USD';

      try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("Full API Response:", data);

        if (data && data.conversion_rates && data.conversion_rates.INR) {
          const rate = data.conversion_rates.INR;
          document.getElementById("exchange-rate").innerText = `1 USD = ₹${rate}`;
        } else {
          document.getElementById("exchange-rate").innerText = "INR rate not found in response.";
        }

      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        document.getElementById("exchange-rate").innerText = "Failed to load exchange rate.";
      }
    }

    fetchExchangeRate();
async function fetchEURtoUSD() {
      const url = 'https://v6.exchangerate-api.com/v6/5e2b4e7e9b1df405092d49c2/latest/EUR';

      try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("Full API Response:", data);

        if (data && data.conversion_rates && data.conversion_rates.USD) {
          const rate = data.conversion_rates.USD;
          document.getElementById("eur-to-usd-rate").innerText = `1 EUR = $${rate}`;
        } else {
          document.getElementById("eur-to-usd-rate").innerText = "USD rate not found.";
        }

      } catch (error) {
        console.error("Error fetching EUR to USD rate:", error);
        document.getElementById("eur-to-usd-rate").innerText = "Error loading rate.";
      }
    }

    fetchEURtoUSD();
    async function loadTopMovers() {
  try {
    const res = await fetch("http://localhost:3000/api/top-movers");
    const data = await res.json();

    const winnersBox = document.getElementById("winners-list");
    const losersBox = document.getElementById("losers-list");

    winnersBox.innerHTML = "";
    losersBox.innerHTML = "";

    // 🟢 WINNERS
    data.gainers.forEach(stock => {
      winnersBox.innerHTML += `
        <div class="market-row gain">
          <div>
            <strong>${stock.symbol}</strong><br>
            <span>₹${stock.price}</span>
          </div>
          <div class="change positive">
            +${stock.change} (${stock.percent}%)
          </div>
        </div>
      `;
    });

    // 🔴 LOSERS
    data.losers.forEach(stock => {
      losersBox.innerHTML += `
        <div class="market-row loss">
          <div>
            <strong>${stock.symbol}</strong><br>
            <span>₹${stock.price}</span>
          </div>
          <div class="change negative">
            ${stock.change} (${stock.percent}%)
          </div>
        </div>
      `;
    });

  } catch (err) {
    console.error("Frontend movers error:", err);
  }
}

// 🔥 LOAD ON PAGE START
loadTopMovers();

setInterval(loadTopMovers, 180000); // every 3 minutes

const chatBtn = document.getElementById("ai-chat-btn");
const cbt=document.getElementById("cbt");
const chatBox = document.getElementById("ai-chatbox");
const messages = document.getElementById("ai-messages");
const input = document.getElementById("ai-input");

chatBtn.onclick = () => {
  chatBox.classList.toggle("open");
};
cbt.onclick = () => {
  chatBox.classList.toggle("open");
};
function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = sender;
  div.innerText = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

async function sendAI() {
  const question = input.value.trim();
  if (!question) return;

  addMessage(question, "user");
  input.value = "";

  try {
    const res = await fetch("http://localhost:3000/api/ai-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question }),
    });

    const data = await res.json();
    addMessage(data.reply, "ai");

  } catch (err) {
    addMessage("AI service unavailable", "ai");
  }
}
