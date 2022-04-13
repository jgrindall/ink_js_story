const isContained = (rect:DOMRect | undefined, containerRect: DOMRect | undefined): boolean => {
    return !!(containerRect && rect && rect.top >= containerRect.top && rect.bottom <= containerRect.bottom);
};

export {
    isContained
}
