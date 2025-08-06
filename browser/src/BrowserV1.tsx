import { useState, useMemo, useEffect } from 'react'
import { Search, X, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"

// Sample news data
const newsItems = [
  {
    id: 1,
    title: "Breaking: Major Tech Company Announces Revolutionary AI Breakthrough",
    excerpt: "A leading technology company has unveiled a groundbreaking AI system that promises to transform how we interact with technology.",
    category: "Technology",
    date: "2024-01-15",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Global Climate Summit Reaches Historic Agreement",
    excerpt: "World leaders have agreed on ambitious new targets to combat climate change, marking a significant milestone in environmental policy.",
    category: "Environment",
    date: "2024-01-14",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Stock Markets Hit Record Highs Amid Economic Optimism",
    excerpt: "Major indices reach all-time highs as investors respond positively to economic indicators and corporate earnings.",
    category: "Business",
    date: "2024-01-13",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop"
  },
  {
    id: 4,
    title: "New Medical Breakthrough Offers Hope for Rare Disease Treatment",
    excerpt: "Researchers announce successful trials for a novel treatment that could benefit millions of patients worldwide.",
    category: "Health",
    date: "2024-01-12",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop"
  },
  {
    id: 5,
    title: "Space Exploration Milestone: First Mars Colony Construction Begins",
    excerpt: "The first permanent human settlement on Mars has officially begun construction, marking a new era in space exploration.",
    category: "Science",
    date: "2024-01-11",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=200&fit=crop"
  },
  {
    id: 6,
    title: "Olympic Games Set to Begin with Spectacular Opening Ceremony",
    excerpt: "Athletes from around the world gather for the opening ceremony of the highly anticipated international sporting event.",
    category: "Sports",
    date: "2024-01-10",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=200&fit=crop"
  }
]

// Trending searches
const trendingSearches = ["AI", "Climate", "Business", "Health", "Space", "Sports"]

export default function NewsApp() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // Filter news based on search query
  const filteredNews = useMemo(() => {
    if (!searchQuery) return []
    
    const query = searchQuery.toLowerCase()
    return newsItems.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.excerpt.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      setIsSearching(true)
      setHasSearched(true)
      setTimeout(() => setIsSearching(false), 500)
    } else {
      setHasSearched(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    setHasSearched(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section - Transforms on search */}
      <div className={`transition-all duration-500 ease-in-out ${hasSearched ? 'fixed top-0 left-0 right-0 z-50 bg-white shadow-lg' : 'min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700'}`}>
        <div className={`transition-all duration-500 ${hasSearched ? 'max-w-4xl mx-auto px-4 py-4' : 'text-center px-4'}`}>
          {!hasSearched && (
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                Discover News
              </h1>
              <p className="text-xl text-blue-100">
                Search millions of articles from around the world
              </p>
            </div>
          )}
          
          <div className={`relative ${hasSearched ? 'max-w-2xl mx-auto' : 'max-w-2xl mx-auto'}`}>
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder={hasSearched ? "Search news..." : "What are you looking for?"}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className={`pl-12 pr-12 py-4 w-full transition-all duration-300 ${
                hasSearched 
                  ? 'rounded-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200' 
                  : 'rounded-full border-0 text-lg bg-white/90 backdrop-blur focus:bg-white focus:ring-4 focus:ring-white/50'
              }`}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {!hasSearched && (
            <div className="mt-8">
              <div className="flex items-center justify-center gap-2 text-blue-100 mb-4">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Trending searches</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-full text-sm hover:bg-white/30 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section - Only shows after search */}
      {hasSearched && (
        <div className="pt-20">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results
              </h2>
              <p className="text-gray-600 mt-1">
                {filteredNews.length} {filteredNews.length === 1 ? 'article' : 'articles'} found for "{searchQuery}"
              </p>
            </div>

            {filteredNews.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredNews.map((item, index) => (
                  <Card 
                    key={item.id}
                    className="hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2"
                    style={{
                      animation: `slideUp 0.5s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                          {item.category}
                        </span>
                        <span className="text-sm text-gray-500">{item.readTime}</span>
                      </div>
                      <CardTitle className="text-lg mt-2 line-clamp-2">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-3">{item.excerpt}</CardDescription>
                    </CardContent>
                    <div className="px-6 pb-4">
                      <p className="text-sm text-gray-500">{item.date}</p>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any articles matching "{searchQuery}". Try searching with different keywords.
                  </p>
                  <Button onClick={clearSearch} variant="outline">
                    Clear search
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Initial News Section - Hidden after search */}
      {!hasSearched && (
        <div className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Stories</h2>
              <p className="text-gray-600">Scroll down to explore today's top headlines</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {newsItems.slice(0, 6).map((item, index) => (
                <Card 
                  key={item.id}
                  className="hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                  style={{
                    animation: `fadeIn 0.5s ease-in-out ${index * 0.1}s both`
                  }}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {item.category}
                      </span>
                      <span className="text-sm text-gray-500">{item.readTime}</span>
                    </div>
                    <CardTitle className="text-lg mt-2 line-clamp-2">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3">{item.excerpt}</CardDescription>
                  </CardContent>
                  <div className="px-6 pb-4">
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}