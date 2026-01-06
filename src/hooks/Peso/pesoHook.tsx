import { use, useState } from "react";

const usePeso = () => {

    const formatarPeso = (peso: string): number => {
        if(peso === '') {
            return 0.00;
        } else {
            let valor = peso + '';
            let valorAux = parseInt(valor.replace(/[\D]+/g,''));
            valor = valorAux + '';
            valor = valor.replace(/([0-9]{2})$/g, ".$1");

            if (valor.length > 6) {
                valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
    
            return parseFloat(valor);
        }
    }

    return { formatarPeso };
}

export default usePeso;