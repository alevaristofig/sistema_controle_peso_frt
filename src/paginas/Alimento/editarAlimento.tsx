import { ReactElement, useState } from 'react';
import { useParams } from 'react-router';


const EditarAlimento = (): ReactElement => {

    const { id } = useParams();
    return(
        <>
            <div>Editar Alimento</div>
        </>
    )
}

export default EditarAlimento;