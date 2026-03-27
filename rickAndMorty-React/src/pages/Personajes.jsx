import CardPj from "@/components/CardPj";
import { useState, useMemo } from "react";
import { useApi } from "@/hooks/useApi";

const Personajes = () => {
    const [page, setPage] = useState(1);
    const [filtro, setFiltro] = useState({
        status: "",
        species: "",
        type: "",
        name: "",
        gender: "",
    });

    // Construimos la URL con filtros
    // useMemo para no recrearla en cada render
    const url = useMemo(() => {
        const apiBase = import.meta.env.VITE_API_URL;
        const params = new URLSearchParams();
        params.append("page", String(page));

        Object.entries(filtro).forEach(([key, value]) => {
            if (value !== "") {
                params.append(key, value);
            }
        });

        return `${apiBase}/character?${params.toString()}`;
    }, [page, filtro]);

    const { data: personajes, info, loading, error } = useApi(url);

    const next = () => setPage((p) => p + 1);
    const prev = () => setPage((p) => Math.max(1, p - 1));

    // Cuando cambia un filtro, reseteamos a página 1
    const handleFilterChange = (key, value) => {
        setFiltro((prev) => ({ ...prev, [key]: value }));
        setPage(1);
    };

    return (
        <main className="Personajes">
            <h2 className="Personaje-title">Personajes</h2>

            <div className="Search">
                <input
                    className="Search-label"
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={filtro.name}
                    onChange={(e) => handleFilterChange("name", e.target.value)}
                />

                <label className="Search-label">Filtrar por especie:
                    <select
                        id="filtro-species"
                        onChange={(e) => handleFilterChange("species", e.target.value)}
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
                        onChange={(e) => handleFilterChange("status", e.target.value)}
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
                        onChange={(e) => handleFilterChange("gender", e.target.value)}
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
                <button onClick={prev} disabled={page === 1}>Anterior</button>
                {page} / {info.pages || "?"}
                <button onClick={next} disabled={page >= (info.pages || 1)}>siguiente</button>
            </div>

            <section className="Card">
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    personajes.map((p) => <CardPj key={p.id} {...p} />)
                )}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
            </section>
        </main>
    );
};

export default Personajes;
