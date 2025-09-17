import { ReactElement } from "react";

const Paginacao = (dados: any): ReactElement => {   

    const montarLinks = () => { 
        const links = [];

        links.push(<li className='page-item'><a className='page-link'href={`/${dados.url}/0`}>Primeiro</a></li>);

        for(var i=1; i< dados.pesos.totalPages+1; i++) {           
           links.push(<li className="page-item"><a className="page-link" href={`/${dados.url}/${i-1}`}>{i}</a></li>);
        }

        links.push(<li className='page-item'><a className='page-link' href={`/${dados.url}/${i-2}`}>Último</a></li>);

        return links;
    }

    return(
        <>
            <div id="divPaginacao">   
                <div className='col'>
                    <nav aria-label='Navegação das páginas'>
                        <ul className='pagination justify-content-center'>                            
                            {montarLinks()}                            
                        </ul> 
                    </nav> 
                </div>                     
            </div>
        </>
    )
}

export default Paginacao;