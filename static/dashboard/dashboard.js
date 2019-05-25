const root = document.getElementById('root');
main();

async function main() {
    tick(true);
}

function tick(first) {
    setTimeout(async () => {
        const records = await fetchRecords();

        for (const record of records) {
            processRecord(record.uuid, first);
        }

        tick(false);
    }, 1000);
}

const processedUuids = [];

async function processRecord(uuid, reverse) {
    if (processedUuids.includes(uuid)) {
        return;
    }
    processedUuids.push(uuid);

    console.log(`Processing ${uuid}...`);

    const recordRoot = document.createElement('div');
    recordRoot.classList.add('record');
    if (reverse) {
        root.append(recordRoot);
    } else {
        root.prepend(recordRoot);
    }

    const record = await fetchRecord(uuid);

    console.log('record', record);
    const imageSize = await detectImageSize(record.faceImageUrl);
    console.log('imageSize', imageSize);

    recordRoot.innerHTML = `

        <h1>${record.uuid}</h1>
        <svg width="${imageSize.width}" height="${imageSize.height}">       
            <image xlink:href="${record.faceImageUrl}"  x="0" y="0" width="${
        imageSize.width
    }" height="${imageSize.height}"/>

            ${record.ratings.faceRaw
                .map((face) => {
                    const { top, left, width, height } = face.faceRectangle;

                    console.log(top, left, width, height);
                    return `<rect x="${left}" y="${top}" width="${width}" height="${height}"
                    style="fill:blue;stroke:red;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9" />`;
                })
                .join('\n')}
        </svg>


        <pre>${JSON.stringify(record.ratings, null, 4)}</pre>    
    `;
}

async function fetchRecord(uuid) {
    return (await (await fetch(`/records/${uuid}`)).json()).record;
}

async function fetchRecords() {
    return (await (await fetch('/records/')).json()).records;
}

function detectImageSize(src) {
    return new Promise((resolve, reject) => {
        imageElement = document.createElement('img');
        imageElement.onload = () => {
            resolve({
                width: imageElement.naturalWidth,
                height: imageElement.naturalHeight,
            });
        };
        imageElement.src = src;
        setTimeout(() => {
            reject(new Error(`Timeout in detectImageSize.`));
        }, 100000);
    });
}
