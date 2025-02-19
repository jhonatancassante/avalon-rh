export default interface CreateEvent {
    name: string;
    edition: number;
    date: Date;
    state: string;
    city: string;
    areInscriptionsOpen: boolean;
    dateToClose: Date;
}
