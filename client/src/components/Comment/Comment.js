import React from 'react'
import { Comment, Avatar } from 'antd';

function Commenting({
    id,
    avatar,
    author,
    content,
    datetime,
    children,
    actions,
    replyFrom,
    onReply }) {
    return (
        <Comment
            actions={!actions &&
                [
                    <span
                        key="comment-nested-reply-to"
                        onClick={() => onReply(id, author, replyFrom)}
                    >Reply to
                    </span>]
            }
            author={author}
            datetime={datetime}
            avatar={
                <Avatar
                    src={avatar || 'https://joeschmoe.io/api/v1/random'}
                    alt={author}
                />
            }
            content={content}
        >
            {children}
        </Comment>
    )
}

export default Commenting
