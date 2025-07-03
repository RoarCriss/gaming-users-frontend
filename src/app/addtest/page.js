'use client'

import React from 'react'
import { useState, useEffect } from 'react'
import { searchGamesInDatabase } from '../api/SearchGames'
import { searchGamesInDatabaseApi } from '../api/SearchGameApi'
import { addGameToUser } from '../api/AddGameToUser'





export default function page() {

    const [searchGame, setSearchGame] = useState("")
    const [searchGameApi, setSearchGameApi] = useState("");
    const [gameList, setGameList] = useState({})
    const [gameListApi, setGameListApi] = useState({})
    const [gameListFormated, setGameListFormated] = useState()

    const handleSearchGame = (e) => {
        setSearchGame(e.target.value)
        setSearchGameApi(e.target.value)
    }

    const handleSearchGameApi = (e) => {
        setSearchGameApi(e.target.value)
    }


    // const getGames = async () => {

    //     const test = getGames()
    //         .then((data) => setGameList(data))
    //         .catch((err) => console.error(err))

    //     console.log(test)
    // }


    // const primarySearch = () => {
    //     searchGamesInDatabase(searchGame)
    //         .then((data) => setGameList(data))    // Guardamos los resultados de la búsqueda en el estado
    //         .catch((err) => console.error(err));  // Mostramos cualquier error que ocurra


    // }



    // // API & RAWG API
    // useEffect(() => {

    //     if (searchGame.trim().length === 0) {
    //         setGameList({})
    //         return;
    //     }

    //     const timeout = setTimeout(() => {
    //         searchGamesInDatabase(searchGame)
    //             .then((data) => {
    //                 console.log("Resultados en BBDD:", data);

    //                 if (data.length > 0) {
    //                     setGameList(data);
    //                 } else {
    //                     searchGamesInDatabaseApi(searchGame)
    //                         .then((dataApi) => {
    //                             console.log("Resultados en API externa:", dataApi);
    //                             setGameList(dataApi);
    //                         })
    //                         .catch((err) => console.error("Error en API externa:", err));
    //                 }
    //             })
    //             .catch((err) => console.error("Error en BBDD:", err));
    //     }, 800);
    //     return () => clearTimeout(timeout);


    // }, [searchGame]);



    // SOLO API
    //   useEffect(() => {
    //     // Si el campo de búsqueda está vacío (o solo contiene espacios), no hacemos nada
    //     if (searchGame.trim().length === 0){
    //         setGameList({})
    //         return;
    //     } 

    //     // Iniciamos un temporizador de 800 ms. Si el usuario deja de escribir durante ese tiempo,
    //     // se ejecutará la búsqueda a la base de datos.
    //     const timeout = setTimeout(() => {
    //         searchGamesInDatabase(searchGame)
    //             .then((data) => setGameList(data))    // Guardamos los resultados de la búsqueda en el estado
    //             .catch((err) => console.error(err));  // Mostramos cualquier error que ocurra
    //     }, 800);

    //     // Esta función de limpieza se ejecuta ANTES de que el efecto se vuelva a ejecutar o el componente se desmonte.
    //     // Sirve para cancelar el timeout anterior si el usuario sigue escribiendo antes de los 800 ms,
    //     // evitando que se lance una búsqueda innecesaria.
    //     return () => clearTimeout(timeout);

    //     //Si tu efecto devuelve una función, React la almacenará y la ejecutará antes de volver a ejecutar el efecto o antes de desmontar el componente.

    // }, [searchGame]); 


    //API RAWG
    useEffect(() => {

        if (searchGameApi.trim().length === 0){
            setGameListApi({})
            return;
        } 

        const timeout = setTimeout(() => {
            searchGamesInDatabaseApi(searchGameApi)
                .then((data) => setGameListApi(data))  
                .catch((err) => console.error(err));  
        }, 800);

        return () => clearTimeout(timeout);
        //Si tu efecto devuelve una función, React la almacenará y la ejecutará antes de volver a ejecutar el efecto o antes de desmontar el componente.
    }, [searchGameApi]); 

    const addGame = (id) => {
         addGameToUser(id)
                .then((data) => setGameListApi(data))  
                .catch((err) => console.error(err));  
    }



    return (
        <div style={{ color: "black", backgroundColor: "white", height: "100vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            {/* <div style={{ color: "black" }}>{searchGame}</div> */}
            {/* <div style={{ color: "black" }}>{gameList}</div> */}

            {/* Versión para objetos */}
            {/* <ul>
                {Object.entries(gameList).map(([key, game]) => (
                    <li key={key}>{game.name}</li>
                ))}
            </ul> */}

            <ul>
                {Object.entries(gameListApi).map(([key, game]) => (
                    <li onClick={() => addGame(game.id)} key={key}>{game.name}</li>
                ))}
            </ul> 

            {/* Versión para arrays */}
            {/* {gameList.map((specialProp, specialPropIndex) => (
                <div className='fw-light' key={specialPropIndex}>
                    {<div className='fw-bold'>{specialProp.name}:</div>}
                </div>
            ))} */}

            <label>API</label>
            <input style={{ height: "50px", width: "260px", fontSize: "24px" }} type="search" id="1" name="q1" onChange={handleSearchGame} />
            {/* <label>API RAWG</label>
            <input style={{ height: "50px", width: "260px", fontSize: "24px" }} type="search" id="2" name="q2" onChange={handleSearchGameApi} /> */}

            {/* <button style={{ color: "black" }} onClick={getGames}>Click</button> */}
        </div>
    )
}
