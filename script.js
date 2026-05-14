document.getElementById('form-examen').addEventListener('submit', function (e) {
    e.preventDefault();

    const examen = {
        nom: document.getElementById('nom').value,
        duree: document.getElementById('duree').value,
        description: document.getElementById('description').value,
        proprietaire: document.getElementById('proprietaire').value,
        questions: []
    };

    const key = 'examens_' + examen.proprietaire;

    const examens = JSON.parse(localStorage.getItem(key)) || [];

    examens.push(examen);
    localStorage.setItem(key, JSON.stringify(examens));

    alert('Examen ajouté avec succès !');
    this.reset();
});