import React from 'react';
import Layout from '@/Shared/LayoutGuest';

const Index = () => {
    return (
        <div>
            <h1 className='mb-8 text-3xl font-bold'>Trang việc làm Zalo</h1>
        </div>
    )
}

Index.layout = page => <Layout title="Việc làm zalo" children={page}/>

export default Index;