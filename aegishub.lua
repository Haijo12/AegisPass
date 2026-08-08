-- Aegis Hub v1.0.0 — Self-contained, zero external requests

-- ==================== CONFIG ====================

local ConfigSettings = {
    ScriptName = "Aegis Hub",
    Version = "1.0.0",
    EnableUserWhitelist = true,
    EnableGameWhitelist = true,
    DenyMessage = "[Aegis Hub] Access Denied.",
    ShowUIOnLoad = true,
}

-- ==================== WHITELIST (EDIT HERE) ====================

local ConfigWhitelist = {
    [11369517300] = {Tier = "Owner", Note = "iswg66qt17u"},
    [123456789]   = {Tier = "Premium", Note = "TestUser", ExpiresAt = os.time({year=2026, month=8, day=15, hour=23, min=0, sec=0})},
    [111111111]   = {Tier = "Freemium", Note = "GuestOne", ExpiresAt = os.time({year=2026, month=8, day=10, hour=12, min=0, sec=0})},
}

local ConfigAllowedGames = {123974602339071}

-- ==================== CORE ====================

local function UserWhitelist(userId, whitelist, enabled)
    if not enabled then return true, {Tier = "freemium"} end
    local entry = whitelist[userId]
    if not entry then return false, nil end
    if entry.ExpiresAt and os.time() > entry.ExpiresAt then return false, entry end
    return true, entry
end

local function GameWhitelist(placeId, allowedGames, enabled)
    if not enabled then return true end
    if #allowedGames == 0 then return true end
    for _, id in ipairs(allowedGames) do if id == placeId then return true end end
    return false
end

local function TimeRemaining(entry)
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
end

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

-- ==================== LOADING SCREEN ====================

