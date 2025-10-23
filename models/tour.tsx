
export default class Tour {

    name?: string;
    description?: string;
    minimumDuration?: string;
    price?: { amount?: number, currencyCode?: string };
    pictures?: Array<string>;
    bookingLink?: string;
}
