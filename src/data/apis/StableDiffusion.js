import { generateImageUrl, getGenerationUrl } from "../GlobalSettings";

export const GenerateImage = async (prompt) => {
    const requestBody = {
        prompt:`meditation place, ${prompt}`
    };
    try {
        const request = await fetch(generateImageUrl, 
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(requestBody)
        });
        console.log(request);
        const response = await request.json();
        if(response.data) {
            if(response.data.result) {
                const _result = response.data.result;
                const _parsedResult = JSON.parse(_result);
                const generationId = _parsedResult.id;
                return generationId;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    catch(error) {
        console.log(error);
        return false;
    }
}
export const GetGeneration = async (generationId) => {
    try {
        const request = await fetch(`${getGenerationUrl}/${generationId}`, 
        {
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        });
        console.log(request);
        const response = await request.json();
        if(response.data) {
            if(response.data.result) {
                const _result = response.data.result;
                const _parsedResult = JSON.parse(_result);
                return _parsedResult;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    catch(error) {
        console.log(error);
        return false;
    }
}