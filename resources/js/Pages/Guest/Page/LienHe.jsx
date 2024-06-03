import React from 'react';

import Layout from '@/Shared/LayoutGuest';


const Index = () => {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Đây là trang Liên hệ</h1>
    </div>
  );
};

Index.layout = page => <Layout title="Liên hệ" children={page} />;

export default Index;
