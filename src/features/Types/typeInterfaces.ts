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

export interface Review {
    id: number,
    date: string,
    hora: string,
    customerName: string,
    email: string,
    stars: number,
    review: string,
    status: boolean,
    phone: string
}

export interface Room {
    id: number,
    fotoLink: string,
    number: string,
    floor: number,
    bedType: string,
    amenities: string,
    price: number,
    status: boolean,
    offer: number
}