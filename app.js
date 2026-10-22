'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const features = {
  history: { title: 'The full picture of your project.', subtitle: 'Follow connected commits, branches, and merges in History.', image: 'assets/history.png', name: 'History', alt: 'Complete XGit.IO desktop window with the left workspace and branch sidebar, History selected, and a connected sample graph of ten commits with three merges.', status: 'Connected commits. Visible branches. Complete project context.' },
  changes: { title: 'Every change, in plain sight.', subtitle: 'Compare the code before you stage and commit.', image: 'assets/changes.png', name: 'Changes', alt: 'XGit.IO side by side code diff with added validation and asynchronous save logic.', status: 'Review locally. Stage when ready.' },
  'pull-request': { title: 'See a conflict before you merge.', subtitle: 'Review the affected file and code, required builds, and approvals.', image: 'assets/pull-request.png', name: 'Pull requests', alt: 'XGit.IO pull request details showing a merge conflict in src/BookingService.cs and the affected code lines.', status: 'A conflict blocks the merge until resolved.' },
  board: { title: 'A shared view of what comes next.', subtitle: 'Organize the project from To do through Doing, QA, and Done.', image: 'assets/board.png', name: 'Project board', alt: 'XGit.IO Project board with four stages. Doing has one task and QA has three after the Item totals task moves.', status: 'Keep tasks and handoffs visible to the team.' },
  pipeline: { title: 'Build locally. Keep the approval clear.', subtitle: 'Follow a build through owner approval and configured deployment.', image: 'assets/pipeline.png', name: 'Pipelines', alt: 'XGit.IO pipeline with a passing Docker build, owner approval waiting, and deployment pending.', status: 'Deployment waits when owner approval is required.' }
};
let currentFeature = 'history';
const image = $('#feature-image');
function selectFeature(key, focus = false) {
  if (!features[key]) return;
  currentFeature = key;
  $('#features').dataset.feature = key;
  const item = features[key];
  $$('.feature-tabs [role="tab"]').forEach(tab => {
    const selected = tab.dataset.feature === key;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focus) tab.focus();
  });
  $('#feature-panel').setAttribute('aria-labelledby', `tab-${key}`);
  $('#preview-title').textContent = item.title;
  $('#preview-subtitle').textContent = item.subtitle;
  $('#preview-status').textContent = item.status;
  image.src = item.image;
  image.alt = item.alt;
  image.removeAttribute('width');
  image.removeAttribute('height');
  $('#expand-preview').setAttribute('aria-label', `Enlarge the ${item.name} screenshot`);
}
$$('[data-feature]').forEach(tab => tab.addEventListener('click', () => selectFeature(tab.dataset.feature)));
$('.feature-tabs').addEventListener('keydown', event => {
  const keys = Object.keys(features);
  let index = keys.indexOf(currentFeature);
  if (event.key === 'ArrowRight') index = (index + 1) % keys.length;
  else if (event.key === 'ArrowLeft') index = (index + keys.length - 1) % keys.length;
  else if (event.key === 'Home') index = 0;
  else if (event.key === 'End') index = keys.length - 1;
  else return;
  event.preventDefault(); selectFeature(keys[index], true);
});
$$('[data-show-feature]').forEach(button => button.addEventListener('click', () => {
  selectFeature(button.dataset.showFeature);
  $('#features').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  $(`#tab-${button.dataset.showFeature}`).focus({ preventScroll: true });
}));
// Preload the other small UI captures so a tab switch does not display a loader.
Object.values(features).forEach(feature => { const preload = new Image(); preload.src = feature.image; });

const menu = $('.menu-toggle');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  $('#nav').classList.toggle('is-open', open);
});
$$('#nav a').forEach(link => link.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false'); $('#nav').classList.remove('is-open');
}));

let opener = null;
function openDialog(dialog, trigger) {
  opener = trigger;
  dialog.showModal(); document.body.classList.add('modal-open');
}
$('#expand-preview').addEventListener('click', event => {
  const item = features[currentFeature];
  $('#large-screenshot').src = item.image; $('#large-screenshot').alt = item.alt;
  $('#image-dialog-title').textContent = `XGit.IO · ${item.name}`;
  $('#image-dialog').classList.remove('zoomed'); $('#image-zoom').setAttribute('aria-pressed', 'false'); $('#image-zoom').textContent = 'Zoom in';
  openDialog($('#image-dialog'), event.currentTarget);
});
$('#image-zoom').addEventListener('click', () => {
  const zoomed = $('#image-dialog').classList.toggle('zoomed');
  $('#image-zoom').setAttribute('aria-pressed', String(zoomed));
  $('#image-zoom').textContent = zoomed ? 'Fit to window' : 'Zoom in';
});
$('#watch-demo').addEventListener('click', event => {
  openDialog($('#video-dialog'), event.currentTarget);
  const play = $('#demo-video').play();
  if (play) play.catch(() => { /* Native play controls remain available. */ });
});
$$('dialog').forEach(dialog => {
  $('.close-dialog', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    if (dialog.id === 'video-dialog') $('#demo-video').pause();
    if (opener) opener.focus({ preventScroll: true });
  });
});

