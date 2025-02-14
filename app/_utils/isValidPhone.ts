export default function isValidPhone(phone: string): boolean {
    phone = phone.replace(/\D/g, "");

    if (phone.length !== 11) return false;

    if (!/^([1-9]\d)9\d{8}$/.test(phone)) return false;

    return true;
}
