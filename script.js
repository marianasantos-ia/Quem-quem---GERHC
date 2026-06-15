
let dados=[];
fetch('colaboradores.json')
.then(r=>r.json())
.then(d=>{
dados=d;
carregar();
const areas=[...new Set(d.map(x=>x.area))];
const filtro=document.getElementById('filtroArea');
areas.forEach(a=>{
const op=document.createElement('option');
op.value=a; op.textContent=a;
filtro.appendChild(op);
});
});

function carregar(){
const busca=(document.getElementById('busca').value||'').toLowerCase();
const areaFiltro=document.getElementById('filtroArea').value;
const areasDiv=document.getElementById('areas');
areasDiv.innerHTML='';

const agrupado={};
dados.filter(p=>
p.nome.toLowerCase().includes(busca) &&
(!areaFiltro || p.area===areaFiltro)
).forEach(p=>{
if(!agrupado[p.area]) agrupado[p.area]=[];
agrupado[p.area].push(p);
});

Object.keys(agrupado).forEach(area=>{
const card=document.createElement('div');
card.className='card';
card.innerHTML=`<h3>${area} (${agrupado[area].length})</h3>`;
agrupado[area].forEach(p=>{
const div=document.createElement('div');
div.className='pessoa';
div.textContent=`${p.nome} - ${p.cargo}`;
div.onclick=()=>abrir(p);
card.appendChild(div);
});
areasDiv.appendChild(card);
});
}

function abrir(p){
document.getElementById('nome').textContent=p.nome;
document.getElementById('cargo').textContent=p.cargo;
document.getElementById('area').textContent=p.area;
document.getElementById('modal').style.display='block';
}

document.addEventListener('input',e=>{
if(e.target.id==='busca'||e.target.id==='filtroArea') carregar();
});

document.querySelector('.fechar').onclick=()=>{
document.getElementById('modal').style.display='none';
};
