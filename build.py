#!/usr/bin/env python3
import os

# Read whitelist from repo (only external file)
def read(path):
    with open(path) as f:
        return f.read()

wl = read('whitelist_easy.txt')

# All Lua source code embedded here — edit these strings to change behavior
SCRIPT_SETTINGS = '''return {
    ScriptName = "AegisPass",
    Version = "1.0.0",
    EnableUserWhitelist = true,
    EnableGameWhitelist = false,
    DenyMessage = "[AegisPass] Access Denied.",
    ShowUIOnLoad = true,
}'''

USER_WHITELIST = '''return function(userId, whitelist, enabled)
    if not enabled then return true, {Tier = "freemium"} end
    local entry = whitelist[userId]
    if not entry then return false, nil end
    if entry.ExpiresAt and os.time() > entry.ExpiresAt then return false, entry end
    return true, entry
end'''

GAME_WHITELIST = '''return function(placeId, allowedGames, enabled)
    if not enabled then return true end
    if #allowedGames == 0 then return true end
    for _, id in ipairs(allowedGames) do if id == placeId then return true end end
    return false
end'''

TIME_REMAINING = '''return function(entry)
    if not entry or not entry.ExpiresAt then
        return "Unlimited", Color3.fromRGB(0, 255, 136)
    end
    local remaining = entry.ExpiresAt - os.time()
    if remaining <= 0 then return "Expired", Color3.fromRGB(255, 50, 50) end
    local days = math.floor(remaining / 86400); remaining = remaining % 86400
    local hours = math.floor(remaining / 3600); remaining = remaining % 3600
    local minutes = math.floor(remaining / 60)
    local text
    if days > 0 then text = string.format("%dd %dh %dm", days, hours, minutes)
    elseif hours > 0 then text = string.format("%dh %dm", hours, minutes)
    else text = string.format("%dm", minutes) end
    local color = Color3.fromRGB(0, 255, 136)
    if days == 0 and hours < 1 then color = Color3.fromRGB(255, 50, 50)
    elseif days == 0 then color = Color3.fromRGB(255, 150, 0)
    elseif days <= 3 then color = Color3.fromRGB(255, 200, 0) end
    return text, color
end'''

