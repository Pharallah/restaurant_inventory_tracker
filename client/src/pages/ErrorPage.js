import React from 'react'
// import { useRouteError } from "react-router-dom";
import NavBar from '../components/NavBar';

function ErrorPage() {
    // const error = useRouteError()

  
    return (
        <>
            <header>
                <NavBar />
            </header>
            <main>
                <h1>Whoops! Something went wrong!</h1>
            </main>
        </>
  )
}

export default ErrorPage