import gql from 'graphql-tag';

export const GET_ITEMS_QUERY = gql`
  query getItems {
    items {
      id
      margin
      markup
      name
      price
      supplier
      created_at
      department
    }
  }
`;

export const GET_DEALS_QUERY = gql`
    query getDeals($dayOfWeek: String!) {
        deals(where: {daysActive: {dayOfWeek: {_eq: $dayOfWeek}}}) {
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
`;

export const GET_LOCATIONS_QUERY = gql`
    query {
        locations {
            id
            name
            address
            imageUrl
            lat
            long
            city {
                id
                name
                state
                zip
            }
            deals {
                id
            }
        }
    }
`;

export const GET_CITIES_QUERY = gql`
    query {
        cities {
            id
            zip
            state
            name
            mapZoom
            long
            lat
        }
    }
`;
