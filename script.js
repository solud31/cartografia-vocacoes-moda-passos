const categories = ['Artesãos', 'Designers de moda', 'Costureiros', 'Ateliês'];
const shapes = {
  needle: '<path d="M66 36l62 78m-69-70l62 78m-45-89l-7 7m65 63l-7 7" stroke="#765344" stroke-width="2"/><path d="M104 74c-22-7-43 12-30 30s33 7 30-8" fill="none" stroke="#f5f0e6" stroke-width="3"/>',
  form: '<path d="M83 36c-17 0-29 14-29 34 0 28 21 59 42 61 21-2 42-33 42-61 0-20-12-34-29-34-6 0-10 3-13 8-3-5-7-8-13-8z" fill="#e5c9a5" stroke="#725d4c" stroke-width="2"/><path d="M75 68c18 8 35 8 52 0m-46 16c14 6 27 6 40 0" fill="none" stroke="#b75f42" stroke-width="2"/>',
  thread: '<path d="M96 32c23 0 41 17 41 40s-18 52-41 52-41-29-41-52 18-40 41-40z" fill="none" stroke="#f5f0e6" stroke-width="9"/><path d="M96 32c23 0 41 17 41 40s-18 52-41 52-41-29-41-52 18-40 41-40z" fill="none" stroke="#6b6849" stroke-width="2"/><path d="M61 54l70 47m-78-26l61 43m1-81l-64 53m88-34l-47 49" stroke="#f5f0e6" stroke-width="2"/>',
  reuse: '<path d="M96 36l40 23v45l-40 23-40-23V59z" fill="#e7d3b7" stroke="#665c43" stroke-width="2"/><path d="M96 36v46m40-23L96 82 56 59m40 23v45" fill="none" stroke="#b75f42" stroke-width="2"/>'
};
const profiles = categories.flatMap((category, group) => Array.from({ length: 3 }, (_, i) => ({
  id: `${group}-${i + 1}`, category, number: group * 3 + i + 1,
  color: ['#a7a183', '#c68b69', '#d4c3a3', '#bd9b75'][group]
})));
const grid = document.querySelector('#agent-grid');
const searchInput = document.querySelector('#search');
const resultCount = document.querySelector('#result-count');
let activeCategory = 'Todas';
function renderCards() {
  const query = searchInput.value.trim().toLocaleLowerCase('pt-BR');
  const visible = profiles.filter(item => (activeCategory === 'Todas' || item.category === activeCategory) && `${item.category} perfil ${item.number}`.toLocaleLowerCase('pt-BR').includes(query));
  resultCount.textContent = `${visible.length} de ${profiles.length} espaços de perfil`;
  grid.innerHTML = visible.length ? visible.map(item => `<article class="agent-card" tabindex="0" role="button" aria-label="Abrir modelo de perfil ${item.number}, categoria ${item.category}" data-id="${item.id}">
    <div class="card-visual"><span class="demo-tag">perfil em construção</span></div>
    <div class="card-body"><span class="card-category">${item.category}</span><h3>Perfil ${String(item.number).padStart(2, '0')}</h3><p>Espaço reservado para a história e o trabalho de uma pessoa participante.</p><div class="card-foot"><span>Passos · MG</span><span aria-hidden="true">↗</span></div></div>
  </article>`).join('') : '<div class="empty-state"><span>⌕</span><h3>Nenhum resultado por aqui</h3><p>Tente outra busca ou escolha uma categoria diferente.</p></div>';
}
searchInput.addEventListener('input', renderCards);
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  activeCategory = button.dataset.category;
  document.querySelectorAll('.filter').forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle('is-active', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  renderCards();
}));
const dialog = document.querySelector('#profile-dialog');
function openProfile(id) {
  const item = profiles.find(profile => profile.id === id);
  if (!item) return;
  dialog.querySelector('.profile-content').innerHTML = `<div class="profile-art" aria-hidden="true"></div><span class="card-category">${item.category} · PERFIL EM CONSTRUÇÃO</span><h2 id="profile-title">Perfil ${String(item.number).padStart(2, '0')}</h2><p>Este espaço poderá contar a trajetória profissional, os saberes, os trabalhos e as formas de contato que a pessoa participante autorizar divulgar.</p><div class="profile-note">Modelo de perfil. Nome, história, fotografias e contatos serão incluídos com autorização.</div>`;
  dialog.showModal();
}
grid.addEventListener('click', event => { const card = event.target.closest('.agent-card'); if (card) openProfile(card.dataset.id); });
grid.addEventListener('keydown', event => { const card = event.target.closest('.agent-card'); if (card && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); openProfile(card.dataset.id); } });
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); nav.classList.toggle('is-open', open); });
nav.addEventListener('click', event => { if (event.target.closest('a')) { nav.classList.remove('is-open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Abrir menu'); } });
renderCards();

