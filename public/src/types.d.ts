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

export type StoryContinueEvent = {
    data:{
        variables: any;
        paragraphs: Paragraph[],
        choices:Choice[]
    }
};