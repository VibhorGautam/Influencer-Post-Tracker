'use client';

import { useState, useEffect } from 'react';
import { Influencer, StatusType, Campaign, TableFilters, TableSort } from '../types/influencer';
import InfluencerForm from '../components/InfluencerForm';
import InfluencerTable from '../components/InfluencerTable';
import CampaignTotals from '../components/CampaignTotals';
import StatusFilter from '../components/StatusFilter';
import CampaignManager from '../components/CampaignManager';
import TableFiltersComponent from '../components/TableFilters';
import ConfirmDialog from '../components/ConfirmDialog';
import { loadSampleData } from '../utils/sampleData';
import {
  loadInfluencersForCampaign,
  addInfluencerToCampaign,
  updateInfluencerInCampaign,
  deleteInfluencerFromCampaign
} from '../utils/campaignStorage';
import { applyTableFiltersAndSort } from '../utils/tableUtils';
import { PlusIcon, XIcon } from '../components/Icons';

export default function Home() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; influencer: Influencer | null }>({
    isOpen: false,
    influencer: null
  });

  // Table state
  const [filters, setFilters] = useState<TableFilters>({
    search: '',
    platform: 'all',
    status: 'all'
  });
  const [sort, setSort] = useState<TableSort>({
    field: 'username',
    direction: 'asc'
  });

  // Load influencers when campaign changes
  useEffect(() => {
    if (activeCampaign) {
      const campaignInfluencers = loadInfluencersForCampaign(activeCampaign.id);
      setInfluencers(campaignInfluencers);
    } else {
      setInfluencers([]);
    }
  }, [activeCampaign]);

  const addInfluencer = (influencer: Influencer) => {
    if (!activeCampaign) return;

    const newInfluencer = addInfluencerToCampaign(influencer, activeCampaign.id);
    setInfluencers([...influencers, newInfluencer]);
    setShowAddForm(false);
  };

  const updateInfluencer = (id: string, updates: Partial<Influencer>) => {
    const updatedInfluencer = updateInfluencerInCampaign(id, updates);
    if (updatedInfluencer) {
      setInfluencers(influencers.map(inf =>
        inf.id === id ? updatedInfluencer : inf
      ));
    }
  };



  const handleDeleteInfluencer = (id: string) => {
    const influencer = influencers.find(inf => inf.id === id);
    if (influencer) {
      setDeleteConfirm({ isOpen: true, influencer });
    }
  };

  const confirmDelete = () => {
    if (deleteConfirm.influencer) {
      const success = deleteInfluencerFromCampaign(deleteConfirm.influencer.id);
      if (success) {
        setInfluencers(influencers.filter(inf => inf.id !== deleteConfirm.influencer!.id));
      }
    }
    setDeleteConfirm({ isOpen: false, influencer: null });
  };

  const cancelDelete = () => {
    setDeleteConfirm({ isOpen: false, influencer: null });
  };

  const handleLoadSampleData = () => {
    if (!activeCampaign) return;

    loadSampleData();
    const campaignInfluencers = loadInfluencersForCampaign(activeCampaign.id);
    setInfluencers(campaignInfluencers);
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
  };

  // Apply filters and sorting
  const processedInfluencers = applyTableFiltersAndSort(influencers, filters, sort);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Modern Header */}
      <div className="gradient-header text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Influencer Post Tracker
            </h1>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Track your influencer marketing campaigns with style and precision
            </p>
            {influencers.length === 0 && activeCampaign && (
              <button
                onClick={handleLoadSampleData}
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Load Sample Data
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        {/* Campaign Management */}
        <div className="card animate-fade-in mb-8">
          <div className="card-content">
            <CampaignManager onCampaignChange={setActiveCampaign} />
          </div>
        </div>

        {activeCampaign ? (
          <div className="space-y-8 pb-8">
            <CampaignTotals influencers={influencers} />

            {/* Add New Influencer Form */}
            {showAddForm && (
              <div className="card animate-fade-in">
                <div className="card-header">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">
                        Add New Influencer
                      </h2>
                      <p className="text-slate-600 mt-1">
                        Add a new influencer to your campaign tracking
                      </p>
                    </div>
                    <button
                      onClick={handleCancelForm}
                      className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      <XIcon size={20} />
                    </button>
                  </div>
                </div>
                <div className="card-content">
                  <InfluencerForm
                    onSubmit={addInfluencer}
                    onCancel={handleCancelForm}
                  />
                </div>
              </div>
            )}

            {/* Influencers Table */}
            <div className="card animate-fade-in">
              <div className="card-header">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Influencers ({processedInfluencers.length})
                    </h2>
                    <p className="text-slate-600 mt-1">
                      Manage and track your influencer partnerships
                    </p>
                  </div>
                  {!showAddForm && (
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      <PlusIcon size={16} />
                      Add New Influencer
                    </button>
                  )}
                </div>
              </div>
              <div className="card-content space-y-6">
                {/* Advanced Filters */}
                <TableFiltersComponent
                  filters={filters}
                  onFiltersChange={setFilters}
                />

                {/* Table */}
                <InfluencerTable
                  influencers={processedInfluencers}
                  onUpdate={updateInfluencer}
                  onDelete={handleDeleteInfluencer}
                  sort={sort}
                  onSortChange={setSort}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-slate-500 text-lg font-medium">No campaign selected</div>
            <div className="text-slate-400 text-sm mt-2">Create or select a campaign to start tracking influencers</div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Influencer"
        message={`Are you sure you want to delete ${deleteConfirm.influencer?.username}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        type="danger"
      />
    </div>
  );
}