const connections = {
  local: ['Same office. Direct connection.', 'Local members connect to the owner over LAN HTTPS and verify the host’s certificate fingerprint. Remote members can use a configured SSH tunnel or trusted relay.', 'Local', 'Internet'],
  ssh: ['A trusted tunnel to the owner.', 'An SSH tunnel carries the remote connection to the owner host. Verify the SSH host key and the HTTPS certificate inside the tunnel. Project roles still control repository access.', 'Local', 'SSH tunnel'],
  relay: ['Different networks. The same owner host.', 'A relay operated by your team forwards the connection without storing the repository. Use a trusted HTTPS endpoint: the relay can see forwarded traffic and member tokens.', 'Local', 'HTTPS relay']
};
$$('[data-network]').forEach(button => button.addEventListener('click', () => {
  const mode = button.dataset.network; const copy = connections[mode];
  $('.network-diagram').dataset.mode = mode;
  $$('[data-network]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  $('#connection-title').textContent = copy[0]; $('#connection-description').textContent = copy[1];
  $('.tag-left').textContent = copy[2]; $('.tag-right').textContent = copy[3];
}));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused = reducedMotion.matches;
function setMotion(paused) {
  motionPaused = paused;
  const svg = $('.network-routes');
  if (paused && svg.pauseAnimations) svg.pauseAnimations();
  else if (svg.unpauseAnimations) svg.unpauseAnimations();
  $('.network-diagram').classList.toggle('motion-paused', paused);
  $('#motion-toggle').setAttribute('aria-pressed', String(paused));
  $('#motion-toggle span:last-child').textContent = paused ? 'Play animation' : 'Pause animation';
  $('#motion-toggle span:first-child').textContent = paused ? '▷' : 'Ⅱ';
}
setMotion(motionPaused);
$('#motion-toggle').addEventListener('click', () => setMotion(!motionPaused));
reducedMotion.addEventListener('change', event => setMotion(event.matches));

const card = $('#moving-card'); const qa = $('#qa-column');
let moved = false;
function moveToQA() {
  if (moved) return;
  moved = true;
  qa.insertBefore(card, $('.task-card', qa));
  card.classList.add('just-moved'); card.draggable = false;
  $('#move-card').textContent = 'Ready for QA ✓'; $('#move-card').disabled = true;
  qa.classList.add('moved'); qa.classList.remove('drag-over');
  $('#doing-count').textContent = '0'; $('#qa-count').textContent = '2';
  const empty = document.createElement('p'); empty.className = 'empty-column'; empty.textContent = 'Work has moved to QA.';
  $('#doing-column').append(empty);
  $('#board-message').textContent = 'Item totals moved to QA. Doing 0 · QA 2.';
  if (document.activeElement === $('#move-card')) $('#reset-board').focus({ preventScroll: true });
}
$('#move-card').addEventListener('click', moveToQA);
card.addEventListener('dragstart', event => {
  event.dataTransfer.setData('text/plain', 'xgit-demo-item-totals');
  event.dataTransfer.effectAllowed = 'move'; card.classList.add('dragging');
});
card.addEventListener('dragend', () => { card.classList.remove('dragging'); qa.classList.remove('drag-over'); });
qa.addEventListener('dragover', event => { if (!moved) { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; qa.classList.add('drag-over'); } });
qa.addEventListener('dragleave', event => { if (!qa.contains(event.relatedTarget)) qa.classList.remove('drag-over'); });
qa.addEventListener('drop', event => { event.preventDefault(); if (event.dataTransfer.getData('text/plain') === 'xgit-demo-item-totals') moveToQA(); });
$('#reset-board').addEventListener('click', () => {
  moved = false; $('#doing-column').append(card); card.draggable = true; card.classList.remove('just-moved', 'dragging');
  $('#move-card').innerHTML = 'Move to QA <span aria-hidden="true">→</span>'; $('#move-card').disabled = false;
  qa.classList.remove('moved', 'drag-over'); $('#doing-count').textContent = '1'; $('#qa-count').textContent = '1';
  const empty = $('.empty-column'); if (empty) empty.remove();
  $('#board-message').textContent = 'A clear handoff from development to QA.';
});

let deploymentTimer = null;
$('#approve-button').addEventListener('click', () => {
  $('#approval-card').classList.add('approved'); $('#approval-status').textContent = 'Approved';
  $('#approval-status').className = 'stage-status good'; $('#approval-summary').textContent = 'Approved by the project owner';
  $('#approval-icon').classList.replace('amber', 'good'); $('#approval-icon use').setAttribute('href', '#i-check');
  $('#approve-button').hidden = true; $('#deploy-status').textContent = 'Deploying'; $('#deploy-status').className = 'stage-status';
  $('#deploy-summary').textContent = 'Deploying the approved artifact'; $('#pipeline-message').textContent = 'Owner approval recorded. The demo deployment can now continue.';
  $('#reset-pipeline').focus({ preventScroll: true });
  deploymentTimer = setTimeout(() => {
    $('#deploy-status').textContent = 'Deployed'; $('#deploy-status').className = 'stage-status good';
    $('#deploy-summary').textContent = 'Preview deployment completed'; $('#deploy-card').classList.add('deployed');
    $('#deploy-icon').classList.replace('muted', 'good'); $('#deploy-icon use').setAttribute('href', '#i-check');
    $('#pipeline-message').textContent = 'Build passed. Owner approved. Deployment completed in this demo.';
  }, 1500);
});
$('#reset-pipeline').addEventListener('click', () => {
  clearTimeout(deploymentTimer);
  $('#approval-card').classList.remove('approved'); $('#approval-status').textContent = 'Waiting'; $('#approval-status').className = 'stage-status amber';
  $('#approval-summary').textContent = 'Waiting for the project owner'; $('#approval-icon').classList.replace('good', 'amber'); $('#approval-icon use').setAttribute('href', '#i-clock');
  $('#approve-button').hidden = false; $('#deploy-status').textContent = 'Pending'; $('#deploy-status').className = 'stage-status muted';
  $('#deploy-summary').textContent = 'Waiting for owner approval'; $('#deploy-card').classList.remove('deployed');
  $('#deploy-icon').classList.replace('good', 'muted'); $('#deploy-icon use').setAttribute('href', '#i-upload');
  $('#pipeline-message').textContent = 'Try the owner approval step. This is a preview; no code is deployed.';
});
