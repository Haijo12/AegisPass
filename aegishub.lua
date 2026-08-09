--!strict
-- Aegis Hub v1.1.0 — Refactored
-- Layers: Theme → UI.Factory → UI.LoadingScreen → Auth → AegisHub

-- ==================== THEME ====================

local Theme = {
    Font = {
        Bold   = Enum.Font.GothamBold,
        Normal = Enum.Font.Gotham,
    },
    Color = {
        Background  = Color3.fromRGB(22, 22, 30),
        Surface     = Color3.fromRGB(35, 35, 55),
        Deep        = Color3.fromRGB(18, 18, 25),
        Accent      = Color3.fromRGB(100, 150, 255),
        AccentSoft  = Color3.fromRGB(80, 120, 255),
        Text        = Color3.fromRGB(245, 245, 255),
        TextDim     = Color3.fromRGB(180, 180, 200),
        TextMuted   = Color3.fromRGB(140, 140, 160),
        Stroke      = Color3.fromRGB(60, 60, 85),
        Error       = Color3.fromRGB(255, 80, 80),
        Success     = Color3.fromRGB(80, 220, 160),
        BarBg       = Color3.fromRGB(40, 40, 55),
        BarGradient = {
            Left  = Color3.fromRGB(80, 200, 255),
            Right = Color3.fromRGB(140, 100, 255),
        },
        Tier = {
            Unlimited = Color3.fromRGB(0, 255, 136),
            Urgent    = Color3.fromRGB(255, 50, 50),
            Short     = Color3.fromRGB(255, 150, 0),
            Warning   = Color3.fromRGB(255, 200, 0),
        },
    },
    Radius = {
        Card  = UDim.new(0, 16),
        Pill  = UDim.new(1, 0),
        Small = UDim.new(0, 20),
    },
    Size = {
        Card  = Vector2.new(420, 170),
        Bar   = 4,
        Ring  = 78,
        Dot   = 6,
        Glow  = 20,
        Pad   = 24,
    },
}

-- ==================== SERVICES ====================

local Players = game:GetService("Players")
local TweenService = game:GetService("TweenService")
local MarketplaceService = game:GetService("MarketplaceService")

-- ==================== CONFIG ====================

local Config = {
    ScriptName = "Aegis Hub",
    Version = "1.1.0",
    EnableUserWhitelist = true,
    EnableGameWhitelist = true,
    DenyMessage = "[Aegis Hub] Access Denied.",
    ShowUIOnLoad = true,
}

local Whitelist: {[number]: {Tier: string, Note: string?, ExpiresAt: number?}} = {
    [11369517300] = {Tier = "Owner", Note = "iswg66qt17u"},
    [123456789]   = {Tier = "Premium", Note = "TestUser", ExpiresAt = os.time({year=2026, month=8, day=15, hour=23, min=0, sec=0})},
    [111111111]   = {Tier = "Freemium", Note = "GuestOne", ExpiresAt = os.time({year=2026, month=8, day=10, hour=12, min=0, sec=0})},
}

local AllowedGames: {number} = {123974602339071}

-- ==================== AUTH ====================

local Auth = {}

function Auth.CheckUser(userId: number, enabled: boolean): (boolean, typeof(Whitelist[number])?)
    if not enabled then return true, {Tier = "freemium"} end
    local entry = Whitelist[userId]
    if not entry then return false, nil end
    if entry.ExpiresAt and os.time() > entry.ExpiresAt then return false, entry end
    return true, entry
end

function Auth.CheckGame(placeId: number, enabled: boolean): boolean
    if not enabled then return true end
    if #AllowedGames == 0 then return true end
    for _, id in ipairs(AllowedGames) do
        if id == placeId then return true end
    end
    return false
end

function Auth.TimeRemaining(entry: typeof(Whitelist[number])?): (string, Color3)
    if not entry or not entry.ExpiresAt then
        return "Unlimited", Theme.Color.Tier.Unlimited
    end
    local remaining = entry.ExpiresAt - os.time()
    if remaining <= 0 then
        return "Expired", Theme.Color.Tier.Urgent
    end

    local days = math.floor(remaining / 86400)
    local hours = math.floor((remaining % 86400) / 3600)
    local mins = math.floor((remaining % 3600) / 60)

    local text: string
    if days > 0 then
        text = string.format("%dd %dh %dm", days, hours, mins)
    elseif hours > 0 then
        text = string.format("%dh %dm", hours, mins)
    else
        text = string.format("%dm", mins)
    end

    local color = Theme.Color.Tier.Unlimited
    if days == 0 and hours < 1 then
        color = Theme.Color.Tier.Urgent
    elseif days == 0 then
        color = Theme.Color.Tier.Short
    elseif days <= 3 then
        color = Theme.Color.Tier.Warning
    end

    return text, color
