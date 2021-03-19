import React from 'react'
import moment from 'moment'
import { Button, Card, Icon, Image, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const PostCard = ({postData:{body,createdAt, id,username,likeCount,commentCount,likes}}) => {

    const likePost = () => {

    }
    const likeComment = () => {
        
    }

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated="right"
                    size="mini"
                    src="/images/avatar/large/steve.jpg"
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                {/* 좋아요 버튼 */}
                <Button as="div" labelPosition="right" onClick={likePost}>
                    <Button color="teal" basic>
                        <Icon name="heart" style={{margin:"0"}}/>
                    </Button>
                    <Label basic color="teal" pointing="left">
                        {likeCount}
                    </Label>
                </Button>
                {/* 코멘트 버튼 */}
                <Button as="div" labelPosition="right" onClick={likePost}>
                    <Button color="blue" basic>
                        <Icon name="comment" style={{margin:"0"}}/>
                    </Button>
                    <Label basic color="blue" pointing="left">
                        {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    );
}

export default PostCard
