local BASE_URL = "https://raw.githubusercontent.com/Haijo12/AegisPass/main/"

local Config = loadstring(game:HttpGet(BASE_URL .. "config.lua"))()
local Core   = loadstring(game:HttpGet(BASE_URL .. "core.lua"))()

local AegisPass = {}

function AegisPass:Init()
    local r = Core.Validate(Config.Settings, Config.Whitelist, Config.AllowedGames)

    if not r.CanRun then
        warn(Config.Settings.DenyMessage)
        return false, r
    end

    return true, r
end

function AegisPass:AddUser(userId, tier, expiresAt, note)
    Config.Whitelist[userId] = {Tier = tier or "freemium", ExpiresAt = expiresAt, Note = note}
end

function AegisPass:RemoveUser(userId)
    Config.Whitelist[userId] = nil
end

function AegisPass:GetWhitelist()
    return Config.Whitelist
end

AegisPass:Init()

return AegisPass
