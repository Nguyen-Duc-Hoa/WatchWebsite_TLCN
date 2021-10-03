import React from 'react'
import { Comment, Avatar } from 'antd';

function Commenting({ avatar, author, content, datetime, children, actions }) {
    return (
        <Comment
            actions={!actions && [<span key="comment-nested-reply-to">Reply to</span>]}
            author={author}
            datetime={datetime}
            avatar={
                <Avatar
                    src={avatar}
                    alt={author}
                />
            }
            content={content}
        >
            {children && null}
        </Comment>
    )
}

export default Commenting
