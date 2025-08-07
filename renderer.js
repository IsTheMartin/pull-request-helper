document.getElementById('changelogForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const version = document.getElementById('version').value;
    const ticketNumber = document.getElementById('ticketNumber').value;
    const ticketTitle = document.getElementById('ticketTitle').value;
    const ticketLink = document.getElementById('ticketLink').value;
    const parentNumber = document.getElementById('parentNumber').value;
    const parentTitle = document.getElementById('parentTitle').value;
    const parentLink = document.getElementById('parentLink').value;
    const description = document.getElementById('description').value;
    const ticketType = document.getElementById('ticketType').value;

    // Formato de changelog (personaliza según tus requisitos)
    let changelog = `* [v<${version}>][<${ticketNumber}>][<${ticketType}>][<${ticketTitle}>]-[Feature: <${parentNumber}>]\n`;
    changelog += `  Feature: ${parentTitle} (${parentLink})\n`;
    changelog += `  Description: ${description}\n`;
    
    document.getElementById('output').textContent = changelog;
    document.getElementById('changelogOutput').style.display = 'block';

    document.getElementById('copyBtn').addEventListener('click', function () {
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