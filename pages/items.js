/** @jsx jsx */
import {jsx} from '@emotion/core';
import {
  Text,
  Flex,
  Spinner,
} from "@chakra-ui/core"

import React, {useState, useRef} from 'react';
import {useItems} from '../graphql/hooks';
import {useAuth} from '../utils/auth';
import {useSearch} from '../utils/search';
import {withApollo} from '../graphql/apollo';
import App from '../components/App';
import DealCard from '../components/DealCard';
import AddItemModal from '../components/AddItemModal';
import EditItemModal from '../components/EditItemModal';
import EmptySearch from '../components/EmptySearch';
import ColumnHeader from '../components/Table/ColumnHeader';
import ItemDetail from '../components/Table/ItemDetail';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { MinusCircleIcon } from '@heroicons/react/solid';
import { UPDATE_ITEM_QUANTITY_MUTATION } from '../graphql/mutations';
import {useQuery, useMutation} from '@apollo/react-hooks';

const ItemsPage = () => {
    const {userId} = useAuth();
    // const {dayOfWeek, alcoholTypeFilters, search} = useSearch();
    // const {data, loading} = useDeals(dayOfWeek);
    const {data, loading} = useItems({});
    const [updateQuantity] = useMutation(UPDATE_ITEM_QUANTITY_MUTATION);
    const [quantityUpdating, setQuantityUpdating] = useState(0);
    //
    // const matchesSearch = (deal) => deal.description.toLowerCase().includes(search.toLowerCase());
    // const matchesAlcoholType = (deal) => alcoholTypeFilters.includes(deal.alcoholType);
    const allItems = data ? data.items : [];
    //// TEMP:
    const item = {name: 'Portillo Malbec 1.5L', price: 38, quantity: 5, markup: 24, margin: 36, supplier: 'Hellen', department: 'Tonys'};
    // const filteredDeals = allDeals.filter(matchesSearch).filter(matchesAlcoholType);

    const [items, setItems] = useState([
      {
        name: "Portillo Marlbec 1.5L",
        id: 1,
        price: 15,
        markup: "78%",
        margin: "45%",
        quantity: 10,
        supplier: "Hartley",
        department: "Spencer",
        createdAd: "August 17",
      },
      {
        name: "Lillet Roce 750 ml",
        id: 2,
        price: 23.45,
        markup: "85%",
        margin: "43%",
        quantity: 0,
        supplier: "Hartley",
        department: "Spencer",
        createdAd: "August 17",
      },
      {
        name: "Bombay 200ml",
        id: 3,
        price: 25.60,
        markup: "79%",
        margin: "33%",
        quantity: 3,
        supplier: "Hartley",
        department: "Spencer",
        createdAd: "August 17",
      },
    ]);

    const columns = React.useMemo(
      () => [
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Price",
          accessor: "price",
        },
        {
          Header: "Markup",
          accessor: "markup",
        },
        {
          Header: "Margin",
          accessor: "margin",
        },
        {
          Header: "Quantity",
          accessor: "quantity",
        },
        {
          Header: "Supplier",
          accessor: "supplier",
        },
        {
          Header: "Department",
          accessor: "department",
        },
        {
          Header: "Created At",
          accessor: "createdAt",
        },
      ],
      [],
    )

    const quantityChange = (id, increment) => {
      if (increment) {
        let updatedItems = items.map((item) => item.id === id ? {
          ...item,
          quantity: item.quantity+1
        } : item);
        setItems(updatedItems);
      } else {
        let updatedItems = items.map((item) => item.id === id ? {
          ...item,
          quantity: item.quantity-1
        } : item);
        setItems(updatedItems);
      }
      let item = items.filter((item) => {return item.id === id});
      // setTimeout(() => {
      //   updateQuantity({
      //     variables: {
      //       id: item.id,
      //       quantity: item.quantity
      //     }
      //   })
      // }, 5000);
    }

    return (
        <App width="full" maxWidth="1280px" mx="auto" px={6} py={6}>
            {loading ? (
                <Flex pt={24} align="center" justify="center">
                    <Spinner size="xl" label="Loading Items" />
                </Flex>
            ) : (
                <>
                    <Flex mt={8} display={['block', 'none', 'none', 'none']}>
                        <AddItemModal />
                    </Flex>
                    <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
                      <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                              <thead>
                                  <tr>
                                      {
                                        columns.map((column) => (
                                          <ColumnHeader
                                            title={column.Header}
                                            />
                                        ))
                                      }
                                      <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                      </th>
                                  </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                      {
                                        items.map((item) => (
                                          <tr>
                                             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                                 <div className="flex items-center">
                                                     <div>
                                                         <div className="text-sm leading-5 text-gray-800">{item.name}</div>
                                                     </div>
                                                 </div>
                                             </td>
                                             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                                 <div className="text-sm leading-5 text-blue-900">{item.price}</div>
                                             </td>
                                             <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{item.markup}</td>
                                             <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{item.margin}</td>
                                             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                                             <div className="flex items-center py-1 justify-around">
                                               <MinusCircleIcon onClick={() => quantityChange(item.id, false)} className="h-5 w-5 text-blue-500 hover:text-blue-700 active:text-blue-700"/>{item.quantity}<PlusCircleIcon onClick={() => quantityChange(item.id, true)} className="h-5 w-5 text-blue-500 hover:text-blue-700 active:text-blue-700"/>
                                             </div>
                                             </td>
                                             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">{item.supplier}</td>
                                             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">{item.department}</td>
                                             <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">{item.createdAt}</td>
                                             <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                                                 <EditItemModal item={item}/>
                                             </td>
                                          </tr>
                                        ))
                                      }
                              </tbody>
                          </table>
                      </div>
                  </div>
                </>
            )}
        </App>
    );
};

export default withApollo(ItemsPage, {
    ssr: false
});
