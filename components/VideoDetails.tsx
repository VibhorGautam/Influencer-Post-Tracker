'use client';

import { Influencer, StatusType } from '../types/influencer';
import { VideoIcon, ExternalLinkIcon, CalendarIcon, LinkIcon, InstagramIcon, TikTokIcon } from './Icons';

interface VideoDetailsProps {
  influencer: Influencer;
  onUpdate: (updates: Partial<Influencer>) => void;
}

const VideoDetails: React.FC<VideoDetailsProps> = ({ influencer, onUpdate }) => {
  // Ensure arrays exist with default values
  const videoLinks = influencer.videoLinks || ['', '', '', ''];
  const videoTitles = influencer.videoTitles || ['', '', '', ''];
  const postedOn = influencer.postedOn || ['', '', '', ''];
  const videoStatuses = influencer.videoStatuses || ['Script Needed', 'Script Needed', 'Script Needed', 'Script Needed'];

  const handleVideoLinkChange = (index: number, value: string) => {
    const newVideoLinks = [...videoLinks] as [string, string, string, string];
    newVideoLinks[index] = value;
    onUpdate({ videoLinks: newVideoLinks });
  };

  const handleVideoTitleChange = (index: number, value: string) => {
    const newVideoTitles = [...videoTitles] as [string, string, string, string];
    newVideoTitles[index] = value;
    onUpdate({ videoTitles: newVideoTitles });
  };

  const handlePostedOnChange = (index: number, value: string) => {
    const newPostedOn = [...postedOn] as [string, string, string, string];
    newPostedOn[index] = value;
    onUpdate({ postedOn: newPostedOn });
  };

  const handleVideoStatusChange = (index: number, value: string) => {
    const newVideoStatuses = [...videoStatuses] as [StatusType, StatusType, StatusType, StatusType];
    newVideoStatuses[index] = value as StatusType;
    onUpdate({ videoStatuses: newVideoStatuses });
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const getVideoTitle = (index: number) => {
    const titles = ['Video #1', 'Video #2', 'Video #3', 'Video #4'];
    return titles[index];
  };

  const getVideoLinkIcon = (url: string) => {
    if (url.includes('instagram.com')) {
      return <InstagramIcon size={12} className="text-pink-600" />;
    } else if (url.includes('tiktok.com')) {
      return <TikTokIcon size={12} className="text-slate-900" />;
    } else {
      return <LinkIcon size={12} className="text-blue-600" />;
    }
  };

  const getVideoLinkType = (url: string) => {
    if (url.includes('instagram.com')) {
      return 'Instagram';
    } else if (url.includes('tiktok.com')) {
      return 'TikTok';
    } else {
      return 'External Link';
    }
  };

  return (
    <div className="video-grid">
      {[0, 1, 2, 3].map((index) => {
        const hasVideo = videoLinks[index];
        const hasDate = postedOn[index];

        return (
          <div key={index} className={hasVideo ? 'video-card' : 'video-placeholder'}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <VideoIcon size={16} className={hasVideo ? 'text-blue-600' : 'text-slate-400'} />
                  <h4 className="font-semibold text-sm text-slate-900">
                    {getVideoTitle(index)}
                  </h4>
                </div>
                {hasVideo && videoTitles[index] && (
                  <div className="text-xs text-slate-600 font-medium truncate">
                    {videoTitles[index]}
                  </div>
                )}
              </div>
              {hasVideo && (
                <div className="flex items-center gap-1 ml-2">
                  {getVideoLinkIcon(videoLinks[index])}
                  <span className="text-xs text-slate-500">
                    {getVideoLinkType(videoLinks[index])}
                  </span>
                </div>
              )}
            </div>

            {hasVideo ? (
              <div className="space-y-3">
                {/* Video Title */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Title/Description
                  </label>
                  <input
                    type="text"
                    value={videoTitles[index]}
                    onChange={(e) => handleVideoTitleChange(index, e.target.value)}
                    className="inline-edit-input"
                    placeholder="e.g., Morning Routine with Brand Products"
                  />
                </div>

                {/* Video Link */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Video URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={videoLinks[index]}
                      onChange={(e) => handleVideoLinkChange(index, e.target.value)}
                      className="flex-1 inline-edit-input"
                      placeholder="https://..."
                    />
                    {videoLinks[index] && (
                      <a
                        href={videoLinks[index]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                        title="Open video"
                      >
                        <ExternalLinkIcon size={14} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Posted Date */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Posted On
                  </label>
                  <div className="flex items-center gap-2">
                    <CalendarIcon size={14} className="text-slate-400" />
                    <input
                      type="date"
                      value={postedOn[index]}
                      onChange={(e) => handlePostedOnChange(index, e.target.value)}
                      className="inline-edit-input"
                    />
                  </div>
                  {hasDate && (
                    <div className="text-xs text-slate-500 mt-1">
                      {formatDate(postedOn[index])}
                    </div>
                  )}
                </div>

                {/* Video Status */}
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Status
                  </label>
                  <select
                    value={videoStatuses[index]}
                    onChange={(e) => handleVideoStatusChange(index, e.target.value)}
                    className="inline-edit-select w-full"
                  >
                    <option value="Script Needed">Script Needed</option>
                    <option value="Approve Needed">Approve Needed</option>
                    <option value="Posted">Posted</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>

                {/* Remove Video Option */}
                <div className="pt-2 border-t border-slate-200">
                  <button
                    onClick={() => {
                      handleVideoTitleChange(index, '');
                      handleVideoLinkChange(index, '');
                      handlePostedOnChange(index, '');
                      handleVideoStatusChange(index, 'Script Needed');
                    }}
                    className="text-xs text-red-600 hover:text-red-800 font-medium transition-colors"
                  >
                    Remove Video
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <VideoIcon size={24} className="text-slate-300 mx-auto mb-2" />
                <div className="text-sm text-slate-500 mb-3">Not posted</div>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      handleVideoTitleChange(index, 'Instagram Video');
                      handleVideoLinkChange(index, 'https://www.instagram.com/p/');
                    }}
                    className="flex items-center justify-center gap-2 w-full text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors py-2 px-3 rounded-md hover:bg-blue-50"
                  >
                    <InstagramIcon size={12} />
                    Add Instagram Video
                  </button>
                  <button
                    onClick={() => {
                      handleVideoTitleChange(index, 'TikTok Video');
                      handleVideoLinkChange(index, 'https://www.tiktok.com/@username/video/');
                    }}
                    className="flex items-center justify-center gap-2 w-full text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors py-2 px-3 rounded-md hover:bg-blue-50"
                  >
                    <TikTokIcon size={12} />
                    Add TikTok Video
                  </button>
                  <button
                    onClick={() => {
                      handleVideoTitleChange(index, 'Video');
                      handleVideoLinkChange(index, 'https://');
                    }}
                    className="flex items-center justify-center gap-2 w-full text-xs text-slate-600 hover:text-slate-800 font-medium transition-colors py-2 px-3 rounded-md hover:bg-slate-50"
                  >
                    <LinkIcon size={12} />
                    Add Other Link
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default VideoDetails;
