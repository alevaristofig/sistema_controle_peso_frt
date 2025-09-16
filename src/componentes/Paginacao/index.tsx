import { ReactElement, useRef, useEffect } from "react"

const Paginacao = (dados: any): ReactElement => {

    const divPaginacao = useRef<HTMLDivElement>(null);

    const montarPaginas = () => {
        console.log(divPaginacao.current);
        divPaginacao!.current!.innerText = "Paginacao";
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