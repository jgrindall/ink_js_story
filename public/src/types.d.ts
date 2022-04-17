export type Choice = {
    text: string,
    id:string
}

export type Paragraph = {
    tags: Tags,
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

export type Tags = Partial<{
    classNames: string[],
    effects: string[],
    images: string[],
    a: number
}>;

