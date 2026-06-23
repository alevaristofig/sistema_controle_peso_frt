import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

const EditarExercicio = (): ReactElement => {
    const dispatch = useDispatch();
    const { id } = useParams();
    
    return (
        <>
            Editar Exercicio
        </>
    )
}

export default EditarExercicio;