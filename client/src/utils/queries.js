import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query getMe {
        me {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;