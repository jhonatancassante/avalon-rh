const convertUrl = (url: string) => {
    if (url.startsWith("https://drive.google.com/file/d/")) {
        const urlParts = url.split("/");
        const id = urlParts[urlParts.length - 2];
        return `https://drive.google.com/u/0/uc?id=${id}`;
    } else if (url.startsWith("https://drive.google.com/u/0/uc?id=")) {
        const urlParts = url.split("=");
        const id = urlParts[urlParts.length - 1];
        return `https://drive.google.com/file/d/${id}/view?usp=drive_link`;
    } else {
        return url;
    }
};

export default convertUrl;

// https://drive.google.com/file/d/1ohAVeLcfbR5p0ArS1Pzc-jcOeoDEwU2x/view?usp=drive_link
// https://drive.google.com/u/0/uc?id=1ohAVeLcfbR5p0ArS1Pzc-jcOeoDEwU2x
