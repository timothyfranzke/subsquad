import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db, auth } from '../config/firebase';
import { MessageCircle, Clock, User, Mail } from 'lucide-react';

const AdminFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'suggestion', 'issue', 'feature'

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      const feedbackQuery = query(
        collection(db, 'feedback'),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(feedbackQuery);
      const feedbackData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()
      }));

      setFeedback(feedbackData);
    } catch (err) {
      setError('Failed to load feedback');
      console.error('Error loading feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'suggestion':
        return 'text-blue-600 bg-blue-100';
      case 'issue':
        return 'text-red-600 bg-red-100';
      case 'feature':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (date) => {
    if (!date) return 'Unknown date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredFeedback = filter === 'all' 
    ? feedback
    : feedback.filter(item => item.type === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading feedback...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <MessageCircle className="mr-2" />
            User Feedback
          </h1>
          <p className="text-gray-600 mt-1">
            Review and manage feedback from users
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="mb-4 flex space-x-2">
          {['all', 'suggestion', 'issue', 'feature'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-md ${
                filter === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              {filteredFeedback.length} {filter === 'all' ? 'Total' : filter} {filteredFeedback.length === 1 ? 'Item' : 'Items'}
            </h2>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredFeedback.map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-sm ${getTypeColor(item.type)}`}>
                        {item.type}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={16} className="mr-1" />
                        {formatDate(item.createdAt)}
                      </div>
                    </div>

                    <p className="text-gray-900">{item.content}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User size={16} className="mr-1" />
                        {item.userId || 'Anonymous'}
                      </div>
                      {item.userEmail && (
                        <div className="flex items-center">
                          <Mail size={16} className="mr-1" />
                          {item.userEmail}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredFeedback.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                No feedback found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFeedback;