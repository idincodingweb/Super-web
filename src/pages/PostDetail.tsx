import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { Calendar, Clock, ArrowLeft, MessageCircle } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  created_at: string;
  image_url: string;
  views: number;
}

interface Comment {
  id: number;
  post_id: number;
  author: string;
  content: string;
  created_at: string;
  admin_reply?: string;
}

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState({
    author: '',
    content: '',
  });

  useEffect(() => {
    if (id) {
      fetchPost();
      fetchComments();
      
    }
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if(post){
      trackPageView();
    }
  }, [post])

  const trackPageView = async () => {
    if (!id) return;

    // Update total views in posts table (asumsi ini jalan terus)
    if(post){
      await supabase
        .from('posts')
        .update({ views: post.views + 1 })
        .eq('id', id);
    }


    // Track daily views
    const today = new Date().toISOString().split('T')[0];

    // First try to update existing record
    const { data: existingView, error: viewError } = await supabase
      .from('post_views')
      .select('*')
      .eq('post_id', id)
      .eq('date', today)
      .single();

    if (viewError) {
      console.error("Error fetching view count", viewError)
    }

    if (existingView) {
      // Update existing record
      await supabase
        .from('post_views')
        .update({ views: existingView.views + 1 })
        .eq('id', existingView.id);
    } else {
      // Create new record
      await supabase
        .from('post_views')
        .insert([{ post_id: id, date: today, views: 1 }]);
    }
  };

  const fetchPost = async () => {
    const { data: post } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (post) {
      setPost(post);
      fetchRelatedPosts(post.category);
    }
  };

  const fetchRelatedPosts = async (category: string) => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('category', category)
      .neq('id', id)
      .limit(3);

    if (data) {
      setRelatedPosts(data);
    }
  };

  const fetchComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', id)
      .order('created_at', { ascending: false });

    if (data) {
      setComments(data);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    const { error } = await supabase
      .from('comments')
      .insert([
        {
          post_id: id,
          author: newComment.author,
          content: newComment.content,
        },
      ]);

    if (!error) {
      fetchComments();
      setNewComment({ author: '', content: '' });
    }
  };

  if (!post) return null;

  return (
    <article className="min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <div className="space-y-4">
            <span className="category-badge bg-primary/20 text-white">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-300">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {format(new Date(post.created_at), 'MMMM dd, yyyy')}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                {format(new Date(post.created_at), 'HH:mm')}
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={16} />
                {comments.length} comments
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Image */}
        <div className="relative -mt-20 mb-12 rounded-xl overflow-hidden shadow-2xl">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full aspect-video object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose max-w-none mb-16">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Related Posts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                to={`/post/${relatedPost.id}`}
                className="post-card group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={relatedPost.image_url}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold group-hover:text-primary transition-colors duration-200">
                    {relatedPost.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Comments</h2>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-12">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your name"
                value={newComment.author}
                onChange={(e) =>
                  setNewComment({ ...newComment, author: e.target.value })
                }
                className="input-field"
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Your comment"
                value={newComment.content}
                onChange={(e) =>
                  setNewComment({ ...newComment, content: e.target.value })
                }
                className="textarea-field"
                rows={4}
                required
              />
            </div>
            <button type="submit" className="primary-button">
              Post Comment
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-card">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold">{comment.author}</span>
                  <span className="text-gray-500 text-sm">
                    {format(new Date(comment.created_at), 'MMM dd, yyyy • HH:mm')}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
                {comment.admin_reply && (
                  <div className="mt-4 pl-4 border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                    <p className="font-medium text-blue-800 mb-2">Admin Reply:</p>
                    <p className="text-blue-900">{comment.admin_reply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostDetail;
