import React from 'react'
import {
    Route
} from 'react-router-dom';

function PublicRoute({ component: Component, path, exact, layout: Layout }) {
    return (
        <Route
            path={path}
            exact={exact}
            render={(props) => {
                return (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                )
            }}
        />
    )
}

export default PublicRoute
