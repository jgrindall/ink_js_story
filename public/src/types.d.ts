export type Choice = {
    text: string,
    id:string
}

export type Paragraph = {
    tags: string[],
    text: string,
    id:string
}

export type Block = Choice | Paragraph;