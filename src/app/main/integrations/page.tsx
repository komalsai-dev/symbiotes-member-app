"use client";

import React, { useState, useEffect, useRef } from 'react';
import ProductTrafficChart from './ProductTrafficChart';
import { FaGithub, FaDiscord, FaLinkedin, FaFacebook, FaTwitter, FaGoogle } from 'react-icons/fa';
import { MdStackedLineChart } from 'react-icons/md';
import { 
  FiRefreshCw, 
  FiCheck, 
  FiX, 
  FiExternalLink, 
  FiActivity, 
  FiShield, 
  FiLogOut,
  FiClock,
  FiUser,
  FiAlertTriangle,
  FiMoreVertical
} from 'react-icons/fi';

// Integration types
interface Integration {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  description: string;
  features: string[];
  authUrl?: string;
  scopes: string[];
  isActive: boolean;
  lastSync?: string;
  syncStatus?: 'success' | 'warning' | 'error';
  accountInfo?: {
    username?: string;
    email?: string;
    avatar?: string;
  };
  activityLog?: {
    id: string;
    action: string;
    status: 'success' | 'error' | 'pending';
    timestamp: string;
    details?: string;
  }[];
}

const integrations: Integration[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: FaFacebook,
    status: 'disconnected',
    description: 'Connect Your Facebook Account',
    features: ['Post scheduling', 'Analytics tracking', 'Page management'],
    authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    scopes: ['pages_manage_posts', 'pages_read_engagement', 'pages_show_list'],
    isActive: false
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: FaTwitter,
    status: 'disconnected',
    description: 'Connect Your Twitter Account',
    features: ['Automated publishing', 'Analytics tracking', 'Tweet scheduling'],
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    scopes: ['tweet.read', 'tweet.write', 'users.read'],
    isActive: false
  },
  {
    id: 'stack',
    name: 'Stack',
    icon: MdStackedLineChart,
    status: 'connected',
    description: 'Stack Integration Active',
    features: ['Analytics dashboard', 'Performance tracking', 'Real-time data'],
    scopes: ['analytics:read', 'performance:read'],
    isActive: true,
    lastSync: '2 hours ago',
    syncStatus: 'success',
    accountInfo: {
      username: 'symbiotes_user',
      email: 'user@symbiotes.com'
    },
    activityLog: [
      {
        id: '1',
        action: 'Data sync',
        status: 'success',
        timestamp: '2 hours ago',
        details: 'Successfully synced 1,234 records'
      },
      {
        id: '2',
        action: 'Analytics update',
        status: 'success',
        timestamp: '4 hours ago',
        details: 'Updated performance metrics'
      }
    ]
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: FaGithub,
    status: 'disconnected',
    description: 'Connect Your GitHub Account',
    features: ['Commit tracking', 'Repository management', 'Dev tools access'],
    authUrl: 'https://github.com/login/oauth/authorize',
    scopes: ['repo', 'user', 'read:org'],
    isActive: false
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: FaDiscord,
    status: 'disconnected',
    description: 'Connect Your Discord Account',
    features: ['Community bot access', 'Alert integrations', 'Server management'],
    authUrl: 'https://discord.com/api/oauth2/authorize',
    scopes: ['identify', 'guilds', 'bot'],
    isActive: false
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: FaLinkedin,
    status: 'disconnected',
    description: 'Connect Your LinkedIn Account',
    features: ['Professional automation', 'Post syncing', 'Analytics'],
    authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    scopes: ['r_liteprofile', 'w_member_social'],
    isActive: false
  }
];

// Mapping from integration id to official site URL
const PLATFORM_URLS: Record<string, string> = {
  facebook: 'https://facebook.com',
  twitter: 'https://twitter.com',
  stack: 'https://stack.com', // Replace with actual Stack URL if needed
  github: 'https://github.com',
  discord: 'https://discord.com',
  linkedin: 'https://linkedin.com',
};

