import React from 'react';
import { ApiServiceConsumer } from '../../context';

const withApiService = () => (Wrapper) => {
    return (props) => {
        return(
            <ApiServiceConsumer>
                {
                    (apiService) => {
                        return (
                            <Wrapper {...props} apiService={apiService} />
                        )
                    }
                }
            </ApiServiceConsumer>
        ) 
    }
}

export default withApiService;