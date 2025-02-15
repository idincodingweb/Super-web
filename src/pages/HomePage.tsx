import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { Calendar, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  created_at: string;
  image_url: string;
}

const POSTS_PER_PAGE = 10;

const HomePage = () => {
  const [latestPost, setLatestPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [currentPage, selectedCategory]);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      
      // First, get the latest post
      const { data: latestPostData, error: latestError } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (latestError) throw latestError;
      if (latestPostData) setLatestPost(latestPostData);

      // Then, get paginated posts
      let query = supabase
        .from('posts')
        .select('*', { count: 'exact' });

      // Apply category filter if selected
      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      // Skip the latest post and apply pagination
      const from = (currentPage - 1) * POSTS_PER_PAGE;
      const to = from + POSTS_PER_PAGE - 1;

      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .neq('id', latestPostData?.id) // Exclude latest post
        .range(from, to);

      if (error) throw error;

      if (data) {
        setPosts(data);
        if (count !== null) setTotalPosts(count - 1); // Subtract 1 for the latest post
      }
    } catch (error) {
      toast.error('Failed to fetch posts');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('category');

      if (error) throw error;

      if (data) {
        const uniqueCategories = [...new Set(data.map(post => post.category))];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      toast.error('Failed to fetch categories');
    }
  };

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            currentPage === i
              ? 'bg-primary text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center justify-center gap-2 mt-12">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>
        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 hover:bg-gray-50"
            >
              1
            </button>
            {startPage > 2 && <span className="text-gray-400">...</span>}
          </>
        )}
        {pages}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-gray-400">...</span>}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white text-gray-600 hover:bg-gray-50"
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-12">
      {/* Featured Post */}
      {latestPost && (
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to={`/post/${latestPost.id}`} className="block group">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="category-badge bg-primary/20 text-white">
                      {latestPost.category}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                      {latestPost.title}
                    </h1>
                  </div>
                  <p className="text-gray-300 line-clamp-3">
                    {latestPost.content.slice(0, 150)}...
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {format(new Date(latestPost.created_at), 'MMMM dd, yyyy')}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      {format(new Date(latestPost.created_at), 'HH:mm')}
                    </div>
                  </div>
                </div>
                <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden group-hover:shadow-xl transition-all duration-300">
                  <img
                    src={latestPost.image_url}
                    alt={latestPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-primary text-white shadow-md shadow-primary/25'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Posts
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className="post-card group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="category-badge">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.content}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={16} />
                  {format(new Date(post.created_at), 'MMMM dd, yyyy')}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No posts found for this category</p>
          </div>
        )}

        {/* Pagination */}
        {posts.length > 0 && renderPagination()}
      </div>
    </main>
  );
};

export default HomePage;
