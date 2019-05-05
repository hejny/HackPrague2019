main();

async function main() {
    const record = fetchRecord();
}

async function fetchRecord() {
    return await (await fetch(
        'http://localhost:3000/records/92721fd7-588c-45f7-b835-b2e2a5451871',
    )).json();
}
