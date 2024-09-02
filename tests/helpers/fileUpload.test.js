import { fileUpload } from "../../src/helpers/fileUpload";

describe('Pruebas en fileUpload', () => {
    // test('Debe de subir el archivo correctamente a cloudinary', async() => {
    //     const imageUrl = "https://imgs.search.brave.com/EYGTHEFjyuRWqkltZ4i1zfcZDY8Fqg3fGFGLZPRVoLc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2NhLzFk/LzNiL2NhMWQzYjA1/NmNlMGE5ZDc5OGFh/OWVjYjlmODAyZWJl/LmpwZw";
    //     const response = await fetch(imageUrl);
    //     const blob = await response.blob();

    //     const file = new File([blob], "alya.jpg");

    //     const url = await fileUpload(file);
    //     expect(typeof url).toBe("string");
    // });

    test('Debe de retornal null', async() => {
        const file = new File([], "alya.jpg");

        const url = await fileUpload(file);
        expect(url).toBe(null);
    });
});