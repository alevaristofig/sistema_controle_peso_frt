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
    //console.log('valor hook', valor);
            return parseFloat(valor);
            //return parseFloat(peso);
        }
    }

    return { formatarPeso };
}

export default usePeso;