const root = document.getElementById('root');
main();

async function main() {
    const records = await fetchRecords();

    for (const record of records) {
        processRecord(record.uuid);
    }
}

async function processRecord(uuid) {
    recordRoot = document.createElement('div');
    recordRoot.classList.add('record');
    root.appendChild(recordRoot);

    const record = await fetchRecord(uuid);

    console.log(record);

    recordRoot.innerHTML += `<img src="${record.faceImageUrl}">`;
}

async function fetchRecord(uuid) {
    return (await (await fetch(`http://localhost:3000/records/${uuid}`)).json())
        .record;
}

async function fetchRecords() {
    return (await (await fetch('http://localhost:3000/records/')).json())
        .records;
}
