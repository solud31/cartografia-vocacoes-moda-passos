const examples = [
  { id: 'costura', category: 'Costura', title: 'Costura & reparo', text: 'Ajustes, consertos e cuidado com as peças do dia a dia.', place: 'Exemplo de prática', color: '#d4c3a3', art: 'needle' },
  { id: 'criacao', category: 'Criação', title: 'Criação independente', text: 'Ideias autorais que nascem do olhar para o território.', place: 'Exemplo de atuação', color: '#c68b69', art: 'form' },
  { id: 'artesanato', category: 'Artesanato', title: 'Trabalho manual', text: 'Técnicas, matérias e gestos transmitidos entre gerações.', place: 'Exemplo de saber', color: '#a7a183', art: 'thread' },
  { id: 'reuso', category: 'Reuso', title: 'Reuso & transformação', text: 'Novos caminhos para materiais e roupas que já existem.', place: 'Exemplo de iniciativa', color: '#bd9b75', art: 'reuse' }
];
const shapes = {
  needle: '<path d="M66 36l62 78m-69-70l62 78m-45-89l-7 7m65 63l-7 7" stroke="#765344" stroke-width="2"/><path d="M104 74c-22-7-43 12-30 30s33 7 30-8" fill="none" stroke="#f5f0e6" stroke-width="3"/><circle cx="126" cy="107" r="4" fill="#b75f42"/>',
  form: '<path d="M83 36c-17 0-29 14-29 34 0 28 21 59 42 61 21-2 42-33 42-61 0-20-12-34-29-34-6 0-10 3-13 8-3-5-7-8-13-8z" fill="#e5c9a5" stroke="#725d4c" stroke-width="2"/><path d="M75 68c18 8 35 8 52 0m-46 16c14 6 27 6 40 0m-32 15c8 3 16 3 24 0" fill="none" stroke="#b75f42" stroke-width="2"/>',
  thread: '<path d="M96 32c23 0 41 17 41 40s-18 52-41 52-41-29-41-52 18-40 41-40z" fill="none" stroke="#f5f0e6" stroke-width="9"/><path d="M96 32c23 0 41 17 41 40s-18 52-41 52-41-29-41-52 18-40 41-40z" fill="none" stroke="#6b6849" stroke-width="2"/><path d="M61 54l70 47m-78-26l61 43m1-81l-64 53m88-34l-47 49" stroke="#f5f0e6" stroke-width="2"/>',
  reuse: '<path d="M96 36l40 23v45l-40 23-40-23V59z" fill="#e7d3b7" stroke="#665c43" stroke-width="2"/><path d="M96 36v46m40-23L96 82 56 59m40 23v45m-25-32l25-13 25 13" fill="none" stroke="#b75f42" stroke-width="2"/><path d="M74 49l44 26m-44 23l44-26" stroke="#8a815e" stroke-width="2"/>'
};
const grid = document.querySelector('#agent-grid');
const searchInput = document.querySelector('#search');
let activeCategory = 'Todas';
function renderCards() {
  const query = searchInput.value.trim().toLocaleLowerCase('pt-BR');
  const visible = examples.filter(item => (activeCategory === 'Todas' || item.category === activeCategory) && `${item.title} ${item.category} ${item.text}`.toLocaleLowerCase('pt-BR').includes(query));
  document.querySelector('#result-count').textContent = `${visible.length} de 4 registros de demonstração`;
  grid.innerHTML = visible.length ? visible.map(item => `<article class="agent-card" tabindex="0" role="button" aria-label="Ver demonstração: ${item.title}" data-id="${item.id}">
    <div class="card-visual" style="background:${item.color}"><span class="demo-tag">demonstração</span><svg viewBox="0 0 192 150" aria-hidden="true">${shapes[item.art]}</svg></div>
    <div class="card-body"><span class="card-category">${item.category}</span><h3>${item.title}</h3><p>${item.text}</p><div class="card-foot"><span>${item.place}</span><span aria-hidden="true">↗</span></div></div>
  </article>`).join('') : '<div class="empty-state"><span>⌕</span><h3>Nenhum resultado por aqui</h3><p>Tente outra palavra ou escolha uma categoria diferente.</p></div>';
}
searchInput.addEventListener('input', renderCards);
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  activeCategory = button.dataset.category;
  document.querySelectorAll('.filter').forEach(filter => filter.classList.toggle('is-active', filter === button));
  renderCards();
}));

const dialog = document.querySelector('#profile-dialog');
function openProfile(id) {
  const item = examples.find(example => example.id === id);
  if (!item) return;
  dialog.querySelector('.profile-content').innerHTML = `<div class="profile-art" style="background:${item.color}"><svg viewBox="0 0 192 150" aria-hidden="true">${shapes[item.art]}</svg></div><span class="card-category">${item.category} · DEMONSTRAÇÃO FICTÍCIA</span><h2 id="profile-title">${item.title}</h2><p>${item.text}</p><p>Este perfil é um exemplo de interface, sem vínculo com pessoa, marca ou negócio real. No projeto, cada perfil poderá apresentar saberes, trajetória, localidade e outras informações compartilhadas com autorização.</p><div class="profile-note">Conteúdo demonstrativo. Dados fictícios; nenhum contato real é exibido.</div>`;
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

document.querySelector('#interest-form').addEventListener('submit', event => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  const success = document.querySelector('#form-success');
  success.hidden = false;
  event.currentTarget.reset();
  success.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
});
renderCards();