end

function Auth.Validate(): {
    UserId: number, Username: string, PlaceId: number, GameName: string,
    IsWhitelisted: boolean, IsGameAllowed: boolean, Tier: string?,
    TimeRemaining: string?, TimeColor: Color3?, CanRun: boolean, Entry: typeof(Whitelist[number])?
}
    local lp = Players.LocalPlayer
    local result = {
        UserId = lp.UserId,
        Username = lp.Name,
        PlaceId = game.PlaceId,
        GameName = "Unknown",
        IsWhitelisted = false,
        IsGameAllowed = false,
        Tier = nil,
        TimeRemaining = nil,
        TimeColor = nil,
        CanRun = false,
        Entry = nil,
    }

    pcall(function()
        result.GameName = MarketplaceService:GetProductInfo(game.PlaceId).Name
    end)

    result.IsGameAllowed = Auth.CheckGame(game.PlaceId, Config.EnableGameWhitelist)
    result.IsWhitelisted, result.Entry = Auth.CheckUser(lp.UserId, Config.EnableUserWhitelist)

    if result.Entry then
        result.Tier = result.Entry.Tier
        result.TimeRemaining, result.TimeColor = Auth.TimeRemaining(result.Entry)
    end

    result.CanRun = result.IsWhitelisted and result.IsGameAllowed
    return result
end

-- ==================== UI FACTORY ====================

local UI = {}

function UI.New(class: string, props: {[string]: any}): Instance
    local inst = Instance.new(class)
    for k, v in pairs(props) do
        if k == "Parent" then continue end
        inst[k] = v
    end
    if props.Parent then
        inst.Parent = props.Parent
    end
    return inst
end

function UI.Corner(target: Instance, radius: UDim?)
    return UI.New("UICorner", {
        CornerRadius = radius or Theme.Radius.Card,
        Parent = target,
    })
end

function UI.Stroke(target: Instance, color: Color3?, thickness: number?, transparency: number?)
    return UI.New("UIStroke", {
        Color = color or Theme.Color.Stroke,
        Thickness = thickness or 1,
        Transparency = transparency or 0.5,
        Parent = target,
    })
end

function UI.Gradient(target: Instance, colors: {ColorSequenceKeypoint}, rotation: number?)
    return UI.New("UIGradient", {
        Color = ColorSequence.new(colors),
        Rotation = rotation or 0,
        Parent = target,
    })
end

function UI.Tween<T>(target: Instance, props: T, duration: number, style: Enum.EasingStyle?, dir: Enum.EasingDirection?)
    TweenService:Create(target, TweenInfo.new(duration, style or Enum.EasingStyle.Quart, dir or Enum.EasingDirection.Out), props):Play()
end

-- ==================== LOADING SCREEN ====================

