export interface Paragraph{
    text: string,
    tags: string[],
    id:string,
    shown:boolean
}

export interface Choice {
    text: string,
    id:string
}

export type DomRect = {
    x:number;
    y:number;
    width:number;
    height:number;
}