export interface People {
    name: string,
    height: string,
    eye_color: string,
    created: string,
}

export interface ResponsePeople {
    count: number,
    results: People[],
}