--[[ Core.lua ]]
local Core = {}
local MarketplaceService = game:GetService("MarketplaceService")
local Players = game:GetService("Players")

function Core:IsWhitelisted(userId, whitelist, enabled)
    if not enabled then return true, {Tier = "freemium"} end
    local entry = whitelist[userId]
    if not entry then return false, nil end
    if entry.ExpiresAt and os.time() > entry.ExpiresAt then return false, entry end
    return true, entry
end

function Core:IsGameAllowed(placeId, allowedGames, enabled)
    if not enabled then return true end
    if #allowedGames == 0 then return true end
    for _, id in ipairs(allowedGames) do if id == placeId then return true end end
    return false
end

function Core:GetTimeRemaining(entry)
    if not entry or not entry.ExpiresAt then return "Unlimited", Color3.fromRGB(0, 255, 136) end
    local r = entry.ExpiresAt - os.time()
    if r <= 0 then return "Expired", Color3.fromRGB(255, 50, 50) end
    local d = math.floor(r / 86400); r = r % 86400
    local h = math.floor(r / 3600); r = r % 3600
    local m = math.floor(r / 60)
    local text = d > 0 and string.format("%dd %dh %dm", d, h, m) or h > 0 and string.format("%dh %dm", h, m) or string.format("%dm", m)
    local color = Color3.fromRGB(0, 255, 136)
    if d == 0 and h < 1 then color = Color3.fromRGB(255, 50, 50)
    elseif d == 0 then color = Color3.fromRGB(255, 150, 0)
    elseif d <= 3 then color = Color3.fromRGB(255, 200, 0) end
    return text, color
end

function Core:Validate(cfg, whitelist, allowedGames)
    local lp = Players.LocalPlayer
    local r = {UserId = lp.UserId, Username = lp.Name, PlaceId = game.PlaceId, GameName = "Unknown", IsWhitelisted = false, IsGameAllowed = false, Tier = nil, TimeRemaining = nil, TimeColor = nil, CanRun = false}
    pcall(function() r.GameName = MarketplaceService:GetProductInfo(game.PlaceId).Name end)
    r.IsGameAllowed = self:IsGameAllowed(game.PlaceId, allowedGames, cfg.EnableGameWhitelist)
    r.IsWhitelisted, r.Entry = self:IsWhitelisted(lp.UserId, whitelist, cfg.EnableUserWhitelist)
    if r.Entry then r.Tier = r.Entry.Tier; r.TimeRemaining, r.TimeColor = self:GetTimeRemaining(r.Entry) end
    r.CanRun = r.IsWhitelisted and r.IsGameAllowed
    return r
end

return Core