local function LoadingScreen(config)
    local TweenService = game:GetService("TweenService")
    local Players = game:GetService("Players")
    local MarketplaceService = game:GetService("MarketplaceService")
    local player = Players.LocalPlayer
    local playerGui = player:WaitForChild("PlayerGui")
    
    local old = playerGui:FindFirstChild("AegisHubLoading")
    if old then old:Destroy() end
    
    local screenGui = Instance.new("ScreenGui")
    screenGui.Name = "AegisHubLoading"
    screenGui.ResetOnSpawn = false
    screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling
    screenGui.DisplayOrder = 999999
    screenGui.Parent = playerGui
    
    local card = Instance.new("Frame")
    card.Size = UDim2.new(0, 420, 0, 170)
    card.Position = UDim2.new(0.5, -210, 0.5, -85)
    card.BackgroundColor3 = Color3.fromRGB(22, 22, 30)
    card.BorderSizePixel = 0
    card.Parent = screenGui
    
    local cardGradient = Instance.new("UIGradient")
    cardGradient.Color = ColorSequence.new({
        ColorSequenceKeypoint.new(0, Color3.fromRGB(35, 35, 55)),
        ColorSequenceKeypoint.new(1, Color3.fromRGB(18, 18, 25))
    })
    cardGradient.Rotation = 135
    cardGradient.Parent = card
    
    local cardCorner = Instance.new("UICorner")
    cardCorner.CornerRadius = UDim.new(0, 16)
    cardCorner.Parent = card
    
    local cardStroke = Instance.new("UIStroke")
    cardStroke.Color = Color3.fromRGB(60, 60, 85)
    cardStroke.Thickness = 1
    cardStroke.Transparency = 0.5
    cardStroke.Parent = card
    
    local glow = Instance.new("Frame")
    glow.Size = UDim2.new(1, 20, 1, 20)
    glow.Position = UDim2.new(0, -10, 0, -10)
    glow.BackgroundColor3 = Color3.fromRGB(80, 120, 255)
    glow.BackgroundTransparency = 0.92
    glow.BorderSizePixel = 0
    glow.ZIndex = -1
    glow.Parent = card
    
    local glowCorner = Instance.new("UICorner")
    glowCorner.CornerRadius = UDim.new(0, 20)
    glowCorner.Parent = glow
    
    local leftSide = Instance.new("Frame")
    leftSide.Size = UDim2.new(1, -130, 1, -40)
    leftSide.Position = UDim2.new(0, 24, 0, 20)
    leftSide.BackgroundTransparency = 1
    leftSide.Parent = card
    
    local accentLine = Instance.new("Frame")
    accentLine.Size = UDim2.new(0, 3, 0, 36)
    accentLine.Position = UDim2.new(0, 0, 0, 6)
    accentLine.BackgroundColor3 = Color3.fromRGB(100, 150, 255)
    accentLine.BorderSizePixel = 0
    accentLine.Parent = leftSide
    
    local accentLineCorner = Instance.new("UICorner")
    accentLineCorner.CornerRadius = UDim.new(1, 0)
    accentLineCorner.Parent = accentLine
    
    local title = Instance.new("TextLabel")
    title.Size = UDim2.new(1, -16, 0, 30)
    title.Position = UDim2.new(0, 12, 0, 4)
    title.BackgroundTransparency = 1
    title.Text = config.ScriptName
    title.TextColor3 = Color3.fromRGB(245, 245, 255)
    title.Font = Enum.Font.GothamBold
    title.TextSize = 26
    title.TextXAlignment = Enum.TextXAlignment.Left
    title.Parent = leftSide
    
    local userRow = Instance.new("Frame")
    userRow.Size = UDim2.new(1, 0, 0, 18)
    userRow.Position = UDim2.new(0, 0, 0, 42)
    userRow.BackgroundTransparency = 1
    userRow.Parent = leftSide
    
    local userDot = Instance.new("Frame")
    userDot.Size = UDim2.new(0, 6, 0, 6)
    userDot.Position = UDim2.new(0, 2, 0, 6)
    userDot.BackgroundColor3 = Color3.fromRGB(100, 200, 255)
    userDot.BorderSizePixel = 0
    userDot.Parent = userRow
    
    local userDotCorner = Instance.new("UICorner")
    userDotCorner.CornerRadius = UDim.new(1, 0)
    userDotCorner.Parent = userDot
    
    local usernameLabel = Instance.new("TextLabel")
    usernameLabel.Size = UDim2.new(1, -14, 1, 0)
    usernameLabel.Position = UDim2.new(0, 14, 0, 0)
    usernameLabel.BackgroundTransparency = 1
    usernameLabel.Text = player.Name
    usernameLabel.TextColor3 = Color3.fromRGB(180, 180, 200)
    usernameLabel.Font = Enum.Font.Gotham
    usernameLabel.TextSize = 14
    usernameLabel.TextXAlignment = Enum.TextXAlignment.Left
    usernameLabel.Parent = userRow
    
    local gameName = "Unknown"
    pcall(function() gameName = MarketplaceService:GetProductInfo(game.PlaceId).Name end)
    
    local gameRow = Instance.new("Frame")
    gameRow.Size = UDim2.new(1, 0, 0, 16)
    gameRow.Position = UDim2.new(0, 0, 0, 62)
    gameRow.BackgroundTransparency = 1
    gameRow.Parent = leftSide
    
    local gameDot = Instance.new("Frame")
    gameDot.Size = UDim2.new(0, 6, 0, 6)
    gameDot.Position = UDim2.new(0, 2, 0, 5)
    gameDot.BackgroundColor3 = Color3.fromRGB(255, 180, 100)
    gameDot.BorderSizePixel = 0
    gameDot.Parent = gameRow
    
    local gameDotCorner = Instance.new("UICorner")
    gameDotCorner.CornerRadius = UDim.new(1, 0)
    gameDotCorner.Parent = gameDot
    
    local gameLabel = Instance.new("TextLabel")
    gameLabel.Size = UDim2.new(1, -14, 1, 0)
    gameLabel.Position = UDim2.new(0, 14, 0, 0)
    gameLabel.BackgroundTransparency = 1
    gameLabel.Text = gameName
    gameLabel.TextColor3 = Color3.fromRGB(140, 140, 160)
    gameLabel.Font = Enum.Font.Gotham
    gameLabel.TextSize = 12
    gameLabel.TextXAlignment = Enum.TextXAlignment.Left
    gameLabel.Parent = gameRow
    
    local status = Instance.new("TextLabel")
    status.Name = "Status"
    status.Size = UDim2.new(1, 0, 0, 16)
    status.Position = UDim2.new(0, 0, 0, 92)
    status.BackgroundTransparency = 1
    status.Text = "Initializing..."
    status.TextColor3 = Color3.fromRGB(160, 160, 180)
    status.Font = Enum.Font.Gotham
    status.TextSize = 12
    status.TextXAlignment = Enum.TextXAlignment.Left
    status.Parent = leftSide
    
    local barBg = Instance.new("Frame")
    barBg.Size = UDim2.new(1, 0, 0, 4)
    barBg.Position = UDim2.new(0, 0, 0, 118)
    barBg.BackgroundColor3 = Color3.fromRGB(40, 40, 55)
    barBg.BorderSizePixel = 0
    barBg.Parent = leftSide
    
    local barBgCorner = Instance.new("UICorner")
    barBgCorner.CornerRadius = UDim.new(1, 0)
    barBgCorner.Parent = barBg
    
    local barFill = Instance.new("Frame")
    barFill.Size = UDim2.new(0, 0, 1, 0)
    barFill.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
    barFill.BorderSizePixel = 0
    barFill.Parent = barBg
    
    local barGradient = Instance.new("UIGradient")
    barGradient.Color = ColorSequence.new({
        ColorSequenceKeypoint.new(0, Color3.fromRGB(80, 200, 255)),
        ColorSequenceKeypoint.new(1, Color3.fromRGB(140, 100, 255))
    })
    barGradient.Parent = barFill
    
    local barFillCorner = Instance.new("UICorner")
    barFillCorner.CornerRadius = UDim.new(1, 0)
    barFillCorner.Parent = barFill
    
    local avatarRing = Instance.new("Frame")
    avatarRing.Size = UDim2.new(0, 78, 0, 78)
    avatarRing.Position = UDim2.new(1, -102, 0.5, -39)
    avatarRing.BackgroundColor3 = Color3.fromRGB(100, 150, 255)
    avatarRing.BorderSizePixel = 0
    avatarRing.Parent = card
    
    local avatarRingCorner = Instance.new("UICorner")
    avatarRingCorner.CornerRadius = UDim.new(1, 0)
    avatarRingCorner.Parent = avatarRing
    
    local avatarFrame = Instance.new("Frame")
    avatarFrame.Size = UDim2.new(1, -6, 1, -6)
    avatarFrame.Position = UDim2.new(0, 3, 0, 3)
    avatarFrame.BackgroundColor3 = Color3.fromRGB(30, 30, 40)
    avatarFrame.BorderSizePixel = 0
    avatarFrame.Parent = avatarRing
    
    local avatarCorner = Instance.new("UICorner")
    avatarCorner.CornerRadius = UDim.new(1, 0)
    avatarCorner.Parent = avatarFrame
    
    local avatarImg = Instance.new("ImageLabel")
    avatarImg.Size = UDim2.new(1, -8, 1, -8)
    avatarImg.Position = UDim2.new(0, 4, 0, 4)
    avatarImg.BackgroundTransparency = 1
    avatarImg.Image = ""
    avatarImg.Parent = avatarFrame
    
    local avatarImgCorner = Instance.new("UICorner")
    avatarImgCorner.CornerRadius = UDim.new(1, 0)
    avatarImgCorner.Parent = avatarImg
    
    task.spawn(function()
        local success, thumb = pcall(function()
            return Players:GetUserThumbnailAsync(player.UserId, Enum.ThumbnailType.HeadShot, Enum.ThumbnailSize.Size420x420)
        end)
        if success then avatarImg.Image = thumb end
    end)
    
    local function update(text, progress, color)
        status.Text = text
        if color then
            status.TextColor3 = color
            barGradient.Color = ColorSequence.new({
                ColorSequenceKeypoint.new(0, color),
                ColorSequenceKeypoint.new(1, Color3.fromRGB(140, 100, 255))
            })
        end
        if progress then
            TweenService:Create(barFill, TweenInfo.new(0.4, Enum.EasingStyle.Quart), {
                Size = UDim2.new(progress, 0, 1, 0)
            }):Play()
        end
        task.wait(0.4)
    end
    
    local function finish(finalText, finalColor, success)
        update(finalText, 1, finalColor)
        task.wait(success and 0.8 or 1.5)
        
        TweenService:Create(card, TweenInfo.new(0.6, Enum.EasingStyle.Quart), {
            BackgroundTransparency = 1
        }):Play()
        
        for _, child in ipairs(card:GetDescendants()) do
            if child:IsA("TextLabel") then
                TweenService:Create(child, TweenInfo.new(0.4), {TextTransparency = 1}):Play()
            elseif child:IsA("ImageLabel") then
                TweenService:Create(child, TweenInfo.new(0.4), {ImageTransparency = 1}):Play()
            elseif child:IsA("Frame") then
                TweenService:Create(child, TweenInfo.new(0.4), {BackgroundTransparency = 1}):Play()
            end
        end
        
        task.wait(0.7)
        screenGui:Destroy()
    end
    
    return {Update = update, Finish = finish}
