const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			loadContacts: () => {
				fetch("https://playground.4geeks.com/contact/agendas")
					.then((response) => {
						if (!response.ok) throw new Error("Error al cargar los contactos");
						return response.json();
					})
					.then((data) => {
						setStore({ contacts: data.agendas });
					})
					.catch((error) => {
						console.error("Error cargando contactos:", error);
					});
			},

			createContact: (contact) => {
				fetch(`https://playground.4geeks.com/contact/agendas/${contact.name}`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(contact)
				})
					.then((response) => {
						if (!response.ok) throw new Error("Error al crear el contacto");
						return response.json();
					})
					.then(() => {
						getActions().loadContacts();
					})
					.catch((error) => {
						console.error("Error creando contacto:", error);
					});
			},

			updateContact: (contact, updatedContact) => {
				fetch(`https://playground.4geeks.com/contact/agendas/${contact.slug}/contacts/${contact.id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(updatedContact)
				})
					.then((response) => {
						if (!response.ok) throw new Error("Error al actualizar el contacto");
						return response.json();
					})
					.then(() => {
						getActions().loadContacts();
					})
					.catch((error) => {
						console.error("Error actualizando contacto:", error);
					});
			},

			deleteContact: (slug) => {
				fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, {
					method: "DELETE"
				})
					.then((response) => {
						if (!response.ok) throw new Error("Error al eliminar el contacto");
						getActions().loadContacts();
					})
					.catch((error) => {
						console.error("Error eliminando contacto:", error);
					});
			},

			confirmDelete: (id, showModal, setShowModal) => {
				setShowModal(true);
				const handleConfirm = () => {
					getActions()
						.deleteContact(id)
						.then(() => {
							setShowModal(false);
						})
						.catch((error) => {
							console.error("Error confirmando eliminación:", error);
						});
				};
				return {
					confirm: handleConfirm,
					cancel: () => setShowModal(false)
				};
			}
		}
	};
};

export default getState;
