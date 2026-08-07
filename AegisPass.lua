--[[
    AEGISPASS - Script Whitelist System
    github.com/Haijo12/AegisPass
]]

local AegisPass = {}

-- ═══════════════════════════════════════════════════════════════
-- EDIT THIS: Add your UserIds here
-- ═══════════════════════════════════════════════════════════════

local WHITELIST = {
    -- Replace 123456789 with YOUR Roblox UserId
    [123456789] = {
        Tier = "lifetime",      -- "freemium", "premium", "lifetime", "dev"
        ExpiresAt = nil,        -- nil = never expires, or use unix timestamp
        Note = "Owner",
    },
}

-- Allowed PlaceIds (empty = all games allowed)
local ALLOWED_GAMES = {}

-- ═══════════════════════════════════════════════════════════════
-- CONFIG
-- ═══════════════════════════════════════════════════════════════

local CONFIG = {
    ScriptName = "AegisPass",
    Version = "1.0.0",
    EnableUserWhitelist = true,
    EnableGameWhitelist = false,
    DenyMessage = "[AegisPass] Access Denied.",
    ShowUIOnLoad = true,
}

-- ═══════════════════════════════════════════════════════════════
-- SERVICES
-- ═══════════════════════════════════════════════════════════════

local Players = game:GetService("Players")
local MarketplaceService = game:GetService("MarketplaceService")
local lp = Players.LocalPlayer
local PlaceId = game.PlaceId

-- ═══════════════════════════════════════════════════════════════
-- CORE
-- ═══════════════════════════════════════════════════════════════

function AegisPass:IsWhitelisted(userId)
    if not CONFIG.EnableUserWhitelist then return true, {Tier="freemium"} end
    local entry = WHITELIST[userId]
    if not entry then return false, nil end
    if entry.ExpiresAt and os.time() > entry.ExpiresAt then return false, entry end
    return true, entry
end

function AegisPass:IsGameAllowed(placeId)
    if not CONFIG.EnableGameWhitelist then return true end
    if #ALLOWED_GAMES == 0 then return true end
    for _, id in ipairs(ALLOWED_GAMES) do if id == placeId then return true end end
    return false
end

function AegisPass:GetTimeRemaining(entry)
    if not entry or not entry.ExpiresAt then return "Unlimited", Color3.fromRGB(0,255,136) end
    local r = entry.ExpiresAt - os.time()
    if r <= 0 then return "Expired", Color3.fromRGB(255,50,50) end
    local d = math.floor(r/86400); r=r%86400
    local h = math.floor(r/3600); r=r%3600
    local m = math.floor(r/60)
    local text = d>0 and string.format("%dd %dh %dm",d,h,m) or h>0 and string.format("%dh %dm",h,m) or string.format("%dm",m)
    local color = d==0 and h<1 and Color3.fromRGB(255,50,50) or d==0 and Color3.fromRGB(255,150,0) or d<=3 and Color3.fromRGB(255,200,0) or Color3.fromRGB(0,255,136)
    return text, color
end

function AegisPass:GetTierInfo(tier)
    local t = {freemium={Label="Freemium",Color=Color3.fromRGB(150,150,150)},premium={Label="Premium",Color=Color3.fromRGB(255,215,0)},dev={Label="Dev",Color=Color3.fromRGB(0,200,255)},lifetime={Label="Lifetime",Color=Color3.fromRGB(180,100,255)}}
    return t[tier] or t.freemium
end

function AegisPass:Validate()
    local r = {UserId=lp.UserId, Username=lp.Name, PlaceId=PlaceId, GameName="Unknown", IsWhitelisted=false, IsGameAllowed=false, Tier=nil, TimeRemaining=nil, TimeColor=nil, CanRun=false}
    pcall(function() r.GameName = MarketplaceService:GetProductInfo(PlaceId).Name end)
    r.IsGameAllowed = self:IsGameAllowed(PlaceId)
    r.IsWhitelisted, r.Entry = self:IsWhitelisted(lp.UserId)
    if r.Entry then r.Tier=r.Entry.Tier; r.TimeRemaining, r.TimeColor = self:GetTimeRemaining(r.Entry) end
    r.CanRun = r.IsWhitelisted and r.IsGameAllowed
    return r
end

function AegisPass:ShowUI(results)
    local ok, Rayfield = pcall(function() return loadstring(game:HttpGet("https://sirius.menu/gen2"))() end)
    if not ok then warn("[AegisPass] Rayfield failed"); return end
    local tierInfo = self:GetTierInfo(results.Tier or "freemium")
    local w = Rayfield:CreateWindow({Name=CONFIG.ScriptName, Subtitle="v"..CONFIG.Version, LoadingTitle=CONFIG.ScriptName, LoadingSubtitle="Validating...", Theme="Default", DisableMovement=false, DisableBuildWarnings=true})
    local tab = w:CreateTab({Name="Access", Icon="shield"})
    tab:CreateTag({Name="Status", Value=results.CanRun and "AUTHORIZED" or "DENIED", Color=results.CanRun and Color3.fromRGB(0,255,100) or Color3.fromRGB(255,50,50)})
    tab:CreateDivider()
    tab:CreateStat({Name="User", Value=results.Username.." ("..results.UserId..")"})
    tab:CreateStat({Name="Game", Value=results.GameName.." ("..results.PlaceId..")"})
    tab:CreateDivider()
    tab:CreateTag({Name="License", Value=tierInfo.Label, Color=tierInfo.Color})
    if results.TimeRemaining then tab:CreateTag({Name="Time Left", Value=results.TimeRemaining, Color=results.TimeColor}) end
    tab:CreateDivider()
    tab:CreateStat({Name="User Check", Value=results.IsWhitelisted and "PASS" or "FAIL"})
    tab:CreateStat({Name="Game Check", Value=results.IsGameAllowed and "PASS" or "FAIL"})
    if results.Entry and results.Entry.Note then tab:CreateStat({Name="Note", Value=results.Entry.Note}) end
    if not results.CanRun then tab:CreateDivider(); tab:CreateButton({Name="Purchase Access", Callback=function() Rayfield:Notify({Title="AegisPass", Content="Contact the script owner.", Duration=5}) end}) end
    return w, Rayfield
end

function AegisPass:Init()
    print("[AegisPass] v"..CONFIG.Version)
    local r = self:Validate()
    print("[AegisPass] User:", r.Username, r.UserId)
    print("[AegisPass] CanRun:", r.CanRun)
    if r.Tier then print("[AegisPass] Tier:", r.Tier) end
    if r.TimeRemaining then print("[AegisPass] Time Left:", r.TimeRemaining) end
    if CONFIG.ShowUIOnLoad then self:ShowUI(r) end
    if not r.CanRun then warn(CONFIG.DenyMessage); return false, r end
    print("[AegisPass] Welcome,", r.Username.."!")
    return true, r
end

function AegisPass:AddUser(userId, tier, expiresAt, note) WHITELIST[userId]={Tier=tier or "freemium", ExpiresAt=expiresAt, Note=note} end
function AegisPass:RemoveUser(userId) WHITELIST[userId]=nil end
function AegisPass:GetWhitelist() return WHITELIST end

return AegisPass
