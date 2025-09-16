import { ReactElement, useRef, useEffect } from "react"

const Paginacao = (dados: any): ReactElement => {

    const divPaginacao = useRef(null);

    const montarPaginas = () => {
        console.log(divPaginacao.current);
    }

    useEffect(() => {
        montarPaginas()
    },[]);

    return(
        <>
            <div id="divPaginacao" ref={divPaginacao}>                            
            </div>
        </>
    )
}

export default Paginacao;