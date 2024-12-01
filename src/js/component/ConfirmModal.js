import React from "react";

const ConfirmModal = ({ show, onConfirm, onCancel }) => {
	if (!show) return null;

	return (
		<div className="modal show" tabIndex="-1" style={{ display: "block" }} aria-modal="true" role="dialog">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Confirmación</h5>
						<button
							type="button"
							className="btn-close"
							aria-label="Close"
							onClick={onCancel}
						></button>
					</div>
					<div className="modal-body">
						<p>¿Estás seguro de que deseas eliminar este contacto?</p>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-danger" onClick={onConfirm}>
							Eliminar
						</button>
						<button type="button" className="btn btn-secondary" onClick={onCancel}>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
