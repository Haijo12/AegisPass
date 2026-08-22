/* ===== Forge Gen 2 Monitor Configuration ===== */

module.exports = {
  site: {
    name: 'Forge Gen 2 Monitor',
    tagline: 'Grow a Garden, elevated by Forge',
    description: 'The ultimate Grow a Garden script monitor built for Delta Executor.',
    url: 'https://wishub.cloud',
    discord: 'https://discord.gg/forgegen2',
    version: '1.0.0'
  },

  game: {
    id: 'gag',
    name: 'Grow a Garden',
    robloxUrl: 'https://www.roblox.com/games/126884695634066/Grow-a-Garden',
    features: [
      'Auto Farm',
      'Auto Harvest',
      'Auto Sell',
      'Auto Buy Seeds',
      'Pet Spawner',
      'Dupe',
      'Anti-AFK',
      'ESP'
    ]
  },

  executor: {
    supported: ['Delta Executor'],
    primary: 'Delta Executor',
    downloadUrl: 'https://deltaexecutor.com'
  },

  keys: {
    tiers: ['free', 'premium', 'vip'],
    durations: {
      free: '1d',
      premium: '30d',
      vip: 'lifetime'
    },
    webhookUrl: process.env.DISCORD_WEBHOOK_URL || ''
  },

  api: {
    baseUrl: process.env.API_BASE_URL || 'https://wishub.cloud/api/v1',
    wsUrl: process.env.WS_URL || 'wss://wishub.cloud/ws'
  },

  monitoring: {
    updateInterval: 5000,
    maxLogs: 100,
    uptimeTarget: 99.97
  },

  security: {
    hwidRequired: true,
    rateLimit: {
      windowMs: 60000,
      max: 100
    },
    ipRateLimit: {
      windowMs: 60000,
      max: 10
    }
  }
};
