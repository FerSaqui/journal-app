export const fileUpload = async( file ) => {
    if ( !file ) {
        //throw new Error("No tenemos ningún archivo a subir.");
        return null;
    }

    const cloudUrl = "https://api.cloudinary.com/v1_1/fersaqui/upload";

    const formData = new FormData();
    formData.append("upload_preset", "react-journal");
    formData.append("file", file);

    try {
        const response = await fetch( cloudUrl, {
            method: "POST",
            body: formData
        });

        if ( !response.ok ) {
            throw new Error("No se pudo subir imágen");
        }

        const cloudResponse = await response.json();
        return cloudResponse.secure_url;
    } catch (error) {
        //console.log(error);
        //throw new Error(error.message);
        return null;
    }
};