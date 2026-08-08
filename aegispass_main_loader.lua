local Config = loadstring(game:HttpGet(BASE_URL .. "config_whitelist_settings.lua"))()
local Icons = loadstring(game:HttpGet(BASE_URL .. "icon_asset_definitions.lua"))()
local Core = loadstring(game:HttpGet(BASE_URL .. "core_validation_engine.lua"))()
local UI = loadstring(game:HttpGet(BASE_URL .. "rayfield_ui_renderer.lua"))()

local AegisPass = {}

function AegisPass:Init()
    print("[AegisPass] v" .. Config.Config.Version)
    local r = Core:Validate(Config.Config, Config.WHITELIST, Config.ALLOWED_GAMES)
    print("[AegisPass] User:", r.Username, r.UserId)
    print("[AegisPass] CanRun:", r.CanRun)
    if r.Tier then print("[AegisPass] Tier:", r.Tier) end
    if r.TimeRemaining then print("[AegisPass] Time Left:", r.TimeRemaining) end
    if Config.Config.ShowUIOnLoad then UI:Show(r, Icons, Config.Config) end
    if not r.CanRun then warn(Config.Config.DenyMessage); return false, r end
    print("[AegisPass] Welcome,", r.Username .. "!")
    return true, r
end

function AegisPass:AddUser(userId, tier, expiresAt, note)
    Config.WHITELIST[userId] = {Tier = tier or "freemium", ExpiresAt = expiresAt, Note = note}
end

function AegisPass:RemoveUser(userId)
    Config.WHITELIST[userId] = nil
end

function AegisPass:GetWhitelist()
    return Config.WHITELIST
end

return AegisPass