LOADING_SCREEN = '''return function(config)
    local TweenService = game:GetService("TweenService")
    local Players = game:GetService("Players")
    local MarketplaceService = game:GetService("MarketplaceService")
    local player = Players.LocalPlayer
    local playerGui = player:WaitForChild("PlayerGui")
    local old = playerGui:FindFirstChild("AegisPassLoading")
    if old then old:Destroy() end
    local screenGui = Instance.new("ScreenGui")
    screenGui.Name = "AegisPassLoading"
    screenGui.ResetOnSpawn = false
    screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
    screenGui.DisplayOrder = 999999
    screenGui.Parent = playerGui
    local card = Instance.new("Frame")
    card.Size = UDim2.new(0, 400, 0, 160)
    card.Position = UDim2.new(0.5, -200, 0.5, -80)
    card.BackgroundColor3 = Color3.fromRGB(25, 25, 30)
    card.BorderSizePixel = 0
    card.Parent = screenGui
    local corner = Instance.new("UICorner")
    corner.CornerRadius = UDim.new(0, 12)
    corner.Parent = card
    local stroke = Instance.new("UIStroke")
    stroke.Color = Color3.fromRGB(45, 45, 55)
    stroke.Thickness = 1
    stroke.Parent = card
    local leftSide = Instance.new("Frame")
    leftSide.Size = UDim2.new(1, -110, 1, 0)
    leftSide.Position = UDim2.new(0, 20, 0, 0)
    leftSide.BackgroundTransparency = 1
    leftSide.Parent = card
    local title = Instance.new("TextLabel")
    title.Size = UDim2.new(1, 0, 0, 26)
    title.Position = UDim2.new(0, 0, 0, 16)
    title.BackgroundTransparency = 1
    title.Text = config.ScriptName
    title.TextColor3 = Color3.fromRGB(240, 240, 245)
    title.Font = Enum.Font.GothamBold
    title.TextSize = 22
    title.TextXAlignment = Enum.TextXAlignment.Left
    title.Parent = leftSide
    local usernameLabel = Instance.new("TextLabel")
    usernameLabel.Size = UDim2.new(1, 0, 0, 16)
    usernameLabel.Position = UDim2.new(0, 0, 0, 44)
    usernameLabel.BackgroundTransparency = 1
    usernameLabel.Text = player.Name
    usernameLabel.TextColor3 = Color3.fromRGB(180, 180, 190)
    usernameLabel.Font = Enum.Font.Gotham
    usernameLabel.TextSize = 13
    usernameLabel.TextXAlignment = Enum.TextXAlignment.Left
    usernameLabel.Parent = leftSide
    local gameName = "Unknown"
    pcall(function() gameName = MarketplaceService:GetProductInfo(game.PlaceId).Name end)
    local gameLabel = Instance.new("TextLabel")
    gameLabel.Size = UDim2.new(1, 0, 0, 16)
    gameLabel.Position = UDim2.new(0, 0, 0, 62)
    gameLabel.BackgroundTransparency = 1
    gameLabel.Text = gameName
    gameLabel.TextColor3 = Color3.fromRGB(140, 140, 150)
    gameLabel.Font = Enum.Font.Gotham
    gameLabel.TextSize = 12
    gameLabel.TextXAlignment = Enum.TextXAlignment.Left
    gameLabel.Parent = leftSide
    local status = Instance.new("TextLabel")
    status.Name = "Status"
    status.Size = UDim2.new(1, 0, 0, 16)
    status.Position = UDim2.new(0, 0, 0, 90)
    status.BackgroundTransparency = 1
    status.Text = "Validating..."
    status.TextColor3 = Color3.fromRGB(160, 160, 170)
    status.Font = Enum.Font.Gotham
    status.TextSize = 12
    status.TextXAlignment = Enum.TextXAlignment.Left
    status.Parent = leftSide
    local barBg = Instance.new("Frame")
    barBg.Size = UDim2.new(1, 0, 0, 3)
    barBg.Position = UDim2.new(0, 0, 0, 118)
    barBg.BackgroundColor3 = Color3.fromRGB(40, 40, 50)
    barBg.BorderSizePixel = 0
    barBg.Parent = leftSide
    local barBgCorner = Instance.new("UICorner")
    barBgCorner.CornerRadius = UDim.new(1, 0)
    barBgCorner.Parent = barBg
    local barFill = Instance.new("Frame")
    barFill.Size = UDim2.new(0, 0, 1, 0)
    barFill.BackgroundColor3 = Color3.fromRGB(0, 170, 255)
    barFill.BorderSizePixel = 0
    barFill.Parent = barBg
    local barFillCorner = Instance.new("UICorner")
    barFillCorner.CornerRadius = UDim.new(1, 0)
    barFillCorner.Parent = barFill
    local avatarFrame = Instance.new("Frame")
    avatarFrame.Size = UDim2.new(0, 70, 0, 70)
    avatarFrame.Position = UDim2.new(1, -90, 0, 22)
    avatarFrame.BackgroundColor3 = Color3.fromRGB(35, 35, 40)
    avatarFrame.BorderSizePixel = 0
    avatarFrame.Parent = card
    local avatarCorner = Instance.new("UICorner")
    avatarCorner.CornerRadius = UDim.new(0, 8)
    avatarCorner.Parent = avatarFrame
    local avatarStroke = Instance.new("UIStroke")
    avatarStroke.Color = Color3.fromRGB(55, 55, 65)
    avatarStroke.Thickness = 1
    avatarStroke.Parent = avatarFrame
    local avatarImg = Instance.new("ImageLabel")
    avatarImg.Size = UDim2.new(1, -4, 1, -4)
    avatarImg.Position = UDim2.new(0, 2, 0, 2)
    avatarImg.BackgroundTransparency = 1
    avatarImg.Image = ""
    avatarImg.Parent = avatarFrame
    task.spawn(function()
        local success, thumb = pcall(function()
            return Players:GetUserThumbnailAsync(player.UserId, Enum.ThumbnailType.HeadShot, Enum.ThumbnailSize.Size420x420)
        end)
        if success then avatarImg.Image = thumb end
    end)
    local function update(text, progress, color)
        status.Text = text
        if color then status.TextColor3 = color; barFill.BackgroundColor3 = color end
        if progress then
            TweenService:Create(barFill, TweenInfo.new(0.3, Enum.EasingStyle.Quad), {
                Size = UDim2.new(progress, 0, 1, 0)
            }):Play()
        end
        task.wait(0.4)
    end
    local function finish(finalText, finalColor, success)
        update(finalText, 1, finalColor)
        task.wait(success and 1.2 or 2)
        TweenService:Create(card, TweenInfo.new(0.4, Enum.EasingStyle.Quad), {
            Position = UDim2.new(0.5, -200, 0.5, -70),
            BackgroundTransparency = 1
        }):Play()
        for _, child in ipairs(card:GetDescendants()) do
            if child:IsA("TextLabel") or child:IsA("Frame") or child:IsA("ImageLabel") then
                TweenService:Create(child, TweenInfo.new(0.3), {
                    BackgroundTransparency = child:IsA("Frame") and 1 or nil,
                    TextTransparency = child:IsA("TextLabel") and 1 or nil,
                    ImageTransparency = child:IsA("ImageLabel") and 1 or nil
                }):Play()
            end
        end
        task.wait(0.5)
        screenGui:Destroy()
    end
    return {Update = update, Finish = finish}
end'''

