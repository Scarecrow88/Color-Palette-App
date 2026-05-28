import React, {useEffect, useState} from "react";
import "../css/radioFormContent.css";
export default function Palette () {
    const [palettes, setPalettes] = useState ([]);
    const [selected, setSelected] = useState (null);
    useEffect (() => {
        fetch ("./colors.json")
            .then ((res) => res.json ())
            .then ((data) => {
                setPalettes (data);
            })
            .catch ((err) => console.error ("Error cargando colors.json", err));
    }, []);
    const handleSelect = (index) => {
        setSelected (index);
    };
    return (
        <main>
            <form className="formbox" name="formbox" id="paletteForm">
                {palettes.map ((_, i) => {
                    const id = `item${i + 1}`;
                    return (
                        <div key={id}>
                            <input
                                type="radio"
                                className="radiob"
                                id={id}
                                name="radiobox"
                                checked={selected === i}
                                onChange={() => handleSelect (i)}
                            />
                            <label htmlFor={id}>Paleta {i + 1}</label>
                            <br />
                        </div>
                    );
                })}
                <button
                    className="formbutton"
                    type="button"
                    onClick={() => window.location.reload ()}
                >
                    Recargar pagina
                </button>
            </form>
            {/* Caja de colores */}
            <section
                className="colorsecbox"
                id="secbox"
                style={{display: selected !== null ? "flex" : "none"}}
            >
                {Array (5)
                    .fill (null)
                    .map ((_, idx) => (
                        <div
                            key={idx}
                            id="colorbox"
                            className={`color${idx + 1}`}
                            style={{
                                backgroundColor:
                                    selected !== null && palettes [selected] [idx]
                                        ? palettes [selected] [idx]
                                        : "",
                            }}
                        />
                    ))}
            </section>
            <section
                className={`codesecbox ${selected === null ? "codesecboxoff" : ""}`}
                id="secbox"
            >
                {selected !== null && palettes [selected].map ((hex, idx) => (
                    <div key={idx}>
                        Color {idx + 1}: {hex.toUpperCase ()}
                    </div>
                ))}
            </section>
        </main>
    );
}
