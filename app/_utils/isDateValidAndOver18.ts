const isDateValidAndOver18 = (value: string): boolean => {
    const [day, month, year] = value.split("/");
    const isoDate = `${year}-${month}-${day}`;

    const date = new Date(isoDate);
    if (!(date instanceof Date && !isNaN(date.getTime()))) {
        return false;
    }

    const today = new Date();
    const birthDate = new Date(isoDate);
    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age >= 18;
};

export default isDateValidAndOver18;
