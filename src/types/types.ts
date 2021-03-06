
export interface INote {
    text: string,
    sign: string,
    tz: string,
    date?: ICountryTime;
}


export interface ICountryTime {
    abbreviation: string,
    client_ip: string,
    datetime: string,
    day_of_week: string,
    day_of_year: string,
    dst: boolean,
    dst_from: string | null,
    dst_offset: number,
    dst_until: string | null,
    raw_offset: number,
    timezone: string,
    unixtime: number,
    utc_datetime: string,
    utc_offset: string,
    week_number: number
}



export interface ITimeZone {
    data: INote,
    list: INote[]
}


export interface IProps {
    data: INote,
    setTime: (timeZonse: ITimeZone) => void;
    setList: (list: INote) => void;
    list: INote[]
}



export interface IListSigns {
    list: INote[]
}



export interface IListProps {
    list: INote[],
    setLists: (lists: IListSigns) => void;
}
