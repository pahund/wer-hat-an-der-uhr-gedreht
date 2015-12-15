export default str => {
    return str.split(/[^\w]+/).map(
        (token, index) => token.replace(/^(.)/,
            $1 => index === 0 ? $1.toLowerCase() : $1.toUpperCase())).join("");
};
