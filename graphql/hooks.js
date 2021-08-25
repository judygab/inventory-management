import {useQuery} from '@apollo/react-hooks';
import {GET_ITEMS_QUERY} from './queries';
import {calculateScoreAndSortDesc} from '../utils/deals';

// export const useDeals = (dayOfWeek) => {
//     const {loading, error, data} = useQuery(GET_DEALS_QUERY, {
//         variables: {dayOfWeek}
//     });
//
//     if (!loading && data.deals) {
//         return {
//             loading,
//             error,
//             data: {
//                 deals: calculateScoreAndSortDesc(data.deals)
//             }
//         };
//     }
//
//     return {
//         loading,
//         error,
//         data
//     };
// };

export const useItems = () => {
  const {loading, error, data} = useQuery(GET_ITEMS_QUERY, {});

  if (!loading && data) {
    return {
      loading,
      error,
      data: {
        items: items
      }
    };
  }

  return {
    loading,
    error,
    data
  };
};