function UI.LoadingScreen()
    local player = Players.LocalPlayer
    local playerGui = player:WaitForChild("PlayerGui")

    local old = playerGui:FindFirstChild("AegisHubLoading")
    if old then old:Destroy() end

    -- Root
    local screen = UI.New("ScreenGui", {
        Name = "AegisHubLoading",
        ResetOnSpawn = false,
        ZIndexBehavior = Enum.ZIndexBehavior.Sibling,
        DisplayOrder = 999999,
        Parent = playerGui,
    })

    local card = UI.New("Frame", {
        Size = UDim2.new(0, Theme.Size.Card.X, 0, Theme.Size.Card.Y),
        Position = UDim2.new(0.5, -Theme.Size.Card.X/2, 0.5, -Theme.Size.Card.Y/2),
        BackgroundColor3 = Theme.Color.Background,
        BorderSizePixel = 0,
        Parent = screen,
    })
    UI.Corner(card)
    UI.Stroke(card)
    UI.Gradient(card, {
        ColorSequenceKeypoint.new(0, Theme.Color.Surface),
        ColorSequenceKeypoint.new(1, Theme.Color.Deep),
    }, 135)

    -- Glow
    local glow = UI.New("Frame", {
        Size = UDim2.new(1, Theme.Size.Glow, 1, Theme.Size.Glow),
        Position = UDim2.new(0, -Theme.Size.Glow/2, 0, -Theme.Size.Glow/2),
        BackgroundColor3 = Theme.Color.AccentSoft,
        BackgroundTransparency = 0.92,
        BorderSizePixel = 0,
        ZIndex = -1,
        Parent = card,
    })
    UI.Corner(glow, Theme.Radius.Small)

    -- Left content container
    local left = UI.New("Frame", {
        Size = UDim2.new(1, -130, 1, -40),
        Position = UDim2.new(0, Theme.Size.Pad, 0, 20),
        BackgroundTransparency = 1,
        Parent = card,
    })

    -- Accent line
    local accent = UI.New("Frame", {
        Size = UDim2.new(0, 3, 0, 36),
        Position = UDim2.new(0, 0, 0, 6),
        BackgroundColor3 = Theme.Color.Accent,
        BorderSizePixel = 0,
        Parent = left,
    })
    UI.Corner(accent, Theme.Radius.Pill)

    -- Title
    UI.New("TextLabel", {
        Size = UDim2.new(1, -16, 0, 30),
        Position = UDim2.new(0, 12, 0, 4),
        BackgroundTransparency = 1,
        Text = Config.ScriptName,
        TextColor3 = Theme.Color.Text,
        Font = Theme.Font.Bold,
        TextSize = 26,
        TextXAlignment = Enum.TextXAlignment.Left,
        Parent = left,
    })

    -- Helper for dot+label rows
    local function dotRow(parent: Instance, y: number, dotColor: Color3, text: string, size: number?)
        local row = UI.New("Frame", {
            Size = UDim2.new(1, 0, 0, size or 18),
            Position = UDim2.new(0, 0, 0, y),
            BackgroundTransparency = 1,
            Parent = parent,
        })
        local dot = UI.New("Frame", {
            Size = UDim2.new(0, Theme.Size.Dot, 0, Theme.Size.Dot),
            Position = UDim2.new(0, 2, 0, (row.AbsoluteSize.Y - Theme.Size.Dot)/2),
            BackgroundColor3 = dotColor,
            BorderSizePixel = 0,
            Parent = row,
        })
        UI.Corner(dot, Theme.Radius.Pill)
        UI.New("TextLabel", {
            Size = UDim2.new(1, -14, 1, 0),
            Position = UDim2.new(0, 14, 0, 0),
            BackgroundTransparency = 1,
            Text = text,
            TextColor3 = Theme.Color.TextMuted,
            Font = Theme.Font.Normal,
            TextSize = size and 12 or 14,
            TextXAlignment = Enum.TextXAlignment.Left,
            Parent = row,
        })
        return row
    end

    dotRow(left, 42, Color3.fromRGB(100, 200, 255), player.Name)
    local gameName = "Unknown"
    pcall(function() gameName = MarketplaceService:GetProductInfo(game.PlaceId).Name end)
    dotRow(left, 62, Color3.fromRGB(255, 180, 100), gameName, 16)

    -- Status
    local status = UI.New("TextLabel", {
        Name = "Status",
        Size = UDim2.new(1, 0, 0, 16),
        Position = UDim2.new(0, 0, 0, 92),
        BackgroundTransparency = 1,
        Text = "Initializing...",
        TextColor3 = Color3.fromRGB(160, 160, 180),
        Font = Theme.Font.Normal,
        TextSize = 12,
        TextXAlignment = Enum.TextXAlignment.Left,
        Parent = left,
    })

    -- Progress bar
    local barBg = UI.New("Frame", {
        Size = UDim2.new(1, 0, 0, Theme.Size.Bar),
        Position = UDim2.new(0, 0, 0, 118),
        BackgroundColor3 = Theme.Color.BarBg,
        BorderSizePixel = 0,
        Parent = left,
    })
    UI.Corner(barBg, Theme.Radius.Pill)

    local barFill = UI.New("Frame", {
        Size = UDim2.new(0, 0, 1, 0),
        BackgroundColor3 = Color3.new(1, 1, 1),
        BorderSizePixel = 0,
        Parent = barBg,
    })
    UI.Corner(barFill, Theme.Radius.Pill)
    UI.Gradient(barFill, {
        ColorSequenceKeypoint.new(0, Theme.Color.BarGradient.Left),
        ColorSequenceKeypoint.new(1, Theme.Color.BarGradient.Right),
    })

    -- Avatar
    local ring = UI.New("Frame", {
        Size = UDim2.new(0, Theme.Size.Ring, 0, Theme.Size.Ring),
        Position = UDim2.new(1, -102, 0.5, -Theme.Size.Ring/2),
        BackgroundColor3 = Theme.Color.Accent,
        BorderSizePixel = 0,
        Parent = card,
    })
    UI.Corner(ring, Theme.Radius.Pill)

    local avatarFrame = UI.New("Frame", {
        Size = UDim2.new(1, -6, 1, -6),
        Position = UDim2.new(0, 3, 0, 3),
        BackgroundColor3 = Color3.fromRGB(30, 30, 40),
        BorderSizePixel = 0,
        Parent = ring,
    })
    UI.Corner(avatarFrame, Theme.Radius.Pill)

    local avatarImg = UI.New("ImageLabel", {
        Size = UDim2.new(1, -8, 1, -8),
        Position = UDim2.new(0, 4, 0, 4),
        BackgroundTransparency = 1,
        Image = "",
        Parent = avatarFrame,
    })
    UI.Corner(avatarImg, Theme.Radius.Pill)

    task.spawn(function()
        local ok, thumb = pcall(function()
            return Players:GetUserThumbnailAsync(player.UserId, Enum.ThumbnailType.HeadShot, Enum.ThumbnailSize.Size420x420)
        end)
        if ok then avatarImg.Image = thumb end
    end)

    -- Controller
    local controller = {}

    function controller.Update(text: string, progress: number?, color: Color3?)
        status.Text = text
        if color then
            status.TextColor3 = color
            UI.Gradient(barFill, {
                ColorSequenceKeypoint.new(0, color),
                ColorSequenceKeypoint.new(1, Theme.Color.BarGradient.Right),
            })
        end
        if progress then
            UI.Tween(barFill, {Size = UDim2.new(progress, 0, 1, 0)}, 0.4)
        end
        task.wait(0.4)
    end

    function controller.Finish(finalText: string, finalColor: Color3, success: boolean)
        controller.Update(finalText, 1, finalColor)
        task.wait(success and 0.8 or 1.5)

        UI.Tween(card, {BackgroundTransparency = 1}, 0.6)
        for _, child in ipairs(card:GetDescendants()) do
            if child:IsA("TextLabel") then
                UI.Tween(child, {TextTransparency = 1}, 0.4)
            elseif child:IsA("ImageLabel") then
                UI.Tween(child, {ImageTransparency = 1}, 0.4)
            elseif child:IsA("Frame") then
                UI.Tween(child, {BackgroundTransparency = 1}, 0.4)
            end
        end
        task.wait(0.7)
        screen:Destroy()
    end

    return controller
