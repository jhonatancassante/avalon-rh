const convertUrl = (url: string) => {
    const urlParts = url.split("/");
    const id = urlParts[urlParts.length - 2];
    return `https://drive.google.com/u/0/uc?id=${id}`;
};

export default convertUrl;

// https://drive.google.com/file/d/1ohAVeLcfbR5p0ArS1Pzc-jcOeoDEwU2x/view?usp=drive_link
// https://drive.google.com/u/0/uc?id=1ohAVeLcfbR5p0ArS1Pzc-jcOeoDEwU2x
