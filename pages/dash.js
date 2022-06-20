import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Dash = () => {
 
  const deleteNote = async () => {
    const userId = router.query.id;
    try {
        const deleted = await fetch(`http://localhost:3000/api/uses/${userId}`, {
            method: "Delete"
        });

        router.push("/");
    } catch (error) {
        console.log(error)
    }
}


  return (
    <div>
<h1>Hello</h1>
    </div>
  )
}

export default Dash

