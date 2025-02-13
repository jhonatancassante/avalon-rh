const formatCPF = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "");

    if (cleanedValue.length <= 3) {
        return cleanedValue;
    } else if (cleanedValue.length <= 6) {
        return `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3)}`;
    } else if (cleanedValue.length <= 9) {
        return `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3, 6)}.${cleanedValue.slice(6)}`;
    } else {
        return `${cleanedValue.slice(0, 3)}.${cleanedValue.slice(3, 6)}.${cleanedValue.slice(6, 9)}-${cleanedValue.slice(9, 11)}`;
    }
};

export default formatCPF;
