export interface Booking {
    id: number,
    fotoLink: string,
    guest: string,
    orderDate: string,
    checkInDate: string,
    checkOutDate: string,
    specialRequest: string,
    status: string
}

export interface ConciergeUsers {
    id: number,
    photo: string,
    name: string,
    startDate: string,
    email: string,
    job: string,
    phone: string,
    status: boolean,
    pass: string
}