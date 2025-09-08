import { Link } from 'react-router-dom'

const BlogPost = (props) => {
  return (
    <div className='flex flex-col gap-4 max-w-[512px]'>
      <Link to={`/blog/${props.slug}`}>
      <img alt={props.name} className='max-h-[650px] object-cover rounded-[40px] aspect-4/5' src={props.image} />
      </Link>
      <Link to={`/blog/${props.slug}`}>
      <h1 className='font-semibold text-black text-xl px-6 hover:underline'>{props.name}</h1>
      </Link>
      <p className='text-sm text-pretty text-black px-6'>{props.shortDescription}</p>
    </div>
  )
}

export default BlogPost
