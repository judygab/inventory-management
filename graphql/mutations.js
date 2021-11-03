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

export const UPDATE_ITEM_MUTATION = gql`
    mutation updateItemByID($item_id: uuid!, $item_price: numeric!, $item_department: String!, $item_margin: numeric!, $item_markup: numeric!, $item_name: String!, $item_supplier: String!) {
      update_items_by_pk(_set: {price: $item_price, department: $item_department, margin: $item_margin, markup: $item_markup, name: $item_name, supplier: $item_supplier}, pk_columns: {id: $item_id}) {
        department
        margin
        markup
        name
        price
        supplier
        updated_at
      }
    }
`;

export const INSERT_ITEM_MUTATION = gql`
  mutation insertItemByOne($department: String!, $margin: numeric, $markup: numeric, $name: String!, $price: numeric, $supplier: String!) {
    insert_items_one(object: {department: $department, margin: $margin, markup: $markup, name: $name, price: $price, supplier: $supplier}) {
      created_at
      department
      id
      margin
      markup
      name
      price
      supplier
      updated_at
    }
  }
`;
