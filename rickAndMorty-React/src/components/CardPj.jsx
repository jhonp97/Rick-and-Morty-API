import { Link } from "react-router-dom";

const CardPj = ({ id, name, image, species, status, gender }) => {
    const genderEmoji = {
        Female: "♀️",
        Male: "♂️",
        unknown: "❓",
        "n/a": "❌",
    };

    return (
        <Link to={`/personaje/${id}`} className="Card-personaje">
            <h2>{name}</h2>
            <img src={image} alt={name} loading="lazy" />

            <p>
                <strong>Género:</strong> {genderEmoji[gender] || "🤷"}
            </p>

            <p>
                <strong>Especie:</strong> {species === "Alien" ? "👽" : species}
            </p>

            <p>
                <strong>Estado:</strong>{" "}
                <span style={status === "Dead" ? { color: "red" } : {}}>
                    {status}
                </span>
            </p>
        </Link>
    );
};

export default CardPj;
