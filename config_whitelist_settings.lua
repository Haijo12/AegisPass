--[[ Config.lua ]]
local Config = {
    ScriptName = "AegisPass",
    Version = "1.0.0",
    EnableUserWhitelist = true,
    EnableGameWhitelist = false,
    DenyMessage = "[AegisPass] Access Denied.",
    ShowUIOnLoad = true,
}

local WHITELIST = {
    [11369517300] = {
        Tier = "lifetime",
        ExpiresAt = nil,
        Note = "Owner",
    },
}

local ALLOWED_GAMES = {}

return {Config = Config, WHITELIST = WHITELIST, ALLOWED_GAMES = ALLOWED_GAMES}
