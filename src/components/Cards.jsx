import React, { useState, useEffect } from "react";

export default function Cards({ user }) {
  const [repos, setRepos] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${user.login}/repos`
        );
        const data = await response.json();
        if (response.ok) {
          setRepos(data);
        } else {
          console.log("Repositorio no encontrado:", data.message);
          setRepos([]);
        }
      } catch (error) {
        console.error("Error al cargar repositorios:", error.message);
      }
    };

    if (user) {
      fetchRepos();
    }
  }, [user]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 24);
  };

  const visibleRepos = repos.slice(0, visibleCount);

  return (
    <>
      <div className="bg-[#20293a] grid grid-cols-1 place-items-center md:grid-cols-2 gap-5 p-3">
        {visibleRepos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            className="w-full h-auto "
            target="_blank"
          >
            <div
              className="flex flex-col w-full text-white/80 h-auto rounded-2xl p-4 gap-3 
             cursor-pointer transition-all duration-300 ease-in-out 
             transform hover:scale-[1.02] hover:-translate-y-1 
             hover:shadow-[0_0_15px_rgba(0,123,255,0.3)] 
             hover:border hover:border-blue-500 
             hover:bg-[#1c1e45]"
              style={{
                background:
                  "linear-gradient(95deg, #111729 3%, #1d1b48 99.61%)",
              }}
            >
              <h2 className="font-semibold">{repo.name}</h2>
              <p className="text-white/50 text-[15px]">
                {repo.description || "Sin descripción"}
              </p>
              <div className="flex gap-2.5">
                <div className="flex items-center gap-1">
                  <img src="/public/Nesting.svg" alt="Forks" />
                  <span>{repo.forks_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <img src="/public/Star.svg" alt="Stars" />
                  <span>{repo.stargazers_count}</span>
                </div>
              </div>
              <p className="text-[12px] text-white/50">
                Actualizado: {new Date(repo.updated_at).toLocaleDateString()}
              </p>
            </div>
          </a>
        ))}
      </div>

      {visibleCount < repos.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleShowMore}
            className="cursor-pointer pb-10 text-white rounded-lg transition-colors"
          >
            View all repositories
          </button>
        </div>
      )}
    </>
  );
}