// Manage Modal Component
const ManageModal = ({ 
  integration, 
  isOpen, 
  onClose, 
  onDisconnect,
  onReauthenticate,
  onSyncNow
}: { 
  integration: Integration; 
  isOpen: boolean; 
  onClose: () => void; 
  onDisconnect: (integrationId: string) => void;
  onReauthenticate: (integrationId: string) => void;
  onSyncNow: (integrationId: string) => void;
}) => {
  const [showDisconnectConfirm, setShowDisconnectConfirm] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const getSyncStatusIcon = (status?: string) => {
    switch (status) {
      case 'success': return <FiCheck size={16} className="text-green-400" />;
      case 'warning': return <FiAlertTriangle size={16} className="text-yellow-400" />;
      case 'error': return <FiX size={16} className="text-red-400" />;
      default: return <FiClock size={16} className="text-gray-400" />;
    }
  };

  const getSyncStatusText = (status?: string) => {
    switch (status) {
      case 'success': return '✅ Successful';
      case 'warning': return '⚠️ Warning';
      case 'error': return '❌ Error';
      default: return '⏳ Pending';
    }
  };

  const handleSyncNow = async () => {
    setIsSyncing(true);
    await onSyncNow(integration.id);
    setIsSyncing(false);
  };

  const handleDisconnect = () => {
    setShowDisconnectConfirm(true);
  };

  const confirmDisconnect = () => {
    onDisconnect(integration.id);
    setShowDisconnectConfirm(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="futuristic-modal-bg futuristic-modal p-8 max-w-2xl w-full mx-4 border max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
            <div className="p-2 bg-[#232323] rounded-lg">
              <integration.icon size={24} className="text-[#d6ff00]" />
            </div>
            <div>
              <h3 className="text-white text-xl font-semibold">Manage {integration.name} Integration</h3>
              <p className="text-gray-400 text-sm">Integration settings and controls</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Status Section */}
        <div className="bg-[#232323] rounded-lg p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-green-400 font-medium">Status: Connected</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <FiUser size={16} className="text-gray-400" />
              <span className="text-gray-400">Connected as:</span>
              <span className="text-white">{integration.accountInfo?.email || 'Unknown'}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <FiClock size={16} className="text-gray-400" />
              <span className="text-gray-400">Last synced:</span>
              <span className="text-white">{integration.lastSync || 'Never'}</span>
            </div>
            
            <div className="flex items-center gap-2">
              {getSyncStatusIcon(integration.syncStatus)}
              <span className="text-gray-400">Sync Status:</span>
              <span className="text-white">{getSyncStatusText(integration.syncStatus)}</span>
            </div>
          </div>
        </div>

        {/* Action Options */}
        <div className="space-y-3 mb-6">
          <h4 className="text-white font-medium mb-4">Choose an action below:</h4>
          
          <button
            onClick={() => {/* TODO: Implement view activity */}}
            className="w-full flex items-center gap-3 p-4 bg-[#232323] rounded-lg hover:bg-[#333] transition-colors text-left"
          >
            <FiActivity size={20} className="text-blue-400" />
            <div>
              <div className="text-white font-medium">View Activity</div>
              <div className="text-gray-400 text-sm">See logs of recent syncs, posts, or API calls</div>
            </div>
          </button>

          <button
            onClick={() => onReauthenticate(integration.id)}
            className="w-full flex items-center gap-3 p-4 bg-[#232323] rounded-lg hover:bg-[#333] transition-colors text-left"
          >
            <FiRefreshCw size={20} className="text-yellow-400" />
            <div>
              <div className="text-white font-medium">Re-authenticate</div>
              <div className="text-gray-400 text-sm">Useful if token expired or permissions changed</div>
            </div>
          </button>

          <button
            onClick={() => {/* TODO: Implement edit permissions */}}
            className="w-full flex items-center gap-3 p-4 bg-[#232323] rounded-lg hover:bg-[#333] transition-colors text-left"
          >
            <FiShield size={20} className="text-purple-400" />
            <div>
              <div className="text-white font-medium">Edit Permissions</div>
              <div className="text-gray-400 text-sm">Select scopes (read-only, post access, etc.)</div>
            </div>
          </button>

          <button
            onClick={handleSyncNow}
            disabled={isSyncing}
            className="w-full flex items-center gap-3 p-4 bg-[#232323] rounded-lg hover:bg-[#333] transition-colors text-left disabled:opacity-50"
          >
            {isSyncing ? (
              <FiRefreshCw size={20} className="text-[#d6ff00] animate-spin" />
            ) : (
              <FiRefreshCw size={20} className="text-[#d6ff00]" />
            )}
            <div>
              <div className="text-white font-medium">Sync Now</div>
              <div className="text-gray-400 text-sm">Force manual sync of data or fetch new content</div>
            </div>
          </button>

          <button
            onClick={handleDisconnect}
            className="w-full flex items-center gap-3 p-4 bg-red-500/20 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors text-left"
          >
            <FiLogOut size={20} className="text-red-400" />
            <div>
              <div className="text-red-400 font-medium">Disconnect</div>
              <div className="text-gray-400 text-sm">Remove this integration and stop data sync</div>
            </div>
          </button>
        </div>

        {/* Activity Log Preview */}
        {integration.activityLog && integration.activityLog.length > 0 && (
          <div className="bg-[#232323] rounded-lg p-4">
            <h5 className="text-white font-medium mb-3">Recent Activity</h5>
            <div className="space-y-2">
              {integration.activityLog.slice(0, 3).map((activity) => (
                <div key={activity.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {activity.status === 'success' ? (
                      <FiCheck size={12} className="text-green-400" />
                    ) : activity.status === 'error' ? (
                      <FiX size={12} className="text-red-400" />
                    ) : (
                      <FiClock size={12} className="text-yellow-400" />
                    )}
                    <span className="text-gray-300">{activity.action}</span>
                  </div>
                  <span className="text-gray-400">{activity.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Disconnect Confirmation Modal */}
      {showDisconnectConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="futuristic-modal-bg p-6 max-w-md w-full mx-4 border">
            <div className="flex items-center gap-3 mb-4">
              <FiAlertTriangle size={24} className="text-red-400" />
              <h3 className="text-white text-lg font-semibold">Disconnect Integration</h3>
            </div>
            
            <p className="text-gray-300 mb-6">
              Are you sure you want to disconnect {integration.name}?<br />
              This will stop data sync and any automated actions.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={confirmDisconnect}
                className="flex-1 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
              >
                ✅ Confirm
              </button>
              <button
                onClick={() => setShowDisconnectConfirm(false)}
                className="flex-1 bg-[#232323] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#333] transition-colors"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Authentication Modal Component
const AuthModal = ({ 
  integration, 
  isOpen, 
  onClose, 
  onSuccess 
}: { 
  integration: Integration; 
  isOpen: boolean; 
  onClose: () => void; 
  onSuccess: (integrationId: string, authMethod: 'google' | 'platform' | 'symbiotes') => void; 
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleAuth = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onSuccess(integration.id, 'google');
    } catch {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handlePlatformAuth = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSuccess(integration.id, 'platform');
    } catch {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSymbiotesAuth = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSuccess(integration.id, 'symbiotes');
    } catch {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#18181b] rounded-2xl p-8 max-w-md w-full mx-4 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <integration.icon size={24} className="text-[#d6ff00]" />
            <h3 className="text-white text-xl font-semibold">{integration.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-300 mb-4">{integration.description}</p>
          
          {integration.id === 'stack' ? (
            <div className="bg-[#232323] rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-[#d6ff00] mb-2">
                <FiCheck size={16} />
                <span className="text-sm font-medium">Connected</span>
              </div>
              <p className="text-gray-400 text-sm">
                You're already connected. To manage your account, please visit your integration settings or reconnect via Google.
              </p>
            </div>
          ) : (
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-[#d6ff00]">✅</span>
                <span className="text-sm">Secure authentication</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-[#d6ff00]">🔄</span>
                <span className="text-sm">Seamless integration with Symbiotes</span>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>

        {integration.id === 'stack' ? (
          <div className="space-y-3">
            <button
              onClick={handleGoogleAuth}
              disabled={isConnecting}
              className="w-full bg-[#d6ff00] text-black font-semibold py-3 px-4 rounded-lg hover:bg-[#b6d000] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isConnecting ? (
                <FiRefreshCw className="animate-spin" size={16} />
              ) : (
                <FaGoogle size={16} />
              )}
              {isConnecting ? 'Connecting...' : 'Continue with Google'}
            </button>
            <button
              onClick={onClose}
              className="w-full bg-[#232323] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#333] transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleGoogleAuth}
              disabled={isConnecting}
              className="w-full bg-[#d6ff00] text-black font-semibold py-3 px-4 rounded-lg hover:bg-[#b6d000] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isConnecting ? (
                <FiRefreshCw className="animate-spin" size={16} />
              ) : (
                <FaGoogle size={16} />
              )}
              {isConnecting ? 'Connecting...' : 'Continue with Google'}
            </button>
            
            <button
              onClick={handleSymbiotesAuth}
              disabled={isConnecting}
              className="w-full bg-[#232323] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#333] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 border border-white/10"
            >
              {isConnecting ? (
                <FiRefreshCw className="animate-spin" size={16} />
              ) : (
                <div className="w-4 h-4 bg-[#d6ff00] rounded-sm"></div>
              )}
              {isConnecting ? 'Connecting...' : 'Continue with Symbiotes Account'}
            </button>
            
            <button
              onClick={handlePlatformAuth}
              disabled={isConnecting}
              className="w-full bg-[#232323] text-white font-semibold py-3 px-4 rounded-lg hover:bg-[#333] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 border border-white/10"
            >
              {isConnecting ? (
                <FiRefreshCw className="animate-spin" size={16} />
              ) : (
                <integration.icon size={16} />
              )}
              {isConnecting ? 'Connecting...' : `Continue with ${integration.name}`}
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-transparent text-gray-400 font-semibold py-3 px-4 rounded-lg hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Integration Card Component
const IntegrationCard = ({ 
  integration, 
  onConnect,
  onManage
}: { 
  integration: Integration; 
  onConnect: (integration: Integration) => void;
  onManage: (integration: Integration) => void;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-[#d6ff00]';
      case 'connecting': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <FiCheck size={16} className="text-[#d6ff00]" />;
      case 'connecting': return <FiRefreshCw size={16} className="animate-spin text-yellow-400" />;
      case 'error': return <FiX size={16} className="text-red-400" />;
      default: return <div className="w-2 h-2 rounded-full bg-gray-500" />;
    }
  };

  const handleExternalLink = (e: React.MouseEvent) => {
    e.preventDefault();
    if (integration.status === 'connected' && PLATFORM_URLS[integration.id]) {
      window.open(PLATFORM_URLS[integration.id], '_blank', 'noopener');
    }
  };

  return (
    <div className="bg-[#232323] rounded-2xl p-6 border border-white/10 hover:border-[#d6ff00]/30 transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#18181b] rounded-lg">
            <integration.icon size={24} className="text-[#d6ff00]" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">{integration.name}</h3>
            <p className="text-gray-400 text-sm">{integration.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon(integration.status)}
          <span className={`text-sm font-medium ${getStatusColor(integration.status)}`}>
            {integration.status === 'connected' ? 'Connected' : 
             integration.status === 'connecting' ? 'Connecting...' :
             integration.status === 'error' ? 'Error' : 'Disconnected'}
          </span>
        </div>
      </div>

      {integration.accountInfo && (
        <div className="bg-[#18181b] rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Account:</span>
            <span className="text-white">{integration.accountInfo.username}</span>
          </div>
          {integration.lastSync && (
            <div className="flex items-center gap-2 text-sm mt-1">
              <span className="text-gray-400">Last sync:</span>
              <span className="text-white">{integration.lastSync}</span>
            </div>
          )}
        </div>
      )}

      <div className="mb-4">
        <h4 className="text-white font-medium mb-2">Features:</h4>
        <div className="flex flex-wrap gap-1">
          {integration.features.map((feature, idx) => (
            <span
              key={idx}
              className="bg-[#18181b] text-gray-300 text-xs px-2 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        {integration.status === 'connected' ? (
          <>
            <button 
              onClick={() => onManage(integration)}
              className="flex-1 bg-[#d6ff00] text-black font-semibold py-2 px-4 rounded-lg hover:bg-[#b6d000] transition-colors flex items-center justify-center gap-2"
              title="Manage integration settings"
            >
              <FiMoreVertical size={16} />
              Manage
            </button>
            <button 
              onClick={handleExternalLink}
              className="bg-[#232323] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#333] transition-colors border border-white/10"
              title={`Go to ${integration.name}`}
            >
              <FiExternalLink size={16} />
            </button>
          </>
        ) : (
          <button
            onClick={() => onConnect(integration)}
            className="w-full bg-[#d6ff00] text-black font-semibold py-2 px-4 rounded-lg hover:bg-[#b6d000] transition-colors"
          >
            Connect
          </button>
        )}
      </div>
  </div>
);
};

const IntegrationsPage = () => {
  const [integrationsList, setIntegrationsList] = useState<Integration[]>(integrations);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const popupRef = useRef<Window | null>(null);



  // Handle URL parameters for OAuth callback results
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const error = urlParams.get('error');

    if (success) {
      setNotification({
        type: 'success',
        message: `${success.charAt(0).toUpperCase() + success.slice(1)} integration connected successfully!`
      });
      
      // Update the integration status
      setIntegrationsList(prev => prev.map(integration => 
        integration.id === success 
          ? { 
              ...integration, 
              status: 'connected' as const,
              isActive: true,
              lastSync: 'Just now',
              syncStatus: 'success',
              accountInfo: {
                username: 'connected_user',
                email: 'user@example.com'
              }
            }
          : integration
      ));

      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    if (error) {
      setNotification({
        type: 'error',
        message: `Authentication failed: ${decodeURIComponent(error)}`
      });

      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Clear notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleConnect = (integration: Integration) => {
    setSelectedIntegration(integration);
    setIsModalOpen(true);
  };

  const handleManage = (integration: Integration) => {
    setSelectedIntegration(integration);
    setIsManageModalOpen(true);
  };

  const handleAuthSuccess = async (integrationId: string, authMethod: 'google' | 'platform' | 'symbiotes') => {
    try {
      if (authMethod === 'google') {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIntegrationsList(prev => prev.map(integration =>
          integration.id === integrationId
            ? {
                ...integration,
                status: 'connected' as const,
                isActive: true,
                lastSync: 'Just now',
                syncStatus: 'success',
                accountInfo: {
                  username: 'google_user',
                  email: 'user@gmail.com'
                }
              }
            : integration
        ));
      } else if (authMethod === 'symbiotes') {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIntegrationsList(prev => prev.map(integration =>
          integration.id === integrationId
            ? {
                ...integration,
                status: 'connected' as const,
                isActive: true,
                lastSync: 'Just now',
                syncStatus: 'success',
                accountInfo: {
                  username: 'symbiotes_user',
                  email: 'user@symbiotes.com'
                }
              }
            : integration
        ));
      } else {
        // For platform-specific auth, use mock functionality
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock successful authentication
        setIntegrationsList(prev => prev.map(integration =>
          integration.id === integrationId
            ? {
                ...integration,
                status: 'connected' as const,
                isActive: true,
                lastSync: 'Just now',
                syncStatus: 'success',
                accountInfo: {
                  username: `${integrationId}_user`,
                  email: `user@${integrationId}.com`
                }
              }
            : integration
        ));
      }
      setIsModalOpen(false);
      setSelectedIntegration(null);
      setNotification({
        type: 'success',
        message: `${integrations.find(i => i.id === integrationId)?.name} integration connected successfully!`
      });
    } catch (error) {
      console.error('Auth error:', error);
      setNotification({
        type: 'error',
        message: 'Authentication failed. Please try again.'
      });
    }
  };

  const handleDisconnect = (integrationId: string) => {
    setIntegrationsList(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            status: 'disconnected' as const,
            isActive: false,
            lastSync: undefined,
            syncStatus: undefined,
            accountInfo: undefined
          }
        : integration
    ));
    
    setNotification({
      type: 'success',
      message: `${integrations.find(i => i.id === integrationId)?.name} integration disconnected successfully!`
    });
  };

  const handleReauthenticate = (integrationId: string) => {
    // Simulate re-authentication
    setIntegrationsList(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            lastSync: 'Just now',
            syncStatus: 'success'
          }
        : integration
    ));
    
    setNotification({
      type: 'success',
      message: `${integrations.find(i => i.id === integrationId)?.name} re-authenticated successfully!`
    });
  };

  const handleSyncNow = async (integrationId: string) => {
    // Simulate sync
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIntegrationsList(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            lastSync: 'Just now',
            syncStatus: 'success'
          }
        : integration
    ));
    
    setNotification({
      type: 'success',
      message: `${integrations.find(i => i.id === integrationId)?.name} synced successfully!`
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedIntegration(null);
  };

  const handleManageModalClose = () => {
    setIsManageModalOpen(false);
    setSelectedIntegration(null);
  };

  return (
    <div className="w-full max-w-[1800px] mx-auto px-0">
      {/* Notification Banner */}
      {notification && (
        <div className={`mb-6 p-4 rounded-lg border ${
          notification.type === 'success' 
            ? 'bg-green-500/20 border-green-500/30 text-green-400' 
            : 'bg-red-500/20 border-red-500/30 text-red-400'
        }`}>
          <div className="flex items-center justify-between">
            <span>{notification.message}</span>
              <button
              onClick={() => setNotification(null)}
              className="text-gray-400 hover:text-white"
              >
              <FiX size={16} />
              </button>
            </div>
            </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-white text-3xl font-bold">Integrations</h2>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Connected: {integrationsList.filter(i => i.status === 'connected').length}</span>
          <span>•</span>
          <span>Total: {integrationsList.length}</span>
            </div>
          </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        {integrationsList.map((integration) => (
          <IntegrationCard
            key={integration.id}
            integration={integration}
            onConnect={handleConnect}
            onManage={handleManage}
          />
        ))}
      </div>

      <ProductTrafficChart />

      {selectedIntegration && (
        <>
          <AuthModal
            integration={selectedIntegration}
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onSuccess={handleAuthSuccess}
          />
          <ManageModal
            integration={selectedIntegration}
            isOpen={isManageModalOpen}
            onClose={handleManageModalClose}
            onDisconnect={handleDisconnect}
            onReauthenticate={handleReauthenticate}
            onSyncNow={handleSyncNow}
          />
        </>
      )}
    </div>
  );
};

export default IntegrationsPage;
