local BASE_URL = "https://raw.githubusercontent.com/Haijo12/AegisPass/main/modules/core/"

local IsWhitelisted    = loadstring(game:HttpGet(BASE_URL .. "user_whitelist.lua"))()
local IsGameAllowed    = loadstring(game:HttpGet(BASE_URL .. "game_whitelist.lua"))()
local GetTimeRemaining = loadstring(game:HttpGet(BASE_URL .. "time_remaining.lua"))()

local Players = game:GetService("Players")
local MarketplaceService = game:GetService("MarketplaceService")

return function(cfg, whitelist, allowedGames)
    local lp = Players.LocalPlayer
    local r = {UserId = lp.UserId, Username = lp.Name, PlaceId = game.PlaceId, GameName = "Unknown", IsWhitelisted = false, IsGameAllowed = false, Tier = nil, TimeRemaining = nil, TimeColor = nil, CanRun = false}
    pcall(function() r.GameName = MarketplaceService:GetProductInfo(game.PlaceId).Name end)
    r.IsGameAllowed = IsGameAllowed(game.PlaceId, allowedGames, cfg.EnableGameWhitelist)
    r.IsWhitelisted, r.Entry = IsWhitelisted(lp.UserId, whitelist, cfg.EnableUserWhitelist)
    if r.Entry then r.Tier = r.Entry.Tier; r.TimeRemaining, r.TimeColor = GetTimeRemaining(r.Entry) end
    r.CanRun = r.IsWhitelisted and r.IsGameAllowed
    return r
end
