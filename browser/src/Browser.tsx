import { useState, useEffect } from 'react'
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Search, Clock, TrendingUp, Eye, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface NewsItem {
  id: number
  title: string
  description: string
  category: string
  readTime: string
  views: string
  imageUrl?: string
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "Breaking: Major Tech Innovation Announced",
    description: "Revolutionary AI breakthrough promises to transform how we interact with technology in our daily lives.",
    category: "Technology",
    readTime: "3 min read",
    views: "12.5k"
  },
  {
    id: 2,
    title: "Global Climate Summit Reaches Historic Agreement",
    description: "World leaders commit to unprecedented measures to combat climate change and reduce carbon emissions.",
    category: "Environment",
    readTime: "5 min read",
    views: "8.2k"
  },
  {
    id: 3,
    title: "Stock Market Hits Record High Amid Economic Recovery",
    description: "Major indices surge as investors show renewed confidence in post-pandemic economic growth.",
    category: "Finance",
    readTime: "4 min read",
    views: "15.7k"
  },
  {
    id: 4,
    title: "New Medical Breakthrough in Cancer Treatment",
    description: "Scientists develop promising new therapy showing remarkable results in early clinical trials.",
    category: "Health",
    readTime: "6 min read",
    views: "9.8k"
  }
]

const searchResults: NewsItem[] = [
  {
    id: 5,
    title: "Search Result: AI Technology Trends 2024",
    description: "Latest developments in artificial intelligence and machine learning shaping the future of technology.",
    category: "Technology",
    readTime: "7 min read",
    views: "25.3k"
  },
  {
    id: 6,
    title: "Search Result: Climate Change Solutions",
    description: "Innovative approaches and technologies being deployed to address global warming challenges.",
    category: "Environment",
    readTime: "8 min read",
    views: "18.9k"
  },
  {
    id: 7,
    title: "Search Result: Investment Strategies for 2024",
    description: "Expert analysis on market trends and investment opportunities in the current economic climate.",
    category: "Finance",
    readTime: "10 min read",
    views: "32.1k"
  }
]

export default function SearchFirstBrowser() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    if (searchQuery.length > 0) {
      setIsSearching(true)
      const timer = setTimeout(() => {
        setShowResults(true)
        setIsSearching(false)
      }, 800)
      return () => clearTimeout(timer)
    } else {
      setShowResults(false)
      setIsSearching(false)
    }
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setIsSearching(true)
      setTimeout(() => {
        setShowResults(true)
        setIsSearching(false)
      }, 600)
    }
  }

  const NewsCard = ({ item, index }: { item: NewsItem; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
        <div className="bg-gray-200 border-2 border-dashed rounded-t-xl w-full h-48" />
        <CardHeader>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="text-blue-600 font-medium">{item.category}</span>
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{item.readTime}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>{item.views}</span>
              </span>
            </div>
          </div>
          <CardTitle className="text-xl mt-2 group-hover:text-blue-600 transition-colors">
            {item.title}
          </CardTitle>
          <CardDescription className="mt-2">
            {item.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="ghost" className="group-hover:translate-x-1 transition-transform">
            Read More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Search Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/50 to-gray-100" />
        
        <div className="relative z-10 w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Discover Everything
            </h1>
            <p className="text-xl text-gray-600">
              Search through thousands of articles, news, and insights
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
              <Input
                type="search"
                placeholder="What are you looking for today?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className={`
                  pl-12 pr-4 py-4 text-lg w-full rounded-full border-2
                  transition-all duration-300 bg-white shadow-lg
                  ${isSearchFocused || searchQuery
                    ? 'border-blue-500 shadow-2xl shadow-blue-500/20 scale-105'
                    : 'border-gray-200 hover:border-gray-300'
                  }
                  ${isSearching ? 'animate-pulse' : ''}
                `}
              />
              <AnimatePresence>
                {searchQuery && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <Button
                      type="submit"
                      size="sm"
                      className="rounded-full px-6"
                      disabled={isSearching}
                    >
                      {isSearching ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Search className="h-4 w-4" />
                        </motion.div>
                      ) : (
                        'Search'
                      )}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search suggestions */}
            {!searchQuery && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 flex flex-wrap justify-center gap-2"
              >
                {['Technology', 'Finance', 'Health', 'Environment'].map((topic) => (
                  <Button
                    key={topic}
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery(topic)}
                    className="text-sm"
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {topic}
                  </Button>
                ))}
              </motion.div>
            )}
          </motion.form>
        </div>

        {/* Scroll indicator */}
        {!searchQuery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="animate-bounce">
              <ArrowRight className="h-6 w-6 text-gray-400 rotate-90" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Content Section */}
      <div className="px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {!showResults && !searchQuery && (
              <motion.div
                key="news"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest News</h2>
                  <p className="text-gray-600">Stay updated with the most recent developments</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {mockNews.map((item, index) => (
                    <NewsCard key={item.id} item={item} index={index} />
                  ))}
                </div>
              </motion.div>
            )}

            {showResults && searchQuery && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Search Results for "{searchQuery}"
                  </h2>
                  <p className="text-gray-600">
                    Found {searchResults.length} results in 0.3 seconds
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {searchResults.map((item, index) => (
                    <NewsCard key={item.id} item={item} index={index} />
                  ))}
                </div>
              </motion.div>
            )}

            {isSearching && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block"
                >
                  <Search className="h-12 w-12 text-blue-500" />
                </motion.div>
                <p className="mt-4 text-lg text-gray-600">Searching for amazing content...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}