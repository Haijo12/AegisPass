local BASE_URL = "https://raw.githubusercontent.com/Haijo12/AegisPass/main/"

-- Anti-duplicate: prevent double execution
if getgenv().AegisPassLoaded then return end
getgenv().AegisPassLoaded = true

local Config = loadstring(game:HttpGet(BASE_URL .. "config.lua"))()
local Core   = loadstring(game:HttpGet(BASE_URL .. "core.lua"))()

local AegisPass = {}

function AegisPass:Init()
    local LoadingScreen = loadstring(game:HttpGet(BASE_URL .. "modules/ui/loading_screen.lua"))()
    local loader = LoadingScreen(Config.Settings)

    loader.Update("Loading configuration...", 0.15)
    loader.Update("Checking whitelist...", 0.4)

    local r = Core.Validate(Config.Settings, Config.Whitelist, Config.AllowedGames)

    loader.Update("Verifying access...", 0.7)

    if not r.CanRun then
        loader.Finish("Access Denied", Color3.fromRGB(255, 70, 70), false)
        warn(Config.Settings.DenyMessage)
        return false, r
    end

    loader.Finish("Welcome, " .. r.Username, Color3.fromRGB(0, 230, 120), true)
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
