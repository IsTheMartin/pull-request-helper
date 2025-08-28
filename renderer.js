const fields = [
    'ticketLink', 'ticketNumber', 'ticketTitle', 'version',
    'parentLink', 'parentNumber', 'parentTitle', 'description', 'ticketType'
];

window.addEventListener('DOMContentLoaded', () => {

    fields.forEach(id => {
        const savedValue = localStorage.getItem(id);
        if (savedValue !== null) {
            document.getElementById(id).value = savedValue;
        }
    });

    fields.forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('input', () => {
            localStorage.setItem(id, element.value);
        });
    });

    const ticketLinkEl = document.getElementById('ticketLink');
    const ticketNumberEl = document.getElementById('ticketNumber');
    if (ticketLinkEl && ticketNumberEl) {
        ticketLinkEl.addEventListener('input', function (e) {
            const number = extractTicketNumber(e.target.value);
            if (number) {
                ticketNumberEl.value = number;
                localStorage.setItem('ticketNumber', number);
            }
        });
    }

    // Autofill parentNumber from parentLink
    const parentLinkEl = document.getElementById('parentLink');
    const parentNumberEl = document.getElementById('parentNumber');
    if (parentLinkEl && parentNumberEl) {
        parentLinkEl.addEventListener('input', function (e) {
            const number = extractTicketNumber(e.target.value);
            if (number) {
                parentNumberEl.value = number;
                localStorage.setItem('parentNumber', number);
            }
        });
    }

});

function extractTicketNumber(link) {
    const match = link.match(/([A-Z]+-\d+)/);
    return match ? match[1] : '';
}

// https://laclippers.atlassian.net/browse/CA-147942

document.getElementById('parentLink').addEventListener('input', function (e) {
    const number = extractTicketNumber(e.target.value);
    if (number) {
        document.getElementById('parentNumber').value = number;
    }
});

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

    document.getElementById('prTitle').value = prTitle;
    document.getElementById('output').value = changelog;
    document.getElementById('changelogOutput').style.display = 'block';
});

document.getElementById('copyTitle').addEventListener('click', function () {
    const prTitleText = document.getElementById('prTitle').value;
    navigator.clipboard.writeText(prTitleText)
        .catch(err => {
            alert('Copying PR title failed.');
            console.error('Error copying text: ', err);
        });
});

document.getElementById('copyChangelog').addEventListener('click', function () {
    const changelogText = document.getElementById('output').value;
    navigator.clipboard.writeText(changelogText)
        .catch(err => {
            alert('Copying changelog failed.');
            console.error('Error copying text: ', err);
        });
});

document.getElementById('resetBtn').addEventListener('click', function () {
    fields.forEach(id => localStorage.removeItem(id));
    document.getElementById('changelogOutput').style.display = 'none';
    document.getElementById('changelogForm').reset();
});