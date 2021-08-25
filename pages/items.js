/** @jsx jsx */
import {jsx} from '@emotion/core';
import {
  Text,
  Flex,
  Spinner,
} from "@chakra-ui/core"

import {useItems} from '../graphql/hooks';
import {useAuth} from '../utils/auth';
import {useSearch} from '../utils/search';
import {withApollo} from '../graphql/apollo';
import App from '../components/App';
import DealCard from '../components/DealCard';
import AddItemModal from '../components/AddItemModal';
import EmptySearch from '../components/EmptySearch';
import ColumnHeader from '../components/Table/ColumnHeader';
import ItemDetail from '../components/Table/ItemDetail';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { MinusCircleIcon } from '@heroicons/react/solid';

const ItemsPage = () => {
    const {userId} = useAuth();
    // const {dayOfWeek, alcoholTypeFilters, search} = useSearch();
    // const {data, loading} = useDeals(dayOfWeek);
    const {data, loading} = useItems({});
    //
    // const matchesSearch = (deal) => deal.description.toLowerCase().includes(search.toLowerCase());
    // const matchesAlcoholType = (deal) => alcoholTypeFilters.includes(deal.alcoholType);
    const allItems = data ? data.items : [];
    // const filteredDeals = allDeals.filter(matchesSearch).filter(matchesAlcoholType);
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
                                      <th scope="col" class="relative px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                      </th>
                                  </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                      <tr>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                              <div className="flex items-center">
                                                  <div>
                                                      <div className="text-sm leading-5 text-gray-800">Portillo Malbec 1.5L</div>
                                                  </div>
                                              </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                              <div className="text-sm leading-5 text-blue-900">15</div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">78%</td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">45%</td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
                                            <div className="flex items-center py-1 justify-around">
                                              <MinusCircleIcon className="h-5 w-5 text-blue-500"/>10<PlusCircleIcon className="h-5 w-5 text-blue-500"/>
                                            </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">Hartley</td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">Spencer</td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">August 17</td>
                                                <td class="px-6 py-4 whitespace-nowrap border-b border-gray-500 text-right text-sm font-medium">
                                                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                                                </td>
                                </tr>
                                     <tr>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                              <div className="flex items-center">
                                                  <div>
                                                      <div className="text-sm leading-5 text-gray-800">Lillet Roce 750 ml</div>
                                                  </div>
                                              </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                              <div className="text-sm leading-5 text-blue-900">23.45</div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">85%</td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">43%</td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">0</td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">Hartley</td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">Spencer</td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">August 17</td>
                                          <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                                              <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">View Details</button>
                                          </td>
                                </tr>
                                <tr>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                              <div className="flex items-center">
                                                  <div>
                                                      <div className="text-sm leading-5 text-gray-800">Bombay 200ml</div>
                                                  </div>
                                              </div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                              <div className="text-sm leading-5 text-blue-900">25.60</div>
                                          </td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">79%</td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">33%</td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">0</td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">Hartley</td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">Spencer</td>
                                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">August 17</td>
                                          <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                                              <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">View Details</button>
                                          </td>
                                </tr>
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
