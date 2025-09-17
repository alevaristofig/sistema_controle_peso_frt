import { ReactElement, useState } from "react";

import useToken from "../../hooks/Token/tokenHook";

import Modal  from "react-bootstrap/Modal";

const ModalToken = (): ReactElement => {

    const { revalidarToken } = useToken();
    
    const [showModal, setShowModal] = useState<boolean>(true);

    const refreshToken = (): void => {
        revalidarToken();

        setShowModal(false);
    }

    return(
        <>
            <Modal show={showModal}>
                <Modal.Body>
                    <h4 className="text-primary">O token expirou, favor revalidar o login</h4>
                </Modal.Body>
                <Modal.Footer>
                    <div className="text-decoration-none fw-bold">
                        <button className="btn btn-primary" onClick={refreshToken}>Revalidadar</button>
                    </div>   
                </Modal.Footer>
            </Modal>
        </>
    )

}