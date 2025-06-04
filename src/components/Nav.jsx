// Nav.jsx
import { useState, useEffect } from 'react';
import Body from './Body';

export default function Nav() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  
   useEffect(() => {
    fetch('https://api.github.com/users/github')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.log(err))
  }, [])

  const fetchUser = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${search}`);
      const data = await response.json();

      if (response.ok) {
        setUser(data);
        // console.log(data); // útil para ver qué datos llegan
      } else {
        setUser(null);
        console.log("Usuario no encontrado:", data.message);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  return (
    <div className='w-screen flex flex-col justify-start items-center'>
      {/* Barra de búsqueda */}
      <div className='relative w-full flex flex-col justify-center items-center'>
        <img className='w-screen h-[150px] md:h-[200px]' src="hero-image-github-profile.jpg" alt="hero" />
        <div className='items-center top-7 absolute flex bg-[#20293a] w-[330px] md:w-[360px] h-10 justify-start rounded-lg pl-3'>
          <img className='w-3.5' src="Search.svg" alt="search" />
          <input
            onChange={(e) => setSearch(e.target.value)}
            className='border-0 focus:outline-none text-white w-[300px] h-10 md:w-[320px] pl-3'
            type="text"
            placeholder='username'
            value={search}
            onKeyDown={(e) => {
              if (e.key === 'Enter') fetchUser();
            }}
          />
        </div>
      </div>

      {/* Mostrar Body solo si hay un usuario */}
       {user ? <Body user={user} /> : <p className="text-white mt-40">Busca un usuario y presiona Enter</p>}
    </div>
  );
}
