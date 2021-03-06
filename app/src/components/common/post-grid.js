import React , {useState, useMemo, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Pagination} from 'antd'
import {TagRow} from './'

export default function PostGrid ({posts}){

    const [pageSize, setPageSize] = useState(9)
    const [current, setCurrent] = useState(1)

    //this recalculated whenever we change the current page or the page size we want to render the correct posts
    const paginatedPosts = useMemo(() => {
        const lastIndex = current * pageSize
        const firstIndex = lastIndex - pageSize

        return posts.slice(firstIndex, lastIndex)
    }, [current, pageSize])

//this executes everytime curren or pageSize are updated

    useEffect(() => {
    window.scroll ({
        top:500,
        left:0,
        behavior: 'smooth'
    })
},[current, pageSize])
    

    return(
        <section className = "grid-pagination-container">
            <section className="post-grid container">
                {paginatedPosts.map((post,index) => (
                    <div className="post-container">
                        <figure>
                            <Link to={post.link}>
                                <img src={require(`../../assets/images/${post.image}`)} alt={post.image}/>
                            </Link>
                        </figure>
                        <TagRow tags={post.categories} />
                        <h2> {post.title}</h2>
                        <p className="author-text">
                            <span style={{color: "#2997ff"}}>
                                By: {post.author} 
                            </span>
                            <span>
                                <p className="description-text">
                                    {post.description}

                                </p>
                            </span>
                        </p>
                        <Link to={post.link}>Read More ... </Link>
                    </div>
                ))}
                
    
            </section>

            <Pagination 
                simple 
                showSizeChanger 
                onShowSizeChange={setPageSize} 
                pageSize={pageSize}
                total={posts.length}
                defaultCurrent={current}
                onChange={setCurrent}
            />

        </section>
    )
}