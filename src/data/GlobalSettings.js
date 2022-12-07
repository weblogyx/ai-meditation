const production = true;
const localHost = 'http://localhost:3001';
const productionHost = 'https://api.weblogyx.com';

const actualHost = production? productionHost: localHost;

export const generateImageUrl = `${actualHost}/ai-meditation/generate-happy-place`;
export const getGenerationUrl = `${actualHost}/ai-meditation/get-happy-place`;