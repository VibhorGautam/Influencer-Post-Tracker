'use client';

import { useState, useEffect } from 'react';
import { Campaign } from '../types/influencer';
import { 
  loadCampaigns, 
  createCampaign, 
  deleteCampaign, 
  getActiveCampaign, 
  setActiveCampaign,
  migrateLegacyData 
} from '../utils/campaignStorage';
import { FolderIcon, PlusIcon, DeleteIcon, XIcon } from './Icons';

interface CampaignManagerProps {
  onCampaignChange: (campaign: Campaign | null) => void;
}

const CampaignManager: React.FC<CampaignManagerProps> = ({ onCampaignChange }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [activeCampaign, setActiveCampaignState] = useState<Campaign | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showCampaignList, setShowCampaignList] = useState(false);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [newCampaignDescription, setNewCampaignDescription] = useState('');

  useEffect(() => {
    // Migrate legacy data on first load
    migrateLegacyData();
    
    // Load campaigns and active campaign
    const loadedCampaigns = loadCampaigns();
    setCampaigns(loadedCampaigns);
    
    const active = getActiveCampaign();
    setActiveCampaignState(active);
    onCampaignChange(active);
  }, [onCampaignChange]);

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCampaignName.trim()) return;
    
    const campaign = createCampaign(newCampaignName.trim(), newCampaignDescription.trim() || undefined);
    
    const updatedCampaigns = loadCampaigns();
    setCampaigns(updatedCampaigns);
    
    // Set as active campaign
    setActiveCampaign(campaign.id);
    setActiveCampaignState(campaign);
    onCampaignChange(campaign);
    
    // Reset form
    setNewCampaignName('');
    setNewCampaignDescription('');
    setShowCreateForm(false);
  };

  const handleSwitchCampaign = (campaign: Campaign) => {
    setActiveCampaign(campaign.id);
    setActiveCampaignState(campaign);
    onCampaignChange(campaign);
    setShowCampaignList(false);
  };

  const handleDeleteCampaign = (campaignId: string) => {
    if (campaigns.length <= 1) {
      alert('Cannot delete the last campaign. Create a new campaign first.');
      return;
    }
    
    if (confirm('Are you sure you want to delete this campaign? All influencers in this campaign will be permanently deleted.')) {
      deleteCampaign(campaignId);
      
      const updatedCampaigns = loadCampaigns();
      setCampaigns(updatedCampaigns);
      
      // If deleted campaign was active, switch to first available campaign
      if (activeCampaign?.id === campaignId) {
        const newActive = updatedCampaigns[0] || null;
        if (newActive) {
          setActiveCampaign(newActive.id);
          setActiveCampaignState(newActive);
          onCampaignChange(newActive);
        } else {
          setActiveCampaignState(null);
          onCampaignChange(null);
        }
      }
    }
  };

  return (
    <div className="relative">
      {/* Campaign Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FolderIcon className="text-slate-600" size={20} />
          <span className="text-sm font-medium text-slate-600">Campaign:</span>
          <button
            onClick={() => setShowCampaignList(!showCampaignList)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <span className="font-medium text-slate-900">
              {activeCampaign?.name || 'No Campaign Selected'}
            </span>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon size={16} />
          New Campaign
        </button>
      </div>

      {/* Campaign List Dropdown */}
      {showCampaignList && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
          <div className="p-4 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">Select Campaign</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className={`flex items-center justify-between p-4 hover:bg-slate-50 transition-colors ${
                  activeCampaign?.id === campaign.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex-1 cursor-pointer" onClick={() => handleSwitchCampaign(campaign)}>
                  <div className="font-medium text-slate-900">{campaign.name}</div>
                  {campaign.description && (
                    <div className="text-sm text-slate-500 mt-1">{campaign.description}</div>
                  )}
                  <div className="text-xs text-slate-400 mt-1">
                    Created {new Date(campaign.createdAt).toLocaleDateString()}
                  </div>
                </div>
                {campaigns.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCampaign(campaign.id);
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <DeleteIcon size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-slate-200">
            <button
              onClick={() => setShowCampaignList(false)}
              className="w-full px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Create Campaign Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Create New Campaign</h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <XIcon size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateCampaign} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Campaign Name *
                </label>
                <input
                  type="text"
                  required
                  value={newCampaignName}
                  onChange={(e) => setNewCampaignName(e.target.value)}
                  className="form-input"
                  placeholder="Enter campaign name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={newCampaignDescription}
                  onChange={(e) => setNewCampaignDescription(e.target.value)}
                  className="form-input resize-none"
                  rows={3}
                  placeholder="Enter campaign description"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Backdrop for campaign list */}
      {showCampaignList && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowCampaignList(false)}
        />
      )}
    </div>
  );
};

export default CampaignManager;
