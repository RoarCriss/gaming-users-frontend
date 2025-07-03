
export const searchGamesInDatabaseApi = async (bodyParam) => {
    const response = await fetch("http://localhost:3000/games/search", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: bodyParam })
    })
    if (response){
        const data = await response.json();
        return data;
    }
}
