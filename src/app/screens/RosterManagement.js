import React, { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Trash2,
  CheckCircle,
  Save,
  Share2,
  UserPlus,
  Edit,
  AlertCircle,
} from "lucide-react";
import { db, auth } from "../../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Logo from "../../marketing-site/components/Logo";
import Modal from "react-modal"; // Ensure you have react-modal installed
import BetaFeedback from "../../components/BetaFeedback";
import EditRosterModal from "../components/EditRosterModal";
import ConfirmDialog from "../components/ConfirmDialog";

const BETA_ROSTER_LIMIT = 2;

const RosterManagement = ({ onRosterSelect }) => {
  const navigate = useNavigate();
  const [rosters, setRosters] = useState([]);
  const [currentRoster, setCurrentRoster] = useState({
    name: "",
    players: [],
    sharedWith: [],
    organizationId: "",
    isPublic: false,
  });
  const [isCreating, setIsCreating] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSharing, setIsSharing] = useState(false);
  const [shareEmail, setShareEmail] = useState("");
  const [selectedRoster, setSelectedRoster] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingRoster, setEditingRoster] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userEmail) {
      loadRosters();
    }
  }, [userEmail]);

  const loadRosters = async () => {
    //if (!userEmail) return;
    try {
      // Query rosters where user is either owner or in sharedWith array
      const userEmail = auth.currentUser?.email;
      const rostersQuery = query(
        collection(db, "rosters"),
        where("access", "array-contains", userEmail)
      );

      const publicRostersQuery = query(
        collection(db, "rosters"),
        where("isPublic", "==", true)
      );

      const [userRostersSnapshot, publicRostersSnapshot] = await Promise.all([
        getDocs(rostersQuery),
        getDocs(publicRostersQuery),
      ]);

      const userRosters = userRostersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        canEdit: doc.data().ownerId === auth.currentUser?.uid,
      }));

      const publicRosters = publicRostersSnapshot.docs
        .filter((doc) => !userRosters.some((r) => r.id === doc.id))
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          canEdit: doc.data().ownerId === auth.currentUser?.uid,
        }));

      setRosters([...userRosters, ...publicRosters]);
    } catch (err) {
      setError("Failed to load rosters");
      console.error("Error loading rosters:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) {
      setError("Player name cannot be empty");
      return;
    }

    if (
      currentRoster.players.some(
        (p) => p.name.toLowerCase() === newPlayerName.toLowerCase()
      )
    ) {
      setError("Player already exists in roster");
      return;
    }

    setCurrentRoster((prev) => ({
      ...prev,
      players: [
        ...prev.players,
        {
          id: Date.now(),
          name: newPlayerName.trim(),
          addedBy: auth.currentUser?.email,
          addedAt: new Date().toISOString(),
        },
      ],
    }));
    setNewPlayerName("");
    setError("");
  };

  const handleRemovePlayer = async (playerId, rosterId) => {
    if (rosterId) {
      // Removing from existing roster
      try {
        const rosterRef = doc(db, "rosters", rosterId);
        const roster = rosters.find((r) => r.id === rosterId);
        const updatedPlayers = roster.players.filter((p) => p.id !== playerId);
        await updateDoc(rosterRef, { players: updatedPlayers });
        setRosters((prev) =>
          prev.map((r) =>
            r.id === rosterId ? { ...r, players: updatedPlayers } : r
          )
        );
      } catch (err) {
        setError("Failed to remove player");
        console.error("Error removing player:", err);
      }
    } else {
      // Removing from new roster being created
      setCurrentRoster((prev) => ({
        ...prev,
        players: prev.players.filter((p) => p.id !== playerId),
      }));
    }
  };

  const handleRosterUpdate = (updatedRoster) => {
    setRosters((prev) =>
      prev.map((r) =>
        r.id === editingRoster.id ? { ...r, ...updatedRoster } : r
      )
    );
  };

  const hasReachedRosterLimit = () => {
    const userOwnedRosters = rosters.filter(
      roster => roster.ownerId === auth.currentUser?.uid
    );
    return userOwnedRosters.length >= BETA_ROSTER_LIMIT;
  };

  const handleSaveRoster = async () => {
    if (hasReachedRosterLimit()) {
      setError(`Beta version is limited to ${BETA_ROSTER_LIMIT} rosters. Please delete an existing roster to create a new one.`);
      return;
    }

    if (!currentRoster.name.trim()) {
      setError("Roster name is required");
      return;
    }

    if (currentRoster.players.length < 5) {
      setError("Roster must have at least 5 players");
      return;
    }

    try {
      const userEmail = auth.currentUser?.email;
      const rosterData = {
        ...currentRoster,
        ownerId: auth.currentUser?.uid,
        ownerEmail: userEmail,
        access: [userEmail],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "rosters"), rosterData);
      const newRoster = {
        ...rosterData,
        id: docRef.id,
        canEdit: true,
      };
      setRosters((prev) => [...prev, newRoster]);
      setCurrentRoster({
        name: "",
        players: [],
        sharedWith: [],
        isPublic: false,
      });
      setIsCreating(false);
      setError("");
    } catch (err) {
      setError("Failed to save roster");
      console.error("Error saving roster:", err);
    }
  };

  const openModal = (roster) => {
    setSelectedRoster(roster);
    setIsModalOpen(true);
  };

  const openTrashModal = (roster) => {
    setSelectedRoster(roster);
    setIsDeleteModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoster(null);
  };

  const confirmDelete = () => {
    if (selectedRoster) {
      handleDeleteRoster(selectedRoster.id);
    }
    closeModal();
  };

  const handleDeleteRoster = async (rosterId) => {
    try {
      const roster = rosters.find((r) => r.id === rosterId);
      if (roster.ownerId !== auth.currentUser?.uid) {
        setError("You don't have permission to delete this roster");
        return;
      }

      await deleteDoc(doc(db, "rosters", rosterId));
      setRosters((prev) => prev.filter((r) => r.id !== rosterId));
    } catch (err) {
      setError("Failed to delete roster");
      console.error("Error deleting roster:", err);
    }
  };

  const handleShareRoster = async (rosterId) => {
    if (!shareEmail || !shareEmail.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const rosterRef = doc(db, "rosters", rosterId);
      await updateDoc(rosterRef, {
        access: arrayUnion(shareEmail),
        sharedWith: arrayUnion({
          email: shareEmail,
          sharedAt: new Date().toISOString(),
          sharedBy: auth.currentUser?.email,
        }),
      });

      setRosters((prev) =>
        prev.map((r) =>
          r.id === rosterId
            ? {
                ...r,
                access: [...(r.access || []), shareEmail],
                sharedWith: [
                  ...(r.sharedWith || []),
                  {
                    email: shareEmail,
                    sharedAt: new Date().toISOString(),
                    sharedBy: auth.currentUser?.email,
                  },
                ],
              }
            : r
        )
      );

      setShareEmail("");
      setIsSharing(false);
    } catch (err) {
      setError("Failed to share roster");
      console.error("Error sharing roster:", err);
    }
  };

  const handleTogglePublic = async (roster) => {
    if (roster.ownerId !== auth.currentUser?.uid) {
      setError("You don't have permission to modify this roster");
      return;
    }

    try {
      const rosterRef = doc(db, "rosters", roster.id);
      await updateDoc(rosterRef, {
        isPublic: !roster.isPublic,
        updatedAt: serverTimestamp(),
      });

      setRosters((prev) =>
        prev.map((r) =>
          r.id === roster.id ? { ...r, isPublic: !r.isPublic } : r
        )
      );
    } catch (err) {
      setError("Failed to update roster visibility");
      console.error("Error updating roster visibility:", err);
    }
  };

  const BetaLimitWarning = () => {
    if (!hasReachedRosterLimit()) return null;

    return (
      <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start space-x-3">
        <AlertCircle className="text-yellow-500 flex-shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="font-semibold text-yellow-800">Beta Version Limit Reached</h4>
          <p className="text-sm text-yellow-700">
            During beta, each user is limited to {BETA_ROSTER_LIMIT} rosters. 
            Please delete an existing roster to create a new one.
          </p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading rosters...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Logo />
          </div>
          {!isCreating && (
            <button
              onClick={() => {
                if (hasReachedRosterLimit()) {
                  setError(`Beta version is limited to ${BETA_ROSTER_LIMIT} rosters. Please delete an existing roster to create a new one.`);
                  return;
                }
                setIsCreating(true);
              }}
              disabled={hasReachedRosterLimit()}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                hasReachedRosterLimit()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Plus size={20} className="mr-2" />
              Create New Roster
            </button>
          )}
        </div>

        <BetaLimitWarning />

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {isCreating ? (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold mb-4">Create New Roster</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Roster Name
                </label>
                <input
                  type="text"
                  value={currentRoster.name}
                  onChange={(e) =>
                    setCurrentRoster((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter roster name"
                />
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={currentRoster.isPublic}
                  onChange={(e) =>
                    setCurrentRoster((prev) => ({
                      ...prev,
                      isPublic: e.target.checked,
                    }))
                  }
                  className="rounded"
                />
                <label htmlFor="isPublic" className="text-sm text-gray-700">
                  Make this roster public
                </label>
              </div>

              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  className="flex-1 p-2 border rounded-md"
                  placeholder="Enter player name"
                  onKeyPress={(e) => e.key === "Enter" && handleAddPlayer()}
                />
                <button
                  onClick={handleAddPlayer}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Add Player
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentRoster.players.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                  >
                    <span>{player.name}</span>
                    <button
                      onClick={() => handleRemovePlayer(player.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setCurrentRoster({ name: "", players: [] });
                    setError("");
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveRoster}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <Save size={18} className="mr-2" />
                  Save Roster
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rosters.map((roster) => (
              <div
                key={roster.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center">
                        {roster.name}
                        {roster.isPublic && (
                          <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            Public
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Owner: {roster.ownerEmail}
                      </p>
                    </div>
                    {roster.canEdit && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingRoster(roster)}
                          className="text-gray-500 hover:text-gray-600"
                        >
                          <Edit size={18} />
                        </button>
                       
                        <button
                          onClick={() => openTrashModal(roster)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500">
                      {roster.players.length} players
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {roster.players.map((player) => (
                        <span
                          key={player.id}
                          className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          {player.name}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => onRosterSelect(roster)}
                      className="mt-2 w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center"
                    >
                      <CheckCircle size={18} className="mr-2" />
                      Select Roster
                    </button>
                  </div>
                  <ConfirmDialog
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                    title="Delete Roster"
                    message="Are you sure you want to delete this roster?"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        
      </div>
      <EditRosterModal
        roster={editingRoster}
        isOpen={!!editingRoster}
        onClose={() => setEditingRoster(null)}
        onUpdate={handleRosterUpdate}
      />
      <BetaFeedback />
    </div>
  );
};

export default RosterManagement;
