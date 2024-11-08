import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById } from '../../stores/utils/thunk';
import { useParams } from 'react-router-dom';
import Moment from 'react-moment';
import { clearPostById } from '../../stores/reducers/posts';

const Post = () => {
  const post = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, []);

  useEffect(()=>{
    return () => {
      clearPostById();
    }
  }, [])

  return (
    <div className='article_container'>
      {post.postById ? (
        <div className=''>
          <h1>{post.postById.title}</h1>
          <div
            className='image'
            style={{
              backgroundImage: `url(${post.postById.imagexl})`,
            }}
          ></div>
          <div className='author'>
            <span>Created By: {post.postById.author} - </span>
          </div>
          <Moment format='DD MMMM YYYY'>{post.postById.createdAt}</Moment>
        </div>
      ) : null}
      <div className='mt-3 content'>
        {post.postById?.content ? (
          <div
            dangerouslySetInnerHTML={{
              __html: post.postById.content,
            }}
          ></div>
        ) : (
          <p>Content not available.</p>
        )}
      </div>
    </div>
  );
};

export default Post;