end

-- ==================== MAIN ====================

local AegisHub = {}
function AegisHub:Init()
    local loader = LoadingScreen(ConfigSettings)
    loader.Update("Initializing...", 0.15)
    loader.Update("Authenticating...", 0.4)
    
    local r = Validate(ConfigSettings, ConfigWhitelist, ConfigAllowedGames)
    
    -- DEBUG: yellow warn, each on separate line
    warn("[Aegis Hub] ========== DEBUG ==========")
    warn("[Aegis Hub] UserId:    " .. tostring(r.UserId))
    warn("[Aegis Hub] Username:  " .. tostring(r.Username))
    warn("[Aegis Hub] PlaceId:   " .. tostring(r.PlaceId))
    warn("[Aegis Hub] GameName:  " .. tostring(r.GameName))
    warn("[Aegis Hub] Whitelist: " .. tostring(r.IsWhitelisted))
    warn("[Aegis Hub] Game:      " .. tostring(r.IsGameAllowed))
    warn("[Aegis Hub] CanRun:    " .. tostring(r.CanRun))
    warn("[Aegis Hub] ============================")
    
    loader.Update("Verifying access...", 0.7)
    
    if not r.CanRun then
        loader.Finish("Access Denied", Color3.fromRGB(255, 80, 80), false)
        warn("[Aegis Hub] Access Denied.")
        return false, r
    end
    
    warn("[Aegis Hub] User " .. r.Username .. " whitelisted")
    warn("[Aegis Hub] Game " .. r.GameName .. " allowed")
    loader.Finish("Welcome, " .. r.Username, Color3.fromRGB(80, 220, 160), true)
    return true, r
end

function AegisHub:AddUser(userId, tier, expiresAt, note)
    ConfigWhitelist[userId] = {Tier = tier or "freemium", ExpiresAt = expiresAt, Note = note}
end

function AegisHub:RemoveUser(userId)
    ConfigWhitelist[userId] = nil
end

function AegisHub:GetWhitelist()
    return ConfigWhitelist
end

AegisHub:Init()
return AegisHub
