import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import SearchFilter from '@/Shared/SearchFilter';
import Pagination from '@/Shared/Pagination';
import CurrencyFormat from '@/Helper/CurrencyFormat';

const Index = () => {
    const { dinhgia } = usePage().props;
    console.log(dinhgia);
    const {
        data,
        meta: { links }
    } = dinhgia;
    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold">Định giá</h1>
            <div className="flex items-center justify-between mb-6">
                <SearchFilter />
                <Link
                    className="btn-indigo focus:outline-none"
                    href={route('dinhgia.create')}
                >
                    <span>Tạo</span>
                    <span className="hidden md:inline"> Định giá</span>
                </Link>
            </div>
            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="font-bold text-left">
                            <th className="px-6 pt-5 pb-4">ID</th>
                            <th className="px-6 pt-5 pb-4">Tên định giá</th>
                            <th className="px-6 pt-5 pb-4">Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(({ id, name, price, deleted_at }) => {
                            return (
                                <tr
                                    key={id}
                                    className="hover:bg-gray-100 focus-within:bg-gray-100"
                                >
                                    <td className="border-t">
                                        <Link
                                            href={route('dinhgia.edit', id)}
                                            className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                                        >
                                            {id}
                                            {deleted_at && (
                                                <Icon
                                                    name="trash"
                                                    className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                                                />
                                            )}
                                        </Link>
                                    </td>
                                    <td className="border-t">
                                        <Link
                                            href={route('dinhgia.edit', id)}
                                            className="flex items-center px-6 py-4 focus:text-indigo-700 focus:outline-none"
                                        >
                                            {name}
                                            {deleted_at && (
                                                <Icon
                                                    name="trash"
                                                    className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                                                />
                                            )}
                                        </Link>
                                    </td>
                                    <td className="border-t">
                                        <Link
                                            tabIndex="-1"
                                            href={route('dinhgia.edit', id)}
                                            className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                                        >
                                           <CurrencyFormat price={price}></CurrencyFormat> 
                                        </Link>
                                    </td>
                                    <td className="w-px border-t">
                                        <Link
                                            tabIndex="-1"
                                            href={route('dinhgia.edit', id)}
                                            className="flex items-center px-4 focus:outline-none"
                                        >
                                            <Icon
                                                name="cheveron-right"
                                                className="block w-6 h-6 text-gray-400 fill-current"
                                            />
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                        {data.length === 0 && (
                            <tr>
                                <td className="px-6 py-4 border-t" colSpan="4">
                                    Không có bất kỳ định giá nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Pagination links={links} />
        </div>
    );
};

Index.layout = page => <Layout title="Tiêu chí" children={page} />;

export default Index;
