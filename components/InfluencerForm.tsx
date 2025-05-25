'use client';

import { useState, useEffect } from 'react';
import { Influencer, InfluencerFormData, PlatformType, StatusType } from '../types/influencer';
import { calculateTotalViews, generateId } from '../utils/calculations';
import { InstagramIcon, TikTokIcon, BothPlatformsIcon, PlusIcon } from './Icons';

interface InfluencerFormProps {
  onSubmit: (influencer: Influencer) => void;
  onCancel?: () => void;
  editingInfluencer?: Influencer | null;
}

const InfluencerForm: React.FC<InfluencerFormProps> = ({ onSubmit, onCancel, editingInfluencer }) => {
  const [formData, setFormData] = useState<InfluencerFormData>({
    username: '',
    profileLink: '',
    platform: 'Instagram',
    viewsMedian: 0,
    viewsNow: 0,
    videoLinks: ['', '', '', ''],
    videoTitles: ['', '', '', ''],
    postedOn: ['', '', '', ''],
    videoStatuses: ['Script Needed', 'Script Needed', 'Script Needed', 'Script Needed'],
    status: 'Script Needed'
  });

  // Initialize form with editing data
  useEffect(() => {
    if (editingInfluencer) {
      setFormData({
        username: editingInfluencer.username,
        profileLink: editingInfluencer.profileLink,
        platform: editingInfluencer.platform,
        viewsMedian: editingInfluencer.viewsMedian,
        viewsNow: editingInfluencer.viewsNow,
        videoLinks: editingInfluencer.videoLinks,
        videoTitles: editingInfluencer.videoTitles,
        postedOn: editingInfluencer.postedOn,
        videoStatuses: editingInfluencer.videoStatuses || ['Script Needed', 'Script Needed', 'Script Needed', 'Script Needed'],
        status: editingInfluencer.status
      });
    }
  }, [editingInfluencer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const influencerData: Influencer = editingInfluencer ? {
      ...editingInfluencer,
      ...formData,
      totalViews: calculateTotalViews(formData.viewsMedian)
    } : {
      id: generateId(),
      ...formData,
      totalViews: calculateTotalViews(formData.viewsMedian),
      createdAt: new Date().toISOString(),
      campaignId: '' // Will be set by parent component
    };

    onSubmit(influencerData);

    // Reset form only if not editing
    if (!editingInfluencer) {
      setFormData({
        username: '',
        profileLink: '',
        platform: 'Instagram',
        viewsMedian: 0,
        viewsNow: 0,
        videoLinks: ['', '', '', ''],
        videoTitles: ['', '', '', ''],
        postedOn: ['', '', '', ''],
        videoStatuses: ['Script Needed', 'Script Needed', 'Script Needed', 'Script Needed'],
        status: 'Script Needed'
      });
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }

    // Reset form
    setFormData({
      username: '',
      profileLink: '',
      platform: 'Instagram',
      viewsMedian: 0,
      viewsNow: 0,
      videoLinks: ['', '', '', ''],
      videoTitles: ['', '', '', ''],
      postedOn: ['', '', '', ''],
      videoStatuses: ['Script Needed', 'Script Needed', 'Script Needed', 'Script Needed'],
      status: 'Script Needed'
    });
  };

  // Auto-calculate total views when views median changes
  const handleViewsMedianChange = (value: number) => {
    setFormData({
      ...formData,
      viewsMedian: value
    });
  };

  const handleVideoLinkChange = (index: number, value: string) => {
    const newVideoLinks = [...formData.videoLinks] as [string, string, string, string];
    newVideoLinks[index] = value;
    setFormData({ ...formData, videoLinks: newVideoLinks });
  };

  const handleVideoTitleChange = (index: number, value: string) => {
    const newVideoTitles = [...formData.videoTitles] as [string, string, string, string];
    newVideoTitles[index] = value;
    setFormData({ ...formData, videoTitles: newVideoTitles });
  };

  const handlePostedOnChange = (index: number, value: string) => {
    const newPostedOn = [...formData.postedOn] as [string, string, string, string];
    newPostedOn[index] = value;
    setFormData({ ...formData, postedOn: newPostedOn });
  };

  const handleVideoStatusChange = (index: number, value: StatusType) => {
    const newVideoStatuses = [...formData.videoStatuses] as [StatusType, StatusType, StatusType, StatusType];
    newVideoStatuses[index] = value;
    setFormData({ ...formData, videoStatuses: newVideoStatuses });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Username */}
        <div>
          <label className="form-label">
            Username *
          </label>
          <input
            type="text"
            required
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="form-input"
            placeholder="@username"
          />
        </div>

        {/* Profile Link */}
        <div>
          <label className="form-label">
            Profile Link *
          </label>
          <input
            type="url"
            required
            value={formData.profileLink}
            onChange={(e) => setFormData({ ...formData, profileLink: e.target.value })}
            className="form-input"
            placeholder="https://..."
          />
        </div>

        {/* Platform */}
        <div>
          <label className="form-label">
            Platform *
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'Instagram', icon: InstagramIcon, label: 'Instagram', color: 'platform-instagram' },
              { value: 'TikTok', icon: TikTokIcon, label: 'TikTok', color: 'platform-tiktok' },
              { value: 'Both', icon: BothPlatformsIcon, label: 'Both', color: 'platform-both' }
            ].map(({ value, icon: Icon, label, color }) => (
              <button
                key={value}
                type="button"
                onClick={() => setFormData({ ...formData, platform: value as PlatformType })}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all duration-200 ${
                  formData.platform === value
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className={`platform-badge ${color} mb-2`}>
                  <Icon size={16} />
                </div>
                <span className="text-xs font-medium text-slate-700">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Views Median */}
        <div>
          <label className="form-label">
            Views Median *
          </label>
          <input
            type="number"
            required
            min="0"
            value={formData.viewsMedian}
            onChange={(e) => handleViewsMedianChange(parseInt(e.target.value) || 0)}
            className="form-input"
            placeholder="Average views per video"
          />
          <div className="text-xs text-slate-500 mt-1">
            Total Views: {calculateTotalViews(formData.viewsMedian).toLocaleString()}
          </div>
        </div>

        {/* Views Now */}
        <div>
          <label className="form-label">
            Views Now
          </label>
          <input
            type="number"
            min="0"
            value={formData.viewsNow}
            onChange={(e) => setFormData({ ...formData, viewsNow: parseInt(e.target.value) || 0 })}
            className="form-input"
            placeholder="Current campaign views"
          />
        </div>

        {/* Status */}
        <div>
          <label className="form-label">
            Status *
          </label>
          <select
            required
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as StatusType })}
            className="form-select"
          >
            <option value="Script Needed">Script Needed</option>
            <option value="Approve Needed">Approve Needed</option>
            <option value="Posted">Posted</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
      </div>

      {/* Video Details */}
      <div>
        <label className="form-label">
          Video Details
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="space-y-4 p-4 border border-slate-200 rounded-lg bg-slate-50">
              <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-300 pb-2">
                Video #{index + 1}
              </h4>

              {/* Video Title */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Title/Description
                </label>
                <input
                  type="text"
                  value={formData.videoTitles[index]}
                  onChange={(e) => handleVideoTitleChange(index, e.target.value)}
                  className="form-input"
                  placeholder="e.g., Morning Routine with Brand Products"
                />
              </div>

              {/* Video URL */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Video URL
                </label>
                <input
                  type="url"
                  value={formData.videoLinks[index]}
                  onChange={(e) => handleVideoLinkChange(index, e.target.value)}
                  className="form-input"
                  placeholder="https://..."
                />
              </div>

              {/* Posted Date (Optional) */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Posted Date <span className="text-slate-400">(Optional)</span>
                </label>
                <input
                  type="date"
                  value={formData.postedOn[index]}
                  onChange={(e) => handlePostedOnChange(index, e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Video Status */}
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Status
                </label>
                <select
                  value={formData.videoStatuses[index]}
                  onChange={(e) => handleVideoStatusChange(index, e.target.value as StatusType)}
                  className="form-select"
                >
                  <option value="Script Needed">Script Needed</option>
                  <option value="Approve Needed">Approve Needed</option>
                  <option value="Posted">Posted</option>
                  <option value="Paid">Paid</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="btn-primary inline-flex items-center gap-2"
        >
          <PlusIcon size={16} />
          {editingInfluencer ? 'Update Influencer' : 'Add Influencer'}
        </button>
      </div>
    </form>
  );
};

export default InfluencerForm;
