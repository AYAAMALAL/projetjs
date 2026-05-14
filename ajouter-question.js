document.getElementById('add-proposition').addEventListener('click', () => {
  // Créer un conteneur <div>
  const div = document.createElement('div');

  // Créer la case à cocher (checkbox)
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('correcte');

  // Créer le champ texte de la proposition
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Texte de la proposition';
  input.classList.add('texte-proposition');

  // Ajouter checkbox et input dans le conteneur
  div.appendChild(checkbox);
  div.appendChild(input);

  // Ajouter le conteneur dans la zone des propositions
  document.getElementById('propositions').appendChild(div);
});

document.getElementById('form-question').addEventListener('submit', function(e) {
  e.preventDefault();

  // Lire les valeurs du formulaire
  const proprietaire = document.getElementById('proprietaire').value;
  const nomExamen = document.getElementById('nom-examen').value;
  const enonce = document.getElementById('enonce').value;
  const duree = document.getElementById('duree').value;
  const points = document.getElementById('points').value;

  // Collecter les propositions depuis le DOM
  const propositions = [];
  document.querySelectorAll('#propositions div').forEach(div => {
    const texte = div.querySelector('.texte-proposition').value;
    const correcte = div.querySelector('.correcte').checked;
    propositions.push({ texte, correcte });
  });

  // Récupérer les examens du localStorage
  const key = 'examens_' + proprietaire;
  const examens = JSON.parse(localStorage.getItem(key)) || [];

  // Trouver l'examen par son nom
  const exam = examens.find(ex => ex.nom === nomExamen);

  // Vérifier que l'examen existe
  if (!exam) {
    alert("Examen introuvable. Vérifiez le nom du propriétaire et de l'examen.");
    return;
  }

  // Construire la question et l'ajouter
  const question = { enonce, duree, points, propositions };
  exam.questions.push(question);
  localStorage.setItem(key, JSON.stringify(examens));

  alert('Question ajoutée avec succès !');
  this.reset();
  document.getElementById('propositions').innerHTML = '';
});