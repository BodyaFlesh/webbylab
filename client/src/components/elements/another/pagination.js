import React, { Component } from 'react';

class Pagination extends Component{

    countMax = () =>{
        const { perPage, count } = this.props;
        if(count !== 0){
            let reminder = count % perPage;
            let maxPages = Math.floor(count / perPage);
            if(reminder > 0){
                maxPages++;
            }
            return maxPages;
        }
        return 0;
    }

    handlerChangePage = (operator) => {
        const { changePage, currentPage } = this.props;
        operator === 0 ? changePage(currentPage - 1) : changePage(currentPage + 1);
    }

    render(){

        const { currentPage } = this.props;
        const maxPage = this.countMax();

        return(
            <div className="col-12">
                <div className="row justify-content-end">
                    <nav>
                        <ul className="pagination">
                            {
                                currentPage !== 1 
                                ? (<li className="page-item"><button onClick={() => this.handlerChangePage(0)} type="button" className="btn btn-primary"><span aria-hidden="true">«</span></button></li>)
                                : null
                            }
                            {
                                currentPage < maxPage
                                ? (<li className="page-item"><button onClick={() => this.handlerChangePage(1)} type="button" className="btn btn-primary"><span aria-hidden="true">»</span></button></li>)
                                : null
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }

}

export default Pagination;