import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Card, Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCard';

const Home = () => {
    const {loading, error, data} = useQuery(FETCH_POST_QUERY, {
    });
    
    return (
        <Grid columns={3}>
            <Grid.Row>
                <h1>최근 게시글</h1>
            </Grid.Row>
            <Grid.Row>
                {loading ? (<h1>Loading posts..</h1>)
                : (
                    data && data.getPosts.map(post => (
                        <Grid.Column key={post.id} style={{marginBottom:"20px"}}>
                            <PostCard postData={post} />
                        </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
    );
}

const FETCH_POST_QUERY = gql`
    {
        getPosts {
            id createdAt username likeCount commentCount
            likes {
                createdAt
                username
                email
            }
            comments {
                createdAt
                username
                id
                body
                email
            }
        }
    }
`;


export default Home
