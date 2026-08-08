local BASE_URL = "https://raw.githubusercontent.com/Haijo12/AegisPass/main/"

local Config = loadstring(game:HttpGet(BASE_URL .. "config.lua"))()
local Core   = loadstring(game:HttpGet(BASE_URL .. "core.lua"))()
local UI     = loadstring(game:HttpGet(BASE_URL .. "ui.lua"))()
local Icons  = loadstring(game:HttpGet(BASE_URL .. "icons.lua"))()

local AegisPass = {}

function AegisPass:Init()
    print("[AegisPass] v" .. Config.Settings.Version)
    local r = Core.Validate(Config.Settings, Config.Whitelist, Config.AllowedGames)
    print("[AegisPass] User:", r.Username, r.UserId)
    print("[AegisPass] CanRun:", r.CanRun)
    if r.Tier then print("[AegisPass] Tier:", r.Tier) end
    if r.TimeRemaining then print("[AegisPass] Time Left:", r.TimeRemaining) end
    if Config.Settings.ShowUIOnLoad then UI:Show(r, Icons, Config.Settings) end
    if not r.CanRun then warn(Config.Settings.DenyMessage); return false, r end
    print("[AegisPass] Welcome,", r.Username .. "!")
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
