async function getSpots() {
    const res = await fetch('/spots'); // Uses relative URL
    return res.json();
};

export default getSpots;