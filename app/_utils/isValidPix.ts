import { z } from "zod";

const isValidPix = (pix: string): boolean => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    const uuidRegex =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

    if (cpfRegex.test(pix)) {
        return true;
    }

    if (cnpjRegex.test(pix)) {
        return true;
    }

    if (z.string().email().safeParse(pix).success) {
        return true;
    }

    if (phoneRegex.test(pix)) {
        return true;
    }

    if (uuidRegex.test(pix)) {
        return true;
    }

    return false;
};

export default isValidPix;
