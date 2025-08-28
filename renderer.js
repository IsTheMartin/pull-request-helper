document.getElementById('changelogForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const version = document.getElementById('version').value;
    const ticketNumber = document.getElementById('ticketNumber').value;
    const ticketTitle = document.getElementById('ticketTitle').value;
    const parentNumber = document.getElementById('parentNumber').value;
    const parentTitle = document.getElementById('parentTitle').value;
    const parentLink = document.getElementById('parentLink').value;
    const description = document.getElementById('description').value;
    const ticketType = document.getElementById('ticketType').value;

    let prTitle = `[v${version}][${ticketType}][${ticketNumber}] ${ticketTitle}`;

    // Formato de changelog (personaliza según tus requisitos)
    let changelog = `* [v${version}][${ticketNumber}][${ticketType}][${ticketTitle}]-[Feature: ${parentNumber}]\n`;
    changelog += `  Feature: ${parentTitle} (${parentLink})\n`;
    changelog += `  Description: ${description}\n`;
    
    document.getElementById('prTitle').textContent = prTitle;
    document.getElementById('output').textContent = changelog;
    document.getElementById('changelogOutput').style.display = 'block';

    document.getElementById('copyTitle').addEventListener('click', function () {
        const prTitleText = document.getElementById('prTitle').textContent;
        navigator.clipboard.writeText(prTitleText)
            .then(() => {
                alert('Título del PR copiado al portapapeles.');
            })
            .catch(err => {
                alert('Error al copiar el título del PR.');
            });
    });

    document.getElementById('copyChangelog').addEventListener('click', function () {
        const changelogText = document.getElementById('output').textContent;
        navigator.clipboard.writeText(changelogText)
            .then(() => {
                alert('Changelog copiado al portapapeles.');
            })
            .catch(err => {
                alert('Error al copiar el changelog.');
            });
    });
    document.getElementById('resetBtn').addEventListener('click', function () {
        document.getElementById('changelogOutput').style.display = 'none';
        document.getElementById('changelogForm').reset();
    });
});