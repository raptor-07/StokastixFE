const isJwtVerified = async () => {
    try {
        const jwtToken = localStorage.getItem("jwtToken");

        const serializedData = JSON.stringify({
            token: jwtToken,
        });

        const res = await fetch("http://localhost:4000/auth/verify-login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: serializedData,
        });

        const data = await res.json();

        return data.result;
    } catch (error) {
        alert('Try Again later! Internal problem');
        throw error;
    }
};

export default isJwtVerified;
