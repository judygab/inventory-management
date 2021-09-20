import gql from 'graphql-tag';

export const CREATE_DEAL_MUTATION = gql`
    mutation createDeal(
        $alcoholType: String!
        $description: String!
        $locationId: uuid!
        $daysActive: [deal_day_insert_input!]!
    ) {
        insert_deals(
            objects: {
                alcoholType: $alcoholType
                description: $description
                locationId: $locationId
                daysActive: {data: $daysActive}
            }
        ) {
            returning {
                id
                description
                alcoholType
                userDeals {
                    upvoted
                    userId
                    id
                }
                daysActive {
                    id
                    dayOfWeek
                    startTime
                    endTime
                    allDay
                }
                location {
                    id
                    name
                }
            }
        }
    }
`;

export const UPDATE_USER_DEAL_MUTATION = gql`
    mutation updateUserDeal($upvoted: Boolean!, $dealId: uuid!, $userId: String!) {
        update_user_deal(where: {dealId: {_eq: $dealId}, userId: {_eq: $userId}}, _set: {upvoted: $upvoted}) {
            returning {
                upvoted
                userId
                id
            }
        }
    }
`;

export const INSERT_USER_DEAL_MUTATION = gql`
    mutation insertUserDeal($upvoted: Boolean!, $dealId: uuid!, $userId: String!) {
        insert_user_deal(objects: {upvoted: $upvoted, dealId: $dealId, userId: $userId}) {
            returning {
                upvoted
                userId
                id
            }
        }
    }
`;


export const CREATE_STORE_MUTATION = gql`
   mutation createStore($city: String!, $name: String!, $phone: String!, $state: String!, $street: String!, $taxId: String, $zipCode: Int!) {
     insert_stores(on_conflict: {constraint: stores_pkey}, objects: {city: $city, name: $name, phone: $phone, state: $state, street: $street, taxId: $taxId, zipCode: $zipCode}) {
       returning {
         city
         id
         name
         phone
         state
         street
         taxId
         zipCode
       }
      }
   }
`;
