import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleContact = () => {
	const { slug } = useParams();
	const [contact, setContact] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
        const fetchContact = () => {
            fetch(`https://playground.4geeks.com/contact/agendas/${slug}`)
                .then((response) => {
                    if (!response.ok) throw new Error("Error al cargar el contacto.");
                    return response.json();
                })
                .then((data) => {
                    if (data) {
                        setContact(data);
                    } else {
                        throw new Error("Contacto no encontrado.");
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        };
    
        fetchContact();
    }, [slug]);

	if (loading) return <div className="text-center mt-5">Cargando...</div>;
	if (error) return <div className="text-danger text-center mt-5">{error}</div>;

	return (
		<div className="container mt-5">
			<h1 className="mb-4">Información del Contacto</h1>
			{contact ? (
				<div className="card shadow-sm">
					<div className="card-body">
						<h5 className="card-title">{contact.slug}</h5>
						<p className="card-text">
							<strong>Teléfono:</strong> {contact.contacts[0]?.phone}
						</p>
						<p className="card-text">
							<strong>Correo:</strong> {contact.contacts[0]?.email}
						</p>
						<p className="card-text">
							<strong>Dirección:</strong> {contact.contacts[0]?.address}
						</p>
					</div>
				</div>
			) : (
				<p className="text-muted">No se encontró información del contacto.</p>
			)}
		</div>
	);
};

export default SingleContact;
