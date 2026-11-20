(function(){
var P=window.P, KEY='txf-circuit-creas';
var $=function(s,r){return (r||document).querySelector(s)}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
function ic(n){return '<i class="ic" style="-webkit-mask-image:url(assets/icons/'+n+'.svg);mask-image:url(assets/icons/'+n+'.svg)"></i>'}
function hydrate(r){$$('[data-ic]',r).forEach(function(e){var u='url(assets/icons/'+e.dataset.ic+'.svg)';e.style.webkitMaskImage=u;e.style.maskImage=u})}
function esc(s){return String(s==null?'':s).replace(/« /g,'«\u00a0').replace(/ »/g,'\u00a0»').replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function D(s){var a=s.split('-');return new Date(+a[0],+a[1]-1,+a[2])}
function iso(d){return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}
var JOURS=['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'],JC=['dim.','lun.','mar.','mer.','jeu.','ven.','sam.'],MOIS=['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];
function dd(s){var d=D(s);return ('0'+d.getDate()).slice(-2)+'/'+('0'+(d.getMonth()+1)).slice(-2)}
function dlong(s){var d=D(s);return JOURS[d.getDay()]+' '+d.getDate()+' '+MOIS[d.getMonth()]}
function dcourt(s){var d=D(s);return JC[d.getDay()]+' '+d.getDate()}
var T=D(P.today);
function days(s){return Math.round((D(s)-T)/864e5)}
/* jours ouvrés écoulés depuis une date (lundi à vendredi) */
function wd(s){var d=D(s),n=0;while(d<T){d.setDate(d.getDate()+1);var k=d.getDay();if(k>0&&k<6)n++}return n}
function pl(n,a,b){return n+' '+(n>1?(b||a+'s'):a)}
function toast(m){var t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(function(){t.classList.remove('on')},2800)}
function lc(s){return s.charAt(0).toLowerCase()+s.slice(1)}

/* ---------- état, gardé dans le navigateur ---------- */
function fresh(){return {v:P.version,creas:P.creas.map(function(c){return JSON.parse(JSON.stringify(c))}),rel:{},mail:{}}}
var S;try{S=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){S=null}
if(!S||S.v!==P.version)S=fresh();
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function C(id){return S.creas.filter(function(c){return c.id===id})[0]}

var ET={};P.etapes.forEach(function(e,i){ET[e.k]=i});
function ver(c){return c.e==='livre'?'VFinale':'V'+c.v}
function attente(c){return c.e==='client'&&c.env?wd(c.env):0}
function aRelancer(c){return c.e==='client'&&c.env&&wd(c.env)>=2}
function imgOf(c){return 'assets/img/'+P.imgs[c.img%P.imgs.length]+'.jpg'}
function who(k,full){var p=P.personnes[k];if(!p)return '<span class="who"><span class="av cl">C</span>Client</span>';return '<span class="who"><span class="av" style="background:'+p.c+'">'+p.nom.split(' ').map(function(x){return x[0]}).join('')+'</span>'+(full?p.nom:p.court)+'</span>'}
function clTag(k){var c=P.clients[k];return '<span class="ctag" style="--c:'+c.c+'">'+c.nom+'</span>'}
function tyTag(k){var t=P.types[k];return '<span class="ttag">'+ic(t.ic)+t.nom+'</span>'}
function stTag(c){var e=P.etapes[ET[c.e]];var x=aRelancer(c)?' late':'';return '<span class="st st-'+c.e+x+'">'+(c.e==='client'?'Chez le client'+(c.env?', depuis '+pl(attente(c),'jour')+' ouvré'+(attente(c)>1?'s':''):''):e.nom)+'</span>'}

/* ---------- actions sur une création ---------- */
var NEXTL={brief:'Démarrer la création',prod:'Déposer la V',da:'Valider (directrice artistique)',cp:'Valider et envoyer au client',client:'Validée par le client'};
var NEXT={brief:'Démarrer',prod:'Déposer la V',da:'Valider',cp:'Envoyer au client',client:'Validée'};
function avancer(id){var c=C(id);if(!c||c.e==='livre')return;var i=ET[c.e],nx=P.etapes[i+1].k,msg;
  if(c.e==='brief'){msg='Création démarrée'}
  else if(c.e==='prod'){msg='V'+c.v+' déposée'}
  else if(c.e==='da'){msg='DA : validé'}
  else if(c.e==='cp'){msg='Chef de projet : validé, envoyé au client';c.env=P.today}
  else if(c.e==='client'){msg='Client : validé, VFinale livrée'}
  c.h.push([P.today,msg,c.e==='client'?'Client':(c.e==='da'?'MK':(c.e==='cp'?P.clients[c.cl].cp:c.r)),c.e==='brief'||c.e==='prod'?'':'ok']);
  c.e=nx;save();toast('« '+c.t+' » : '+lc(msg)+'.');renderAll();}
function retour(id){var c=C(id);if(!c||['da','cp','client'].indexOf(c.e)<0)return;
  var par=c.e==='da'?'DA':(c.e==='cp'?'Chef de projet':'Client');
  c.h.push([P.today,par+' : retour demandé, V'+(c.v+1)+' à produire',c.e==='da'?'MK':(c.e==='cp'?P.clients[c.cl].cp:'Client'),'r']);
  c.v++;c.e='prod';delete c.env;save();toast('Retour noté : « '+c.t+' » repart en création, V'+c.v+'.');renderAll();}
function moveTo(id,k){var c=C(id);if(!c||c.e===k)return;var a=ET[c.e],b=ET[k];
  if(b===a+1){avancer(id);return}
  if(b===ET.prod&&a>=ET.da&&a<=ET.client){retour(id);return}
  c.h.push([P.today,'Déplacée vers « '+P.etapes[b].nom+' »','']);c.e=k;if(k==='client'&&!c.env)c.env=P.today;save();toast('« '+c.t+' » : '+lc(P.etapes[b].nom)+'.');renderAll();}

/* ---------- navigation ---------- */
var VIEWS=['apercu','creas','circuit','relances','tournages','clickup'];
function show(v){if(VIEWS.indexOf(v)<0)v='apercu';$$('.view').forEach(function(e){e.classList.toggle('on',e.id==='v-'+v)});$$('#tabs .tb').forEach(function(a){a.classList.toggle('on',a.dataset.v===v)});if(location.hash!=='#'+v)history.replaceState(null,'','#'+v);var a=$('#tabs .tb.on');if(a){var tb=$('#tabs');tb.scrollLeft=a.offsetLeft-20}}
$$('#tabs .tb').forEach(function(a){a.href='#'+a.dataset.v;a.onclick=function(e){e.preventDefault();show(a.dataset.v);window.scrollTo(0,0)}});
document.addEventListener('click',function(e){var g=e.target.closest('[data-go]');if(g){e.preventDefault();show(g.dataset.go);window.scrollTo(0,0)}});
window.addEventListener('hashchange',function(){show(location.hash.slice(1))});

/* ---------- vue d'ensemble ---------- */
function relGroups(){var g={};S.creas.filter(aRelancer).forEach(function(c){(g[c.cl]=g[c.cl]||[]).push(c)});return Object.keys(g).map(function(k){var L=g[k].sort(function(a,b){return D(a.env)-D(b.env)});return {cl:k,L:L,max:attente(L[0])}}).sort(function(a,b){return b.max-a.max})}
function tourAlerts(){var A=[];
  P.tournages.forEach(function(t){if(!t.lieu)A.push({t:t,k:'lieu',m:'Lieu à trouver'});if(t.ok.auto===0)A.push({t:t,k:'auto',m:'Autorisation de tournage à obtenir'});if(t.ok.client===0)A.push({t:t,k:'client',m:'Script pas encore validé par le client'})});
  var pr={};conflits().forEach(function(c){var k=c.a.id+c.b.id;(pr[k]=pr[k]||{a:c.a,b:c.b,w:[]}).w.push(c.what.split(' (')[0])});
  Object.keys(pr).forEach(function(k){var c=pr[k];A.push({t:c.b,k:'mat',m:c.w.join(' et ')+(c.w.length>1?' déjà pris':' déjà pris')+' sur « '+c.a.t+' », de '+hh(c.a.h[0])+' à '+hh(c.a.h[1])})});return A}
function hh(s){var a=s.split(':');return (+a[0])+' h'+(a[1]==='00'?'':' '+a[1])}
function hm(s){var a=s.split(':');return +a[0]*60+ +a[1]}
function conflits(){var R=[],L=P.tournages;for(var i=0;i<L.length;i++)for(var j=i+1;j<L.length;j++){var a=L[i],b=L[j];if(a.d!==b.d)continue;if(hm(a.h[0])<hm(b.h[1])&&hm(b.h[0])<hm(a.h[1])){a.mat.forEach(function(m){if(b.mat.indexOf(m)>=0)R.push({a:a,b:b,m:m,what:P.materiel[m]})});a.eq.forEach(function(p){if(b.eq.indexOf(p)>=0)R.push({a:a,b:b,m:p,what:P.personnes[p].court})})}}return R}

function renderApercu(){
  var enc=S.creas.filter(function(c){return c.e!=='livre'}), G=relGroups(), nrel=S.creas.filter(aRelancer).length, A=tourAlerts(), tbl=[];A.forEach(function(a){if(tbl.indexOf(a.t.id)<0)tbl.push(a.t.id)});
  var interne=S.creas.filter(function(c){return c.e==='da'||c.e==='cp'}).length;
  var v2=S.creas.filter(function(c){return c.v>=2||c.h.some(function(x){return x[3]==='r'})}).length;
  $('#today').textContent='Situation au '+dlong(P.today)+' 2026';
  $('#nb-rel').textContent=G.length||'';$('#nb-rel').style.display=G.length?'':'none';
  $('#phrase').innerHTML='<b>'+enc.length+' créations</b> en cours pour '+Object.keys(P.clients).length+' clients. <b>'+pl(nrel,'création')+'</b> attend'+(nrel>1?'ent':'')+' la réponse du client depuis plus de deux jours : '+pl(G.length,'relance')+' prête'+(G.length>1?'s':'')+'. <b>'+pl(P.tournages.length,'tournage')+'</b> la semaine prochaine, dont '+tbl.length+' à débloquer.';
  $('#float1').innerHTML='<p class="fl">Relances prêtes</p><p class="fv">'+G.length+'<small> client'+(G.length>1?'s':'')+'</small></p>';
  $('#float2').innerHTML='<p class="fl">Prochain tournage</p><p class="fv sm">'+dcourt(P.tournages[0].d)+', '+hh(P.tournages[0].h[0])+'</p><p class="fs">'+P.clients[P.tournages[0].cl].nom+'</p>';
  var K=[
    ['images','Créations en cours',enc.length,'',S.creas.length-enc.length+' déjà livrées ce mois-ci','creas',''],
    ['badge-check','À valider en interne',interne,'',S.creas.filter(function(c){return c.e==='da'}).length+' chez la DA, '+S.creas.filter(function(c){return c.e==='cp'}).length+' chez le chef de projet','circuit',''],
    ['hourglass','En attente du client',nrel,'',pl(G.length,'relance')+' prête'+(G.length>1?'s':'')+', plus longue attente '+(G[0]?G[0].max:0)+' jours','relances',nrel?'red':''],
    ['clapperboard','Tournages de la semaine',P.tournages.length,'',tbl.length+' à débloquer avant le tournage','tournages',tbl.length?'amb':'']
  ];
  $('#kpis').innerHTML=K.map(function(k){return '<a class="kpi '+k[6]+'" href="#'+k[5]+'" data-go="'+k[5]+'"><span class="kl">'+ic(k[0])+k[1]+'</span><span class="kv">'+k[2]+'</span><span class="kd">'+k[4]+'</span>'+ic('chevron-right')+'</a>'}).join('');
  /* flux */
  var n=S.creas.length;
  $('#flow').innerHTML=P.etapes.map(function(e,i){var L=S.creas.filter(function(c){return c.e===e.k}),late=L.filter(aRelancer).length;
    return '<div class="fs-i'+(late?' late':'')+'"><span class="fn">'+(i+1)+'</span><p class="fk">'+e.nom+'</p><p class="fc">'+L.length+'</p><div class="fbar"><i style="width:'+Math.round(L.length/n*100)+'%"></i></div><p class="fd">'+(late?pl(late,'à relancer','à relancer'):(L.length?L.slice(0,2).map(function(c){return P.clients[c.cl].nom.split(' ')[0]}).join(', ')+(L.length>2?'…':''):'Aucune'))+'</p></div>'}).join('');
  /* à traiter */
  var todo=[];
  G.forEach(function(g){todo.push({lv:'r',ic:'send',t:'Relancer '+P.clients[g.cl].nom,s:pl(g.L.length,'création')+' sans réponse, la plus ancienne depuis '+g.max+' jours ouvrés',go:'relances'})});
  A.forEach(function(a){todo.push({lv:a.k==='mat'?'r':'a',ic:a.k==='mat'?'package':'map-pin',t:a.t.t+', '+dcourt(a.t.d),s:a.m,go:'tournages'})});
  S.creas.filter(function(c){return c.e==='da'}).forEach(function(c){todo.push({lv:'n',ic:'eye',t:'Avis DA : '+c.t,s:P.clients[c.cl].nom+', '+P.types[c.ty].nom.toLowerCase()+' '+ver(c),id:c.id})});
  $('#todo').innerHTML=todo.slice(0,8).map(function(x){return '<button class="td '+x.lv+'" '+(x.go?'data-go="'+x.go+'"':'data-open="'+x.id+'"')+'><span class="bx">'+ic(x.ic)+'</span><span><b>'+esc(x.t)+'</b><small>'+esc(x.s)+'</small></span>'+ic('chevron-right')+'</button>'}).join('');
  /* matrice client x format */
  var tys=Object.keys(P.types);
  $('#mx').innerHTML='<thead><tr><th></th>'+tys.map(function(t){return '<th>'+ic(P.types[t].ic)+'<span>'+P.types[t].nom+'</span></th>'}).join('')+'<th>Total</th></tr></thead><tbody>'+Object.keys(P.clients).map(function(k){var tot=0;
    return '<tr><th><span class="dot" style="background:'+P.clients[k].c+'"></span>'+P.clients[k].nom+'</th>'+tys.map(function(t){var L=S.creas.filter(function(c){return c.cl===k&&c.ty===t&&c.e!=='livre'}),r=L.filter(aRelancer).length;tot+=L.length;return '<td><button class="mc'+(L.length?'':' z')+(r?' r':'')+'" data-fcl="'+k+'" data-fty="'+t+'">'+(L.length||'')+'</button></td>'}).join('')+'<td class="tt">'+tot+'</td></tr>'}).join('')+'</tbody>';
  $$('#mx [data-fcl]').forEach(function(b){b.onclick=function(){F.cl=b.dataset.fcl;F.ty=b.dataset.fty;F.liv=false;show('creas');renderCreas();window.scrollTo(0,0)}});
  $('#cu-mini').innerHTML=cuBlock(true);
}

/* ---------- ClickUp ---------- */
function cuBlock(mini){
  var from=[['Le nom de la tâche et son numéro','Une création égale une tâche ClickUp, même numéro'],['Le client et la campagne','La liste et le dossier ClickUp'],['Le responsable et l\'échéance','Tels que saisis par le chef de projet'],['Le statut général','À faire, en cours, terminé']];
  var add=[['Les versions V1, V2, VFinale','Chaque fichier déposé, daté, avec son aperçu'],['Les avis DA, chef de projet, client','Qui a validé, qui a demandé un retour, et pourquoi'],['La relance du client','Le message prêt dès deux jours ouvrés sans réponse'],['Les tournages','Équipe, lieu, matériel, conflits repérés seuls']];
  var back=['Le statut de la tâche avance avec le circuit','Un commentaire sur la tâche à chaque avis («\u00a0V2 validée par la DA\u00a0»)','Rien n\'est créé en double : pas de nouvelle tâche, pas de nouvelle liste'];
  function li(L){return L.map(function(x){return '<li>'+ic('check')+'<span><b>'+x[0]+'</b>'+(mini?'':'<small>'+x[1]+'</small>')+'</span></li>'}).join('')}
  return '<div class="cu-h"><span class="cu-ic">'+ic('arrow-right-left')+'</span><div><h2>Ce qui vient de ClickUp, ce qu\'on ajoute</h2><p>ClickUp reste la source des tâches. Rien n\'est ressaisi deux fois.</p></div>'+(mini?'<a class="btn sm" href="#clickup" data-go="clickup">Le détail'+ic('arrow-right')+'</a>':'')+'</div>'
   +'<div class="cu-cols"><div class="cu-c from"><p class="cu-t">'+ic('database')+'Vient de ClickUp<span>lu, jamais recopié</span></p><ul>'+li(from)+'</ul></div>'
   +'<div class="cu-arrow">'+ic('arrow-right')+'</div>'
   +'<div class="cu-c add"><p class="cu-t">'+ic('sparkles')+'Ce qu\'on ajoute<span>propre à la création</span></p><ul>'+li(add)+'</ul></div></div>'
   +(mini?'':'<div class="cu-back"><p class="cu-t">'+ic('undo-2')+'Ce qui retourne dans ClickUp</p><ul>'+back.map(function(x){return '<li>'+ic('check')+'<span>'+x+'</span></li>'}).join('')+'</ul></div>');
}
function renderClickup(){
  var ex=C('C06');
  $('#cu-full').innerHTML='<section class="cu-box">'+cuBlock(false)+'</section>'
   +'<section class="block"><div class="bh"><h2>Une même création, vue des deux côtés</h2><p class="hint">Exemple : '+esc(ex.t)+'</p></div>'
   +'<div class="two"><div class="side cu"><p class="sd-t">'+ic('database')+'Dans ClickUp</p><div class="cuc"><p class="cun">'+ex.cu+'</p><p class="cut">'+esc(ex.t)+'</p><dl><dt>Liste</dt><dd>'+P.clients[ex.cl].nom+' / '+esc(ex.camp)+'</dd><dt>Responsable</dt><dd>'+P.personnes[ex.r].nom+'</dd><dt>Échéance</dt><dd>'+dlong(ex.du)+'</dd><dt>Statut</dt><dd><span class="st st-prod">En cours</span></dd></dl></div></div>'
   +'<div class="side tx"><p class="sd-t">'+ic('sparkles')+'Dans le circuit TX Factory</p><div class="txc"><div class="vrow">'+vchips(ex)+'</div><ol class="hist">'+hist(ex,3)+'</ol><p class="tiny">Plus la relance du client et le tournage du '+dlong('2026-11-27')+' (packshots).</p></div></div></div></section>'
   +'<p class="hint c">Branchement : lecture des listes ClickUp de chaque client, mise à jour du statut et des commentaires. À relier à votre espace ClickUp.</p>';
}
function vchips(c){var n=c.e==='livre'?c.v:c.v,o='';for(var i=1;i<=n;i++){var cur=i===c.v&&c.e!=='livre';o+='<span class="vc'+(cur?' cur':' old')+'">V'+i+'</span>'}if(c.e==='livre')o+='<span class="vc fin">VFinale</span>';return o}
function hist(c,last){var H=c.h.slice(last?-last:0).reverse();return H.map(function(x){return '<li class="'+(x[3]||'')+'"><span class="hd">'+dd(x[0])+'</span><span class="hm">'+esc(x[1])+'</span>'+(x[2]&&x[2]!=='Client'&&P.personnes[x[2]]?'<span class="hw">'+P.personnes[x[2]].court+'</span>':(x[2]==='Client'?'<span class="hw">Client</span>':''))+'</li>'}).join('')}

/* ---------- galerie ---------- */
var F={cl:'all',ty:'all',liv:false};
function chipsHtml(sel,list,cur,attr){return list.map(function(o){return '<button class="chip'+(cur===o[0]?' on':'')+'" '+attr+'="'+o[0]+'">'+(o[2]?'<span class="dot" style="background:'+o[2]+'"></span>':'')+o[1]+'</button>'}).join('')}
function renderCreas(){
  $('#f-cl').innerHTML=chipsHtml('#f-cl',[['all','Tous les clients']].concat(Object.keys(P.clients).map(function(k){return [k,P.clients[k].nom,P.clients[k].c]})),F.cl,'data-c');
  $('#f-ty').innerHTML=chipsHtml('#f-ty',[['all','Tous les formats']].concat(Object.keys(P.types).map(function(k){return [k,P.types[k].nom+'s']})),F.ty,'data-t');
  $('#f-liv').checked=F.liv;
  $$('#f-cl [data-c]').forEach(function(b){b.onclick=function(){F.cl=b.dataset.c;renderCreas()}});
  $$('#f-ty [data-t]').forEach(function(b){b.onclick=function(){F.ty=b.dataset.t;renderCreas()}});
  var L=S.creas.filter(function(c){return (F.cl==='all'||c.cl===F.cl)&&(F.ty==='all'||c.ty===F.ty)&&(F.liv||c.e!=='livre')});
  var groups=Object.keys(P.clients).filter(function(k){return L.some(function(c){return c.cl===k})});
  $('#gal').innerHTML=groups.length?groups.map(function(k){var G=L.filter(function(c){return c.cl===k}).sort(function(a,b){return ET[a.e]-ET[b.e]||D(a.du)-D(b.du)});
    return '<div class="gg"><div class="gh"><span class="dot" style="background:'+P.clients[k].c+'"></span><h2>'+P.clients[k].nom+'</h2><span class="gn">'+pl(G.length,'création')+'</span></div><div class="cards">'+G.map(card).join('')+'</div></div>'}).join('')
   :'<p class="empty">Aucune création pour ce choix.</p>';
  bindOpen($('#gal'));hydrate($('#gal'));
}
function card(c){var t=P.types[c.ty],n=days(c.du);
  return '<button class="cr" data-open="'+c.id+'"><div class="thumb r-'+c.ty+'"><img loading="lazy" src="'+imgOf(c)+'" alt="" style="object-position:'+c.pos+'"><span class="ver'+(c.e==='livre'?' fin':'')+'">'+ver(c)+'</span><span class="fmt">'+ic(t.ic)+t.nom+'</span></div>'
   +'<div class="cb"><p class="ct">'+esc(c.t)+'</p><p class="cc">'+esc(c.camp)+'</p>'+stTag(c)+'<p class="cm">'+who(c.r)+'<span class="due'+(c.e!=='livre'&&n<=2?' soon':'')+'">'+(c.e==='livre'?'Livrée':(n<0?'Prévue le '+dd(c.du)+', dépassée':(n===0?'À livrer aujourd\'hui':'À livrer le '+dd(c.du))))+'</span></p></div></button>'}
$('#f-liv').onchange=function(){F.liv=this.checked;renderCreas()};

/* ---------- circuit (kanban) ---------- */
var KC='all';
function renderCircuit(){
  $('#k-cl').innerHTML=chipsHtml('#k-cl',[['all','Tous']].concat(Object.keys(P.clients).map(function(k){return [k,P.clients[k].nom.split(' ')[0],P.clients[k].c]})),KC,'data-k');
  $$('#k-cl [data-k]').forEach(function(b){b.onclick=function(){KC=b.dataset.k;renderCircuit();hydrate($('#v-circuit'))}});
  $('#kb').innerHTML=P.etapes.map(function(e){var L=S.creas.filter(function(c){return c.e===e.k&&(KC==='all'||c.cl===KC)}).sort(function(a,b){return attente(b)-attente(a)||D(a.du)-D(b.du)});
    return '<div class="kcol k-'+e.k+'" data-s="'+e.k+'"><div class="kh"><h3>'+e.nom+'</h3><span class="kn">'+L.length+'</span></div><div class="kcards">'+L.map(kcard).join('')+(L.length?'':'<p class="empty sm">Rien ici</p>')+'</div></div>'}).join('');
  $$('#kb [data-ok]').forEach(function(b){b.onclick=function(e){e.stopPropagation();avancer(b.dataset.ok)}});
  $$('#kb [data-ko]').forEach(function(b){b.onclick=function(e){e.stopPropagation();retour(b.dataset.ko)}});
  $$('#kb .grip').forEach(function(g){g.addEventListener('pointerdown',startDrag)});
  bindOpen($('#kb'));
}
function kcard(c){var lab=NEXT[c.e];if(c.e==='prod')lab+=c.v;
  return '<div class="kc'+(aRelancer(c)?' late':'')+'" data-id="'+c.id+'"><div class="kt"><img src="'+imgOf(c)+'" alt="" style="object-position:'+c.pos+'"><span class="grip" title="Glisser" aria-label="Glisser">'+ic('grip-vertical')+'</span><span class="ver'+(c.e==='livre'?' fin':'')+'">'+ver(c)+'</span></div>'
   +'<div class="kb2"><p class="kmeta">'+clTag(c.cl)+'</p><p class="ktt" data-open="'+c.id+'">'+esc(c.t)+'</p><p class="kmeta2">'+tyTag(c.ty)+(c.e==='client'?'<span class="wt'+(aRelancer(c)?' r':'')+'">'+ic('hourglass')+attente(c)+' j</span>':'<span class="wt">'+ic('calendar')+dd(c.du)+'</span>')+'</p>'
   +(c.e!=='livre'?'<div class="kact"><button class="btn xs pri" data-ok="'+c.id+'">'+ic('check')+lab+'</button>'+(['da','cp','client'].indexOf(c.e)>=0?'<button class="btn xs" data-ko="'+c.id+'">'+ic('undo-2')+'Retour</button>':'')+'</div>':'')+'</div></div>'}
var drag=null;
function startDrag(e){if(e.button>0)return;e.preventDefault();var card=e.currentTarget.closest('.kc'),r=card.getBoundingClientRect(),cl=card.cloneNode(true);cl.classList.add('drag-clone');cl.style.width=r.width+'px';cl.style.left=r.left+'px';cl.style.top=r.top+'px';document.body.appendChild(cl);card.classList.add('ghost');
  drag={id:card.dataset.id,card:card,cl:cl,dx:e.clientX-r.left,dy:e.clientY-r.top,over:null};document.addEventListener('pointermove',onDrag);document.addEventListener('pointerup',endDrag);document.addEventListener('pointercancel',endDrag)}
function onDrag(e){if(!drag)return;drag.cl.style.left=(e.clientX-drag.dx)+'px';drag.cl.style.top=(e.clientY-drag.dy)+'px';drag.cl.style.display='none';var el=document.elementFromPoint(e.clientX,e.clientY);drag.cl.style.display='';var col=el&&el.closest?el.closest('.kcol'):null;
  if(drag.over&&drag.over!==col)drag.over.classList.remove('over');if(col){col.classList.add('over');drag.over=col}else drag.over=null;
  var w=$('.kb-w');if(w){var r=w.getBoundingClientRect();if(e.clientX>r.right-50)w.scrollLeft+=14;else if(e.clientX<r.left+50)w.scrollLeft-=14}
  if(e.clientY<70)window.scrollBy(0,-12);else if(e.clientY>window.innerHeight-70)window.scrollBy(0,12)}
function endDrag(){if(!drag)return;document.removeEventListener('pointermove',onDrag);document.removeEventListener('pointerup',endDrag);document.removeEventListener('pointercancel',endDrag);var d=drag;drag=null;d.cl.remove();d.card.classList.remove('ghost');if(d.over){d.over.classList.remove('over');moveTo(d.id,d.over.dataset.s)}}

/* ---------- relances ---------- */
var EMRX=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function relText(g){var cl=P.clients[g.cl],cp=P.personnes[cl.cp];
  var obj=cl.nom+' : '+(g.L.length>1?g.L.length+' créations attendent votre validation':'une création attend votre validation');
  var body='Bonjour,\n\nNous vous avons transmis '+(g.L.length>1?'les créations suivantes':'la création suivante')+', qui attend'+(g.L.length>1?'ent':'')+' encore votre retour :\n\n'
   +g.L.map(function(c){return '- '+c.t+' ('+P.types[c.ty].nom.toLowerCase()+', '+ver(c)+'), envoyée le '+dd(c.env)+', diffusion prévue le '+dd(c.du)}).join('\n')
   +'\n\nPour tenir les dates de diffusion, pourriez-vous nous faire part de votre validation ou de vos remarques d\'ici le '+dlong(nextWd(2))+' ? Un simple « validé » par retour de message suffit. Si un point vous fait hésiter, nous pouvons en parler par téléphone.\n\nMerci et belle journée,\n\n'+cp.nom+'\n'+cp.role+', Totem Experience';
  return {obj:obj,body:body}}
function nextWd(n){var d=new Date(T);while(n>0){d.setDate(d.getDate()+1);var k=d.getDay();if(k>0&&k<6)n--}return iso(d)}
function renderRelances(){
  var G=relGroups(),tot=S.creas.filter(aRelancer).length,att=S.creas.filter(function(c){return c.e==='client'}).length;
  $('#rsum').innerHTML='<div class="rs r"><b>'+G.length+'</b><span>relance'+(G.length>1?'s':'')+' prête'+(G.length>1?'s':'')+'</span></div><div class="rs"><b>'+tot+'</b><span>créations sans réponse depuis plus de 2 jours ouvrés</span></div><div class="rs"><b>'+att+'</b><span>créations chez le client en tout</span></div>';
  $('#rel').innerHTML=G.length?G.map(function(g){var cl=P.clients[g.cl],m=relText(g),log=S.rel[g.cl]||[];
    return '<section class="rc" data-cl="'+g.cl+'"><div class="rc-h"><span class="dot lg" style="background:'+cl.c+'"></span><div><h2>'+cl.nom+'</h2><p>'+pl(g.L.length,'création')+' sans réponse, la plus ancienne depuis <b>'+g.max+' jours ouvrés</b>. Suivi : '+P.personnes[cl.cp].nom+'.</p></div><span class="lg-st'+(log.length?' ok':'')+'">'+(log.length?'Relancé le '+log.map(dd).join(', '):'Pas encore relancé')+'</span></div>'
     +'<div class="rc-b"><div class="rc-l">'+g.L.map(function(c){return '<div class="rl"><img src="'+imgOf(c)+'" alt="" style="object-position:'+c.pos+'"><div><p class="rt" data-open="'+c.id+'">'+esc(c.t)+'</p><p class="rd">'+P.types[c.ty].nom+' '+ver(c)+', envoyée le '+dd(c.env)+' <span class="wt r">'+attente(c)+' j</span></p></div><button class="btn xs" data-valc="'+c.id+'">'+ic('check')+'Validée</button></div>'}).join('')+'</div>'
     +'<div class="rc-m"><label>Objet</label><p class="obj">'+esc(m.obj)+'</p><label for="tx-'+g.cl+'">Message prêt</label><textarea id="tx-'+g.cl+'" rows="14">'+esc(m.body)+'</textarea>'
     +'<div class="rc-a"><input class="in" type="email" id="em-'+g.cl+'" placeholder="E-mail du contact" value="'+esc(S.mail[g.cl]||'')+'" aria-label="Adresse e-mail du contact"><button class="btn" data-copy="'+g.cl+'">'+ic('copy')+'Copier</button><button class="btn pri" data-mail="'+g.cl+'">'+ic('mail')+'Ouvrir dans ma messagerie</button></div></div></div></section>'}).join('')
   :'<p class="empty">Aucun client à relancer. Toutes les créations envoyées ont reçu une réponse dans les deux jours.</p>';
  $$('#rel [data-valc]').forEach(function(b){b.onclick=function(){avancer(b.dataset.valc)}});
  $$('#rel input[type=email]').forEach(function(i){i.oninput=function(){S.mail[i.id.slice(3)]=i.value.trim();i.classList.toggle('bad',!!i.value&&!EMRX.test(i.value));save()}});
  $$('#rel [data-copy]').forEach(function(b){b.onclick=function(){var k=b.dataset.copy,txt=$('#tx-'+k).value,o=relText(relGroups().filter(function(g){return g.cl===k})[0]).obj;var full='Objet : '+o+'\n\n'+txt;
    var done=function(){logRel(k);toast('Message copié. Collez-le dans votre messagerie ou WhatsApp.')};
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(full).then(done,function(){fallback(full);done()});else{fallback(full);done()}}});
  $$('#rel [data-mail]').forEach(function(b){b.onclick=function(){var k=b.dataset.mail,em=S.mail[k]||'';if(!EMRX.test(em)){var i=$('#em-'+k);i.focus();i.classList.add('flash');setTimeout(function(){i.classList.remove('flash')},1300);toast('Saisissez d\'abord l\'adresse e-mail du contact.');return}
    var g=relGroups().filter(function(x){return x.cl===k})[0],o=relText(g).obj,txt=$('#tx-'+k).value;var href='mailto:'+encodeURIComponent(em)+'?subject='+encodeURIComponent(o)+'&body='+encodeURIComponent(txt);window.__lastMailto=href;
    var a=document.createElement('a');a.href=href;a.style.display='none';document.body.appendChild(a);try{a.click()}catch(e){}setTimeout(function(){a.remove()},400);logRel(k);toast('Brouillon ouvert dans votre messagerie. Rien ne part sans vous.')}});
  bindOpen($('#rel'));
}
function fallback(t){var x=document.createElement('textarea');x.value=t;document.body.appendChild(x);x.select();try{document.execCommand('copy')}catch(e){}x.remove()}
function logRel(k){S.rel[k]=S.rel[k]||[];if(S.rel[k].indexOf(P.today)<0)S.rel[k].push(P.today);save();setTimeout(function(){renderRelances();hydrate($('#v-relances'))},50)}

/* ---------- tournages ---------- */
function renderTournages(){
  var A=tourAlerts(),CF=conflits();
  $('#talert').innerHTML=A.length?'<p class="ta-t">'+ic('triangle-alert')+pl(A.length,'point')+' à régler avant de tourner</p><ul>'+A.map(function(a){return '<li class="'+(a.k==='mat'?'r':'a')+'"><b>'+dcourt(a.t.d)+', '+esc(a.t.t)+'</b><span>'+esc(a.m)+'</span></li>'}).join('')+'</ul>':'<p class="ta-t ok">'+ic('circle-check')+'Tout est prêt pour la semaine.</p>';
  var offd=P.semaine.filter(function(d){return !P.tournages.some(function(t){return t.d===d})});
  $('#week').innerHTML=P.semaine.filter(function(d){return offd.indexOf(d)<0}).map(function(d){var L=P.tournages.filter(function(t){return t.d===d}).sort(function(a,b){return hm(a.h[0])-hm(b.h[0])});
    return '<div class="day'+(L.length?'':' off')+'"><p class="dh"><b>'+JOURS[D(d).getDay()]+'</b><span>'+D(d).getDate()+' nov.</span></p>'+(L.length?L.map(function(t){var al=A.filter(function(a){return a.t.id===t.id}),cl=P.clients[t.cl],c=C(t.crea);
      return '<div class="sh'+(al.some(function(a){return a.k==='mat'})?' r':(al.length?' a':''))+'"><div class="sh-i"><img src="'+imgOf(c)+'" alt="" style="object-position:'+c.pos+'"><span class="hr">'+hh(t.h[0])+' à '+hh(t.h[1])+'</span></div><div class="sh-b">'+clTag(t.cl)+'<p class="sht">'+esc(t.t)+'</p>'
        +'<p class="shl">'+ic('map-pin')+'<span>'+(t.lieu?esc(t.lieu):'<em>Lieu à trouver</em>')+'</span></p><p class="shl">'+ic('users')+'<span>'+t.eq.map(function(p){return P.personnes[p].court}).join(', ')+'</span></p><p class="shl">'+ic('camera')+'<span>'+t.mat.map(function(m){var bad=CF.some(function(x){return x.m===m&&(x.a.id===t.id||x.b.id===t.id)});return bad?'<b class="bad">'+P.materiel[m].split(' (')[0]+'</b>':P.materiel[m].split(' (')[0]}).join(', ')+'</span></p>'
        +'<div class="chk">'+[['equipe','Équipe'],['lieu','Lieu'],['auto','Autorisation'],['client','Script validé']].filter(function(k){return t.ok[k[0]]!==null&&t.ok[k[0]]!==undefined}).map(function(k){var v=k[0]==='lieu'?(t.lieu?1:0):t.ok[k[0]];return '<span class="'+(v?'y':'n')+'">'+ic(v?'check':'x')+k[1]+'</span>'}).join('')+'</div></div></div>'}).join(''):'<p class="none">Pas de tournage</p>')+'</div>'}).join('')+(offd.length?'<p class="offd">'+offd.map(function(d){return JOURS[D(d).getDay()]+' '+D(d).getDate()}).join(', ').replace(/^./,function(x){return x.toUpperCase()})+' : pas de tournage.</p>':'');
  var mats=Object.keys(P.materiel);
  $('#mat').innerHTML='<thead><tr><th>Matériel</th>'+P.semaine.map(function(d){return '<th>'+dcourt(d)+'</th>'}).join('')+'</tr></thead><tbody>'+mats.map(function(m){return '<tr><th>'+P.materiel[m]+'</th>'+P.semaine.map(function(d){var L=P.tournages.filter(function(t){return t.d===d&&t.mat.indexOf(m)>=0}),bad=CF.some(function(x){return x.m===m&&x.a.d===d});return '<td>'+(L.length?'<span class="mb'+(bad?' bad':'')+'" title="'+esc(L.map(function(t){return hh(t.h[0])+' à '+hh(t.h[1])+', '+t.t}).join(' ; '))+'">'+L.map(function(t){return P.clients[t.cl].nom.split(' ')[0]}).join(' + ')+'</span>':'')+'</td>'}).join('')+'</tr>'}).join('')+'</tbody>';
}

/* ---------- fiche d'une création ---------- */
function bindOpen(r){$$('[data-open]',r).forEach(function(b){b.onclick=function(e){if(e.target.closest('[data-ok],[data-ko],[data-valc],.grip')&&!b.matches('[data-ok]'))return;e.stopPropagation();openC(b.dataset.open)}})}
function openC(id){var c=C(id);if(!c)return;var t=P.types[c.ty],cl=P.clients[c.cl],i=ET[c.e];
  var steps=P.etapes.map(function(e,j){return '<li class="'+(j<i?'done':(j===i?'cur':''))+'"><span></span>'+e.court+'</li>'}).join('');
  $('#dr-c').innerHTML='<div class="dr-img r-'+c.ty+'"><img src="'+imgOf(c)+'" alt="" style="object-position:'+c.pos+'"><span class="ver'+(c.e==='livre'?' fin':'')+'">'+ver(c)+'</span></div>'
   +'<p class="kmeta">'+clTag(c.cl)+tyTag(c.ty)+'</p><h2>'+esc(c.t)+'</h2><p class="dr-s">'+esc(c.camp)+'. '+(c.e==='livre'?'Livrée.':'À livrer le '+dlong(c.du)+'.')+'</p>'
   +'<ol class="steps">'+steps+'</ol>'
   +'<div class="dr-g"><div><p class="lbl">Versions</p><div class="vrow">'+vchips(c)+'</div></div><div><p class="lbl">Réalisation</p>'+who(c.r,true)+'</div><div><p class="lbl">Chef de projet</p>'+who(cl.cp,true)+'</div><div><p class="lbl">ClickUp</p><span class="cuid">'+ic('link')+'Tâche '+c.cu+'</span></div></div>'
   +(c.e!=='livre'?'<div class="kact lg"><button class="btn pri" data-dok="'+c.id+'">'+ic('check')+NEXTL[c.e]+(c.e==='prod'?c.v:'')+'</button>'+(['da','cp','client'].indexOf(c.e)>=0?'<button class="btn" data-dko="'+c.id+'">'+ic('undo-2')+'Demander un retour</button>':'')+'</div>':'')
   +'<p class="lbl">Historique</p><ol class="hist">'+hist(c)+'</ol>';
  $('[data-dok]',$('#dr-c'))&&($('[data-dok]',$('#dr-c')).onclick=function(){avancer(id);openC(id)});
  $('[data-dko]',$('#dr-c'))&&($('[data-dko]',$('#dr-c')).onclick=function(){retour(id);openC(id)});
  hydrate($('#drawer'));$('#drawer').classList.add('on');$('#drawer').setAttribute('aria-hidden','false');document.body.classList.add('lock')}
function closeC(){$('#drawer').classList.remove('on');$('#drawer').setAttribute('aria-hidden','true');document.body.classList.remove('lock')}
$$('#drawer [data-close]').forEach(function(b){b.onclick=closeC});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeC()});

$$('[data-reset]').forEach(function(b){b.onclick=function(e){e.preventDefault();if(!window.confirm('Revenir à l\'exemple de départ ? Vos changements dans ce navigateur seront effacés.'))return;localStorage.removeItem(KEY);S=fresh();save();renderAll();toast('Exemple de départ rétabli.')}});

function renderAll(){renderApercu();renderCreas();renderCircuit();renderRelances();renderTournages();renderClickup();bindOpen(document.getElementById('v-apercu'));hydrate()}
renderAll();
show(location.hash.slice(1)||'apercu');
})();
