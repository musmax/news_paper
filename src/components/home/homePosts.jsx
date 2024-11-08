import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../../stores/utils/thunk';
import { Button, Spinner } from 'react-bootstrap';
import Masonry from 'react-masonry-css';
import { LinkContainer } from 'react-router-bootstrap';
import Moment from 'react-moment';


const HomePosts = () => {
    const dispatch = useDispatch();
    const homePosts = useSelector((state) => state.posts);

        useEffect(() => {
            if (homePosts.articles.items.length <= 0) {
                dispatch(fetchPosts({page:1, limit:6, order:"desc"}));
            }
        }, [])
    

    const loadMoreArticles = () => {
        const page = (homePosts.articles.page) + 1;
        console.log(page);
        dispatch(fetchPosts({page, limit: 6, order: "desc"}));
    }

  return (
    <div>

    <Masonry
    className="my-masonry-grid"
    columnClassName='my-masonry-grid_column'
    breakpointCols={{default:3, 800:2, 400:1}}
    >
        {homePosts.articles ? 
        homePosts.articles.items.map((post) => (
            <div key={post.id}>
            <img 
                style={{width:'100%', height:'100px'}}
                alt='random images'
                src={`${post.image}?${post.id}`} />
            <div className="author">
                <span>{post.author} - </span>
                <Moment format='DD MMMM YYYY'>{post.createdAt}</Moment>
            </div>
            <div className="content">
                <div className="title">{post.title}</div>
                <div className="excerpt">{post.excerpt}</div>
                <LinkContainer to={`/article/${post.id}`} className='mt-3'>
            <Button variant='light'>Read more</Button>
            </LinkContainer>
            </div>
            </div>
        ))
        : null}

    </Masonry>

        {homePosts.loading ? 
        <div style={{textAlign:'center'}}>
            <Spinner
            animation='border'
            role='status'
            >
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
        : null}
        {!homePosts.articles.end && !homePosts.loading
         ?
        <Button 
        variant='outline-dark'
        onClick={() => loadMoreArticles()}
        >Load more Articles</Button>
        : 
        null
        }
    </div>
  )
}

export default HomePosts