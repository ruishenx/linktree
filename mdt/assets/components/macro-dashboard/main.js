const liq=document.getElementById('liq'),risk=document.getElementById('risk'),score=document.getElementById('score'),bar=document.getElementById('bar'),regime=document.getElementById('regime');
fetch('./data.json').then(r=>r.json()).then(d=>{liq.value=d.initial_liquidity_pressure;risk.value=d.initial_risk_appetite;update();});
function update(){const l=Number(liq.value),r=Number(risk.value),s=Math.max(0,Math.min(100,Math.round(50+(r-l)*.55)));score.textContent=s;bar.style.width=s+'%';regime.textContent=s>=70?'Expansion':s>=50?'Recovery':s>=30?'Slowdown':'Contraction';}
liq.addEventListener('input',update);risk.addEventListener('input',update);update();
