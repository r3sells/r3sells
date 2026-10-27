const grid=document.getElementById('products');
const dialog=document.getElementById('product-dialog');
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sms=name=>'sms:+19432451374?body='+encodeURIComponent(`Hi R3 SELLS! I'm interested in ${name}. Is it available and what's the price?`);
function render(filter='All'){
 grid.innerHTML='';
 PRODUCTS.filter(p=>filter==='All'||p.category===filter).forEach(p=>{
 const card=document.createElement('article');card.className='product';
 card.innerHTML=`<img src="${safe(p.image)}" alt="${safe(p.name)}" loading="lazy"><div class="product-body"><div class="tag">${safe(p.category.toUpperCase())} · DM FOR PRICE</div><h3>${safe(p.name)}</h3><p>${safe(p.details)}</p><button type="button">VIEW PRODUCT ↗</button></div>`;
 card.querySelector('button').addEventListener('click',()=>showProduct(p));grid.append(card);
 });
 if(!grid.children.length)grid.innerHTML='<p>No products in this category yet. Check back soon.</p>';
 document.querySelectorAll('[data-filter]').forEach(b=>b.classList.toggle('active',b.dataset.filter===filter));
}
function showProduct(p){
 const body=document.getElementById('dialog-content');
 body.innerHTML=`<img src="${safe(p.image)}" alt="${safe(p.name)}"><div class="eyebrow">${safe(p.category)} · DM FOR PRICE</div><h2>${safe(p.name)}</h2><p>${safe(p.details)}</p><p>Message us to confirm availability and pricing.</p><div class="dialog-actions"><a class="btn light" target="_blank" rel="noopener" href="https://www.instagram.com/r3_sells/">ORDER ON INSTAGRAM ↗</a><a class="btn" href="${sms(p.name)}">ORDER BY TEXT ↗</a></div>`;
 dialog.showModal();
}
document.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>render(b.dataset.filter)));
document.querySelectorAll('[data-go]').forEach(a=>a.addEventListener('click',()=>render(a.dataset.go)));
const menu=document.querySelector('.menu-toggle'),nav=document.getElementById('nav');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
document.getElementById('year').textContent=new Date().getFullYear();render();
