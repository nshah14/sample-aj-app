import { Injectable } from "@angular/core";


@Injectable({
    providedIn: "root"
})
export class VenueService {
    private venues = new Array<Venue>(
        { id: 0, name: "Gymfinity", city: "Reading" },
        { id: 1, name: "Red Kangaroo", city: "Reading" },
        { id: 2, name: "Mad House", city: "Reading" },
        { id: 3, name: "Loddon Valley Liesure Center", city: "Reading" },
        { id: 4, name: "Crazy Kids", city: "Reading" },
        { id: 5, name: "Jungle Mania", city: "Reading" },
        { id: 6, name: "Thames Valley Park", city: "Reading" },
        
    );

    getVenues(): Array<Venue> {
        return this.venues;
    }

    getVenue(id: number): Venue {
        return this.venues.filter((venue) => venue.id === id)[0];
    }
}

export class Venue {
    constructor(public id: number, public name: string, public city: string) { }
}