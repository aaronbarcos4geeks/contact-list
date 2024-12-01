import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import ConfirmModal from "../component/ConfirmModal";
import AddContactModal from "../component/AddContactModal";

const Contacts = () => {
	const { store, actions } = useContext(Context);
	const [showModal, setShowModal] = useState(false);
	const [selectedContactId, setSelectedContactId] = useState(null);
	const [showAddModal, setShowAddModal] = useState(false);

	const handleDeleteClick = (id) => {
		setSelectedContactId(id);
		setShowModal(true);
	};

	const handleConfirmDelete = () => {
		actions.deleteContact(selectedContactId);
		setShowModal(false);
	};

	const handleAddContact = (newContact) => {
		actions.createContact(newContact);
	};

	return (
		<div className="container mt-5">
			<h1 className="mb-4">Contactos</h1>
			<div className="mb-4">
				<button className="btn btn-success" onClick={() => setShowAddModal(true)}>
					Agregar Contacto
				</button>
			</div>
			<div className="row">
				{store.contacts.length > 0 ? (
					store.contacts.map((contact) => (
						<div className="col-md-4 mb-3" key={contact.id}>
							<div className="card shadow-sm">
								<div className="card-body">
									<h5 className="card-title">{contact.slug}</h5>
									<p className="card-text">ID: {contact.id}</p>
									<Link to={`/${contact.slug}`} className="btn btn-primary w-100">
										Ver Contacto
									</Link>
								</div>
								<div className="card-footer">
									<button
										className="btn btn-danger w-100"
										onClick={() => handleDeleteClick(contact.slug)}
									>
										Eliminar
									</button>
								</div>
							</div>
						</div>
					))
				) : (
					<p className="text-muted">No hay contactos disponibles.</p>
				)}
			</div>

			<ConfirmModal
				show={showModal}
				onConfirm={handleConfirmDelete}
				onCancel={() => setShowModal(false)}
			/>

			<AddContactModal
				show={showAddModal}
				onClose={() => setShowAddModal(false)}
				onSave={handleAddContact}
			/>
		</div>
	);
};

export default Contacts;
