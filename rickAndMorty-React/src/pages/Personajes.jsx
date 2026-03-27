import CardPj from "@/components/CardPj";
import { useState, useEffect } from "react";

const Personajes = () => {
    const [page, setPage] = useState(1)
    const [personajes, setPersonajes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [info, setInfo] = useState({})
    const [filtro, setFiltro] = useState({
        status: "",
        species: "",
        type: "",
        name: "",
        gender: ""
    })

    useEffect(() => {
        const controller = new AbortController()

        const traerPj = async () => {
            try {
                setLoading(true)
                setError(null)

                const params = new URLSearchParams();
                params.append("page", page)

                Object.entries(filtro).forEach(([key, value]) => {
                    if (value !== "") {
                        params.append(key, value);
                    }
                });

                const apiBase = import.meta.env.VITE_API_URL;
                const response = await fetch(`${apiBase}/character?${params.toString()}`, {
                    signal: controller.signal
                });

                if (!response.ok) {
                    throw new Error(`error ${response.status} - ${response.statusText}`)
                }
                const data = await response.json();

                setPersonajes(data.results)
                setInfo(data.info)
            } catch (error) {
                if (error.name === 'AbortError') return;
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        traerPj()

        return () => controller.abort()
    }, [page, filtro])


    const next = () => {
        setPage(prev => prev + 1);
    }

    const prev = () => {
        setPage(p => Math.max(1, p - 1));
    };

    const cards = personajes.map(p => (
        <CardPj key={p.id} {...p} />
    ))

    return (
        <main className="Personajes">
            <h2 className="Personaje-title">Personajes</h2>

            <div className="Search">
                <input
                    className="Search-label"
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={filtro.name}
                    onChange={(e) => setFiltro({ ...filtro, name: e.target.value })}
                />

                <label className="Search-label">Filtrar por especie:
                    <select
                        id="filtro-species"
                        onChange={(e) => {
                            setFiltro({ ...filtro, species: e.target.value });
                            setPage(1);
                        }}
                        value={filtro.species}
                    >
                        <option value="">Todos</option>
                        <option value="Human">Humanos</option>
                        <option value="Alien">Alien</option>
                    </select>
                </label>


                <label className="Search-label">Filtrar por estado:
                    <select
                        id="filtro-status"
                        onChange={(e) => {
                            setFiltro({ ...filtro, status: e.target.value });
                            setPage(1);
                        }}
                        value={filtro.status}
                    >
                        <option value="">Todos</option>
                        <option value="alive">Vivo</option>
                        <option value="dead">Muerto</option>
                        <option value="unknown">Desconocido</option>
                    </select>
                </label>

                <label className="Search-label">Filtrar por Genero:
                    <select
                        id="filtro-gender"
                        onChange={(e) => {
                            setFiltro({ ...filtro, gender: e.target.value });
                            setPage(1);
                        }}
                        value={filtro.gender}
                    >
                        <option value="">Todos</option>
                        <option value="male">Masculino</option>
                        <option value="female">Femenino</option>
                        <option value="genderless">Sin genero</option>
                        <option value="unknown">Desconocido</option>
                    </select>
                </label>

            </div>

            <div className="Pages">

                <button onClick={prev} disabled={page === 1}> Anterior</button>
                {page} / {info.pages || "?"}
                <button onClick={next} disabled={page >= (info.pages || 1)}>siguiente</button>
            </div>

            <section className="Card">

                {loading ? <p>Cargando...</p> : cards}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}


            </section>
        </main>
    );
}

export default Personajes;