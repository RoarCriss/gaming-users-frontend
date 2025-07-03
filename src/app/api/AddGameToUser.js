export const addGameToUser = async (bodyParam) => {
    const response = await fetch("http://localhost:3000/games/add", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: bodyParam })
    })
    if (response){
        const data = await response.json();
        return data;
    }
}