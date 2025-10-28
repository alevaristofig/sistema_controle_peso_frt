import { useState } from "react";

const useAlimento = () => {

    const formatarCaloria = (caloria: string): string | number => {
         if(caloria === '') {
            return '0.00';
        } else {
            let valor1 = caloria + '';
            let valor2 = parseInt(valor1.replace(/[\D]+/g,''));
            let valor3 = valor2 + '';
            valor3 = valor3.replace(/([0-9]{2})$/g, ".$1");
    
            if (valor3.length > 6) {
                valor3 = valor3.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
            }
    
            return valor3;
        }
    }

    return { formatarCaloria };
}

export default useAlimento;