import React, { useState } from "react";

const AddContactModal = ({ show, onClose, onSave }) => {
	const [contact, setContact] = useState({
		name: "",
		phone: "",
		email: "",
		address: ""
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setContact({ ...contact, [name]: value });
	};

	const handleSave = () => {
		onSave(contact);
		setContact({ name: "", phone: "", email: "", address: "" });
		onClose();
	};

	if (!show) return null;

	return (
		<div className="modal show" tabIndex="-1" style={{ display: "block" }} aria-modal="true" role="dialog">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Agregar Nuevo Contacto</h5>
						<button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
					</div>
					<div className="modal-body">
						<div className="mb-3">
							<label className="form-label">Nombre</label>
							<input
								type="text"
								className="form-control"
								name="name"
								value={contact.name}
								onChange={handleChange}
							/>
						</div>
						<div className="mb-3">
							<label className="form-label">Teléfono</label>
							<input
								type="text"
								className="form-control"
								name="phone"
								value={contact.phone}
								onChange={handleChange}
							/>
						</div>
						<div className="mb-3">
							<label className="form-label">Correo Electrónico</label>
							<input
								type="email"
								className="form-control"
								name="email"
								value={contact.email}
								onChange={handleChange}
							/>
						</div>
						<div className="mb-3">
							<label className="form-label">Dirección</label>
							<input
								type="text"
								className="form-control"
								name="address"
								value={contact.address}
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" onClick={onClose}>
							Cancelar
						</button>
						<button type="button" className="btn btn-primary" onClick={handleSave}>
							Guardar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddContactModal;
