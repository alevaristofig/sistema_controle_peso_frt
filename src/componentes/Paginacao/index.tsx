import React, { ReactElement, useRef, useEffect } from "react"

const Paginacao = (dados: any): ReactElement => {

    const divPaginacao = useRef<HTMLDivElement>(null);

    /*const montarPaginas = () => {        
        if(divPaginacao !== null) { 
            console.log(divPaginacao.current);
            //divPaginacao!.current!.innerText = "Paginacao";
           //  divPaginacao!.current!.createElement('div');
           let div = React.createElement("div",{className: "col"});

           divPaginacao!.current!.appendChild(div);
        }
    }*/

   /* useEffect(() => {
        montarPaginas()
    },[]);*/

    return(
        <>
            <div id="divPaginacao" ref={divPaginacao}>   
                <div className='col'>
                    <nav aria-label='Navegação de página exemplo'>
                        <ul className='pagination justify-content-center'>
                            <li className='page-item'>
                                <a className='page-link'href='/${dados.url}/0'>Primeiro</a>
                            </li>
                        </ul> 
                    </nav> 
                </div>                     
            </div>
        </>
    )
}

export default Paginacao;