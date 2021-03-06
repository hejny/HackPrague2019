import { File } from './../model/File';
import { FACE_IMAGE } from './../../test/FACE_IMAGE';
import { IRatings, IRatingsFace } from './../../interfaces/IRatings';
import { AZURE_APIKEY } from '../config';
import axios from 'axios';

export async function getFaceData(
    file: File,
): Promise<{ face: IRatingsFace; faceRaw: any }> {
    const url =
        'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';

    const params = {
        returnFaceId: 'true',
        returnFaceLandmarks: 'false',
        returnFaceAttributes:
            'age,gender,headPose,smile,facialHair,glasses,emotion,' +
            'hair,makeup,occlusion,accessories,blur,exposure,noise',
    };

    const headers = {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': AZURE_APIKEY,
    };

    //const sourceImageUrl = `https://scontent-prg1-1.xx.fbcdn.net/v/t1.0-9/14344784_10207440160388294_322573889345928577_n.jpg?_nc_cat=111&_nc_ht=scontent-prg1-1.xx&oh=de3e7a5a40fc9281b59c4d2e6822ee04&oe=5D658319`;

    const sourceImageUrl = file.publicUrl;
    const data = '{"url": ' + '"' + sourceImageUrl + '"}';
    //const data =  new Buffer(FACE_IMAGE, 'base64').toString();

    const response = await axios.request({
        method: 'POST',
        url,
        params,
        headers,
        data,
    });

    if (response.data.lenght === 0) {
        throw new Error(`No face detected.`);
    }

    let face: IRatingsFace = {
        smile: Math.random(),
        gender: 'male',
        age: 25,
        emotion: {
            anger: Math.random(),
            contempt: Math.random(),
            disgust: Math.random(),
            fear: Math.random(),
            happiness: Math.random(),
            neutral: Math.random(),
            sadness: Math.random(),
            surprise: Math.random(),
        },
    };
    try {
        face = response.data[0].faceAttributes;
    } catch (e) {}

    return {
        face,
        faceRaw: response.data,
    };
}

/*
getFaceData().then((x)=>{
    console.log(x);
});
*/
