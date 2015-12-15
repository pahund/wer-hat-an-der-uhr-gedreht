export default str => {
    return str.toLowerCase()
        .replace(/[-_]+/g, " ")
        .replace(/[^\w\s]/g, "")
        .replace(/ (.)/g, $1 => $1.toUpperCase())
        .replace(/ /g, "");
};