# Build the bundle
settings = SCRIPT_SETTINGS.strip()
if settings.startswith('return '): settings = settings[7:]

template = '''-- AegisPass Bundle — Zero external requests
-- Rebuild: python build.py

local ConfigSettings = {SETTINGS}

local whitelist_easy_text = [=[
{WHITELIST}]=]

local function getTimezoneOffset()
    local t = os.time()
    local utc = os.date("!*t", t)
    local local_ = os.date("*t", t)
    utc.isdst = false; local_.isdst = false
    return os.difftime(os.time(local_), os.time(utc))
end

local function toPHTimestamp(year, month, day, hour)
    if year == "-" or not year then return nil end
    year, month, day, hour = tonumber(year), tonumber(month), tonumber(day), tonumber(hour)
    local localTs = os.time({year=year, month=month, day=day, hour=hour or 0, min=0, sec=0})
    return localTs + getTimezoneOffset() - (8 * 3600)
end

local ConfigWhitelist = {}
local lines = {}
for line in whitelist_easy_text:gmatch("[^\\r\\n]+") do table.insert(lines, line) end

local i = 1
while i <= #lines do
    local line = lines[i]:match("^%s*(.-)%s*$")
    if line ~= "" and not line:match("^%-%-") then
        local tier = line:match("^Tier%s*=%s*(.+)$")
        if tier then
            local entry = {Tier = tier, ExpiresAt = nil, Note = ""}
            i = i + 1
            while i <= #lines do
                local sub = lines[i]:match("^%s*(.-)%s*$")
                if sub == "" then break end
                if not sub:match("^%-%-") then
                    local key, val = sub:match("^(%S+)%s*=%s*(.+)$")
                    if key == "User" then entry.Note = val
                    elseif key == "UserId" then entry.UserId = tonumber(val)
                    elseif key == "Year" then entry._year = val
                    elseif key == "Month" then entry._month = val
                    elseif key == "Day" then entry._day = val
                    elseif key == "Hour" then entry._hour = val
                    end
                end
                i = i + 1
            end
            entry.ExpiresAt = toPHTimestamp(entry._year, entry._month, entry._day, entry._hour)
            entry._year, entry._month, entry._day, entry._hour = nil, nil, nil, nil
            if entry.UserId then ConfigWhitelist[entry.UserId] = entry end
        else
            i = i + 1
        end
    else
        i = i + 1
    end
end

local Config = {
    Settings = ConfigSettings,
    Whitelist = ConfigWhitelist,
    AllowedGames = {},
}

{USER_WL}

{GAME_WL}

{TIME_REM}

local Players = game:GetService("Players")
local MarketplaceService = game:GetService("MarketplaceService")

local function Validate(cfg, whitelist, allowedGames)
    local lp = Players.LocalPlayer
    local r = {
        UserId = lp.UserId, Username = lp.Name, PlaceId = game.PlaceId,
        GameName = "Unknown", IsWhitelisted = false, IsGameAllowed = false,
        Tier = nil, TimeRemaining = nil, TimeColor = nil, CanRun = false,
    }
    pcall(function() r.GameName = MarketplaceService:GetProductInfo(game.PlaceId).Name end)
    r.IsGameAllowed = GameWhitelist(game.PlaceId, allowedGames, cfg.EnableGameWhitelist)
    r.IsWhitelisted, r.Entry = UserWhitelist(lp.UserId, whitelist, cfg.EnableUserWhitelist)
    if r.Entry then
        r.Tier = r.Entry.Tier
        r.TimeRemaining, r.TimeColor = TimeRemaining(r.Entry)
    end
    r.CanRun = r.IsWhitelisted and r.IsGameAllowed
    return r
end

{LOADING}

local AegisPass = {}
function AegisPass:Init()
    if getgenv().AegisPassLoaded then return end
    getgenv().AegisPassLoaded = true
    local loader = LoadingScreen(Config.Settings)
    loader.Update("Loading configuration...", 0.15)
    loader.Update("Checking whitelist...", 0.4)
    local r = Validate(Config.Settings, Config.Whitelist, Config.AllowedGames)
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
'''

out = template.replace('{SETTINGS}', settings) \
              .replace('{WHITELIST}', wl) \
              .replace('{USER_WL}', USER_WHITELIST) \
              .replace('{GAME_WL}', GAME_WHITELIST) \
              .replace('{TIME_REM}', TIME_REMAINING) \
              .replace('{LOADING}', LOADING_SCREEN)

with open('aegispass.lua', 'w') as f:
    f.write(out)

sz = os.path.getsize('aegispass.lua')
print(f"✅ aegispass.lua ({sz} bytes) — ZERO external requests")
print("   Execute: loadstring(game:HttpGet('https://raw.githubusercontent.com/Haijo12/AegisPass/main/aegispass.lua'))()")
