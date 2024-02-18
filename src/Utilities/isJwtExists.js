const isJwtExists = () => {
    if (localStorage.getItem("jwtToken") == null) {
        return false;
    } else {
        return true;
    }
};

export default isJwtExists;