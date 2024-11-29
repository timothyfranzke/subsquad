import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown, Send, X } from 'lucide-react';
import { auth, db } from '../config/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const FeedbackForm = ({ onClose }) => {
  const [feedbackType, setFeedbackType] = useState('suggestion');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      setError('Please enter your feedback');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await addDoc(collection(db, 'feedback'), {
        type: feedbackType,
        content: feedback,
        userId: auth.currentUser?.uid,
        userEmail: auth.currentUser?.email,
        createdAt: serverTimestamp(),
        status: 'new'
      });

      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
      console.error('Error submitting feedback:', err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" />
        <div className="fixed z-50 bg-white shadow-lg md:max-w-md w-full 
          md:bottom-4 md:right-4 md:rounded-lg
          bottom-0 left-0 right-0 rounded-t-lg p-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 mx-auto mb-4 flex items-center justify-center">
              <ThumbsUp className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600">Your feedback helps make SubSquad better.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed z-50 bg-white shadow-lg md:max-w-md w-full 
        md:bottom-4 md:right-4 md:rounded-lg
        bottom-0 left-0 right-0 rounded-t-lg">
        <div className="flex justify-between items-center p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MessageCircle className="mr-2 text-blue-600" size={20} />
            Beta Feedback
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 md:p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Feedback Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { value: 'suggestion', label: 'Suggestion' },
                  { value: 'issue', label: 'Issue' },
                  { value: 'feature', label: 'Feature Request' }
                ].map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFeedbackType(type.value)}
                    className={`py-2 px-3 text-sm rounded-md ${
                      feedbackType === type.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Feedback
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder={
                  feedbackType === 'suggestion'
                    ? "What would you like to suggest?"
                    : feedbackType === 'issue'
                    ? "What issue are you experiencing?"
                    : "What feature would you like to see?"
                }
                rows={4}
                className="w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center"
              >
                <Send size={16} className="mr-2" />
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          </form>

          <div className="mt-4 pt-4 border-t text-xs text-gray-500">
            Your feedback helps us improve SubSquad during our beta period. Thank you for contributing!
          </div>
        </div>
      </div>
    </>
  );
};

const BetaFeedback = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        >
          <MessageCircle size={24} />
        </button>
      )}
      
      {isOpen && <FeedbackForm onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default BetaFeedback;