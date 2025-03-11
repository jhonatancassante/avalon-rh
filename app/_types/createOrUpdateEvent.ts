export default interface CreateOrUpdateEvent {
    name: string;
    edition: number;
    date: Date;
    state: string;
    city: string;
    dateToOpen: Date;
    dateToClose: Date;
    eventSectors: string[];
}
