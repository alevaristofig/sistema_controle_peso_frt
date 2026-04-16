import { LiaWeightHangingSolid } from 'react-icons/lia';
import { IPeso } from "../../interfaces/peso/peso.interface";

interface IHomePeso {
    primeiroPeso: IPeso,
    ultimoPeso: IPeso
}

const HomePeso: React.FC<IHomePeso> = ({primeiroPeso, ultimoPeso}) => {

    const IconePeso = LiaWeightHangingSolid as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    return(
        <>
            <IconePeso color="#000" fontSize={24} />
            <span className='ms-2'>Peso Inicial: {primeiroPeso && primeiroPeso.valor}</span>
            <span className='ms-2'>Peso Atual: {ultimoPeso && ultimoPeso.valor}</span>
            <span className='ms-2'>
                 {
                    primeiroPeso!.valor - ultimoPeso!.valor > 0
                    ?
                        <label>Perdeu: {(primeiroPeso.valor - ultimoPeso!.valor).toFixed(2)}</label>
                    :                            
                        <label>Ganhou: {(primeiroPeso.valor - ultimoPeso!.valor).toFixed(2)}</label>
                }
            </span>
            <span className='ms-4'>IMC Inicial: {primeiroPeso && primeiroPeso.imc}</span>
            <span className='ms-2'>IMC Atual: {ultimoPeso && ultimoPeso!.imc}</span>
            <span className='ms-2'>
                {                    
                    primeiroPeso.imc - ultimoPeso!.imc > 0
                    ?
                        <label>Perdeu: {(primeiroPeso.imc - ultimoPeso!.imc).toFixed(2)}</label>
                    :                        
                        <label>Ganhou: {(primeiroPeso.imc - ultimoPeso!.imc).toFixed(2)}</label>
                }
            </span>
        </>
    )
}

export default HomePeso;