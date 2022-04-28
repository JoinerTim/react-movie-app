
const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: 'f11f02ab6666d2c851de06cb18136b11',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;