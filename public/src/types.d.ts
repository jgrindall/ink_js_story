export type Choice = {
    text: string,
    type: "choice" | "something",
    id:string
}

export type ParagraphContent = {
    text: string,
    type: "text" | "link"
}

export type Paragraph = {
    tags: Tags,
    contents: ParagraphContent[],
    id:string
}

export type Block = Choice | Paragraph;

export type StoryContinueEvent = {
    data:{
        variables: any;
        paragraph: Paragraph,
        choices:Choice[]
    }
};

export type Tags = Partial<{
    classNames: string[],
    effects: string[],
    images: string[],
    a: number,
    link:string
}>;

