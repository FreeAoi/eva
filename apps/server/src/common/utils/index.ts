const singularize = (str: string) => {
    return str.endsWith('s') ? str.slice(0, -1) : str;
};

export { singularize };
