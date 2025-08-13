import { ReactElement } from "react";

type TituloProps = {
    nome: String,
    children?: ReactElement   
}

const Titulo = ({children, nome}: TituloProps): ReactElement => {
    return(
        <div className='titulo'>
            {children}
            <span>{nome}</span>
        </div>
    )
}

export default Titulo;