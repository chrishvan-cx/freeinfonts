import React, { Suspense } from 'react';
import  Nprobar from './Nprobar'





const ListNew = React.lazy(() => import("./New"));
// const ListNew = React.lazy(() =>
//     import("./New").then((module) => {
//         return new Promise((resolve) => {
//             setTimeout(() => {
//                 resolve(module);
//             }, 3000);
//         });
//     })
// );
function News() {
    return (
        <>
            <Suspense fallback={<Nprobar />}>
                <ListNew />
            </Suspense>
        </>
    )
}

export default News
