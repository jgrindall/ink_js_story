const isContained = (rect:DOMRect | undefined, containerRect: DOMRect | undefined): boolean => {
    return !!(containerRect && rect && rect.top >= containerRect.top && rect.bottom <= containerRect.bottom);
};

const getOverlapPercent = (rect:DOMRect | undefined, containerRect: DOMRect | undefined): number => {
    return 50;
}


export {
    isContained,
    getOverlapPercent
}