end

-- ==================== MAIN ====================

local AegisHub = {}

function AegisHub:Init(): (boolean, typeof(Auth.Validate()))
    local loader = UI.LoadingScreen()
    loader.Update("Initializing...", 0.15)
    loader.Update("Authenticating...", 0.4)

    local result = Auth.Validate()

    warn(string.format(
        "[Aegis Hub] ========== DEBUG ==========\n" ..
        "  UserId:    %s\n" ..
        "  Username:  %s\n" ..
        "  PlaceId:   %s\n" ..
        "  GameName:  %s\n" ..
        "  Whitelist: %s\n" ..
        "  Game:      %s\n" ..
        "  CanRun:    %s\n" ..
        "====================================",
        tostring(result.UserId),
        tostring(result.Username),
        tostring(result.PlaceId),
        tostring(result.GameName),
        tostring(result.IsWhitelisted),
        tostring(result.IsGameAllowed),
        tostring(result.CanRun)
    ))

    loader.Update("Verifying access...", 0.7)

    if not result.CanRun then
        loader.Finish("Access Denied", Theme.Color.Error, false)
        warn("[Aegis Hub] Access Denied.")
        return false, result
    end

    warn("[Aegis Hub] User " .. result.Username .. " whitelisted")
    warn("[Aegis Hub] Game " .. result.GameName .. " allowed")
    loader.Finish("Welcome, " .. result.Username, Theme.Color.Success, true)
    return true, result
end

-- Public API
function AegisHub:AddUser(userId: number, tier: string?, expiresAt: number?, note: string?)
    Whitelist[userId] = {
        Tier = tier or "freemium",
        ExpiresAt = expiresAt,
        Note = note,
    }
end

function AegisHub:RemoveUser(userId: number)
    Whitelist[userId] = nil
end

function AegisHub:GetWhitelist(): typeof(Whitelist)
    return table.clone(Whitelist)
end

AegisHub:Init()
return AegisHub
